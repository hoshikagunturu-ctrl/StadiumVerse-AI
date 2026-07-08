import React from 'react';
import { Check } from 'lucide-react';

interface TimelineItemProps {
  label: string;
  time: string;
  completed: boolean;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  label,
  time,
  completed,
  isLast = false,
}) => {
  return (
    <div className="flex gap-4 text-xs font-semibold relative select-none">
      {/* Node indicator */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[9px] ${
          completed 
            ? 'bg-accent/15 text-accent border-accent' 
            : 'bg-slate-100 text-slate-400 border-slate-300 dark:bg-white/5 dark:border-white/10'
        }`}>
          {completed ? <Check size={10} /> : '○'}
        </div>
        {!isLast && (
          <div className={`w-[2px] h-10 ${completed ? 'bg-accent' : 'bg-slate-200 dark:bg-white/5'}`} />
        )}
      </div>

      {/* Content description */}
      <div className="pb-4 space-y-1">
        <h5 className={`font-extrabold uppercase tracking-wide ${completed ? 'text-primary dark:text-white' : 'text-slate-400'}`}>
          {label}
        </h5>
        <span className="text-[9px] text-slate-400 font-bold block">{time}</span>
      </div>
    </div>
  );
};
