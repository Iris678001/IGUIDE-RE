import { UserLocation } from '../types/mosque';

const LOCATION_CACHE_KEY = 'iguide_cached_user_location';

/**
 * Retrieves the previously saved user geolocation from localStorage.
 * Ensures the app instantly loads with the user's coordinate without
 * re-querying the device GPS on every view switch.
 */
export function getCachedUserLocation(): UserLocation | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LOCATION_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserLocation;
    if (
      parsed &&
      typeof parsed.lat === 'number' &&
      !isNaN(parsed.lat) &&
      typeof parsed.lng === 'number' &&
      !isNaN(parsed.lng)
    ) {
      return parsed;
    }
  } catch (err) {
    console.warn('Failed to parse cached user location:', err);
  }
  return null;
}

/**
 * Persists the resolved user geolocation to localStorage.
 */
export function setCachedUserLocation(location: UserLocation): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(location));
  } catch (err) {
    console.warn('Failed to cache user location:', err);
  }
}

/**
 * Clears the cached user geolocation.
 */
export function clearCachedUserLocation(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(LOCATION_CACHE_KEY);
  } catch {}
}
