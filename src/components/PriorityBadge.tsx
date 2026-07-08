import React from 'react';

interface PriorityBadgeProps {
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const styles = {
    Low: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
    Medium: 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
    High: 'bg-orange-500/10 text-orange-500 border border-orange-500/20',
    Critical: 'bg-red-500/15 text-red-500 border border-red-500/30 animate-pulse font-bold',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${styles[priority]}`}>
      {priority}
    </span>
  );
};
