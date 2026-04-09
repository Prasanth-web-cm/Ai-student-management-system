import React from 'react';
import { Link } from 'react-router-dom';
import { User, ShieldCheck, HeartPulse, GraduationCap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8 fade-in">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-50 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3 group-hover:bg-blue-100/50 transition-colors duration-700"></div>
        <div className="z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Advanced Academic Monitoring
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
            Empowering the <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Next Generation</span> of Success
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">
            The complete AI-Powered Student Management System. Seamlessly tracking attendance, academic risk, and overall progress with intelligent insights.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95">
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <div className="hidden lg:block z-10 relative">
          <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] -rotate-3 -z-10 bg-slate-100"></div>
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400" 
            alt="Students" 
            className="rounded-[2.5rem] shadow-2xl h-64 w-80 object-cover rotate-3 hover:rotate-0 transition-transform duration-700" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/login" className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/5 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
            <GraduationCap size={80} />
          </div>
          <div className="w-14 h-14 bg-blue-50 text-blue-600 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
             <User size={28} />
          </div>
          <h3 className="text-2xl font-black mb-3 text-slate-900">Student Portal</h3>
          <p className="text-slate-500 font-medium mb-6">Access your AI analytics, attendance, marks, and academic assistant.</p>
          <div className="text-blue-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
            Login Now <ArrowRight size={18} />
          </div>
        </Link>
        
        <Link to="/counsellor/login" className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
            <HeartPulse size={80} />
          </div>
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
             <HeartPulse size={28} />
          </div>
          <h3 className="text-2xl font-black mb-3 text-slate-900">Counsellor Portal</h3>
          <p className="text-slate-500 font-medium mb-6">Monitor student progress, manage session records, and assess academic risk.</p>
          <div className="text-indigo-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
            Login Now <ArrowRight size={18} />
          </div>
        </Link>
        
        <Link to="/admin/login" className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-500/5 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
            <ShieldCheck size={80} />
          </div>
          <div className="w-14 h-14 bg-slate-50 text-slate-600 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
             <ShieldCheck size={28} />
          </div>
          <h3 className="text-2xl font-black mb-3 text-slate-900">Administration</h3>
          <p className="text-slate-500 font-medium mb-6">Complete control over institution data, staff management, and global reports.</p>
          <div className="text-slate-900 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
            Login Now <ArrowRight size={18} />
          </div>
        </Link>
      </div>
    </div>
  );
}
