import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { UserLocation } from '../../types/mosque';
import {
  searchNearbyMosques,
  KERALA_DISTRICTS,
  isCoordinatesInKerala,
} from '../../services/mosqueService';
import { KeralaMosqueRecord, KERALA_MOSQUES_DATASET } from '../../data/keralaMosques';
import {
  calculateBearing,
  calculateDistanceKm,
  formatDistance,
  generateNavigationUrl,
} from '../../utils/distance';
import {
  RiCompass3Line,
  RiExternalLinkLine,
  RiCrosshair2Line,
  RiMapPin2Line,
  RiNavigationLine,
  RiPhoneLine,
  RiSearch2Line,
  RiAncientPavilionLine,
  RiCheckLine,
  RiFullscreenLine,
} from 'react-icons/ri';

interface MosqueFinderViewProps {
  apiKey?: string;
  userLocation?: UserLocation | null;
  onRequestLocation?: () => void;
  isActive?: boolean;
}

type MapTileStyle = 'osm' | 'satellite';

export const MosqueFinderView: React.FC<MosqueFinderViewProps> = ({
  userLocation: propUserLocation,
  onRequestLocation: propOnRequestLocation,
  isActive = true,
}) => {
  const [internalLocation, setInternalLocation] = useState<UserLocation | null>(null);
  const userLocation = propUserLocation ?? internalLocation;

  const [isLocating, setIsLocating] = useState(false);

  // Synchronously compute initial curated Kerala mosques sorted by center distance
  // This completely prevents layout shift from empty list to filled list
  const initialMosques = useMemo(() => {
    const lat = userLocation?.lat ?? 11.2588;
    const lng = userLocation?.lng ?? 75.7804;
    return KERALA_MOSQUES_DATASET.filter((m) => isCoordinatesInKerala(m.lat, m.lng))
      .map((m) => ({
        ...m,
        distanceKm: calculateDistanceKm(lat, lng, m.lat, m.lng),
        bearingDeg: calculateBearing(lat, lng, m.lat, m.lng),
      }))
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }, []);

  const [mosques, setMosques] = useState<KeralaMosqueRecord[]>(initialMosques);
  const [selectedMosque, setSelectedMosque] = useState<KeralaMosqueRecord | null>(
    initialMosques[0] || null
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [radiusKm, setRadiusKm] = useState(15);
  const [activeTab, setActiveTab] = useState<'split' | 'map' | 'list'>('split');
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [tileStyle, setTileStyle] = useState<MapTileStyle>('osm');

  // Leaflet map refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const hasInitiallyCenteredRef = useRef(false);

  const activeCenterLat = userLocation?.lat ?? 11.2588;
  const activeCenterLng = userLocation?.lng ?? 75.7804;

  const loadMosques = useCallback(
    async (lat: number, lng: number, rad: number) => {
      try {
        const results = await searchNearbyMosques(lat, lng, rad);
        const keralaOnly = results.filter((m) => isCoordinatesInKerala(m.lat, m.lng));
        setMosques(keralaOnly);
        if (keralaOnly.length > 0 && !selectedMosque) {
          setSelectedMosque(keralaOnly[0]);
        }
      } catch (err) {
        console.error('Failed to load Kerala mosques:', err);
      }
    },
    [selectedMosque]
  );

  const requestCurrentLocation = useCallback(() => {
    setIsLocating(true);

    if (propOnRequestLocation) {
      propOnRequestLocation();
    }

    if (!navigator.geolocation) {
      const fallback: UserLocation = { lat: 11.2588, lng: 75.7804, timestamp: Date.now() };
      setInternalLocation(fallback);
      void loadMosques(fallback.lat, fallback.lng, radiusKm);
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const insideKerala = isCoordinatesInKerala(latitude, longitude);

        const targetLat = insideKerala ? latitude : 11.2588;
        const targetLng = insideKerala ? longitude : 75.7804;

        const loc: UserLocation = {
          lat: targetLat,
          lng: targetLng,
          accuracyMeters: accuracy,
          timestamp: pos.timestamp,
        };
        setInternalLocation(loc);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([targetLat, targetLng], 13, { duration: 1 });
        }
        void loadMosques(targetLat, targetLng, radiusKm);
        setIsLocating(false);
      },
      (err) => {
        console.warn('Geolocation failed:', err.message);
        const fallback: UserLocation = { lat: 11.2588, lng: 75.7804, timestamp: Date.now() };
        setInternalLocation(fallback);
        void loadMosques(fallback.lat, fallback.lng, radiusKm);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [loadMosques, radiusKm, propOnRequestLocation]);

  // Request location only if user location is not yet known
  useEffect(() => {
    if (!userLocation && !hasInitiallyCenteredRef.current) {
      requestCurrentLocation();
    }
  }, []);

  const handleSwitchTileStyle = (style: MapTileStyle) => {
    setTileStyle(style);
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let sub: string | undefined = 'abc';
    let maxZ = 19;

    if (style === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      sub = undefined;
      maxZ = 19;
    }

    const newLayer = L.tileLayer(url, {
      maxZoom: maxZ,
      subdomains: sub,
      attribution: style === 'satellite' ? 'Esri, Maxar' : 'OpenStreetMap contributors',
    });
    newLayer.addTo(mapInstanceRef.current);
    tileLayerRef.current = newLayer;
  };

  // Initialize Map ONCE on mount with ResizeObserver - Never jerk on state changes
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = userLocation?.lat ?? 11.2588;
      const initialLng = userLocation?.lng ?? 75.7804;
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false,
        preferCanvas: true,
        fadeAnimation: true,
        markerZoomAnimation: true,
      }).setView([initialLat, initialLng], 12);

      const baseTile = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
          subdomains: 'abc',
          attribution: 'OpenStreetMap contributors',
        }
      );
      baseTile.addTo(map);
      tileLayerRef.current = baseTile;

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;

      mapInstanceRef.current = map;
      if (userLocation) {
        hasInitiallyCenteredRef.current = true;
      }
    }

    // Stable ResizeObserver: ensures map size settles cleanly with zero jerk or misalignment
    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize({ debounceMoveend: true });
      }
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        tileLayerRef.current = null;
        markersLayerRef.current = null;
        userMarkerRef.current = null;
      }
    };
  }, []);

  // Smooth invalidateSize when tab becomes active
  useEffect(() => {
    if (isActive && mapInstanceRef.current) {
      const id = requestAnimationFrame(() => {
        mapInstanceRef.current?.invalidateSize();
      });
      return () => cancelAnimationFrame(id);
    }
  }, [isActive]);

  // Smooth, animated glide if user location arrives later (NO sudden jerk/snap)
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return;
    if (!hasInitiallyCenteredRef.current) {
      hasInitiallyCenteredRef.current = true;
      mapInstanceRef.current.panTo([userLocation.lat, userLocation.lng], {
        animate: true,
        duration: 0.8,
      });
    }
  }, [userLocation]);

  const filteredMosques = mosques.filter((m) => {
    const matchesDistrict =
      selectedDistrict === 'all' ||
      m.district.toLowerCase().includes(selectedDistrict.toLowerCase()) ||
      selectedDistrict.toLowerCase().includes(m.district.toLowerCase());
    if (!matchesDistrict) return false;

    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      (m.malayalamName && m.malayalamName.toLowerCase().includes(q)) ||
      m.address.toLowerCase().includes(q) ||
      m.district.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // User Location Pin
    if (userLocation) {
      const userHtml = `
        <div style="
          width: 18px;
          height: 18px;
          background: #ea5d47;
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 14px rgba(234, 93, 71, 0.7);
        "></div>
      `;
      const userDivIcon = L.divIcon({
        html: userHtml,
        className: '',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
      } else {
        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
          icon: userDivIcon,
          zIndexOffset: 1000,
        })
          .addTo(mapInstanceRef.current)
          .bindTooltip('Your Location (Kerala)', { direction: 'top', offset: [0, -10] });
      }
    }

    // Add Mosque Markers with warm Cairo terracotta/saffron pins
    filteredMosques.forEach((m) => {
      const isSelected = selectedMosque?.id === m.id;
      const markerHtml = `
        <div style="
          width: ${isSelected ? '32px' : '26px'};
          height: ${isSelected ? '32px' : '26px'};
          background: ${isSelected ? '#e59523' : '#ea5d47'};
          border: 2.5px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 4px 14px rgba(56, 18, 48, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: ${isSelected ? '14px' : '11px'};
          font-weight: bold;
          transition: all 0.2s ease;
        ">
          🕌
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: '',
        iconSize: [isSelected ? 32 : 26, isSelected ? 32 : 26],
        iconAnchor: [isSelected ? 16 : 13, isSelected ? 16 : 13],
      });

      const marker = L.marker([m.lat, m.lng], { icon: customIcon });

      const popupContent = `
        <div style="font-family: 'Times New Roman', serif; padding: 4px; min-width: 180px;">
          <h4 style="margin: 0 0 4px; font-size: 14px; font-weight: bold; color: #381230;">${m.name}</h4>
          ${m.malayalamName ? `<div style="font-size: 11px; color: #e59523; margin-bottom: 4px;">${m.malayalamName}</div>` : ''}
          <div style="font-size: 11px; color: #785e70; margin-bottom: 6px;">${m.district} • ${formatDistance(m.distanceKm)}</div>
          <a href="${generateNavigationUrl(activeCenterLat, activeCenterLng, m.lat, m.lng, m.name)}"
             target="_blank" rel="noopener noreferrer"
             style="display: inline-block; background: #ea5d47; color: #ffffff; padding: 4px 10px; border-radius: 12px; font-size: 11px; text-decoration: none; font-weight: bold;">
            Navigate
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setSelectedMosque(m);
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [filteredMosques, selectedMosque?.id, userLocation]);

  const handleSelectMosque = (mosque: KeralaMosqueRecord) => {
    setSelectedMosque(mosque);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([mosque.lat, mosque.lng], 15, {
        duration: 0.8,
      });
    }
  };

  const handleSelectDistrict = (districtId: string) => {
    setSelectedDistrict(districtId);
    const districtObj = KERALA_DISTRICTS.find((d) => d.id === districtId);
    if (districtObj && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([districtObj.centerLat, districtObj.centerLng], 11, {
        duration: 1,
      });
    }
  };

  const handleFitKerala = () => {
    if (mapInstanceRef.current) {
      const keralaBounds = L.latLngBounds([
        [8.2, 74.8],
        [12.8, 77.5],
      ]);
      mapInstanceRef.current.fitBounds(keralaBounds, { padding: [20, 20] });
    }
  };

  const handleCopyMosque = (m: KeralaMosqueRecord) => {
    const text = `${m.name} (${m.malayalamName || ''})\n${m.address}\nKerala, India\nCoordinates: ${m.lat}, ${m.lng}`;
    navigator.clipboard?.writeText(text);
    setCopiedId(m.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Cairo-Style Floating Feature Card ("Explore Kerala Mosques") */}
      <div className="rounded-[32px] bg-[#fffdf9] border border-[#ede0cf] p-6 sm:p-8 shadow-[0_16px_40px_rgba(56,18,48,0.06)] relative overflow-hidden group">
        {/* 4K Background Texture: Breathtaking Grand Islamic Mosque at sunset */}
        <img
          src="/images/mosques_header.jpg"
          alt="Grand Islamic Mosque"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] opacity-75 pointer-events-none transition-transform duration-700 group-hover:scale-105"
        />
        {/* Soft Sunset Translucent Overlay - Reduced for High Image Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffdf9]/85 via-[#fffdf9]/50 to-transparent pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-[#ea5d47]/20 via-[#fcd485]/10 to-transparent pointer-events-none blur-2xl" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#ea5d47] font-bold">
                Masajid of Malabar
              </span>
              <span className="text-[10px] font-mono text-[#785e70] bg-[#f5ecdf] px-2 py-0.5 rounded-full">
                14 Districts
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#381230] font-bold tracking-tight">
              Kerala Mosques
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-[#785e70] leading-relaxed">
              Historic Juma Masjids and Mahallu Masajid with live turn-by-turn navigation and Qibla orientation.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2.5">
            <button
              onClick={requestCurrentLocation}
              disabled={isLocating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ea5d47] to-[#d94a2e] hover:from-[#f28672] hover:to-[#ea5d47] text-white font-serif text-xs font-bold uppercase tracking-wider shadow-md shadow-[#ea5d47]/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <RiCrosshair2Line className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Locating...' : 'Locate Me'}</span>
            </button>

            <button
              onClick={handleFitKerala}
              className="w-10 h-10 rounded-full bg-white border border-[#ede0cf] text-[#381230] hover:text-[#ea5d47] shadow-sm flex items-center justify-center transition-all cursor-pointer"
              title="Fit Entire Kerala Map"
            >
              <RiFullscreenLine className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Kerala District Filter Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-serif text-[#785e70] px-1">
          <span className="uppercase tracking-widest text-[10px] font-bold">Filter by District:</span>
          <span className="text-[#ea5d47] font-mono font-bold">{filteredMosques.length} Mosques Listed</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => handleSelectDistrict('all')}
            className={`px-3.5 py-1.5 text-xs font-serif rounded-full whitespace-nowrap transition-all border cursor-pointer ${
              selectedDistrict === 'all'
                ? 'bg-[#381230] text-white border-[#381230] font-bold shadow-xs'
                : 'bg-[#fffdf9] text-[#785e70] hover:text-[#381230] border-[#ede0cf]'
            }`}
          >
            All Kerala ({mosques.length})
          </button>
          {KERALA_DISTRICTS.map((d) => (
            <button
              key={d.id}
              onClick={() => handleSelectDistrict(d.id)}
              className={`px-3.5 py-1.5 text-xs font-serif rounded-full whitespace-nowrap transition-all border flex items-center gap-1.5 cursor-pointer ${
                selectedDistrict === d.id
                  ? 'bg-[#381230] text-white border-[#381230] font-bold shadow-xs'
                  : 'bg-[#fffdf9] text-[#785e70] hover:text-[#381230] border-[#ede0cf]'
              }`}
            >
              <span>{d.name.split(' ')[0]}</span>
              <span className="text-[10px] opacity-75">({d.malayalamName})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Radius Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#fffdf9] border border-[#ede0cf] p-3.5 rounded-[24px] shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <RiSearch2Line className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9c8495]" />
          <input
            type="text"
            placeholder="Search mosque by name, town, or Malayalam..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#fbf7f0] border border-[#ede0cf] rounded-full text-xs sm:text-sm text-[#381230] placeholder-[#9c8495] focus:outline-none focus:border-[#ea5d47] font-serif transition-colors"
          />
        </div>

        {/* Radius selector */}
        <div className="flex items-center gap-2 text-xs font-serif">
          <span className="text-[#785e70] uppercase tracking-wider text-[10px] font-bold">Radius:</span>
          <div className="flex items-center bg-[#f5ecdf] border border-[#ede0cf] p-0.5 rounded-full">
            {[5, 15, 25, 50].map((r) => (
              <button
                key={r}
                onClick={() => setRadiusKm(r)}
                className={`px-3 py-1 text-xs font-mono rounded-full transition-all cursor-pointer ${
                  radiusKm === r
                    ? 'bg-white text-[#ea5d47] font-bold shadow-xs'
                    : 'text-[#785e70] hover:text-[#381230]'
                }`}
              >
                {r}km
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-[#f5ecdf] border border-[#ede0cf] p-0.5 text-xs font-serif rounded-full">
          {(['split', 'map', 'list'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-[#381230] font-bold shadow-xs'
                  : 'text-[#785e70] hover:text-[#381230]'
              }`}
            >
              {tab === 'split' ? 'Split' : tab === 'map' ? 'Map' : 'List'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map & Mosque List Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Interactive Leaflet Map Container */}
        {(activeTab === 'split' || activeTab === 'map') && (
          <div
            className={`border border-[#ede0cf] relative bg-[#f5ecdf] rounded-[28px] overflow-hidden shadow-sm ${
              activeTab === 'map' ? 'lg:col-span-12 h-[680px]' : 'lg:col-span-7 h-[480px] lg:h-[620px]'
            }`}
            style={{ minHeight: '480px' }}
          >
            <div
              ref={mapContainerRef}
              className="w-full h-full"
              style={{ minHeight: '480px', height: '100%', width: '100%' }}
            />

            {/* Map Top Bar Controls */}
            <div className="absolute top-3 left-3 z-[400] flex flex-wrap items-center gap-2">
              <div className="bg-white/95 backdrop-blur-md border border-[#ede0cf] px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2 text-xs font-serif text-[#381230]">
                <span className="w-2 h-2 rounded-full bg-[#ea5d47]" />
                <span className="font-bold">Kerala Interactive Map</span>
              </div>

              {/* Map Tile Style Switcher */}
              <div className="bg-white/95 backdrop-blur-md border border-[#ede0cf] p-0.5 rounded-full flex items-center gap-1 text-[11px] font-mono shadow-md">
                <button
                  onClick={() => handleSwitchTileStyle('osm')}
                  className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    tileStyle === 'osm' ? 'bg-[#ea5d47] text-white font-bold shadow-sm' : 'text-[#785e70] hover:text-[#381230]'
                  }`}
                >
                  Street
                </button>
                <button
                  onClick={() => handleSwitchTileStyle('satellite')}
                  className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    tileStyle === 'satellite' ? 'bg-[#ea5d47] text-white font-bold shadow-sm' : 'text-[#785e70] hover:text-[#381230]'
                  }`}
                >
                  Satellite
                </button>
              </div>
            </div>

            {/* Bottom Map Status Bar */}
            <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-md border border-[#ede0cf] px-3 py-1 text-[10px] font-mono text-[#785e70] rounded-full shadow-sm flex items-center gap-2">
              <span>Center: {activeCenterLat.toFixed(3)}°N, {activeCenterLng.toFixed(3)}°E</span>
              <span>•</span>
              <button
                onClick={handleFitKerala}
                className="text-[#ea5d47] font-bold hover:underline cursor-pointer"
              >
                Reset Kerala
              </button>
            </div>
          </div>
        )}

        {/* Mosque List Cards (Cairo Ivory Floating Cards) */}
        {(activeTab === 'split' || activeTab === 'list') && (
          <div
            className={`space-y-3.5 overflow-y-auto pr-1 scrollbar-thin ${
              activeTab === 'list' ? 'lg:col-span-12' : 'lg:col-span-5 max-h-[620px]'
            }`}
          >
            {filteredMosques.length === 0 ? (
              <div className="p-10 text-center bg-[#fffdf9] border border-[#ede0cf] rounded-[26px] font-serif space-y-3">
                <RiMapPin2Line className="w-8 h-8 text-[#9c8495] mx-auto" />
                <h3 className="text-[#381230] text-base font-bold">No Mosques Found</h3>
                <p className="text-xs text-[#785e70] max-w-xs mx-auto">
                  No registered Kerala masajid match within {radiusKm}km of this coordinate.
                </p>
                <button
                  onClick={() => {
                    setRadiusKm(50);
                    setSelectedDistrict('all');
                    setSearchFilter('');
                  }}
                  className="px-4 py-2 rounded-full bg-[#ea5d47] text-white text-xs font-serif uppercase tracking-wider font-bold shadow-xs cursor-pointer"
                >
                  View All Kerala
                </button>
              </div>
            ) : (
              filteredMosques.map((mosque) => {
                const isSelected = selectedMosque?.id === mosque.id;

                return (
                  <div
                    key={mosque.id}
                    onClick={() => handleSelectMosque(mosque)}
                    className={`p-5 rounded-[26px] border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#fffaf4] border-[#ea5d47] shadow-[0_8px_24px_rgba(234,93,71,0.12)]'
                        : 'bg-[#fffdf9] border-[#ede0cf] hover:border-[#edd7b6] shadow-[0_4px_16px_rgba(56,18,48,0.03)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-[#381230] text-base leading-snug font-bold">
                          {mosque.name}
                        </h3>

                        {mosque.malayalamName && (
                          <p className="text-xs text-[#e59523] mt-0.5 font-medium">
                            {mosque.malayalamName}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                          <span className="px-2.5 py-0.5 bg-[#fbf5eb] text-[#e59523] border border-[#edd7b6] text-[10px] font-serif uppercase tracking-wider rounded-full font-bold">
                            {mosque.district}
                          </span>

                          {mosque.historicSignificance && (
                            <span className="px-2.5 py-0.5 bg-[#fef2f0] text-[#ea5d47] border border-[#fad6c8] text-[10px] font-serif uppercase tracking-wider rounded-full flex items-center gap-1 font-bold">
                              <RiAncientPavilionLine className="w-3 h-3 text-[#ea5d47]" />
                              Heritage
                            </span>
                          )}

                          <span className="px-2 py-0.5 bg-[#f5ecdf] text-[#785e70] text-[10px] font-mono rounded-full">
                            ★ {mosque.rating || 4.8} ({mosque.userRatingsTotal || 120})
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#fef2f0] border border-[#fad6c8] text-[#ea5d47] text-xs font-mono font-bold">
                          {formatDistance(mosque.distanceKm)}
                        </span>
                        {mosque.bearingDeg !== undefined && (
                          <div className="text-[10px] font-mono text-[#785e70] mt-1 flex items-center justify-end gap-1">
                            <RiCompass3Line className="w-3 h-3 text-[#e59523]" />
                            <span>{mosque.bearingDeg}°</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs font-serif text-[#785e70] mt-2.5 line-clamp-2 leading-relaxed">
                      {mosque.address}
                    </p>

                    {/* Prayer Times Quick Row */}
                    {mosque.jamaahTimes && (
                      <div className="grid grid-cols-5 gap-1 text-[10px] text-center bg-[#fbf5eb] p-2 mt-3 rounded-2xl border border-[#edd7b6] font-mono">
                        <div>
                          <div className="text-[#9c8495]">Fajr</div>
                          <div className="text-[#381230] font-bold">{mosque.jamaahTimes.fajr}</div>
                        </div>
                        <div>
                          <div className="text-[#9c8495]">Dhuhr</div>
                          <div className="text-[#381230] font-bold">{mosque.jamaahTimes.dhuhr}</div>
                        </div>
                        <div>
                          <div className="text-[#9c8495]">Asr</div>
                          <div className="text-[#381230] font-bold">{mosque.jamaahTimes.asr}</div>
                        </div>
                        <div>
                          <div className="text-[#9c8495]">Maghrib</div>
                          <div className="text-[#381230] font-bold">Sunset</div>
                        </div>
                        <div>
                          <div className="text-[#9c8495]">Isha</div>
                          <div className="text-[#381230] font-bold">{mosque.jamaahTimes.isha}</div>
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 mt-3.5 pt-3 border-t border-[#ede0cf]">
                      <a
                        href={generateNavigationUrl(
                          activeCenterLat,
                          activeCenterLng,
                          mosque.lat,
                          mosque.lng,
                          mosque.name
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-gradient-to-r from-[#ea5d47] to-[#d94a2e] text-white font-serif uppercase tracking-wider text-xs font-bold shadow-xs hover:brightness-105 transition-all"
                      >
                        <RiNavigationLine className="w-3.5 h-3.5" />
                        <span>Navigate (GPS)</span>
                      </a>

                      {mosque.phone && (
                        <a
                          href={`tel:${mosque.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 rounded-full border border-[#ede0cf] bg-white hover:border-[#ea5d47] text-[#381230] flex items-center justify-center shadow-xs transition-colors"
                          title="Telephone Mosque"
                        >
                          <RiPhoneLine className="w-3.5 h-3.5 text-[#ea5d47]" />
                        </a>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyMosque(mosque);
                        }}
                        className="w-9 h-9 rounded-full border border-[#ede0cf] bg-white hover:border-[#ea5d47] text-[#381230] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                        title="Copy Details"
                      >
                        {copiedId === mosque.id ? (
                          <RiCheckLine className="w-3.5 h-3.5 text-[#1f9a84]" />
                        ) : (
                          <RiExternalLinkLine className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};