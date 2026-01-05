
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onSave?: (id: string) => void;
  isSaved?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, onSave, isSaved }) => {
  return (
    <div className="bg-slate-900 rounded-[2.2rem] shadow-2xl transition-all duration-500 overflow-hidden group border border-slate-800 flex flex-col h-full relative neon-glow">
      <div className="relative aspect-[3/4] overflow-hidden m-2.5 rounded-[1.8rem]">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition duration-700 ease-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
        
        {/* Student Label Badge */}
        {book.isStudentAuthored && (
          <div className="absolute top-4 left-4 z-20">
             <div className="bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
               <i className="fas fa-graduation-cap"></i>
               Peer Creation
             </div>
          </div>
        )}

        <div className="absolute top-4 right-4">
          <button 
            onClick={(e) => { e.preventDefault(); onSave?.(book.id); }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md transition shadow-2xl border ${isSaved ? 'bg-rose-600 border-rose-500 text-white' : 'bg-slate-950/40 text-white border-white/20 hover:bg-white/10'}`}
          >
            <i className={`fa-${isSaved ? 'solid' : 'regular'} fa-heart text-sm`}></i>
          </button>
        </div>

        <div className="absolute inset-x-4 bottom-4 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
           <Link 
            to={`/book/${book.id}`}
            className="w-full bg-white text-slate-950 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-400 transition-colors text-center block shadow-2xl shadow-indigo-500/20"
          >
            {book.isStudentAuthored ? 'Read Paper' : 'Open Resource'}
          </Link>
        </div>
      </div>

      <div className="p-7 pt-2 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-1">
             <span className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.2em] bg-indigo-500/10 px-2 py-1 rounded w-fit">
              {book.category}
             </span>
             {book.resourceType && (
               <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">{book.resourceType}</span>
             )}
          </div>
          <span className="text-[8px] font-bold text-slate-600 uppercase">VOL {book.year}</span>
        </div>
        <h4 className="font-bold text-slate-100 line-clamp-2 leading-tight mb-2 text-sm group-hover:text-indigo-400 transition-colors uppercase italic">{book.title}</h4>
        <p className={`text-[10px] font-bold uppercase tracking-tighter mt-auto ${book.isStudentAuthored ? 'text-emerald-400' : 'text-slate-500'}`}>
          BY {book.author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
