
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_BOOKS, CATEGORIES } from '../constants';
import BookCard from '../components/BookCard';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const studentBooks = MOCK_BOOKS.filter(b => b.isStudentAuthored);

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 relative animate-slide-up">
        <div className="mesh-gradient-dark absolute inset-0 -z-10 rounded-[4rem] overflow-hidden m-4 border border-white/5 shadow-2xl">
           <div className="absolute top-[-20%] right-[-10%] opacity-20">
              <i className="fas fa-atom text-[30rem] text-indigo-400 animate-spin-slow"></i>
           </div>
        </div>

        <div className="text-center py-24 px-6 relative">
          <div className="inline-flex items-center gap-3 bg-slate-900/40 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 text-indigo-400 text-[10px] font-black tracking-widest mb-10 animate-pulse">
             <span className="flex h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]"></span>
             IET DAVV DIGITAL REPOSITORY v2.0
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.8] uppercase">
            Unlock <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-rose-400">ENGINEERING</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-16 font-semibold tracking-tight">
            The hyper-digital archive for DAVV B.Tech students. <br/>
            Curated content. AI-enhanced. Student-first.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex dark-glass p-2.5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all focus-within:ring-2 ring-indigo-500/50 group">
            <input 
              type="text" 
              placeholder="What's on the syllabus today?" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-8 py-5 bg-transparent text-white placeholder:text-slate-600 focus:outline-none text-lg font-bold"
            />
            <button className="bg-indigo-600 text-white px-10 rounded-2xl font-black hover:bg-indigo-700 transition-all flex items-center gap-3 shadow-xl hover:shadow-indigo-500/40 active:scale-95">
              <i className="fas fa-bolt"></i>
              <span>SEARCH</span>
            </button>
          </form>

          <div className="mt-20 flex justify-center gap-16 opacity-30">
             <div className="animate-float" style={{animationDelay: '0s'}}><i className="fas fa-terminal text-5xl text-indigo-400"></i></div>
             <div className="animate-float" style={{animationDelay: '1s'}}><i className="fas fa-microchip text-5xl text-violet-400"></i></div>
             <div className="animate-float" style={{animationDelay: '2s'}}><i className="fas fa-code-branch text-5xl text-indigo-400"></i></div>
             <div className="animate-float" style={{animationDelay: '3s'}}><i className="fas fa-satellite-dish text-5xl text-rose-400"></i></div>
          </div>
        </div>
      </section>

      {/* Campus Creations (Peer Work) - New Section */}
      <section className="container mx-auto py-20 px-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-[4rem] p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12"><i className="fas fa-graduation-cap text-[15rem] text-emerald-400"></i></div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 relative z-10">
            <div>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic mb-2">Campus Creations</h2>
              <p className="text-emerald-400/80 font-black uppercase tracking-[0.2em] text-[10px]">Research & Projects by IET DAVV Students</p>
            </div>
            <button 
              onClick={() => navigate('/browse?studentOnly=true')}
              className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all"
            >
              View Student Hub
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {studentBooks.slice(0, 3).map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Branch Grid */}
      <section className="container mx-auto py-32 px-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase italic">THE CORE DEPTS.</h2>
            <p className="text-slate-500 font-bold text-lg leading-relaxed">Hyper-targeted resource bricks for every specialisation.</p>
          </div>
          <div className="flex gap-4 p-2 bg-slate-900 rounded-full border border-slate-800">
             <div className="w-14 h-14 rounded-full border border-slate-800 flex items-center justify-center text-slate-600 hover:text-white transition cursor-pointer">
                <i className="fas fa-arrow-left text-sm"></i>
             </div>
             <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 cursor-pointer hover:bg-indigo-500 transition">
                <i className="fas fa-arrow-right text-sm"></i>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <div 
              key={cat.name}
              onClick={() => navigate(`/browse?dept=${encodeURIComponent(cat.name)}`)}
              className={`bento-card bg-slate-900 p-10 rounded-[3rem] border border-slate-800 flex flex-col items-center text-center cursor-pointer group hover:bg-indigo-600 transition-colors duration-500 ${idx % 2 !== 0 ? 'md:translate-y-8' : ''}`}
            >
              <div className={`text-5xl mb-8 group-hover:text-white transition-colors duration-500 ${cat.color} opacity-80`}>
                {cat.icon}
              </div>
              <h4 className="font-black text-slate-100 text-[10px] leading-tight tracking-[0.2em] uppercase mb-4 group-hover:text-white">{cat.name}</h4>
              <div className="h-px w-8 bg-slate-800 group-hover:bg-white/30 mb-4 transition-colors"></div>
              <p className="text-[9px] text-slate-500 font-black group-hover:text-white/80">CORE STACK</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-slate-900 rounded-[5rem] mx-4 py-32 border border-white/5 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="absolute top-[-50%] left-[-20%] w-[140%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.08),transparent_40%)] pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-6">
            <div>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic mb-2">REQUIRED READING</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Standard references used in DAVV end-sems</p>
            </div>
            <button onClick={() => navigate('/browse')} className="text-indigo-400 font-black text-xs tracking-widest uppercase hover:text-white transition-colors">
              VIEW FULL CATALOG <i className="fas fa-chevron-right ml-2"></i>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {MOCK_BOOKS.filter(b => b.isFeatured && !b.isStudentAuthored).map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Bot Reveal */}
      <section className="container mx-auto py-40 px-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 rounded-[4rem] p-12 md:p-24 border border-indigo-500/20 shadow-2xl flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/20 transition-all"></div>
           
           <div className="flex-1 space-y-10 relative z-10">
              <div className="inline-flex items-center gap-3 bg-indigo-500 px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg shadow-indigo-500/30">
                 <i className="fas fa-wand-magic-sparkles"></i>
                 Gemini-Powered Engine
              </div>
              <h3 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter text-white uppercase italic">
                Ask your <br/> <span className="text-indigo-400">Digital Senior.</span>
              </h3>
              <p className="text-slate-400 text-xl font-semibold leading-relaxed max-w-xl">
                IET-Assistant isn't just a bot. It's an AI trained on DAVV's engineering syllabus to answer specific course doubts in seconds.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                 <button className="bg-white text-slate-950 px-10 py-5 rounded-3xl font-black hover:bg-indigo-400 transition-all flex items-center gap-4 text-sm shadow-2xl">
                    <i className="fas fa-comment-dots"></i>
                    START CHATTING
                 </button>
                 <button className="px-10 py-5 rounded-3xl border border-white/10 font-black text-sm text-white hover:bg-white/5 transition-all">
                    Syllabus Coverage
                 </button>
              </div>
           </div>

           <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 dark-glass rounded-[4rem] border border-indigo-500/30 flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform duration-700 animate-float">
                 <i className="fas fa-brain text-9xl text-indigo-500/50 drop-shadow-[0_0_30px_rgba(99,102,241,0.4)]"></i>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-950 rounded-3xl border border-slate-800 flex items-center justify-center text-3xl shadow-2xl">
                 <i className="fas fa-terminal text-indigo-400"></i>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
