import React from 'react';
import { Card, CardContent } from './ui/Card';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  icon,
}) => {
  return (
    <Card variant="glass" className="hover:scale-[1.03] duration-300 border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark">
      <CardContent className="p-5 flex items-center justify-between text-left select-none">
        <div className="space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">{title}</span>
          <span className="text-xl font-extrabold text-primary dark:text-white block font-display tracking-tight">{value}</span>
        </div>
        {icon && (
          <div className="bg-primary/5 dark:bg-white/5 p-2.5 rounded-xl text-secondary shrink-0">
            {icon}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
