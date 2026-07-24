import React, { useState, useEffect } from 'react';
import { X, PlayCircle, PauseCircle, CheckCircle2 } from 'lucide-react';

export default function FocusMode({ task, onClose, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(true);

  // Take over root overflow to prevent scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  useEffect(() => {
    let int;
    if (isRunning && timeLeft > 0) {
      int = setInterval(() => setTimeLeft(l => l - 1), 1000);
    }
    return () => clearInterval(int);
  }, [isRunning, timeLeft]);

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  // Interactive parallax inside focus mode
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    setPos({
      x: (e.clientX / window.innerWidth - 0.5) * 40,
      y: (e.clientY / window.innerHeight - 0.5) * 40
    });
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-3xl flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00f3ff]/10 via-black/80 to-black/90 pointer-events-none"
        style={{ transform: `translate(${-pos.x}px, ${-pos.y}px)` }}
      />
      
      <button 
        onClick={onClose}
        className="absolute top-10 right-10 hologram-btn !p-4 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] text-white/50 hover:text-white transition-all z-50"
      >
        <X size={24} />
      </button>

      <div 
        className="relative z-10 flex flex-col items-center justify-center max-w-2xl w-full px-6"
        style={{ transform: `translate(${pos.x * 0.5}px, ${pos.y * 0.5}px)` }}
      >
        <h4 className="text-[#00f3ff] uppercase tracking-[0.4em] text-sm font-bold mb-4 drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]">Focus Phase Active</h4>
        
        <h2 className="text-4xl md:text-6xl font-black text-center mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          {task.title}
        </h2>

        <div className="font-mono text-8xl md:text-9xl font-light tracking-tighter text-white drop-shadow-[0_0_40px_rgba(0,243,255,0.4)] mb-16 select-none flex justify-center w-[400px]">
          {mins}<span className={`${isRunning ? 'animate-pulse' : ''}`}>:</span>{secs}
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className="w-20 h-20 rounded-full glass-panel flex items-center justify-center hover:scale-110 hover:border-[#00f3ff]/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.3)] transition-all group"
          >
            {isRunning ? (
              <PauseCircle size={40} className="text-white/80 group-hover:text-[#00f3ff]" />
            ) : (
              <PlayCircle size={40} className="text-white/80 group-hover:text-[#00f3ff]" />
            )}
          </button>
          
          <button 
            onClick={onComplete}
            className="hologram-btn flex items-center gap-3 text-lg font-bold !px-8 !py-5 hover:border-[#39ff14]/50 hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] hover:text-[#39ff14]"
          >
            <CheckCircle2 size={24} /> ASSIMILATE NODE
          </button>
        </div>
      </div>
    </div>
  );
}
