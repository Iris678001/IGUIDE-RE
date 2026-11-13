import React, { useEffect, useState, useMemo } from 'react';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiFileCopyLine,
  RiCheckLine,
  RiShareLine,
  RiSearchLine,
  RiLoader4Line,
  RiBookOpenLine,
  RiShieldCheckLine,
} from 'react-icons/ri';
import { fetchHadithSection, HadithItem } from '../../services/hadithApi';
import { HADITH_COLLECTIONS, HadithSectionMeta } from '../../data/hadithMetadata';

interface HadithChapterReaderProps {
  collection: 'bukhari' | 'muslim';
  sectionNumber: number;
  onBack: () => void;
  onSelectSection: (sectionNumber: number) => void;
}

export const HadithChapterReader: React.FC<HadithChapterReaderProps> = ({
  collection,
  sectionNumber,
  onBack,
  onSelectSection,
}) => {
  const [hadiths, setHadiths] = useState<HadithItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  const collectionMeta = HADITH_COLLECTIONS[collection];
  const currentSection: HadithSectionMeta | undefined = collectionMeta.sections.find(
    (s) => s.sectionNumber === sectionNumber
  );

  // Find previous and next available sections
  const currentIndex = collectionMeta.sections.findIndex(
    (s) => s.sectionNumber === sectionNumber
  );
  const prevSection = currentIndex > 0 ? collectionMeta.sections[currentIndex - 1] : null;
  const nextSection =
    currentIndex >= 0 && currentIndex < collectionMeta.sections.length - 1
      ? collectionMeta.sections[currentIndex + 1]
      : null;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setFilterQuery('');

    // Scroll to top when opening a new chapter
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetchHadithSection(collection, sectionNumber)
      .then((data) => {
        if (!isMounted) return;
        setHadiths(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : 'Failed to load chapter';
        setError(msg);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [collection, sectionNumber]);

  const filteredHadiths = useMemo(() => {
    if (!filterQuery.trim()) return hadiths;
    const q = filterQuery.toLowerCase();
    return hadiths.filter(
      (h) =>
        h.hadithNumber.toString().includes(q) ||
        h.englishText.toLowerCase().includes(q) ||
        h.arabicText.includes(q)
    );
  }, [hadiths, filterQuery]);

  const handleCopyHadith = async (hadith: HadithItem) => {
    const textToCopy = `${collectionMeta.titleEn} - Hadith #${hadith.hadithNumber}\n\n${hadith.arabicText}\n\n"${hadith.englishText}"\n\n[Grade: ${hadith.grade || 'Sahih'}]`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(hadith.hadithNumber);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleShareHadith = async (hadith: HadithItem) => {
    const shareData = {
      title: `${collectionMeta.titleEn} #${hadith.hadithNumber}`,
      text: `${hadith.arabicText}\n\n"${hadith.englishText}"\n\n— ${collectionMeta.titleEn} (Hadith #${hadith.hadithNumber})`,
      url: window.location.href,
    };
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User dismissed share
      }
    } else {
      await handleCopyHadith(hadith);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Sticky Chapter Bar */}
      <div className="sticky top-[61px] z-20 bg-[#fffdfa]/95 backdrop-blur-md border border-[#ede0cf] p-4 rounded-[24px] shadow-[0_8px_24px_rgba(56,18,48,0.06)] flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#fbf5eb] border border-[#edd7b6] text-[#381230] hover:text-[#e59523] font-serif text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
        >
          <RiArrowLeftLine className="w-4 h-4 text-[#e59523]" />
          <span>All Books</span>
        </button>

        <div className="flex-1 min-w-[200px] text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-[10px] font-mono text-[#e59523] uppercase tracking-wider font-bold">
              {collectionMeta.titleEn} • Book {sectionNumber}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#381230] truncate">
            {currentSection ? currentSection.name : `Book ${sectionNumber}`}
          </h2>
        </div>

        {/* Chapter Steppers */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => prevSection && onSelectSection(prevSection.sectionNumber)}
            disabled={!prevSection}
            className="p-2 rounded-full bg-[#fbf5eb] border border-[#edd7b6] text-[#381230] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#edd7b6] transition-all cursor-pointer"
            title={prevSection ? `Previous: ${prevSection.name}` : undefined}
          >
            <RiArrowLeftLine className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-[#785e70]">
            {currentIndex + 1} / {collectionMeta.sections.length}
          </span>
          <button
            onClick={() => nextSection && onSelectSection(nextSection.sectionNumber)}
            disabled={!nextSection}
            className="p-2 rounded-full bg-[#fbf5eb] border border-[#edd7b6] text-[#381230] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#edd7b6] transition-all cursor-pointer"
            title={nextSection ? `Next: ${nextSection.name}` : undefined}
          >
            <RiArrowRightLine className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chapter Overview Card */}
      <div className="rounded-[28px] bg-gradient-to-br from-[#fffdf9] to-[#fbf7f0] border border-[#ede0cf] p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#e59523] font-semibold">
            {collectionMeta.titleAr}
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#381230]">
            {currentSection ? currentSection.name : `Book ${sectionNumber}`}
          </h1>
          <p className="text-xs text-[#785e70] font-serif italic mt-1">
            {currentSection
              ? `Hadiths ${currentSection.firstHadith} – ${currentSection.lastHadith} (${hadiths.length} Hadiths in this book)`
              : `${hadiths.length} Hadiths`}
          </p>
        </div>

        {/* Quick Filter Within Chapter */}
        <div className="relative w-full sm:w-72">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#785e70]" />
          <input
            type="text"
            placeholder="Search this chapter or #..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-serif rounded-full bg-white border border-[#ede0cf] focus:outline-none focus:border-[#e59523] text-[#381230] placeholder-[#a890a2] shadow-inner"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <RiLoader4Line className="w-8 h-8 text-[#e59523] animate-spin" />
          <p className="text-xs font-serif uppercase tracking-widest text-[#785e70]">
            Fetching Authentic Hadiths...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-8 rounded-[28px] border border-[#f4c898] bg-[#fffdf9] text-center max-w-md mx-auto my-8 shadow-md">
          <p className="text-[#a64e1e] font-serif mb-4 text-sm">{error}</p>
          <button
            onClick={() => onSelectSection(sectionNumber)}
            className="px-6 py-2.5 rounded-full bg-gradient-to-br from-[#e59523] to-[#d87c10] text-white text-xs font-serif uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer font-bold"
          >
            Retry Loading
          </button>
        </div>
      )}

      {/* Hadith Cards List */}
      {!loading && !error && (
        <div className="space-y-6">
          {filteredHadiths.length === 0 ? (
            <div className="text-center py-16 bg-[#fffdf9] rounded-[24px] border border-[#ede0cf] p-8">
              <RiBookOpenLine className="w-10 h-10 text-[#d4b99b] mx-auto mb-3" />
              <p className="font-serif text-[#381230] font-bold">No Hadiths match your search</p>
              <p className="text-xs text-[#785e70] font-serif mt-1">Try another keyword or Hadith number</p>
            </div>
          ) : (
            filteredHadiths.map((hadith) => (
              <div
                key={hadith.hadithNumber}
                id={`hadith-${hadith.hadithNumber}`}
                className="rounded-[28px] bg-[#fffdf9] border border-[#ede0cf] p-6 sm:p-8 shadow-[0_8px_24px_rgba(56,18,48,0.04)] hover:shadow-[0_12px_32px_rgba(56,18,48,0.08)] transition-all space-y-6"
              >
                {/* Hadith Header Meta & Actions */}
                <div className="flex items-center justify-between border-b border-[#f4eadc] pb-3 gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-[#fbf5eb] border border-[#edd7b6] text-[#e59523] font-mono text-xs font-bold">
                      Hadith #{hadith.hadithNumber}
                    </span>
                    {hadith.reference && (
                      <span className="text-[11px] font-mono text-[#785e70]">
                        Book {hadith.reference.book}, No. {hadith.reference.hadith}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-[11px] font-serif font-bold text-[#1f9a84] bg-[#edf8f5] px-2.5 py-0.5 rounded-full border border-[#c6ece4]">
                      <RiShieldCheckLine className="w-3.5 h-3.5" />
                      {hadith.grade || 'Sahih (Authentic)'}
                    </span>
                  </div>

                  {/* Actions: Copy & Share */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopyHadith(hadith)}
                      className="p-2 rounded-full hover:bg-[#fbf5eb] text-[#785e70] hover:text-[#e59523] transition-colors cursor-pointer"
                      title="Copy Hadith"
                    >
                      {copiedId === hadith.hadithNumber ? (
                        <RiCheckLine className="w-4 h-4 text-[#1f9a84]" />
                      ) : (
                        <RiFileCopyLine className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleShareHadith(hadith)}
                      className="p-2 rounded-full hover:bg-[#fbf5eb] text-[#785e70] hover:text-[#e59523] transition-colors cursor-pointer"
                      title="Share Hadith"
                    >
                      <RiShareLine className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Arabic Text Display */}
                {hadith.arabicText && (
                  <div
                    className="font-arabic text-xl sm:text-2xl text-[#381230] leading-[2.2] text-right bg-[#fbf8f2] p-5 sm:p-6 rounded-[22px] border border-[#ede0cf]/70 select-text"
                    dir="rtl"
                  >
                    {hadith.arabicText}
                  </div>
                )}

                {/* English Translation */}
                <div className="text-sm sm:text-base font-serif text-[#381230] leading-relaxed select-text space-y-2">
                  <p className="italic text-[#785e70] text-xs font-sans uppercase tracking-wider">
                    Translation:
                  </p>
                  <p className="leading-relaxed whitespace-pre-line">{hadith.englishText}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Bottom Chapter Steppers */}
      {!loading && !error && (
        <div className="flex items-center justify-between pt-6 border-t border-[#ede0cf]">
          {prevSection ? (
            <button
              onClick={() => onSelectSection(prevSection.sectionNumber)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fbf5eb] border border-[#edd7b6] text-[#381230] hover:text-[#e59523] font-serif text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <RiArrowLeftLine className="w-4 h-4 text-[#e59523]" />
              <span className="hidden sm:inline">Book {prevSection.sectionNumber}:</span>{' '}
              <span className="truncate max-w-[150px]">{prevSection.name}</span>
            </button>
          ) : (
            <div />
          )}

          {nextSection && (
            <button
              onClick={() => onSelectSection(nextSection.sectionNumber)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fbf5eb] border border-[#edd7b6] text-[#381230] hover:text-[#e59523] font-serif text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ml-auto"
            >
              <span className="hidden sm:inline">Book {nextSection.sectionNumber}:</span>{' '}
              <span className="truncate max-w-[150px]">{nextSection.name}</span>
              <RiArrowRightLine className="w-4 h-4 text-[#e59523]" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
