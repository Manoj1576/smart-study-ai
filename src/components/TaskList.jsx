import React, { useState } from 'react';
import { ListChecks, ClipboardCheck } from 'lucide-react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, toggleComplete, deleteTask }) {
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Pending', 'Completed', 'High Priority'];

  let renderedTasks = tasks.slice();
  switch (filter) {
    case "Pending":
      renderedTasks = renderedTasks.filter(t => !t.completed);
      break;
    case "Completed":
      renderedTasks = renderedTasks.filter(t => t.completed);
      break;
    case "High Priority":
      renderedTasks = renderedTasks.filter(t => t.priority === "High" && !t.completed);
      break;
    default:
      break;
  }

  renderedTasks.sort((a, b) => {
    const pMap = { High: 3, Medium: 2, Low: 1 };
    const pA = pMap[a.priority];
    const pB = pMap[b.priority];
    if (pA !== pB) return pB - pA;
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  return (
    <div className="glass-panel p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ListChecks className="text-secondary" /> Your Tasks
        </h2>
        <div className="flex gap-1.5 bg-black/20 p-1.5 rounded-2xl">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {renderedTasks.length === 0 ? (
        <div className="text-center py-20 text-gray-400 flex flex-col items-center">
          <ClipboardCheck size={64} className="mb-4 opacity-30 text-secondary" />
          <p className="text-lg">No tasks found. Enjoy your free time!</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {renderedTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              toggleComplete={toggleComplete} 
              deleteTask={deleteTask} 
            />
          ))}
        </ul>
      )}
    </div>
  );
}
