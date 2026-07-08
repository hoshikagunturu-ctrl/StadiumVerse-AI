import React from 'react';
import type { AccessibilityItem } from '../data/fanSustainabilityData';
import { Card, CardContent } from './ui/Card';

interface AccessibilityStatusCardProps {
  item: AccessibilityItem;
}

export const AccessibilityStatusCard: React.FC<AccessibilityStatusCardProps> = ({ item }) => {
  return (
    <Card variant="glass" className="hover:scale-[1.03] duration-300 border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark">
      <CardContent className="p-4 space-y-3.5 text-left bg-white dark:bg-stadium-dark">
        
        {/* Title */}
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            {item.title}
          </span>
        </div>

        {/* Status details */}
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-[9px] text-slate-400 font-bold block uppercase">Current Status</span>
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase">{item.status}</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-accent font-bold block uppercase">Availability</span>
            <span className="text-sm font-extrabold text-primary dark:text-secondary font-display">{item.availability}</span>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="space-y-1 pt-2 border-t border-slate-50 dark:border-white/5">
          <span className="text-[9px] text-slate-400 font-bold block uppercase">AI Recommendation</span>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
            "{item.recommendation}"
          </p>
        </div>

      </CardContent>
    </Card>
  );
};
