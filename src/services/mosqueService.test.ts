import test from 'node:test';
import assert from 'node:assert/strict';
import { searchNearbyMosques, isCoordinatesInKerala } from './mosqueService';

test('searchNearbyMosques returns only mosques inside Kerala', async () => {
  // Kozhikode (Calicut), Kerala
  const userLat = 11.2588;
  const userLng = 75.7804;

  const mosques = await searchNearbyMosques(userLat, userLng, 15);

  assert.ok(mosques.length > 0, 'Should find mosques in Kerala');

  for (const mosque of mosques) {
    assert.ok(
      isCoordinatesInKerala(mosque.lat, mosque.lng),
      `Mosque ${mosque.name} at (${mosque.lat}, ${mosque.lng}) is not in Kerala`
    );
    assert.ok(mosque.lat !== 0 && mosque.lng !== 0, 'Coordinates should be valid');
    assert.ok(mosque.jamaahTimes, 'Should have Jamaah prayer times');
  }

  // Verify sorted nearest first
  for (let i = 0; i < mosques.length - 1; i++) {
    assert.ok(
      mosques[i].distanceKm <= mosques[i + 1].distanceKm,
      'Mosques must be sorted nearest first'
    );
  }
});

test('searchNearbyMosques defaults gracefully to Kerala even if coordinates are outside', async () => {
  const foreignLat = 40.7128; // New York
  const foreignLng = -74.006;

  const mosques = await searchNearbyMosques(foreignLat, foreignLng, 25);

  assert.ok(mosques.length > 0, 'Should return Kerala mosques');
  for (const m of mosques) {
    assert.ok(isCoordinatesInKerala(m.lat, m.lng), 'Every returned mosque must be in Kerala');
  }
});
