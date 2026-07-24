import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function SuggestionBanner({ message }) {
  if (!message) return null;
  return (
    <div className="max-w-7xl mx-auto mt-6 glass-panel border-medium bg-medium/10 text-medium px-6 py-4 flex items-center gap-4 shadow-[0_0_20px_rgba(250,173,20,0.2)] animate-pulse">
      <Lightbulb className="text-medium" />
      <span className="font-medium">{message}</span>
    </div>
  );
}
