import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Calendar, Book, 
  AlertTriangle, CheckCircle, TrendingUp,
  ArrowLeft, MessageSquare, Download
} from 'lucide-react';
import axios from 'axios';
import { API_BASE } from '../api';
import ManualSmsForm from '../components/dashboards/ManualSmsForm';

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [showSmsForm, setShowSmsForm] = React.useState(false);

  React.useEffect(() => {
    fetchStudentDetails();
  }, [id]);

  const fetchStudentDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/api/students/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setStudent(res.data);
    } catch (err) {
      console.error('Error fetching student details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/api/export/pdf/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob'
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${student.name}_Performance_Report.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Failed to generate PDF report. Please try again.');
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-black text-slate-400">Loading comprehensive profile...</div>;
  if (!student) return <div className="p-20 text-center text-red-500 font-bold">Student records not found in our database.</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Directory
      </button>

      <div className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="relative">
            <div className="w-48 h-48 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-slate-100 transform hover:rotate-3 transition-transform duration-500 bg-slate-100">
               <img 
                 src={student.photoUrl ? `${API_BASE}${student.photoUrl}` : `https://ui-avatars.com/api/?name=${student.name}&background=6366f1&color=fff&size=256&bold=true`} 
                 alt={student.name} 
                 className="w-full h-full object-cover" 
               />
            </div>
            <div className={`absolute -bottom-4 -right-4 p-4 rounded-2xl shadow-xl ${student.academicRisk === 'Red' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
               {student.academicRisk === 'Red' ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
            </div>
          </div>

          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
              Verified Academic Asset
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">{student.name}</h1>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
               <div className="flex items-center gap-2 text-slate-500 font-bold">
                 <User size={18} className="text-blue-500" /> {student.studentId}
               </div>
               <div className="w-px h-6 bg-slate-200 hidden md:block"></div>
               <div className="flex items-center gap-2 text-slate-500 font-bold">
                 <Book size={18} className="text-blue-500" /> {student.dept} - {student.sec}
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
             <button 
                onClick={() => setShowSmsForm(true)}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2"
             >
                <MessageSquare size={20} /> Action Manual Alert
             </button>
             <button 
                onClick={handleDownloadPDF}
                className="bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-black hover:bg-slate-50 transition-all flex items-center gap-2"
             >
                <Download size={20} /> Export Performance PDF
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
               <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                 <TrendingUp className="text-blue-600" /> Academic Trajectory
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-8 bg-slate-50 rounded-[2rem] text-center group hover:bg-blue-600 transition-all duration-500 cursor-default">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-blue-100 transition-colors">Risk Index</p>
                     <p className={`text-4xl font-black group-hover:text-white transition-colors ${student.academicRisk === 'Red' ? 'text-red-500' : 'text-green-500'}`}>
                        {student.academicRisk === 'Red' ? 'High' : 'Safe'}
                     </p>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[2rem] text-center group hover:bg-blue-600 transition-all duration-500 cursor-default">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-blue-100 transition-colors">Attendance</p>
                     <p className="text-4xl font-black text-slate-900 group-hover:text-white transition-colors">84%</p>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[2rem] text-center group hover:bg-blue-600 transition-all duration-500 cursor-default">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-blue-100 transition-colors">CGPA Est.</p>
                     <p className="text-4xl font-black text-slate-900 group-hover:text-white transition-colors">8.2</p>
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
               <h3 className="text-2xl font-black text-slate-900 mb-8">Consultation Timeline</h3>
               <div className="space-y-6">
                  {[
                    { date: 'Mar 15, 2026', type: 'Clinical Interview', summary: 'Discussion on project roadblocks.' },
                    { date: 'Feb 10, 2026', type: 'Progress Check', summary: 'Regular monitoring of internal scores.' },
                  ].map((entry, i) => (
                    <div key={i} className="flex gap-6 group">
                       <div className="flex flex-col items-center">
                          <div className="w-4 h-4 bg-blue-500 rounded-full group-hover:scale-150 transition-transform shadow-xl shadow-blue-200"></div>
                          <div className="w-px flex-1 bg-slate-100 my-2"></div>
                       </div>
                       <div className="pb-8">
                          <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{entry.date}</p>
                          <p className="text-lg font-black text-slate-800 mb-2">{entry.type}</p>
                          <p className="text-slate-500 font-medium leading-relaxed">{entry.summary}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
               <h3 className="text-xl font-black text-slate-900">Contact Repository</h3>
               <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                     <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all"><Phone size={20} /></div>
                     <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Phone</p>
                       <p className="font-bold text-slate-800">{student.phone}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                     <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-all"><Mail size={20} /></div>
                     <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                       <p className="font-bold text-slate-800">{student.studentId.toLowerCase()}@uniedu.com</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer hover:translate-x-2 transition-transform">
                     <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><Phone size={20} /></div>
                     <div>
                       <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Primary Guardian Contact</p>
                       <p className="font-black text-slate-900">{student.parentPhone}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 transform rotate-12 opacity-10 group-hover:rotate-0 transition-all duration-700"><Calendar size={140} /></div>
               <h3 className="text-2xl font-black mb-4">Intervention Plan</h3>
               <p className="text-slate-400 font-medium leading-relaxed mb-8">System suggests a follow-up session within 48 hours to mitigate rising risk factors detected in latest attendance data.</p>
               <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-blue-50 transition-all active:scale-95">Set Intervention</button>
            </div>
         </div>
      </div>
      {showSmsForm && (
        <ManualSmsForm 
          student={student} 
          onClose={() => setShowSmsForm(false)} 
        />
      )}
    </div>
  );
}
