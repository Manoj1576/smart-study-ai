import React from 'react';
import { Focus, Check, Trash2 } from 'lucide-react';

export default function FloatingTask({ task, onFocus, onComplete, onDelete, index }) {
  // Visual Priority mapping
  let glowClass = "glow-blue";
  if (task.priority === "High") glowClass = "glow-red";
  else if (task.priority === "Medium") glowClass = "glow-yellow";

  const dateStr = new Date(task.deadline).toLocaleString([], {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div 
      className={`relative glass-panel p-6 overflow-hidden animate-fadeSlideIn w-full break-inside-avoid ${glowClass} hover:scale-[1.02] cursor-pointer group`}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={onFocus}
    >
      {/* Background ambient light per card */}
      <div className="absolute -right-10 -top-10 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex justify-between items-start gap-4">
           <h3 className="text-xl font-bold tracking-wide text-white/90 truncate">{task.title}</h3>
           <div className="text-[10px] uppercase font-bold tracking-widest text-white/50 bg-black/40 px-3 py-1 rounded-full whitespace-nowrap border border-white/5">
             {task.subject}
           </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
           <div className="font-mono text-xs text-white/60 flex flex-col">
              <span className="uppercase text-[9px] text-[#00f3ff]/60 tracking-widest mb-1">Deadline Phase</span>
              {dateStr}
           </div>
           
           <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={e => e.stopPropagation()}>
              <button onClick={() => onComplete()} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-[#39ff14]/20 hover:border-[#39ff14]/50 hover:text-[#39ff14] text-white/70 transition-all">
                <Check size={18} />
              </button>
              <button onClick={() => onDelete()} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-[#ff007f]/20 hover:border-[#ff007f]/50 hover:text-[#ff007f] text-white/70 transition-all">
                <Trash2 size={18} />
              </button>
           </div>
        </div>

        <div className="absolute -bottom-4 -left-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
           <Focus size={100} />
        </div>
      </div>
    </div>
  );
}
