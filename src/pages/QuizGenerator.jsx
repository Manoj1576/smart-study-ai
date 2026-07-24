import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2 } from 'lucide-react';

export default function QuizGenerator() {
  const [stage, setStage] = useState(0); 

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto mt-10">
       {stage === 0 && (
         <div className="glass-panel p-10 flex flex-col items-center justify-center text-center">
            <Zap size={64} className="text-[#39ff14] mb-6 drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]" />
            <h2 className="text-3xl font-black mb-4">NEURAL EXAM GENERATOR</h2>
            <p className="text-gray-400 mb-8 max-w-sm">Synthesize a custom multi-parameter test based on your currently active weakest sectors.</p>
            <button onClick={() => setStage(1)} className="hologram-btn !border-[#39ff14]/50 !text-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.1)] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] text-lg px-8 py-4 w-full">INITIALIZE MATRIX</button>
         </div>
       )}

       {stage === 1 && (
         <div className="glass-panel p-10">
            <h3 className="text-xs font-bold tracking-widest text-gray-500 mb-6 uppercase">Question 1 / 1</h3>
            <p className="text-2xl font-medium leading-relaxed mb-10 text-white/90">
              What anomaly defines a 3NF violation inside a Relational Database?
            </p>
            <div className="flex flex-col gap-4">
              <button onClick={() => setStage(2)} className="text-left w-full p-4 rounded-xl border border-white/10 hover:border-[#00f3ff] hover:bg-[#00f3ff]/5 transition-all text-white/80 font-medium">A. Partial Dependency</button>
              <button onClick={() => setStage(2)} className="text-left w-full p-4 rounded-xl border border-white/10 hover:border-[#00f3ff] hover:bg-[#00f3ff]/5 transition-all text-white/80 font-medium">B. Transitive Dependency</button>
            </div>
         </div>
       )}

       {stage === 2 && (
         <div className="glass-panel p-10 flex flex-col items-center justify-center text-center border-[#00f3ff]/40 shadow-[0_0_30px_rgba(0,243,255,0.2)]">
            <CheckCircle2 size={80} className="text-[#00f3ff] mb-6 animate-pulse" />
            <h2 className="text-4xl font-black mb-2 hologram-text">LINK COMPLETE</h2>
            <p className="text-xl mb-8">Score: 100%</p>
            <button onClick={() => setStage(0)} className="hologram-btn">RETURN</button>
         </div>
       )}
    </motion.div>
  );
}
