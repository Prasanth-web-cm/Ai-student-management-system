import { Users, FilePlus, Database } from 'lucide-react';
import { API_BASE } from '../api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/students`)
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching students:', err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Admin Dashboard</h1>
        <p className="text-slate-500">Manage students, faculty, and academic records.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-8 rounded-3xl shadow-xl shadow-primary-500/20 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="absolute right-[-20%] top-[-20%] w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <Users size={40} className="mb-6 opacity-90 drop-shadow-md" />
          <h3 className="text-2xl font-bold mb-2 tracking-tight">Manage Students</h3>
          <p className="text-primary-100 text-sm font-medium leading-relaxed">Add, remove, or update student administrative records and details.</p>
          <div className="mt-8">
            <button 
              onClick={() => navigate('/register')}
              className="bg-white/20 hover:bg-white/30 text-white w-full py-3 rounded-xl font-bold backdrop-blur-md transition-all shadow-inner">
              Add New Student
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-8 rounded-3xl shadow-xl shadow-teal-500/20 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="absolute right-[-20%] bottom-[-20%] w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <Database size={40} className="mb-6 opacity-90 drop-shadow-md" />
          <h3 className="text-2xl font-bold mb-2 tracking-tight">Academic Records</h3>
          <p className="text-teal-100 text-sm font-medium leading-relaxed">Create, manage and update marks and daily attendance registers.</p>
          <div className="mt-8">
            <button 
              onClick={() => navigate('/attendance')}
              className="bg-white/20 hover:bg-white/30 text-white w-full py-3 rounded-xl font-bold backdrop-blur-md transition-all shadow-inner">
              Update Records
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl shadow-xl shadow-indigo-500/20 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="absolute left-[-20%] bottom-[-20%] w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <FilePlus size={40} className="mb-6 opacity-90 drop-shadow-md" />
          <h3 className="text-2xl font-bold mb-2 tracking-tight">Forms & Quizzes</h3>
          <p className="text-indigo-100 text-sm font-medium leading-relaxed">Send interactive forms or conduct online objective quizzes.</p>
          <div className="mt-8">
            <button 
              className="bg-white/20 hover:bg-white/30 text-white w-full py-3 rounded-xl font-bold backdrop-blur-md transition-all shadow-inner">
              Create New
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-xl font-bold text-slate-800">Recent Registrations</h3>
           <button className="text-sm font-bold text-primary-600 hover:text-primary-700 bg-primary-50 px-4 py-2 rounded-xl">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="pb-4 pt-2">Student Name</th>
                <th className="pb-4 pt-2">ID</th>
                <th className="pb-4 pt-2">Department</th>
                <th className="pb-4 pt-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {loading ? (
                <tr><td colSpan="4" className="py-8 text-center text-slate-400">Loading records...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan="4" className="py-8 text-center text-slate-400">No students registered yet.</td></tr>
              ) : (
                students.slice(0, 5).map(student => (
                  <tr key={student._id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 font-bold flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-200">
                        <img 
                          src={student.photoUrl ? `${API_BASE}${student.photoUrl}` : "https://via.placeholder.com/60"} 
                          alt={student.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      {student.name}
                    </td>
                    <td className="py-4 font-medium text-slate-500">{student.studentId}</td>
                    <td className="py-4 font-medium">{student.dept}</td>
                    <td className="py-4 text-right">
                      <button 
                        onClick={() => navigate(`/students/${student._id}`)}
                        className="text-primary-600 hover:text-white hover:bg-primary-600 bg-primary-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        View
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
