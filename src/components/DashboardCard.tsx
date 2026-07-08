import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';

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
  return (
    <Card variant={variant} className={className} {...props}>
      <CardHeader className="py-3.5 px-5 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
        <CardTitle className="text-xs font-extrabold uppercase font-display tracking-wider text-primary dark:text-white">
          {title}
        </CardTitle>
        {headerActions && <div>{headerActions}</div>}
      </CardHeader>
      <CardContent className="p-5">
        {children}
      </CardContent>
    </Card>
  );
};
