import React from 'react';
import { BookmarkCheck, BookOpen, Compass, Landmark } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'quran' | 'mosques' | 'qibla' | 'offline';
  onNavigateTab: (tab: 'quran' | 'mosques' | 'qibla' | 'offline') => void;
  mosqueCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onNavigateTab,
  mosqueCount,
}) => {
  const tabs = [
    {
      id: 'quran' as const,
      label: "Qur'an",
      icon: BookOpen,
      gradient: 'from-[#fdb849] to-[#e59523]',
      activeShadow: 'shadow-amber-500/25',
      accentColor: '#e59523',
    },
    {
      id: 'mosques' as const,
      label: 'Mosques',
      icon: Landmark,
      badge: mosqueCount !== undefined && mosqueCount > 0 ? mosqueCount : undefined,
      gradient: 'from-[#ff7d66] to-[#ea5d47]',
      activeShadow: 'shadow-red-500/25',
      accentColor: '#ea5d47',
    },
    {
      id: 'qibla' as const,
      label: 'Qibla',
      icon: Compass,
      gradient: 'from-[#a987df] to-[#8c67c5]',
      activeShadow: 'shadow-purple-500/25',
      accentColor: '#8c67c5',
    },
    {
      id: 'offline' as const,
      label: 'Saved',
      icon: BookmarkCheck,
      gradient: 'from-[#3cc1a9] to-[#1f9a84]',
      activeShadow: 'shadow-teal-500/25',
      accentColor: '#1f9a84',
    },
  ];

  const handleTabClick = (tabId: 'quran' | 'mosques' | 'qibla' | 'offline') => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // Haptics not allowed
      }
    }
    onNavigateTab(tabId);
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto bg-[#fffdf9]/95 backdrop-blur-xl rounded-[28px] border border-[#ede0cf] shadow-[0_16px_40px_rgba(56,18,48,0.16)] px-2 py-1.5 select-none touch-manipulation transition-all"
    >
      <div className="grid grid-cols-4 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
              className="group relative flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all duration-200 ease-out active:scale-90 cursor-pointer"
            >
              {/* Icon Container with Smooth Tactile Squircle */}
              <div
                className={`relative w-10 h-10 rounded-[14px] flex items-center justify-center transition-all duration-300 ease-out ${
                  isActive
                    ? `bg-gradient-to-b ${tab.gradient} text-white shadow-md ${tab.activeShadow} scale-105`
                    : 'text-[#85687d] group-hover:text-[#381230] group-hover:bg-[#f8ede0]/60'
                }`}
              >
                <Icon
                  className="w-5 h-5 transition-transform duration-200"
                  style={{
                    strokeWidth: isActive ? 2.3 : 1.9,
                  }}
                />

                {/* Optional Badge */}
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 px-1 min-w-[14px] h-[14px] bg-[#ea5d47] text-white text-[9px] font-bold font-mono rounded-full flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Persistent Ergonomic Label - Zero Layout Shift */}
              <span
                className={`text-[10px] font-serif tracking-tight mt-1 transition-colors duration-200 ${
                  isActive
                    ? 'font-bold text-[#381230]'
                    : 'font-normal text-[#85687d] group-hover:text-[#381230]'
                }`}
              >
                {tab.label}
              </span>

              {/* Active Indicator Micro-Pill */}
              <span
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  isActive ? 'w-4 mt-0.5' : 'w-0 mt-0.5'
                }`}
                style={{ backgroundColor: tab.accentColor }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
