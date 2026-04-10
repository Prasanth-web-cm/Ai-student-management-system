import React from 'react';
import { Building2, Award, Zap, ShieldCheck, Target, Layers } from 'lucide-react';

export default function DepartmentInfo() {
  const highlights = [
     { icon: Award, title: 'Accreditation', text: 'NBA Accredited Grade A+ Engineering Program since 2018.' },
     { icon: Zap, title: 'AI Research', text: 'Leading national research in academic performance prediction.' },
     { icon: ShieldCheck, title: 'Placement Record', text: '95% placement record in Fortune 500 tech corporations.' },
     { icon: Layers, title: 'Infrastructure', text: 'State-of-the-art GPU clusters and high-speed campus networks.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-slate-900 text-white rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 transform rotate-12 opacity-10 group-hover:rotate-0 transition-transform duration-700"><Building2 size={240} /></div>
        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-widest border border-blue-500/30">
              Department of Computer Science
            </div>
            <h1 className="text-5xl font-black tracking-tight leading-tight">Visionary Excellence in <span className="text-blue-400">Technology</span></h1>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">To be a globally recognized center of excellence in computer science education and research, fostering innovation and ethical leadership in the digital era.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-white/5 rounded-3xl backdrop-blur-xl border border-white/10 text-center group-hover:bg-white/10 transition-colors">
               <p className="text-4xl font-black text-blue-400 mb-1">12+</p>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Global Partners</p>
             </div>
             <div className="p-8 bg-white/5 rounded-3xl backdrop-blur-xl border border-white/10 text-center group-hover:bg-white/10 transition-colors">
               <p className="text-4xl font-black text-green-400 mb-1">450+</p>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Active Research</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {highlights.map((h, i) => {
          const Icon = h.icon;
          return (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <Icon size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{h.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{h.text}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
           <h3 className="text-2xl font-black text-slate-900 flex items-center gap-4">
             <div className="p-2 bg-blue-100 rounded-xl"><Target className="text-blue-600" /></div>
             Departmental Mission
           </h3>
           <ul className="space-y-4">
             {[
               'Deliver rigorous academic programs that blend theoretical foundations with practical expertise.',
               'Cultivate a research-oriented ecosystem where students engage in solving real-world challenges.',
               'Foster institutional collaborations with industry leaders to bridges the gap between academia and professional life.',
               'Instill a sense of social responsibility and professional ethics in our future tech leaders.'
             ].map((item, i) => (
               <li key={i} className="flex gap-4 group">
                 <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></div>
                 <p className="text-slate-600 font-medium leading-relaxed">{item}</p>
               </li>
             ))}
           </ul>
        </div>

        <div className="bg-blue-50 p-10 rounded-[2.5rem] border border-blue-100 space-y-6 flex flex-col justify-center text-center items-center">
           <Zap className="text-blue-600 w-16 h-16 mb-4 animate-bounce" />
           <h3 className="text-3xl font-black text-blue-900 tracking-tight">AI-Powered Campus</h3>
           <p className="text-blue-800 font-medium leading-relaxed max-w-md">The Department is home to the SMS portal you're currently using, representing our commitment to student-centric tech innovation.</p>
           <div className="pt-6 flex gap-4">
             <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">Explore Innovations</button>
             <button className="px-8 py-3 bg-white text-blue-600 rounded-2xl font-black border border-blue-100 hover:bg-blue-100 transition-all active:scale-95">Departmental Wiki</button>
           </div>
        </div>
      </div>
    </div>
  );
}
