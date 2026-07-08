import React from 'react';
import type { ForecastInsight } from '../data/predictiveData';
import { Card, CardContent } from './ui/Card';
import { PriorityBadge } from './PriorityBadge';
import { AlertCircle } from 'lucide-react';

interface InsightCardProps {
  insight: ForecastInsight;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  return (
    <Card variant="glass" className="hover:scale-[1.01] duration-300 border border-slate-100 dark:border-white/10 shadow-sm bg-white dark:bg-stadium-dark">
      <CardContent className="p-4 flex gap-3 text-left">
        <div className="bg-primary/5 dark:bg-white/5 p-2 rounded-xl text-secondary shrink-0 self-start">
          <AlertCircle size={16} />
        </div>
        
        <div className="space-y-2 flex-1">
          <div className="flex justify-between items-center gap-2">
            <PriorityBadge priority={insight.priority} />
            <span className="text-[9px] text-slate-400 font-bold uppercase">🎯 Conf: {insight.confidence}</span>
          </div>

          <p className="text-xs text-slate-700 dark:text-white leading-relaxed font-semibold">
            "{insight.observation}"
          </p>

          <div className="text-[9px] text-slate-400 font-bold uppercase pt-1 border-t border-slate-50 dark:border-white/5 flex justify-between">
            <span>Impact:</span>
            <span className="text-secondary">{insight.impact}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
