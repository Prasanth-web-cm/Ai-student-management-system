import React from 'react';

export default function Home() {
  return (
    <div className="space-y-6 fade-in">
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="z-10 max-w-lg">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Welcome to the Future of <span className="text-primary-600">Education</span></h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            The complete Student Management System platform. Seamlessly tracking attendance, marks, and overall performance in one unified advanced dashboard.
          </p>
        </div>
        <div className="hidden md:block z-10">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400" 
            alt="Students" 
            className="rounded-2xl shadow-xl h-48 w-64 object-cover transform rotate-2 hover:rotate-0 transition-transform duration-500" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-800">For Students</h3>
          <p className="text-slate-600">Access your attendance, marks, and submit forms seamlessly with just a few clicks.</p>
        </div>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-green-50 text-green-600 flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-800">For Faculty</h3>
          <p className="text-slate-600">Manage student records effortlessly, mark attendance, and evaluate performance in real-time.</p>
        </div>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-800">Administration</h3>
          <p className="text-slate-600">Complete control over the institution's data, operations, and academic tracking.</p>
        </div>
      </div>
    </div>
  );
}
