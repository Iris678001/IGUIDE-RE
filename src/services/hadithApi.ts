/**
 * Hadith API Service for Sahih al-Bukhari & Sahih Muslim
 * Powered by open-source CDN endpoints with local storage caching
 */

export interface HadithItem {
  hadithNumber: number;
  arabicNumber: string | number;
  englishText: string;
  arabicText: string;
  grade?: string;
  reference?: {
    book: number;
    hadith: number;
  };
}

const memoryCache = new Map<string, HadithItem[]>();

const CACHE_PREFIX = 'iguide_hadith_';

function getStorageCache(key: string): HadithItem[] | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    return JSON.parse(raw) as HadithItem[];
  } catch {
    return null;
  }
}

function setStorageCache(key: string, data: HadithItem[]) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
  } catch {
    // Storage quota or private mode fallback
  }
}

/**
 * Fetch all Hadiths in a book/section of Sahih al-Bukhari or Sahih Muslim
 */
export async function fetchHadithSection(
  collection: 'bukhari' | 'muslim',
  sectionNumber: number
): Promise<HadithItem[]> {
  const cacheKey = `${collection}_sec_${sectionNumber}`;

  // 1. Check in-memory cache
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey)!;
  }

  // 2. Check localStorage
  const cached = getStorageCache(cacheKey);
  if (cached && cached.length > 0) {
    memoryCache.set(cacheKey, cached);
    return cached;
  }

  // 3. Fetch from CDN in parallel (English + Arabic)
  const engUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-${collection}/sections/${sectionNumber}.min.json`;
  const araUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${collection}/sections/${sectionNumber}.min.json`;

  const [engRes, araRes] = await Promise.all([
    fetch(engUrl),
    fetch(araUrl).catch(() => null),
  ]);

  if (!engRes.ok) {
    throw new Error(`Failed to load ${collection} section ${sectionNumber} (${engRes.status})`);
  }

  interface RawHadith {
    hadithnumber: number;
    arabicnumber: string | number;
    text: string;
    grades?: Array<{ grade?: string }>;
    reference?: { book: number; hadith: number };
  }

  const engData = (await engRes.json()) as { hadiths: RawHadith[] };
  const araData = araRes && araRes.ok ? ((await araRes.json()) as { hadiths: RawHadith[] }) : null;

  const araMap = new Map<number, string>();
  if (araData && Array.isArray(araData.hadiths)) {
    for (const h of araData.hadiths) {
      if (h.hadithnumber !== undefined) {
        araMap.set(h.hadithnumber, h.text);
      }
    }
  }

  const merged: HadithItem[] = (engData.hadiths || []).map((h, idx) => {
    const arabicText = araMap.get(h.hadithnumber) || (araData?.hadiths?.[idx]?.text) || '';
    const gradeString = (h.grades && h.grades[0]?.grade) ? h.grades[0].grade : 'Sahih';

    return {
      hadithNumber: h.hadithnumber,
      arabicNumber: h.arabicnumber,
      englishText: h.text,
      arabicText,
      grade: gradeString,
      reference: h.reference,
    };
  });

  memoryCache.set(cacheKey, merged);
  setStorageCache(cacheKey, merged);

  return merged;
}

/**
 * Fetch a single Hadith by its continuous canonical number (e.g. 1 to 7563)
 */
export async function fetchHadithByNumber(
  collection: 'bukhari' | 'muslim',
  hadithNumber: number
): Promise<HadithItem | null> {
  const cacheKey = `${collection}_num_${hadithNumber}`;
  const cached = getStorageCache(cacheKey);
  if (cached && cached.length > 0) {
    return cached[0];
  }

  const engUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-${collection}/${hadithNumber}.min.json`;
  const araUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${collection}/${hadithNumber}.min.json`;

  const [engRes, araRes] = await Promise.all([
    fetch(engUrl),
    fetch(araUrl).catch(() => null),
  ]);

  if (!engRes.ok) {
    return null;
  }

  interface RawResp {
    hadiths: Array<{
      hadithnumber: number;
      arabicnumber: string | number;
      text: string;
      grades?: Array<{ grade?: string }>;
      reference?: { book: number; hadith: number };
    }>;
  }

  const engData = (await engRes.json()) as RawResp;
  const araData = araRes && araRes.ok ? ((await araRes.json()) as RawResp) : null;

  const engHadith = engData.hadiths?.[0];
  if (!engHadith) return null;

  const arabicText = araData?.hadiths?.[0]?.text || '';
  const item: HadithItem = {
    hadithNumber: engHadith.hadithnumber,
    arabicNumber: engHadith.arabicnumber,
    englishText: engHadith.text,
    arabicText,
    grade: engHadith.grades?.[0]?.grade || 'Sahih',
    reference: engHadith.reference,
  };

  setStorageCache(cacheKey, [item]);
  return item;
}
