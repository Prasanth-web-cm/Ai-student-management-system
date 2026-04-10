import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FilePlus, 
  Database, 
  Search, 
  TrendingUp, 
  BookOpen, 
  Trash2, 
  ExternalLink,
  PlusCircle,
  Download,
  AlertTriangle,
  PieChart as PieIcon,
  Activity
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { API_BASE } from '../api';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalStudents: 0,
    newRegistrations: 0,
    atRiskCount: 0,
    averageAttendance: '94%'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/students`);
      const data = Array.isArray(res.data) ? res.data : [];
      setStudents(data);
      
      const atRisk = data.filter(s => s.academicRisk === 'Red').length;
      
      setStats(prev => ({
        ...prev,
        totalStudents: data.length,
        atRiskCount: atRisk,
        newRegistrations: data.filter(s => {
          if (!s.createdAt) return false;
          const regDate = new Date(s.createdAt);
          const now = new Date();
          return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
        }).length
      }));
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const riskData = [
    { name: 'High Risk (Red)', value: students.filter(s => s.academicRisk === 'Red').length, color: '#ef4444' },
    { name: 'Moderate (Yellow)', value: students.filter(s => s.academicRisk === 'Yellow').length, color: '#f59e0b' },
    { name: 'Safe (Green)', value: students.filter(s => !s.academicRisk || s.academicRisk === 'Green').length, color: '#10b981' },
  ];

  const filteredStudents = students.filter(student => {
    if (!student || !student.name || !student.studentId) return false;
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.dept && student.dept.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-white/60">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Activity size={120} className="text-blue-600 rotate-12" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-[900] text-slate-900 mb-3 tracking-tight">
            AI <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Command Center</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
            Monitor institutional risk metrics, oversee ML prediction outcomes, and manage academic interventions from your AI-integrated dashboard.
          </p>
        </div>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'from-blue-500 to-indigo-600', trend: '+12%' },
          { label: 'High Risk (Red)', value: stats.atRiskCount, icon: AlertTriangle, color: 'from-red-500 to-rose-600', trend: stats.atRiskCount > 5 ? 'Critical' : 'Low' },
          { label: 'New Registrations', value: stats.newRegistrations, icon: TrendingUp, color: 'from-emerald-500 to-teal-600', trend: '+5%' },
          { label: 'Attendance Avg', value: stats.averageAttendance, icon: Database, color: 'from-purple-500 to-pink-600', trend: '+2.4%' },
        ].map((stat, i) => (
          <div key={i} className="group bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-100/50 border border-slate-50 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
              <stat.icon size={28} />
            </div>
            <div className="space-y-1">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-[800] text-slate-900 tracking-tighter">{stat.value}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.color.includes('red') && stats.atRiskCount > 5 ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Risk Monitoring Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-100/50 border border-slate-50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-[800] text-slate-800 tracking-tight">AI Risk Distribution</h3>
              <p className="text-slate-400 text-sm font-medium mt-1">Real-time ML analysis of student academic risk levels</p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 600, fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 600}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-900/40">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-500 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <h4 className="text-lg font-[800] tracking-tight">High Risk Attention</h4>
          </div>
          <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6 italic">Immediate interventions recommended for these students.</p>
          
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
            {students.filter(s => s.academicRisk === 'Red').length > 0 ? (
              students.filter(s => s.academicRisk === 'Red').map(student => (
                <div key={student._id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all">
                  <div>
                    <p className="font-bold text-sm">{student.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{student.dept} • {student.studentId}</p>
                  </div>
                  <button 
                    onClick={() => navigate(`/students/${student._id}`)}
                    className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                    <ExternalLink size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-slate-600 font-bold">No high-risk students found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area - Student Table */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-100/50 border border-slate-50 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-[800] text-slate-800 tracking-tight">Global Student Registry</h3>
              <p className="text-slate-400 text-sm font-medium mt-1">Review and manage institutional academic records</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search database..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium"
              />
            </div>
          </div>

          <div className="overflow-x-auto -mx-8">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <th className="px-8 py-4">Student Identity</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Risk Profile</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan="4" className="py-20 text-center text-slate-300 font-bold animate-pulse uppercase text-xs">Accessing Neural Database...</td></tr>
                ) : filteredStudents.length === 0 ? (
                  <tr><td colSpan="4" className="py-20 text-center text-slate-300 font-bold uppercase text-xs">No records matching your search</td></tr>
                ) : (
                  filteredStudents.slice(0, 8).map(student => (
                    <tr key={student._id} className="hover:bg-slate-50/80 transition-all duration-300 group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-[1rem] overflow-hidden border-2 border-white bg-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                            <img 
                              src={student.photoUrl ? `${API_BASE}${student.photoUrl}` : `https://ui-avatars.com/api/?name=${student.name}&background=random`} 
                              alt={student.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <p className="font-black text-slate-900">{student.name}</p>
                            <p className="text-xs font-bold text-slate-400 font-mono tracking-tighter uppercase">{student.studentId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-600">{student.dept} - {student.sec}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider
                          ${student.academicRisk === 'Red' ? 'bg-red-50 text-red-600' : 
                            student.academicRisk === 'Yellow' ? 'bg-amber-50 text-amber-600' : 
                            'bg-green-50 text-green-600'}`}>
                          {student.academicRisk || 'Green'}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <button 
                          onClick={() => navigate(`/students/${student._id}`)}
                          className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                          <ExternalLink size={18} />
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
