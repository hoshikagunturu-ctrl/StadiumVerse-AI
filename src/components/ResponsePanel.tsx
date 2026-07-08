import React from 'react';
import type { Incident } from '../data/incidentsData';
import { DashboardCard } from './DashboardCard';
import { TimelineItem } from './TimelineItem';
import { Badge } from './ui/Badge';
import { Brain } from 'lucide-react';

interface ResponsePanelProps {
  incident: Incident | null;
}

export const ResponsePanel: React.FC<ResponsePanelProps> = ({ incident }) => {
  if (!incident) {
    return (
      <DashboardCard title="AI Response Coordinator" variant="glass" className="h-full border border-slate-100 dark:border-white/10 shadow-md">
        <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400 space-y-4">
          <Brain size={48} className="text-slate-300 dark:text-slate-600 animate-pulse" />
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">No Incident Selected</h4>
            <p className="text-[10px] font-medium max-w-xs mt-1">Select an incident block from the feed list to view AI tactical analysis and coordinate team dispatches.</p>
          </div>
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard 
      title={`AI Response Coordinator • ${incident.id}`} 
      variant="glass" 
      className="border border-slate-100 dark:border-white/10 shadow-md h-full text-left"
    >
      <div className="space-y-5 text-xs font-semibold">
        
        {/* Risk meter & Confidence header */}
        <div className="flex justify-between items-center bg-slate-50/50 dark:bg-white/5 p-3.5 rounded-xl border border-slate-100 dark:border-white/5">
          <div className="space-y-1.5 flex-1">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">AI Threat Score</span>
            <div className="flex items-center gap-2.5">
              <span className="text-base font-extrabold text-primary dark:text-white font-display">{incident.riskScore}%</span>
              <div className="flex-1 h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    incident.riskScore > 85 ? 'bg-red-500' : incident.riskScore > 60 ? 'bg-amber-500' : 'bg-accent'
                  }`} 
                  style={{ width: `${incident.riskScore}%` }}
                />
              </div>
            </div>
          </div>
          <div className="border-l border-slate-100 dark:border-white/5 pl-4 ml-4 text-right">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Confidence</span>
            <Badge variant="secondary" className="text-[10px] font-extrabold font-display text-secondary">{incident.confidenceScore}</Badge>
          </div>
        </div>

        {/* Summary Description */}
        <div className="space-y-1.5">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Incident Summary</span>
          <p className="text-slate-700 dark:text-white leading-relaxed font-semibold">
            {incident.summary}
          </p>
        </div>

        {/* Recommended Actions */}
        <div className="space-y-2">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">AI Recommended Actions</span>
          <div className="space-y-1.5">
            {incident.recommendedActions.map((action, idx) => (
              <div key={idx} className="flex gap-2 p-2.5 rounded-lg bg-slate-50/30 dark:bg-white/5 border border-slate-100 dark:border-white/5 items-start">
                <span className="text-[10px] font-bold text-secondary">{idx + 1}.</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal font-semibold">{action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Teams & Resolution time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Assigned Responders</span>
            <div className="flex flex-wrap gap-1">
              {incident.assignedTeams.map((team, idx) => (
                <span key={idx} className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-[9px] px-2 py-0.5 rounded border border-slate-200 dark:border-white/5 font-bold">
                  {team}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Est. Closeout Window</span>
            <span className="text-sm font-extrabold text-primary dark:text-secondary font-display block">
              {incident.estResolutionTime}
            </span>
          </div>
        </div>

        {/* Tactical Timeline of Actions */}
        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/5">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">AI Dispatch Timeline Log</span>
          <div className="flex flex-col pl-1.5">
            {incident.timeline.map((item, idx) => (
              <TimelineItem
                key={idx}
                label={item.label}
                time={item.time}
                completed={item.completed}
                isLast={idx === incident.timeline.length - 1}
              />
            ))}
          </div>
        </div>

      </div>
    </DashboardCard>
  );
};
