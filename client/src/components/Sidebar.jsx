import { Link, useLocation } from 'react-router-dom';
import { Users, CheckSquare, FileText, BookOpen, GraduationCap, Building2, LogIn, HeartPulse, ClipboardList } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path
    ? 'bg-primary-600 text-white shadow-md'
    : 'text-slate-300 hover:bg-slate-800 hover:text-white';

  return (
    <div className="w-64 bg-slate-900 h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-20 transition-all duration-300">
      {/* College & Student Image Section */}
      <div className="h-48 relative overflow-hidden shrink-0">
        <img
          src="https://www.sistk.org/images/chairman-wide.jpg"
          alt="College Campus"
          className="w-full h-full object-cover opacity-50 transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h2 className="text-white font-bold text-2xl tracking-tight">SMS Portal</h2>
          <p className="text-primary-400 text-sm font-medium">Empowering Students</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4 scrollbar-hide">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Dashboard</p>

        <Link to="/students" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/students')}`}>
          <Users size={20} /> <span className="font-medium text-sm">Students</span>
        </Link>
        <Link to="/attendance" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/attendance')}`}>
          <CheckSquare size={20} /> <span className="font-medium text-sm">Attendance</span>
        </Link>
        <Link to="/marks" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/marks')}`}>
          <FileText size={20} /> <span className="font-medium text-sm">Marks</span>
        </Link>
        <Link to="/subjects" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/subjects')}`}>
          <BookOpen size={20} /> <span className="font-medium text-sm">Subjects</span>
        </Link>
        <Link to="/quizzes" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/quizzes')}`}>
          <ClipboardList size={20} /> <span className="font-medium text-sm">Forms & Quizzes</span>
        </Link>
        <Link to="/faculty" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/faculty')}`}>
          <GraduationCap size={20} /> <span className="font-medium text-sm">Faculty Details</span>
        </Link>
        <Link to="/department" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/department')}`}>
          <Building2 size={20} /> <span className="font-medium text-sm">About Dept</span>
        </Link>
      </div>

      {/* Login Options at bottom */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <Link to="/counsellor/login" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 hover:shadow-lg transition-all duration-200 group border border-slate-700">
          <HeartPulse size={20} className="group-hover:text-indigo-400 transition-colors" />
          <span className="font-medium text-sm">Counsellor Login</span>
        </Link>
        <Link to="/admin/login" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 hover:shadow-lg transition-all duration-200 group border border-slate-700">
          <LogIn size={20} className="group-hover:text-primary-400 transition-colors" />
          <span className="font-medium text-sm">Admin Login</span>
        </Link>
      </div>
    </div>
  );
}
