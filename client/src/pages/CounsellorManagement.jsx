import React from 'react';
import { 
  Users, UserPlus, Search, Filter, 
  MoreVertical, Shield, Mail, Phone,
  ChevronRight, Calendar, AlertCircle
} from 'lucide-react';
import axios from 'axios';
import { API_BASE } from '../api';

export default function CounsellorManagement() {
  const [counsellors, setCounsellors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    fetchCounsellors();
  }, []);

  const fetchCounsellors = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/api/counsellors`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCounsellors(res.data);
    } catch (err) {
      console.error('Error fetching counsellors:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = counsellors.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Counsellor Management</h1>
          <p className="text-slate-500 font-medium mt-1">Found {counsellors.length} active counselling professionals in the system.</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2">
          <UserPlus size={20} /> Onboard New Expert
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-4">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none outline-none font-medium focus:ring-2 ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
             <button className="p-4 bg-slate-50 text-slate-500 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
               <Filter size={20} />
             </button>
             <button className="p-4 bg-slate-50 text-slate-500 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
               <Calendar size={20} />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filtered.map((c) => (
             <div key={c._id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 group relative">
                <div className="absolute top-6 right-6">
                   <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><MoreVertical size={18} className="text-slate-300" /></button>
                </div>
                
                <div className="flex items-center gap-6 mb-8">
                   <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-1 ring-slate-100 group-hover:scale-110 transition-transform duration-500">
                      <img src={`https://ui-avatars.com/api/?name=${c.name}&background=blue&color=fff&bold=true`} alt={c.name} />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-slate-900 leading-tight mb-1">{c.name}</h3>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                         Expert Domain: {c.dept || 'Gen-Academic'}
                      </div>
                   </div>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                      <Mail size={16} className="text-blue-400" /> {c.email}
                   </div>
                   <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                      <Shield size={16} className="text-blue-400" /> {c.assignedStudents?.length || 0} Students Allocated
                   </div>
                </div>

                <div className="pt-6 border-t border-slate-50 grid grid-cols-2 gap-3">
                   <button className="py-3 bg-slate-50 text-slate-900 rounded-xl font-black text-xs hover:bg-blue-600 hover:text-white transition-all">View Profiles</button>
                   <button className="py-3 bg-slate-50 text-slate-900 rounded-xl font-black text-xs hover:bg-blue-600 hover:text-white transition-all">Assign Task</button>
                </div>
             </div>
          ))}
          
          {filtered.length === 0 && !loading && (
             <div className="col-span-full py-20 text-center space-y-4">
                <AlertCircle className="mx-auto text-slate-200" size={64} />
                <p className="text-slate-400 font-bold text-xl">No counselling professionals found matching your search.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
