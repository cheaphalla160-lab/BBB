import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Volume2, Trophy, ArrowRightLeft, Layers } from 'lucide-react';
import { VOCABULARY_LIST, OPPOSITE_PAIRS, VOCABULARY_MAP } from '../data/words';
import { VocabularyItem } from '../types/game';
import { WordIllustration } from './illustrations/WordIllustrations';
import { sound, speakWord } from '../utils/sound';

interface MemoryCard {
  uid: string;
  matchKey: string; // The common ID that forms the pair
  type: 'image' | 'word' | 'opposite_a' | 'opposite_b';
  item: VocabularyItem;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGame: React.FC = () => {
  const [matchMode, setMatchMode] = useState<'word_pic' | 'opposites'>('opposites');
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // Setup cards
  useEffect(() => {
    initDeck(matchMode);
  }, [matchMode]);

  const initDeck = (mode: 'word_pic' | 'opposites') => {
    sound.playClick();
    setMoves(0);
    setMatchedPairs(0);
    setIsLocked(false);
    setIsWon(false);
    setFlippedCards([]);

    let deck: MemoryCard[] = [];

    if (mode === 'opposites') {
      // Pick 6 opposite pairs (12 cards total)
      const selectedPairs = OPPOSITE_PAIRS.slice(0, 6);
      selectedPairs.forEach((pair, idx) => {
        const itemA = VOCABULARY_MAP.get(pair.itemA);
        const itemB = VOCABULARY_MAP.get(pair.itemB);
        if (itemA && itemB) {
          deck.push({
            uid: `opp-a-${idx}-${Math.random()}`,
            matchKey: pair.id,
            type: 'opposite_a',
            item: itemA,
            isFlipped: false,
            isMatched: false,
          });
          deck.push({
            uid: `opp-b-${idx}-${Math.random()}`,
            matchKey: pair.id,
            type: 'opposite_b',
            item: itemB,
            isFlipped: false,
            isMatched: false,
          });
        }
      });
    } else {
      // Word + Picture match (pick 6 words = 12 cards)
      const shuffledWords = [...VOCABULARY_LIST].sort(() => Math.random() - 0.5).slice(0, 6);
      shuffledWords.forEach((item, idx) => {
        deck.push({
          uid: `img-${idx}-${Math.random()}`,
          matchKey: item.id,
          type: 'image',
          item,
          isFlipped: false,
          isMatched: false,
        });
        deck.push({
          uid: `word-${idx}-${Math.random()}`,
          matchKey: item.id,
          type: 'word',
          item,
          isFlipped: false,
          isMatched: false,
        });
      });
    }

    // Shuffle deck
    setCards([...deck].sort(() => Math.random() - 0.5));
  };

  const handleCardClick = (clickedCard: MemoryCard) => {
    if (isLocked || clickedCard.isFlipped || clickedCard.isMatched) return;

    sound.playCardFlip();
    const updatedCards = cards.map((c) =>
      c.uid === clickedCard.uid ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsLocked(true);

      const [c1, c2] = newFlipped;
      if (c1.matchKey === c2.matchKey) {
        // MATCHED!
        sound.playCorrect();
        speakWord(`${c1.item.word} and ${c2.item.word}`);

        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.matchKey === c1.matchKey ? { ...c, isMatched: true, isFlipped: true } : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
          const nextMatched = matchedPairs + 1;
          setMatchedPairs(nextMatched);

          if (nextMatched === 6) {
            setIsWon(true);
            sound.playVictoryFanfare();
            confetti({
              particleCount: 70,
              spread: 60,
              origin: { y: 0.6 },
            });
          }
        }, 500);
      } else {
        // Not matched - flip back
        setTimeout(() => {
          sound.playWrong();
          setCards((prev) =>
            prev.map((c) =>
              c.uid === c1.uid || c.uid === c2.uid ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Control Bar */}
      <div className="bg-white rounded-3xl p-4 border-2 border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Match Mode Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMatchMode('opposites');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              matchMode === 'opposites'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            相反词配对 (Opposites Match)
          </button>

          <button
            onClick={() => {
              setMatchMode('word_pic');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              matchMode === 'word_pic'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            图词配对 (Word & Pic Match)
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs font-bold text-stone-600">
          <div className="flex items-center gap-1 bg-stone-100 px-3 py-1.5 rounded-xl">
            <span>翻牌步数:</span>
            <span className="text-indigo-600 tabular-nums font-black">{moves}</span>
          </div>

          <div className="flex items-center gap-1 bg-stone-100 px-3 py-1.5 rounded-xl">
            <span>配对成功:</span>
            <span className="text-emerald-600 tabular-nums font-black">{matchedPairs} / 6</span>
          </div>

          <button
            onClick={() => initDeck(matchMode)}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            重新发牌
          </button>
        </div>
      </div>

      {/* Cards Grid: 12 cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
        {cards.map((card) => {
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <div
              key={card.uid}
              onClick={() => handleCardClick(card)}
              className={`aspect-3/4 rounded-2xl cursor-pointer select-none transition-all duration-300 transform perspective-1000 ${
                card.isMatched ? 'opacity-85 scale-95 ring-2 ring-emerald-400' : 'hover:scale-102'
              }`}
            >
              {isRevealed ? (
                // Front Face (Revealed)
                <div className="w-full h-full bg-white rounded-2xl p-2.5 border-2 border-indigo-200 shadow-sm flex flex-col items-center justify-between animate-pop-in">
                  {card.type === 'word' ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 bg-indigo-50/50 rounded-xl">
                      <span className="text-xs text-indigo-500 font-semibold mb-1">单词卡</span>
                      <h4 className="text-base font-black text-stone-900">{card.item.displayLabel}</h4>
                      <p className="text-xs text-stone-500 mt-1">{card.item.meaning}</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-full aspect-square p-1 rounded-xl bg-stone-50 flex items-center justify-center">
                        <WordIllustration id={card.item.id} className="w-full h-full" />
                      </div>
                      <div className="text-center w-full">
                        <h4 className="text-xs font-bold text-stone-900 truncate">
                          {card.item.displayLabel}
                        </h4>
                        <p className="text-[10px] text-stone-500 truncate">{card.item.meaning}</p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                // Back Face (Hidden Card Pattern)
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl border-2 border-indigo-700 shadow-xs flex flex-col items-center justify-center text-white p-2 hover:from-indigo-600 hover:to-indigo-700">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-1">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-100">
                    FLIP ME
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Victory Celebration Modal */}
      {isWon && (
        <div className="bg-emerald-50 border-2 border-emerald-400 rounded-3xl p-8 text-center max-w-md mx-auto shadow-md animate-pop-in space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8 fill-emerald-400 text-emerald-600 animate-bounce" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-emerald-950">全部配对成功！Amazing! 🎉</h3>
            <p className="text-xs text-emerald-800 mt-1">
              用时 {moves} 步完成全部相反词配对，记忆力超级棒！
            </p>
          </div>
          <button
            onClick={() => initDeck(matchMode)}
            className="w-full py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs cursor-pointer transition-colors"
          >
            再挑战一局 (Play Again)
          </button>
        </div>
      )}
    </div>
  );
};
