import React from 'react';
import type { TwinZone } from '../data/predictiveData';
import { DashboardCard } from './DashboardCard';
import { Shield, Users, Activity, Crosshair } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface ZoneDetailsPanelProps {
  selectedZone: TwinZone | null;
}

export const ZoneDetailsPanel: React.FC<ZoneDetailsPanelProps> = ({ selectedZone }) => {
  const { t } = useTranslation();

  if (!selectedZone) {
    return (
      <DashboardCard title={t("Zone Telemetry")} variant="glass" className="h-full border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark">
        <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400 space-y-4">
          <Crosshair size={48} className="text-slate-300 dark:text-slate-600 animate-pulse animate-duration-1000" />
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">{t("No Zone Selected")}</h4>
            <p className="text-[10px] font-medium max-w-xs mt-1">{t("Click any standalone sector zone inside the digital twin layout map to check live operational telemetry parameters.")}</p>
          </div>
        </div>
      </DashboardCard>
    );
  }

  const statusColors = {
    Optimal: 'bg-green-500/10 text-green-500 border border-green-500/20',
    Caution: 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
    Congested: 'bg-orange-500/10 text-orange-500 border border-orange-500/20 animate-pulse',
    Critical: 'bg-red-500/15 text-red-500 border border-red-500/30 animate-pulse font-bold',
  };

  const riskColors = {
    Low: 'text-green-500',
    Medium: 'text-amber-500',
    High: 'text-red-500'
  };

  return (
    <DashboardCard 
      title={`${t("Twin Telemetry")} • ${t(selectedZone.name)}`} 
      variant="glass" 
      className="border border-slate-100 dark:border-white/10 shadow-md h-full text-left bg-white dark:bg-stadium-dark"
    >
      <div className="space-y-4 text-xs font-semibold">
        
        {/* Status headers */}
        <div className="flex justify-between items-center bg-slate-50/50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5">
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">{t("Status")}</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${statusColors[selectedZone.status]}`}>
              {t(selectedZone.status)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">{t("Risk Level")}</span>
            <span className={`text-xs font-extrabold uppercase font-display ${riskColors[selectedZone.riskLevel]}`}>
              {t(selectedZone.riskLevel)}
            </span>
          </div>
        </div>

        {/* Detailed parameters */}
        <div className="space-y-3.5 pt-2">
          {[
            { label: "Occupancy Capacity", val: `${selectedZone.occupancy} ${t("of")} ${selectedZone.capacity}`, icon: <Users size={14} className="text-secondary" /> },
            { label: "Active Deployments", val: `${selectedZone.staffCount} ${t("Officers / Stewards")}`, icon: <Shield size={14} className="text-accent" /> },
            { label: "Entry Speed Rates", val: t(selectedZone.entryRate), icon: <Activity size={14} className="text-blue-400" /> },
            { label: "Active Incidents Logged", val: `${selectedZone.incidentCount} ${t("incidents")}`, icon: <Shield size={14} className="text-red-500" /> }
          ].map((row, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs border-b border-slate-50 dark:border-white/5 pb-2">
              <div className="flex items-center gap-2">
                {row.icon}
                <span className="text-slate-400 uppercase text-[9px] tracking-wider font-extrabold">{t(row.label)}</span>
              </div>
              <span className="text-slate-700 dark:text-white font-extrabold">{row.val}</span>
            </div>
          ))}
        </div>

      </div>
    </DashboardCard>
  );
};
