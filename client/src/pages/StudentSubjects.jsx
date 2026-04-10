import React from 'react';
import { BookOpen, Book, CheckSquare, Download, FolderOpen } from 'lucide-react';

export default function StudentSubjects() {
  const subjects = [
    { name: 'Cloud Computing & Virtualization', code: 'CS301', credits: 4, faculty: 'Dr. Sarah Wilson', syllabus: 75 },
    { name: 'Machine Learning Operations (MLOps)', code: 'CS302', credits: 4, faculty: 'Prof. Michael Chen', syllabus: 60 },
    { name: 'Digital Marketing & Analytics', code: 'MG102', credits: 3, faculty: 'Dr. Emily Brown', syllabus: 90 },
    { name: 'Cyber Security & Ethical Hacking', code: 'CS305', credits: 4, faculty: 'Prof. James Lee', syllabus: 45 },
    { name: 'Internet of Things (IoT)', code: 'EC401', credits: 3, faculty: 'Dr. Robert Garcia', syllabus: 80 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 group-hover:bg-orange-100 transition-colors duration-700"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-xs font-black uppercase tracking-widest">
              Academic Curriculum
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Enrolled Subjects</h1>
            <p className="text-slate-500 font-medium max-w-md">Track your syllabus status, required credits, and resource materials for the current semester.</p>
          </div>
          <div className="flex gap-4">
             <button className="bg-slate-900 text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-xl flex items-center gap-2 hover:bg-black transition-all active:scale-95">
                <Download size={20} />
                Download Syllabus
             </button>
             <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-[1.5rem] font-bold shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-all active:scale-95">
                <FolderOpen size={20} />
                Resources
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((sub, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transform hover:-translate-y-2 transition-all duration-300 relative group">
             <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                  <Book size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-3 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-500">{sub.code}</span>
             </div>
             <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{sub.name}</h3>
             <p className="text-sm font-bold text-slate-400 mb-6 flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
               {sub.faculty}
             </p>
             
             <div className="space-y-2 mb-6">
               <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">
                  <span>Syllabus Status</span>
                  <span>{sub.syllabus}%</span>
               </div>
               <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-900 group-hover:bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${sub.syllabus}%` }}></div>
               </div>
             </div>

             <div className="pt-6 border-t border-slate-50 flex items-center justify-between text-sm font-bold text-slate-500">
               <div className="flex items-center gap-2 uppercase text-[10px] tracking-widest text-slate-400">
                 <CheckSquare size={14} />
                 {sub.credits} Credits
               </div>
               <button className="text-blue-600 font-black flex items-center gap-1 group/btn hover:underline decoration-2 underline-offset-4">
                  Detail Syllabus
               </button>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 flex flex-col lg:flex-row items-center gap-10 overflow-hidden relative group">
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[100px]"></div>
          <div className="flex-1 space-y-4 relative z-10">
            <h3 className="text-3xl font-black tracking-tight flex items-center gap-4">
              <BookOpen size={36} className="text-blue-400" />
              Academic Tracker
            </h3>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">Your elective selection phase begins next week. Prepare your subject preferences to ensure alignment with your AI-driven career pathing.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-2xl relative z-10 active:scale-95">Set Elective Preferences</button>
      </div>
    </div>
  );
}
