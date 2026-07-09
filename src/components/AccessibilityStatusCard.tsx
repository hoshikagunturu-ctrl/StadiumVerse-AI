import React from 'react';
import type { AccessibilityItem } from '../data/fanSustainabilityData';
import { BaseInsightCard } from './BaseInsightCard';

interface AccessibilityStatusCardProps {
  item: AccessibilityItem;
}

export const AccessibilityStatusCard: React.FC<AccessibilityStatusCardProps> = ({ item }) => {
  return (
    <BaseInsightCard
      title={item.title}
      leftStat={{
        label: "Current Status",
        value: item.status,
        valueClass: "text-xs text-slate-700 dark:text-slate-300"
      }}
      rightStat={{
        label: "Availability",
        value: item.availability,
        labelClass: "text-accent",
        valueClass: "text-sm text-primary dark:text-secondary font-display"
      }}
      recommendation={item.recommendation}
    />
  );
};
