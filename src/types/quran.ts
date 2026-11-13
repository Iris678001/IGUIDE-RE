export interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation: string;
  transliteration?: string;
  juz: number;
  page: number;
  audioUrl?: string;
  tafsir?: string;
}

export interface SurahData extends SurahMeta {
  ayahs: Ayah[];
  bismillahPre?: boolean;
}

export interface Reciter {
  id: string;
  name: string;
  subname: string;
  edition: string;
  serverUrl: string;
}

export interface TafsirData {
  surahNumber: number;
  ayahNumber: number;
  author: string;
  text: string;
  arabicTafsir?: string;
  source: string;
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  textSnippet: string;
  translationSnippet: string;
  createdAt: number;
  note?: string;
}
