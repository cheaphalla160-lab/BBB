import React, { useState } from 'react';
import { Header } from './components/Header';
import { PuzzleGame } from './components/PuzzleGame';
import { PKGame } from './components/PKGame';
import { MemoryGame } from './components/MemoryGame';
import { FlashcardTheatre } from './components/FlashcardTheatre';
import { TeacherToolkit } from './components/TeacherToolkit';
import { AppMode } from './types/game';
import { Puzzle, Swords, Grid, BookOpen, GraduationCap } from 'lucide-react';
import { sound } from './utils/sound';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('puzzle');

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-stone-50/60 to-orange-50/30 text-stone-900 flex flex-col font-sans">
      {/* Top Bar adhering to Top Bar contract */}
      <Header currentMode={currentMode} onSelectMode={setCurrentMode} />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 sm:pb-8">
        {currentMode === 'puzzle' && <PuzzleGame />}
        {currentMode === 'pk' && <PKGame />}
        {currentMode === 'memory' && <MemoryGame />}
        {currentMode === 'flashcard' && <FlashcardTheatre />}
        {currentMode === 'teacher' && <TeacherToolkit />}
      </main>

      {/* Mobile Bottom Navigation Bar (Hidden on lg screens) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 z-30 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => {
            sound.playClick();
            setCurrentMode('puzzle');
          }}
          className={`flex flex-col items-center gap-0.5 text-[11px] font-bold cursor-pointer ${
            currentMode === 'puzzle' ? 'text-amber-600' : 'text-stone-500'
          }`}
        >
          <Puzzle className="w-5 h-5" />
          <span>拼读闯关</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setCurrentMode('pk');
          }}
          className={`flex flex-col items-center gap-0.5 text-[11px] font-bold cursor-pointer ${
            currentMode === 'pk' ? 'text-rose-600' : 'text-stone-500'
          }`}
        >
          <Swords className="w-5 h-5" />
          <span>双人PK</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setCurrentMode('memory');
          }}
          className={`flex flex-col items-center gap-0.5 text-[11px] font-bold cursor-pointer ${
            currentMode === 'memory' ? 'text-indigo-600' : 'text-stone-500'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span>翻翻乐</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setCurrentMode('flashcard');
          }}
          className={`flex flex-col items-center gap-0.5 text-[11px] font-bold cursor-pointer ${
            currentMode === 'flashcard' ? 'text-emerald-600' : 'text-stone-500'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>对比剧场</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setCurrentMode('teacher');
          }}
          className={`flex flex-col items-center gap-0.5 text-[11px] font-bold cursor-pointer ${
            currentMode === 'teacher' ? 'text-purple-600' : 'text-stone-500'
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          <span>备课助手</span>
        </button>
      </nav>

      {/* Footer info adhering to clean footer rules */}
      <footer className="border-t border-stone-200/80 bg-white/70 py-4 px-6 text-center text-xs text-stone-500">
        <p className="flex items-center justify-center gap-2">
          <span>Magic Words Elementary English Arena</span>
          <span>·</span>
          <span>专为小学英语课堂互动与白板教学打造</span>
          <span>·</span>
          <span>包含 15 个外貌与相反词汇及发音自然拼读</span>
        </p>
      </footer>
    </div>
  );
}
