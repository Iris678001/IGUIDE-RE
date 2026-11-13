export interface Mosque {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distanceKm: number;
  address: string;
  openNow?: boolean;
  rating?: number;
  userRatingsTotal?: number;
  photoUrl?: string;
  phone?: string;
  website?: string;
  bearingDeg?: number;
  jamaahTimes?: {
    fajr?: string;
    dhuhr?: string;
    asr?: string;
    maghrib?: string;
    isha?: string;
    jummah?: string;
  };
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracyMeters?: number;
  addressName?: string;
  timestamp: number;
}

export interface MosqueFilterOptions {
  radiusKm: number; // default 15km
  onlyOpenNow?: boolean;
  minRating?: number;
  searchQuery?: string;
}
