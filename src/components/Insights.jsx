import React from 'react';
import { PieChart } from 'lucide-react';

export default function Insights({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="glass-panel p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <PieChart className="text-secondary" /> Insights
      </h2>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-bgDeep/30 rounded-xl p-3 text-center border border-white/5">
          <span className="block text-3xl font-bold text-white mb-1">{total}</span>
          <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">Total</span>
        </div>
        <div className="bg-bgDeep/30 rounded-xl p-3 text-center border border-white/5">
          <span className="block text-3xl font-bold text-low mb-1 drop-shadow-[0_0_10px_rgba(82,196,26,0.3)]">{completed}</span>
          <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">Done</span>
        </div>
        <div className="bg-bgDeep/30 rounded-xl p-3 text-center border border-white/5">
          <span className="block text-3xl font-bold text-medium mb-1 drop-shadow-[0_0_10px_rgba(250,173,20,0.3)]">{pending}</span>
          <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">Pending</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2 text-gray-300">
          <span>Completion Rate</span>
          <span>{pct}%</span>
        </div>
        <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full bg-gradient-to-r from-secondary to-accent shadow-[0_0_10px_#A7EBF2] transition-all duration-1000 ease-out" 
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
