import React from 'react';
import { Mail, Phone, MapPin, GraduationCap, Github, Linkedin, ExternalLink } from 'lucide-react';

export default function FacultyDetails() {
  const facultyList = [
    { name: 'Dr. Sarah Wilson', role: 'Head of Department', dept: 'Computer Science', email: 'sarah.w@uniedu.com', phone: '123-456-7890', room: 'B-201', research: 'Distributed Systems' },
    { name: 'Prof. Michael Chen', role: 'Associate Professor', dept: 'CS - ML Specialization', email: 'm.chen@uniedu.com', phone: '123-456-7891', room: 'B-204', research: 'Machine Learning Ops' },
    { name: 'Dr. Emily Brown', role: 'Assistant Professor', dept: 'Information Tech', email: 'emily.b@uniedu.com', phone: '123-456-7892', room: 'B-208', research: 'Cyber Security' },
    { name: 'Prof. James Lee', role: 'Lecturer', dept: 'Computer Science', email: 'j.lee@uniedu.com', phone: '123-456-7893', room: 'B-210', research: 'Digital Ethics' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 group-hover:bg-indigo-100 transition-colors duration-700"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest">
              Professional Mentorship
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Faculty Directory</h1>
            <p className="text-slate-500 font-medium max-w-md">Connect with your subject experts and research mentors for guidance on projects and career pathing.</p>
          </div>
          <div className="bg-indigo-600 text-white p-6 rounded-[2rem] shadow-xl flex items-center gap-6 group hover:scale-105 transition-transform duration-500">
             <div className="p-3 bg-white/20 rounded-2xl"><GraduationCap size={32} /></div>
             <div>
               <p className="text-xs font-black text-indigo-100 uppercase tracking-widest">Mentor Count</p>
               <p className="text-3xl font-black">{facultyList.length} Active PhDs</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {facultyList.map((f, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 relative group overflow-hidden">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
             <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${f.name}&background=6366f1&color=fff&size=128&bold=true`} 
                      alt={f.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-8 flex gap-3">
                    <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-slate-100 hover:text-indigo-600 cursor-pointer transition-all"><Github size={18} /></div>
                    <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-slate-100 hover:text-blue-600 cursor-pointer transition-all"><Linkedin size={18} /></div>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                       {f.name}
                       <ExternalLink size={16} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                    </h3>
                    <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest">{f.role}</p>
                    <p className="text-slate-400 font-medium text-sm">{f.dept}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-slate-500 group-hover:text-slate-700 transition-colors">
                      <Mail size={16} className="text-slate-300" />
                      <span className="text-xs font-bold leading-none">{f.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 group-hover:text-slate-700 transition-colors">
                      <Phone size={16} className="text-slate-300" />
                      <span className="text-xs font-bold leading-none">{f.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 group-hover:text-slate-700 transition-colors">
                      <MapPin size={16} className="text-slate-300" />
                      <span className="text-xs font-bold leading-none">Office {f.room}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-50">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Core Research Domain</p>
                    <div className="inline-flex py-2 px-6 rounded-2xl bg-indigo-50 text-indigo-600 text-xs font-black group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      {f.research}
                    </div>
                  </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
