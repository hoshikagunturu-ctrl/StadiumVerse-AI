import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/' || location.pathname === '/login') {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold mb-6 uppercase tracking-wider">
      <Link 
        to="/" 
        className="hover:text-primary dark:hover:text-white flex items-center gap-1 transition-colors"
        aria-label="Stadium Companion Home"
      >
        <Home size={13} />
        <span>Tournament Portal</span>
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const name = value
          .replace(/-/g, ' ')
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return (
          <React.Fragment key={to}>
            <ChevronRight size={12} className="text-slate-400" />
            {last ? (
              <span className="text-primary dark:text-secondary font-bold text-slate-800 dark:text-white" aria-current="page">
                {name}
              </span>
            ) : (
              <Link to={to} className="hover:text-primary dark:hover:text-white transition-colors">
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
