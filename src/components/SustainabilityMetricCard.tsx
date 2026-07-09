import React from 'react';
import type { SustainabilityMetric } from '../data/fanSustainabilityData';
import { BaseInsightCard } from './BaseInsightCard';

interface SustainabilityMetricCardProps {
  item: SustainabilityMetric;
}

const SustainabilityMetricCardComponent: React.FC<SustainabilityMetricCardProps> = ({ item }) => {
  return (
    <BaseInsightCard
      title={item.title}
      leftStat={{
        label: "Current Value",
        value: item.currentValue,
        valueClass: "text-sm text-primary dark:text-white font-display"
      }}
      rightStat={{
        label: "Today's Trend",
        value: item.trend,
        valueClass: "text-xs text-slate-500 dark:text-slate-400"
      }}
      recommendation={item.recommendation}
    />
  );
};

export const SustainabilityMetricCard = React.memo(SustainabilityMetricCardComponent);
