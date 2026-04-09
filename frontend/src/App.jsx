import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import CounsellorLogin from './pages/CounsellorLogin';
import StudentRegister from './pages/StudentRegister';
import StudentDashboard from './pages/StudentDashboard';
import StudentAttendance from './pages/StudentAttendance';
import StudentMarks from './pages/StudentMarks';
import StudentSubjects from './pages/StudentSubjects';
import FacultyDetails from './pages/FacultyDetails';
import DepartmentInfo from './pages/DepartmentInfo';
import AdminDashboard from './pages/AdminDashboard';
import CounsellorDashboard from './pages/CounsellorDashboard';
import AssignedStudents from './pages/AssignedStudents';
import CounsellingRecords from './pages/CounsellingRecords';
import MarkAttendance from './pages/MarkAttendance';
import RiskAnalytics from './pages/RiskAnalytics';
import SmsHistory from './pages/SmsHistory';
import ManageStudents from './pages/ManageStudents';
import About from './pages/About';
import Contact from './pages/Contact';
import StudentProfile from './pages/StudentProfile';
import Settings from './pages/Settings';
import CounsellorManagement from './pages/CounsellorManagement';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen font-bold text-slate-400 animate-pulse">Checking credentials...</div>;
  
  if (!user) {
    if (role === 'admin') return <Navigate to="/admin/login" replace />;
    if (role === 'counsellor') return <Navigate to="/counsellor/login" replace />;
    return <Navigate to="/login" replace />;
  }
  
  const allowedRoles = Array.isArray(role) ? role : [role];
  if (role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/register" element={<StudentRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/counsellor/login" element={<CounsellorLogin />} />
            
            {/* Student Routes */}
            <Route 
              path="/students" 
              element={
                <ProtectedRoute role="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/attendance" element={<ProtectedRoute role="student"><StudentAttendance /></ProtectedRoute>} />
            <Route path="/marks" element={<ProtectedRoute role="student"><StudentMarks /></ProtectedRoute>} />
            <Route path="/subjects" element={<ProtectedRoute role="student"><StudentSubjects /></ProtectedRoute>} />
            <Route path="/faculty" element={<ProtectedRoute role="student"><FacultyDetails /></ProtectedRoute>} />
            <Route path="/department" element={<ProtectedRoute role="student"><DepartmentInfo /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/admin/students" element={<ProtectedRoute role="admin"><ManageStudents /></ProtectedRoute>} />
            <Route path="/admin/alerts" element={<ProtectedRoute role="admin"><SmsHistory /></ProtectedRoute>} />
            
            {/* Counsellor Routes */}
            <Route 
              path="/counsellor/dashboard" 
              element={
                <ProtectedRoute role="counsellor">
                  <CounsellorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/counsellor/students" element={<ProtectedRoute role="counsellor"><AssignedStudents /></ProtectedRoute>} />
            <Route path="/counsellor/records" element={<ProtectedRoute role="counsellor"><CounsellingRecords /></ProtectedRoute>} />
            <Route path="/counsellor/attendance" element={<ProtectedRoute role="counsellor"><MarkAttendance /></ProtectedRoute>} />
            <Route path="/counsellor/analytics" element={<ProtectedRoute role="counsellor"><RiskAnalytics /></ProtectedRoute>} />
            <Route path="/counsellor/alerts" element={<ProtectedRoute role="counsellor"><SmsHistory /></ProtectedRoute>} />

            {/* Shared Stability Routes */}
            <Route path="/students/:id" element={<ProtectedRoute role={['admin', 'counsellor']}><StudentProfile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/admin/counsellors" element={<ProtectedRoute role="admin"><CounsellorManagement /></ProtectedRoute>} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
