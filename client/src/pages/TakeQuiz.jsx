import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  HelpCircle, 
  Send, 
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { API_BASE } from '../api';
import axios from 'axios';

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null); // { quiz, submission }
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/quizzes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setData(res.data);
      if (res.data.submission) {
        setSubmittedResponse(res.data.submission);
      } else {
        // Initialize answers array if no previous submission
        setAnswers(new Array(res.data.quiz.questions.length).fill(null).map((_, i) => ({
          questionId: res.data.quiz.questions[i]._id,
          selectedOption: ''
        })));
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching quiz:', err);
      setLoading(false);
    }
  };

  const handleOptionSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex].selectedOption = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!window.confirm('Are you sure you want to submit? You cannot change your answers later.')) return;
    
    try {
      setIsSubmitting(true);
      const res = await axios.post(`${API_BASE}/api/quizzes/${id}/submit`, { answers }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSubmittedResponse(res.data);
      setIsSubmitting(false);
    } catch (err) {
      console.error('Error submitting quiz:', err);
      alert(err.response?.data?.error || 'Failed to submit quiz');
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-slate-400 animate-pulse uppercase tracking-widest italic">Authenticating Secure Assessment Session...</div>;

  const quiz = data?.quiz;

  if (submittedResponse) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 py-12">
        <div className="bg-white rounded-[3rem] p-12 text-center shadow-2xl shadow-slate-200 border border-slate-50 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
           <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner boreder-4 border-white animate-bounce">
              <CheckCircle2 size={48} />
           </div>
           <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-4">Submission <span className="text-emerald-500">Confirmed</span></h1>
           <p className="text-slate-500 font-medium mb-10 max-w-md mx-auto">Your responses have been successfully logged in the central database. Here is your preliminary performance report.</p>
           
           <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Your Score</p>
                <p className="text-4xl font-black text-slate-900">{submittedResponse.score} <span className="text-sm text-slate-400">/ {submittedResponse.maxScore}</span></p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Accuracy</p>
                <p className="text-4xl font-black text-slate-900">{Math.round((submittedResponse.score / submittedResponse.maxScore) * 100)}%</p>
              </div>
           </div>

           <button 
             onClick={() => navigate('/students')}
             className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/20 transition-all hover:-translate-y-1 active:scale-95">
             Return to Dashboard
           </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Quiz Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <button 
             onClick={() => navigate('/students')}
             className="flex items-center gap-2 text-slate-400 hover:text-primary-600 font-bold mb-4 transition-colors group">
             <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
             Exit Assessment
           </button>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase"><span className="text-primary-600">Secure</span> {quiz.title}</h1>
           <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <Clock size={12} /> Live Assessment
              </span>
              <span className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck size={12} /> Proctoring Active
              </span>
           </div>
        </div>
        <div className="flex flex-col items-end">
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Question {currentQuestionIndex + 1} of {quiz.questions.length}</div>
           <div className="w-48 h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-50">
              <div 
                className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
           </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-slate-200 border border-slate-50 relative overflow-hidden min-h-[500px] flex flex-col justify-between">
        {/* Large Index Decoration */}
        <div className="absolute -top-12 -right-12 text-[12rem] font-black text-slate-50 select-none opacity-50 italic">
           {currentQuestionIndex + 1}
        </div>

        <div className="relative z-10">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
             <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 leading-tight mb-12 tracking-tight">{currentQuestion.questionText}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className={`group relative p-6 text-left rounded-[1.5rem] border-2 transition-all duration-300 flex items-center gap-4 ${
                    answers[currentQuestionIndex].selectedOption === option
                    ? 'bg-primary-50 border-primary-500 shadow-lg shadow-primary-500/10 -translate-y-1'
                    : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    answers[currentQuestionIndex].selectedOption === option
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`font-bold text-sm tracking-tight transition-colors ${
                    answers[currentQuestionIndex].selectedOption === option ? 'text-primary-700' : 'text-slate-600'
                  }`}>
                    {option}
                  </span>
                  {answers[currentQuestionIndex].selectedOption === option && (
                    <div className="ml-auto text-primary-600 animate-in zoom-in duration-300">
                      <CheckCircle2 size={24} />
                    </div>
                  )}
                </button>
             ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-16 pt-8 border-t border-slate-50">
           <button
             disabled={currentQuestionIndex === 0}
             onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
               currentQuestionIndex === 0 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
             }`}
           >
             <ChevronLeft size={18} /> Previous
           </button>

           {currentQuestionIndex === quiz.questions.length - 1 ? (
             <button
               onClick={handleSubmit}
               disabled={isSubmitting || answers.some(a => a.selectedOption === '')}
               className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 ${
                 answers.some(a => a.selectedOption === '') 
                 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                 : 'bg-emerald-600 text-white shadow-emerald-500/20 hover:bg-emerald-700 hover:-translate-y-1'
               }`}
             >
               {isSubmitting ? 'Finalizing...' : 'Submit Assessment'} <Send size={18} />
             </button>
           ) : (
             <button
               onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
               className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 hover:bg-primary-600 hover:shadow-primary-500/20 transition-all hover:-translate-y-1 active:scale-95"
             >
               Next Question <ChevronRight size={18} />
             </button>
           )}
        </div>
      </div>

      {/* Answer map (Quick Jump) */}
      <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-100 border border-slate-50 flex flex-wrap gap-3 justify-center">
         {answers.map((ans, idx) => (
            <button
               key={idx}
               onClick={() => setCurrentQuestionIndex(idx)}
               className={`w-10 h-10 rounded-xl font-bold text-xs transition-all border-2 ${
                 currentQuestionIndex === idx 
                 ? 'bg-primary-600 border-primary-600 text-white shadow-lg scale-110'
                 : ans.selectedOption !== ''
                 ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                 : 'bg-white border-slate-100 text-slate-300 hover:border-slate-300'
               }`}
            >
               {idx + 1}
            </button>
         ))}
      </div>
    </div>
  );
}
