import { Coordinates, Qibla } from 'adhan';

/**
 * Geolocation and Distance calculations for iguide
 * Kaaba coordinates in Makkah, Saudi Arabia: 21.422487, 39.826206
 */
export const KAABA_COORDS = {
  lat: 21.422487,
  lng: 39.826206,
};

/**
 * Calculates distance in kilometers between two GPS coordinates using the Haversine formula
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }
  const earthRadiusKm = 6371; // Earth's mean radius in km
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c;
  return Number(distance.toFixed(2));
}

/**
 * Determines whether a target point is within radiusKm of an origin point
 */
export function isWithinRadius(
  origin: { lat: number; lng: number },
  target: { lat: number; lng: number },
  radiusKm = 15
): boolean {
  const dist = calculateDistanceKm(origin.lat, origin.lng, target.lat, target.lng);
  return dist <= radiusKm;
}

/**
 * Calculates initial compass bearing (0-360 degrees) from point 1 to point 2
 */
export function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const φ1 = degreesToRadians(lat1);
  const φ2 = degreesToRadians(lat2);
  const Δλ = degreesToRadians(lon2 - lon1);

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  const θ = Math.atan2(y, x);
  const bearing = (radiansToDegrees(θ) + 360) % 360;
  return Math.round(bearing);
}

/**
 * Calculates Qibla direction (heading degrees towards Kaaba in Makkah) from user's current GPS position
 * Uses standard astronomical spherical trigonometry from adhan-js (Batoul Apps)
 */
export function calculateQiblaBearing(lat: number, lng: number): number {
  try {
    const coords = new Coordinates(lat, lng);
    const bearing = Qibla(coords);
    return Math.round(bearing * 10) / 10;
  } catch {
    return calculateBearing(lat, lng, KAABA_COORDS.lat, KAABA_COORDS.lng);
  }
}

/**
 * Formats distance cleanly (e.g. "850 m" or "4.2 km")
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return `${meters} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

/**
 * Generates seamless Google Maps Navigation URL
 */
export function generateNavigationUrl(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number,
  destName?: string
): string {
  const query = destName ? encodeURIComponent(destName) : `${destLat},${destLng}`;
  return `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&destination_place_id=${query}&travelmode=driving`;
}

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}
