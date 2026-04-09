import Sidebar from './Sidebar';
import AdminSidebar from './AdminSidebar';
import CounsellorSidebar from './CounsellorSidebar';
import TopNav from './TopNav';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user } = useAuth();
  
  const renderSidebar = () => {
    if (user?.role === 'admin') return <AdminSidebar />;
    if (user?.role === 'counsellor') return <CounsellorSidebar />;
    if (user?.role === 'student') return <Sidebar />;
    return <Sidebar />; // Public sidebar
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 z-50">
        {renderSidebar()}
      </div>
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative">
        <TopNav />
        <main className="flex-1 mt-20 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
