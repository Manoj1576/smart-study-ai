import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Send, MessageSquare } from 'lucide-react';

export default function AIChat({ updateWeakAreas }) {
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Tutor Node Initialized. Vocalize or type query.' }]);
  const [input, setInput] = useState('');
  const [isDictating, setIsDictating] = useState(false);
  
  const bottomRef = useRef(null);
  
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const handleSpeech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Speech API not supported in this browser format.');
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsDictating(true);
    recognition.onresult = (e) => setInput(e.results[0][0].transcript);
    recognition.onend = () => setIsDictating(false);
    recognition.start();
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    
    // Pseudo LLM interaction & Weak area extraction
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: "Step 1: Analyzing logic... It seems you are querying Database Normalization. Shall I break this down hierarchically?" }]);
      if (input.toLowerCase().includes('dbms')) updateWeakAreas(['Database Normalization']);
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto h-[80vh] flex flex-col glass-panel overflow-hidden border-[#ff007f]/20">
      <div className="bg-black/40 p-4 border-b border-white/10 flex items-center gap-3">
         <MessageSquare className="text-[#ff007f]" />
         <h2 className="text-xl font-bold tracking-widest text-[#ff007f]">VOCAL TUTOR AI</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
         {messages.map((m, i) => (
           <div key={i} className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'ai' ? 'self-start bg-[#00f3ff]/10 border border-[#00f3ff]/30 text-[#00f3ff]' : 'self-end bg-[#bc13fe]/10 border border-[#bc13fe]/30 text-white'}`}>
              <p className="tracking-wide leading-relaxed font-mono text-sm">{m.text}</p>
           </div>
         ))}
         <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-black/40 flex gap-4">
         <button type="button" onClick={handleSpeech} className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border transition-all ${isDictating ? 'border-[#39ff14] text-[#39ff14] shadow-[0_0_15px_rgba(57,255,20,0.5)]' : 'border-white/10 text-white hover:border-white/40'}`}>
            <Mic size={20} className={isDictating ? 'animate-pulse' : ''} />
         </button>
         <input type="text" value={input} onChange={e=>setInput(e.target.value)} className="hologram-input flex-1" placeholder="Initialise textual query..." />
         <button type="submit" className="hologram-btn flex items-center gap-2"><Send size={18}/> TRANSMIT</button>
      </form>
    </motion.div>
  );
}
