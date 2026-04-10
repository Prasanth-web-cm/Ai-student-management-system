import React from 'react';
import { Users, Search, Filter, AlertTriangle, CheckCircle, ChevronRight, MessageSquare, Edit } from 'lucide-react';
import axios from 'axios';
import { API_BASE } from '../api';
import { useAuth } from '../context/AuthContext';
import ManualSmsForm from '../components/dashboards/ManualSmsForm';
import EditStudentModal from '../components/dashboards/EditStudentModal';

export default function AssignedStudents() {
  const { user } = useAuth();
  const [students, setStudents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [showSmsForm, setShowSmsForm] = React.useState(false);
  const [editingStudent, setEditingStudent] = React.useState(null);

  React.useEffect(() => {
    fetchAssignedStudents();
  }, []);

  const fetchAssignedStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/api/counsellors/assigned-students`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSmsClick = (student) => {
    setSelectedStudent(student);
    setShowSmsForm(true);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 group-hover:bg-blue-100 transition-colors duration-700"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest">
              Direct Mentorship Hub
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Assigned Students</h1>
            <p className="text-slate-500 font-medium max-w-md">Monitor and support the academic journey of your {students.length} mentees in real-time.</p>
          </div>
          <div className="flex items-center gap-6 bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200">
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Mentees</p>
                <p className="text-4xl font-black tracking-tighter">{students.length}</p>
             </div>
             <div className="w-px h-12 bg-white/10"></div>
             <div className="text-center">
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Critical Risk</p>
                <p className="text-4xl font-black text-red-500 tracking-tighter">{students.filter(s => s.academicRisk === 'Red').length}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="relative flex-1 w-full lg:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or student ID..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-medium text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl shadow-slate-200">
             <Filter size={16} /> Filter
           </button>
           <button className="flex items-center gap-2 px-6 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
             Export Directory
           </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => <div key={i} className="h-64 bg-white rounded-[2.5rem] animate-pulse border border-slate-100 shadow-sm shadow-slate-100"></div>)}
        </div>
      ) : filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudents.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 relative group overflow-hidden">
               <div className={`absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700`}>
                  {s.academicRisk === 'Red' ? <AlertTriangle size={160} className="text-red-600" /> : <CheckCircle size={160} className="text-green-600" />}
               </div>
               <div className="flex items-center gap-6 mb-8 relative z-10">
                 <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform">
                   <img src={`https://ui-avatars.com/api/?name=${s.name}&background=random&bold=true`} alt={s.name} className="w-full h-full object-cover" />
                 </div>
                 <div>
                   <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{s.name}</h3>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{s.studentId}</p>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                  <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Department</p>
                     <p className="text-xs font-bold text-slate-700">{s.dept}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                     <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${s.academicRisk === 'Red' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                       {s.academicRisk || 'Green'} Risk
                     </span>
                  </div>
               </div>

               <div className="pt-6 border-t border-slate-50 flex gap-3 relative z-10">
                  <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-100">
                    View Journal
                  </button>
                  <button 
                    onClick={() => handleSmsClick(s)}
                    className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-orange-50 hover:text-orange-600 hover:border-orange-100 transition-all active:scale-95"
                    title="Send SMS Alert"
                  >
                    <MessageSquare size={18} />
                  </button>
                  <button 
                    onClick={() => setEditingStudent(s)}
                    className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all active:scale-95"
                    title="Edit Student Info"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => window.location.href = `/students/${s._id}`}
                    className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all active:scale-95"
                  >
                    <ChevronRight size={18} />
                  </button>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-20 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center space-y-4">
           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400"><Users size={40} /></div>
           <p className="text-xl font-black text-slate-900">No students found</p>
           <p className="text-slate-500 font-medium">Try adjusting your filters or search criteria.</p>
        </div>
      )}
 
      {showSmsForm && selectedStudent && (
        <ManualSmsForm 
          student={selectedStudent} 
          onClose={() => setShowSmsForm(false)} 
        />
      )}

      {editingStudent && (
        <EditStudentModal 
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onUpdate={(updated) => {
            setStudents(students.map(s => s._id === updated._id ? updated : s));
          }}
        />
      )}
    </div>
  );
}
