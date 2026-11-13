import React from 'react';
import { RiCompass3Line, RiBookOpenLine, RiMapPin2Line, RiBookmark3Line } from 'react-icons/ri';

interface NavbarProps {
  activeTab: 'quran' | 'mosques' | 'qibla' | 'offline';
  onNavigateTab: (tab: 'quran' | 'mosques' | 'qibla' | 'offline') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigateTab }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#fffdfa]/95 backdrop-blur-md border-b border-[#ede0cf] px-4 py-3 shadow-[0_4px_20px_rgba(56,18,48,0.04)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Clean Serif Brand Title */}
        <div
          onClick={() => onNavigateTab('quran')}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl tracking-[0.14em] text-[#381230] uppercase font-bold">
                i<span className="text-[#e59523]">guide</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#e59523] uppercase font-mono font-semibold border border-[#edd7b6] bg-[#fbf5eb] px-1.5 py-0.5 rounded-full">
                v1.0
              </span>
            </div>
            <p className="text-[11px] tracking-wider text-[#785e70] font-serif italic hidden sm:block">
              Holy Quran • Kerala Mosques • Sacred Qibla
            </p>
          </div>
        </div>

        {/* Desktop Navigation Pills */}
        <nav className="hidden md:flex items-center bg-[#f5ecdf]/70 border border-[#ede0cf] p-1 rounded-full shadow-inner">
          <button
            onClick={() => onNavigateTab('quran')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs tracking-wider uppercase font-serif rounded-full transition-all cursor-pointer ${
              activeTab === 'quran'
                ? 'bg-white text-[#381230] font-bold shadow-sm'
                : 'text-[#785e70] hover:text-[#381230]'
            }`}
          >
            <RiBookOpenLine className="w-3.5 h-3.5 text-[#e59523]" />
            <span>Holy Quran</span>
          </button>
          <button
            onClick={() => onNavigateTab('mosques')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs tracking-wider uppercase font-serif rounded-full transition-all cursor-pointer ${
              activeTab === 'mosques'
                ? 'bg-white text-[#381230] font-bold shadow-sm'
                : 'text-[#785e70] hover:text-[#381230]'
            }`}
          >
            <RiMapPin2Line className="w-3.5 h-3.5 text-[#ea5d47]" />
            <span>Kerala Mosques</span>
          </button>
          <button
            onClick={() => onNavigateTab('qibla')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs tracking-wider uppercase font-serif rounded-full transition-all cursor-pointer ${
              activeTab === 'qibla'
                ? 'bg-white text-[#381230] font-bold shadow-sm'
                : 'text-[#785e70] hover:text-[#381230]'
            }`}
          >
            <RiCompass3Line className="w-3.5 h-3.5 text-[#8c67c5]" />
            <span>Qibla Compass</span>
          </button>
          <button
            onClick={() => onNavigateTab('offline')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs tracking-wider uppercase font-serif rounded-full transition-all cursor-pointer ${
              activeTab === 'offline'
                ? 'bg-white text-[#381230] font-bold shadow-sm'
                : 'text-[#785e70] hover:text-[#381230]'
            }`}
          >
            <RiBookmark3Line className="w-3.5 h-3.5 text-[#1f9a84]" />
            <span>Saved &amp; Offline</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
