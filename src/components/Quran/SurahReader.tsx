import React, { useEffect, useRef, useState } from 'react';
import { Ayah, Reciter, SurahData } from '../../types/quran';
import {
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Check,
  Copy,
  Download,
  Pause,
  Play,
  Settings2,
  ArrowLeft,
  ArrowRight,
  Heart,
  Sparkles
} from 'lucide-react';
import { TafsirModal } from './TafsirModal';

interface SurahReaderProps {
  surah: SurahData;
  onBack: () => void;
  onSelectSurah: (surahNumber: number) => void;
  currentPlayingAyah: Ayah | null;
  isPlayingAudio: boolean;
  onPlayAyah: (ayah: Ayah) => void;
  onPauseAudio: () => void;
  selectedReciter: Reciter;
  onSelectReciter: (reciter: Reciter) => void;
  onToggleBookmark: (ayah: Ayah) => void;
  isAyahBookmarked: (ayahNumber: number) => boolean;
  onSaveOffline: (surah: SurahData) => void;
  isSavedOffline: boolean;
}

export const SurahReader: React.FC<SurahReaderProps> = ({
  surah,
  onBack,
  onSelectSurah,
  currentPlayingAyah,
  isPlayingAudio,
  onPlayAyah,
  onPauseAudio,
  selectedReciter,
  onToggleBookmark,
  isAyahBookmarked,
  onSaveOffline,
  isSavedOffline,
}) => {
  const [selectedTafsirAyah, setSelectedTafsirAyah] = useState<Ayah | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [copiedAyahNum, setCopiedAyahNum] = useState<number | null>(null);

  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (currentPlayingAyah) {
      const el = ayahRefs.current[currentPlayingAyah.numberInSurah];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentPlayingAyah]);

  const handleCopyAyah = (ayah: Ayah) => {
    const text = `${surah.englishName} [${surah.number}:${ayah.numberInSurah}]\n\n${ayah.text}\n\n"${ayah.translation}"`;
    navigator.clipboard?.writeText(text);
    setCopiedAyahNum(ayah.numberInSurah);
    setTimeout(() => setCopiedAyahNum(null), 2000);
  };

  const getArabicFontSize = () => {
    if (fontSize === 'normal') return 'text-2xl sm:text-3xl leading-loose';
    if (fontSize === 'large') return 'text-3xl sm:text-4xl leading-[2.4]';
    return 'text-4xl sm:text-5xl leading-[2.7]';
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Top Floating Action Bar (From Reference Screen 2: White circular buttons) */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full bg-white shadow-md shadow-[#381230]/10 flex items-center justify-center text-[#381230] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#ede0cf]"
          aria-label="Back to Surahs"
          title="Back to Surah List"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Center Title Badge */}
        <div className="text-center">
          <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#e59523] font-bold block">
            Surah {surah.number}
          </span>
          <h2 className="text-lg font-serif font-bold text-[#381230]">
            {surah.englishName}
          </h2>
        </div>

        {/* Right Floating Settings / Favorite Button */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-11 h-11 rounded-full bg-white shadow-md shadow-[#381230]/10 flex items-center justify-center text-[#381230] hover:text-[#e59523] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#ede0cf]"
          aria-label="Reader Settings"
          title="Display & Font Settings"
        >
          <Settings2 className="w-5 h-5" />
        </button>
      </div>

      {/* Reader Settings Drawer */}
      {showSettings && (
        <div className="rounded-[28px] bg-[#fffdf9] border border-[#ede0cf] p-5 shadow-lg space-y-4 animate-fade-in text-xs text-[#785e70]">
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-[#381230] text-sm">Display Preferences</span>
            <button
              onClick={() => setShowSettings(false)}
              className="text-[#9c8495] hover:text-[#381230] font-bold"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#ede0cf]">
            <span className="font-serif">Arabic Font Size</span>
            <div className="flex items-center gap-1 bg-[#f5ecdf] p-1 rounded-full">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-3 py-1 rounded-full font-serif ${
                  fontSize === 'normal' ? 'bg-white text-[#381230] font-bold shadow-xs' : 'text-[#785e70]'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-3 py-1 rounded-full font-serif ${
                  fontSize === 'large' ? 'bg-white text-[#381230] font-bold shadow-xs' : 'text-[#785e70]'
                }`}
              >
                Large
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-3 py-1 rounded-full font-serif ${
                  fontSize === 'xlarge' ? 'bg-white text-[#381230] font-bold shadow-xs' : 'text-[#785e70]'
                }`}
              >
                Extra
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#ede0cf]">
            <span className="font-serif">Show Malayalam / Transliteration</span>
            <button
              onClick={() => setShowTransliteration(!showTransliteration)}
              className={`px-3.5 py-1.5 rounded-full font-serif ${
                showTransliteration
                  ? 'bg-[#e59523] text-white font-bold'
                  : 'bg-[#f5ecdf] text-[#785e70]'
              }`}
            >
              {showTransliteration ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      )}

      {/* Surah Header Card (Warm Sunset Ivory Card) */}
      <div className="rounded-[32px] bg-gradient-to-b from-[#fffbf4] to-[#fffdf9] border border-[#ede0cf] p-8 text-center shadow-[0_16px_40px_rgba(56,18,48,0.05)] relative overflow-hidden">
        {/* Soft Sunset Radial Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-gradient-to-b from-[#fcd485]/25 via-[#f8b475]/10 to-transparent pointer-events-none blur-2xl" />

        <div className="relative z-10 space-y-3">
          <div className="inline-block px-3 py-1 bg-[#fbf5eb] border border-[#edd7b6] text-[#e59523] rounded-full text-[11px] font-serif uppercase tracking-[0.2em] font-bold">
            {surah.revelationType} Revelation • {surah.numberOfAyahs} Verses
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#381230] tracking-tight">
            {surah.englishName}
          </h1>

          <div className="font-arabic text-3xl sm:text-4xl font-bold text-[#4a1740] py-2" dir="rtl">
            {surah.name}
          </div>

          <p className="text-sm font-serif italic text-[#785e70]">
            "{surah.englishNameTranslation}"
          </p>

          {/* Bismillah (for all surahs except At-Tawbah 9) */}
          {surah.number !== 9 && (
            <div className="pt-6 border-t border-[#ede0cf] mt-4">
              <div className="font-arabic text-2xl sm:text-3xl text-[#381230] leading-relaxed" dir="rtl">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>
              <p className="text-xs font-serif italic text-[#785e70] mt-1">
                In the name of Allah, the Entirely Merciful, the Especially Merciful.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Ayah List */}
      <div className="space-y-4">
        {surah.ayahs.map((ayah) => {
          const isPlayingThis = currentPlayingAyah?.number === ayah.number && isPlayingAudio;
          const isBookmarked = isAyahBookmarked(ayah.numberInSurah);

          return (
            <div
              key={ayah.number}
              ref={(el) => {
                ayahRefs.current[ayah.numberInSurah] = el;
              }}
              className={`rounded-[26px] p-6 transition-all duration-300 relative border ${
                isPlayingThis
                  ? 'bg-[#fffaf0] border-[#e59523] shadow-[0_8px_28px_rgba(229,149,35,0.15)] ring-2 ring-[#e59523]/20'
                  : 'bg-[#fffdf9] border-[#ede0cf] shadow-[0_4px_16px_rgba(56,18,48,0.02)] hover:border-[#edd7b6]'
              }`}
            >
              {/* Ayah Header Bar: Number Pill & Action Buttons */}
              <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-[#ede0cf]/60">
                {/* Saffron Circular Ayah Number */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#fbf5eb] border border-[#edd7b6] text-[#e59523] font-serif font-bold text-xs flex items-center justify-center shadow-xs">
                    {ayah.numberInSurah}
                  </div>
                  <span className="text-[11px] font-mono text-[#9c8495]">
                    {surah.number}:{ayah.numberInSurah}
                  </span>
                </div>

                {/* Action Buttons: Audio, Tafsir, Bookmark, Copy */}
                <div className="flex items-center gap-1.5">
                  {/* Play Audio Button */}
                  <button
                    onClick={() => (isPlayingThis ? onPauseAudio() : onPlayAyah(ayah))}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isPlayingThis
                        ? 'bg-[#e59523] text-white shadow-sm'
                        : 'bg-[#f5ecdf]/70 text-[#785e70] hover:text-[#e59523] hover:bg-[#fbf5eb]'
                    }`}
                    title={isPlayingThis ? 'Pause recitation' : 'Play Ayah recitation'}
                  >
                    {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => onToggleBookmark(ayah)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isBookmarked
                        ? 'bg-[#e59523] text-white shadow-sm'
                        : 'bg-[#f5ecdf]/70 text-[#785e70] hover:text-[#e59523] hover:bg-[#fbf5eb]'
                    }`}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark this verse'}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  {/* Tafsir Modal Trigger */}
                  <button
                    onClick={() => setSelectedTafsirAyah(ayah)}
                    className="w-8 h-8 rounded-full bg-[#f5ecdf]/70 text-[#785e70] hover:text-[#381230] hover:bg-[#fbf5eb] flex items-center justify-center transition-all cursor-pointer"
                    title="Read classical Tafsir commentary"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopyAyah(ayah)}
                    className="w-8 h-8 rounded-full bg-[#f5ecdf]/70 text-[#785e70] hover:text-[#381230] hover:bg-[#fbf5eb] flex items-center justify-center transition-all cursor-pointer"
                    title="Copy verse"
                  >
                    {copiedAyahNum === ayah.numberInSurah ? (
                      <Check className="w-3.5 h-3.5 text-[#1f9a84]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Arabic Text (Uthmani Script) */}
              <div
                dir="rtl"
                className={`font-arabic text-[#381230] font-bold text-right py-2 ${getArabicFontSize()}`}
              >
                {ayah.text}
              </div>

              {/* English Translation */}
              <div className="pt-3 border-t border-[#ede0cf]/60 mt-3 space-y-2">
                <p className="font-serif text-sm sm:text-base text-[#381230] leading-relaxed">
                  {ayah.translation}
                </p>

                {/* Transliteration / Malayalam optional */}
                {showTransliteration && ayah.transliteration && (
                  <p className="font-serif text-xs italic text-[#785e70]">
                    {ayah.transliteration}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tafsir Modal */}
      {selectedTafsirAyah && (
        <TafsirModal
          surah={surah}
          ayah={selectedTafsirAyah}
          onClose={() => setSelectedTafsirAyah(null)}
        />
      )}
    </div>
  );
};