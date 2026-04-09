import React, { useState, useEffect } from 'react';
import { X, Save, User, Phone, Book, Hash, ShieldCheck, FileText, Camera } from 'lucide-react';
import axios from 'axios';
import { API_BASE } from '../../api';

export default function EditStudentModal({ student, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    phone: '',
    parentPhone: '',
    dept: '',
    sec: ''
  });
  const [photo, setPhoto] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [previews, setPreviews] = useState({ photo: null, aadhar: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        studentId: student.studentId || '',
        phone: student.phone || '',
        parentPhone: student.parentPhone || '',
        dept: student.dept || '',
        sec: student.sec || ''
      });
      setPreviews({
        photo: student.photoUrl ? `${API_BASE}${student.photoUrl}` : null,
        aadhar: student.parentAadharUrl ? `${API_BASE}${student.parentAadharUrl}` : null
      });
    }
  }, [student]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError(`${type === 'photo' ? 'Photo' : 'Aadhar image'} must be less than 2MB.`);
      return;
    }

    if (type === 'photo') setPhoto(file);
    else setAadhar(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviews(prev => ({ ...prev, [type]: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (photo) data.append('photo', photo);
    if (aadhar) data.append('parentAadhar', aadhar);

    try {
      const res = await axios.put(`${API_BASE}/api/students/${student._id}`, data);
      onUpdate(res.data);
      onClose();
    } catch (err) {
      console.error('Update failed:', err);
      setError(err.response?.data?.error || 'Failed to update student details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><User size={20} /></div>
              Edit Student Details
            </h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Refining Student Identity</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white hover:text-red-500 rounded-2xl transition-all border border-transparent hover:border-slate-100 text-slate-400">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 animate-in shake duration-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} id="edit-student-form" className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                   <User size={12} /> Full Name
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-slate-700" 
                  required
                />
             </div>

             <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                   <Hash size={12} /> Student ID
                </label>
                <input 
                  type="text" 
                  value={formData.studentId}
                  onChange={e => setFormData({...formData, studentId: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
                  required
                />
             </div>

             <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                   <Phone size={12} /> Primary Phone
                </label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
                  required
                />
             </div>

             <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                   <Book size={12} /> Department
                </label>
                <select 
                  value={formData.dept}
                  onChange={e => setFormData({...formData, dept: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-slate-700 appearance-none bg-white"
                >
                  <option value="CSE">Computer Science</option>
                  <option value="ECE">Electronics</option>
                  <option value="MECH">Mechanical</option>
                  <option value="CIVIL">Civil</option>
                </select>
             </div>

             <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                   <ShieldCheck size={12} /> Section
                </label>
                <input 
                  type="text" 
                  value={formData.sec}
                  onChange={e => setFormData({...formData, sec: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
                  required
                />
             </div>

             <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                   <Phone size={12} /> Parent Phone
                </label>
                <input 
                  type="tel" 
                  value={formData.parentPhone}
                  onChange={e => setFormData({...formData, parentPhone: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
                />
             </div>

             <div className="md:col-span-2 grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-4">
                   <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 outline-none">
                      <Camera size={12} /> Update Photo
                   </label>
                   <div className="relative group/photo">
                      <div className="w-full h-40 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover/photo:border-blue-200">
                         {previews.photo ? (
                           <img src={previews.photo} className="w-full h-full object-cover" alt="Preview" />
                         ) : (
                            <FileText size={32} className="text-slate-300" />
                         )}
                         <input 
                           type="file" 
                           onChange={(e) => handleFileChange(e, 'photo')}
                           className="absolute inset-0 opacity-0 cursor-pointer"
                           accept="image/*"
                         />
                      </div>
                      <p className="text-[10px] text-center mt-2 font-bold text-slate-300 uppercase tracking-tighter">Click to replace photo</p>
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <FileText size={12} /> Update Aadhar
                   </label>
                   <div className="relative group/aadhar">
                      <div className="w-full h-40 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover/aadhar:border-blue-200">
                        {previews.aadhar ? (
                           <img src={previews.aadhar} className="w-full h-full object-cover" alt="Preview" />
                         ) : (
                            <FileText size={32} className="text-slate-300" />
                         )}
                         <input 
                           type="file" 
                           onChange={(e) => handleFileChange(e, 'aadhar')}
                           className="absolute inset-0 opacity-0 cursor-pointer"
                           accept="image/*"
                         />
                      </div>
                      <p className="text-[10px] text-center mt-2 font-bold text-slate-300 uppercase tracking-tighter">Click to replace Aadhar</p>
                   </div>
                </div>
             </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 px-8 py-4 bg-white text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="edit-student-form"
            disabled={loading}
            className="flex-1 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}
