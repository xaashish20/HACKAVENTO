
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_BOOKS } from '../constants';
import { getBookSummary, chatWithLibrarian } from '../services/geminiService';
import { ChatMessage } from '../types';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const book = MOCK_BOOKS.find(b => b.id === id);
  const [summary, setSummary] = useState<string>("");
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [applyStatus, setApplyStatus] = useState<'none' | 'submitting' | 'success'>('none');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Yo! I'm the IET AI. Need a shortcut to understand "${book?.title}"? Drop your question below.` }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (book) {
      const fetchSummary = async () => {
        setIsLoadingSummary(true);
        const res = await getBookSummary(book.title, book.author);
        setSummary(res);
        setIsLoadingSummary(false);
      };
      fetchSummary();
    }
  }, [book]);

  const handleApplyIssue = () => {
    setApplyStatus('submitting');
    setTimeout(() => setApplyStatus('success'), 1500);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;
    const userMsg: ChatMessage = { role: 'user', text: userInput };
    setChatMessages(prev => [...prev, userMsg]);
    setUserInput("");
    setIsTyping(true);
    const response = await chatWithLibrarian(chatMessages, `User query about book ${book?.title}: ${userInput}`);
    setChatMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  if (!book) return <div className="text-center py-40 text-4xl font-black text-rose-600 pt-32 tracking-tighter italic">RESOURCE_NOT_FOUND</div>;

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 max-w-7xl animate-slide-up">
      <Link to="/browse" className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] mb-12 inline-flex items-center gap-3 hover:text-indigo-400 transition-colors">
        <i className="fas fa-arrow-left"></i> back to browse
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <div className="sticky top-32 space-y-10">
            <div className="bg-slate-900 p-6 rounded-[3.5rem] border border-slate-800 shadow-2xl relative group">
               <img src={book.coverImage} className="w-full rounded-[2.8rem] shadow-2xl mb-10 group-hover:scale-[1.02] transition-transform duration-500" alt={book.title} />
               {applyStatus === 'success' ? (
                  <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-center text-white space-y-3 animate-slide-up shadow-xl shadow-indigo-500/30">
                      <i className="fas fa-check-circle text-5xl mb-2"></i>
                      <p className="font-black text-xl tracking-tighter uppercase italic">Issued Successfully</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">View in your portal</p>
                  </div>
               ) : (
                  <div className="space-y-4 px-2">
                      <button 
                          onClick={handleApplyIssue}
                          disabled={applyStatus === 'submitting'}
                          className="w-full bg-indigo-600 text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50"
                      >
                          {applyStatus === 'submitting' ? 'SYNCHRONIZING...' : 'ISSUE RESOURCE'}
                      </button>
                      <button className="w-full bg-slate-950 text-slate-400 py-6 rounded-[2rem] border border-slate-800 font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-900 transition-all">
                          SAVE FOR LATER
                      </button>
                  </div>
               )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <span className="bg-indigo-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{book.department}</span>
               <span className="text-slate-700 text-xs font-mono font-bold">ID: {book.isbn}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.8] uppercase italic">{book.title}</h1>
            <p className="text-2xl font-black text-indigo-400 tracking-tighter uppercase italic opacity-70">BY {book.author}</p>
          </div>

          <div className="dark-glass p-12 rounded-[4rem] border border-indigo-500/20 text-white relative shadow-2xl">
            <div className="absolute top-0 right-0 p-10 opacity-5">
                <i className="fas fa-brain text-[10rem]"></i>
            </div>
            <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-xs shadow-lg shadow-indigo-500/30">
                  <i className="fas fa-sparkles"></i>
               </div>
               <h3 className="text-xl font-black tracking-[0.2em] uppercase text-indigo-300 italic">Faculty Insight</h3>
            </div>
            {isLoadingSummary ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-white/5 rounded-full w-full"></div>
                <div className="h-4 bg-white/5 rounded-full w-5/6"></div>
                <div className="h-4 bg-white/5 rounded-full w-2/3"></div>
              </div>
            ) : (
              <p className="text-indigo-100/90 text-xl font-bold leading-relaxed italic tracking-tight">
                "{summary}"
              </p>
            )}
          </div>

          <div className="space-y-12">
             <div className="bg-slate-900 p-12 rounded-[4rem] border border-slate-800 shadow-xl">
                <h3 className="text-xs font-black text-slate-500 mb-8 uppercase tracking-[0.4em]">Resource Description</h3>
                <p className="text-slate-400 leading-relaxed font-bold text-lg italic tracking-tight">
                  {book.description} This resource is critical for students in the {book.department} branch. It provides the heavy-duty theoretical groundwork required for advanced research and industry placement.
                </p>
             </div>

             <div className="bg-slate-950 rounded-[4rem] border border-slate-800 overflow-hidden flex flex-col h-[650px] shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
                <div className="bg-slate-900 p-8 text-white border-b border-slate-800 flex justify-between items-center">
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20"><i className="fas fa-headset text-xl"></i></div>
                      <div>
                        <h4 className="font-black text-sm tracking-[0.2em] uppercase italic">IET_Librarian_v2</h4>
                        <p className="text-[10px] text-emerald-500 uppercase font-black tracking-widest flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                           Operational
                        </p>
                      </div>
                   </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth">
                   {chatMessages.map((msg, i) => (
                     <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-[85%] p-6 rounded-[2.5rem] text-sm font-bold leading-relaxed shadow-2xl ${
                         msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none border border-white/10' : 'bg-slate-900 text-slate-300 border border-slate-800 rounded-bl-none'
                       }`}>
                         {msg.text}
                       </div>
                     </div>
                   ))}
                   {isTyping && (
                     <div className="flex justify-start">
                       <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 animate-pulse flex gap-1.5 shadow-xl">
                          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></span>
                          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full opacity-60"></span>
                          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full opacity-30"></span>
                       </div>
                     </div>
                   )}
                </div>

                <form onSubmit={handleSendMessage} className="p-8 border-t border-slate-800 bg-slate-900 flex gap-5">
                   <input 
                     type="text" 
                     value={userInput}
                     onChange={(e) => setUserInput(e.target.value)}
                     placeholder="Type your academic doubt..."
                     className="flex-1 px-10 py-6 bg-slate-950 border border-slate-800 rounded-[2.2rem] focus:ring-2 focus:ring-indigo-500 outline-none font-black text-slate-200 placeholder:text-slate-700 text-sm tracking-tight"
                   />
                   <button type="submit" disabled={isTyping} className="bg-white text-slate-950 w-20 h-20 rounded-[2.2rem] flex items-center justify-center hover:bg-indigo-400 transition-all shadow-2xl active:scale-95">
                      <i className="fas fa-paper-plane text-xl"></i>
                   </button>
                </form>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
