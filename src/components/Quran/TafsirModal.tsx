import React, { useEffect, useState } from 'react';
import { Ayah, SurahData, TafsirData } from '../../types/quran';
import { fetchAyahTafsir } from '../../services/quranApi';
import {
  RiBookOpenLine,
  RiCheckLine,
  RiFileCopyLine,
  RiVolumeUpLine,
  RiCloseLine,
} from 'react-icons/ri';

interface TafsirModalProps {
  surah: SurahData;
  ayah: Ayah;
  onClose: () => void;
  onPlayAyah?: (ayah: Ayah) => void;
}

export const TafsirModal: React.FC<TafsirModalProps> = ({
  surah,
  ayah,
  onClose,
  onPlayAyah
}) => {
  const [tafsirData, setTafsirData] = useState<TafsirData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchAyahTafsir(surah.number, ayah.numberInSurah)
      .then((data) => {
        if (isMounted) {
          setTafsirData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setTafsirData({
            surahNumber: surah.number,
            ayahNumber: ayah.numberInSurah,
            author: 'Classical Mufassirun',
            text: ayah.tafsir || 'Tafsir commentary and reflection for this blessed verse.',
            source: 'Tafsir Al-Qur\'an Al-\'Azim'
          });
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [surah.number, ayah.numberInSurah, ayah.tafsir]);

  const handleCopy = () => {
    const textToCopy = `${surah.englishName} (${surah.number}:${ayah.numberInSurah})\n\n${ayah.text}\n\n"${ayah.translation}"\n\n--- Tafsir (${tafsirData?.author || 'Tafsir'}) ---\n${tafsirData?.text || ''}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-3 sm:p-4">
      <div className="w-full max-w-2xl border border-[#3e3422] bg-[#0f1217] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col font-serif">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#232730] flex items-center justify-between bg-[#13171e]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 border border-[#c8a261] flex items-center justify-center text-[#c8a261]">
              <RiBookOpenLine className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c8a261] block">
                Classical Exegesis (Tafsir)
              </span>
              <h3 className="font-serif text-[#f3efe6] text-base sm:text-lg font-bold">
                {surah.englishName} • Verse {ayah.numberInSurah}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-[#2d323e] hover:border-[#c8a261] text-[#9aa0a6] hover:text-[#f3efe6] transition-colors cursor-pointer"
            aria-label="Close Tafsir"
          >
            <RiCloseLine className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          {/* Verse Arabic & Translation Block */}
          <div className="p-4 border border-[#242832] bg-[#14171f] space-y-3">
            <div
              className="text-right text-xl sm:text-2xl text-[#dfbc7c] leading-relaxed"
              dir="rtl"
              style={{ fontFamily: "'Scheherazade New', 'Amiri', serif" }}
            >
              {ayah.text}
            </div>
            <div className="pt-3 border-t border-[#1c2028] text-sm text-[#d4cfc5] leading-relaxed italic">
              "{ayah.translation}"
            </div>
          </div>

          {/* Tafsir Commentary */}
          {loading ? (
            <div className="py-12 text-center text-[#9aa0a6] space-y-2 font-mono text-xs">
              <div className="w-5 h-5 border-2 border-[#c8a261] border-t-transparent animate-spin mx-auto"></div>
              <p>Consulting classical commentaries...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#232730]">
                <span className="text-xs uppercase font-mono tracking-wider text-[#c8a261]">
                  Commentary: {tafsirData?.author || 'Tafsir Ibn Kathir / Al-Muyassar'}
                </span>
                <span className="text-[10px] font-mono text-[#5e646e]">
                  {tafsirData?.source || 'Traditional Sunnah Archive'}
                </span>
              </div>

              <div className="text-[#f3efe6] text-sm leading-relaxed whitespace-pre-line font-serif">
                {tafsirData?.text}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#232730] bg-[#13171e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onPlayAyah && (
              <button
                onClick={() => onPlayAyah(ayah)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#2d323e] hover:border-[#c8a261] text-[#c8a261] text-xs font-serif uppercase tracking-wider transition-colors cursor-pointer"
              >
                <RiVolumeUpLine className="w-3.5 h-3.5" />
                <span>Hear Recitation</span>
              </button>
            )}

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#2d323e] hover:border-[#c8a261] text-[#9aa0a6] hover:text-[#f3efe6] text-xs font-serif uppercase tracking-wider transition-colors cursor-pointer"
            >
              {copied ? <RiCheckLine className="w-3.5 h-3.5 text-[#72b896]" /> : <RiFileCopyLine className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-[#3e3422] bg-[#191d25] hover:bg-[#202530] text-[#c8a261] text-xs font-serif uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
