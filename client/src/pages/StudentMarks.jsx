import React from 'react';
import { BarChart3, TrendingUp, Trophy, FileText, ChevronRight } from 'lucide-react';
import PerformancePredictor from '../components/PerformancePredictor';
import { useAuth } from '../context/AuthContext';

export default function StudentMarks() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 group-hover:bg-blue-100 transition-colors duration-700"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest">
              Performance Index
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Academic Results</h1>
            <p className="text-slate-500 font-medium max-w-md">Comprehensive view of your internal assessments, midterms, and project scores.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Average CGPA</p>
              <p className="text-4xl font-black text-blue-600 tracking-tighter">8.42</p>
            </div>
            <div className="w-px h-12 bg-slate-100"></div>
            <div className="text-center">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Credits</p>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">124</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PerformancePredictor studentId={user?._id} />
          
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-100">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-2xl"><FileText className="text-blue-600 w-6 h-6" /></div>
                Subject-wise Breakdown
              </h3>
              <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                Download Full Report <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { subject: 'Data Structures', midterm: 88, internal: 92, status: 'Distinction' },
                { subject: 'Operating Systems', midterm: 76, internal: 85, status: 'First Class' },
                { subject: 'Cloud Computing', midterm: 92, internal: 95, status: 'Outstanding' },
                { subject: 'Database Systems', midterm: 82, internal: 88, status: 'First Class' },
              ].map((m, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl hover:shadow-blue-50/50 transition-all group">
                   <div className="flex justify-between items-start mb-4">
                     <p className="font-black text-slate-800 leading-tight">{m.subject}</p>
                     <span className="text-[10px] font-black uppercase bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{m.status}</span>
                   </div>
                   <div className="flex gap-4">
                     <div>
                       <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Midterm</p>
                       <p className="text-xl font-black text-slate-900 tracking-tighter">{m.midterm}/100</p>
                     </div>
                     <div className="w-px h-8 bg-slate-200 mt-2"></div>
                     <div>
                       <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Internal</p>
                       <p className="text-xl font-black text-blue-600 tracking-tighter">{m.internal}/100</p>
                     </div>
                   </div>
                   <div className="mt-4 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(m.midterm + m.internal)/2}%` }}></div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 transform rotate-12 opacity-10 group-hover:rotate-0 transition-transform duration-700"><Trophy size={140} /></div>
             <p className="text-sm font-bold opacity-70 mb-2">Class Percentile</p>
             <h3 className="text-5xl font-black tracking-tighter mb-4">Top 5<span className="text-2xl font-medium tracking-normal">%</span></h3>
             <p className="text-sm font-medium leading-relaxed opacity-90">Keep up the excellent work! Your consistent improvement is being tracked by our AI for placement priority.</p>
             <button className="mt-8 bg-white/20 hover:bg-white text-white hover:text-blue-900 px-6 py-3 rounded-2xl font-bold transition-all w-full border border-white/30 active:scale-95">View Certificate History</button>
           </div>

           <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
             <h3 className="text-xl font-black mb-8 flex items-center gap-3">
               <TrendingUp className="text-indigo-500" />
               Recent Trends
             </h3>
             <div className="space-y-6">
               <div className="flex items-center gap-4 group cursor-pointer">
                 <div className="w-2 h-12 bg-green-500 rounded-full group-hover:w-3 transition-all"></div>
                 <div>
                   <p className="font-bold text-slate-800">Programming Skills</p>
                   <p className="text-xs text-green-600 font-bold tracking-widest uppercase">+12% Improved</p>
                 </div>
               </div>
               <div className="flex items-center gap-4 group cursor-pointer">
                 <div className="w-2 h-12 bg-blue-500 rounded-full group-hover:w-3 transition-all"></div>
                 <div>
                   <p className="font-bold text-slate-800">Theoretical Concepts</p>
                   <p className="text-xs text-blue-600 font-bold tracking-widest uppercase">Consistent Performance</p>
                 </div>
               </div>
               <div className="flex items-center gap-4 group cursor-pointer">
                 <div className="w-2 h-12 bg-orange-400 rounded-full group-hover:w-3 transition-all"></div>
                 <div>
                   <p className="font-bold text-slate-800">Project Submissions</p>
                   <p className="text-xs text-orange-600 font-bold tracking-widest uppercase">-2 Weeks Pending</p>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
