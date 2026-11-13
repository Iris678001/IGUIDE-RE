import React from 'react';
import { BookmarkCheck, BookOpen, Compass, MapPin } from 'lucide-react';

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
      label: 'Quran',
      icon: BookOpen,
      color: '#e59523',
    },
    {
      id: 'mosques' as const,
      label: 'Mosques',
      icon: MapPin,
      badge: mosqueCount !== undefined && mosqueCount > 0 ? mosqueCount : undefined,
      color: '#ea5d47',
    },
    {
      id: 'qibla' as const,
      label: 'Qibla',
      icon: Compass,
      color: '#8c67c5',
    },
    {
      id: 'offline' as const,
      label: 'Saved',
      icon: BookmarkCheck,
      color: '#1f9a84',
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-3 left-4 right-4 z-40 max-w-sm mx-auto bg-[#fffdfa]/95 backdrop-blur-md rounded-full border border-[#ede0cf] shadow-[0_12px_40px_rgba(56,18,48,0.18)] px-2 py-1.5 safe-area-bottom">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigateTab(tab.id)}
              className={`flex items-center gap-1.5 transition-all duration-200 cursor-pointer relative ${
                isActive
                  ? 'bg-[#f7eedf] text-[#381230] font-bold rounded-full px-3.5 py-1.5 shadow-sm'
                  : 'text-[#785e70] hover:text-[#381230] px-2.5 py-1.5'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className="w-4 h-4"
                  style={{
                    color: isActive ? tab.color : undefined,
                    strokeWidth: isActive ? 2.3 : 1.8,
                  }}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 px-1 min-w-[14px] h-[14px] bg-[#ea5d47] text-white text-[9px] font-bold font-mono rounded-full flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>

              {isActive && (
                <span className="text-[11px] font-serif tracking-wider uppercase">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};