import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MetricCard } from '../components/MetricCard';
import { useAccessibility } from '../context/AccessibilityContext';
import { Clock, TrendingUp, Users, AlertTriangle, RefreshCw } from 'lucide-react';

export const QueuePrediction: React.FC = () => {
  const { speak } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'food' | 'restroom' | 'gate'>('food');
  const [telemetryState, setTelemetryState] = useState('Stable');

  const waitTimesData = {
    food: [
      { name: 'Concession Stand A (Fries)', current: 12, trend: 'stable', cap: 65, color: 'bg-amber-500' },
      { name: 'Concession Stand B (Vegan)', current: 5, trend: 'falling', cap: 30, color: 'bg-green-500' },
      { name: 'Concession Stand C (Drinks)', current: 18, trend: 'rising', cap: 85, color: 'bg-red-500' },
      { name: 'Concession Stand D (Tacos)', current: 9, trend: 'stable', cap: 50, color: 'bg-green-500' },
    ],
    restroom: [
      { name: 'Restroom North Block L1', current: 14, trend: 'rising', cap: 80, color: 'bg-red-500' },
      { name: 'Restroom North Block L2', current: 3, trend: 'stable', cap: 20, color: 'bg-green-500' },
      { name: 'Restroom South Block L1', current: 6, trend: 'falling', cap: 40, color: 'bg-green-500' },
      { name: 'Restroom West Block L1', current: 11, trend: 'stable', cap: 60, color: 'bg-amber-500' },
    ],
    gate: [
      { name: 'Entrance Gate G (North)', current: 4, trend: 'stable', cap: 20, color: 'bg-green-500' },
      { name: 'Entrance Gate A (West)', current: 15, trend: 'rising', cap: 75, color: 'bg-red-500' },
      { name: 'Entrance Gate C (East)', current: 7, trend: 'falling', cap: 35, color: 'bg-green-500' },
      { name: 'Entrance Gate F (South)', current: 2, trend: 'stable', cap: 10, color: 'bg-green-500' },
    ]
  };

  const recomputeQueueData = () => {
    setTelemetryState('Recalculating...');
    setTimeout(() => {
      setTelemetryState('Stable');
      speak("Queue telemetry updated with real-time sensor loops.");
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
            Queue Intelligence Telemetry
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            Real-time sensor-based queue forecasts and congestion avoidance
          </p>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={recomputeQueueData}
          className="text-primary hover:border-primary gap-1.5 font-bold"
        >
          <RefreshCw size={14} className={telemetryState !== 'Stable' ? 'animate-spin' : ''} />
          {telemetryState === 'Stable' ? 'POLL SENSORS' : 'POLLING...'}
        </Button>
      </div>

      {/* Telemetry Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Most Optimal Food Line" 
          value="Concession B" 
          change="5 min wait" 
          changeType="positive"
          icon={<Clock size={18} />} 
        />
        <MetricCard 
          title="Most Optimal Toilet Block" 
          value="North Block L2" 
          change="3 min wait" 
          changeType="positive"
          icon={<Users size={18} />} 
        />
        <MetricCard 
          title="Optimal Exiting Gate" 
          value="Gate F (South)" 
          change="2 min wait" 
          changeType="positive"
          icon={<TrendingUp size={18} />} 
        />
        <MetricCard 
          title="System Status" 
          value="Optimal" 
          change="Sensors online" 
          changeType="positive"
          icon={<TrendingUp size={18} />} 
        />
      </div>

      {/* Interactive Tabs and Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Real-time Wait Times */}
        <Card className="lg:col-span-2 border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <CardTitle className="text-sm uppercase tracking-wider text-primary">
              <Clock size={16} className="text-secondary" />
              Live Line Telemetry
            </CardTitle>
            
            <div className="flex gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-lg">
              {(['food', 'restroom', 'gate'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    speak(`Switched queue directory tab to ${tab}`);
                  }}
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded cursor-pointer transition-all ${
                    activeTab === tab 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {tab === 'food' ? 'Dining' : tab === 'restroom' ? 'Toilets' : 'Gates'}
                </button>
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="p-5 space-y-4">
            <div className="space-y-4">
              {waitTimesData[activeTab].map((item, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm hover:scale-[1.01] duration-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wide">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Sensor Capacity: {item.cap}%</p>
                    </div>

                    <div className="flex items-center gap-3.5 ml-auto sm:ml-0">
                      <div className="text-right">
                        <span className="text-lg font-extrabold text-primary dark:text-white font-display">{item.current} MINS</span>
                        <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider text-right">
                          {item.trend === 'rising' ? '📈 Increasing' : item.trend === 'falling' ? '📉 Decreasing' : '➡️ Stable'}
                        </span>
                      </div>
                      
                      <div className="w-16 h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shrink-0">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.cap}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Smart Avoidance Guidance */}
        <Card className="border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-sm uppercase tracking-wider text-primary">
              <TrendingUp size={16} className="text-secondary" />
              AI Congestion Forecast
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4 text-left">
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50/30 dark:bg-amber-950/10 border border-amber-200/50 rounded-xl text-xs font-semibold space-y-1.5">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <AlertTriangle size={15} />
                  <span className="font-extrabold uppercase">Peak Surge Projection</span>
                </div>
                <p className="leading-relaxed">Halftime surge is projected to start in **8 minutes**. Concession Stands A & C wait times are expected to climb to **25+ minutes**.</p>
              </div>

              <div className="p-3.5 bg-green-50/30 dark:bg-green-950/10 border border-green-200/50 rounded-xl text-xs font-semibold space-y-1.5">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-extrabold uppercase">
                  <span>💡 Smart Recommendation</span>
                </div>
                <p className="leading-relaxed">Order food **now** via the app, or wait until **10 minutes post-second half kickoff** to secure a 3-minute wait time window.</p>
              </div>
            </div>

            {/* Custom SVG line chart forecasting wait times */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wait Time Surge Curve</span>
              <div className="w-full h-32 bg-slate-900 rounded-lg p-2 relative overflow-hidden border border-white/5">
                <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="12.5" x2="100" y2="12.5" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  <line x1="0" y1="37.5" x2="100" y2="37.5" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  
                  {/* Wave curve projection */}
                  <path 
                    d="M 0,40 Q 25,35 45,5 T 85,25 T 100,45" 
                    fill="none" 
                    stroke="#D4AF37" 
                    strokeWidth="2" 
                  />
                  <circle cx="45" cy="5" r="2" fill="#EF4444" className="animate-ping" />
                  <circle cx="45" cy="5" r="1" fill="#EF4444" />
                </svg>
                <div className="absolute top-1 left-2 text-[8px] font-bold text-red-500 uppercase tracking-wider">Surge Peak (Halftime)</div>
                <div className="absolute bottom-1 right-2 text-[8px] font-bold text-slate-400 uppercase tracking-wider">Match Day timeline</div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
