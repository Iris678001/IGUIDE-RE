import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  return (
    <>
      {isInstallable && (
        <button
          onClick={install}
          aria-label="Install iguide PWA"
          className="flex items-center gap-1.5 border border-[#3e3422] bg-[#181c24] hover:bg-[#202530] text-[#c8a261] text-xs font-serif uppercase tracking-wider px-3 py-1 transition-colors cursor-pointer"
        >
          <Download className="w-3 h-3" />
          <span>Install App</span>
        </button>
      )}

      {isIOS && (
        <button
          onClick={() => setShowIOSGuide(true)}
          aria-label="Install iguide on iPhone or iPad"
          className="flex items-center gap-1.5 border border-[#2d323e] bg-[#141720] hover:bg-[#1a1e28] text-[#d6d0c4] text-xs font-serif uppercase tracking-wider px-3 py-1 transition-colors cursor-pointer"
        >
          <Smartphone className="w-3 h-3 text-[#c8a261]" />
          <span>Add to iOS</span>
        </button>
      )}

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4 font-serif">
          <div className="w-full max-w-sm border border-[#3e3422] bg-[#101318] p-6 shadow-2xl text-[#f3efe6]">
            <div className="flex items-center justify-between border-b border-[#232730] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1 border border-[#c8a261] text-[#c8a261]">
                  <Smartphone className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-[#f3efe6]">Install on iOS</h3>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 border border-[#2d323e] text-[#9aa0a6] hover:text-[#f3efe6] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ol className="text-xs text-[#d6d0c4] space-y-3 pl-4 list-decimal leading-relaxed">
              <li>
                Tap the <strong className="text-[#c8a261]">Share</strong> button in Safari's bottom toolbar.
              </li>
              <li>
                Scroll down and select <strong className="text-[#c8a261]">Add to Home Screen</strong>.
              </li>
              <li>
                Tap <strong className="text-[#c8a261]">Add</strong> in the top right corner.
              </li>
            </ol>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-6 w-full py-2 border border-[#3e3422] bg-[#181c24] hover:bg-[#202530] text-[#c8a261] text-xs font-serif uppercase tracking-widest transition-colors cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </>
  );
};
