import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDistanceKm,
  isWithinRadius,
  calculateQiblaBearing,
  formatDistance,
  generateNavigationUrl,
  KAABA_COORDS,
} from './distance';

test('calculateDistanceKm returns 0 for identical points', () => {
  const dist = calculateDistanceKm(21.4225, 39.8262, 21.4225, 39.8262);
  assert.equal(dist, 0);
});

test('calculateDistanceKm calculates approximate distance correctly', () => {
  // Distance from Dubai (25.2048, 55.2708) to Abu Dhabi (24.4539, 54.3773) is ~130-140 km
  const dist = calculateDistanceKm(25.2048, 55.2708, 24.4539, 54.3773);
  assert.ok(dist > 120 && dist < 150, `Distance was ${dist}`);
});

test('isWithinRadius filters correctly for 15km threshold', () => {
  const user = { lat: 40.7128, lng: -74.0060 }; // New York City
  // Point roughly 2 km away
  const closeMosque = { lat: 40.7250, lng: -74.0010 };
  // Point roughly 30 km away
  const farMosque = { lat: 40.9500, lng: -74.0060 };

  assert.equal(isWithinRadius(user, closeMosque, 15), true);
  assert.equal(isWithinRadius(user, farMosque, 15), false);
});

test('calculateQiblaBearing calculates valid compass direction toward Kaaba', () => {
  // From London, Qibla bearing is approximately 119 degrees (East-Southeast)
  const londonBearing = calculateQiblaBearing(51.5074, -0.1278);
  assert.ok(londonBearing >= 115 && londonBearing <= 125, `London Qibla was ${londonBearing}`);

  // From Tokyo, Qibla bearing is approximately 293 degrees (West-Northwest)
  const tokyoBearing = calculateQiblaBearing(35.6762, 139.6503);
  assert.ok(tokyoBearing >= 285 && tokyoBearing <= 300, `Tokyo Qibla was ${tokyoBearing}`);
});

test('formatDistance formats meters and kilometers cleanly', () => {
  assert.equal(formatDistance(0.45), '450 m');
  assert.equal(formatDistance(1.23), '1.2 km');
  assert.equal(formatDistance(14.88), '14.9 km');
});

test('generateNavigationUrl builds Google Maps turn-by-turn directions link', () => {
  const url = generateNavigationUrl(40.71, -74.00, 40.72, -74.01, 'Islamic Center');
  assert.ok(url.includes('https://www.google.com/maps/dir/'));
  assert.ok(url.includes('origin=40.71,-74'));
  assert.ok(url.includes('destination=40.72,-74.01'));
  assert.ok(url.includes('travelmode=driving'));
});
