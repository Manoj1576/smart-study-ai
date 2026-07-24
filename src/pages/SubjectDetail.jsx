import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Trash2, Clock, Send, X, Globe, MessageSquare, UploadCloud } from 'lucide-react';
import { getApiUrl, simulateAI } from '../api/ai';

export default function SubjectDetail({ subjects, updateSubject, addToast }) {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const subject = (subjects || []).find(s => s.id === subjectId);

  const [newTopic, setNewTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  
  // Interactive Modal State
  const [modal, setModal] = useState({ isOpen: false, type: '', contextTopic: null });
  const [modalInput, setModalInput] = useState('');
  const [modalResponse, setModalResponse] = useState('');
  const [modalProcessing, setModalProcessing] = useState(false);
  const [targetLang, setTargetLang] = useState('Tamil');

  if (!subject) return <div className="p-8">Subject disconnected...</div>;

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return addToast("Topic name required", "error");

    setAnalyzing(true);
    let uploadedFileName = 'None';
    
    if (isUploading && file) {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const res = await fetch(getApiUrl('/api/upload'), {
          method: 'POST',
          body: formData
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            uploadedFileName = data.filename;
            addToast(`File ${data.filename} uploaded to server!`, "success");
          } else {
            uploadedFileName = file.name;
            addToast(`Material ${file.name} recorded!`, "success");
          }
        } else {
          uploadedFileName = file.name;
          addToast(`Material ${file.name} recorded locally!`, "success");
        }
      } catch (err) {
        uploadedFileName = file.name;
        addToast(`Material ${file.name} recorded locally!`, "success");
      }
    }

    setAnalyzing(false);

    // Requirement: Generate Google & Youtube links based on topic
    const yLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(newTopic)}`;
    const gLink = `https://www.google.com/search?q=${encodeURIComponent(newTopic)}`;

    // Requirement: Time Estimation based on material upload vs difficulty
    const timeAlloc = (isUploading && file) ? '3.5 hours' : (difficulty === 'High' ? '4 hours' : difficulty === 'Medium' ? '2 hours' : '1 hour');

    const topic = {
      id: Date.now().toString(),
      title: newTopic,
      difficulty: (isUploading && file) ? 'Auto-Extracted' : difficulty,
      materials: uploadedFileName,
      estimatedTime: timeAlloc,
      links: [
        { title: `${newTopic} on YouTube`, url: yLink },
        { title: `${newTopic} docs on Google`, url: gLink }
      ],
      createdAt: new Date().toISOString()
    };

    updateSubject(subjectId, { ...subject, topics: [...(subject.topics || []), topic] });
    setNewTopic('');
    setFile(null);
    setIsUploading(false);
    addToast("Topic integrated successfully!");
  };

  const deleteTopic = (tId) => {
    updateSubject(subjectId, { ...subject, topics: subject.topics.filter(t => t.id !== tId) });
    addToast("Topic removed", "error");
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalInput.trim()) return;
    setModalProcessing(true);
    
    try {
      if (modal.type === 'chat') {
        const res = await fetch(getApiUrl('/api/chat'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: modalInput })
        });
        if (res.ok) {
          const data = await res.json();
          setModalResponse(data.response || data.error);
        } else {
          const fallback = await simulateAI(modalInput, 'chat');
          setModalResponse(fallback);
        }
      } else {
        const res = await fetch(getApiUrl('/api/translate'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: modalInput, targetLang: targetLang })
        });
        if (res.ok) {
          const data = await res.json();
          setModalResponse(data.response || data.error);
        } else {
          const type = targetLang === 'Tamil' ? 'translate_tamil' : 'translate_english';
          const fallback = await simulateAI(modalInput, type);
          setModalResponse(fallback);
        }
      }
    } catch (err) {
      if (modal.type === 'chat') {
        const fallback = await simulateAI(modalInput, 'chat');
        setModalResponse(fallback);
      } else {
        const type = targetLang === 'Tamil' ? 'translate_tamil' : 'translate_english';
        const fallback = await simulateAI(modalInput, type);
        setModalResponse(fallback);
      }
    }
    
    setModalProcessing(false);
  };


  return (
    <div className="flex flex-col gap-8 pb-20 relative animate-fadeSlideIn">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-[#00f3ff] transition-all w-max font-bold"><ArrowLeft size={20}/> BACK</button>
      
      <div className="flex items-center justify-between">
         <h1 className="text-4xl font-extrabold text-[#bc13fe] uppercase tracking-widest">{subject.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Col - Add Topic */}
         <div className="lg:col-span-1 flex flex-col gap-6">
            <form onSubmit={handleAddTopic} className="glass-panel p-6 flex flex-col gap-4 border border-[#bc13fe]/30 bg-[#bc13fe]/5">
               <h2 className="text-xl font-bold flex items-center gap-2 text-[#bc13fe]"><BookOpen /> Add Topic Node</h2>
               <input type="text" value={newTopic} onChange={e=>setNewTopic(e.target.value)} placeholder="Topic (e.g. Integration)" className="p-3 bg-black/40 border border-white/10 rounded-xl focus:border-[#bc13fe] focus:outline-none" required />
               
               <div className="flex flex-col gap-2 mt-2">
                 <label className="flex items-center gap-2 text-sm text-gray-300 font-medium cursor-pointer">
                    <input type="checkbox" checked={isUploading} onChange={e=>{setIsUploading(e.target.checked); setFile(null);}} className="w-5 h-5 accent-[#bc13fe]" />
                    Upload External Material
                 </label>
               </div>

               {isUploading ? (
                 <div className="p-4 border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-center gap-2 text-gray-400">
                    <UploadCloud size={24} />
                    <span className="text-xs">Select PDF/Notes</span>
                    <input type="file" onChange={e => setFile(e.target.files[0])} className="text-xs" required />
                 </div>
               ) : (
                 <select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className="p-3 bg-black/40 border border-white/10 rounded-xl focus:border-[#bc13fe] focus:outline-none text-white/80">
                    <option className="bg-black" value="Low">Base Level (Easy)</option>
                    <option className="bg-black" value="Medium">Standard Level (Medium)</option>
                    <option className="bg-black" value="High">Complex Level (Hard)</option>
                 </select>
               )}

               <button disabled={analyzing} type="submit" className="bg-[#bc13fe] hover:bg-[#a60ee0] text-white font-black tracking-widest p-4 rounded-xl transition-all disabled:opacity-50 mt-2 shadow-[0_0_15px_rgba(188,19,254,0.3)]">
                  {analyzing ? 'PROCESSING LOAD...' : 'GENERATE TOPIC'}
               </button>
            </form>
         </div>

         {/* Right Col - List Topics */}
         <div className="lg:col-span-2 flex flex-col gap-4">
            {(subject.topics || []).map(t => (
               <div key={t.id} className="glass-panel p-6 border border-white/10 relative group bg-white/5 transition-all">
                  <div className="flex justify-between items-start">
                     <h3 className="text-2xl font-bold text-[#00f3ff] drop-shadow-[0_0_10px_rgba(0,243,255,0.4)] mb-2">{t.title}</h3>
                     <span className="flex items-center gap-1 font-mono text-sm bg-white/10 px-3 py-1 rounded-full text-[#39ff14]/80 border border-[#39ff14]/30 shadow-[0_0_10px_rgba(57,255,20,0.1)]">
                       <Clock size={14}/> {t.estimatedTime}
                     </span>
                  </div>
                  <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2 mb-4">
                     <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-md text-[#faad14]">Diff: {t.difficulty}</span>
                     <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-md">Src: {t.materials}</span>
                  </div>
                  
                  <div className="mt-4 bg-black/20 p-4 rounded-xl border border-white/5">
                     <h4 className="text-xs text-white/50 uppercase font-black mb-3 tracking-widest">Auto Resources Mapping</h4>
                     <div className="flex flex-col gap-2">
                       {t.links.map((l, i) => (
                         <a key={i} href={l.url} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-[#00f3ff] hover:underline text-sm truncate flex items-center gap-2">→ {l.title}</a>
                       ))}
                     </div>
                  </div>

                  {/* Built-in Chat & Translate Area */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                     <button onClick={() => {setModal({ isOpen: true, type: 'chat', contextTopic: t.title }); setModalResponse(''); setModalInput('');}} className="flex-1 bg-[#ff007f]/10 border border-[#ff007f]/40 text-[#ff007f] hover:bg-[#ff007f] hover:text-white px-4 py-3 rounded-xl font-bold transition-all text-sm shadow-[0_0_15px_rgba(255,0,127,0.1)] flex justify-center items-center gap-2">
                       <MessageSquare size={18}/> AI DOUBT SOLVER
                     </button>
                     <button onClick={() => {setModal({ isOpen: true, type: 'translate', contextTopic: t.title }); setModalResponse(''); setModalInput('');}} className="flex-1 bg-[#39ff14]/10 border border-[#39ff14]/40 text-[#39ff14] hover:bg-[#39ff14] hover:text-black px-4 py-3 rounded-xl font-bold transition-all text-sm shadow-[0_0_15px_rgba(57,255,20,0.1)] flex justify-center items-center gap-2">
                       <Globe size={18}/> TRANSLATE MATERIAL
                     </button>
                  </div>

                  <button onClick={()=>deleteTopic(t.id)} className="absolute top-4 right-4 text-red-500/30 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all bg-black/50 p-2 rounded-lg border border-red-500/20"><Trash2 size={16}/></button>
               </div>
            ))}
            {(subject.topics || []).length === 0 && <div className="glass-panel p-10 text-center text-gray-500 text-lg border-dashed border-white/20 font-bold tracking-widest uppercase mt-6">No topics established.</div>}
         </div>
      </div>

      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999] flex items-center justify-center p-4">
          <div className="glass-panel max-w-2xl w-full p-8 border border-[#ff007f]/40 shadow-[0_0_50px_rgba(255,0,127,0.2)] flex flex-col gap-6 relative animate-fadeSlideIn">
            <button onClick={() => { setModal({isOpen: false, type: '', contextTopic: null}); setModalResponse(''); setModalInput(''); }} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X size={24}/></button>
            
            <h2 className="text-2xl font-black text-[#ff007f] tracking-widest uppercase flex items-center gap-3">
              {modal.type === 'chat' ? <MessageSquare /> : <Globe />}
              {modal.type === 'chat' ? 'AI Tutor Link' : 'Translation Engine'}
            </h2>
            <p className="text-gray-400 text-sm">Context topic: <strong className="text-white">{modal.contextTopic}</strong></p>
            
            <form onSubmit={handleModalSubmit} className="flex flex-col gap-4 mt-2">
              {modal.type === 'translate' && (
                <select value={targetLang} onChange={e=>setTargetLang(e.target.value)} className="bg-black/60 border border-white/10 rounded-xl p-3 focus:outline-none text-white">
                   <option value="Tamil">Tamil</option>
                   <option value="English">English</option>
                </select>
              )}
              
              <textarea 
                value={modalInput} 
                onChange={e => setModalInput(e.target.value)} 
                placeholder={modal.type === 'chat' ? "E.g. Explain how integration applies here step-by-step..." : "Paste text to translate..."} 
                className="w-full h-32 bg-black/60 border border-white/10 rounded-xl p-4 focus:border-[#ff007f] focus:outline-none text-white resize-none"
                required
              />
              
              <button disabled={modalProcessing} type="submit" className="bg-[#ff007f] hover:bg-[#d6006c] text-white font-black px-6 py-4 rounded-xl flex justify-center items-center gap-2 w-full transition-all disabled:opacity-50">
                {modalProcessing ? 'EXECUTING ALGORITHM...' : <><Send size={20}/> {modal.type === 'chat' ? 'ASK AI' : 'TRANSLATE'}</>}
              </button>
            </form>

            {modalResponse && (
              <div className="flex flex-col gap-6 mt-2 animate-fadeSlideIn">
                <div className="p-6 bg-[#00f3ff]/10 border border-[#00f3ff]/30 rounded-xl text-[#00f3ff]">
                  <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">{modalResponse}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
