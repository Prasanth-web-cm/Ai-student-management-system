import React from 'react';
import { Download, CheckCircle, FileText, AlertCircle, User, Bot, Sparkles } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PerformancePredictor from '../components/PerformancePredictor';
import Chatbot from '../components/student/Chatbot';
import AttendanceHeatmap from '../components/analytics/AttendanceHeatmap';
import { API_BASE } from '../api';
import axios from 'axios';

export default function StudentDashboard() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [student, setStudent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const studentId = id || (currentUser && currentUser._id);

  React.useEffect(() => {
    const initializeDashboard = async () => {
      if (id) {
        await fetchStudentDetails(id);
      } else if (currentUser && (currentUser.role === 'student' || currentUser.studentId)) {
        setStudent(currentUser);
        setLoading(false);
      } else {
        console.warn('Dashboard initialization failed: No ID or valid current user', { id, currentUser });
        setLoading(false);
      }
    };
    initializeDashboard();
  }, [id, currentUser]);

  const fetchStudentDetails = async (sid) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/students/${sid}`);
      setStudent(res.data);
    } catch (err) {
      console.error('Error fetching student details:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDFReport = () => {
    if (!studentId) return;
    window.location.href = `${API_BASE}/api/ml/report/${studentId}`;
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-slate-400 font-bold animate-pulse">Syncing AI profile data...</div>;
  if (!student) return <div className="flex items-center justify-center min-h-screen text-red-500 font-bold">Student records not located</div>;

  const riskColor = student.academicRisk === 'Red' ? 'text-red-600 bg-red-50' : 
                   student.academicRisk === 'Yellow' ? 'text-amber-600 bg-amber-50' : 
                   'text-emerald-600 bg-emerald-50';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Dynamic Profile Header */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-100/50 border border-slate-50 relative overflow-hidden group">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 w-full">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <img 
                  src={student?.photoUrl ? `${API_BASE}${student.photoUrl}` : `https://ui-avatars.com/api/?name=${student?.name || 'User'}&background=random`} 
                  alt={student?.name || 'Student'} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className={`absolute -bottom-2 -right-2 p-3 rounded-2xl shadow-lg border-4 border-white ${riskColor}`}>
                <User size={20} />
              </div>
            </div>
            
            <div className="text-center md:text-left space-y-2">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-2">
                <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest">{student?.dept || 'N/A'} Dept</span>
                <span className={`px-4 py-1.5 rounded-full ${riskColor} text-xs font-black uppercase tracking-widest`}>{student?.academicRisk || 'Green'} Risk Profile</span>
              </div>
              <h1 className="text-4xl font-[900] text-slate-900 tracking-tight flex items-center gap-3">
                {student?.name || 'Unknown Student'}
                <Sparkles className="text-blue-500 animate-pulse" size={24} />
              </h1>
              <p className="text-slate-400 font-mono font-bold tracking-widest uppercase">{student?.studentId || 'ID PENDING'}</p>
            </div>
          </div>

          <button 
            onClick={downloadPDFReport}
            className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-[1.5rem] font-bold flex items-center gap-3 transition-all shadow-xl shadow-slate-200 active:scale-95 group"
          >
            <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
            Download AI Insight Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance Summary */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-green-50 rounded-xl"><CheckCircle className="text-green-500 w-6 h-6" /></div>
              Attendance Metrics
            </h3>
          </div>
          <div className="flex items-end gap-3 px-2">
            <div className="text-7xl font-black text-slate-800 tracking-tighter">85<span className="text-3xl text-slate-300 font-medium tracking-normal">%</span></div>
            <p className="text-slate-500 pb-3 font-bold uppercase text-xs tracking-widest">Overall engagement</p>
          </div>
          <div className="w-full bg-slate-100 h-6 rounded-2xl mt-8 overflow-hidden shadow-inner p-1">
            <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-xl w-[85%] shadow-sm"></div>
          </div>
        </div>

        {/* AI Performance Predictor */}
        <PerformancePredictor studentId={studentId} />

        {/* Heatmap Section */}
        <div className="lg:col-span-1">
          <AttendanceHeatmap studentId={studentId} />
        </div>

        {/* Recent Performance Details */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-blue-50 rounded-xl"><FileText className="text-blue-500 w-6 h-6" /></div>
              Academic Insights
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-5 bg-slate-50 rounded-[1.5rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border-2 border-transparent hover:border-blue-100 group">
              <div>
                <p className="font-black text-slate-800">Data Structures</p>
                <div className="flex gap-2 items-center mt-1">
                  <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">MIDTERM</span>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Graded Mar 15</p>
                </div>
              </div>
              <div className="text-2xl font-black text-blue-600 bg-blue-50 px-5 py-2 rounded-2xl group-hover:scale-110 transition-transform">88/100</div>
            </div>
            <div className="flex justify-between items-center p-5 bg-slate-50 rounded-[1.5rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border-2 border-transparent hover:border-blue-100 group">
              <div>
                <p className="font-black text-slate-800">Database Systems</p>
                <div className="flex gap-2 items-center mt-1">
                  <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">MIDTERM</span>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Graded Mar 12</p>
                </div>
              </div>
              <div className="text-2xl font-black text-blue-600 bg-blue-50 px-5 py-2 rounded-2xl group-hover:scale-110 transition-transform">92/100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}
