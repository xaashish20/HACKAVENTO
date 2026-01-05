
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_BOOKS, CATEGORIES } from '../constants';
import BookCard from '../components/BookCard';
import { Department } from '../types';

const Browse: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredBooks, setFilteredBooks] = useState(MOCK_BOOKS);
  const [selectedDept, setSelectedDept] = useState<string | null>(searchParams.get('dept'));
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
  const [studentOnly, setStudentOnly] = useState(searchParams.get('studentOnly') === 'true');

  useEffect(() => {
    let result = MOCK_BOOKS;
    const q = searchParams.get('q')?.toLowerCase();
    const dept = searchParams.get('dept');
    const sOnly = searchParams.get('studentOnly') === 'true';

    if (q) {
      result = result.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.author.toLowerCase().includes(q) || 
        b.isbn.toLowerCase().includes(q)
      );
    }

    if (dept) {
      result = result.filter(b => b.department === dept);
    }

    if (sOnly) {
      result = result.filter(b => b.isStudentAuthored);
    }

    setFilteredBooks(result);
    setStudentOnly(sOnly);
  }, [searchParams]);

  const toggleDept = (dept: string) => {
    const newVal = selectedDept === dept ? null : dept;
    setSelectedDept(newVal);
    if (newVal) {
      searchParams.set('dept', newVal);
    } else {
      searchParams.delete('dept');
    }
    setSearchParams(searchParams);
  };

  const toggleStudentFilter = () => {
    const newVal = !studentOnly;
    setStudentOnly(newVal);
    if (newVal) {
      searchParams.set('studentOnly', 'true');
    } else {
      searchParams.delete('studentOnly');
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val) {
      searchParams.set('q', val);
    } else {
      searchParams.delete('q');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 flex flex-col md:flex-row gap-12 animate-slide-up">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-80 space-y-12">
        <div className="dark-glass p-8 rounded-[2.5rem] border border-slate-800">
          <h3 className="font-black text-white mb-8 flex items-center gap-3 uppercase tracking-widest text-xs">
            <i className="fas fa-sliders text-indigo-400"></i> Control Panel
          </h3>
          
          <div className="space-y-6">
            <div>
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Content Source</h4>
               <button 
                onClick={toggleStudentFilter}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${studentOnly ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
               >
                  <span className="text-xs font-bold">Campus Creations</span>
                  <i className={`fas ${studentOnly ? 'fa-check-circle' : 'fa-graduation-cap opacity-40'}`}></i>
               </button>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Engineering Stream</h4>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => toggleDept(cat.name)}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all border ${
                      selectedDept === cat.name 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                      : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dark-glass p-8 rounded-[2.5rem] border border-slate-800">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Resource Type</h4>
           <div className="space-y-4">
              {['Books', 'Articles', 'Research Papers', 'Lab Reports'].map(type => (
                <label key={type} className="flex items-center gap-4 text-xs font-bold text-slate-400 cursor-pointer group">
                  <div className="w-5 h-5 rounded-md border border-slate-700 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                    <input type="checkbox" className="hidden peer" />
                    <div className="w-2.5 h-2.5 bg-indigo-500 rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="group-hover:text-slate-200 transition-colors">{type}</span>
                </label>
              ))}
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <span className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></span>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Repository Access</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              {searchQuery ? `"${searchQuery}"` : selectedDept ? selectedDept : studentOnly ? "Student Hub" : "Global Catalog"}
            </h2>
            <p className="text-slate-500 font-bold mt-2 uppercase text-[10px] tracking-widest">{filteredBooks.length} High-Value Resources Available</p>
          </div>
          
          <div className="relative group max-w-md w-full">
            <input 
              type="text" 
              placeholder="Search by title, peer name or ISBN..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-slate-900 border border-slate-800 text-white pl-14 pr-6 py-5 rounded-[1.8rem] focus:ring-2 ring-indigo-500/50 outline-none font-bold text-sm transition-all shadow-2xl"
            />
            <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors"></i>
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-900/50 rounded-[4rem] border-2 border-dashed border-slate-800">
            <div className="w-24 h-24 bg-slate-950 rounded-[2.5rem] flex items-center justify-center text-4xl text-slate-800 mx-auto mb-8 border border-slate-800">
              <i className="fas fa-book-open"></i>
            </div>
            <h3 className="text-2xl font-black text-slate-500 uppercase italic tracking-tighter">Repository Empty</h3>
            <p className="text-slate-600 font-bold uppercase text-[10px] tracking-widest mt-2">Try relaxing your clearance filters</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedDept(null); setSearchParams({}); }}
              className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20"
            >
              Reset Clearance
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Browse;
