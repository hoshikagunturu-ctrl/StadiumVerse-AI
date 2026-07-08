import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'dark' | 'pitch';
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  glow = false,
  className = '',
  ...props
}) => {
  const baseStyle = 'rounded-xl overflow-hidden shadow-sm transition-all duration-300';
  
  const variants = {
    default: 'bg-white border border-slate-100 shadow-slate-100 shadow-md',
    glass: 'glass-panel',
    dark: 'glass-panel-dark text-white border border-white/10 shadow-lg',
    pitch: 'bg-stadium-pitch/90 text-white border border-accent/30 shadow-lg bg-pitch-grid',
  };

  const glowStyle = glow ? 'ring-1 ring-secondary/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]' : '';

  return (
    <div
      className={`${baseStyle} ${variants[variant]} ${glowStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between gap-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
  <h3 className={`text-base font-bold tracking-tight text-primary dark:text-white flex items-center gap-2 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`p-5 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-white/10 flex items-center justify-end gap-2 ${className}`} {...props}>
    {children}
  </div>
);
