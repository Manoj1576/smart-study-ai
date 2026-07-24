import React from 'react';
import { Cpu } from 'lucide-react';

export default function SuggestionAI({ message }) {
  if (!message) return null;

  return (
    <div className="glass-panel border-[#00f3ff]/40 p-5 relative overflow-hidden animate-fadeSlideIn shadow-[0_0_30px_rgba(0,243,255,0.15)] flex items-start gap-4 hover:border-[#00f3ff]/60 transition-all">
      <div className="relative shrink-0 mt-1">
         <Cpu className="text-[#00f3ff] animate-pulse relative z-10" size={24} />
         <div className="absolute inset-0 bg-[#00f3ff] blur-md opacity-50 z-0"></div>
      </div>
      
      <div className="flex flex-col">
         <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#00f3ff]/60 mb-1">System Assistant</span>
         <p className="text-sm font-medium leading-relaxed text-white/90 tracking-wide">
           {message}
         </p>
      </div>
    </div>
  );
}
