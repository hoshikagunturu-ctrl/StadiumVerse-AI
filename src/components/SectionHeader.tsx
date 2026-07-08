import React from 'react';
import { Badge } from './ui/Badge';

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  description,
}) => {
  return (
    <div className="space-y-1 select-none">
      <Badge variant="primary" className="py-0.5 px-2 bg-primary/10 text-primary dark:text-secondary font-bold uppercase tracking-widest text-[9px]">
        {badge}
      </Badge>
      <h3 className="text-lg md:text-xl font-extrabold text-primary dark:text-secondary uppercase tracking-wider font-display">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase mt-0.5">
          {description}
        </p>
      )}
    </div>
  );
};
