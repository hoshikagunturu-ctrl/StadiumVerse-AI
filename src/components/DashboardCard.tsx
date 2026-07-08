import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { useTranslation } from '../hooks/useTranslation';

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  variant?: 'default' | 'glass' | 'dark' | 'pitch';
  headerActions?: React.ReactNode;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  variant = 'default',
  headerActions,
  children,
  className = '',
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <Card variant={variant} className={className} {...props}>
      <CardHeader className="py-3.5 px-5 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
        <CardTitle className="text-xs font-extrabold uppercase font-display tracking-wider text-primary dark:text-white">
          {t(title)}
        </CardTitle>
        {headerActions && <div>{headerActions}</div>}
      </CardHeader>
      <CardContent className="p-5">
        {children}
      </CardContent>
    </Card>
  );
};
