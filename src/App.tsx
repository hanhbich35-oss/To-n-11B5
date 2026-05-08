/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Play, RotateCcw, CheckCircle2, XCircle, Timer, Award, User, Heart, Calculator, Send } from 'lucide-react';
import { QUESTIONS } from './constants';
import { QuizResult } from './types';
import { db } from './services/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';

// Components
const IntroScreen = ({ onStart, onShowLeaderboard }: { onStart: () => void, onShowLeaderboard: () => void }) => (
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
      Thử thách bản thân với 35 câu hỏi trắc nghiệm Toán học và Khoa học Tự nhiên. Bạn đã sẵn sàng chưa?
    </p>
    <p className="text-indigo-500 font-medium mb-12">
      Tạo bởi Hà Thị Bích Hạnh
    </p>
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto">
      <button 
        id="start-quiz-btn"
        onClick={onStart}
        className="flex-1 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
      >
        <Play className="w-6 h-6 fill-current" />
        Bắt đầu
      </button>
      <button 
        id="intro-leaderboard-btn"
        onClick={onShowLeaderboard}
        className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        <Trophy className="w-6 h-6 text-yellow-500" />
        Xếp hạng
      </button>
    </div>
  </motion.div>
);

const RegistrationScreen = ({ onComplete }: { onComplete: (name: string) => void }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto w-full p-8 bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-indigo-50"
    >
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Danh tính chiến binh</h2>
        <p className="text-gray-500 text-sm mt-2">Vui lòng nhập tên của bạn để lưu kết quả vào máy chủ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="user-name" className="block text-sm font-bold text-gray-700 mb-2 ml-1">
            Họ và tên của bạn
          </label>
          <input
            id="user-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn A"
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
          />
        </div>
        <button
          id="confirm-name-btn"
          type="submit"
          disabled={!name.trim()}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
        >
          Tiếp tục
          <Send className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
};

const Leaderboard = ({ onClose }: { onClose: () => void }) => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const q = query(collection(db, 'quizResults'), orderBy('score', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResults(data);
      } catch (e) {
        console.error("Error fetching leaderboard:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-300" />
            <h2 className="text-xl font-bold">Bảng Xếp Hạng</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="py-20 text-center text-gray-400 font-medium animate-pulse">Đang tải dữ liệu...</div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              {results.map((res, index) => (
                <div key={res.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                      index === 1 ? 'bg-gray-200 text-gray-700' : 
                      index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <div className="font-bold text-gray-900">{res.userName}</div>
                      <div className="text-xs text-gray-500">{new Date(res.createdAt?.toDate()).toLocaleDateString('vi-VN')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-indigo-600 font-black text-lg">{res.score}đ</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">{res.correctAnswers} đúng / {res.totalQuestions} câu</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-gray-400 font-medium">Chưa có dữ liệu nào được ghi nhận.</div>
          )}
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition-all"
          >
            Đóng
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MathVsCrushGate = ({ onChoice }: { onChoice: (choice: 'math' | 'crush') => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-2xl mx-auto w-full p-8 text-center"
  >
    <div className="bg-white rounded-3xl p-12 shadow-2xl shadow-purple-100 border border-purple-50">
      <h2 className="text-3xl font-black text-gray-900 mb-8">Một câu hỏi cực kỳ quan trọng...</h2>
      
      <div className="p-8 bg-purple-50 rounded-2xl mb-12 border-2 border-purple-100 italic text-xl text-purple-800 font-medium">
        "Em sẽ chọn Toán hay chọn Crush?"
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          id="choose-math-btn"
          onClick={() => onChoice('math')}
          className="group flex flex-col items-center justify-center p-8 bg-indigo-600 text-white rounded-3xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-200"
        >
          <Calculator className="w-12 h-12 mb-4 animate-bounce" />
          <span className="text-2xl font-black">CHỌN TOÁN</span>
          <span className="text-xs mt-2 opacity-70">Vì tri thức là sức mạnh!</span>
        </button>

        <button
          id="choose-crush-btn"
          onClick={() => onChoice('crush')}
          className="group flex flex-col items-center justify-center p-8 bg-white border-4 border-dashed border-pink-200 text-pink-500 rounded-3xl hover:border-pink-500 hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all"
        >
          <Heart className="w-12 h-12 mb-4 group-hover:scale-125 transition-transform" />
          <span className="text-2xl font-black">CHỌN CRUSH</span>
          <span className="text-xs mt-2 opacity-70">Nhưng coi chừng bị từ chối đó nha...</span>
        </button>
      </div>
    </div>
  </motion.div>
);

const PyramidSABCD = () => (
  <svg viewBox="0 0 200 200" className="w-full max-w-[300px] mx-auto filter drop-shadow-md">
    <defs>
      <linearGradient id="pyrGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    {/* Points: A(80,120) back-left, B(40,160) front-left, C(160,160) front-right, D(200,120) back-right ? Adjusting for 200x200 viewbox */}
    {/* New coords: A(60,130), B(30,170), C(130,170), D(160,130) -> Center O approx (95, 150) -> S(95, 30) */}
    
    {/* Base edges (Hidden) */}
    <path d="M60 130 L30 170" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
    <path d="M60 130 L160 130" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
    <path d="M95 30 L60 130" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4" />
    
    {/* Visible Base/Sides */}
    <path d="M30 170 L130 170 L160 130" fill="url(#pyrGrad)" fillOpacity="0.5" stroke="#4f46e5" strokeWidth="2" strokeLinejoin="round" />
    <path d="M95 30 L30 170" stroke="#4f46e5" strokeWidth="2" />
    <path d="M95 30 L130 170" stroke="#4f46e5" strokeWidth="2" />
    <path d="M95 30 L160 130" stroke="#4f46e5" strokeWidth="2" />
    
    <text x="90" y="25" className="text-[14px] font-bold fill-indigo-900">S</text>
    <text x="50" y="130" className="text-[12px] font-bold fill-indigo-800">A</text>
    <text x="20" y="185" className="text-[12px] font-bold fill-indigo-800">B</text>
    <text x="135" y="185" className="text-[12px] font-bold fill-indigo-800">C</text>
    <text x="165" y="130" className="text-[12px] font-bold fill-indigo-800">D</text>
    
    <circle cx="95" cy="150" r="2" className="fill-indigo-600" />
    <text x="100" y="148" className="text-[10px] font-bold fill-indigo-800">O</text>
    
    {/* Height SO */}
    <line x1="95" y1="30" x2="95" y2="150" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
  </svg>
);

const CubeABCD = () => (
  <svg viewBox="0 0 200 200" className="w-full max-w-[300px] mx-auto filter drop-shadow-md">
    <defs>
      <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    
    {/* Hidden Back Edges (A is hidden vertex) */}
    {/* Back left bottom A(80, 110), Back back edges: AD, AA', AB */}
    <path d="M80 110 L160 110" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="3" />
    <path d="M80 110 L40 140" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="3" />
    <path d="M80 110 L80 30" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="3" />

    {/* Visible faces */}
    {/* Front face: A'(40,30), B'(120,30), C(120,110), B(40,110) - wait matching image labels */}
    {/* Image: Front square vertices TL=A', TR=B', BR=C, BL=B */}
    <path d="M40 60 L120 60 L120 140 L40 140 Z" fill="url(#cubeGrad)" stroke="#4f46e5" strokeWidth="2" />
    
    {/* Top face visible edges */}
    <path d="M40 60 L80 20 L160 20 L120 60" fill="url(#cubeGrad)" stroke="#4f46e5" strokeWidth="2" strokeLinejoin="round" />
    
    {/* Right side visible edges */}
    <path d="M120 140 L160 100 L160 20" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinejoin="round" />

    {/* Labels to match image EXACTLY */}
    {/* Front Face: Top-Left=A', Top-Right=B', Bottom-Right=C, Bottom-Left=B */}
    <text x="30" y="55" className="text-[12px] font-bold fill-indigo-800">A'</text>
    <text x="125" y="55" className="text-[12px] font-bold fill-indigo-800">B'</text>
    <text x="125" y="155" className="text-[12px] font-bold fill-indigo-800">C</text>
    <text x="30" y="155" className="text-[12px] font-bold fill-indigo-800">B</text>
    
    {/* Back Face (offset): Top-Left=D', Top-Right=C', Bottom-Right=D, Bottom-Left=A */}
    <text x="75" y="15" className="text-[12px] font-bold fill-indigo-800">D'</text>
    <text x="165" y="15" className="text-[12px] font-bold fill-indigo-800">C'</text>
    <text x="165" y="115" className="text-[12px] font-bold fill-indigo-800">D</text>
    <text x="70" y="115" className="text-[12px] font-bold opacity-40 fill-indigo-800 italic">A</text>
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
  <svg viewBox="0 0 200 200" className="w-full max-w-[300px] mx-auto filter drop-shadow-md">
    <defs>
      <linearGradient id="pyrSABC" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    {/* Points: A(100,130) back, B(40,170) front-left, C(160,170) front-right, S(100,30) */}
    
    {/* Hidden edges */}
    <path d="M100 130 L40 170" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
    <path d="M100 130 L160 170" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
    <path d="M100 30 L100 130" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4" />
    
    {/* Base/Sides */}
    <path d="M40 170 L160 170 L100 30 Z" fill="url(#pyrSABC)" stroke="#4f46e5" strokeWidth="2" strokeLinejoin="round" />
    <path d="M100 30 L40 170" stroke="#4f46e5" strokeWidth="2" />
    
    <text x="95" y="25" className="text-[14px] font-bold fill-indigo-900">S</text>
    <text x="95" y="125" className="text-[12px] font-bold fill-indigo-800">A</text>
    <text x="30" y="185" className="text-[12px] font-bold fill-indigo-800">B</text>
    <text x="165" y="185" className="text-[12px] font-bold fill-indigo-800">C</text>
  </svg>
);

const RubberStep = () => (
  <svg viewBox="0 0 200 200" className="w-full max-w-[300px] mx-auto filter drop-shadow-md">
     <defs>
      <linearGradient id="stepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    {/* Main body */}
    <path d="M40 160 L160 160 L160 100 L40 130 Z" fill="url(#stepGrad)" stroke="#4f46e5" strokeWidth="2" />
    <path d="M160 100 L120 60 L20 90 L40 130" fill="url(#stepGrad)" stroke="#4f46e5" strokeWidth="2" />
    {/* Hidden edges */}
    <path d="M120 60 L120 120 L20 150 L20 90" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4" />
    
    <text x="165" y="165" className="text-[10px] font-bold fill-indigo-800">A</text>
    <text x="165" y="95" className="text-[10px] font-bold fill-indigo-800">B</text>
    <text x="35" y="170" className="text-[10px] font-bold fill-indigo-800">C</text>
    <text x="35" y="130" className="text-[10px] font-bold fill-indigo-800">D</text>
    <text x="125" y="60" className="text-[10px] font-bold fill-indigo-800">E</text>
    <text x="15" y="90" className="text-[10px] font-bold fill-indigo-800">F</text>
  </svg>
);

const QuizGame = ({ questions, onFinish }: { questions: typeof QUESTIONS; onFinish: (result: Omit<QuizResult, 'userName'>) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime] = useState(Date.now());

  const currentQuestion = questions[currentIndex];

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
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setTimeLeft(20);
      } else {
        onFinish({
          score: score + (isCorrect ? (timeLeft * 10) + 100 : 0),
          totalQuestions: questions.length,
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
          Câu {currentIndex + 1} / {questions.length}
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
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
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
            <div className="mb-6">
              <div className="text-[10px] font-bold text-gray-400 uppercase mb-2">Dữ liệu bài toán:</div>
              <div className="text-gray-600 italic p-4 bg-indigo-50/50 rounded-xl border-l-4 border-indigo-300">
                {currentQuestion.context}
              </div>
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

const ResultScreen = ({ result, onRestart, onShowLeaderboard }: { result: QuizResult, onRestart: () => void, onShowLeaderboard: () => void }) => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            id="restart-quiz-btn"
            onClick={onRestart}
            className="py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Làm lại
          </button>
          <button 
            id="result-leaderboard-btn"
            onClick={onShowLeaderboard}
            className="py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5 text-yellow-500" />
            Xếp hạng
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [gameState, setGameState] = useState<'intro' | 'register' | 'gate' | 'playing' | 'result'>('intro');
  const [userName, setUserName] = useState('');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof QUESTIONS>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const startQuiz = () => {
    setGameState('register');
  };

  const handleRegistration = (name: string) => {
    setUserName(name);
    setGameState('gate');
  };

  const handleGateChoice = (choice: 'math' | 'crush') => {
    if (choice === 'math') {
      // Fisher-Yates shuffle
      const newQuestions = [...QUESTIONS];
      for (let i = newQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newQuestions[i], newQuestions[j]] = [newQuestions[j], newQuestions[i]];
      }
      setShuffledQuestions(newQuestions);
      setGameState('playing');
      setQuizResult(null);
    } else {
      // "Exit" effect
      window.location.href = "about:blank";
    }
  };

  const finishQuiz = async (result: Omit<QuizResult, 'userName'>) => {
    const finalResult = {
      ...result,
      userName,
    } as QuizResult;

    setQuizResult(finalResult);
    setGameState('result');
    
    // Save to Firebase
    setIsSaving(true);
    try {
      await addDoc(collection(db, 'quizResults'), {
        ...finalResult,
        createdAt: serverTimestamp(),
      });
      console.log('Result saved successfully');
    } catch (e) {
      console.error('Error saving result:', e);
    } finally {
      setIsSaving(false);
    }
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
              <IntroScreen onStart={startQuiz} onShowLeaderboard={() => setShowLeaderboard(true)} />
            </motion.div>
          )}
          {gameState === 'register' && (
            <motion.div 
              key="register"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <RegistrationScreen onComplete={handleRegistration} />
            </motion.div>
          )}
          {gameState === 'gate' && (
            <motion.div 
              key="gate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <MathVsCrushGate onChoice={handleGateChoice} />
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
              <QuizGame questions={shuffledQuestions} onFinish={finishQuiz} />
            </motion.div>
          )}
          {gameState === 'result' && quizResult && (
            <motion.div 
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full relative"
            >
              {isSaving && (
                <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-bold text-indigo-500 bg-white px-3 py-1 rounded-full shadow-sm border border-indigo-100">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
                  Đang sao lưu dữ liệu...
                </div>
              )}
              <ResultScreen 
                result={quizResult} 
                onRestart={() => setGameState('intro')} 
                onShowLeaderboard={() => setShowLeaderboard(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showLeaderboard && (
            <Leaderboard onClose={() => setShowLeaderboard(false)} />
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

