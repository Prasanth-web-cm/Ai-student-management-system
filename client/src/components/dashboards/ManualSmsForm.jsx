import { useState } from 'react';
import { X, Send, AlertCircle, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { API_BASE } from '../../api';

export default function ManualSmsForm({ student, onClose, onSent }) {
  const [reason, setReason] = useState('');
  const [riskLevel, setRiskLevel] = useState('Red');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE}/api/sms/manual`, {
        studentId: student._id,
        studentName: student.name,
        parentPhone: student.parentPhone || 'Not Provided',
        riskLevel,
        reason
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (onSent) onSent();
      onClose();
      alert('SMS Alert triggered successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send SMS');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-red-50/30">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
              <MessageSquare size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Manual SMS Alert</h2>
              <p className="text-slate-500 text-sm font-medium">To Parent of {student.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all shadow-sm">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-2 text-sm font-bold border border-red-100">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div className="space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <div className="flex justify-between items-center text-sm">
               <span className="font-bold text-slate-400 uppercase tracking-widest">Target Phone</span>
               <span className="font-black text-slate-700">{student.parentPhone || 'No phone on record'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 ml-1">Risk Classification</label>
            <select 
              className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 outline-none transition-all font-medium"
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value)}
            >
              <option value="Red">High Risk (Immediate)</option>
              <option value="Yellow">Moderate Risk (Follow-up)</option>
              <option value="Green">Low Risk (Informational)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 ml-1">Reason for Alert</label>
            <textarea 
              className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 outline-none transition-all font-medium min-h-[120px]"
              placeholder="Explain why this alert is being sent (e.g., Critical low attendance, Repeated missing assignments)..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
            >
              Discard
            </button>
            <button 
              type="submit"
              disabled={loading || !student.parentPhone}
              className="flex-[2] py-4 bg-red-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-xl shadow-red-200 disabled:opacity-50"
            >
              {loading ? 'Sending...' : <><Send size={20} /> Deploy Alert</>}
            </button>
          </div>
          {!student.parentPhone && (
            <p className="text-center text-xs font-bold text-red-500">Cannot send: No parent contact info.</p>
          )}
        </form>
      </div>
    </div>
  );
}
