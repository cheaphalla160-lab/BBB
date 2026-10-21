import React, { useState } from 'react';
import { Volume2, ArrowRightLeft, Sparkles, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { VOCABULARY_LIST, OPPOSITE_PAIRS, VOCABULARY_MAP } from '../data/words';
import { WordIllustration } from './illustrations/WordIllustrations';
import { sound, speakWord, speakPhonicsSequence } from '../utils/sound';

export const FlashcardTheatre: React.FC = () => {
  const [viewType, setViewType] = useState<'pairs' | 'single'>('pairs');
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [currentSingleIndex, setCurrentSingleIndex] = useState(0);

  const activePair = OPPOSITE_PAIRS[currentPairIndex] || OPPOSITE_PAIRS[0];
  const itemA = VOCABULARY_MAP.get(activePair.itemA)!;
  const itemB = VOCABULARY_MAP.get(activePair.itemB)!;

  const activeSingle = VOCABULARY_LIST[currentSingleIndex] || VOCABULARY_LIST[0];

  const handleSpeakItem = (item: typeof itemA) => {
    sound.playClick();
    speakWord(item.word);
  };

  const handleSpeakPhonics = (item: typeof itemA) => {
    sound.playClick();
    speakPhonicsSequence(item.phonics, item.word);
  };

  const handleSpeakSentence = (sentence: string) => {
    sound.playClick();
    speakWord(sentence);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Selector Bar */}
      <div className="bg-white rounded-3xl p-4 border-2 border-emerald-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setViewType('pairs');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewType === 'pairs'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            成对对比剧场 (Opposite Pairs)
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setViewType('single');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewType === 'single'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            单词全屏大图 (Full Flashcard)
          </button>
        </div>

        <div className="text-xs font-semibold text-emerald-800">
          💡 备课小贴士: 对比教学法能帮助孩子建立生动的形象联想！
        </div>
      </div>

      {/* VIEW 1: Opposite Pairs Side-by-Side Comparison */}
      {viewType === 'pairs' && (
        <div className="space-y-6">
          {/* Pair Category Navigation Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {OPPOSITE_PAIRS.map((pair, idx) => (
              <button
                key={pair.id}
                onClick={() => {
                  sound.playClick();
                  setCurrentPairIndex(idx);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  currentPairIndex === idx
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-emerald-50'
                }`}
              >
                {pair.label}
              </button>
            ))}
          </div>

          {/* 2 Big Side-by-Side Contrast Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Card A */}
            <div className="bg-white rounded-3xl p-6 border-2 border-emerald-300 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {itemA.categoryLabel}
                </span>
                <span className="font-mono text-stone-400">{itemA.phonetic}</span>
              </div>

              {/* Big Illustration */}
              <div
                onClick={() => handleSpeakItem(itemA)}
                className={`aspect-square max-h-60 mx-auto rounded-3xl p-4 flex items-center justify-center cursor-pointer transition-transform hover:scale-102 ${itemA.colorTheme.bg} border-2 ${itemA.colorTheme.border}`}
                title="点击听发音"
              >
                <WordIllustration id={itemA.id} className="w-full h-full drop-shadow-xs" />
              </div>

              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-2xl font-black text-stone-900">{itemA.displayLabel}</h3>
                  <button
                    onClick={() => handleSpeakItem(itemA)}
                    className="p-1.5 rounded-full hover:bg-stone-100 text-emerald-600 cursor-pointer"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm font-bold text-emerald-700">{itemA.meaning}</p>
              </div>

              {/* Phonics & Sentence */}
              <div className="space-y-2 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">音素分解:</span>
                  <button
                    onClick={() => handleSpeakPhonics(itemA)}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    拼读 /{itemA.phonics.join(' - ')}/
                  </button>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl flex items-center justify-between">
                  <p className="text-xs text-stone-700 italic">"{itemA.sentence}"</p>
                  <button
                    onClick={() => handleSpeakSentence(itemA.sentence)}
                    className="p-1 text-stone-500 hover:text-emerald-600 cursor-pointer"
                    title="朗读例句"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card B */}
            <div className="bg-white rounded-3xl p-6 border-2 border-emerald-300 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {itemB.categoryLabel}
                </span>
                <span className="font-mono text-stone-400">{itemB.phonetic}</span>
              </div>

              {/* Big Illustration */}
              <div
                onClick={() => handleSpeakItem(itemB)}
                className={`aspect-square max-h-60 mx-auto rounded-3xl p-4 flex items-center justify-center cursor-pointer transition-transform hover:scale-102 ${itemB.colorTheme.bg} border-2 ${itemB.colorTheme.border}`}
                title="点击听发音"
              >
                <WordIllustration id={itemB.id} className="w-full h-full drop-shadow-xs" />
              </div>

              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-2xl font-black text-stone-900">{itemB.displayLabel}</h3>
                  <button
                    onClick={() => handleSpeakItem(itemB)}
                    className="p-1.5 rounded-full hover:bg-stone-100 text-emerald-600 cursor-pointer"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm font-bold text-emerald-700">{itemB.meaning}</p>
              </div>

              {/* Phonics & Sentence */}
              <div className="space-y-2 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">音素分解:</span>
                  <button
                    onClick={() => handleSpeakPhonics(itemB)}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    拼读 /{itemB.phonics.join(' - ')}/
                  </button>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl flex items-center justify-between">
                  <p className="text-xs text-stone-700 italic">"{itemB.sentence}"</p>
                  <button
                    onClick={() => handleSpeakSentence(itemB.sentence)}
                    className="p-1 text-stone-500 hover:text-emerald-600 cursor-pointer"
                    title="朗读例句"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pair Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentPairIndex((i) => (i > 0 ? i - 1 : OPPOSITE_PAIRS.length - 1));
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold text-xs cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              上一对相反词
            </button>

            <span className="text-xs font-bold text-stone-500">
              第 {currentPairIndex + 1} / {OPPOSITE_PAIRS.length} 组对比
            </span>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentPairIndex((i) => (i < OPPOSITE_PAIRS.length - 1 ? i + 1 : 0));
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs cursor-pointer transition-colors shadow-xs"
            >
              下一对相反词
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: Single Flashcard Focus Mode */}
      {viewType === 'single' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border-2 border-emerald-300 shadow-md space-y-6">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl">
              {activeSingle.categoryLabel}
            </span>
            <span className="font-mono text-stone-400 text-sm">{activeSingle.phonetic}</span>
          </div>

          {/* Extra Large Interactive Image */}
          <div
            onClick={() => handleSpeakItem(activeSingle)}
            className={`w-64 h-64 mx-auto rounded-3xl p-6 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${activeSingle.colorTheme.bg} border-2 ${activeSingle.colorTheme.border}`}
          >
            <WordIllustration id={activeSingle.id} className="w-full h-full drop-shadow-md" />
          </div>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-3xl font-black text-stone-900 tracking-tight">
                {activeSingle.displayLabel}
              </h2>
              <button
                onClick={() => handleSpeakItem(activeSingle)}
                className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 cursor-pointer transition-colors"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
            <p className="text-lg font-bold text-emerald-700">{activeSingle.meaning}</p>
            <p className="text-xs text-stone-500">{activeSingle.funTip}</p>
          </div>

          {/* Phonics & Sentence Section */}
          <div className="bg-stone-50 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500 font-bold">拼读拆解:</span>
              <div className="flex items-center gap-1.5">
                {activeSingle.phonics.map((p, i) => (
                  <span
                    key={i}
                    onClick={() => speakWord(p)}
                    className="px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-xs font-bold text-stone-800 cursor-pointer hover:bg-emerald-50"
                  >
                    /{p}/
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between">
              <p className="text-sm text-stone-800 italic">"{activeSingle.sentence}"</p>
              <button
                onClick={() => handleSpeakSentence(activeSingle.sentence)}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                读例句
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentSingleIndex((i) => (i > 0 ? i - 1 : VOCABULARY_LIST.length - 1));
              }}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold text-xs cursor-pointer"
            >
              ← 上一张
            </button>

            <span className="text-xs font-bold text-stone-500">
              第 {currentSingleIndex + 1} / {VOCABULARY_LIST.length} 张
            </span>

            <button
              onClick={() => {
                sound.playClick();
                setCurrentSingleIndex((i) => (i < VOCABULARY_LIST.length - 1 ? i + 1 : 0));
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs cursor-pointer shadow-xs"
            >
              下一张 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
