import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AttendanceHeatmap({ studentId }) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
  // Mock data for heatmap - In real app, fetch from backend/attendance
  const attendanceData = {
    '2026-04-01': 'Present',
    '2026-04-02': 'Present',
    '2026-04-03': 'Absent',
    '2026-04-06': 'Present',
    '2026-04-07': 'Present',
    '2026-04-08': 'Present',
    '2026-04-09': 'Absent',
    '2026-04-10': 'Present',
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const status = attendanceData[dateStr];
    
    let bgColor = 'bg-slate-100';
    if (status === 'Present') bgColor = 'bg-green-500';
    if (status === 'Absent') bgColor = 'bg-red-500';

    days.push(
      <div 
        key={d} 
        className={`h-10 w-10 md:h-12 md:w-12 rounded-xl flex items-center justify-center text-xs font-bold transition-all hover:scale-110 cursor-pointer
          ${status ? 'text-white' : 'text-slate-400'} ${bgColor}`}
        title={status || 'No data'}
      >
        {d}
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <CalendarIcon className="text-blue-600" size={20} />
          Attendance Heatmap
        </h3>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl">
          <button 
            onClick={() => setCurrentMonth(new Date(year, month - 1))}
            className="p-2 hover:bg-white rounded-xl transition-all shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-black uppercase tracking-tight text-slate-600 min-w-[100px] text-center">
            {monthName} {year}
          </span>
          <button 
            onClick={() => setCurrentMonth(new Date(year, month + 1))}
            className="p-2 hover:bg-white rounded-xl transition-all shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
        {days}
      </div>

      <div className="flex items-center gap-6 mt-8 p-4 bg-slate-50 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs font-bold text-slate-500">Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-xs font-bold text-slate-500">Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
          <span className="text-xs font-bold text-slate-500">No Data</span>
        </div>
      </div>
    </div>
  );
}
