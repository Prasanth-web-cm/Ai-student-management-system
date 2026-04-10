import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  PlusCircle, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowLeft,
  X,
  Plus,
  Send
} from 'lucide-react';
import { API_BASE } from '../api';
import axios from 'axios';

export default function ManageQuizzes() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    description: '',
    status: 'draft',
    questions: [{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]
  });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/quizzes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setQuizzes(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching quizzes:', err);
      setLoading(false);
    }
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending quiz data:', newQuiz);
      const res = await axios.post(`${API_BASE}/api/quizzes`, newQuiz, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Response from server:', res.data);
      setShowModal(false);
      setNewQuiz({
        title: '',
        description: '',
        status: 'draft',
        questions: [{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]
      });
      fetchQuizzes();
    } catch (err) {
      console.error('Error creating quiz:', err);
      alert(`Failed to create quiz: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quiz and all its results?')) {
      try {
        await axios.delete(`${API_BASE}/api/quizzes/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setQuizzes(quizzes.filter(q => q._id !== id));
      } catch (err) {
        console.error('Error deleting quiz:', err);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`${API_BASE}/api/quizzes/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchQuizzes();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const addQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      questions: [...newQuiz.questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]
    });
  };

  const removeQuestion = (index) => {
    const questions = [...newQuiz.questions];
    questions.splice(index, 1);
    setNewQuiz({ ...newQuiz, questions });
  };

  const updateQuestion = (index, field, value) => {
    const questions = [...newQuiz.questions];
    questions[index][field] = value;
    setNewQuiz({ ...newQuiz, questions });
  };

  const updateOption = (qIndex, oIndex, value) => {
    const questions = [...newQuiz.questions];
    questions[qIndex].options[oIndex] = value;
    setNewQuiz({ ...newQuiz, questions });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-slate-500 hover:text-primary-600 font-bold mb-4 transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-[900] text-slate-900 tracking-tight flex items-center gap-4">
            Forms & <span className="text-primary-600">Quizzes</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Create and manage exams, surveys, and quizzes for students.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary-500/20 transition-all hover:-translate-y-1 active:scale-95">
          <PlusCircle size={20} />
          Create New Form
        </button>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-24 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">
            Loading Quizzes...
          </div>
        ) : quizzes.length === 0 ? (
          <div className="col-span-full py-24 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
            <ClipboardList size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No quizzes found. Create your first one!</p>
          </div>
        ) : (
          quizzes.map(quiz => (
            <div key={quiz._id} className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-100/50 border border-slate-50 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
               {/* Status Badge */}
               <div className="absolute top-6 right-6">
                  {quiz.status === 'active' ? (
                    <span className="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                      <CheckCircle2 size={12} /> Active
                    </span>
                  ) : quiz.status === 'closed' ? (
                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                      <AlertCircle size={12} /> Closed
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                      <Clock size={12} /> Draft
                    </span>
                  )}
               </div>

               <div className="mb-8">
                 <h3 className="text-xl font-black text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight line-clamp-1">{quiz.title}</h3>
                 <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">{quiz.questions.length} Questions • {new Date(quiz.createdAt).toLocaleDateString()}</p>
                 <p className="text-slate-500 text-sm mt-4 line-clamp-2 min-h-[2.5rem]">{quiz.description || 'No description provided.'}</p>
               </div>

               <div className="flex items-center gap-2">
                 <button 
                   onClick={() => navigate(`/admin/quizzes/${quiz._id}/results`)}
                   className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-primary-600 transition-all">
                   <Eye size={16} /> View Results
                 </button>
                 <div className="flex gap-2">
                    {quiz.status === 'draft' && (
                      <button 
                        onClick={() => handleStatusChange(quiz._id, 'active')}
                        className="p-3.5 rounded-xl bg-primary-100 text-primary-600 hover:bg-primary-600 hover:text-white transition-all shadow-sm"
                        title="Publish Quiz">
                        <Send size={16} />
                      </button>
                    )}
                    {quiz.status === 'active' && (
                      <button 
                        onClick={() => handleStatusChange(quiz._id, 'closed')}
                        className="p-3.5 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="Close Quiz">
                        <X size={16} />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(quiz._id)}
                      className="p-3.5 rounded-xl bg-slate-100 text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                      <Trash2 size={16} />
                    </button>
                 </div>
               </div>
            </div>
          ))
        )}
      </div>

      {/* Create Quiz Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Create New <span className="text-primary-600">Quiz/Form</span></h2>
              <button 
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:shadow-md transition-all text-slate-400 hover:text-red-500">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateQuiz} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-2">Quiz Title</label>
                  <input 
                    required
                    type="text"
                    value={newQuiz.title}
                    onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                    placeholder="e.g. Mid-Term Software Engineering"
                    className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-500 transition-all outline-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-2">Description</label>
                  <input 
                    type="text"
                    value={newQuiz.description}
                    onChange={(e) => setNewQuiz({...newQuiz, description: e.target.value})}
                    placeholder="Short summary of the quiz..."
                    className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-primary-500 transition-all outline-none font-bold"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Questions <span className="text-sm font-bold bg-primary-100 text-primary-600 px-3 py-1 rounded-full">{newQuiz.questions.length}</span></h3>
                  <button 
                    type="button"
                    onClick={addQuestion}
                    className="flex items-center gap-2 text-primary-600 font-bold text-sm hover:translate-x-1 transition-all">
                    <Plus size={18} /> Add Question
                  </button>
                </div>

                {newQuiz.questions.map((q, qIndex) => (
                  <div key={qIndex} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 relative group">
                    <button 
                      type="button"
                      onClick={() => removeQuestion(qIndex)}
                      className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Question {qIndex + 1}</label>
                      <input 
                        required
                        value={q.questionText}
                        onChange={(e) => updateQuestion(qIndex, 'questionText', e.target.value)}
                        placeholder="Write your question here..."
                        className="w-full px-5 py-3.5 bg-white rounded-xl border-none shadow-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt, oIndex) => (
                        <div key={oIndex} className="relative">
                          <input 
                            required
                            value={opt}
                            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                            placeholder={`Option ${oIndex + 1}`}
                            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border-none shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-300 italic">{String.fromCharCode(65 + oIndex)}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Correct Answer</label>
                       <select 
                         value={q.correctAnswer}
                         onChange={(e) => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
                         className="w-full px-5 py-3 bg-white rounded-xl border-none shadow-sm font-bold text-primary-600 outline-none focus:ring-2 focus:ring-primary-500">
                         <option value="">Select correct option</option>
                         {q.options.map((opt, oIndex) => opt && (
                           <option key={oIndex} value={opt}>{opt}</option>
                         ))}
                       </select>
                    </div>
                  </div>
                ))}
              </div>
            </form>

            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-4">
               <button 
                 type="button"
                 onClick={() => setShowModal(false)}
                 className="px-8 py-3.5 rounded-2xl font-bold text-slate-500 hover:bg-white transition-all uppercase text-xs tracking-widest">
                 Cancel
               </button>
               <button 
                 onClick={handleCreateQuiz}
                 className="px-10 py-3.5 rounded-2xl font-bold bg-primary-600 text-white shadow-xl shadow-primary-500/20 hover:bg-primary-700 hover:-translate-y-0.5 active:scale-95 transition-all uppercase text-xs tracking-[0.2em]">
                 Save Quiz
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
