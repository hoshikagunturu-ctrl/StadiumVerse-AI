import React from 'react';
import type { ForecastItem } from '../data/predictiveData';
import { Card, CardContent } from './ui/Card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface ForecastCardProps {
  item: ForecastItem;
}

const ForecastCardComponent: React.FC<ForecastCardProps> = ({ item }) => {
  const { t } = useTranslation();
  // Find min/max values for normalizing bar heights
  const values = item.sparklineValues;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;

  const trendIcons = {
    Up: <ArrowUpRight className="text-red-500 animate-pulse shrink-0" size={12} />,
    Down: <ArrowDownRight className="text-green-500 animate-pulse shrink-0" size={12} />,
    Stable: <Minus className="text-slate-400 shrink-0" size={12} />
  };

  const trendColors = {
    Up: 'bg-red-500/10 text-red-500',
    Down: 'bg-green-500/10 text-green-500',
    Stable: 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400'
  };

  return (
    <Card variant="glass" className="hover:scale-[1.03] duration-300 border border-slate-100 dark:border-white/10 shadow-md">
      <CardContent className="p-4 space-y-4 text-left">
        {/* Title */}
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            {t(item.title)}
          </span>
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${trendColors[item.trend]}`}>
            {trendIcons[item.trend]}
            {t(item.trend)}
          </span>
        </div>

        {/* Values */}
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-[9px] text-slate-400 font-bold block uppercase">{t("Current")}</span>
            <span className="text-sm font-extrabold text-slate-700 dark:text-slate-300 font-display">{t(item.currentValue.toString())}</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-accent font-bold block uppercase">{t("Predicted")}</span>
            <span className="text-sm font-extrabold text-primary dark:text-secondary font-display">{t(item.predictedValue.toString())}</span>
          </div>
        </div>

        {/* Sparkline (pure CSS bars) & Confidence */}
        <div className="flex items-end justify-between pt-2 border-t border-slate-50 dark:border-white/5">
          {/* Sparkline bars */}
          <div className="flex items-end gap-1 h-6 shrink-0 select-none" aria-hidden="true">
            {values.map((v, idx) => {
              const heightPct = Math.max(10, Math.min(100, ((v - min) / range) * 100));
              return (
                <div 
                  key={idx} 
                  className={`w-1 rounded-t-full transition-all duration-300 ${
                    item.trend === 'Up' ? 'bg-red-500/60' : item.trend === 'Down' ? 'bg-green-500/60' : 'bg-secondary/60'
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              );
            })}
          </div>

          <div className="text-right text-[9px] text-slate-400 font-bold uppercase">
            <span>🎯 {t("Conf")}: {item.confidence}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ForecastCard = React.memo(ForecastCardComponent);
