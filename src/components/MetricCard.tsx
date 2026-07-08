import React from 'react';
import { Card, CardContent } from './ui/Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  loading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  loading = false,
}) => {
  const changeColors = {
    positive: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20',
    negative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20',
    neutral: 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/20',
  };

  return (
    <Card className="hover:scale-[1.02] duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{title}</span>
          {icon && <div className="text-slate-400 dark:text-secondary">{icon}</div>}
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          {loading ? (
            <div className="h-9 w-24 bg-slate-200 dark:bg-slate-700 animate-pulse rounded"></div>
          ) : (
            <span className="text-3xl font-extrabold text-primary dark:text-white font-display tracking-tight">{value}</span>
          )}
          {change && !loading && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${changeColors[changeType]}`}>
              {change}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
