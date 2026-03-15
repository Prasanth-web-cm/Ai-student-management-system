import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Connect to backend API later
    if (username === 'admin' && password === 'admin123') {
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials. For demo, use username: admin and password: admin123');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin <span className="text-primary-600">Portal</span></h2>
        <p className="text-slate-500 mt-2">Sign in to manage student records</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input 
            type="password" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-slate-900/20 mt-4"
        >
          Sign In to Dashboard
        </button>
      </form>
    </div>
  );
}
