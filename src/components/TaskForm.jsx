import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [difficulty, setDifficulty] = useState('Medium');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, subject, priority, difficulty, deadline });
    setTitle('');
    setSubject('');
    setPriority('Medium');
    setDifficulty('Medium');
    setDeadline('');
  };

  return (
    <div className="glass-panel p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <PlusCircle className="text-secondary" /> Add New Task
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex flex-col gap-2 flex-[2]">
            <label className="text-sm text-gray-300 font-medium">Task Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="glass-input" 
              placeholder="What needs to be done?" 
              required 
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm text-gray-300 font-medium">Subject</label>
            <input 
              type="text" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="glass-input" 
              placeholder="e.g. Math, Comp Sci" 
              required 
            />
          </div>
        </div>
        <div className="flex gap-4 flex-col md:flex-row items-end">
          <div className="flex flex-col gap-2 flex-1 w-full">
            <label className="text-sm text-gray-300 font-medium">Priority</label>
            <select 
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="glass-input"
            >
              <option className="bg-bgDeep" value="High">High</option>
              <option className="bg-bgDeep" value="Medium">Medium</option>
              <option className="bg-bgDeep" value="Low">Low</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 flex-1 w-full">
            <label className="text-sm text-gray-300 font-medium">Difficulty</label>
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="glass-input"
            >
              <option className="bg-bgDeep" value="Hard">Hard</option>
              <option className="bg-bgDeep" value="Medium">Medium</option>
              <option className="bg-bgDeep" value="Easy">Easy</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 flex-1 w-full">
            <label className="text-sm text-gray-300 font-medium">Deadline</label>
            <input 
              type="datetime-local" 
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="glass-input" 
              required 
            />
          </div>
          <div className="flex-1 w-full mt-4 md:mt-0">
            <button type="submit" className="btn-primary w-full h-[50px]">
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
