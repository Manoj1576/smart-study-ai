import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Book, Home } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="glass-panel flex justify-between items-center px-8 py-5 rounded-none border-t-0 border-r-0 border-l-0 border-white/10 relative z-50 mb-6 bg-black/50">
      <div className="flex items-center gap-4">
        <BrainCircuit className="text-[#00f3ff] animate-pulse" size={32} />
        <h1 className="text-2xl font-black tracking-[0.2em] text-[#00f3ff] uppercase hidden md:block">NeuroStudy AI</h1>
      </div>
      
      <div className="flex gap-4 md:gap-8 items-center bg-black/60 px-6 py-3 rounded-full border border-white/5">
        <Link to="/" className="text-white/60 hover:text-[#00f3ff] transition-all font-bold uppercase tracking-widest text-xs flex items-center gap-2"><Home size={14}/> Dashboard</Link>
        <span className="text-white/20">|</span>
        <span className="text-[#bc13fe] transition-all font-bold uppercase tracking-widest text-xs flex items-center gap-2"><Book size={14}/> Subject Matrix</span>
      </div>
    </nav>
  );
}
