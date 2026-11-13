/**
 * Utility to request device motion / orientation permissions across
 * iOS Safari (DeviceOrientationEvent.requestPermission) and Chromium/Android.
 * Invoked synchronously within a direct user gesture (such as tapping the Qibla tab)
 * to ensure the native permission dialog triggers immediately without secondary user friction.
 */
export async function triggerQiblaSensorPermission(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // 1. Android / Chromium Permissions API query
  if (navigator.permissions && (navigator.permissions as any).query) {
    try {
      const names = ['accelerometer', 'gyroscope', 'magnetometer'] as const;
      names.forEach((name) => {
        (navigator.permissions as any).query({ name }).catch(() => {});
      });
    } catch {}
  }

  // 2. iOS Safari 13+ DeviceOrientationEvent.requestPermission
  const DeviceOrientation = window.DeviceOrientationEvent as unknown as {
    requestPermission?: () => Promise<'granted' | 'denied'>;
  };

  if (typeof DeviceOrientation?.requestPermission === 'function') {
    try {
      const res = await DeviceOrientation.requestPermission();
      return res === 'granted';
    } catch (err) {
      console.warn('Device orientation permission prompt error or dismissed:', err);
      return false;
    }
  }

  return true;
}
