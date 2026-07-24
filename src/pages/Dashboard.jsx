import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Book, Plus, Trash2, Cpu, Activity, Clock } from 'lucide-react';

export default function Dashboard({ subjects, addSubject, deleteSubject }) {
  const [subName, setSubName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [workflowState, setWorkflowState] = useState(null); // 'analyzing' | 'done'

  const handleAdd = (e) => {
    e.preventDefault();
    if(subName.trim()) {
      addSubject(subName.trim());
      setSubName('');
    }
  };

  const safeSubjects = subjects || [];
  
  const generateWorkflowPlan = () => {
    setModalOpen(true);
    setWorkflowState('analyzing');
    setTimeout(() => {
      setWorkflowState('done');
    }, 2000); // simulate heavy algorithmic planning
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-8 pb-32">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold text-[#00f3ff] tracking-wider drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]">Subject Matrix</h1>
        <p className="text-gray-400">Initialize domains. Expand variables inside each node context.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full">
         <form onSubmit={handleAdd} className="glass-panel p-6 flex flex-col sm:flex-row gap-4 items-center flex-1 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-2xl shadow-[0_0_20px_rgba(0,243,255,0.05)] transform-gpu hover:scale-[1.01] transition-transform">
           <input 
             type="text" 
             value={subName} 
             onChange={e => setSubName(e.target.value)} 
             className="flex-1 bg-black/40 border border-[#00f3ff]/30 px-5 py-3 rounded-xl focus:border-[#00f3ff] focus:shadow-[0_0_15px_rgba(0,243,255,0.4)] focus:outline-none transition-all text-white placeholder-gray-500 w-full" 
             placeholder="New Domain Designation (e.g. Advanced Maths)" 
           />
           <button type="submit" className="bg-[#00f3ff] hover:bg-[#00c2cc] text-black font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all w-full sm:w-auto h-[50px] shadow-[0_0_15px_rgba(0,243,255,0.3)]">
             <Plus size={20} /> INITIATE SYNC
           </button>
         </form>

         {/* New Feature: Global Workflow Analyzer */}
         <div onClick={generateWorkflowPlan} className="glass-panel p-6 flex items-center justify-between gap-6 shrink-0 lg:w-96 cursor-pointer hover:border-[#39ff14]/70 hover:shadow-[0_0_25px_rgba(57,255,20,0.3)] transition-all bg-black/40 border border-[#39ff14]/30 transform-gpu hover:-translate-y-1">
            <div className="flex flex-col">
              <span className="text-[#39ff14] font-black tracking-widest uppercase mb-1">Global AI Workflow</span>
              <span className="text-sm text-gray-400">Synthesize total project map</span>
            </div>
            <Activity size={32} className="text-[#39ff14] animate-pulse" />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[1000px]">
        {safeSubjects.map(sub => (
          <div key={sub.id} className="relative group transform-gpu transition-transform duration-500 hover:rotate-x-2 hover:translate-z-10 hover:rotate-y-[-2deg]">
            <Link to={`/subject/${sub.id}`} className="block glass-panel p-6 h-full border border-white/10 hover:border-[#bc13fe] shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(188,19,254,0.3)] transition-all bg-[#010914]/60 backdrop-blur-xl rounded-2xl relative overflow-hidden">
              {/* 3D background lighting effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#bc13fe]/20 rounded-full blur-3xl group-hover:scale-150 transition-all pointer-events-none" />

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#bc13fe]/40 to-transparent flex items-center justify-center text-[#bc13fe] border border-[#bc13fe]/30">
                  <Book size={24} />
                </div>
                <span className="text-[10px] font-black px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 tracking-widest">{(sub.topics || []).length} NODE{(sub.topics || []).length !== 1 ? 'S' : ''}</span>
              </div>
              <h2 className="text-2xl font-black text-white relative z-10">{sub.name}</h2>
              <div className="w-full h-px bg-gradient-to-r from-white/20 to-transparent my-3"></div>
              <p className="text-sm text-[#00f3ff]/60 uppercase tracking-wider relative z-10 font-bold">Deep dive required • AI Ready</p>
            </Link>
            <button 
              onClick={(e) => { e.preventDefault(); deleteSubject(sub.id); }} 
              className="absolute -top-3 -right-3 p-3 bg-black/80 text-red-500 hover:bg-red-500 hover:text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all border border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.5)] z-20"
              title="Purge Domain"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {safeSubjects.length === 0 && (
          <div className="col-span-full py-24 text-center text-gray-500 border-2 border-dashed border-[#00f3ff]/20 rounded-2xl glass-panel bg-transparent transform-gpu hover:scale-[1.01] transition-transform">
             <Cpu size={56} className="mx-auto mb-6 text-[#00f3ff]/50 animate-pulse" />
             <h3 className="text-2xl font-bold uppercase tracking-widest text-white/80">Matrix Empty</h3>
             <p className="text-md mt-2 tracking-wide font-mono">Initialize your first subject architecture above.</p>
          </div>
        )}
      </div>

      {/* Global AI Planner Output Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
             <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} className="max-w-3xl w-full glass-panel p-10 border border-[#39ff14]/40 shadow-[0_0_50px_rgba(57,255,20,0.2)] flex flex-col items-center">
                
                {workflowState === 'analyzing' ? (
                  <div className="flex flex-col items-center gap-6 py-12">
                     <div className="relative">
                        <Activity size={80} className="text-[#39ff14]" />
                        <div className="absolute inset-0 bg-[#39ff14] blur-2xl opacity-40 animate-pulse" />
                     </div>
                     <h3 className="text-2xl font-black hologram-text tracking-[0.2em] transform-gpu">CALCULATING ALGORITHMIC TIMELINE</h3>
                     <p className="text-gray-400 font-mono">Simulating complex load balancing across {safeSubjects.length} domains...</p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col">
                     <h3 className="text-3xl font-black text-[#39ff14] mb-6 flex items-center gap-3"><Clock /> Global Project Architecture</h3>
                     
                     {safeSubjects.length === 0 ? (
                       <p className="text-red-400/80 mb-6 font-mono p-4 bg-red-500/10 rounded-xl border border-red-500/30">Insufficient node parameter context. Formulate subjects to map timeline.</p>
                     ) : (
                       <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto pr-2">
                         {safeSubjects.map((s, i) => (
                           <div key={i} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                 <div className="w-4 h-4 rounded-full bg-[#39ff14] shadow-[0_0_10px_#39ff14]" />
                                 <div className="w-0.5 grow bg-gradient-to-b from-[#39ff14]/50 to-transparent min-h-[30px]" />
                              </div>
                              <div className="pb-6">
                                 <h4 className="text-xl font-bold text-white mb-2">Phase {i+1}: Synthesize [{s.name}]</h4>
                                 <p className="text-gray-400 text-sm leading-relaxed">
                                   Allocate primary neural load to completing the {(s.topics || []).length} registered topics within this domain constraint. Ensure material extraction sequences are fully executed.
                                 </p>
                              </div>
                           </div>
                         ))}
                       </div>
                     )}

                     <button onClick={() => setModalOpen(false)} className="mt-8 bg-black/60 border border-white/20 hover:border-white/60 px-6 py-3 rounded-xl transition-all self-end font-bold tracking-widest text-sm text-gray-300 hover:text-white">CLOSE MATRIX</button>
                  </div>
                )}
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
