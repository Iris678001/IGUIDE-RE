import React, { useEffect, useRef, useState } from 'react';
import { Ayah, Reciter, SurahData } from '../../types/quran';
import { POPULAR_RECITERS } from '../../data/surahList';
import {
  ChevronDown,
  Pause,
  Play,
  Repeat,
  Repeat1,
  SkipBack,
  SkipForward,
  Volume2,
  X
} from 'lucide-react';

interface AudioPlayerBarProps {
  currentSurah: SurahData | null;
  currentAyah: Ayah | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextAyah: () => void;
  onPrevAyah: () => void;
  onSelectReciter: (reciter: Reciter) => void;
  selectedReciter: Reciter;
  onClosePlayer?: () => void;
  onAyahEnded?: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentSurah,
  currentAyah,
  isPlaying,
  onTogglePlay,
  onNextAyah,
  onPrevAyah,
  onSelectReciter,
  selectedReciter,
  onClosePlayer,
  onAyahEnded
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [repeatMode, setRepeatMode] = useState<'none' | 'ayah' | 'surah'>('none');
  const [showReciters, setShowReciters] = useState(false);

  useEffect(() => {
    if (!currentAyah) return;
    const audio = audioRef.current;
    if (!audio) return;

    const audioUrl = `https://cdn.islamic.network/quran/audio/128/${selectedReciter.edition}/${currentAyah.number}.mp3`;
    audio.src = audioUrl;
    audio.playbackRate = playbackSpeed;

    if (isPlaying) {
      audio.play().catch((err) => console.log('Audio playback pending user interaction:', err));
    }
  }, [currentAyah, selectedReciter.edition]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleAudioEnded = () => {
    if (repeatMode === 'ayah') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      if (onAyahEnded) {
        onAyahEnded();
      } else {
        onNextAyah();
      }
    }
  };

  const toggleSpeed = () => {
    const speeds = [0.75, 1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setPlaybackSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const toggleRepeat = () => {
    if (repeatMode === 'none') setRepeatMode('ayah');
    else if (repeatMode === 'ayah') setRepeatMode('surah');
    else setRepeatMode('none');
  };

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentAyah || !currentSurah) return null;

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />

      {/* Floating Cairo Audio Capsule */}
      <div className="fixed bottom-20 sm:bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:w-[480px] z-40 bg-[#fffdf9]/95 backdrop-blur-md border border-[#ede0cf] rounded-2xl sm:rounded-full shadow-2xl transition-all font-serif overflow-hidden">
        {/* Hairline Saffron Amber Scrubber */}
        <div className="w-full relative group h-1.5 bg-[#f6eee3]">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Audio scrubber"
            className="w-full h-1.5 bg-transparent cursor-pointer appearance-none absolute inset-0 z-10 accent-[#e59523]"
          />
          <div
            className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-[#e59523] to-[#ea5d47] pointer-events-none transition-all"
            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
          />
        </div>

        {/* Player Controls Bar */}
        <div className="px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Left: Surah & Ayah Info */}
          <div className="flex items-center gap-2.5 min-w-0 max-w-[42%] sm:max-w-xs">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e59523] to-[#d87c10] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Volume2 className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-[#381230] text-xs sm:text-sm font-bold truncate">
                  {currentSurah.englishName}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#f6eee3] text-[#785e70] font-semibold">
                  {currentSurah.number}:{currentAyah.numberInSurah}
                </span>
              </div>
              <p className="text-[10px] text-[#785e70] truncate font-serif italic">
                {selectedReciter.name}
              </p>
            </div>
          </div>

          {/* Center: Playback Controls with Tactile Gold Play Button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onPrevAyah}
              aria-label="Previous Ayah"
              className="w-8 h-8 rounded-full bg-[#fbf5ed] border border-[#ede0cf] hover:bg-[#f6eee3] text-[#785e70] hover:text-[#381230] flex items-center justify-center transition-colors cursor-pointer"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onTogglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e59523] to-[#d87c10] text-white shadow-md hover:shadow-lg flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={onNextAyah}
              aria-label="Next Ayah"
              className="w-8 h-8 rounded-full bg-[#fbf5ed] border border-[#ede0cf] hover:bg-[#f6eee3] text-[#785e70] hover:text-[#381230] flex items-center justify-center transition-colors cursor-pointer"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Tools & Settings */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Repeat Mode */}
            <button
              onClick={toggleRepeat}
              aria-label={`Repeat mode: ${repeatMode}`}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors cursor-pointer ${
                repeatMode !== 'none'
                  ? 'bg-[#e59523] text-white shadow-sm'
                  : 'bg-[#fbf5ed] text-[#785e70] hover:text-[#381230] border border-[#ede0cf]'
              }`}
            >
              {repeatMode === 'ayah' ? (
                <Repeat1 className="w-3 h-3" />
              ) : (
                <Repeat className="w-3 h-3" />
              )}
            </button>

            {/* Speed Control */}
            <button
              onClick={toggleSpeed}
              aria-label="Speed"
              className="px-2 py-0.5 rounded-full bg-[#fbf5ed] border border-[#ede0cf] text-[10px] font-mono font-bold text-[#381230] hover:bg-[#f6eee3] transition-colors cursor-pointer"
            >
              {playbackSpeed}x
            </button>

            {/* Reciter Selector Menu */}
            <div className="relative">
              <button
                onClick={() => setShowReciters(!showReciters)}
                aria-label="Select Reciter"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fbf5ed] border border-[#ede0cf] hover:bg-[#f6eee3] text-xs text-[#381230] font-serif transition-colors cursor-pointer"
              >
                <span className="truncate max-w-[80px]">{selectedReciter.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-[#785e70]" />
              </button>

              {showReciters && (
                <div className="absolute bottom-full right-0 mb-3 w-64 rounded-2xl border border-[#ede0cf] bg-[#fffdf9] shadow-2xl p-2 z-50 font-serif">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-mono text-[#785e70] border-b border-[#f6eee3] mb-1 font-semibold">
                    Select Qari (Reciter)
                  </div>
                  <div className="space-y-1">
                    {POPULAR_RECITERS.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          onSelectReciter(r);
                          setShowReciters(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          selectedReciter.id === r.id
                            ? 'bg-[#fbf5ed] text-[#381230] font-bold border-l-2 border-l-[#e59523]'
                            : 'text-[#584852] hover:bg-[#fbf5ed]'
                        }`}
                      >
                        <div>
                          <div>{r.name}</div>
                          <div className="text-[10px] text-[#785e70] font-serif italic">{r.subname}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Close Button */}
            {onClosePlayer && (
              <button
                onClick={onClosePlayer}
                aria-label="Close audio player"
                className="w-7 h-7 rounded-full bg-[#fbf5ed] border border-[#ede0cf] hover:bg-[#f6eee3] text-[#785e70] hover:text-[#381230] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
