
import React, { useState } from 'react';
// Added useNavigate to handle internal routing
import { useNavigate } from 'react-router-dom';
import { MOCK_BOOKS } from '../constants';
import BookCard from '../components/BookCard';
import { IssuedBook } from '../types';

const Dashboard: React.FC = () => {
  // Initialize navigate hook
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'issued' | 'saved' | 'apply'>('issued');
  
  const user = {
    name: "Alex Johnson",
    enrollmentNo: "BE/10001/21",
    department: "Computer Engineering",
    semester: "6th Sem",
    issued: [
      { bookId: "1", issueDate: "2023-10-15T10:00:00Z", dueDate: "2023-10-29T10:00:00Z", status: 'overdue', progress: 85 },
      { bookId: "4", issueDate: "2023-11-05T09:00:00Z", dueDate: "2023-11-19T09:00:00Z", status: 'reading', progress: 40 }
    ] as IssuedBook[],
    saved: ["2", "6"]
  };

  const calculateFine = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    if (today <= due) return 0;
    const diffTime = Math.abs(today.getTime() - due.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) * 5;
  };

  const getBookById = (id: string) => MOCK_BOOKS.find(b => b.id === id);

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 max-w-7xl animate-slide-up">
      {/* Profile Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        <div className="lg:col-span-8 bg-indigo-600 rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-[0_25px_60px_rgba(79,70,229,0.3)]">
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><i className="fas fa-sparkles text-[15rem]"></i></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center gap-8 mb-10">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center text-4xl font-black border border-white/20 shadow-inner">AJ</div>
              <div>
                <h1 className="text-5xl font-black tracking-tighter mb-2 italic">Hi, {user.name.split(' ')[0]}!</h1>
                <p className="text-indigo-100/60 font-black uppercase text-[10px] tracking-[0.4em]">{user.enrollmentNo} • {user.department}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
               <span className="bg-slate-950/20 backdrop-blur-md px-6 py-2.5 rounded-2xl text-[10px] font-black tracking-widest border border-white/10">SEM {user.semester.toUpperCase()}</span>
               <span className="bg-slate-950/20 backdrop-blur-md px-6 py-2.5 rounded-2xl text-[10px] font-black tracking-widest border border-white/10">GPA 8.92</span>
               <span className="bg-emerald-400 text-emerald-950 px-6 py-2.5 rounded-2xl text-[10px] font-black tracking-widest uppercase">Member Active</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 grid grid-rows-2 gap-6">
           <div className="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 shadow-xl flex flex-col justify-between group hover:border-indigo-500/50 transition-colors">
              <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em]">Loan History</span>
              <div className="flex items-end justify-between">
                 <span className="text-6xl font-black text-indigo-400 italic">{user.issued.length}</span>
                 <i className="fas fa-book-reader text-slate-800 text-5xl group-hover:text-indigo-500/20 transition-colors"></i>
              </div>
           </div>
           <div className="bg-rose-950/40 rounded-[3rem] p-10 border border-rose-900/40 shadow-xl flex flex-col justify-between group hover:bg-rose-900/60 transition-colors">
              <span className="text-rose-400 font-black text-[10px] uppercase tracking-[0.3em]">Accumulated Fine</span>
              <div className="flex items-end justify-between">
                 <span className="text-6xl font-black text-rose-500 italic">₹{user.issued.reduce((acc, curr) => acc + calculateFine(curr.dueDate), 0)}</span>
                 <i className="fas fa-receipt text-rose-900/20 text-5xl"></i>
              </div>
           </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 p-2 bg-slate-900 border border-slate-800 rounded-3xl w-fit mx-auto mb-20 shadow-2xl">
         {['issued', 'apply', 'saved'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-12 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
            >
               {tab}
            </button>
         ))}
      </div>

      <div className="min-h-[500px]">
        {activeTab === 'issued' && (
          <div className="grid gap-6">
             {user.issued.map(issue => {
                const book = getBookById(issue.bookId);
                const fine = calculateFine(issue.dueDate);
                return (
                   <div key={issue.bookId} className="bg-slate-900 p-8 rounded-[3rem] border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8 hover:bg-slate-800/50 transition-all group">
                      <div className="flex items-center gap-8 w-full lg:w-auto">
                         <img src={book?.coverImage} className="w-20 h-28 rounded-2xl object-cover shadow-2xl border border-white/5" alt="" />
                         <div>
                            <h4 className="text-2xl font-black text-white leading-tight mb-2 uppercase italic tracking-tighter">{book?.title}</h4>
                            <p className="text-sm text-slate-500 font-bold mb-4 uppercase tracking-widest">BY {book?.author}</p>
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${fine > 0 ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]' : 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'}`}>
                                {fine > 0 ? 'OVERDUE ITEM' : 'CURRENTLY READING'}
                            </span>
                         </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-12 w-full lg:w-auto p-4 lg:p-0">
                         <div className="text-center">
                            <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em] mb-2">DEADLINE</p>
                            <p className="font-bold text-slate-300 text-sm">{new Date(issue.dueDate).toLocaleDateString()}</p>
                         </div>
                         <div className="text-center">
                            <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em] mb-2">PENALTY</p>
                            <p className={`font-black text-lg ${fine > 0 ? 'text-rose-500' : 'text-slate-700'}`}>₹{fine}</p>
                         </div>
                         <div className="flex-1 lg:w-64 min-w-[200px]">
                            <div className="flex justify-between mb-2">
                               <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em]">Reading Progress</p>
                               <span className="text-[9px] font-black text-indigo-400">{issue.progress}%</span>
                            </div>
                            <div className="h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                               <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]" style={{width: `${issue.progress}%`}}></div>
                            </div>
                         </div>
                         <button className="bg-white text-slate-950 w-full lg:w-auto px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-400 transition-colors shadow-2xl">
                            RETURN
                         </button>
                      </div>
                   </div>
                );
             })}
          </div>
        )}

        {activeTab === 'apply' && (
           <div className="bg-slate-900 rounded-[4rem] border-2 border-dashed border-slate-800 p-20 text-center animate-slide-up">
              <div className="max-w-lg mx-auto space-y-10">
                 <div className="w-24 h-24 bg-indigo-600/10 text-indigo-500 rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto shadow-inner border border-indigo-500/20">
                    <i className="fas fa-plus"></i>
                 </div>
                 <div>
                   <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic mb-4">Request Resources</h3>
                   <p className="text-slate-500 font-bold leading-relaxed uppercase text-xs tracking-widest">You have 3 slots remaining in your semester quota. Head to the catalog to issue new textbooks.</p>
                 </div>
                 <button onClick={() => navigate('/browse')} className="bg-indigo-600 text-white px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-widest shadow-[0_20px_40px_rgba(79,70,229,0.4)] hover:scale-105 transition-all">
                    OPEN REPOSITORY
                 </button>
              </div>
           </div>
        )}

        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {user.saved.map(id => (
              <BookCard key={id} book={getBookById(id)!} isSaved={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
