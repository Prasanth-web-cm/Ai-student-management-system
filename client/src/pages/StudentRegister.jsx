import React, { useState } from 'react';
import { API_BASE } from '../api';

export default function StudentRegister() {
  const [formData, setFormData] = useState({
    name: '', studentId: '', phone: '', parentPhone: '', dept: '', sec: '', password: ''
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [aadharFile, setAadharFile] = useState(null);
  const [aadharPreview, setAadharPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const validateForm = () => {
    const { phone, parentPhone, password } = formData;

    // Check phone: exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setMessage({ text: 'Student phone number must be exactly 10 digits.', type: 'error' });
      return false;
    }

    if (parentPhone && !phoneRegex.test(parentPhone)) {
      setMessage({ text: 'Parent phone number must be exactly 10 digits.', type: 'error' });
      return false;
    }

    // Check password: 8+ chars, at least one uppercase, one number, and one symbol
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessage({ text: 'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one symbol (e.g. !@#$%).', type: 'error' });
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 2 * 1024 * 1024) {
      setMessage({ text: 'File size must be less than 2MB.', type: 'error' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (img.width > img.height) {
          setMessage({ text: 'Photo must be in portrait (vertical) orientation to be used as a passport size photo.', type: 'error' });
          setFile(null);
          setPreview(null);
        } else {
          setFile(selectedFile);
          setPreview(event.target.result);
          if (message.type === 'error' && message.text.includes('Photo')) {
            setMessage({ text: '', type: '' });
          }
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleAadharChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 2 * 1024 * 1024) {
      setMessage({ text: 'Aadhar image must be less than 2MB.', type: 'error' });
      return;
    }

    setAadharFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (event) => setAadharPreview(event.target.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!validateForm()) return;

    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append('photo', file);
    if (aadharFile) data.append('parentAadhar', aadharFile);

    try {
      const response = await fetch(`${API_BASE}/api/students`, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        let successMsg = 'Registration Successful!';
        if (result.extractedPhone) {
          successMsg += ` (Successfully extracted parent number: ${result.extractedPhone})`;
        }
        
        setMessage({ text: successMsg, type: 'success' });
        // Reset form
        setFormData({ name: '', studentId: '', phone: '', parentPhone: '', dept: '', sec: '', password: '' });
        setFile(null);
        setPreview(null);
        setAadharFile(null);
        setAadharPreview(null);
        e.target.reset();
      } else {
        const errData = await response.json();
        setMessage({ text: `Error: ${errData.error || 'Failed to register'}`, type: 'error' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ text: `Network error. Failed to connect to backend.`, type: 'error' });
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
            onChange={e => setFormData({ ...formData, name: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Student ID</label>
          <input type="text" required
            maxLength="10"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
            onChange={e => setFormData({ ...formData, studentId: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
          <input type="tel" required
            maxLength="10"

            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
            onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
            value={formData.phone}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
          <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white"
            onChange={e => setFormData({ ...formData, dept: e.target.value })}>
            <option value="">Select Department</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
            <option value="MECH">Mechanical</option>
            <option value="CIVIL">Civil</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Parent Phone Number (Optional if Aadhar provided)</label>
          <input type="tel" 
            maxLength="10"
            placeholder="For emergency alerts"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
            onChange={e => setFormData({ ...formData, parentPhone: e.target.value.replace(/\D/g, '') })}
            value={formData.parentPhone}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Section</label>
          <input type="text" required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
            onChange={e => setFormData({ ...formData, sec: e.target.value })} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Login Password</label>
          <input type="password" required
            placeholder="password"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            value={formData.password}
          />
        </div>

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Passport Photo (Max 2MB)</label>
            <div className="flex items-center gap-4">
              <input type="file" accept="image/*" required
                className="flex-1 px-4 py-2 text-xs rounded-lg border border-slate-200 outline-none file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700"
                onChange={handleFileChange} />
              {preview && (
                <div className="w-16 h-20 rounded border overflow-hidden shrink-0">
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Parent Aadhar Card (for OCR Extraction)</label>
            <div className="flex items-center gap-4">
              <input type="file" accept="image/*"
                className="flex-1 px-4 py-2 text-xs rounded-lg border border-slate-200 outline-none file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700"
                onChange={handleAadharChange} />
              {aadharPreview && (
                <div className="w-16 h-20 rounded border overflow-hidden shrink-0">
                  <img src={aadharPreview} alt="Aadhar" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
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

      {/* Subtle Debug Info */}
      <div className="mt-8 pt-6 border-t border-slate-50 text-center">
        <p className="text-[10px] text-slate-300 font-medium uppercase tracking-widest">
          Backend Connection: <span className="text-slate-400 select-all">{API_BASE}</span>
        </p>
      </div>
    </div>
  );
}
