import { Bookmark, SurahData } from '../types/quran';
import { SEED_SURAHS } from '../data/quranSeed';

const DB_NAME = 'iguide_quran_db';
const DB_VERSION = 1;
const SURAHS_STORE = 'surahs';
const BOOKMARKS_STORE = 'bookmarks';
const SETTINGS_STORE = 'settings';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(SURAHS_STORE)) {
        db.createObjectStore(SURAHS_STORE, { keyPath: 'number' });
      }
      if (!db.objectStoreNames.contains(BOOKMARKS_STORE)) {
        db.createObjectStore(BOOKMARKS_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
        db.createObjectStore(SETTINGS_STORE, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Retrieves a Surah from IndexedDB or seed cache
 */
export async function getOfflineSurah(surahNumber: number): Promise<SurahData | null> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(SURAHS_STORE, 'readonly');
      const store = tx.objectStore(SURAHS_STORE);
      const req = store.get(surahNumber);

      req.onsuccess = () => {
        if (req.result) {
          resolve(req.result);
        } else if (SEED_SURAHS[surahNumber]) {
          resolve(SEED_SURAHS[surahNumber]);
        } else {
          resolve(null);
        }
      };

      req.onerror = () => {
        resolve(SEED_SURAHS[surahNumber] || null);
      };
    });
  } catch {
    return SEED_SURAHS[surahNumber] || null;
  }
}

/**
 * Saves a Surah for full offline reading in IndexedDB
 */
export async function saveOfflineSurah(surah: SurahData): Promise<void> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(SURAHS_STORE, 'readwrite');
      const store = tx.objectStore(SURAHS_STORE);
      const req = store.put(surah);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to save to IndexedDB:', err);
  }
}

/**
 * Gets list of all stored offline Surah numbers
 */
export async function getAllOfflineSurahNumbers(): Promise<number[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(SURAHS_STORE, 'readonly');
      const store = tx.objectStore(SURAHS_STORE);
      const req = store.getAllKeys();

      req.onsuccess = () => {
        const dbKeys = (req.result as number[]) || [];
        const seedKeys = Object.keys(SEED_SURAHS).map(Number);
        const unique = Array.from(new Set([...seedKeys, ...dbKeys])).sort((a, b) => a - b);
        resolve(unique);
      };

      req.onerror = () => {
        resolve(Object.keys(SEED_SURAHS).map(Number));
      };
    });
  } catch {
    return Object.keys(SEED_SURAHS).map(Number);
  }
}

/**
 * Bookmarks Management
 */
export async function getBookmarks(): Promise<Bookmark[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(BOOKMARKS_STORE, 'readonly');
      const store = tx.objectStore(BOOKMARKS_STORE);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => {
        const local = localStorage.getItem('iguide_bookmarks');
        resolve(local ? JSON.parse(local) : []);
      };
    });
  } catch {
    const local = localStorage.getItem('iguide_bookmarks');
    return local ? JSON.parse(local) : [];
  }
}

export async function saveBookmark(bookmark: Bookmark): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(BOOKMARKS_STORE, 'readwrite');
      const store = tx.objectStore(BOOKMARKS_STORE);
      const req = store.put(bookmark);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // fallback localStorage
    const bookmarks = await getBookmarks();
    bookmarks.push(bookmark);
    localStorage.setItem('iguide_bookmarks', JSON.stringify(bookmarks));
  }
}

export async function deleteBookmark(bookmarkId: string): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(BOOKMARKS_STORE, 'readwrite');
      const store = tx.objectStore(BOOKMARKS_STORE);
      const req = store.delete(bookmarkId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    const bookmarks = (await getBookmarks()).filter((b) => b.id !== bookmarkId);
    localStorage.setItem('iguide_bookmarks', JSON.stringify(bookmarks));
  }
}
