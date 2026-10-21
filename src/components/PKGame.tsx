import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Swords, Trophy, Volume2, RotateCcw, Bot, Users, Sparkles, Flame } from 'lucide-react';
import { VOCABULARY_LIST } from '../data/words';
import { VocabularyItem } from '../types/game';
import { WordIllustration } from './illustrations/WordIllustrations';
import { sound, speakWord } from '../utils/sound';

interface PKQuestion {
  targetItem: VocabularyItem;
  options: VocabularyItem[];
  promptType: 'audio_and_word' | 'image_to_word';
}

export const PKGame: React.FC = () => {
  const [vsMode, setVsMode] = useState<'2player' | 'vsBot'>('2player');
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'round_over' | 'finished'>('intro');
  const [currentRound, setCurrentRound] = useState(1);
  const totalRounds = 10;

  // Scores & streaks
  const [redScore, setRedScore] = useState(0);
  const [redCombo, setRedCombo] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [blueCombo, setBlueCombo] = useState(0);

  // Round question
  const [question, setQuestion] = useState<PKQuestion | null>(null);
  const [roundWinner, setRoundWinner] = useState<'red' | 'blue' | 'none' | null>(null);
  const [isAnsweringLocked, setIsAnsweringLocked] = useState(false);

  // Generate a random question
  const generateQuestion = useCallback((): PKQuestion => {
    // Pick 1 target
    const targetIndex = Math.floor(Math.random() * VOCABULARY_LIST.length);
    const targetItem = VOCABULARY_LIST[targetIndex];

    // Pick 3 distractor items
    const remaining = VOCABULARY_LIST.filter((w) => w.id !== targetItem.id);
    const shuffledRemaining = [...remaining].sort(() => Math.random() - 0.5);
    const options = [targetItem, ...shuffledRemaining.slice(0, 3)].sort(() => Math.random() - 0.5);

    return {
      targetItem,
      options,
      promptType: Math.random() > 0.5 ? 'audio_and_word' : 'image_to_word',
    };
  }, []);

  // Start new game
  const startGame = () => {
    sound.playClick();
    setRedScore(0);
    setRedCombo(0);
    setBlueScore(0);
    setBlueCombo(0);
    setCurrentRound(1);
    setRoundWinner(null);
    setIsAnsweringLocked(false);

    const q = generateQuestion();
    setQuestion(q);
    setGameState('playing');

    // Announce target
    setTimeout(() => {
      speakWord(q.targetItem.displayLabel);
    }, 400);
  };

  // Bot logic
  useEffect(() => {
    if (vsMode !== 'vsBot' || gameState !== 'playing' || !question || isAnsweringLocked) return;

    // Bot responds in 1.4 to 2.8 seconds
    const botThinkTime = Math.random() * 1200 + 1400;
    const botTimer = setTimeout(() => {
      if (gameState !== 'playing' || isAnsweringLocked) return;

      // Bot has an 80% accuracy
      const isBotCorrect = Math.random() < 0.82;
      if (isBotCorrect) {
        handleAnswer('blue', question.targetItem.id);
      } else {
        const wrongOption = question.options.find((o) => o.id !== question.targetItem.id);
        if (wrongOption) {
          handleAnswer('blue', wrongOption.id);
        }
      }
    }, botThinkTime);

    return () => clearTimeout(botTimer);
  }, [vsMode, gameState, question, isAnsweringLocked]);

  // Handle player answer
  const handleAnswer = (player: 'red' | 'blue', chosenId: string) => {
    if (isAnsweringLocked || !question) return;

    if (chosenId === question.targetItem.id) {
      // Winner of this round!
      setIsAnsweringLocked(true);
      setRoundWinner(player);
      sound.playCorrect();

      if (player === 'red') {
        const bonus = (redCombo + 1) * 20;
        setRedScore((s) => s + 100 + bonus);
        setRedCombo((c) => c + 1);
        setBlueCombo(0);
      } else {
        const bonus = (blueCombo + 1) * 20;
        setBlueScore((s) => s + 100 + bonus);
        setBlueCombo((c) => c + 1);
        setRedCombo(0);
      }

      // Progress after delay
      setTimeout(() => {
        if (currentRound >= totalRounds) {
          endGame();
        } else {
          nextRound();
        }
      }, 1500);
    } else {
      // Wrong choice
      sound.playWrong();
      if (player === 'red') {
        setRedScore((s) => Math.max(0, s - 25));
        setRedCombo(0);
      } else {
        setBlueScore((s) => Math.max(0, s - 25));
        setBlueCombo(0);
      }
    }
  };

  const nextRound = () => {
    const nextQ = generateQuestion();
    setQuestion(nextQ);
    setCurrentRound((r) => r + 1);
    setRoundWinner(null);
    setIsAnsweringLocked(false);

    setTimeout(() => {
      speakWord(nextQ.targetItem.displayLabel);
    }, 300);
  };

  const endGame = () => {
    setGameState('finished');
    sound.playVictoryFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top HUD: Team Red vs Team Blue scoreboard */}
      <div className="bg-white rounded-3xl p-5 border-2 border-stone-200 shadow-sm">
        <div className="grid grid-cols-12 items-center gap-4">
          {/* Red Team HUD */}
          <div className="col-span-5 bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <h4 className="font-extrabold text-rose-900 text-base">🔴 红队 (Red Team)</h4>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-black text-rose-600 tabular-nums">{redScore}</span>
                <span className="text-xs text-rose-700 font-semibold">分</span>
                {redCombo > 1 && (
                  <span className="flex items-center text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {redCombo} 连击!
                  </span>
                )}
              </div>
            </div>
            {roundWinner === 'red' && (
              <span className="text-sm font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-xl animate-bounce">
                得分 +100!
              </span>
            )}
          </div>

          {/* Center Round Indicator */}
          <div className="col-span-2 text-center space-y-1">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Round {currentRound} / {totalRounds}
            </span>
            <div className="flex items-center justify-center">
              <Swords className="w-6 h-6 text-amber-500" />
            </div>
            <div className="flex justify-center gap-1">
              {Array.from({ length: totalRounds }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i < currentRound ? 'bg-amber-500' : 'bg-stone-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Blue Team HUD */}
          <div className="col-span-5 bg-sky-50 border-2 border-sky-300 rounded-2xl p-4 flex items-center justify-between text-right">
            {roundWinner === 'blue' && (
              <span className="text-sm font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-xl animate-bounce">
                得分 +100!
              </span>
            )}
            <div className="ml-auto">
              <div className="flex items-center justify-end gap-1.5">
                <h4 className="font-extrabold text-sky-900 text-base">
                  {vsMode === 'vsBot' ? '🤖 机器人 (Robo-Bot)' : '🔵 蓝队 (Blue Team)'}
                </h4>
                <span className="w-3 h-3 rounded-full bg-sky-500" />
              </div>
              <div className="flex items-center justify-end gap-2 mt-1">
                {blueCombo > 1 && (
                  <span className="flex items-center text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {blueCombo} 连击!
                  </span>
                )}
                <span className="text-2xl font-black text-sky-600 tabular-nums">{blueScore}</span>
                <span className="text-xs text-sky-700 font-semibold">分</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game State Conditional Views */}
      {gameState === 'intro' && (
        <div className="bg-white rounded-3xl p-8 border-2 border-amber-200 shadow-md text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
            <Swords className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-stone-900">
              课堂单词记忆比拼 · 双人PK对战
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              适合电子白板大屏、平板或电脑双人竞技！听音速选，看谁先抢答出正确单词！
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                setVsMode('2player');
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 font-bold text-sm cursor-pointer transition-all ${
                vsMode === '2player'
                  ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-xs scale-105'
                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Users className="w-5 h-5 text-amber-600" />
              双人同屏对战 (2-Player)
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setVsMode('vsBot');
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 font-bold text-sm cursor-pointer transition-all ${
                vsMode === 'vsBot'
                  ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-xs scale-105'
                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Bot className="w-5 h-5 text-sky-600" />
              挑战机器人 (vs Bot)
            </button>
          </div>

          <button
            onClick={startGame}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-lg shadow-md cursor-pointer transition-transform hover:scale-102"
          >
            开始 PK 比赛 (Start Battle)
          </button>
        </div>
      )}

      {gameState === 'playing' && question && (
        <div className="space-y-6">
          {/* Target Prompt Banner */}
          <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 p-5 rounded-3xl shadow-sm text-center flex flex-col items-center justify-center relative overflow-hidden">
            <span className="text-xs font-black uppercase text-amber-900 bg-white/70 px-3 py-1 rounded-full mb-1">
              听音辨图 / 速抢目标 (Target Word)
            </span>

            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-black text-stone-900 tracking-tight">
                {question.targetItem.displayLabel}
              </h2>
              <button
                onClick={() => speakWord(question.targetItem.displayLabel)}
                className="p-2 rounded-full bg-white hover:bg-amber-100 text-amber-900 shadow-xs cursor-pointer transition-transform hover:scale-110"
                title="重新听发音"
              >
                <Volume2 className="w-6 h-6 text-amber-700" />
              </button>
            </div>

            <p className="text-sm font-bold text-amber-950 mt-1">
              含义: {question.targetItem.meaning}
            </p>
          </div>

          {/* 4 Interactive Option Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {question.options.map((option) => (
              <div
                key={option.id}
                className={`bg-white rounded-3xl p-4 border-2 transition-all flex flex-col justify-between shadow-xs ${
                  roundWinner && option.id === question.targetItem.id
                    ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-300/50 scale-102'
                    : 'border-stone-200 hover:border-amber-400'
                }`}
              >
                {/* Illustration with click listener */}
                <div className="aspect-square rounded-2xl p-2 bg-stone-50 flex items-center justify-center mb-3">
                  <WordIllustration id={option.id} className="w-full h-full" />
                </div>

                <div className="text-center mb-3">
                  <h4 className="font-bold text-stone-800 text-sm">{option.displayLabel}</h4>
                  <p className="text-xs text-stone-500">{option.meaning}</p>
                </div>

                {/* Buzzer action buttons: Red vs Blue tap zones */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                  <button
                    onClick={() => handleAnswer('red', option.id)}
                    disabled={isAnsweringLocked}
                    className="py-2 px-1 text-xs font-black rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white shadow-xs cursor-pointer transition-all disabled:opacity-50"
                  >
                    🔴 红队抢
                  </button>

                  <button
                    onClick={() => handleAnswer('blue', option.id)}
                    disabled={isAnsweringLocked || vsMode === 'vsBot'}
                    className={`py-2 px-1 text-xs font-black rounded-xl text-white shadow-xs transition-all ${
                      vsMode === 'vsBot'
                        ? 'bg-stone-300 cursor-not-allowed text-stone-500'
                        : 'bg-sky-500 hover:bg-sky-600 active:scale-95 cursor-pointer disabled:opacity-50'
                    }`}
                  >
                    🔵 蓝队抢
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Finished Game / Victory Screen */}
      {gameState === 'finished' && (
        <div className="bg-white rounded-3xl p-8 border-2 border-amber-300 shadow-lg text-center max-w-lg mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-500 mx-auto flex items-center justify-center">
            <Trophy className="w-10 h-10 fill-amber-400 text-amber-500 animate-bounce" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-stone-900">
              {redScore > blueScore
                ? '🎉 恭喜 红队 (Red Team) 获胜！'
                : redScore < blueScore
                ? vsMode === 'vsBot'
                  ? '🤖 机器人获胜！下次加油！'
                  : '🎉 恭喜 蓝队 (Blue Team) 获胜！'
                : '🤝 势均力敌！平局！'}
            </h3>
            <p className="text-xs text-stone-500">所有 10 轮比拼已圆满完成！孩子们表现超级棒！</p>
          </div>

          {/* Final Scoreboard Comparison */}
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-2xl">
              <span className="text-xs font-bold text-rose-800">红队得分</span>
              <div className="text-3xl font-black text-rose-600 tabular-nums">{redScore}</div>
            </div>
            <div className="bg-sky-50 border-2 border-sky-300 p-4 rounded-2xl">
              <span className="text-xs font-bold text-sky-800">
                {vsMode === 'vsBot' ? '机器人得分' : '蓝队得分'}
              </span>
              <div className="text-3xl font-black text-sky-600 tabular-nums">{blueScore}</div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base shadow-sm cursor-pointer transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            再来一局 (Play Again)
          </button>
        </div>
      )}
    </div>
  );
};
