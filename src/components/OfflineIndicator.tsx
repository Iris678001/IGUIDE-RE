import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { RiWifiOffLine } from 'react-icons/ri';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="bg-[#fef4ea] border-b border-[#f4c898] text-[#9b4916] px-4 py-2 text-xs flex items-center justify-center gap-2 sticky top-0 z-40 font-serif shadow-sm">
      <div className="w-5 h-5 rounded-full bg-[#ea5d47]/15 flex items-center justify-center text-[#ea5d47] shrink-0">
        <RiWifiOffLine className="w-3.5 h-3.5" />
      </div>
      <span>
        <strong className="font-semibold uppercase tracking-wider text-[11px] text-[#381230]">Offline Mode:</strong> Preserved Holy Qur'an text, commentary, and Kerala mosque guides are ready offline.
      </span>
    </div>
  );
};
