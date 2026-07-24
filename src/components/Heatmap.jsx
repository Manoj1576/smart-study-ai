import React from 'react';
import { Network } from 'lucide-react';

export default function Heatmap({ tasks }) {
  const pending = tasks.filter(t => !t.completed).length;
  // Intensity 0 to 10
  const intensity = Math.min(pending, 10);
  
  // Create an array of 20 nodes
  const nodes = Array.from({ length: 20 }, (_, i) => {
    return i < intensity * 2;
  });

  return (
    <div className="glass-panel p-6 border-t border-t-[#bc13fe]/30 relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Network size={20} className="text-[#bc13fe]" />
        <h3 className="text-sm tracking-[0.2em] uppercase font-bold text-white/70">Neural Heatmap</h3>
      </div>
      
      <div className="flex flex-wrap gap-3 mt-6 relative z-10">
        {nodes.map((active, i) => (
          <div 
            key={i} 
            className={`w-3.5 h-3.5 rounded-full transition-all duration-1000 ${
              active 
                ? 'bg-[#bc13fe] shadow-[0_0_15px_#bc13fe] animate-pulse' 
                : 'bg-white/5 border border-white/10'
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      
      {/* Background glow correlated to intensity */}
      <div 
        className="absolute bottom-0 right-0 w-32 h-32 bg-[#bc13fe]/20 blur-3xl rounded-full transition-all duration-1000 pointer-events-none"
        style={{ opacity: intensity * 0.1 }}
      />
    </div>
  );
}
