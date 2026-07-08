import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', type = 'text', ...props }, ref) => {
    const inputId = React.useId();
    
    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-primary/80 dark:text-white/80 uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={`w-full text-sm px-3.5 py-2.5 bg-white dark:bg-primary-dark/50 border ${
            error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-slate-200 dark:border-white/10 focus:border-secondary focus:ring-secondary'
          } rounded-lg text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs font-medium text-red-500 flex items-center gap-1">
            ⚠️ {error}
          </span>
        )}
        {!error && helperText && (
          <span className="text-xs text-slate-500 dark:text-white/40">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
