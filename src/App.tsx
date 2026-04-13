/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  RotateCcw, 
  User, 
  Heart, 
  X,
  Trophy, 
  Zap, 
  Sparkles
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import { QUESTIONS, PERSONALITIES, Personality } from './constants';
import { getLocalImagePath } from './source/imageMapping';

// --- Types ---

type AppState = 'landing' | 'quiz' | 'result';

// --- Components ---

const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="fixed top-0 left-0 w-full h-2 bg-zinc-100 z-50">
    <motion.div 
      className="h-full bg-black"
      initial={{ width: 0 }}
      animate={{ width: `${(current / total) * 100}%` }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    />
  </div>
);

const RadarChartComponent = ({ data }: { data: any[] }) => (
  <div className="w-full h-64 mt-4">
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#e4e4e7" />
        <PolarAngleAxis dataKey="label" tick={{ fill: '#71717a', fontSize: 10 }} />
        <Radar
          name="Stats"
          dataKey="value"
          stroke="#000"
          fill="#000"
          fillOpacity={0.1}
        />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

export default function App() {
  const [state, setState] = useState<AppState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'L' | 'M' | 'H'>>({});
  const [result, setResult] = useState<Personality | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCodeType, setQrCodeType] = useState<'contact' | 'support'>('contact');

  // --- Logic ---

  const handleAnswer = (score: 'L' | 'M' | 'H') => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    if (!currentQuestion) return;

    setAnswers(prev => ({ ...prev, [currentQuestion.id]: score }));
    
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      generateResult();
    }
  };

  const generateResult = () => {
    setIsGenerating(true);
    setState('result');
    
    // Simulate generation delay for "ritual" feel
    setTimeout(() => {
      // 归一化分数到0-100范围
      const dimensionScores: Record<number, number> = {};
      const dimensionWeights: Record<number, number> = {};
      
      // 计算每个维度的加权分数
      Object.entries(answers).forEach(([qId, score]) => {
        const question = QUESTIONS.find(q => q.id === parseInt(qId));
        if (question) {
          const weight = question.weight || 1;
          const numericScore = score === 'L' ? 0 : score === 'M' ? 50 : 100;
          const weightedScore = numericScore * weight;
          dimensionScores[question.dimension] = (dimensionScores[question.dimension] || 0) + weightedScore;
          dimensionWeights[question.dimension] = (dimensionWeights[question.dimension] || 0) + weight;
        }
      });

      // 归一化得到0-100的维度分数
      const normalizedScores: number[] = [];
      for (let i = 0; i < 15; i++) {
        if (dimensionWeights[i] && dimensionWeights[i] > 0) {
          normalizedScores.push(Math.round(dimensionScores[i] / dimensionWeights[i]));
        } else {
          normalizedScores.push(50); // 默认中间值
        }
      }

      // 计算加权距离匹配最相似的人格
      let bestMatch = PERSONALITIES[0];
      let maxSimilarity = -Infinity;

      PERSONALITIES.forEach(p => {
        let totalDistance = 0;
        let totalWeight = 0;
        
        for (let i = 0; i < 15; i++) {
          const templateScore = p.template[i] === 'L' ? 0 : p.template[i] === 'M' ? 50 : 100;
          const diff = Math.abs(normalizedScores[i] - templateScore);
          // 使用方差作为距离度量
          totalDistance += diff * diff;
          totalWeight += 1;
        }
        
        const avgDistance = totalDistance / totalWeight;
        const similarity = 10000 - avgDistance; // 相似度 = 10000 - 平均距离平方
        
        if (similarity > maxSimilarity) {
          maxSimilarity = similarity;
          bestMatch = p;
        }
      });

      setResult(bestMatch);
      setIsGenerating(false);
    }, 2500);
  };

  const reset = () => {
    setState('landing');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
  };

  // --- Render Helpers ---

  const renderLanding = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#F8F8F8]"
    >
      <div className="max-w-2xl w-full space-y-8">
        <div className="space-y-2">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block px-3 py-1 bg-black text-white text-xs font-mono uppercase tracking-widest mb-4"
          >
            Silly Big Personality Test
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black leading-none">
            DESIGNER <br /> SBTI
          </h1>
          <p className="text-zinc-500 font-medium text-lg md:text-xl max-w-md mx-auto pt-4">
            基于 Vibe Coding 开发，解构设计师职场痛点的趣味性格卡牌测试。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          {[
            { icon: <Zap className="w-5 h-5" />, text: "30道专业槽点题" },
            { icon: <Trophy className="w-5 h-5" />, text: "25种稀有人格" },
            { icon: <Sparkles className="w-5 h-5" />, text: "动态视觉卡牌" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-4 border border-zinc-200 bg-white rounded-xl shadow-sm">
              <div className="mb-2 text-black">{item.icon}</div>
              <span className="text-sm font-bold">{item.text}</span>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setState('quiz')}
          className="group relative w-full md:w-auto px-12 py-5 bg-black text-white font-black text-xl rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            立即开始测试 <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>

        <p className="text-zinc-400 text-xs font-mono uppercase">
          Zero Science • 100% Vibe • Designer Only
        </p>
      </div>
    </motion.div>
  );

  const renderQuiz = () => {
    const question = QUESTIONS[currentQuestionIndex];
    if (!question) return null;
    
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />
        
        <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-3xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full space-y-12"
            >
              <div className="space-y-4">
                <span className="text-zinc-400 font-mono text-sm">
                  QUESTION {currentQuestionIndex + 1} / {QUESTIONS.length}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight tracking-tight">
                  {question.text}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {question.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01, backgroundColor: '#000', color: '#fff' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(option.score)}
                    className="w-full p-6 text-left border-2 border-black rounded-2xl text-xl font-bold transition-colors flex items-center justify-between group"
                  >
                    <span>{option.text}</span>
                    <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center group-hover:border-white">
                      <span className="text-xs">{String.fromCharCode(65 + idx)}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    );
  };

  const renderResult = () => {
    if (isGenerating) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-8"
          >
            <Sparkles className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="text-2xl font-mono uppercase tracking-[0.2em] mb-2">正在合成人格卡牌...</h2>
          <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5 }}
            />
          </div>
          <p className="mt-4 text-zinc-500 text-sm font-mono">Analyzing your vibe entropy...</p>
        </div>
      );
    }

    if (!result) return null;

    return (
      <div className="min-h-screen bg-[#F0F0F0] py-12 px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-md w-full bg-white border-[3px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl overflow-hidden flex flex-col"
        >
          {/* Card Header */}
          <div className="p-6 border-b-[3px] border-black flex justify-between items-center bg-zinc-50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest">
              {result.rarity} CARD
            </span>
          </div>

          {/* Card Visual */}
          <div className="relative aspect-square bg-zinc-100 border-b-[3px] border-black overflow-hidden">
            <img 
              src={getLocalImagePath(result.title) || ''} 
              alt={result.title}
              className="w-full h-full object-cover grayscale contrast-125"
            />
            <div className="absolute top-4 left-4">
              <div className="bg-black text-white px-3 py-1 text-sm font-black uppercase skew-x-[-12deg]">
                {result.title}
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-2 py-1 border border-black text-[10px] font-mono">
              ID: {result.id}-{Math.random().toString(36).substring(7).toUpperCase()}
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase leading-none">{result.title}</h3>
              <p className="text-zinc-500 text-sm font-medium italic">"{result.description}"</p>
            </div>

            <RadarChartComponent data={result.stats} />

            <div className="p-4 bg-zinc-50 border-2 border-black rounded-xl">
              <p className="text-sm leading-relaxed text-zinc-800 font-medium">
                {result.story}
              </p>
            </div>
          </div>

          {/* Card Footer */}
          <div className="p-6 bg-black text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white rounded-lg">
                <div className="w-6 h-6 bg-black rounded-sm" />
              </div>
              <div className="text-[10px] font-mono leading-tight">
                DESIGNER SBTI<br />VER. 2026.04
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono opacity-50">COMPATIBILITY</div>
              <div className="text-sm font-black">
                {result.rarity === 'Epic' ? (89 + Math.random() * 10).toFixed(1) :
                 result.rarity === 'Rare' ? (76 + Math.random() * 12).toFixed(1) :
                 (60 + Math.random() * 15).toFixed(1)}% VIBE
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 max-w-md w-full">
          <button
            onClick={() => { setQrCodeType('contact'); setShowQrModal(true); }}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-black font-bold rounded-2xl hover:bg-zinc-100 transition-colors"
          >
            <User className="w-5 h-5" /> 联系作者
          </button>
          <button
            onClick={() => { setQrCodeType('support'); setShowQrModal(true); }}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-black font-bold rounded-2xl hover:bg-zinc-100 transition-colors"
          >
            <Heart className="w-5 h-5" /> 赞赏作者
          </button>
          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-black text-white font-bold rounded-2xl hover:bg-zinc-800 transition-colors"
          >
            <RotateCcw className="w-5 h-5" /> 重新测试
          </button>
        </div>

        {/* QR Code Modal */}
        <AnimatePresence>
          {showQrModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
              onClick={() => setShowQrModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-3xl p-6 max-w-sm w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowQrModal(false)}
                  className="absolute top-3 right-3 p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <img
                  src={qrCodeType === 'contact' ? '/src/source/qrcode2.png' : '/src/source/qrcode1.png'}
                  alt={qrCodeType === 'contact' ? '联系作者' : '赞赏作者'}
                  className="w-full rounded-2xl"
                />
                <p className="text-center mt-4 font-bold text-lg">
                  {qrCodeType === 'contact' ? '扫码联系作者' : '扫码赞赏作者'}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="font-sans text-black antialiased selection:bg-black selection:text-white">
      <AnimatePresence mode="wait">
        {state === 'landing' && renderLanding()}
        {state === 'quiz' && renderQuiz()}
        {state === 'result' && renderResult()}
      </AnimatePresence>
    </div>
  );
}
