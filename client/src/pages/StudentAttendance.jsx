import React from 'react';
import { Calendar, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import AttendanceHeatmap from '../components/analytics/AttendanceHeatmap';
import { useAuth } from '../context/AuthContext';

export default function StudentAttendance() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 group-hover:bg-green-100 transition-colors duration-700"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 text-xs font-black uppercase tracking-widest">
              Live Engagement Tracking
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Attendance Dashboard</h1>
            <p className="text-slate-500 font-medium max-w-md">Detailed breakdown of your academic engagement and participation across all sessions.</p>
          </div>
          <div className="flex items-end gap-3 bg-white p-6 rounded-3xl shadow-xl shadow-slate-100 border border-slate-50 transform hover:scale-105 transition-transform duration-500">
            <div className="text-6xl font-black text-slate-900 tracking-tighter">88<span className="text-2xl text-slate-300">%</span></div>
            <div className="pb-2">
              <p className="text-xs font-black text-green-600 uppercase tracking-widest">Status</p>
              <p className="text-sm font-bold text-slate-400">Above Threshold</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AttendanceHeatmap studentId={user?._id} />
          
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl"><Clock className="text-blue-500" /></div>
              Detailed Log
            </h3>
            <div className="space-y-4">
              {[
                { date: 'Apr 07, 2026', subject: 'Cloud Computing', status: 'Present', time: '09:00 AM' },
                { date: 'Apr 06, 2026', subject: 'ML Operations', status: 'Present', time: '11:15 AM' },
                { date: 'Apr 05, 2026', subject: 'Digital Marketing', status: 'Absent', time: '02:00 PM' },
                { date: 'Apr 04, 2026', subject: 'Cyber Security', status: 'Present', time: '10:00 AM' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${log.status === 'Present' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {log.status === 'Present' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{log.subject}</p>
                      <p className="text-xs text-slate-400 font-bold">{log.date} @ {log.time}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${log.status === 'Present' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><TrendingUp size={120} /></div>
            <h3 className="text-xl font-bold mb-6">Subject Breakdown</h3>
            <div className="space-y-6 relative z-10">
              {[
                { name: 'Cloud Computing', percent: 92 },
                { name: 'ML Operations', percent: 85 },
                { name: 'Cyber Security', percent: 78 },
                { name: 'Data Visualization', percent: 95 },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold opacity-70">{item.name}</span>
                    <span className="font-black">{item.percent}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
             <h3 className="text-xl font-black mb-6">Recommendations</h3>
             <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 mb-4">
               <p className="text-blue-700 text-sm font-bold">Maintain this streak! Your consistency is helping your predictive score stay 'Safe'.</p>
             </div>
             <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
               <p className="text-orange-700 text-sm font-bold">Your attendance in Cyber Security is dipping. Extra 2 classes needed to reach 80%.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
