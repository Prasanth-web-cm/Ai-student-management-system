import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Trophy, 
  User, 
  Clock, 
  CheckCircle2, 
  XCircle,
  BarChart3,
  Search,
  Download
} from 'lucide-react';
import { API_BASE } from '../api';
import axios from 'axios';

export default function QuizResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resultsRes, quizRes] = await Promise.all([
        axios.get(`${API_BASE}/api/quizzes/${id}/results`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        axios.get(`${API_BASE}/api/quizzes/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);
      setResults(resultsRes.data);
      setQuiz(quizRes.data.quiz);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
    }
  };

  const filteredResults = results.filter(r => 
    r.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageScore = results.length > 0 
    ? (results.reduce((acc, curr) => acc + curr.score, 0) / results.length).toFixed(1)
    : 0;

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-slate-400 animate-pulse uppercase tracking-[0.2em]">Compiling Results...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate('/admin/quizzes')}
            className="flex items-center gap-2 text-slate-500 hover:text-primary-600 font-bold mb-4 transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Quizzes
          </button>
          <h1 className="text-4xl font-[900] text-slate-900 tracking-tight flex items-center gap-4">
            Quiz <span className="text-primary-600">Performance</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Submission analytical report for: <span className="text-slate-900 font-bold uppercase tracking-tight">{quiz?.title}</span></p>
        </div>
        <button 
          className="flex items-center justify-center gap-3 bg-white border-2 border-slate-100 hover:border-primary-600 hover:text-primary-600 text-slate-600 px-8 py-4 rounded-2xl font-bold transition-all hover:-translate-y-1 active:scale-95 shadow-sm">
          <Download size={20} />
          Export Report
        </button>
      </div>

      {/* Analytics Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-100/50 border border-slate-50 relative overflow-hidden group">
           <div className="absolute -right-4 -bottom-4 text-emerald-50 opacity-10 group-hover:scale-110 transition-transform duration-700">
             <CheckCircle2 size={120} />
           </div>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Submissions</p>
           <h4 className="text-5xl font-black text-slate-900 uppercase tracking-tight">{results.length}</h4>
           <div className="mt-4 flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-wider">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Complete Dataset
           </div>
        </div>
        <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
           <div className="absolute -right-4 -bottom-4 text-primary-500 opacity-10 group-hover:scale-110 transition-transform duration-700">
             <Trophy size={120} />
           </div>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Average Score</p>
           <h4 className="text-5xl font-black text-white uppercase tracking-tight">{averageScore} <span className="text-slate-500 text-2xl">/ {quiz?.questions.length}</span></h4>
           <div className="mt-4 flex items-center gap-2 text-primary-400 text-xs font-bold uppercase tracking-wider">
             <BarChart3 size={14} /> Global Performance
           </div>
        </div>
        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-100/50 border border-slate-50 relative overflow-hidden group">
           <div className="absolute -right-4 -bottom-4 text-slate-100 opacity-20 group-hover:scale-110 transition-transform duration-700">
             <User size={120} />
           </div>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Max Questions</p>
           <h4 className="text-5xl font-black text-slate-900 uppercase tracking-tight">{quiz?.questions.length}</h4>
           <div className="mt-4 flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
             <Clock size={14} /> Total Duration: N/A
           </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-100/50 border border-slate-50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center gap-4">
           <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
             <input 
               type="text" 
               placeholder="Filter by student name..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300"
             />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-6">Student Participant</th>
                <th className="px-6 py-6">Submission Time</th>
                <th className="px-6 py-6">Performance Score</th>
                <th className="px-6 py-6">Accuracy</th>
                <th className="px-8 py-6 text-right">Detailed Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredResults.length === 0 ? (
                <tr><td colSpan="5" className="py-24 text-center text-slate-300 font-bold italic tracking-widest uppercase text-xs">No submission records found</td></tr>
              ) : (
                filteredResults.map(res => (
                  <tr key={res._id} className="hover:bg-slate-50/50 transition-all duration-300 group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm border border-slate-200">
                           {res.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{res.studentName}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Verified Entry</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                       <p className="text-sm font-bold text-slate-500 flex items-center gap-2 uppercase tracking-tighter">
                         <Clock size={14} className="text-slate-300" />
                         {new Date(res.submittedAt).toLocaleString()}
                       </p>
                    </td>
                    <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <span className={`text-xl font-black ${res.score >= (res.maxScore / 2) ? 'text-emerald-500' : 'text-red-500'} uppercase tracking-tight`}>
                             {res.score} <span className="text-xs text-slate-400">/ {res.maxScore}</span>
                          </span>
                        </div>
                    </td>
                    <td className="px-6 py-6">
                       <div className="w-full max-w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${res.score >= (res.maxScore / 2) ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.3)]'}`}
                            style={{ width: `${(res.score / res.maxScore) * 100}%` }}
                          ></div>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className="px-4 py-2 rounded-xl bg-white text-slate-500 font-bold text-[10px] uppercase tracking-widest border border-slate-100 hover:border-primary-600 hover:text-primary-600 transition-all shadow-sm">
                          Inspect Answers
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
