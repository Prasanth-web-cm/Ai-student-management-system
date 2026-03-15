import { Link, useLocation } from 'react-router-dom';

export default function TopNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50';

  return (
    <div className="h-20 bg-white/80 backdrop-blur-lg border-b border-slate-200 fixed top-0 right-0 left-64 flex items-center justify-between px-8 z-10 transition-all duration-300">
      <div className="flex items-center">
        {/* Can put a search bar or breadcrumbs here */}
      </div>
      
      <nav className="flex items-center gap-2">
        <Link to="/" className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${isActive('/')}`}>
          Home
        </Link>
        <Link to="/about" className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${isActive('/about')}`}>
          About
        </Link>
        <Link to="/contact" className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${isActive('/contact')}`}>
          Contact Details
        </Link>
        
        {/* User Profile Avatar / Register button placeholder */}
        <div className="ml-4 pl-4 border-l border-slate-200 flex items-center gap-3">
          <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm shadow-primary-500/30">
            Student Register
          </Link>
        </div>
      </nav>
    </div>
  );
}
