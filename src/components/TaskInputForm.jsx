import React, { useState } from 'react';
import { Terminal, Plus } from 'lucide-react';

export default function TaskInputForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!title || !subject || !deadline) return;
    onAdd({ title, subject, priority, deadline, difficulty: 'Standard' });
    setTitle(''); setSubject(''); setDeadline(''); setPriority('Medium');
  };

  return (
    <div className="glass-panel p-6 border-b border-b-[#00f3ff]/30 relative overflow-hidden">
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <Terminal size={20} className="text-[#00f3ff]" />
        <h3 className="text-sm tracking-[0.2em] font-bold text-white/80 uppercase">Formulate Node</h3>
      </div>
      
      <form onSubmit={submit} className="flex flex-col gap-5 relative z-10">
        <input 
          type="text" 
          placeholder="Node Designation (Title)" 
          value={title} 
          onChange={e => setTitle(e.target.value)}
          className="hologram-input w-full text-sm"
          required 
        />
        
        <input 
          type="text" 
          placeholder="Subject Classification" 
          value={subject} 
          onChange={e => setSubject(e.target.value)}
          className="hologram-input w-full text-sm"
          required 
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            value={priority} 
            onChange={e => setPriority(e.target.value)}
            className="hologram-input flex-1 text-sm appearance-none outline-none"
          >
            <option className="bg-[#050510] text-[#ff007f]" value="High">Priority: High</option>
            <option className="bg-[#050510] text-[#faad14]" value="Medium">Priority: Mid</option>
            <option className="bg-[#050510] text-[#00f3ff]" value="Low">Priority: Low</option>
          </select>

          <input 
            type="datetime-local" 
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className="hologram-input flex-1 text-sm"
            required
          />
        </div>

        <button type="submit" className="hologram-btn mt-2 flex items-center justify-center gap-2 group tracking-widest text-sm font-bold">
           <Plus size={18} className="group-hover:rotate-90 transition-transform" />
           INITIALIZE
        </button>
      </form>
    </div>
  );
}
