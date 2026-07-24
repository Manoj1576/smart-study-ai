import React from 'react';
import Timer from './Timer';
import Insights from './Insights';

export default function Sidebar({ tasks, addToast }) {
  return (
    <aside className="flex flex-col gap-8 w-full md:w-[340px] shrink-0">
      <Timer addToast={addToast} />
      <Insights tasks={tasks} />
    </aside>
  );
}
