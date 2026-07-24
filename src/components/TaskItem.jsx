import React from 'react';
import { Book, Clock, Trash2, Check } from 'lucide-react';

export default function TaskItem({ task, toggleComplete, deleteTask }) {
  const isCompleted = task.completed;
  
  const now = new Date().getTime();
  const targetTime = new Date(task.deadline).getTime();
  const diffHrs = (targetTime - now) / (1000 * 60 * 60);

  let borderGlow = "border-white/10 hover:border-white/20";
  if (!isCompleted) {
    if (diffHrs < 0) {
      borderGlow = "border-high/80 shadow-[0_0_20px_rgba(255,77,79,0.4)]";
    } else if (diffHrs <= 24) {
      borderGlow = "border-medium/60 shadow-[0_0_20px_rgba(250,173,20,0.2)]";
    }
  }

  const pColors = {
    High: "text-high bg-high/10 border-high/30",
    Medium: "text-medium bg-medium/10 border-medium/30",
    Low: "text-low bg-low/10 border-low/30",
  };

  const dateStr = new Date(task.deadline).toLocaleString([], {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <li className={`bg-white/5 backdrop-blur-md border ${borderGlow} rounded-xl p-5 flex justify-between items-center transition-all duration-300 hover:-translate-y-1 ${isCompleted ? 'opacity-60' : ''}`}>
      <div className="flex gap-5 items-center flex-1 min-w-0">
        <button 
          onClick={() => toggleComplete(task.id)}
          className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all shrink-0 ${isCompleted ? 'bg-low border-low' : 'bg-black/30 border-white/20 shadow-inner'}`}
        >
          <Check size={16} className={`transition-all ${isCompleted ? 'text-white' : 'text-transparent'}`} />
        </button>
        <div className="flex flex-col gap-2 min-w-0">
          <h3 className={`text-[1.15rem] text-white break-words pr-4 ${isCompleted ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          <div className="flex gap-3 text-sm text-gray-300 flex-wrap items-center">
            <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-semibold border ${pColors[task.priority]}`}>
              {task.priority} Priority
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[12px] font-semibold border border-white/10 bg-white/5 text-white">
              {task.difficulty}
            </span>
            <span className="flex items-center gap-1.5"><Book size={14} /> {task.subject}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {dateStr}</span>
          </div>
        </div>
      </div>
      <button 
        onClick={() => deleteTask(task.id)}
        className="w-10 h-10 rounded-xl bg-high/10 text-high border border-high/20 flex items-center justify-center hover:bg-high hover:text-white hover:shadow-[0_0_15px_rgba(255,77,79,0.4)] transition-all shrink-0 ml-4"
        title="Delete Task"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}
