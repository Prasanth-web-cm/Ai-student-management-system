import React from 'react';
import { Calendar, CheckCircle, XCircle, Search, Save, AlertCircle, Users } from 'lucide-react';
import axios from 'axios';
import { API_BASE } from '../api';
import { useAuth } from '../context/AuthContext';

export default function MarkAttendance() {
  const { user } = useAuth();
  const [students, setStudents] = React.useState([]);
  const [attendance, setAttendance] = React.useState({}); // { studentId: 'Present' | 'Absent' }
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/counsellors/assigned-students`);
      setStudents(res.data);
      const initial = {};
      res.data.forEach(s => initial[s._id] = 'Present');
      setAttendance(initial);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (sid, status) => {
    setAttendance(prev => ({ ...prev, [sid]: status }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const attendanceData = Object.keys(attendance).map(sid => ({
        studentId: sid,
        date,
        status: attendance[sid]
      }));
      await axios.post(`${API_BASE}/api/counsellors/attendance/bulk`, { attendanceData });
      alert('Attendance marked successfully!');
    } catch (err) {
      console.error('Error marking attendance:', err);
      alert('Failed to mark attendance.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 group-hover:bg-blue-100 transition-colors duration-700"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
              Daily Engagement Tracking
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mark Attendance</h1>
            <p className="text-slate-500 font-medium max-w-md">Record daily participation for your assigned mentees to ensure high predictive accuracy.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
             <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-3xl border border-slate-100 shadow-sm">
                <Calendar className="text-blue-600" size={24} />
                <input 
                  type="date" 
                  className="bg-transparent font-black text-slate-800 outline-none cursor-pointer"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Session Date</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between gap-8">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{Object.values(attendance).filter(v => v === 'Present').length} Present</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{Object.values(attendance).filter(v => v === 'Absent').length} Absent</span>
           </div>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-blue-200 flex items-center gap-3 transition-all active:scale-95"
        >
          {submitting ? 'Processing...' : <><Save size={20} /> Post Attendance</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-64 bg-white rounded-[2.5rem] animate-pulse"></div>)
        ) : students.length > 0 ? (
          students.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 group relative">
               <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl group-hover:scale-105 transition-transform">
                     <img src={`https://ui-avatars.com/api/?name=${s.name}&background=random&bold=true`} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 line-clamp-1">{s.name}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.studentId}</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-3 mb-4">
                  <button 
                    onClick={() => handleStatusChange(s._id, 'Present')}
                    className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                      attendance[s._id] === 'Present' 
                        ? 'bg-green-500 text-white shadow-lg shadow-green-200' 
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle size={16} /> Present
                  </button>
                  <button 
                    onClick={() => handleStatusChange(s._id, 'Absent')}
                    className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                      attendance[s._id] === 'Absent' 
                        ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <XCircle size={16} /> Absent
                  </button>
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black justify-center mt-2">
                 <AlertCircle size={14} className="text-slate-300" />
                 <span className="text-slate-400 uppercase tracking-widest">Marking affects predictive score</span>
               </div>
            </div>
          ))
        ) : (
          <div className="lg:col-span-3 bg-white p-20 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center space-y-4">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400"><Users size={40} /></div>
             <p className="text-xl font-black text-slate-900">Wait! No Student Assets Identified</p>
             <p className="text-slate-500 font-medium">Verify your assigned student list in the configuration hub.</p>
          </div>
        )}
      </div>
    </div>
  );
}
