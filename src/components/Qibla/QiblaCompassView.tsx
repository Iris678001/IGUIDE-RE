import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { UserLocation } from '../../types/mosque';
import { calculateDistanceKm, calculateQiblaBearing, KAABA_COORDS } from '../../utils/distance';
import {
  Compass,
  Locate,
  MapPin,
  Smartphone,
  CheckCircle2,
  RotateCw,
  Volume2,
  Map as MapIcon,
} from 'lucide-react';
import L from 'leaflet';

interface QiblaCompassViewProps {
  userLocation: UserLocation | null;
  onRequestLocation: () => void;
}

type SensorPermissionState = 'granted' | 'prompt' | 'denied' | 'unsupported';

const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;

function calculateGreatCirclePath(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  steps = 60
): [number, number][] {
  const φ1 = toRad(lat1), λ1 = toRad(lng1), φ2 = toRad(lat2), λ2 = toRad(lng2);
  const d = 2 * Math.asin(
    Math.sqrt(Math.sin((φ2 - φ1) / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin((λ2 - λ1) / 2) ** 2)
  );
  if (d < 1e-10) return [[lat1, lng1], [lat2, lng2]];

  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const A = Math.sin((1 - t) * d) / Math.sin(d);
    const B = Math.sin(t * d) / Math.sin(d);
    const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
    const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
    const z = A * Math.sin(φ1) + B * Math.sin(φ2);
    points.push([toDeg(Math.atan2(z, Math.sqrt(x * x + y * y))), toDeg(Math.atan2(y, x))]);
  }
  return points;
}

function calculateDestinationPoint(lat: number, lng: number, bearing: number, distanceKm: number): [number, number] {
  const R = 6371;
  const φ1 = toRad(lat), λ1 = toRad(lng), brng = toRad(bearing), d = distanceKm / R;
  const φ2 = Math.asin(Math.sin(φ1) * Math.cos(d) + Math.cos(φ1) * Math.sin(d) * Math.cos(brng));
  const λ2 = λ1 + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(φ1), Math.cos(d) - Math.sin(φ1) * Math.sin(φ2));
  return [toDeg(φ2), toDeg(λ2)];
}

export const QiblaCompassView: React.FC<QiblaCompassViewProps> = ({
  userLocation,
  onRequestLocation,
}) => {
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [sensorState, setSensorState] = useState<SensorPermissionState>('prompt');
  const [sensorActive, setSensorActive] = useState<boolean>(false);
  const [hapticEnabled, setHapticEnabled] = useState<boolean>(true);
  const [manualAngle, setManualAngle] = useState<number>(0);
  const [isManualMode, setIsManualMode] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(true);

  // Map reference
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const headingLineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Smooth rotation angles
  const [displayedCompassAngle, setDisplayedCompassAngle] = useState<number>(0);
  const [displayedNeedleAngle, setDisplayedNeedleAngle] = useState<number>(0);
  const lastCompassAngleRef = useRef<number>(0);
  const lastNeedleAngleRef = useRef<number>(0);
  const lastVibrateRef = useRef<number>(0);
  const listenersAttachedRef = useRef<boolean>(false);
  const activeListenerTypeRef = useRef<'absolute' | 'standard' | null>(null);

  const currentLat = userLocation?.lat ?? 10.8505;
  const currentLng = userLocation?.lng ?? 76.2711;

  const qiblaBearing = userLocation
    ? calculateQiblaBearing(userLocation.lat, userLocation.lng)
    : 291.5;

  const distanceToKaaba = userLocation
    ? calculateDistanceKm(userLocation.lat, userLocation.lng, KAABA_COORDS.lat, KAABA_COORDS.lng)
    : 4120;

  const effectiveHeading = isManualMode ? manualAngle : deviceHeading;
  const relativeNeedle = (qiblaBearing - effectiveHeading + 360) % 360;
  const isAligned = relativeNeedle <= 4 || relativeNeedle >= 356;

  const turnDiff = (qiblaBearing - effectiveHeading + 360) % 360;
  let turnGuidance = '';
  if (isAligned) {
    turnGuidance = 'Facing the Kaaba ✦';
  } else if (turnDiff > 0 && turnDiff <= 180) {
    turnGuidance = `Turn ${Math.round(turnDiff)}° Right`;
  } else {
    turnGuidance = `Turn ${Math.round(360 - turnDiff)}° Left`;
  }

  const dialTicks = useMemo(() => {
    const ticks = [];
    for (let i = 0; i < 360; i += 5) {
      const isMajor = i % 30 === 0;
      const isMinor = i % 15 === 0;
      const len = isMajor ? 12 : isMinor ? 8 : 4;
      const r = 125;
      const rad = ((i - 90) * Math.PI) / 180;
      const x1 = 130 + (r - len) * Math.cos(rad);
      const y1 = 130 + (r - len) * Math.sin(rad);
      const x2 = 130 + r * Math.cos(rad);
      const y2 = 130 + r * Math.sin(rad);
      ticks.push({
        deg: i,
        x1,
        y1,
        x2,
        y2,
        isMajor,
        color: isMajor ? '#e59523' : isMinor ? 'rgba(229,149,35,0.5)' : 'rgba(120,94,112,0.25)',
        width: isMajor ? 1.6 : 0.8,
      });
    }
    return ticks;
  }, []);

  const getShortestDelta = (target: number, current: number) => {
    let diff = (target - current) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return diff;
  };

  useEffect(() => {
    const targetCompass = -effectiveHeading;
    const deltaCompass = getShortestDelta(targetCompass, lastCompassAngleRef.current % 360);
    const nextCompass = lastCompassAngleRef.current + deltaCompass;
    lastCompassAngleRef.current = nextCompass;
    setDisplayedCompassAngle(nextCompass);

    const targetNeedle = relativeNeedle;
    const deltaNeedle = getShortestDelta(targetNeedle, lastNeedleAngleRef.current % 360);
    const nextNeedle = lastNeedleAngleRef.current + deltaNeedle;
    lastNeedleAngleRef.current = nextNeedle;
    setDisplayedNeedleAngle(nextNeedle);
  }, [effectiveHeading, relativeNeedle]);

  useEffect(() => {
    if (isAligned && hapticEnabled && typeof window !== 'undefined') {
      const now = Date.now();
      if (now - lastVibrateRef.current > 2000) {
        lastVibrateRef.current = now;
        if (navigator.vibrate) {
          try {
            navigator.vibrate([40, 50, 40]);
          } catch {
            // vibration API blocked
          }
        }
      }
    }
  }, [isAligned, hapticEnabled]);

  const computeHandheldHeading = useCallback(
    (alpha: number | null, beta: number | null, gamma: number | null): number | null => {
      if (alpha === null || isNaN(alpha)) return null;

      const b = beta ?? 0;
      const g = gamma ?? 0;

      const rad = Math.PI / 180;
      const deg = 180 / Math.PI;

      const _a = alpha * rad;
      const _b = b * rad;
      const _g = g * rad;

      const cA = Math.cos(_a);
      const sA = Math.sin(_a);
      const cB = Math.cos(_b);
      const sB = Math.sin(_b);
      const cG = Math.cos(_g);
      const sG = Math.sin(_g);

      // 3D vector projection of phone forward direction onto Earth horizontal plane (East, North)
      // incorporating handheld pitch (beta) and roll (gamma) cross-terms:
      const vEast = -sA * cB - cA * sG * sB;
      const vNorth = cA * cB - sA * sG * sB;

      let heading = Math.atan2(-vEast, vNorth) * deg;

      // Screen orientation compensation (portrait = 0, landscape = 90 or 270)
      let screenAngle = 0;
      if (typeof window !== 'undefined') {
        const screenOrient = window.screen?.orientation;
        if (typeof screenOrient?.angle === 'number') {
          screenAngle = screenOrient.angle;
        } else if (typeof (window as unknown as { orientation?: number }).orientation === 'number') {
          screenAngle = Number((window as unknown as { orientation?: number }).orientation) || 0;
        }
      }

      let finalHeading = (heading + screenAngle) % 360;
      if (finalHeading < 0) finalHeading += 360;
      return finalHeading;
    },
    []
  );

  const handleOrientation = useCallback(
    (e: DeviceOrientationEvent) => {
      // 1. iOS Safari (WebKit provides hardware-calibrated, CoreMotion-compensated compass heading)
      const webkitHeading = (e as unknown as { webkitCompassHeading?: number }).webkitCompassHeading;
      if (typeof webkitHeading === 'number' && !isNaN(webkitHeading) && webkitHeading >= 0) {
        setDeviceHeading(Math.round((webkitHeading % 360 + 360) % 360));
        setSensorActive(true);
        setSensorState('granted');
        return;
      }

      // 2. Reject non-absolute relative events on Android when absolute orientation is expected
      if (e.absolute === false && activeListenerTypeRef.current === 'absolute') {
        return;
      }

      // 3. Android Absolute Orientation / Standard W3C Device Orientation
      const heading = computeHandheldHeading(e.alpha, e.beta, e.gamma);
      if (heading !== null) {
        setDeviceHeading(Math.round(heading));
        setSensorActive(true);
        setSensorState('granted');
      }
    },
    [computeHandheldHeading]
  );

  const detachListeners = useCallback(() => {
    if (typeof window === 'undefined') return;
    (window as any).removeEventListener('deviceorientationabsolute', handleOrientation as EventListener, true);
    (window as any).removeEventListener('deviceorientation', handleOrientation as EventListener, true);
    listenersAttachedRef.current = false;
    activeListenerTypeRef.current = null;
  }, [handleOrientation]);

  const attachListeners = useCallback(() => {
    if (typeof window === 'undefined' || listenersAttachedRef.current) return;

    // Check if absolute device orientation is supported (Android Chrome 50+)
    if ('ondeviceorientationabsolute' in window) {
      (window as any).addEventListener('deviceorientationabsolute', handleOrientation as EventListener, true);
      listenersAttachedRef.current = true;
      activeListenerTypeRef.current = 'absolute';
      return;
    }

    // iOS Safari or browsers without deviceorientationabsolute
    if ('DeviceOrientationEvent' in window) {
      (window as any).addEventListener('deviceorientation', handleOrientation as EventListener, true);
      listenersAttachedRef.current = true;
      activeListenerTypeRef.current = 'standard';
    }
  }, [handleOrientation]);

  const requestSensorPermission = async () => {
    const DeviceOrientation = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    if (typeof DeviceOrientation?.requestPermission === 'function') {
      try {
        const response = await DeviceOrientation.requestPermission();
        if (response === 'granted') {
          setSensorState('granted');
          detachListeners();
          window.addEventListener('deviceorientation', handleOrientation, true);
          listenersAttachedRef.current = true;
          activeListenerTypeRef.current = 'standard';
        } else {
          setSensorState('denied');
        }
      } catch {
        setSensorState('denied');
      }
    } else {
      detachListeners();
      attachListeners();
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const DeviceOrientation = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    if (typeof DeviceOrientation?.requestPermission === 'function') {
      setSensorState('prompt');
    } else if ('ondeviceorientationabsolute' in window || 'DeviceOrientationEvent' in window) {
      attachListeners();
      const timeout = setTimeout(() => {
        setSensorActive((active) => {
          if (!active) setSensorState('unsupported');
          return active;
        });
      }, 2500);
      return () => {
        clearTimeout(timeout);
        detachListeners();
      };
    } else {
      setSensorState('unsupported');
    }

    return () => {
      detachListeners();
    };
  }, [attachListeners, detachListeners]);

  useEffect(() => {
    if (!showMap || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([currentLat, currentLng], 6);

      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 18,
          attribution: 'Esri, OpenStreetMap',
        }
      ).addTo(map);

      const kaabaIcon = L.divIcon({
        html: '<div style="font-size: 26px; line-height: 1; filter: drop-shadow(0 0 8px rgba(229,149,35,0.7));">🕋</div>',
        className: '',
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });
      L.marker([KAABA_COORDS.lat, KAABA_COORDS.lng], { icon: kaabaIcon })
        .addTo(map)
        .bindTooltip('Holy Kaaba · Makkah Al-Mukarramah', { direction: 'top', offset: [0, -14] });

      const userIcon = L.divIcon({
        html: '<div style="width: 16px; height: 16px; background: #1f9a84; border: 2.5px solid #ffffff; border-radius: 50%; box-shadow: 0 0 12px rgba(31,154,132,0.8);"></div>',
        className: '',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      userMarkerRef.current = L.marker([currentLat, currentLng], { icon: userIcon })
        .addTo(map)
        .bindTooltip('Your Location (Kerala)', { direction: 'top', offset: [0, -10] });

      const greatCirclePoints = calculateGreatCirclePath(
        currentLat,
        currentLng,
        KAABA_COORDS.lat,
        KAABA_COORDS.lng,
        80
      );
      L.polyline(greatCirclePoints, {
        color: '#e59523',
        weight: 3,
        dashArray: '6, 8',
        opacity: 0.9,
      }).addTo(map);

      const dest = calculateDestinationPoint(currentLat, currentLng, effectiveHeading, 300);
      headingLineRef.current = L.polyline([[currentLat, currentLng], dest], {
        color: '#1f9a84',
        weight: 3,
        opacity: 0.85,
      }).addTo(map);

      const bounds = L.latLngBounds([
        [currentLat, currentLng],
        [KAABA_COORDS.lat, KAABA_COORDS.lng],
      ]);
      map.fitBounds(bounds, { padding: [30, 30] });

      mapInstanceRef.current = map;
    } else {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([currentLat, currentLng]);
      }
      if (headingLineRef.current) {
        const dest = calculateDestinationPoint(currentLat, currentLng, effectiveHeading, 300);
        headingLineRef.current.setLatLngs([[currentLat, currentLng], dest]);
      }
    }
  }, [showMap, currentLat, currentLng, effectiveHeading]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto font-serif">
      {/* Cairo-Style Astrolabe Qibla Compass Card */}
      <div className="rounded-[36px] bg-[#fffdf9] border border-[#ede0cf] p-6 sm:p-8 text-center relative shadow-[0_20px_50px_rgba(56,18,48,0.06)] overflow-hidden">
        {/* Soft Sunset Radial Gradient */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-b from-[#fcd485]/30 via-[#f8b475]/15 to-transparent pointer-events-none blur-2xl" />

        {/* Header */}
        <div className="space-y-1.5 mb-5 relative z-10">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e59523]"></span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#e59523] font-bold font-serif">
              Sacred Geodesic Azimuth
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#381230] font-bold tracking-tight">
            Qibla Compass
          </h1>
          <div className="text-sm text-[#e59523] font-serif font-semibold tracking-widest">
            بوصلة القبلة
          </div>
          <p className="text-xs font-serif italic text-[#785e70] max-w-sm mx-auto pt-1">
            Astronomical great-circle bearing pointing directly toward the Holy Kaaba in Makkah.
          </p>
        </div>

        {/* Dynamic Alignment Badge */}
        <div
          className={`py-2 px-5 mb-4 border transition-all duration-300 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest rounded-full ${
            isAligned
              ? 'border-[#1f9a84] bg-[#edf8f4] text-[#1f9a84] font-bold shadow-md shadow-[#1f9a84]/20'
              : 'border-[#ede0cf] bg-[#fbf5eb] text-[#785e70]'
          }`}
        >
          {isAligned ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-[#1f9a84] animate-pulse" />
              <span>{turnGuidance}</span>
            </>
          ) : (
            <>
              <Compass className="w-4 h-4 text-[#e59523]" />
              <span>{turnGuidance}</span>
            </>
          )}
        </div>

        {/* Master Compass Dial Container */}
        <div className="my-6 relative w-72 h-72 sm:w-80 sm:h-80 mx-auto flex items-center justify-center select-none">
          {/* Top Pointer Reticle (Indicates device front heading) */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[14px] border-t-[#e59523]"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(229,149,35,0.5))' }}
          />

          {/* Outer Glowing Brass & Sand Ring */}
          <div
            className={`absolute inset-0 border-2 transition-all duration-500 rounded-full flex items-center justify-center ${
              isAligned
                ? 'border-[#1f9a84] shadow-[0_0_35px_rgba(31,154,132,0.25)]'
                : 'border-[#edd7b6] shadow-[0_12px_36px_rgba(56,18,48,0.06)]'
            }`}
          >
            {/* Concentric Dial Background with Parchment/Sand Finish */}
            <div
              className="absolute inset-[10px] rounded-full border border-[#ede0cf] overflow-hidden"
              style={{
                background: 'radial-gradient(circle at 40% 35%, #fffdfa, #f7eedf)',
              }}
            >
              {/* Subtle Astrolabe Conic Rays */}
              <div
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  background:
                    'repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(229,149,35,0.08) 10deg 20deg)',
                }}
              />
            </div>
          </div>

          {/* LAYER 1: Rotating Compass Rose Plate */}
          <div
            className="absolute inset-[18px] transition-transform duration-150 ease-out pointer-events-none"
            style={{
              transform: `rotate(${displayedCompassAngle}deg)`,
            }}
          >
            <svg viewBox="0 0 260 260" className="w-full h-full">
              {/* Dial Degree Ticks */}
              <g>
                {dialTicks.map((tick) => (
                  <line
                    key={tick.deg}
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                    stroke={tick.color}
                    strokeWidth={tick.width}
                  />
                ))}
              </g>

              {/* Cardinal North Pointer (Crimson Arrow) */}
              <polygon points="130,16 136,30 124,30" fill="#E11D48" />
              <text
                x="130"
                y="43"
                textAnchor="middle"
                fill="#E11D48"
                fontFamily="Times New Roman, serif"
                fontSize="15"
                fontWeight="700"
              >
                N
              </text>

              {/* Cardinal East */}
              <text
                x="236"
                y="135"
                textAnchor="middle"
                fill="#381230"
                fontFamily="Times New Roman, serif"
                fontSize="13"
                fontWeight="700"
              >
                E
              </text>

              {/* Cardinal South */}
              <text
                x="130"
                y="238"
                textAnchor="middle"
                fill="#381230"
                fontFamily="Times New Roman, serif"
                fontSize="13"
                fontWeight="700"
              >
                S
              </text>

              {/* Cardinal West */}
              <text
                x="24"
                y="135"
                textAnchor="middle"
                fill="#381230"
                fontFamily="Times New Roman, serif"
                fontSize="13"
                fontWeight="700"
              >
                W
              </text>

              {/* Minor Ordinal Markers */}
              <text x="202" y="60" textAnchor="middle" fill="#9c8495" fontSize="9" fontFamily="monospace">NE</text>
              <text x="202" y="208" textAnchor="middle" fill="#9c8495" fontSize="9" fontFamily="monospace">SE</text>
              <text x="58" y="208" textAnchor="middle" fill="#9c8495" fontSize="9" fontFamily="monospace">SW</text>
              <text x="58" y="60" textAnchor="middle" fill="#9c8495" fontSize="9" fontFamily="monospace">NW</text>
            </svg>
          </div>

          {/* LAYER 2: GRAND 3D QIBLA COMPASS NEEDLE (Faceted Nautical Astrolabe Needle) */}
          <div
            className="absolute inset-[18px] transition-transform duration-150 ease-out pointer-events-none z-20"
            style={{
              transform: `rotate(${displayedNeedleAngle}deg)`,
            }}
          >
            <svg viewBox="0 0 260 260" className="w-full h-full overflow-visible">
              <g style={{ filter: isAligned ? 'drop-shadow(0 0 12px rgba(31,154,132,0.6))' : 'drop-shadow(0 0 10px rgba(229,149,35,0.45))' }}>
                {/* 1. NORTH / QIBLA NEEDLE SHAFT */}
                {/* Left Facet (Light Gold / Bright Emerald) */}
                <polygon
                  points="130,22 139,130 130,120"
                  fill={isAligned ? '#1f9a84' : '#f5b247'}
                />
                {/* Right Facet (Antique Dark Gold / Deep Emerald) */}
                <polygon
                  points="130,22 121,130 130,120"
                  fill={isAligned ? '#167a68' : '#ca7c10'}
                />
                {/* Center Ridge Highlight */}
                <line
                  x1="130"
                  y1="22"
                  x2="130"
                  y2="120"
                  stroke="#ffffff"
                  strokeWidth="0.9"
                  opacity="0.8"
                />

                {/* 2. SOUTH / COUNTER-BALANCE TAIL */}
                <polygon
                  points="130,222 137,130 130,138"
                  fill="#85687d"
                />
                <polygon
                  points="130,222 123,130 130,138"
                  fill="#5c3f55"
                />
                <line
                  x1="130"
                  y1="138"
                  x2="130"
                  y2="222"
                  stroke="#ede0cf"
                  strokeWidth="0.8"
                  opacity="0.6"
                />

                {/* 3. SHARP ARROWHEAD TIP AT KAABA */}
                <polygon
                  points="130,14 138,36 122,36"
                  fill={isAligned ? '#1f9a84' : '#e59523'}
                  stroke="#ffffff"
                  strokeWidth="1"
                />

                {/* 4. KAABA EMBLEM BADGE ON THE NEEDLE */}
                <g transform="translate(130, 62)">
                  <rect
                    x="-16"
                    y="-16"
                    width="32"
                    height="32"
                    rx="4"
                    fill="#381230"
                    stroke={isAligned ? '#1f9a84' : '#e59523'}
                    strokeWidth="1.8"
                  />
                  {/* Kaaba Golden Kiswah Belt */}
                  <rect x="-16" y="-8" width="32" height="4" fill="#e59523" />
                  {/* Kaaba Door */}
                  <rect x="2" y="-4" width="7" height="13" fill="#f5b247" />
                  <rect x="-11" y="-3" width="9" height="10" fill="#4a1740" />
                  <text
                    x="0"
                    y="25"
                    textAnchor="middle"
                    fill={isAligned ? '#1f9a84' : '#e59523'}
                    fontSize="8.5"
                    fontWeight="700"
                    fontFamily="Times New Roman, serif"
                    letterSpacing="1"
                  >
                    QIBLA
                  </text>
                </g>

                {/* 5. BRASS CENTER PIVOT BEZEL */}
                <circle
                  cx="130"
                  cy="130"
                  r="14"
                  fill="#fffdf9"
                  stroke={isAligned ? '#1f9a84' : '#e59523'}
                  strokeWidth="2.5"
                />
                <circle
                  cx="130"
                  cy="130"
                  r="7"
                  fill={isAligned ? '#1f9a84' : '#e59523'}
                />
                <circle
                  cx="130"
                  cy="130"
                  r="2.5"
                  fill="#ffffff"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Large Degree Readout */}
        <div className="text-center my-4">
          <div className="text-4xl sm:text-5xl font-light text-[#381230] tracking-tight font-serif">
            {qiblaBearing.toFixed(1)}
            <span className="text-2xl text-[#e59523] ml-1">°</span>
          </div>
          <div className="text-xs text-[#785e70] uppercase tracking-[0.2em] font-serif mt-1 font-bold">
            Qibla Bearing (WNW · West-Northwest)
          </div>
        </div>

        {/* Telemetry Metrics Panel (Cairo Warm Ivory Tiles) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-left max-w-xl mx-auto my-5">
          <div className="p-3.5 rounded-2xl border border-[#ede0cf] bg-[#fbf5eb]">
            <div className="text-[10px] text-[#785e70] uppercase tracking-wider font-mono font-bold">Distance</div>
            <div className="text-base font-bold text-[#381230] mt-0.5 font-mono">
              {distanceToKaaba.toLocaleString()} <span className="text-xs font-normal text-[#785e70]">km</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl border border-[#ede0cf] bg-[#fbf5eb]">
            <div className="text-[10px] text-[#785e70] uppercase tracking-wider font-mono font-bold">Qibla Azimuth</div>
            <div className="text-base font-bold text-[#e59523] mt-0.5 font-mono">
              {qiblaBearing.toFixed(1)}°
            </div>
          </div>

          <div className="p-3.5 rounded-2xl border border-[#ede0cf] bg-[#fbf5eb]">
            <div className="text-[10px] text-[#785e70] uppercase tracking-wider font-mono font-bold">Latitude</div>
            <div className="text-base font-bold text-[#381230] mt-0.5 font-mono">
              {currentLat.toFixed(3)}° N
            </div>
          </div>

          <div className="p-3.5 rounded-2xl border border-[#ede0cf] bg-[#fbf5eb]">
            <div className="text-[10px] text-[#785e70] uppercase tracking-wider font-mono font-bold">Longitude</div>
            <div className="text-base font-bold text-[#381230] mt-0.5 font-mono">
              {currentLng.toFixed(3)}° E
            </div>
          </div>
        </div>

        {/* Interactive Map: "Your Path to Makkah" Great-Circle Geodesic Arc */}
        <div className="border border-[#ede0cf] bg-[#fbf5eb] p-4 mt-6 text-left rounded-[28px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-[#e59523]" />
              <h2 className="text-sm font-serif font-bold text-[#381230] tracking-wide">
                Your Path to Makkah · Great-Circle Geodesic
              </h2>
            </div>
            <button
              onClick={() => setShowMap(!showMap)}
              className="text-xs text-[#e59523] font-bold hover:underline cursor-pointer"
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>

          {showMap && (
            <div className="space-y-2">
              <div
                ref={mapContainerRef}
                className="w-full h-56 border border-[#ede0cf] bg-[#f5ecdf] rounded-2xl overflow-hidden relative z-0"
              />
              <div className="flex items-center justify-center gap-6 text-[11px] text-[#785e70] pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-0.5 border-t-2 border-dashed border-[#e59523]" />
                  <span>Qibla Line of Sight</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-0.5 bg-[#1f9a84]" />
                  <span>Device Facing ({Math.round(effectiveHeading)}°)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls & Sensor Diagnostics */}
        <div className="mt-6 pt-5 border-t border-[#ede0cf] space-y-4">
          {sensorState === 'prompt' && !sensorActive && (
            <div className="p-4 rounded-2xl border border-[#ede0cf] bg-[#fbf5eb] flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#e59523]" />
                <span className="text-xs text-[#381230] font-serif">
                  iOS Safari requires explicit permission to enable orientation sensors.
                </span>
              </div>
              <button
                onClick={requestSensorPermission}
                className="px-4 py-2 rounded-full bg-[#e59523] hover:bg-[#ca7c10] text-white text-xs font-serif uppercase tracking-wider font-bold shadow-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                Enable Compass Sensor
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#785e70]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    sensorActive ? 'bg-[#1f9a84]' : isManualMode ? 'bg-[#e59523]' : 'bg-[#9c8495]'
                  }`}
                />
                {sensorActive
                  ? 'Sensor: Live Magnetometer'
                  : isManualMode
                  ? 'Sensor: Manual Simulator'
                  : 'Sensor: Awaiting Gyroscope'}
              </span>

              <button
                onClick={() => setHapticEnabled(!hapticEnabled)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full border text-[11px] transition-colors cursor-pointer ${
                  hapticEnabled
                    ? 'border-[#edd7b6] text-[#e59523] bg-[#fbf5eb] font-bold'
                    : 'border-[#ede0cf] text-[#9c8495] bg-[#fffdf9]'
                }`}
                title="Toggle haptic vibration upon Kaaba alignment"
              >
                <Volume2 className="w-3 h-3" />
                <span>Haptic: {hapticEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            <button
              onClick={() => setIsManualMode(!isManualMode)}
              className="text-[#e59523] font-bold hover:underline cursor-pointer flex items-center gap-1.5 text-[11px]"
            >
              <RotateCw className="w-3 h-3" />
              <span>{isManualMode ? 'Switch to Live Sensor' : 'Test with Manual Rotation'}</span>
            </button>
          </div>

          {isManualMode && (
            <div className="p-4 rounded-2xl border border-[#ede0cf] bg-[#fbf5eb] space-y-2 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#785e70] font-serif">Simulate Device Heading:</span>
                <span className="font-mono text-[#e59523] font-bold">{manualAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="359"
                value={manualAngle}
                onChange={(e) => setManualAngle(Number(e.target.value))}
                className="w-full accent-[#e59523] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#785e70] font-mono">
                <button onClick={() => setManualAngle(0)} className="hover:text-[#e59523] cursor-pointer">
                  North (0°)
                </button>
                <button onClick={() => setManualAngle(90)} className="hover:text-[#e59523] cursor-pointer">
                  East (90°)
                </button>
                <button onClick={() => setManualAngle(180)} className="hover:text-[#e59523] cursor-pointer">
                  South (180°)
                </button>
                <button onClick={() => setManualAngle(270)} className="hover:text-[#e59523] cursor-pointer">
                  West (270°)
                </button>
                <button
                  onClick={() => setManualAngle(Math.round(qiblaBearing))}
                  className="text-[#e59523] font-bold hover:underline cursor-pointer"
                >
                  Kaaba ({Math.round(qiblaBearing)}°)
                </button>
              </div>
            </div>
          )}

          {/* Location Bar & Recalibration */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
            <div className="flex items-center gap-2 text-[#785e70]">
              <MapPin className="w-3.5 h-3.5 text-[#e59523]" />
              <span>
                {userLocation
                  ? `Kerala (${userLocation.lat.toFixed(3)}°N, ${userLocation.lng.toFixed(3)}°E)`
                  : 'Kerala Geodesic Reference (10.850°N, 76.271°E)'}
              </span>
            </div>

            <button
              onClick={onRequestLocation}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#edd7b6] bg-[#fbf5eb] hover:bg-[#f5ecdf] text-[#e59523] text-xs font-serif uppercase tracking-wider font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Locate className="w-3 h-3" />
              <span>Calibrate GPS Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};