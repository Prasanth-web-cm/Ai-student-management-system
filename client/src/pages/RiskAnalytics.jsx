import React from 'react';
import { PieChart, TrendingUp, AlertTriangle, CheckCircle, Activity, Info } from 'lucide-react';
import AttendanceHeatmap from '../components/analytics/AttendanceHeatmap';

export default function RiskAnalytics() {
  const riskStats = [
    { label: 'High Risk (Red)', count: 4, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Moderate (Yellow)', count: 12, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Low Risk (Green)', count: 42, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 group-hover:bg-red-100 transition-colors duration-700"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest">
              AI-Driven Prediction Engine
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Risk Analytics</h1>
            <p className="text-slate-500 font-medium max-w-md">Real-time behavior monitoring and academic performance prediction for early intervention.</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-900 p-8 rounded-[2rem] shadow-2xl shadow-red-100 border border-slate-800">
             <Activity className="text-red-500 w-12 h-12 animate-pulse" />
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Confidence</p>
               <p className="text-3xl font-black text-white tracking-tighter">94.2% Accurate</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {riskStats.map((stat, i) => (
          <div key={i} className={`p-10 rounded-[2.5rem] shadow-sm border border-slate-100 ${stat.bg} transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden`}>
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><TrendingUp size={80} /></div>
            <p className={`text-6xl font-black ${stat.color} mb-4 tracking-tighter`}>{stat.count}</p>
            <p className="text-sm font-black uppercase tracking-widest text-slate-600 mb-2">{stat.label}</p>
            <p className="text-xs font-bold text-slate-400 italic">Predictive segment based on data</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
           <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
             <div className="p-3 bg-blue-50 rounded-2xl"><PieChart className="text-blue-500" /></div>
             Aggregated Heatmap
           </h3>
           <AttendanceHeatmap />
           <div className="mt-8 p-6 bg-slate-50 rounded-[2rem] flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm"><Info className="text-blue-500" /></div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed italic">This heatmap aggregates session data across all assigned students to identify common attendance "dead zones" where intervention is most needed.</p>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
             <h3 className="text-2xl font-black text-slate-900">High Risk Student Alerts</h3>
             <div className="space-y-4">
               {[
                 { name: 'Prasanth J', risk: 'Critical', trend: 'Downward', reason: 'Attendance < 65%' },
                 { name: 'Bob Johnson', risk: 'High', trend: 'Downward', reason: 'Low Midterm Score' },
                 { name: 'Sarah Lee', risk: 'Warning', trend: 'Stable', reason: 'Repeated Absences' },
               ].map((alert, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-red-50/50 transition-all group border-2 border-transparent hover:border-red-100">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><AlertTriangle size={20} /></div>
                     <div>
                       <p className="font-black text-slate-800 leading-tight">{alert.name}</p>
                       <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">{alert.risk} Risk</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{alert.reason}</p>
                     <p className="text-[10px] font-black text-slate-400">Trend: {alert.trend}</p>
                   </div>
                 </div>
               ))}
             </div>
             <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-2xl shadow-slate-200">
               Generate Global Insight Report
             </button>
           </div>

           <div className="bg-green-600 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 transform rotate-12 opacity-10 group-hover:scale-110 transition-transform duration-700"><CheckCircle size={140} /></div>
              <h3 className="text-2xl font-black mb-4">42 Students Safe</h3>
              <p className="text-green-100 font-medium leading-relaxed opacity-80">These students are consistently meeting performance thresholds. Our AI suggests rewarding their efforts through automated certifications.</p>
              <button className="mt-8 bg-white/20 hover:bg-white text-white hover:text-green-900 px-8 py-4 rounded-2xl font-black transition-all border border-white/30">Action Certification</button>
           </div>
        </div>
      </div>
    </div>
  );
}
