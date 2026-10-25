import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import { quizQuestions, quizResults, workshops } from '../data';
import { useAppContext } from '../App';

export default function QuizPage() {
  const { quizResult } = useAppContext();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);

  const totalQuestions = quizQuestions.length;
  const progress = ((currentQ + (showResult ? 1 : 0)) / totalQuestions) * 100;

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQ]: optionIndex }));
    if (currentQ < totalQuestions - 1) {
      setTimeout(() => setCurrentQ(prev => prev + 1), 300);
    } else {
      setTimeout(() => calculateResult(), 300);
    }
  };

  const calculateResult = () => {
    const scores: Record<string, number> = { collector: 0, maker: 0, explorer: 0, noticer: 0, social: 0, seeker: 0 };
    Object.entries(answers).forEach(([qIdx, optIdx]) => {
      const question = quizQuestions[Number(qIdx)];
      if (question && question.options[optIdx]) {
        const optionScores = question.options[optIdx].scores;
        Object.entries(optionScores).forEach(([key, val]) => {
          scores[key] = (scores[key] || 0) + val;
        });
      }
    });
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    quizResult.setResult(quizResults[winner]);
    setShowResult(true);
  };

  const goBack = () => {
    if (showResult) { setShowResult(false); return; }
    if (currentQ > 0) setCurrentQ(prev => prev - 1);
  };

  const restart = () => {
    setCurrentQ(0);
    setAnswers({});
    setShowResult(false);
    setStarted(false);
    quizResult.clear();
  };

  const result = quizResult.result;
  const recommendedWorkshops = result ? workshops.filter(w => result.recommendedWorkshops.includes(w.id)) : [];

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="text-5xl block mb-4">✨</span>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-3">What's Your Creative Mood?</h1>
          <p className="text-pencil mb-8 max-w-md mx-auto">
            Answer five quick questions to discover your creative personality and get personalized workshop recommendations.
          </p>
          <button onClick={() => setStarted(true)}
            className="btn-press inline-flex items-center gap-2 px-8 py-3 bg-ink text-cream rounded-full font-medium hover:bg-ink/90 transition-colors">
            <Sparkles className="w-4 h-4" /> Start the Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  if (showResult && result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          {/* Progress */}
          <div className="mb-6">
            <div className="h-1 bg-ink/5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full rounded-full" style={{ backgroundColor: result.color }} />
            </div>
          </div>

          {/* Result */}
          <div className="paper-card p-8 text-center mb-6" style={{ borderTop: `4px solid ${result.color}` }}>
            <span className="text-5xl block mb-3">{result.emoji}</span>
            <p className="handwritten text-xl mb-1" style={{ color: result.color }}>You are...</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl mb-4">{result.title}</h2>
            <p className="text-pencil leading-relaxed max-w-md mx-auto">{result.description}</p>
          </div>

          {/* Recommendations */}
          {recommendedWorkshops.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3">Recommended for you</h3>
              <div className="space-y-2">
                {recommendedWorkshops.map(w => (
                  <Link key={w.id} to={`/workshops/${w.id}`} className="block paper-card p-3 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: w.color + '40' }}>{w.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{w.title}</p>
                        <p className="text-xs text-pencil">{w.instructor} · {new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      </div>
                      <span className="text-sm font-medium">${w.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button onClick={restart} className="btn-press inline-flex items-center gap-2 px-5 py-2.5 border border-ink/10 rounded-full text-sm font-medium hover:bg-ink/5">
              <RotateCcw className="w-4 h-4" /> Retake Quiz
            </button>
            <Link to="/workshops" className="btn-press inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-cream rounded-full text-sm font-medium hover:bg-ink/90">
              Browse Workshops
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Question view
  const question = quizQuestions[currentQ];
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-pencil">Question {currentQ + 1} of {totalQuestions}</span>
          <button onClick={goBack} disabled={currentQ === 0} className="text-xs text-pencil hover:text-ink disabled:opacity-30">
            <ChevronLeft className="w-4 h-4 inline" /> Back
          </button>
        </div>
        <div className="h-1 bg-ink/5 rounded-full overflow-hidden">
          <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} className="h-full bg-berry rounded-full" />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-6">{question.question}</h2>
          
          <div className="grid sm:grid-cols-2 gap-3">
            {question.options.map((opt, i) => (
              <motion.button key={i}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(i)}
                className={`paper-card p-4 text-left transition-all hover:shadow-md
                  ${answers[currentQ] === i ? 'ring-2 ring-berry bg-berry/5' : ''}`}>
                <span className="text-2xl block mb-2">{opt.emoji}</span>
                <span className="text-sm font-medium">{opt.text}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
