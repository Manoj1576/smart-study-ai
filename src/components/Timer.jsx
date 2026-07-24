import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

export default function Timer({ addToast }) {
  const FOCUS_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;
  
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setIsFocus(!isFocus);
      setTimeLeft(!isFocus ? FOCUS_TIME : BREAK_TIME);
      addToast(!isFocus ? "Break over! Back to focus." : "Focus done! Take a break.", "success");
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isFocus, addToast]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setIsFocus(true);
    setTimeLeft(FOCUS_TIME);
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="glass-panel p-6 text-center">
      <h2 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
        <Clock className="text-secondary" /> Focus Timer
      </h2>
      <div className="text-6xl font-bold text-accent drop-shadow-[0_0_20px_rgba(167,235,242,0.4)] tracking-wider tabular-nums mb-4">
        {mins}:{secs}
      </div>
      <div className="text-sm uppercase tracking-widest text-gray-300 mb-8 font-medium">
        {isFocus ? 'Focus Time' : 'Short Break'}
      </div>
      <div className="flex gap-4 justify-center">
        <button 
          onClick={toggleTimer} 
          className="btn-primary w-32 flex items-center justify-center gap-2"
        >
          {isRunning ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start</>}
        </button>
        <button 
          onClick={resetTimer} 
          className="btn-danger w-32 flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} /> Reset
        </button>
      </div>
    </div>
  );
}
