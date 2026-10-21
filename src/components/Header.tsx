import React, { useState } from 'react';
import { Volume2, VolumeX, Music, BookOpen, Swords, Puzzle, Grid, Sparkles } from 'lucide-react';
import { AppMode } from '../types/game';
import { sound } from '../utils/sound';

interface HeaderProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentMode, onSelectMode }) => {
  const [isBgmOn, setIsBgmOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleBgm = () => {
    const playing = sound.toggleBgm();
    setIsBgmOn(playing);
  };

  const handleToggleMute = () => {
    const status = sound.toggleMute();
    setIsMuted(status.sfxMuted);
  };

  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-amber-100/80 shadow-xs sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
        <span className="text-xl font-bold tracking-tight text-amber-900 flex items-center gap-1.5">
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
          Magic Words Arena
        </span>
        <span className="hidden sm:inline text-xs text-amber-700/70 font-medium">· 小学英语备课与互动游戏</span>
      </div>

      {/* Zone 2: Navigation Links (single line, clean buttons/links) */}
      <nav className="hidden lg:flex items-center gap-2 text-sm font-semibold whitespace-nowrap shrink-0">
        <button
          onClick={() => {
            sound.playClick();
            onSelectMode('puzzle');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            currentMode === 'puzzle'
              ? 'bg-amber-100 text-amber-900 font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Puzzle className="w-4 h-4 text-amber-600" />
          拼读闯关 Puzzle
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectMode('pk');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            currentMode === 'pk'
              ? 'bg-rose-100 text-rose-900 font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Swords className="w-4 h-4 text-rose-600" />
          双人PK对战 Battle
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectMode('memory');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            currentMode === 'memory'
              ? 'bg-indigo-100 text-indigo-900 font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Grid className="w-4 h-4 text-indigo-600" />
          记忆翻翻乐 Memory
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectMode('flashcard');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            currentMode === 'flashcard'
              ? 'bg-emerald-100 text-emerald-900 font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          对比剧场 Theatre
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSelectMode('teacher');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            currentMode === 'teacher'
              ? 'bg-purple-100 text-purple-900 font-bold shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          备课助手 Teacher Kit
        </button>
      </nav>

      {/* Zone 3: Audio controls (BGM & SFX) */}
      <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
        <button
          onClick={handleToggleBgm}
          title={isBgmOn ? '暂停背景音乐' : '播放轻松背景音乐'}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
            isBgmOn
              ? 'bg-amber-500 border-amber-600 text-white shadow-xs animate-pulse'
              : 'bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-700'
          }`}
        >
          <Music className={`w-3.5 h-3.5 ${isBgmOn ? 'animate-bounce' : ''}`} />
          <span>{isBgmOn ? '音乐开 BGM ON' : '背景音乐 BGM'}</span>
        </button>

        <button
          onClick={handleToggleMute}
          title={isMuted ? '开启音效' : '静音'}
          className="p-1.5 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200 cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
