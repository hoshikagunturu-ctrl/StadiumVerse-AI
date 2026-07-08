import React from 'react';
import type { SmartNotification } from '../data/fanSustainabilityData';

interface NotificationItemProps {
  item: SmartNotification;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
  const categoryBadges = {
    'Eco': 'bg-green-500/10 text-green-500 border border-green-500/20',
    'Accessibility': 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
    'Fan Exp': 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
    'Infrastructure': 'bg-purple-500/10 text-purple-500 border border-purple-500/20',
  };

  const statusIcons = {
    Info: 'ℹ️',
    Success: '🌱',
    Warning: '⚠️',
    Alert: '🚨',
  };

  return (
    <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm hover:scale-[1.01] transition-all duration-300 select-none">
      <div className="flex items-center gap-3">
        <span className="text-sm shrink-0" aria-hidden="true">
          {statusIcons[item.status]}
        </span>
        <div className="space-y-1 text-left">
          <p className="text-xs font-semibold text-slate-700 dark:text-white leading-normal">
            {item.message}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[8px] text-slate-400 font-bold">{item.timestamp}</span>
            <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase font-bold tracking-wider ${categoryBadges[item.category]}`}>
              {item.category}
            </span>
          </div>
        </div>
      </div>

      <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase font-bold tracking-wider ${
        item.priority === 'Critical' ? 'bg-red-500/20 text-red-500 border border-red-500/30 animate-pulse font-extrabold' :
        item.priority === 'High' ? 'bg-orange-500/10 text-orange-500' :
        item.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-100 text-slate-400 dark:bg-white/5'
      }`}>
        {item.priority}
      </span>
    </div>
  );
};
