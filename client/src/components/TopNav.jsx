import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

export default function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const isActive = (path) => location.pathname === path ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-20 bg-white/80 backdrop-blur-lg border-b border-slate-200 fixed top-0 right-0 left-64 flex items-center justify-between px-8 z-10 transition-all duration-300">
      <div className="flex items-center">
        {user && (
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-700">
              Welcome, {user.name || user.username}
            </span>
          </div>
        )}
      </div>
      
      <nav className="flex items-center gap-2">
        <Link to="/" className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${isActive('/')}`}>
          Home
        </Link>
        <Link to="/about" className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${isActive('/about')}`}>
          About
        </Link>
        <Link to="/contact" className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${isActive('/contact')}`}>
          Contact
        </Link>
        
        <div className="ml-4 pl-4 border-l border-slate-200 flex items-center gap-3">
          {user ? (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium text-sm px-4 py-2 transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm shadow-indigo-500/30">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
