import { Link, useLocation } from 'react-router-dom';
import { Home, Users, ClipboardList, Calendar, PieChart, LogOut, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CounsellorSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/counsellor/dashboard' },
    { name: 'My Students', icon: Users, path: '/counsellor/students' },
    { name: 'Counselling Records', icon: ClipboardList, path: '/counsellor/records' },
    { name: 'Mark Attendance', icon: Calendar, path: '/counsellor/attendance' },
    { name: 'Risk Analytics', icon: PieChart, path: '/counsellor/analytics' },
    { name: 'SMS Alerts', icon: MessageSquare, path: '/counsellor/alerts' },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          EDU<span className="text-blue-600">AI</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm shadow-blue-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-300"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
