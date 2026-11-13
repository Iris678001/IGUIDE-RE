import React, { useMemo, useState } from 'react';
import { SurahMeta } from '../../types/quran';
import { SURAH_LIST } from '../../data/surahList';
import {
  RiBookOpenLine,
  RiArrowRightSLine,
  RiDownloadLine,
  RiHistoryLine,
  RiSearch2Line,
  RiArrowRightLine,
} from 'react-icons/ri';

interface SurahListProps {
  onSelectSurah: (surahNumber: number) => void;
  downloadedSurahNumbers: number[];
  lastReadSurah?: { surahNumber: number; ayahNumber: number } | null;
  onDownloadAllOffline?: () => void;
  isDownloadingAll?: boolean;
}

export const SurahList: React.FC<SurahListProps> = ({
  onSelectSurah,
  downloadedSurahNumbers,
  lastReadSurah,
  onDownloadAllOffline,
  isDownloadingAll,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan'>('all');

  const filteredSurahs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return SURAH_LIST.filter((surah) => {
      const matchesFilter = filterType === 'all' || surah.revelationType === filterType;
      if (!matchesFilter) return false;

      if (!query) return true;

      const numStr = surah.number.toString();
      const engName = surah.englishName.toLowerCase();
      const arName = surah.name;
      const transName = surah.englishNameTranslation.toLowerCase();

      return (
        numStr.includes(query) ||
        engName.includes(query) ||
        arName.includes(query) ||
        transName.includes(query)
      );
    });
  }, [searchQuery, filterType]);

  const lastReadMeta = lastReadSurah
    ? SURAH_LIST.find((s) => s.number === lastReadSurah.surahNumber)
    : null;

  return (
    <div className="space-y-6">
      {/* Cairo-Style Floating Feature Card ("Discover the Holy Quran") */}
      <div className="rounded-[32px] bg-[#fffdf9] border border-[#ede0cf] p-6 sm:p-8 shadow-[0_16px_40px_rgba(56,18,48,0.06)] relative overflow-hidden group">
        {/* 4K Background Texture: Illuminated Holy Qur'an Manuscript */}
        <img
          src="/images/quran_header.jpg"
          alt="Illuminated Holy Qur'an Manuscript"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] opacity-75 pointer-events-none transition-transform duration-700 group-hover:scale-105"
        />
        {/* Soft Sunset Translucent Overlay - Reduced for High Image Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffdf9]/85 via-[#fffdf9]/50 to-transparent pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-[#fcd485]/20 via-[#f8b475]/10 to-transparent pointer-events-none blur-2xl" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#e59523] font-bold">
                Sacred Scripture
              </span>
              <span className="text-[10px] font-mono text-[#785e70] bg-[#f5ecdf] px-2 py-0.5 rounded-full">
                114 Surahs
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#381230] font-bold tracking-tight">
              The Holy Qur'an
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-[#785e70] leading-relaxed">
              Uthmani script with authentic translations, Tafsir, and complete offline voice recitation.
            </p>
          </div>

          {/* Quick Offline Action Button */}
          {onDownloadAllOffline && (
            <div className="shrink-0 flex items-center">
              <button
                onClick={onDownloadAllOffline}
                disabled={isDownloadingAll}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e59523] to-[#d4811a] hover:from-[#f0a22a] hover:to-[#e59523] text-white font-serif text-xs font-bold uppercase tracking-wider shadow-md shadow-[#e59523]/25 transition-all cursor-pointer disabled:opacity-50"
              >
                <RiDownloadLine className="w-3.5 h-3.5" />
                <span>
                  {isDownloadingAll
                    ? 'Saving Surahs...'
                    : downloadedSurahNumbers.length >= 114
                    ? 'All 114 Surahs Saved'
                    : 'Download Offline'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Resume Reading Card (if available) - Styled as a floating Cairo card */}
      {lastReadMeta && lastReadSurah && (
        <div
          onClick={() => onSelectSurah(lastReadMeta.number)}
          className="rounded-[24px] bg-[#fffdf9] border border-[#ede0cf] p-5 shadow-[0_8px_24px_rgba(56,18,48,0.04)] hover:shadow-[0_12px_32px_rgba(56,18,48,0.08)] hover:border-[#e59523] transition-all cursor-pointer flex items-center justify-between gap-4 group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Saffron Circular Icon */}
            <div className="w-11 h-11 rounded-full bg-[#fbf5eb] border border-[#edd7b6] text-[#e59523] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <RiHistoryLine className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#e59523] font-serif font-bold">
                  Continue Reading
                </span>
                <span className="text-[10px] font-mono text-[#785e70]">
                  Ayah {lastReadSurah.ayahNumber}
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#381230] truncate">
                {lastReadMeta.englishName} ({lastReadMeta.englishNameTranslation})
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-arabic text-xl font-bold text-[#4a1740] hidden sm:block" dir="rtl">
              {lastReadMeta.name}
            </span>
            {/* Saffron Circular Arrow Button (like in reference image) */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#e59523] to-[#f5b247] text-white flex items-center justify-center shadow-md group-hover:translate-x-1 transition-transform">
              <RiArrowRightLine className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input in Rounded White Card */}
        <div className="relative flex-1">
          <RiSearch2Line className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#9c8495]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Surah name, number, or translation..."
            className="w-full bg-[#fffdf9] border border-[#ede0cf] rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm text-[#381230] placeholder-[#9c8495] focus:outline-none focus:border-[#e59523] focus:ring-2 focus:ring-[#e59523]/20 shadow-sm transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#f5ecdf]/70 border border-[#ede0cf] p-1 rounded-full shrink-0 shadow-inner">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 text-xs font-serif rounded-full transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-white text-[#381230] font-bold shadow-xs'
                : 'text-[#785e70] hover:text-[#381230]'
            }`}
          >
            All (114)
          </button>
          <button
            onClick={() => setFilterType('Meccan')}
            className={`px-3.5 py-1.5 text-xs font-serif rounded-full transition-all cursor-pointer ${
              filterType === 'Meccan'
                ? 'bg-white text-[#381230] font-bold shadow-xs'
                : 'text-[#785e70] hover:text-[#381230]'
            }`}
          >
            Meccan
          </button>
          <button
            onClick={() => setFilterType('Medinan')}
            className={`px-3.5 py-1.5 text-xs font-serif rounded-full transition-all cursor-pointer ${
              filterType === 'Medinan'
                ? 'bg-white text-[#381230] font-bold shadow-xs'
                : 'text-[#785e70] hover:text-[#381230]'
            }`}
          >
            Medinan
          </button>
        </div>
      </div>

      {/* Grid of Surah Cards (Cairo Ivory Cards with Saffron Badges) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredSurahs.map((surah) => {
          const isDownloaded = downloadedSurahNumbers.includes(surah.number);

          return (
            <div
              key={surah.number}
              onClick={() => onSelectSurah(surah.number)}
              className="rounded-[24px] bg-[#fffdf9] border border-[#ede0cf] hover:border-[#e59523] p-4 shadow-[0_4px_16px_rgba(56,18,48,0.03)] hover:shadow-[0_10px_28px_rgba(56,18,48,0.07)] transition-all cursor-pointer group flex items-center justify-between gap-3 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Saffron Circular Number Badge */}
                <div className="w-10 h-10 rounded-full bg-[#fbf5eb] border border-[#edd7b6] text-[#e59523] font-serif font-bold text-xs flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#e59523] group-hover:text-white transition-all shadow-xs">
                  {surah.number}
                </div>

                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-sm font-bold text-[#381230] truncate group-hover:text-[#e59523] transition-colors">
                      {surah.englishName}
                    </span>
                    {isDownloaded && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1f9a84]" title="Saved offline" />
                    )}
                  </div>
                  <div className="text-[11px] font-serif italic text-[#785e70] truncate">
                    {surah.englishNameTranslation} • {surah.numberOfAyahs} Ayat
                  </div>
                </div>
              </div>

              {/* Right Side: Arabic Calligraphy & Action Arrow */}
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="font-arabic text-lg font-bold text-[#4a1740]" dir="rtl">
                  {surah.name}
                </span>

                {/* Saffron Circular Arrow (from Cairo reference) */}
                <div className="w-7 h-7 rounded-full bg-[#fbf5eb] text-[#e59523] group-hover:bg-[#e59523] group-hover:text-white transition-all flex items-center justify-center">
                  <RiArrowRightSLine className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSurahs.length === 0 && (
        <div className="text-center py-16 rounded-[28px] bg-[#fffdf9] border border-[#ede0cf] p-8 space-y-2 text-[#785e70]">
          <RiBookOpenLine className="w-8 h-8 mx-auto text-[#9c8495]" />
          <p className="text-base font-serif font-bold text-[#381230]">No Surahs matched your search.</p>
          <p className="text-xs text-[#9c8495]">Try searching by Surah number (e.g. 36) or common name (e.g. Ya-Sin).</p>
        </div>
      )}
    </div>
  );
};