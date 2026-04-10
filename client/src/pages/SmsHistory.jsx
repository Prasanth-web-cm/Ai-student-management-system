import React from 'react';
import { MessageSquare, Search, Filter, Calendar, User, Phone, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import { API_BASE } from '../api';

export default function SmsHistory() {
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchSmsHistory();
  }, []);

  const fetchSmsHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/sms/history`);
      setLogs(res.data);
    } catch (err) {
      console.error('Error fetching SMS history:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-900/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 group-hover:bg-slate-900/10 transition-colors duration-700"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
              Communication Traceability
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">SMS Alert History</h1>
            <p className="text-slate-500 font-medium max-w-md">Detailed record of academic risk notifications sent to parents for accountability and monitoring.</p>
          </div>
          <div className="bg-blue-600 text-white p-8 rounded-[2rem] shadow-2xl shadow-blue-200 group hover:scale-105 transition-transform duration-500">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl"><MessageSquare size={32} /></div>
                <div>
                   <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest">Total Alerts Sent</p>
                   <p className="text-4xl font-black">{logs.length}</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="relative flex-1 w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by student or phone..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-slate-900 rounded-2xl outline-none transition-all font-medium text-slate-700"
          />
        </div>
        <div className="flex gap-3">
           <button className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95">
             <Filter size={16} /> Filter Logs
           </button>
           <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
             Download Log Book
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Recipient (Parent)</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Linked</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Risk Profile</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Message Payload</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan="6" className="p-10 text-center text-slate-400 font-bold animate-pulse">Syncing SMS server history...</td></tr>
              ) : logs.length > 0 ? (
                logs.map((l, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors duration-300">
                    <td className="p-8 text-xs font-black text-slate-500 font-mono tracking-tight">{new Date(l.sentAt).toLocaleString()}</td>
                    <td className="p-8">
                       <div className="flex items-center gap-2 font-bold text-slate-700">
                          <Phone size={14} className="text-slate-300" />
                          {l.parentPhone}
                       </div>
                    </td>
                    <td className="p-8">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                            <img src={`https://ui-avatars.com/api/?name=${l.studentId?.name || 'User'}&background=random`} alt="Student" />
                         </div>
                         <div>
                            <p className="text-xs font-black text-slate-800 leading-none">{l.studentId?.name || 'N/A'}</p>
                            <p className="text-[10px] font-black text-slate-400">{l.studentId?.studentId || 'N/A'}</p>
                         </div>
                      </div>
                    </td>
                    <td className="p-8">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          l.riskLevel === 'Red' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                       }`}>
                          {l.riskLevel} Risk Alert
                       </span>
                    </td>
                    <td className="p-8">
                       <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed italic truncate group-hover:whitespace-normal group-hover:text-slate-700 transition-all cursor-help">{l.message}</p>
                    </td>
                    <td className="p-8 text-center uppercase text-[10px] font-black tracking-widest">
                       <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${l.status === 'Sent' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {l.status === 'Sent' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                          {l.status}
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="p-20 text-center text-slate-400 font-bold italic">No alert history generated yet. System monitoring in progress.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
