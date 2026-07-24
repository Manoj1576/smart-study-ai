import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UploadCloud, Cpu, FileText } from 'lucide-react';

export default function SubjectView() {
  const { id } = useParams();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState('');

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalysis("Extracted 3 Core Topics. Priority: Relational Algebra is critical for upcoming milestone.");
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto flex flex-col gap-8">
      <h2 className="text-4xl font-black text-[#00f3ff] drop-shadow-[0_0_15px_rgba(0,243,255,0.4)] tracking-wider">
         Data Link: {id}
      </h2>
      
      <div className="glass-panel p-10 border-dashed border-[#bc13fe] border-2 bg-[#bc13fe]/5 flex flex-col items-center text-center cursor-pointer hover:bg-[#bc13fe]/10 transition-all" onClick={handleUpload}>
         <UploadCloud size={64} className="text-[#bc13fe] mb-4" />
         <h3 className="text-2xl font-bold mb-2">Upload Resource Matrix</h3>
         <p className="text-gray-400">Drag PDF/Text to initialize content extraction</p>
      </div>

      {analyzing && (
        <div className="glass-panel p-6 border-[#39ff14]/30 shadow-[0_0_15px_rgba(57,255,20,0.1)] flex items-center justify-center gap-4">
           <Cpu size={24} className="text-[#39ff14] animate-spin" />
           <span className="font-mono text-[#39ff14] tracking-widest">Processing Content Node...</span>
        </div>
      )}

      {analysis && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel p-8 border-[#00f3ff]/40 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
           <h3 className="text-xl font-bold flex gap-3 items-center mb-4"><FileText className="text-[#00f3ff]" /> AI CONTENT ANALYSIS</h3>
           <p className="text-white/90 text-lg leading-relaxed border-l-2 border-[#00f3ff] pl-4">{analysis}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
