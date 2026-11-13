import React, { useState } from 'react';
import { Bookmark } from '../../types/quran';
import { SURAH_LIST } from '../../data/surahList';
import {
  BookmarkCheck,
  Check,
  Download,
  Trash2,
  BookOpen,
  Smartphone,
  CheckCircle2,
  Bookmark as BookmarkIcon
} from 'lucide-react';

interface OfflineManagerViewProps {
  downloadedSurahNumbers: number[];
  bookmarks: Bookmark[];
  isOnline: boolean;
  onDownloadAll: () => void;
  isDownloadingAll: boolean;
  downloadProgress: { current: number; total: number };
  onSelectSurah: (surahNumber: number) => void;
  onDeleteBookmark: (bookmarkId: string) => void;
}

export const OfflineManagerView: React.FC<OfflineManagerViewProps> = ({
  downloadedSurahNumbers,
  bookmarks,
  isOnline,
  onDownloadAll,
  isDownloadingAll,
  downloadProgress,
  onSelectSurah,
  onDeleteBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'downloads'>('bookmarks');
  const allDownloaded = downloadedSurahNumbers.length >= 114;

  return (
    <div className="space-y-6 font-serif">
      {/* Cairo-Style Floating Feature Card ("Saved & Offline") */}
      <div className="rounded-[32px] bg-[#fffdf9] border border-[#ede0cf] p-6 sm:p-8 shadow-[0_16px_40px_rgba(56,18,48,0.06)] relative overflow-hidden group">
        {/* 4K Background Texture: Sacred Islamic Library Archive */}
        <img
          src="/images/saved_header.jpg"
          alt="Sacred Heritage Library"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] opacity-75 pointer-events-none transition-transform duration-700 group-hover:scale-105"
        />
        {/* Soft Sunset Translucent Overlay - Reduced for High Image Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffdf9]/85 via-[#fffdf9]/50 to-transparent pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-[#1f9a84]/20 via-[#fcd485]/10 to-transparent pointer-events-none blur-2xl" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            {/* Raised Turquoise Oasis Squircle Icon Badge */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[22px] bg-gradient-to-tr from-[#1f9a84] to-[#34b69d] shadow-lg shadow-[#1f9a84]/30 flex items-center justify-center shrink-0 text-white">
              <BookmarkCheck className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#1f9a84] font-bold">
                  Personal Library
                </span>
                <span
                  className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                    isOnline
                      ? 'border-[#cbebe1] bg-[#edf8f4] text-[#1f9a84] font-bold'
                      : 'border-[#edd7b6] bg-[#fbf5eb] text-[#e59523] font-bold'
                  }`}
                >
                  {isOnline ? 'Online' : 'Offline Mode'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif text-[#381230] font-bold tracking-tight">
                Saved Surahs &amp; Bookmarks
              </h1>
              <p className="text-xs sm:text-sm font-serif italic text-[#785e70] max-w-lg leading-relaxed">
                Read and listen to the Holy Qur'an anytime without needing internet or mobile data. Your saved Surahs and bookmarked verses stay safely on your device.
              </p>
            </div>
          </div>

          {/* Quick One-Tap Download All Button */}
          <button
            onClick={onDownloadAll}
            disabled={isDownloadingAll || allDownloaded}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e59523] to-[#d4811a] hover:from-[#f0a22a] hover:to-[#e59523] text-white font-serif text-xs font-bold uppercase tracking-wider shadow-md shadow-[#e59523]/25 transition-all disabled:opacity-50 shrink-0 cursor-pointer"
          >
            {allDownloaded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>All 114 Surahs Saved</span>
              </>
            ) : isDownloadingAll ? (
              <>
                <Download className="w-4 h-4 animate-bounce" />
                <span>
                  Saving ({downloadProgress.current}/{downloadProgress.total})...
                </span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Save All Surahs (114)</span>
              </>
            )}
          </button>
        </div>

        {/* Live download progress bar */}
        {isDownloadingAll && (
          <div className="mt-5 pt-4 border-t border-[#ede0cf] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#e59523] font-bold">
              <span>Saving Arabic verses &amp; translations to device...</span>
              <span>
                {Math.round((downloadProgress.current / (downloadProgress.total || 1)) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#f5ecdf] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#e59523] to-[#f5b247] transition-all duration-300 rounded-full"
                style={{
                  width: `${(downloadProgress.current / (downloadProgress.total || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* User-Friendly Storage Stats Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6 pt-5 border-t border-[#ede0cf]">
          <div className="bg-[#fbf5eb] border border-[#edd7b6] p-4 rounded-2xl">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#785e70] font-bold block">
              Downloaded Surahs
            </span>
            <span className="text-xl font-bold text-[#381230] font-mono">
              {downloadedSurahNumbers.length}{' '}
              <span className="text-xs text-[#785e70] font-normal">/ 114 Ready</span>
            </span>
            <span className="text-[11px] text-[#785e70] block mt-1 font-serif italic">
              {allDownloaded
                ? 'Full Qur’an available without internet'
                : `${114 - downloadedSurahNumbers.length} available to download`}
            </span>
          </div>

          <div className="bg-[#fbf5eb] border border-[#edd7b6] p-4 rounded-2xl">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#785e70] font-bold block">
              Saved Bookmarks
            </span>
            <span className="text-xl font-bold text-[#e59523] font-mono">
              {bookmarks.length}{' '}
              <span className="text-xs text-[#785e70] font-normal">Verses</span>
            </span>
            <span className="text-[11px] text-[#785e70] block mt-1 font-serif italic">
              Quick access to your favorite Ayat
            </span>
          </div>

          <div className="bg-[#fbf5eb] border border-[#edd7b6] p-4 rounded-2xl">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#785e70] font-bold block">
              Device Status
            </span>
            <span className="text-base font-bold text-[#1f9a84] flex items-center gap-1.5 mt-0.5">
              <Smartphone className="w-4 h-4 text-[#1f9a84]" />
              <span className="text-sm">Ready for Offline Use</span>
            </span>
            <span className="text-[11px] text-[#785e70] block mt-1 font-serif italic">
              Instant loading directly from your phone
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher: Bookmarks vs Offline Surahs */}
      <div className="flex items-center bg-[#f5ecdf] border border-[#ede0cf] p-1 rounded-full max-w-md">
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-serif uppercase tracking-wider rounded-full transition-all cursor-pointer flex-1 justify-center ${
            activeTab === 'bookmarks'
              ? 'bg-white text-[#381230] font-bold shadow-xs'
              : 'text-[#785e70] hover:text-[#381230]'
          }`}
        >
          <BookmarkIcon className="w-3.5 h-3.5 text-[#e59523]" />
          <span>Bookmarks ({bookmarks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('downloads')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-serif uppercase tracking-wider rounded-full transition-all cursor-pointer flex-1 justify-center ${
            activeTab === 'downloads'
              ? 'bg-white text-[#381230] font-bold shadow-xs'
              : 'text-[#785e70] hover:text-[#381230]'
          }`}
        >
          <Check className="w-3.5 h-3.5 text-[#1f9a84]" />
          <span>Surah List ({downloadedSurahNumbers.length}/114)</span>
        </button>
      </div>

      {/* Bookmarks Tab Content */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-3.5">
          {bookmarks.map((bm) => (
            <div
              key={bm.id}
              className="p-5 rounded-[26px] bg-[#fffdf9] border border-[#ede0cf] hover:border-[#e59523] flex items-start justify-between gap-4 transition-all shadow-[0_4px_16px_rgba(56,18,48,0.02)]"
            >
              <div
                onClick={() => onSelectSurah(bm.surahNumber)}
                className="cursor-pointer min-w-0 flex-1"
              >
                <div className="flex items-center gap-2">
                  <span className="font-serif text-[#381230] text-base font-bold hover:text-[#e59523] transition-colors">
                    {bm.surahName} • [{bm.surahNumber}:{bm.ayahNumber}]
                  </span>
                  <span className="text-[10px] font-mono text-[#9c8495]">
                    {new Date(bm.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-base text-[#4a1740] font-arabic mt-1 truncate" dir="rtl">
                  {bm.textSnippet}
                </p>
                <p className="text-xs text-[#785e70] font-serif italic mt-1.5 line-clamp-2">
                  "{bm.translationSnippet}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onSelectSurah(bm.surahNumber)}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#fbf5eb] hover:bg-[#e59523] hover:text-white text-[#e59523] border border-[#edd7b6] text-xs font-serif uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Read</span>
                </button>
                <button
                  onClick={() => onDeleteBookmark(bm.id)}
                  aria-label="Delete bookmark"
                  className="w-8 h-8 rounded-full border border-[#ede0cf] hover:border-red-300 text-[#9c8495] hover:text-red-500 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {bookmarks.length === 0 && (
            <div className="text-center py-16 rounded-[28px] border border-[#ede0cf] bg-[#fffdf9] p-8 space-y-2 text-[#785e70]">
              <BookmarkCheck className="w-8 h-8 mx-auto text-[#9c8495]" />
              <p className="text-base font-serif font-bold text-[#381230]">No bookmarks saved yet.</p>
              <p className="text-xs text-[#9c8495] max-w-sm mx-auto">
                While reading the Qur'an, tap the bookmark icon on any verse to save it here for quick reading anytime.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Downloads Tab Content */}
      {activeTab === 'downloads' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {SURAH_LIST.map((surah) => {
            const isDownloaded = downloadedSurahNumbers.includes(surah.number);

            return (
              <div
                key={surah.number}
                onClick={() => onSelectSurah(surah.number)}
                className={`p-3.5 rounded-[22px] border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  isDownloaded
                    ? 'bg-[#fffdf9] border-[#cbebe1] hover:border-[#1f9a84]'
                    : 'bg-[#fcf8f2] border-[#ede0cf] hover:border-[#edd7b6] opacity-80'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-8 h-8 rounded-full border border-[#edd7b6] bg-[#fbf5eb] text-[#e59523] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                    {surah.number}
                  </span>
                  <div className="truncate">
                    <span className="font-serif text-xs text-[#381230] block truncate font-bold">
                      {surah.englishName}
                    </span>
                    <span className="text-[10px] font-serif italic text-[#785e70]">
                      {surah.numberOfAyahs} Verses
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  {isDownloaded ? (
                    <span className="text-[11px] font-mono text-[#1f9a84] font-bold flex items-center gap-1 bg-[#edf8f4] px-2 py-0.5 rounded-full">
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-serif font-bold text-[#e59523] border border-[#edd7b6] px-2 py-0.5 rounded-full bg-[#fbf5eb]">
                      Read
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};