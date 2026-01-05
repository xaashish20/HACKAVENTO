
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import BookDetails from './pages/BookDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/40">
        <div className="bg-glow-spot top-[-100px] left-[-100px]"></div>
        <div className="bg-glow-spot bottom-0 right-0" style={{ animationDelay: '2s' }}></div>
        
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </main>
        
        <footer className="bg-slate-900/50 border-t border-slate-800 py-16 mt-20 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2 tracking-tighter">
                  <i className="fas fa-university text-indigo-500"></i> IET DAVV DIGITAL
                </h2>
                <p className="max-w-md leading-relaxed text-sm text-slate-400 font-medium">
                  The official digital hub for IET DAVV Indore. Specialized B.Tech curriculum support with AI-driven resource discovery.
                </p>
                <div className="mt-6 flex gap-4 text-xl">
                  <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors"><i className="fab fa-facebook"></i></a>
                  <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Resources</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li><a href="https://www.ietdavv.edu.in/" target="_blank" className="hover:text-indigo-400 transition-colors">IET Website</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">DAVV Portal</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Syllabus 2024</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Exam Papers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Connect</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Librarian Desk</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Support Chat</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Library Rules</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">API Docs</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-slate-500">
              <p>&copy; {new Date().getFullYear()} IET DAVV LIBRARY • INDORE</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition">Privacy</a>
                <a href="#" className="hover:text-white transition">Terms</a>
                <a href="#" className="hover:text-white transition">GOMP</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
