import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import StudentRegister from './pages/StudentRegister';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';

// Placeholders for other routes
const Placeholder = ({ title }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full min-h-[400px] flex items-center justify-center">
    <h2 className="text-3xl font-extrabold text-slate-200 tracking-tight">{title} Coming Soon</h2>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/students" element={<StudentDashboard />} />
          <Route path="/attendance" element={<Placeholder title="Attendance" />} />
          <Route path="/marks" element={<Placeholder title="Marks Overview" />} />
          <Route path="/subjects" element={<Placeholder title="Subjects Overview" />} />
          <Route path="/faculty" element={<Placeholder title="Faculty Details" />} />
          <Route path="/department" element={<Placeholder title="About Department" />} />
          
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/register" element={<StudentRegister />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
