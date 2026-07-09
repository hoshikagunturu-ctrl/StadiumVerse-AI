import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

export type BadgeStatus = 'Preparing' | 'Security Check' | 'Ready' | 'Live' | 'Completed';

interface StatusBadgeProps {
  status: BadgeStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();
  const styles = {
    'Preparing': 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
    'Security Check': 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
    'Ready': 'bg-green-500/10 text-green-500 border border-green-500/20',
    'Live': 'bg-red-500/10 text-red-500 border border-red-500/30 animate-pulse font-bold',
    'Completed': 'bg-slate-500/10 text-slate-500 border border-slate-500/20',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${styles[status]}`}>
      {t(status)}
    </span>
  );
};
