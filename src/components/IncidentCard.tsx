import React from 'react';
import type { Incident } from '../data/incidentsData';
import { Card, CardContent } from './ui/Card';
import { PriorityBadge } from './PriorityBadge';
import { useTranslation } from '../hooks/useTranslation';

interface IncidentCardProps {
  incident: Incident;
  isSelected: boolean;
  onClick: () => void;
}

const IncidentCardComponent: React.FC<IncidentCardProps> = ({
  incident,
  isSelected,
  onClick,
}) => {
  const { t } = useTranslation();
  const statusColors = {
    Detected: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
    Analyzing: 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
    Responding: 'bg-orange-500/10 text-orange-500 border border-orange-500/20 animate-pulse',
    Resolved: 'bg-green-500/10 text-green-500 border border-green-500/20',
  };

  const borderAccents = {
    Low: 'border-l-4 border-l-blue-500',
    Medium: 'border-l-4 border-l-amber-500',
    High: 'border-l-4 border-l-orange-500',
    Critical: 'border-l-4 border-l-red-600',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl transition-all duration-300 block cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary ${
        isSelected 
          ? 'scale-[1.01] ring-2 ring-secondary/50 shadow-lg' 
          : 'hover:scale-[1.01] shadow-sm'
      }`}
      aria-label={`Incident ${incident.id}: ${t(incident.category)} at ${t(incident.stadium)}. Priority ${t(incident.priority)}. Status ${t(incident.status)}.`}
    >
      <Card 
        variant="glass" 
        className={`h-full border border-slate-100 dark:border-white/10 bg-white dark:bg-stadium-dark ${borderAccents[incident.priority]}`}
      >
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span>{incident.id} • 🕒 {incident.time}</span>
            <span className="font-display truncate max-w-[120px]">{t(incident.stadium)}</span>
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-primary dark:text-white uppercase tracking-wider truncate">
              {t(incident.category)}
            </h4>
          </div>

          <div className="flex justify-between items-center pt-1.5 border-t border-slate-50 dark:border-white/5">
            <PriorityBadge priority={incident.priority} />
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${statusColors[incident.status]}`}>
              {t(incident.status)}
            </span>
          </div>
        </CardContent>
      </Card>
    </button>
  );
};

export const IncidentCard = React.memo(IncidentCardComponent);
