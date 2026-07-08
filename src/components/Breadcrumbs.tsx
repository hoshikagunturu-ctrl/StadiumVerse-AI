import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { t } = useTranslation();

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
        <span>{t("Tournament Portal")}</span>
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        let name = value
          .replace(/-/g, ' ')
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Normalize breadcrumb titles for proper translation lookup
        if (name === "Ai Assistant") name = "Ask AI Assistant";
        else if (name === "Fan Dashboard") name = "Fan Hub";
        else if (name === "Volunteer Dashboard") name = "Volunteer Grid";
        else if (name === "OrganizerDashboard") name = "Operations Command";
        else if (name === "Indoor Navigation") name = "Stadium Pathfinder";
        else if (name === "Queue Prediction") name = "Queue Analytics";
        else if (name === "Food Recommendations") name = "Gourmet Eats";
        else if (name === "Lost And Found") name = "Lost & Found Log";
        else if (name === "Eco Assistant") name = "Eco Rewards";
        else if (name === "Transport Suggestions") name = "Transit departures";
        else if (name === "Emergency Center") name = "SOS Response Room";
        else if (name === "Accessibility Mode") name = "Access Settings";
        else if (name === "Settings") name = "Control Panel";

        return (
          <React.Fragment key={to}>
            <ChevronRight size={12} className="text-slate-400" />
            {last ? (
              <span className="text-primary dark:text-secondary font-bold text-slate-800 dark:text-white" aria-current="page">
                {t(name)}
              </span>
            ) : (
              <Link to={to} className="hover:text-primary dark:hover:text-white transition-colors">
                {t(name)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
