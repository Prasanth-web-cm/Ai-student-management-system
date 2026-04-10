import { useState } from 'react';
import { X, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CounsellingRecordForm({ student, onClose, onSave }) {
  const [formData, setFormData] = useState({
    notes: '',
    behaviourObservation: '',
    academicObservation: '',
    recommendation: '',
    riskScore: 50
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/counsellors/record', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData, studentId: student._id }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to save record');

      onSave(data.record);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Add Counselling Record</h2>
            <p className="text-slate-500 font-medium">Recording session for {student.name}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1">Behaviour Observation</label>
              <select 
                className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-medium"
                value={formData.behaviourObservation}
                onChange={(e) => setFormData({...formData, behaviourObservation: e.target.value})}
              >
                <option value="">Select Observation</option>
                <option value="Good">Good</option>
                <option value="Distracted">Distracted</option>
                <option value="Irregular">Irregular</option>
                <option value="Needs Improvement">Needs Improvement</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 ml-1">Risk Score (0-100)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="0" max="100" 
                  className="flex-1 accent-blue-600"
                  value={formData.riskScore}
                  onChange={(e) => setFormData({...formData, riskScore: parseInt(e.target.value)})}
                />
                <span className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white
                  ${formData.riskScore > 75 ? 'bg-red-500' : formData.riskScore > 40 ? 'bg-amber-500' : 'bg-green-500'}`}>
                  {formData.riskScore}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 ml-1">Session Notes</label>
            <textarea 
              className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-medium min-h-[100px]"
              placeholder="Detailed notes about the counselling session..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              required
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 ml-1">Recommendations</label>
            <input 
              type="text"
              className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-medium"
              placeholder="e.g. Weekly monitoring, Parent meet..."
              value={formData.recommendation}
              onChange={(e) => setFormData({...formData, recommendation: e.target.value})}
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
            >
              {loading ? 'Saving...' : <><Save size={20} /> Save Record</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
