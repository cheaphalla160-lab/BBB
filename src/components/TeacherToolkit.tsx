import React, { useState } from 'react';
import { Printer, GraduationCap, Gamepad2, FileText, CheckCircle2, Sparkles, Volume2 } from 'lucide-react';
import { VOCABULARY_LIST, OPPOSITE_PAIRS } from '../data/words';
import { WordIllustration } from './illustrations/WordIllustrations';
import { sound, speakWord } from '../utils/sound';

export const TeacherToolkit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plan' | 'print' | 'games' | 'phonics'>('plan');

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <GraduationCap className="w-6 h-6 text-purple-200" />
            <h2 className="text-2xl font-black tracking-tight">高级英语备课助手工作台</h2>
          </div>
          <p className="text-purple-100 text-xs">
            专为小学英语教师设计 · 包含教案活动、打印闪卡、课堂游戏库与自然拼读教学解析
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-purple-50 text-purple-900 rounded-xl font-bold text-xs shadow-xs cursor-pointer transition-colors whitespace-nowrap"
        >
          <Printer className="w-4 h-4 text-purple-600" />
          一键打印教案与闪卡 (Print)
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
        {[
          { id: 'plan', label: '📋 4P教学环节设计 (Lesson Plan)', icon: FileText },
          { id: 'print', label: '🖨️ 打印闪卡排版 (Printable Cards)', icon: Printer },
          { id: 'games', label: '🎲 5大课堂实体互动游戏 (Class Games)', icon: Gamepad2 },
          { id: 'phonics', label: '🔤 自然拼读教学难点表 (Phonics Table)', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: 4P Lesson Plan */}
      {activeTab === 'plan' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-purple-100 shadow-xs space-y-4">
            <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              小学英语高效课堂 40 分钟教学设计 (4P Teaching Model)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Step 1: Warm-up */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-amber-900 text-sm">
                    Step 1: Warm-up & Lead-in (5 mins)
                  </h4>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    热身激趣
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  <strong>活动: Opposite Action 动作相反令</strong>
                  <br />
                  老师说: "Show me a LONG pencil!" 学生双手拉长；老师说: "Show me a SHORT pencil!" 学生双手合拢。
                  导入本节课外貌与相反词的主题。
                </p>
              </div>

              {/* Step 2: Presentation */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-emerald-900 text-sm">
                    Step 2: Presentation (12 mins)
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    生词新授
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  <strong>使用网页功能:【对比剧场 Theatre】</strong>
                  <br />
                  1. 利用电子白板同时展示 <em>thick book</em> 和 <em>thin book</em>，强调音标 /θ/ 咬舌发音。
                  <br />
                  2. 讲授发型: <em>straight hair</em> (顺滑笔直) vs <em>curly hair</em> (卷卷蓬蓬)。
                  <br />
                  3. 强调 <em>moustache</em> (上唇) 与 <em>beard</em> (下巴) 的位置区别。
                </p>
              </div>

              {/* Step 3: Practice */}
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-indigo-900 text-sm">
                    Step 3: Practice (13 mins)
                  </h4>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                    趣味操练
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  <strong>使用网页功能:【拼读闯关 Puzzle】+【记忆翻翻乐】</strong>
                  <br />
                  学生通过拼读字母块，逐个攻克生词；再进行记忆卡片配对，将相反词（如 fat people ↔ thin people）成对收纳。
                </p>
              </div>

              {/* Step 4: Production */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-rose-900 text-sm">
                    Step 4: Production & PK (10 mins)
                  </h4>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                    对抗拓展
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  <strong>使用网页功能:【双人PK对战 Battle】</strong>
                  <br />
                  全班分成红蓝两队，每组推选代表上台点击抢答。快速听音反应，巩固所学词汇，课堂气氛达到高潮！
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Printable Flashcards */}
      {activeTab === 'print' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-purple-100 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-stone-900">
                可打印 A4 闪卡与字卡 (Printable Flashcard Sheet)
              </h3>
              <p className="text-xs text-stone-500">
                点击右上角打印按钮即可生成适合塑封、裁剪的小学便携教具卡片！
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              打印此页 (Print Sheet)
            </button>
          </div>

          {/* Cards Grid for Printing */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 print:grid-cols-3 print:gap-4">
            {VOCABULARY_LIST.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-dashed border-stone-300 rounded-2xl p-3 flex flex-col items-center justify-between text-center space-y-2 break-inside-avoid shadow-2xs"
              >
                <div className="w-20 h-20 bg-stone-50 rounded-xl p-1.5 flex items-center justify-center">
                  <WordIllustration id={item.id} className="w-full h-full" />
                </div>
                <div>
                  <h4 className="font-black text-stone-900 text-xs sm:text-sm">{item.word}</h4>
                  <span className="text-[10px] text-stone-400 font-mono block">{item.phonetic}</span>
                  <p className="text-[11px] font-bold text-purple-700">{item.displayLabel}</p>
                  <p className="text-[10px] text-stone-500">{item.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Classroom Games */}
      {activeTab === 'games' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: '1. 拍苍蝇大作战 (Flyswatter Word Race)',
              tag: '白板抢答',
              steps: [
                '将 15 个词汇卡片张贴在教室黑板上。',
                '红蓝两队各派出 1 名同学，手拿塑料苍蝇拍。',
                '老师读出目标单词（如 "curly hair"），最快拍中对应图片的同学为该队赢得 1 分。',
              ],
            },
            {
              title: '2. 找我的相反词双胞胎 (Find Your Opposite Twin)',
              tag: '全班互动',
              steps: [
                '将成对的卡片（如 thick book 和 thin book）分别发给不同的学生。',
                '学生在教室内走动，用句型 "I am thick book. Who is my opposite?" 寻找同伴。',
                '找到对子的同学手牵手到讲台前面向全班大声朗读例句。',
              ],
            },
            {
              title: '3. 侦探摸胡子 (Detective Mustache & Beard)',
              tag: '外貌趣味',
              steps: [
                '老师请一名戴着纸做 "moustache" 或 "beard" 的同学站在讲台中央。',
                '台下同学齐问: "Does he have a moustache or a beard?"',
                '台下举手最快的同学抢答，答对并拼写出单词获得奖励小贴纸。',
              ],
            },
            {
              title: '4. 大小声与回声谷 (Big & Small Voice)',
              tag: '发音强化',
              steps: [
                '老师如果用大声读 "SHORT PENCIL!"，学生必须用悄悄话小声回答 "short pencil"。',
                '老师如果用小声耳语，学生必须用最洪亮的声音回答。',
                '锻炼学生高度集中的听力反应与元音饱满度。',
              ],
            },
          ].map((game, i) => (
            <div key={i} className="bg-white rounded-3xl p-5 border-2 border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-stone-900 text-sm">{game.title}</h4>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                  {game.tag}
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-600 list-disc list-inside">
                {game.steps.map((s, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: Phonics & Pronunciation Insights */}
      {activeTab === 'phonics' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-purple-100 shadow-xs space-y-4">
          <h3 className="text-lg font-black text-stone-900">
            本课 15 个词汇的核心自然拼读 (Phonics) 教学要点
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-200 text-stone-500">
                  <th className="py-2.5 px-3">单词</th>
                  <th className="py-2.5 px-3">音标</th>
                  <th className="py-2.5 px-3">核心拼读音素 (Phonics Rules)</th>
                  <th className="py-2.5 px-3">易错发音提示 (Teacher Tip)</th>
                  <th className="py-2.5 px-3">发音朗读</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {VOCABULARY_LIST.map((item) => (
                  <tr key={item.id} className="hover:bg-purple-50/40">
                    <td className="py-2.5 px-3 font-bold text-stone-900">{item.word}</td>
                    <td className="py-2.5 px-3 font-mono text-purple-700">{item.phonetic}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex gap-1">
                        {item.phonics.map((chunk, cIdx) => (
                          <span
                            key={cIdx}
                            className="bg-stone-100 px-1.5 py-0.5 rounded font-mono font-bold text-stone-800"
                          >
                            {chunk}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-stone-600">{item.funTip}</td>
                    <td className="py-2.5 px-3">
                      <button
                        onClick={() => {
                          sound.playClick();
                          speakWord(item.word);
                        }}
                        className="p-1 text-purple-600 hover:bg-purple-100 rounded-lg cursor-pointer"
                        title="点击播放标准发音"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
