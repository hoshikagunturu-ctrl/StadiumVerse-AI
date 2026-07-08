import React from 'react';
import type { FanInsight } from '../data/fanSustainabilityData';
import { Card, CardContent } from './ui/Card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface FanInsightCardProps {
  item: FanInsight;
}

export const FanInsightCard: React.FC<FanInsightCardProps> = ({ item }) => {
  const trendIcons = {
    Up: <ArrowUpRight className="text-green-500 animate-pulse shrink-0" size={12} />,
    Down: <ArrowDownRight className="text-red-500 animate-pulse shrink-0" size={12} />,
    Stable: <Minus className="text-slate-400 shrink-0" size={12} />
  };

  const trendColors = {
    Up: 'bg-green-500/10 text-green-500',
    Down: 'bg-red-500/10 text-red-500',
    Stable: 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400'
  };

  return (
    <Card variant="glass" className="hover:scale-[1.03] duration-300 border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark">
      <CardContent className="p-4 space-y-3.5 text-left bg-white dark:bg-stadium-dark">
        
        {/* Title & Trend */}
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            {item.title}
          </span>
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${trendColors[item.trend]}`}>
            {trendIcons[item.trend]}
            {item.trend}
          </span>
        </div>

        {/* Live score details */}
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-[9px] text-slate-400 font-bold block uppercase">Live Status</span>
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase">{item.status}</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-secondary font-bold block uppercase">AI Rating</span>
            <span className="text-sm font-extrabold text-primary dark:text-secondary font-display">{item.score}</span>
          </div>
        </div>

        {/* Tactical Recommendation */}
        <div className="space-y-1 pt-2 border-t border-slate-50 dark:border-white/5">
          <span className="text-[9px] text-slate-400 font-bold block uppercase">AI Recommendation</span>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
            "{item.recommendation}"
          </p>
        </div>

        {/* Footer timestamp */}
        <div className="text-right text-[8px] text-slate-400 font-bold uppercase pt-1 border-t border-slate-50 dark:border-white/5">
          <span>🕒 Last Updated: {item.lastUpdated}</span>
        </div>

      </CardContent>
    </Card>
  );
};
