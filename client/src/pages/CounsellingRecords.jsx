import React from 'react';
import { ClipboardList, Plus, Search, Calendar, User, FileText, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CounsellingRecords() {
  const { user } = useAuth();
  const [records, setRecords] = React.useState([
    { date: 'Apr 05, 2026', student: 'Prasanth J', studentId: '23CS101', notes: 'Discussed academic pressure and time management.', risk: 'Yellow', score: 45 },
    { date: 'Apr 04, 2026', student: 'Alice Smith', studentId: '23CS105', notes: 'High engagement. Suggested advanced internship opportunities.', risk: 'Green', score: 10 },
    { date: 'Apr 03, 2026', student: 'Bob Johnson', studentId: '23CS112', notes: 'Critical intervention needed for attendance.', risk: 'Red', score: 82 },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-900/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 group-hover:bg-slate-900/10 transition-colors duration-700"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
              Consultation Archives
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Counselling History</h1>
            <p className="text-slate-500 font-medium max-w-md">Comprehensive audit trail of all student interactions, behavioral insights, and intervention strategies.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[1.5rem] font-bold shadow-2xl shadow-blue-200 flex items-center gap-3 transition-all active:scale-95 group">
             <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
             <span className="text-lg">New Entry</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="relative flex-1 w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by student or date..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-slate-900 rounded-2xl outline-none transition-all font-medium text-slate-700"
          />
        </div>
        <div className="flex gap-3">
           <button className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95">
             Monthly View
           </button>
           <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
             Export CSV
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Consultation Date</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Identity</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Behavioral Insights</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Risk Profile</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Scale</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {records.map((r, i) => (
                <tr key={i} className="group hover:bg-slate-50 transition-colors duration-300">
                  <td className="p-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Calendar size={18} />
                      </div>
                      <span className="font-bold text-slate-800">{r.date}</span>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shadow-sm">
                        <img src={`https://ui-avatars.com/api/?name=${r.student}&background=random`} alt={r.student} />
                      </div>
                      <div>
                        <p className="font-black text-slate-800 leading-none mb-1">{r.student}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{r.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-start gap-2 max-w-xs">
                      <FileText size={16} className="text-slate-300 mt-1 shrink-0" />
                      <p className="text-xs font-bold text-slate-500 italic leading-relaxed group-hover:text-slate-700 transition-colors">"{r.notes}"</p>
                    </div>
                  </td>
                  <td className="p-8">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      r.risk === 'Red' ? 'bg-red-50 text-red-600' : 
                      r.risk === 'Yellow' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {r.risk} Risk Profile
                    </span>
                  </td>
                  <td className="p-8 text-center">
                    <p className={`text-2xl font-black ${
                      r.risk === 'Red' ? 'text-red-600' : 
                      r.risk === 'Yellow' ? 'text-amber-600' : 'text-green-600'
                    }`}>
                       {r.score}/100
                    </p>
                  </td>
                  <td className="p-8">
                     <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all active:scale-95 shadow-sm">
                        <ChevronRight size={18} />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group shadow-2xl">
         <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-1/4 -translate-y-1/4 group-hover:translate-x-0 transition-transform duration-700"><ClipboardList size={220} className="text-white" /></div>
         <h3 className="text-3xl font-black text-white tracking-tight">Need to generate a session report?</h3>
         <p className="text-slate-400 font-medium max-w-2xl leading-relaxed">Select multiple entries above or click the button below to generate a comprehensive departmental PDF report for recent interventions.</p>
         <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-lg transition-all hover:bg-blue-50 active:scale-95 shadow-2xl shadow-blue-500/20">Generate PDF Document</button>
      </div>
    </div>
  );
}
