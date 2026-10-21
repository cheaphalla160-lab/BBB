import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Volume2, RotateCcw, Lightbulb, ChevronRight, ChevronLeft, ArrowRightLeft, Star } from 'lucide-react';
import { VOCABULARY_LIST, VOCABULARY_MAP } from '../data/words';
import { VocabularyItem, WordCategory } from '../types/game';
import { WordIllustration } from './illustrations/WordIllustrations';
import { sound, speakWord, speakPhonicsSequence } from '../utils/sound';

export const PuzzleGame: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<WordCategory | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [availableTiles, setAvailableTiles] = useState<{ id: string; letter: string; used: boolean }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [imageBouncing, setImageBouncing] = useState(false);
  const [stars, setStars] = useState(0);

  // Filter list
  const filteredWords = useMemo(() => {
    if (selectedCategory === 'all') return VOCABULARY_LIST;
    return VOCABULARY_LIST.filter((w) => w.category === selectedCategory);
  }, [selectedCategory]);

  const currentItem: VocabularyItem = filteredWords[currentIndex] || VOCABULARY_LIST[0];
  const targetWord = currentItem.word.toLowerCase();
  const oppositeItem = currentItem.pairId ? VOCABULARY_MAP.get(currentItem.pairId) : undefined;

  // Initialize or reset puzzle tiles when word changes
  useEffect(() => {
    initPuzzle(currentItem);
  }, [currentItem]);

  const initPuzzle = (item: VocabularyItem) => {
    const word = item.word.toLowerCase();
    setPlacedLetters([]);
    setIsCompleted(false);

    // Scramble letters with unique IDs
    const chars = word.split('').map((letter, idx) => ({
      id: `${letter}-${idx}-${Math.random()}`,
      letter,
      used: false,
    }));

    // Deterministic shuffle
    const shuffled = [...chars].sort(() => Math.random() - 0.5);
    setAvailableTiles(shuffled);
  };

  // Click on illustration: Speaks word and animates
  const handleImageClick = async () => {
    sound.playClick();
    setImageBouncing(true);
    setTimeout(() => setImageBouncing(false), 500);

    setIsSpeaking(true);
    await speakWord(currentItem.word);
    setIsSpeaking(false);
  };

  // Click available letter tile
  const handleSelectTile = (tile: { id: string; letter: string; used: boolean }) => {
    if (tile.used || isCompleted) return;

    sound.playLetterSnap();
    speakWord(tile.letter, 1.0);

    const nextPlaced = [...placedLetters, tile.letter];
    setPlacedLetters(nextPlaced);

    setAvailableTiles((prev) =>
      prev.map((t) => (t.id === tile.id ? { ...t, used: true } : t))
    );

    // Check if fully spelled
    if (nextPlaced.length === targetWord.length) {
      checkSpelling(nextPlaced.join(''));
    }
  };

  // Remove a placed letter
  const handleRemovePlaced = (index: number) => {
    if (isCompleted) return;
    sound.playClick();

    const letterToRemove = placedLetters[index];
    const nextPlaced = placedLetters.filter((_, i) => i !== index);
    setPlacedLetters(nextPlaced);

    // Free the tile in available
    let freed = false;
    setAvailableTiles((prev) =>
      prev.map((t) => {
        if (!freed && t.used && t.letter === letterToRemove) {
          freed = true;
          return { ...t, used: false };
        }
        return t;
      })
    );
  };

  // Check spelling
  const checkSpelling = (spelled: string) => {
    if (spelled === targetWord) {
      setIsCompleted(true);
      setStars((s) => s + 1);
      sound.playCorrect();

      // Confetti burst
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });

      // Speak phonics breakdown then sentence
      setTimeout(() => {
        speakPhonicsSequence(currentItem.phonics, currentItem.word);
      }, 350);
    } else {
      sound.playWrong();
      // Gentle hint to try again
    }
  };

  // Reset current word puzzle
  const handleReset = () => {
    sound.playClick();
    initPuzzle(currentItem);
  };

  // Provide a hint
  const handleHint = () => {
    if (isCompleted) return;
    sound.playClick();

    const nextIndex = placedLetters.length;
    if (nextIndex >= targetWord.length) return;

    const neededLetter = targetWord[nextIndex];
    // Find unused tile with this letter
    const tile = availableTiles.find((t) => !t.used && t.letter === neededLetter);
    if (tile) {
      handleSelectTile(tile);
    }
  };

  // Phonics Syllables read-aloud
  const handlePhonicsRead = () => {
    sound.playClick();
    speakPhonicsSequence(currentItem.phonics, currentItem.word);
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredWords.length - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Category selector strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50/70 p-3 rounded-2xl border border-amber-200/60">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-amber-900 whitespace-nowrap mr-1">分类筛选:</span>
          {[
            { id: 'all', label: '全部 15 词' },
            { id: 'objects', label: '文具与书本' },
            { id: 'nature', label: '自然树木' },
            { id: 'people_body', label: '身材胖瘦' },
            { id: 'hair', label: '发色与发型' },
            { id: 'face', label: '胡须对比' },
            { id: 'appearance', label: '怪兽外表' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id as WordCategory | 'all');
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-amber-800 hover:bg-amber-100/50 border border-stone-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Stars counter */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 rounded-xl text-amber-800 font-bold text-xs whitespace-nowrap">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>通关奖励: {stars} 颗星</span>
        </div>
      </div>

      {/* Main Interactive Play Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Big Interactive Illustration & Audio */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="font-semibold text-amber-800">{currentItem.categoryLabel}</span>
            <span>
              第 {currentIndex + 1} / {filteredWords.length} 词
            </span>
          </div>

          {/* Clickable Image with kid-friendly hover effects */}
          <div
            onClick={handleImageClick}
            className={`group relative cursor-pointer aspect-square max-h-72 mx-auto rounded-3xl p-4 transition-transform duration-200 flex items-center justify-center ${
              currentItem.colorTheme.bg
            } ${imageBouncing ? 'scale-105' : 'hover:scale-102'} border-2 ${
              currentItem.colorTheme.border
            }`}
            title="点击图片听发音和拼读练习！Click image to speak!"
          >
            <WordIllustration id={currentItem.id} className="w-full h-full drop-shadow-sm" />

            {/* Click to listen badge */}
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs border border-amber-200 flex items-center gap-1 text-xs font-bold text-amber-800 group-hover:bg-amber-50 transition-colors">
              <Volume2 className={`w-3.5 h-3.5 text-amber-600 ${isSpeaking ? 'animate-bounce' : ''}`} />
              <span>点击听音</span>
            </div>
          </div>

          {/* Meaning & Fun Tip */}
          <div className="mt-4 text-center space-y-1">
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              {currentItem.displayLabel}
            </h3>
            <p className="text-sm font-medium text-amber-700">{currentItem.meaning}</p>
            <p className="text-xs text-stone-500">{currentItem.funTip}</p>
          </div>

          {/* Phonics Chunk Buttons */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-center gap-2">
            <span className="text-xs text-stone-400 font-medium">拼读音素:</span>
            {currentItem.phonics.map((chunk, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.playLetterSnap();
                  speakWord(chunk);
                }}
                className="px-2.5 py-1 text-xs font-bold rounded-md bg-stone-100 hover:bg-amber-100 text-stone-800 border border-stone-200 cursor-pointer transition-colors"
                title={`点击朗读音素 /${chunk}/`}
              >
                /{chunk}/
              </button>
            ))}
            <button
              onClick={handlePhonicsRead}
              className="p-1 rounded-md text-amber-600 hover:bg-amber-100 cursor-pointer"
              title="连读拼读音素"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Spelling Puzzle Board */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-sm flex flex-col justify-between space-y-6">
          {/* Top helper text */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                拼读拼图 (Spelling Puzzle)
              </h2>
              <p className="text-xs text-stone-500">点击下方打乱的字母，按顺序拼出正确的单词！</p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleHint}
                disabled={isCompleted}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl cursor-pointer transition-colors disabled:opacity-40"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                提示 (Hint)
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                重拼 (Reset)
              </button>
            </div>
          </div>

          {/* Spelling Target Slots */}
          <div className="bg-amber-50/50 p-6 rounded-2xl border-2 border-dashed border-amber-300 flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              {targetWord.split('').map((char, index) => {
                const placed = placedLetters[index];
                const isCorrect = isCompleted;

                return (
                  <button
                    key={index}
                    onClick={() => handleRemovePlaced(index)}
                    disabled={!placed || isCompleted}
                    className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center text-2xl font-bold uppercase transition-all shadow-xs ${
                      placed
                        ? isCorrect
                          ? 'bg-emerald-500 text-white border-2 border-emerald-600 scale-105'
                          : 'bg-white text-stone-800 border-2 border-amber-400 hover:border-rose-400 cursor-pointer'
                        : 'bg-white/80 border-2 border-dashed border-amber-300 text-stone-300'
                    }`}
                  >
                    {placed || ''}
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-stone-500 flex items-center gap-2">
              <span>音标: <strong className="text-amber-800 font-mono">{currentItem.phonetic}</strong></span>
              <span>·</span>
              <span>目标长度: {targetWord.length} 字母</span>
            </div>
          </div>

          {/* Letter Bank (Scrambled Clickable Tiles) */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-stone-600">字母选择池 (点击填入上方):</p>
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap py-2">
              {availableTiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => handleSelectTile(tile)}
                  disabled={tile.used || isCompleted}
                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl text-2xl font-extrabold uppercase transition-all transform ${
                    tile.used
                      ? 'bg-stone-100 text-stone-300 border border-stone-200 opacity-40 cursor-not-allowed scale-95'
                      : 'bg-amber-400 hover:bg-amber-300 text-amber-950 border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 shadow-md cursor-pointer hover:scale-105'
                  }`}
                >
                  {tile.letter}
                </button>
              ))}
            </div>
          </div>

          {/* Success Banner & Opposite Word Showcase */}
          {isCompleted && (
            <div className="bg-emerald-50 border-2 border-emerald-400 p-4 rounded-2xl animate-pop-in space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 text-base">
                      拼读正确！Great Job! 🌟
                    </h4>
                    <p className="text-xs text-emerald-700">例句: "{currentItem.sentence}"</p>
                  </div>
                </div>

                <button
                  onClick={() => speakWord(currentItem.sentence)}
                  className="px-2.5 py-1 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  听例句
                </button>
              </div>

              {/* Contrast Pair Preview */}
              {oppositeItem && (
                <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900 bg-white/70 p-2.5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
                    <span>
                      相反反义词对: <strong>{currentItem.word}</strong> ↔ <strong>{oppositeItem.word}</strong> ({oppositeItem.displayLabel})
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const oppIndex = filteredWords.findIndex((w) => w.id === oppositeItem.id);
                      if (oppIndex !== -1) {
                        sound.playClick();
                        setCurrentIndex(oppIndex);
                      }
                    }}
                    className="font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    挑战对应词 →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls: Prev / Next Word */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              上一个单词
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl cursor-pointer shadow-xs transition-colors"
            >
              下一个单词
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
