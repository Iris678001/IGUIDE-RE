import React, { useCallback, useEffect, useState } from 'react';
import { Ayah, Bookmark, Reciter, SurahData } from './types/quran';
import { UserLocation } from './types/mosque';
import { SURAH_LIST, POPULAR_RECITERS } from './data/surahList';
import { fetchSurah } from './services/quranApi';
import {
  getAllOfflineSurahNumbers,
  getBookmarks,
  saveBookmark,
  deleteBookmark,
  saveOfflineSurah,
} from './utils/offlineStorage';
import { useOnlineStatus } from './hooks/useOnlineStatus';

import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SurahList } from './components/Quran/SurahList';
import { SurahReader } from './components/Quran/SurahReader';
import { AudioPlayerBar } from './components/AudioPlayer/AudioPlayerBar';
import { MosqueFinderView } from './components/MosqueFinder/MosqueFinderView';
import { QiblaCompassView } from './components/Qibla/QiblaCompassView';
import { OfflineManagerView } from './components/OfflineManager/OfflineManagerView';
import { RiLoader4Line } from 'react-icons/ri';

export default function App() {
  const isOnline = useOnlineStatus();
  const [activeTab, setActiveTab] = useState<'quran' | 'mosques' | 'qibla' | 'offline'>('quran');
  
  // Quran reader state
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(null);
  const [currentSurah, setCurrentSurah] = useState<SurahData | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState(false);
  const [surahError, setSurahError] = useState<string | null>(null);

  // Audio state
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(POPULAR_RECITERS[0]);
  const [currentPlayingAyah, setCurrentPlayingAyah] = useState<Ayah | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Offline & Bookmarks state
  const [downloadedSurahs, setDownloadedSurahs] = useState<number[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [lastReadSurah, setLastReadSurah] = useState<{ surahNumber: number; ayahNumber: number } | null>(() => {
    try {
      const saved = localStorage.getItem('iguide_last_read');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Bulk download state
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({ current: 0, total: SURAH_LIST.length });

  // Geolocation state for Qibla & Mosques
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  // Request user location
  const requestUserLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracyMeters: pos.coords.accuracy,
          timestamp: pos.timestamp || Date.now(),
        });
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Initial load: offline surahs, bookmarks, geolocation
  useEffect(() => {
    void getAllOfflineSurahNumbers().then(setDownloadedSurahs);
    void getBookmarks().then(setBookmarks);
    requestUserLocation();
  }, [requestUserLocation]);

  // Load a surah
  const loadSurah = useCallback(async (surahNum: number, reciter = selectedReciter) => {
    setIsLoadingSurah(true);
    setSurahError(null);
    try {
      const data = await fetchSurah(surahNum, reciter.edition);
      setCurrentSurah(data);
      setSelectedSurahNumber(surahNum);
      const newLastRead = { surahNumber: surahNum, ayahNumber: 1 };
      setLastReadSurah(newLastRead);
      try {
        localStorage.setItem('iguide_last_read', JSON.stringify(newLastRead));
      } catch {}
    } catch (err: any) {
      setSurahError(err?.message || 'Failed to load Surah.');
    } finally {
      setIsLoadingSurah(false);
    }
  }, [selectedReciter]);

  // Select a Surah from list or offline bookmarks
  const handleSelectSurah = (surahNumber: number) => {
    setActiveTab('quran');
    void loadSurah(surahNumber);
  };

  // Back to Surah List
  const handleBackToSurahList = () => {
    setSelectedSurahNumber(null);
    setCurrentSurah(null);
  };

  // Audio controls
  const handlePlayAyah = (ayah: Ayah) => {
    setCurrentPlayingAyah(ayah);
    setIsPlayingAudio(true);
  };

  const handlePauseAudio = () => {
    setIsPlayingAudio(false);
  };

  const handleTogglePlay = () => {
    if (!currentPlayingAyah && currentSurah?.ayahs.length) {
      setCurrentPlayingAyah(currentSurah.ayahs[0]);
      setIsPlayingAudio(true);
      return;
    }
    setIsPlayingAudio((prev) => !prev);
  };

  const handleNextAyah = () => {
    if (!currentSurah || !currentPlayingAyah) return;
    const currentIndex = currentSurah.ayahs.findIndex((a) => a.number === currentPlayingAyah.number);
    if (currentIndex >= 0 && currentIndex < currentSurah.ayahs.length - 1) {
      setCurrentPlayingAyah(currentSurah.ayahs[currentIndex + 1]);
      setIsPlayingAudio(true);
    } else if (currentSurah.number < 114) {
      const nextSurahNum = currentSurah.number + 1;
      void loadSurah(nextSurahNum).then(() => {
        void fetchSurah(nextSurahNum, selectedReciter.edition).then((nextS) => {
          if (nextS.ayahs.length > 0) {
            setCurrentPlayingAyah(nextS.ayahs[0]);
            setIsPlayingAudio(true);
          }
        });
      });
    }
  };

  const handlePrevAyah = () => {
    if (!currentSurah || !currentPlayingAyah) return;
    const currentIndex = currentSurah.ayahs.findIndex((a) => a.number === currentPlayingAyah.number);
    if (currentIndex > 0) {
      setCurrentPlayingAyah(currentSurah.ayahs[currentIndex - 1]);
      setIsPlayingAudio(true);
    }
  };

  const handleAyahEnded = () => {
    handleNextAyah();
  };

  const handleSelectReciter = (reciter: Reciter) => {
    setSelectedReciter(reciter);
    if (currentSurah) {
      void loadSurah(currentSurah.number, reciter);
    }
  };

  // Bookmark toggle
  const handleToggleBookmark = async (ayah: Ayah) => {
    if (!currentSurah) return;
    const existing = bookmarks.find(
      (b) => b.surahNumber === currentSurah.number && b.ayahNumber === ayah.numberInSurah
    );

    if (existing) {
      await deleteBookmark(existing.id);
      setBookmarks((prev) => prev.filter((b) => b.id !== existing.id));
    } else {
      const newBookmark: Bookmark = {
        id: `bm-${currentSurah.number}-${ayah.numberInSurah}-${Date.now()}`,
        surahNumber: currentSurah.number,
        surahName: currentSurah.englishName,
        ayahNumber: ayah.numberInSurah,
        textSnippet: ayah.text.slice(0, 80) + '...',
        translationSnippet: ayah.translation.slice(0, 100) + '...',
        createdAt: Date.now(),
      };
      await saveBookmark(newBookmark);
      setBookmarks((prev) => [newBookmark, ...prev]);
    }
  };

  const isAyahBookmarked = (ayahNumber: number): boolean => {
    if (!currentSurah) return false;
    return bookmarks.some(
      (b) => b.surahNumber === currentSurah.number && b.ayahNumber === ayahNumber
    );
  };

  const handleDeleteBookmark = async (id: string) => {
    await deleteBookmark(id);
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  // Offline Save
  const handleSaveOffline = async (surah: SurahData) => {
    await saveOfflineSurah(surah);
    setDownloadedSurahs((prev) => Array.from(new Set([...prev, surah.number])).sort((a, b) => a - b));
  };

  // Bulk download all surahs
  const handleDownloadAll = async () => {
    if (isDownloadingAll) return;
    setIsDownloadingAll(true);
    setDownloadProgress({ current: 0, total: SURAH_LIST.length });

    for (let i = 0; i < SURAH_LIST.length; i++) {
      const s = SURAH_LIST[i];
      try {
        const fullSurah = await fetchSurah(s.number, selectedReciter.edition);
        await saveOfflineSurah(fullSurah);
      } catch (e) {
        console.warn(`Could not cache surah ${s.number}:`, e);
      }
      setDownloadProgress({ current: i + 1, total: SURAH_LIST.length });
    }

    const updated = await getAllOfflineSurahNumbers();
    setDownloadedSurahs(updated);
    setIsDownloadingAll(false);
  };

  return (
    <div className="min-h-screen bg-[#fbf7f0] text-[#381230] flex flex-col font-serif selection:bg-[#e59523]/30 selection:text-[#381230] pb-28 md:pb-20">
      <OfflineIndicator />
      
      <Navbar activeTab={activeTab} onNavigateTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* TAB: QURAN */}
        {activeTab === 'quran' && (
          <>
            {isLoadingSurah ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
                <RiLoader4Line className="w-8 h-8 text-[#e59523] animate-spin" />
                <p className="text-xs uppercase tracking-widest text-[#785e70] font-sans font-semibold">Opening Holy Manuscript...</p>
              </div>
            ) : surahError ? (
              <div className="p-8 rounded-[32px] border border-[#f4c898] bg-[#fffdf9] text-center max-w-md mx-auto my-12 shadow-xl">
                <p className="text-[#a64e1e] font-serif mb-4 text-sm">{surahError}</p>
                <button
                  onClick={() => selectedSurahNumber && loadSurah(selectedSurahNumber)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-br from-[#e59523] to-[#d87c10] text-white text-xs font-serif uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer font-bold"
                >
                  Retry Reading
                </button>
              </div>
            ) : currentSurah ? (
              <SurahReader
                surah={currentSurah}
                onBack={handleBackToSurahList}
                onSelectSurah={handleSelectSurah}
                currentPlayingAyah={currentPlayingAyah}
                isPlayingAudio={isPlayingAudio}
                onPlayAyah={handlePlayAyah}
                onPauseAudio={handlePauseAudio}
                selectedReciter={selectedReciter}
                onSelectReciter={handleSelectReciter}
                onToggleBookmark={handleToggleBookmark}
                isAyahBookmarked={isAyahBookmarked}
                onSaveOffline={handleSaveOffline}
                isSavedOffline={downloadedSurahs.includes(currentSurah.number)}
              />
            ) : (
              <SurahList
                onSelectSurah={handleSelectSurah}
                downloadedSurahNumbers={downloadedSurahs}
                lastReadSurah={lastReadSurah}
                onDownloadAllOffline={handleDownloadAll}
                isDownloadingAll={isDownloadingAll}
              />
            )}
          </>
        )}

        {/* TAB: MOSQUES */}
        {activeTab === 'mosques' && (
          <div className="space-y-4">
            <MosqueFinderView />
          </div>
        )}

        {/* TAB: QIBLA */}
        {activeTab === 'qibla' && (
          <div className="max-w-2xl mx-auto py-4">
            <QiblaCompassView
              userLocation={userLocation}
              onRequestLocation={requestUserLocation}
            />
          </div>
        )}

        {/* TAB: OFFLINE & SAVED */}
        {activeTab === 'offline' && (
          <OfflineManagerView
            downloadedSurahNumbers={downloadedSurahs}
            bookmarks={bookmarks}
            isOnline={isOnline}
            onDownloadAll={handleDownloadAll}
            isDownloadingAll={isDownloadingAll}
            downloadProgress={downloadProgress}
            onSelectSurah={handleSelectSurah}
            onDeleteBookmark={handleDeleteBookmark}
          />
        )}
      </main>

      {/* Persistent Audio Player Bar */}
      {(currentSurah || currentPlayingAyah) && (
        <AudioPlayerBar
          currentSurah={currentSurah}
          currentAyah={currentPlayingAyah}
          isPlaying={isPlayingAudio}
          onTogglePlay={handleTogglePlay}
          onNextAyah={handleNextAyah}
          onPrevAyah={handlePrevAyah}
          onSelectReciter={handleSelectReciter}
          selectedReciter={selectedReciter}
          onClosePlayer={() => {
            setIsPlayingAudio(false);
            setCurrentPlayingAyah(null);
          }}
          onAyahEnded={handleAyahEnded}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onNavigateTab={setActiveTab}
      />
    </div>
  );
}
