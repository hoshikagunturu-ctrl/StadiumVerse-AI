import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserRole } from '../context/UserRoleContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { useSettings } from '../context/SettingsContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MetricCard } from '../components/MetricCard';
import { 
  Brain, AlertTriangle, Users, 
  RefreshCw, ShieldAlert, Clock
} from 'lucide-react';

export const OrganizerDashboard: React.FC = () => {
  const { user } = useUserRole();
  const { speak } = useAccessibility();
  const { settings, updateSetting } = useSettings();

  // Local state for crowd simulation telemetry
  const [crowdRates, setCrowdRates] = useState({
    north: 45,
    south: 30,
    east: 40,
    west: 85 // High hotspot
  });
  const [incidents] = useState([
    { id: 'INC-402', location: 'Gate G Corridor', type: 'Mobility support', severity: 'Medium', status: 'DISPATCHED' },
    { id: 'INC-405', location: 'Sector 101 Gate 4', type: 'Chest pain report', severity: 'CRITICAL', status: 'EMT EN ROUTE' }
  ]);
  const [simulatedHotspots, setSimulatedHotspots] = useState([
    { gate: 'West Gate 1 Exit Corridor', risk: '92%', eta: '10 mins post-match', type: 'Exit Bottleneck' },
    { gate: 'Food Court Stand C Block', risk: '74%', eta: 'Halftime rush peak', type: 'Queue Jam' }
  ]);
  const [staffRecommendations] = useState([
    { text: "Redeploy 12 volunteers from South Gate (low traffic) to West Gate 1 to direct exit routing.", active: true },
    { text: "Dispatch 2 additional EMT coordinators to Sector 101 medical box.", active: true }
  ]);

  if (!user || user.role !== 'organizer') {
    return (
      <div className="text-center py-10 space-y-4">
        <h3 className="text-lg font-bold text-red-500">Access Denied</h3>
        <p className="text-sm">Please log in as an Organizer to access this dashboard.</p>
        <Link to="/login"><Button>Go to Login</Button></Link>
      </div>
    );
  }

  // Simulator telemetry shift
  const triggerSimulationShift = () => {
    setCrowdRates({
      north: Math.floor(Math.random() * 30) + 30,
      south: Math.floor(Math.random() * 20) + 20,
      east: Math.floor(Math.random() * 40) + 30,
      west: Math.floor(Math.random() * 15) + 80,
    });
    setSimulatedHotspots([
      { gate: 'West Gate 1 Exit Corridor', risk: `${Math.floor(Math.random() * 15) + 80}%`, eta: '8 mins post-match', type: 'Exit Bottleneck' },
      { gate: 'Food Court Stand C Block', risk: `${Math.floor(Math.random() * 20) + 60}%`, eta: 'Halftime rush peak', type: 'Queue Jam' }
    ]);
    speak("Telemetry recalculation complete. Hotspots and staff allocations optimized.");
  };

  const triggerEvacuationDrill = () => {
    const nextVal = !settings.evacuationMode;
    updateSetting('evacuationMode', nextVal);
    speak(nextVal ? "Attention: Global evacuation drill active. Broadcasting exit routes." : "Evacuation drill terminated.");
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
            Matchday Operations Command
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            Match Director Console: {user.name} ({user.details.organizerRank})
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={triggerSimulationShift}
            className="text-primary hover:border-primary shrink-0 gap-1.5"
          >
            <RefreshCw size={14} className="animate-spin-slow" />
            RECALCULATE TELEMETRY
          </Button>
          
          <Button 
            variant={settings.evacuationMode ? 'primary' : 'danger'} 
            size="sm" 
            onClick={triggerEvacuationDrill}
            className="shrink-0 gap-1.5 font-bold text-xs"
          >
            <ShieldAlert size={14} />
            {settings.evacuationMode ? 'DISMISS EVAC SIGNAL' : 'EVACUATION SIGNAL'}
          </Button>
        </div>
      </div>

      {/* Global Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Stadium Occupancy" 
          value="82,450 / 85,000" 
          change="97% Capacity" 
          changeType="positive"
          icon={<Users size={18} />} 
        />
        <MetricCard 
          title="Active Dispatch Alerts" 
          value={`${incidents.length} Alert Logs`} 
          change="1 critical" 
          changeType="negative"
          icon={<AlertTriangle size={18} />} 
        />
        <MetricCard 
          title="Active Field Volunteers" 
          value="120 Staff" 
          change="Zone G: 24 active" 
          changeType="positive"
          icon={<Users size={18} />} 
        />
        <MetricCard 
          title="Peak Concession Queue" 
          value="18 Mins" 
          change="Stand C Block" 
          changeType="neutral"
          icon={<Clock size={18} />} 
        />
      </div>

      {/* Main split: AI Intel on Left, Incident Control on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI OPERATIONAL INTELLIGENCE PANEL */}
        <Card className="lg:col-span-2 border-2 border-primary/20 shadow-xl overflow-hidden">
          <CardHeader className="bg-primary text-white flex items-center justify-between py-4">
            <CardTitle className="text-sm uppercase tracking-wider text-white flex items-center gap-2">
              <Brain size={18} className="text-secondary animate-pulse-glow" />
              AI Operational Intelligence Console
            </CardTitle>
            <Badge variant="secondary" className="border-secondary/20">Stadium Brain Active</Badge>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            
            {/* Grid for Crowd Density and Hotspot Predictions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Crowd Density Summaries */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Crowd Density Summaries</h4>
                <div className="space-y-2.5">
                  {[
                    { zone: "North Stand Block", val: crowdRates.north, color: "bg-green-500" },
                    { zone: "South Stand Block", val: crowdRates.south, color: "bg-green-500" },
                    { zone: "East Stand Block", val: crowdRates.east, color: "bg-green-500" },
                    { zone: "West Stand Block (Gate 1)", val: crowdRates.west, color: "bg-red-500 animate-pulse" }
                  ].map((z, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>{z.zone}</span>
                        <span className={z.val >= 80 ? "text-red-500 font-bold" : "text-slate-500"}>{z.val}% Capacity</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${z.color} rounded-full`} style={{ width: `${z.val}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Congestion Hotspot Predictions */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Congestion Hotspot Predictions</h4>
                <div className="space-y-2.5">
                  {simulatedHotspots.map((h, idx) => (
                    <div key={idx} className="p-3 bg-red-50/50 dark:bg-red-950/10 border border-red-200/50 dark:border-red-800/10 rounded-lg text-xs space-y-1.5 text-left font-semibold">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-red-600 dark:text-red-400">{h.type}</span>
                        <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold uppercase text-[9px]">{h.risk} Risk</span>
                      </div>
                      <p className="text-slate-700 dark:text-white/80">Location: {h.gate}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Estimated Peak: {h.eta}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Staff Allocation Recommendations */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/10">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Staff Allocation Recommendations</h4>
              <div className="space-y-2">
                {staffRecommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5 text-xs text-left font-semibold">
                    <span className="bg-secondary/10 text-secondary-dark px-2.5 py-1 rounded-lg font-extrabold uppercase shrink-0">RECOMMENDED</span>
                    <p className="text-slate-700 dark:text-white/80 leading-normal">{rec.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Generated Operational Insights */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/10">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">AI Generated Operational Insights</h4>
              <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 text-xs font-semibold text-slate-700 dark:text-white leading-relaxed text-left flex items-start gap-3.5">
                <Brain className="text-secondary-dark shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-extrabold text-primary dark:text-secondary-light uppercase tracking-wider mb-1">Telemetry Summary & Dispatches</p>
                  <p>West Gate 1 is experiencing anomalous exiting congestion due to sector closures on West Corridor. Recommend opening supplementary Gate A bypass and broadcasting alternative exiting navigation parameters to Fan Digital Wallets at Row M.</p>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Emergency Alert & Incidents Logs */}
        <div className="space-y-6">
          
          <Card className="border border-slate-100 shadow-md">
            <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
              <CardTitle className="text-sm uppercase tracking-wider text-primary">
                <ShieldAlert size={16} className="text-red-500" />
                Active Emergency Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-3">
                {incidents.map((inc) => (
                  <div 
                    key={inc.id} 
                    className={`p-3.5 rounded-lg border text-left space-y-2.5 text-xs font-semibold ${
                      inc.severity === 'CRITICAL' 
                        ? 'bg-red-50 border-red-200 dark:bg-red-950/20' 
                        : 'bg-amber-50/30 border-amber-200 dark:bg-amber-950/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-800 dark:text-white">{inc.id} - {inc.type}</span>
                      <span className={`px-2 py-0.5 rounded font-extrabold text-[9px] uppercase ${
                        inc.severity === 'CRITICAL' ? 'bg-red-600 text-white animate-pulse' : 'bg-amber-600 text-white'
                      }`}>{inc.severity}</span>
                    </div>
                    <p className="text-slate-600 dark:text-white/70">Location: {inc.location}</p>
                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-2">
                      <span className="text-[10px] font-bold text-primary dark:text-secondary">{inc.status}</span>
                      <Button variant="outline" size="sm" className="h-7 text-[10px] uppercase font-bold py-0">
                        Dispatch
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Concession occupancy wait times */}
          <Card className="border border-slate-100 shadow-md">
            <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
              <CardTitle className="text-sm uppercase tracking-wider text-primary">
                <Clock size={16} className="text-secondary" />
                Concession Stand Occupancies
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {[
                  { name: "Concession A (Fries)", time: "12 mins", status: "Moderate", color: "text-amber-500" },
                  { name: "Concession B (Vegan)", time: "5 mins", status: "Optimal", color: "text-green-500" },
                  { name: "Concession C (Drinks)", time: "18 mins", status: "High Wait", color: "text-red-500" }
                ].map((s, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-semibold p-2 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5">
                    <span>{s.name}</span>
                    <div className="text-right">
                      <span className="font-bold block">{s.time}</span>
                      <span className={`text-[10px] font-bold uppercase block ${s.color}`}>{s.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};
