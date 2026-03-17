import React, { useState } from 'react';

export default function StudentRegister() {
  const [formData, setFormData] = useState({
    name: '', studentId: '', phone: '', dept: '', sec: '', password: ''
  });
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append('photo', file);

    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setMessage({ text: 'Registration Successful!', type: 'success' });
        // Reset form
        setFormData({ name: '', studentId: '', phone: '', dept: '', sec: '', password: '' });
        setFile(null);
        e.target.reset();
      } else {
        const errData = await response.json();
        setMessage({ text: `Error: ${errData.error || 'Failed to register'}`, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Network error. Is the backend running?', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student <span className="text-primary-600">Registration</span></h2>
        <p className="text-slate-500 mt-2">Enter your details to register in the central database.</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input type="text" required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
            onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Student ID</label>
          <input type="text" required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
            onChange={e => setFormData({...formData, studentId: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
          <input type="tel" required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
            onChange={e => setFormData({...formData, phone: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
          <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white"
            onChange={e => setFormData({...formData, dept: e.target.value})}>
            <option value="">Select Department</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
            <option value="MECH">Mechanical</option>
            <option value="CIVIL">Civil</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Section</label>
          <input type="text" required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
            onChange={e => setFormData({...formData, sec: e.target.value})} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Login Password</label>
          <input type="password" required
             className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
             onChange={e => setFormData({...formData, password: e.target.value})} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Passport Size Photo</label>
          <input type="file" accept="image/*" required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            onChange={e => setFile(e.target.files[0])} />
        </div>

        <div className="md:col-span-2 pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-primary-500/30 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        </div>
      </form>
    </div>
  );
}
