import React from 'react';
import type { FanInsight } from '../data/fanSustainabilityData';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { BaseInsightCard } from './BaseInsightCard';

interface FanInsightCardProps {
  item: FanInsight;
}

const FanInsightCardComponent: React.FC<FanInsightCardProps> = ({ item }) => {
  const { t } = useTranslation();
  
  const trendIcons = {
    Up: <ArrowUpRight className="text-green-500 animate-pulse shrink-0" size={12} />,
    Down: <ArrowDownRight className="text-red-500 animate-pulse shrink-0" size={12} />,
    Stable: <Minus className="text-slate-400 shrink-0" size={12} />
  };

  const trendColors = {
    Up: 'bg-green-500/10 text-green-500',
    Down: 'bg-red-500/10 text-red-500',
    Stable: 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400'
  };

  const headerAction = (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${trendColors[item.trend]}`}>
      {trendIcons[item.trend]}
      {t(item.trend)}
    </span>
  );

  return (
    <BaseInsightCard
      title={item.title}
      headerAction={headerAction}
      leftStat={{
        label: "Live Status",
        value: item.status,
        valueClass: "text-xs text-slate-700 dark:text-slate-300"
      }}
      rightStat={{
        label: "AI Rating",
        value: item.score,
        labelClass: "text-secondary",
        valueClass: "text-sm text-primary dark:text-secondary font-display"
      }}
      recommendation={item.recommendation}
      footerText={<><span>🕒 {t("Last Updated")}: {item.lastUpdated}</span></>}
    />
  );
};

export const FanInsightCard = React.memo(FanInsightCardComponent);
