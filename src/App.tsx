/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Play, RotateCcw, CheckCircle2, XCircle, Timer, Award } from 'lucide-react';
import { QUESTIONS } from './constants';
import { QuizResult } from './types';

// Components
const IntroScreen = ({ onStart }: { onStart: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6"
  >
    <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-200 rotate-12">
      <Trophy className="w-12 h-12 text-white -rotate-12" />
    </div>
    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
      Đấu Trường <span className="text-indigo-600">Kiến Thức</span>
    </h1>
    <p className="text-gray-500 text-lg mb-4 max-w-md">
      Thử thách bản thân với 30 câu hỏi trắc nghiệm Toán học và Khoa học Tự nhiên. Bạn đã sẵn sàng chưa?
    </p>
    <p className="text-indigo-500 font-medium mb-12">
      Tạo bởi Hà Thị Bích Hạnh
    </p>
    <button 
      id="start-quiz-btn"
      onClick={onStart}
      className="group relative px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200"
    >
      <span className="flex items-center gap-2">
        <Play className="w-6 h-6 fill-current" />
        Bắt đầu ngay
      </span>
    </button>
  </motion.div>
);

const PyramidSABCD = () => (
  <svg viewBox="0 0 200 200" className="w-full max-w-[300px] mx-auto">
    <path d="M100 20 L40 140 L160 140 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M100 20 L70 160 L190 160 L160 140" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M70 160 L40 140" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
    <path d="M100 20 L130 150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
    <text x="95" y="15" className="text-[12px] fill-current">S</text>
    <text x="30" y="145" className="text-[12px] fill-current">A</text>
    <text x="60" y="175" className="text-[12px] fill-current">B</text>
    <text x="195" y="175" className="text-[12px] fill-current">C</text>
    <text x="165" y="145" className="text-[12px] fill-current">D</text>
    <circle cx="115" cy="150" r="1.5" className="fill-current" />
    <text x="110" y="145" className="text-[10px] fill-current">O</text>
    {/* Right angle marker at A */}
    <path d="M40 130 L50 130 L50 140" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const CubeABCD = () => (
  <svg viewBox="0 0 200 200" className="w-full max-w-[300px] mx-auto">
    <rect x="40" y="60" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="80" y="20" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="40" y1="60" x2="80" y2="20" stroke="currentColor" strokeWidth="2" />
    <line x1="120" y1="60" x2="160" y2="20" stroke="currentColor" strokeWidth="2" />
    <line x1="120" y1="140" x2="160" y2="100" stroke="currentColor" strokeWidth="2" />
    <line x1="40" y1="140" x2="80" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
    <text x="30" y="155" className="text-[10px] fill-current">B</text>
    <text x="125" y="155" className="text-[10px] fill-current">C</text>
    <text x="125" y="55" className="text-[10px] fill-current">B'</text>
    <text x="30" y="55" className="text-[10px] fill-current">A'</text>
    <text x="70" y="15" className="text-[10px] fill-current">D'</text>
    <text x="165" y="15" className="text-[10px] fill-current">C'</text>
    <text x="165" y="115" className="text-[10px] fill-current">D</text>
    <text x="70" y="115" className="text-[10px] fill-current">A</text>
  </svg>
);

const TimeTable = () => (
  <div className="overflow-x-auto my-4">
    <table className="w-full text-sm border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-50">
          <th className="border border-gray-200 p-2">Thời gian (phút)</th>
          <th className="border border-gray-200 p-2">[9,5; 12,5)</th>
          <th className="border border-gray-200 p-2">[12,5; 15,5)</th>
          <th className="border border-gray-200 p-2">[15,5; 18,5)</th>
          <th className="border border-gray-200 p-2">[18,5; 21,5)</th>
          <th className="border border-gray-200 p-2">[21,5; 24,5)</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-center">
          <td className="border border-gray-200 p-2 font-medium">Số học sinh</td>
          <td className="border border-gray-200 p-2">3</td>
          <td className="border border-gray-200 p-2">12</td>
          <td className="border border-gray-200 p-2">15</td>
          <td className="border border-gray-200 p-2 font-bold text-indigo-600 bg-indigo-50">24</td>
          <td className="border border-gray-200 p-2">2</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const PyramidSABC = () => (
  <svg viewBox="0 0 200 200" className="w-full max-w-[300px] mx-auto">
    <path d="M100 20 L40 140 L160 140 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M100 20 L100 170 L160 140" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M40 140 L100 170" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
    <text x="95" y="15" className="text-[12px] fill-current">S</text>
    <text x="30" y="145" className="text-[12px] fill-current">A</text>
    <text x="95" y="185" className="text-[12px] fill-current">B</text>
    <text x="165" y="145" className="text-[12px] fill-current">C</text>
  </svg>
);

const RubberStep = () => (
  <svg viewBox="0 0 200 200" className="w-full max-w-[300px] mx-auto">
    <path d="M40 160 L160 160 L160 100 L40 130 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M160 100 L120 60 L20 90 L40 130" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M120 60 L120 120 L20 150 L20 90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
    <text x="165" y="165" className="text-[10px] fill-current">A</text>
    <text x="165" y="95" className="text-[10px] fill-current">B</text>
    <text x="35" y="170" className="text-[10px] fill-current">C</text>
    <text x="35" y="130" className="text-[10px] fill-current">D</text>
    <text x="125" y="60" className="text-[10px] fill-current">E</text>
    <text x="15" y="90" className="text-[10px] fill-current">F</text>
  </svg>
);

const QuizGame = ({ onFinish }: { onFinish: (result: QuizResult) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime] = useState(Date.now());

  const currentQuestion = QUESTIONS[currentIndex];

  useEffect(() => {
    if (isAnswered) return;
    if (timeLeft === 0) {
      handleAnswer(null);
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleAnswer = (answer: any) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + (timeLeft * 10) + 100);
      setCorrectCount(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setTimeLeft(20);
      } else {
        onFinish({
          score: score + (isCorrect ? (timeLeft * 10) + 100 : 0),
          totalQuestions: QUESTIONS.length,
          correctAnswers: correctCount + (isCorrect ? 1 : 0),
          wrongAnswers: wrongCount + (isCorrect ? 0 : 1),
          timeSpent: Math.floor((Date.now() - startTime) / 1000)
        });
      }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-4 py-8">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-8">
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 font-bold text-indigo-600">
          Câu {currentIndex + 1} / {QUESTIONS.length}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
            <Timer className={`w-5 h-5 ${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} />
            <span className={`font-mono font-bold ${timeLeft < 5 ? 'text-red-500' : 'text-gray-700'}`}>
              00:{timeLeft.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="bg-indigo-600 px-4 py-2 rounded-xl text-white font-bold shadow-lg shadow-indigo-100">
            {score.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-100 rounded-full mb-12 overflow-hidden border border-gray-50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
          className="h-full bg-indigo-500"
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-100 border border-gray-50 mb-8"
        >
          <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">
            {currentQuestion.type === 'multiple' ? 'Trắc nghiệm 4 lựa chọn' : 'Đúng hay Sai?'}
          </div>
          {currentQuestion.context && (
            <div className="text-gray-600 italic mb-4 p-4 bg-gray-50 rounded-xl border-l-4 border-indigo-200">
              {currentQuestion.context}
            </div>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
            {currentQuestion.text}
          </h2>
          {currentQuestion.imageUrl && !currentQuestion.customComponent && (
            <div className="mb-6 flex justify-center">
              <img 
                src={currentQuestion.imageUrl} 
                alt="Hình minh họa" 
                className="max-h-64 object-contain rounded-xl border border-gray-100 p-2"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          {currentQuestion.customComponent && (
            <div className="mb-6 bg-white p-4 rounded-xl border border-gray-50 flex justify-center">
              {currentQuestion.customComponent === 'PyramidSABCD' && <PyramidSABCD />}
              {currentQuestion.customComponent === 'CubeABCD' && <CubeABCD />}
              {currentQuestion.customComponent === 'TimeTable' && <TimeTable />}
              {currentQuestion.customComponent === 'PyramidSABC' && <PyramidSABC />}
              {currentQuestion.customComponent === 'RubberStep' && <RubberStep />}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Options Grid */}
      <div className={`grid gap-4 ${currentQuestion.type === 'multiple' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2'}`}>
        {(currentQuestion.type === 'multiple' ? currentQuestion.options : [true, false])?.map((option, idx) => {
          const isCorrect = currentQuestion.type === 'multiple' 
            ? idx === currentQuestion.correctAnswer 
            : option === currentQuestion.correctAnswer;
          
          const isSelected = selectedAnswer === (currentQuestion.type === 'multiple' ? idx : option);

          let btnClass = "bg-white border-2 border-gray-100 text-gray-700 hover:border-indigo-200 hover:bg-indigo-50/30";
          if (isAnswered) {
            if (isCorrect) btnClass = "bg-green-50 border-green-500 text-green-700";
            else if (isSelected) btnClass = "bg-red-50 border-red-500 text-red-700";
            else btnClass = "opacity-50 grayscale border-gray-100";
          }

          return (
            <button
              id={`option-btn-${idx}`}
              key={idx}
              disabled={isAnswered}
              onClick={() => handleAnswer(currentQuestion.type === 'multiple' ? idx : option)}
              className={`relative flex items-center p-6 rounded-2xl font-bold text-lg transition-all active:scale-95 text-left group ${btnClass}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-4 shrink-0 transition-colors ${
                isAnswered && isCorrect ? 'bg-green-500 text-white' : 
                isAnswered && isSelected ? 'bg-red-500 text-white' : 
                'bg-gray-100 text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-500'
              }`}>
                {isAnswered && isCorrect ? <CheckCircle2 className="w-5 h-5" /> : 
                 isAnswered && isSelected ? <XCircle className="w-5 h-5" /> : 
                 (currentQuestion.type === 'multiple' ? String.fromCharCode(65 + idx) : (option ? 'T' : 'F'))}
              </div>
              <span className="flex-1">
                {currentQuestion.type === 'multiple' ? option : (option ? 'ĐÚNG' : 'SAI')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback Note */}
      <AnimatePresence>
        {isAnswered && currentQuestion.explanation && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-indigo-50 rounded-xl text-indigo-700 text-sm italic flex gap-3 items-start"
          >
            <Award className="w-5 h-5 shrink-0" />
            <p>{currentQuestion.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ResultScreen = ({ result, onRestart }: { result: QuizResult, onRestart: () => void }) => {
  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto w-full p-4 py-8 text-center"
    >
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-indigo-100 border border-gray-50 overflow-hidden relative">
        {/* Background Confetti Placeholder or decorative shapes */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hoàn thành thử thách!</h2>
        <p className="text-gray-500 mb-8">Bạn đã làm rất tốt. Hãy xem lại kết quả của mình.</p>

        <div className="grid grid-cols-2 gap-4 mb-8 text-left">
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">Tổng điểm</div>
            <div className="text-3xl font-black text-indigo-600">{result.score.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">Độ chính xác</div>
            <div className="text-3xl font-black text-green-600">{percentage}%</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">Số câu đúng</div>
            <div className="text-2xl font-bold text-gray-700">{result.correctAnswers} / {result.totalQuestions}</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">Thời gian</div>
            <div className="text-2xl font-bold text-gray-700">{result.timeSpent} giây</div>
          </div>
        </div>

        <button 
          id="restart-quiz-btn"
          onClick={onRestart}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Chơi lại từ đầu
        </button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const startQuiz = () => {
    setGameState('playing');
    setQuizResult(null);
  };

  const finishQuiz = (result: QuizResult) => {
    setQuizResult(result);
    setGameState('result');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <main className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {gameState === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <IntroScreen onStart={startQuiz} />
            </motion.div>
          )}
          {gameState === 'playing' && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <QuizGame onFinish={finishQuiz} />
            </motion.div>
          )}
          {gameState === 'result' && quizResult && (
            <motion.div 
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <ResultScreen result={quizResult} onRestart={startQuiz} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative Blur Backgrounds */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

