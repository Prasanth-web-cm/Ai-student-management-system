import React from 'react';
import { 
  Settings as SettingsIcon, Bell, Shield, 
  Palette, Smartphone, Database, Globe,
  ChevronRight, Save, LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();
  
  const sections = [
    { icon: Bell, title: 'Notifications', desc: 'Manage email and SMS alert preferences for risk triggers.' },
    { icon: Shield, title: 'Privacy & Security', desc: 'Secure your account with 2FA and password management.' },
    { icon: Palette, title: 'Interface Theme', desc: 'Customize your dashboard colors and glassmorphic effects.' },
    { icon: Smartphone, title: 'Mobile Integration', desc: 'Sync your account with mobile push notification devices.' },
    { icon: Database, title: 'Data Management', desc: 'Export your academic logs and interaction history.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 group-hover:bg-blue-50 transition-colors duration-700"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              System Configuration
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Portal Settings</h1>
            <p className="text-slate-500 font-medium max-w-md">Customize your experience and manage global preferences for the AI-Powered Student Management System.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">User Identity</p>
                <p className="text-xl font-black text-slate-900">{user?.name || 'Authorized User'}</p>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{user?.role} Access</p>
             </div>
             <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random&bold=true`} alt="User" />
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {sections.map((section, i) => {
             const Icon = section.icon;
             return (
               <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all duration-500 group flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-6">
                     <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                        <Icon size={24} />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-500">{section.title}</h3>
                        <p className="text-sm font-medium text-slate-400 max-w-sm">{section.desc}</p>
                     </div>
                  </div>
                  <ChevronRight className="text-slate-200 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
               </div>
             )
          })}
        </div>

        <div className="space-y-8">
           <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 italic space-y-6">
              <Globe className="text-blue-500 w-12 h-12" />
              <h3 className="text-xl font-black text-slate-900">Regional Information</h3>
              <div className="space-y-4 text-sm font-bold text-slate-500">
                 <div className="flex justify-between"><span>Timezone</span><span className="text-slate-900 font-black">GMT +5:30</span></div>
                 <div className="flex justify-between"><span>Language</span><span className="text-slate-900 font-black">English (US)</span></div>
                 <div className="flex justify-between"><span>Currency</span><span className="text-slate-900 font-black">INR (₹)</span></div>
              </div>
              <button className="w-full py-4 mt-6 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200">
                 Update Geo-Preferences
              </button>
           </div>

           <div className="bg-red-50 p-10 rounded-[2.5rem] border border-red-100 text-center space-y-6 group">
              <div className="p-4 bg-red-100 text-red-600 rounded-3xl inline-flex group-hover:rotate-12 transition-transform duration-500"><LogOut size={32} /></div>
              <h3 className="text-xl font-black text-red-900">Termination Zone</h3>
              <p className="text-red-700 text-sm font-medium leading-relaxed">Closing your active session will clear all temporary local caches for security.</p>
              <button 
                onClick={logout}
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all active:scale-95 shadow-xl shadow-red-100"
              >
                Immediate Logout
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
