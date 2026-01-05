
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const isActive = (path: string) => location.pathname === path ? "text-indigo-400 font-black" : "text-slate-400 hover:text-indigo-400 transition-colors";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto dark-glass rounded-2xl px-6 py-4 flex justify-between items-center shadow-2xl shadow-black/50 ring-1 ring-white/5">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)] group-hover:rotate-12 transition-transform duration-300">
            <i className="fas fa-bolt"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">IET DIGITAL</span>
            <span className="text-[8px] uppercase font-bold text-slate-500 tracking-[0.3em]">Indore • 2.0</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-[11px] font-black uppercase tracking-widest">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/browse" className={isActive('/browse')}>Catalog</Link>
          <Link to="/dashboard" className={isActive('/dashboard')}>Portal</Link>
          <Link to="/admin" className={isActive('/admin')}>Admin</Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-black text-slate-200 uppercase tracking-tighter">Alex Johnson</span>
                <span className="text-[9px] text-indigo-500 font-bold">BE/10001/21</span>
              </div>
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg border border-white/10 hover:scale-105 transition-transform cursor-pointer">
                AJ
              </div>
              <button onClick={() => setIsLoggedIn(false)} className="text-slate-500 hover:text-red-500 transition-colors p-2">
                <i className="fas fa-power-off text-sm"></i>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition shadow-xl shadow-indigo-500/20"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
