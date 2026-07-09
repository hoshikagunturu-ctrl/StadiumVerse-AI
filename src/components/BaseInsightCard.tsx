import React from 'react';
import { Card, CardContent } from './ui/Card';
import { useTranslation } from '../hooks/useTranslation';

export interface StatItem {
  label: string;
  value: string | number;
  labelClass?: string;
  valueClass?: string;
}

interface BaseInsightCardProps {
  title: string;
  headerAction?: React.ReactNode;
  leftStat?: StatItem;
  rightStat?: StatItem;
  recommendation: string;
  footerText?: React.ReactNode;
}

const BaseInsightCardComponent: React.FC<BaseInsightCardProps> = ({
  title,
  headerAction,
  leftStat,
  rightStat,
  recommendation,
  footerText,
}) => {
  const { t } = useTranslation();
  return (
    <Card variant="glass" className="hover:scale-[1.03] duration-300 border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark">
      <CardContent className="p-4 space-y-3.5 text-left bg-white dark:bg-stadium-dark">
        {/* Title Block */}
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            {t(title)}
          </span>
          {headerAction}
        </div>

        {/* Stats Column details */}
        {(leftStat || rightStat) && (
          <div className="flex justify-between items-baseline">
            {leftStat && (
              <div>
                <span className={`text-[9px] font-bold block uppercase ${leftStat.labelClass || 'text-slate-400'}`}>
                  {t(leftStat.label)}
                </span>
                <span className={`font-extrabold uppercase ${leftStat.valueClass || 'text-xs text-slate-700 dark:text-slate-300'}`}>
                  {t(leftStat.value.toString())}
                </span>
              </div>
            )}
            {rightStat && (
              <div className="text-right">
                <span className={`text-[9px] font-bold block uppercase ${rightStat.labelClass || 'text-slate-400'}`}>
                  {t(rightStat.label)}
                </span>
                <span className={`font-extrabold uppercase ${rightStat.valueClass || 'text-xs text-slate-500 dark:text-slate-400'}`}>
                  {t(rightStat.value.toString())}
                </span>
              </div>
            )}
          </div>
        )}

        {/* AI Recommendation */}
        <div className="space-y-1 pt-2 border-t border-slate-50 dark:border-white/5">
          <span className="text-[9px] text-slate-400 font-bold block uppercase">{t("AI Recommendation")}</span>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
            "{t(recommendation)}"
          </p>
        </div>

        {/* Footer */}
        {footerText && (
          <div className="text-right text-[8px] text-slate-400 font-bold uppercase pt-1 border-t border-slate-50 dark:border-white/5">
            {footerText}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const BaseInsightCard = React.memo(BaseInsightCardComponent);
