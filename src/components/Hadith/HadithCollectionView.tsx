import React, { useState, useMemo } from 'react';
import {
  RiSearchLine,
  RiArrowRightLine,
  RiBookLine,
  RiMagicLine,
  RiCloseLine,
  RiLoader4Line,
  RiFileCopyLine,
  RiCheckLine,
  RiShareLine,
} from 'react-icons/ri';
import { HADITH_COLLECTIONS, HadithSectionMeta } from '../../data/hadithMetadata';
import { HadithChapterReader } from './HadithChapterReader';
import { fetchHadithByNumber, HadithItem } from '../../services/hadithApi';

interface HadithCollectionViewProps {
  collection: 'bukhari' | 'muslim';
}

export const HadithCollectionView: React.FC<HadithCollectionViewProps> = ({ collection }) => {
  const collectionMeta = HADITH_COLLECTIONS[collection];

  const [selectedSectionNumber, setSelectedSectionNumber] = useState<number | null>(null);
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  
  // Jump to specific Hadith # state
  const [jumpHadithNum, setJumpHadithNum] = useState('');
  const [jumpModalHadith, setJumpModalHadith] = useState<HadithItem | null>(null);
  const [isSearchingHadith, setIsSearchingHadith] = useState(false);
  const [jumpError, setJumpError] = useState<string | null>(null);
  const [copiedModal, setCopiedModal] = useState(false);

  const filteredSections = useMemo(() => {
    if (!bookSearchQuery.trim()) return collectionMeta.sections;
    const q = bookSearchQuery.toLowerCase().trim();
    return collectionMeta.sections.filter(
      (sec) =>
        sec.name.toLowerCase().includes(q) ||
        sec.sectionNumber.toString() === q ||
        `${sec.firstHadith}-${sec.lastHadith}`.includes(q)
    );
  }, [collectionMeta, bookSearchQuery]);

  const handleJumpToHadith = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpHadithNum.trim(), 10);
    if (isNaN(num) || num < 1 || num > collectionMeta.totalHadiths) {
      setJumpError(`Please enter a valid Hadith number between 1 and ${collectionMeta.totalHadiths}`);
      return;
    }

    setJumpError(null);
    setIsSearchingHadith(true);

    try {
      // First, find which section contains this hadith
      const targetSec = collectionMeta.sections.find(
        (s) => num >= s.firstHadith && num <= s.lastHadith
      );

      const hadith = await fetchHadithByNumber(collection, num);
      if (hadith) {
        setJumpModalHadith(hadith);
      } else if (targetSec) {
        // Fallback: open that section
        setSelectedSectionNumber(targetSec.sectionNumber);
      } else {
        setJumpError(`Hadith #${num} could not be retrieved. Please try again.`);
      }
    } catch {
      setJumpError(`Could not fetch Hadith #${num}. Please check network.`);
    } finally {
      setIsSearchingHadith(false);
    }
  };

  const handleCopyModalHadith = async () => {
    if (!jumpModalHadith) return;
    const text = `${collectionMeta.titleEn} - Hadith #${jumpModalHadith.hadithNumber}\n\n${jumpModalHadith.arabicText}\n\n"${jumpModalHadith.englishText}"`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedModal(true);
      setTimeout(() => setCopiedModal(false), 2000);
    } catch {
      // Fallback
    }
  };

  // If a section is selected, render the chapter reader
  if (selectedSectionNumber !== null) {
    return (
      <HadithChapterReader
        collection={collection}
        sectionNumber={selectedSectionNumber}
        onBack={() => setSelectedSectionNumber(null)}
        onSelectSection={(secNum) => setSelectedSectionNumber(secNum)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Banner with Cairo Sunset & Minarets */}
      <div className="rounded-[32px] bg-[#fffdf9] border border-[#ede0cf] p-6 sm:p-8 shadow-[0_16px_40px_rgba(56,18,48,0.06)] relative overflow-hidden group">
        <img
          src="/images/cairo_bazaar_minarets.jpg"
          alt="Islamic Heritage Minarets"
          className="absolute inset-0 w-full h-full object-cover object-[center_40%] opacity-70 pointer-events-none transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffdf9]/90 via-[#fffdf9]/60 to-transparent pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-[#fcd485]/20 via-[#f8b475]/10 to-transparent pointer-events-none blur-2xl" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#e59523] font-bold">
                Prophetic Sunnah
              </span>
              <span className="text-[10px] font-mono text-[#785e70] bg-[#f5ecdf] px-2.5 py-0.5 rounded-full font-semibold">
                {collectionMeta.sections.length} Books • {collectionMeta.totalHadiths.toLocaleString()} Hadiths
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl sm:text-3xl font-serif text-[#381230] font-bold tracking-tight">
                {collectionMeta.titleEn}
              </h2>
              <span className="font-arabic text-xl sm:text-2xl text-[#8c67c5] font-bold" dir="rtl">
                {collectionMeta.titleAr}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-serif italic text-[#785e70] leading-relaxed">
              {collection === 'bukhari'
                ? "The most authentic compilation of Sahih prophetic narrations by Imam Muhammad al-Bukhari with verified chains (Isnad)."
                : "The second canonical Sahih hadith collection by Imam Muslim ibn al-Hajjaj, renowned for thematic precision and rigorous methodology."}
            </p>
          </div>

          {/* Quick Direct Hadith Number Lookup */}
          <form
            onSubmit={handleJumpToHadith}
            className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-2xl border border-[#ede0cf] shadow-md"
          >
            <div className="flex items-center gap-2 px-3 py-1.5">
              <RiMagicLine className="w-4 h-4 text-[#e59523]" />
              <input
                type="number"
                min="1"
                max={collectionMeta.totalHadiths}
                placeholder={`Hadith # (1–${collectionMeta.totalHadiths})`}
                value={jumpHadithNum}
                onChange={(e) => setJumpHadithNum(e.target.value)}
                className="w-36 text-xs font-mono focus:outline-none bg-transparent text-[#381230] placeholder-[#9a7d8c]"
              />
            </div>
            <button
              type="submit"
              disabled={isSearchingHadith || !jumpHadithNum}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e59523] to-[#d4811a] hover:from-[#f0a22a] hover:to-[#e59523] text-white font-serif text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1.5"
            >
              {isSearchingHadith ? (
                <RiLoader4Line className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>Jump</span>
                  <RiArrowRightLine className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {jumpError && (
        <div className="p-3 bg-[#fdf2e9] border border-[#f5c6a5] text-[#a64e1e] text-xs font-serif rounded-xl flex items-center justify-between">
          <span>{jumpError}</span>
          <button onClick={() => setJumpError(null)} className="p-1 cursor-pointer">
            <RiCloseLine className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Book Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#785e70]" />
          <input
            type="text"
            placeholder={`Search across ${collectionMeta.sections.length} books (e.g., Belief, Prayer, Fasting, Zakat, Knowledge)...`}
            value={bookSearchQuery}
            onChange={(e) => setBookSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-serif rounded-full bg-[#fffdfa] border border-[#ede0cf] focus:outline-none focus:border-[#e59523] text-[#381230] placeholder-[#a890a2] shadow-[0_4px_16px_rgba(56,18,48,0.02)]"
          />
        </div>

        <div className="shrink-0 text-xs font-serif text-[#785e70] px-3">
          Showing <span className="font-bold text-[#381230]">{filteredSections.length}</span> of {collectionMeta.sections.length} Books
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSections.map((sec) => (
          <div
            key={sec.sectionNumber}
            onClick={() => setSelectedSectionNumber(sec.sectionNumber)}
            className="rounded-[24px] bg-[#fffdf9] border border-[#ede0cf] p-5 shadow-[0_8px_20px_rgba(56,18,48,0.03)] hover:shadow-[0_12px_28px_rgba(56,18,48,0.08)] hover:border-[#e59523] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold text-[#e59523] uppercase tracking-wider bg-[#fbf5eb] px-2.5 py-0.5 rounded-full border border-[#edd7b6]">
                  Book {sec.sectionNumber}
                </span>
                <span className="text-[10px] font-mono text-[#785e70]">
                  {sec.totalHadiths > 0 ? `${sec.totalHadiths} Hadiths` : 'Hadiths'}
                </span>
              </div>

              <h3 className="font-serif text-base font-bold text-[#381230] group-hover:text-[#e59523] transition-colors leading-snug line-clamp-2">
                {sec.name}
              </h3>
            </div>

            <div className="mt-4 pt-3 border-t border-[#f4eadc] flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-[#785e70]">
                Hadiths {sec.firstHadith} – {sec.lastHadith}
              </span>
              <div className="w-7 h-7 rounded-full bg-[#fbf5eb] group-hover:bg-[#e59523] text-[#785e70] group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-1 shadow-sm">
                <RiArrowRightLine className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Single Hadith Modal (from Direct Jump Search) */}
      {jumpModalHadith && (
        <div className="fixed inset-0 z-50 bg-[#381230]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fffdf9] border border-[#ede0cf] rounded-[32px] max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setJumpModalHadith(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#fbf5eb] border border-[#edd7b6] text-[#785e70] hover:text-[#381230] transition-colors cursor-pointer"
            >
              <RiCloseLine className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#fbf5eb] border border-[#edd7b6] text-[#e59523] font-mono text-xs font-bold">
                {collectionMeta.titleEn} • Hadith #{jumpModalHadith.hadithNumber}
              </span>
              <span className="text-[11px] font-serif font-bold text-[#1f9a84] bg-[#edf8f5] px-2.5 py-0.5 rounded-full border border-[#c6ece4]">
                Sahih (Authentic)
              </span>
            </div>

            {jumpModalHadith.arabicText && (
              <div
                className="font-arabic text-xl sm:text-2xl text-[#381230] leading-[2.2] text-right bg-[#fbf8f2] p-5 rounded-[22px] border border-[#ede0cf]/70 select-text"
                dir="rtl"
              >
                {jumpModalHadith.arabicText}
              </div>
            )}

            <div className="text-sm font-serif text-[#381230] leading-relaxed select-text space-y-2">
              <p className="italic text-[#785e70] text-xs font-sans uppercase tracking-wider">
                Translation:
              </p>
              <p className="leading-relaxed whitespace-pre-line">{jumpModalHadith.englishText}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#ede0cf]">
              <button
                onClick={handleCopyModalHadith}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fbf5eb] border border-[#edd7b6] text-[#381230] hover:text-[#e59523] font-serif text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                {copiedModal ? <RiCheckLine className="w-4 h-4 text-[#1f9a84]" /> : <RiFileCopyLine className="w-4 h-4" />}
                <span>{copiedModal ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={() => {
                  const targetSec = collectionMeta.sections.find(
                    (s) =>
                      jumpModalHadith.hadithNumber >= s.firstHadith &&
                      jumpModalHadith.hadithNumber <= s.lastHadith
                  );
                  if (targetSec) {
                    setSelectedSectionNumber(targetSec.sectionNumber);
                  }
                  setJumpModalHadith(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#e59523] to-[#d4811a] text-white font-serif text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                <RiBookLine className="w-4 h-4" />
                <span>Open Full Chapter</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
