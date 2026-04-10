import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, AlertTriangle, CheckCircle, Clock, 
  Search, Filter, Plus, FileText, Calendar,
  TrendingUp, BarChart3, MoreVertical, MessageSquare
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import CounsellingRecordForm from '../components/dashboards/CounsellingRecordForm';
import ManualSmsForm from '../components/dashboards/ManualSmsForm';

const mockAnalytics = [
  { name: 'Mon', risk: 4, stable: 20 },
  { name: 'Tue', risk: 6, stable: 18 },
  { name: 'Wed', risk: 5, stable: 19 },
  { name: 'Thu', risk: 8, stable: 16 },
  { name: 'Fri', risk: 3, stable: 21 },
];

export default function CounsellorDashboard() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSmsForm, setShowSmsForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchAssignedStudents();
  }, []);

  const fetchAssignedStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/counsellors/assigned-students', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const openRecordForm = (student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  const openSmsForm = (student) => {
    setSelectedStudent(student);
    setShowSmsForm(true);
  };

  const handleSaveRecord = (newRecord) => {
    // Optionally update student risk in local state or refetch
    fetchAssignedStudents();
  };

  const stats = [
    { label: 'Assigned Students', value: students.length, icon: Users, color: 'blue' },
    { label: 'High Risk (Red)', value: students.filter(s => s.academicRisk === 'Red').length, icon: AlertTriangle, color: 'red' },
    { label: 'Moderate Risk', value: students.filter(s => s.academicRisk === 'Yellow').length, icon: Clock, color: 'amber' },
    { label: 'Safe Students', value: students.filter(s => s.academicRisk === 'Green').length, icon: CheckCircle, color: 'green' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Counsellor Dashboard</h1>
          <p className="text-slate-500 font-medium mt-1">Welcome back, {user?.name || 'Counsellor'}. Monitoring {students.length} students.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border-2 border-slate-100 px-6 py-3 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <Calendar size={18} />
            Schedule Session
          </button>
          <button 
            onClick={() => students.length > 0 && openRecordForm(students[0])}
            className="bg-blue-600 px-6 py-3 rounded-2xl font-bold text-white hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
          >
            <Plus size={18} />
            Add Record
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all group">
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color === 'blue' ? 'blue-50' : stat.color === 'red' ? 'red-50' : stat.color === 'amber' ? 'amber-50' : 'green-50'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} className={`text-${stat.color === 'blue' ? 'blue-600' : stat.color === 'red' ? 'red-600' : stat.color === 'amber' ? 'amber-600' : 'green-600'}`} />
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
            <div className="text-slate-500 font-bold text-sm uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <TrendingUp className="text-blue-600" size={20} />
                Student Risk Trend
              </h3>
              <select className="bg-slate-50 border-none rounded-xl px-4 py-2 font-bold text-slate-600 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
           </div>
           <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalytics}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="risk" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={40} />
                <Bar dataKey="stable" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-slate-200 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
           <h3 className="text-xl font-black mb-6">Immediate Actions</h3>
           <div className="space-y-4">
              {students.filter(s => s.academicRisk === 'Red').slice(0, 3).length > 0 ? (
                students.filter(s => s.academicRisk === 'Red').slice(0, 3).map((student) => (
                  <div key={student._id} className="bg-white/10 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/20 transition-all cursor-pointer" onClick={() => openRecordForm(student)}>
                    <div>
                      <div className="font-bold">{student.name}</div>
                      <div className="text-white/50 text-xs">High Risk • {student.dept}</div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); openSmsForm(student); }}
                        className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all"
                        title="Send SMS Alert"
                      >
                        <MessageSquare size={18} />
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                        <FileText size={18} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-white/40 font-bold">No high-risk students reported.</div>
              )}
              <button className="w-full py-4 mt-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">
                Weekly Summary Report
              </button>
           </div>
        </div>
      </div>

      {/* Student List Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-xl font-black text-slate-900">Student Profiles</h3>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search students..." 
                className="pl-12 pr-4 py-3 bg-slate-50 rounded-xl border-none outline-none font-medium w-full md:w-64 focus:ring-2 ring-blue-500/20"
              />
            </div>
            <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-sm font-bold text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-8 py-5 text-sm font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-sm font-bold text-slate-400 uppercase tracking-widest">Department</th>
                <th className="px-8 py-5 text-sm font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{student.name}</div>
                        <div className="text-slate-400 text-xs font-medium">ID: {student.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight
                      ${student.academicRisk === 'Red' ? 'bg-red-50 text-red-600' : 
                        student.academicRisk === 'Yellow' ? 'bg-amber-50 text-amber-600' : 
                        'bg-green-50 text-green-600'}`}>
                      {student.academicRisk || 'Green'} Risk
                    </span>
                  </td>
                  <td className="px-8 py-5 font-bold text-slate-600">{student.dept} - {student.sec}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => openSmsForm(student)}
                        className="p-2 hover:bg-orange-50 text-slate-400 hover:text-orange-600 rounded-xl transition-all"
                        title="Send SMS Alert"
                       >
                         <MessageSquare size={18} />
                       </button>
                       <button 
                        onClick={() => openRecordForm(student)}
                        className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all"
                        title="Add Session Record"
                       >
                         <FileText size={18} />
                       </button>
                       <button className="p-2 hover:bg-white rounded-xl transition-all">
                         <MoreVertical className="text-slate-300" size={20} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && selectedStudent && (
        <CounsellingRecordForm 
          student={selectedStudent} 
          onClose={() => setShowForm(false)} 
          onSave={handleSaveRecord}
        />
      )}

      {showSmsForm && selectedStudent && (
        <ManualSmsForm 
          student={selectedStudent} 
          onClose={() => setShowSmsForm(false)} 
        />
      )}
    </div>
  );
}
