import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Trophy,
  History
} from 'lucide-react';
import { API_BASE } from '../api';
import axios from 'axios';

export default function StudentQuizzes() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/quizzes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setQuizzes(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching quizzes:', err);
      setLoading(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-slate-400 animate-pulse uppercase tracking-[0.2em]">Syncing Assessment Database...</div>;

  const activeQuizzes = quizzes.filter(q => q.status === 'active');
  const closedQuizzes = quizzes.filter(q => q.status === 'closed');

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Hero Header */}
      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 opacity-5 blur-[100px] group-hover:opacity-10 transition-opacity"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
               <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-none mb-4">
                 Forms & <span className="text-primary-500">Assessments</span>
               </h1>
               <p className="text-slate-400 font-medium max-w-md">Participate in active quizzes, exams, and surveys to track your academic progress.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] flex items-center gap-6">
               <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active</p>
                 <p className="text-3xl font-black text-white">{activeQuizzes.length}</p>
               </div>
               <div className="w-px h-10 bg-white/10"></div>
               <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Closed</p>
                 <p className="text-3xl font-black text-slate-400">{closedQuizzes.length}</p>
               </div>
            </div>
         </div>
      </div>

      {/* Active Quizzes Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
           <div className="w-1.5 h-8 bg-primary-600 rounded-full"></div>
           <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Active Assessments</h2>
        </div>

        {activeQuizzes.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-12 text-center border-2 border-dashed border-slate-100 shadow-sm">
             <AlertCircle size={40} className="mx-auto text-slate-200 mb-4" />
             <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active assessments at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeQuizzes.map(quiz => (
              <div key={quiz._id} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-100 border border-slate-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                 <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                    <ClipboardList size={28} />
                 </div>
                 <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight line-clamp-1 mb-2">{quiz.title}</h3>
                 <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <History size={12} /> {quiz.questions.length} Items • New
                 </p>
                 <p className="text-slate-500 text-sm line-clamp-2 mb-8 min-h-[2.5rem]">{quiz.description || 'Global assessment module.'}</p>
                 
                 <button 
                  onClick={() => navigate(`/quizzes/${quiz._id}`)}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-primary-600 transition-all group/btn">
                  Start Now <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                 </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* History / Closed Section */}
      <section className="space-y-6 opacity-60">
        <div className="flex items-center gap-3">
           <div className="w-1.5 h-8 bg-slate-300 rounded-full"></div>
           <h2 className="text-2xl font-black text-slate-500 uppercase tracking-tight">Past Assessments</h2>
        </div>

        {closedQuizzes.length === 0 ? (
          <div className="bg-white/50 rounded-[2.5rem] p-12 text-center border-2 border-dashed border-slate-100 italic">
             <p className="text-slate-300 font-bold uppercase tracking-widest text-[10px]">Your history is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {closedQuizzes.map(quiz => (
              <div key={quiz._id} className="bg-slate-50/50 rounded-[2.5rem] p-8 border border-slate-100 grayscale hover:grayscale-0 transition-all duration-700">
                 <h3 className="text-lg font-black text-slate-400 uppercase tracking-tight line-clamp-1 mb-2">{quiz.title}</h3>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-2 mb-6">
                    <CheckCircle2 size={12} /> Status: Closed
                 </span>
                 <button 
                  disabled
                  className="w-full py-4 rounded-2xl bg-slate-200 text-slate-400 font-black text-xs uppercase tracking-[0.2em] cursor-not-allowed">
                  Completed
                 </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
