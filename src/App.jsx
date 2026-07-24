import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SubjectDetail from './pages/SubjectDetail';
import ThreeBackground from './components/ThreeBackground';

export default function App() {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('study_management_db');
    return saved ? JSON.parse(saved) : [];
  });
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('study_management_db', JSON.stringify(subjects));
  }, [subjects]);

  const addToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const addSubject = (name) => {
    if (!name.trim()) return addToast("Subject name cannot be empty", "error");
    const newSub = { id: Date.now().toString(), name, topics: [] };
    setSubjects(prev => [...prev, newSub]);
    addToast("Subject created successfully!");
  };

  const updateSubject = (subjectId, updatedSubject) => {
    setSubjects(prev => prev.map(s => s.id === subjectId ? updatedSubject : s));
  };

  const deleteSubject = (subjectId) => {
    setSubjects(prev => prev.filter(s => s.id !== subjectId));
    addToast("Subject deleted", "error");
  };

  return (
    <div className="min-h-screen bg-[#010914]/80 text-gray-100 flex flex-col font-sans relative overflow-hidden">
      {/* Restored 3D Layer completely behind the application */}
      <ThreeBackground />
      
      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={<Dashboard subjects={subjects} addSubject={addSubject} deleteSubject={deleteSubject} />} 
              />
              <Route 
                path="/subject/:subjectId" 
                element={<SubjectDetail subjects={subjects} updateSubject={updateSubject} addToast={addToast} />} 
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {/* Toasts */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {toasts.map(t => (
          <div key={t.id} className="flex items-center gap-3 glass-panel px-6 py-3 animate-fadeSlideIn shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-white/20">
             {t.type === 'success' ? <CheckCircle2 className="text-green-400"/> : <AlertTriangle className="text-red-400"/>}
             <span className="font-medium text-white">{t.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
