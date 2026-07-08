import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MetricCard } from '../components/MetricCard';
import { useAccessibility } from '../context/AccessibilityContext';
import { Train, AlertTriangle, Leaf, MapPin } from 'lucide-react';

export const TransportSuggestions: React.FC = () => {
  const { speak } = useAccessibility();
  const [transitTab, setTransitTab] = useState<'train' | 'bus' | 'rideshare'>('train');

  const transitData = {
    train: [
      { route: 'Metro Line Green', dest: 'Downtown Hub (Central Station)', dep: '2 mins', status: 'Optimal', cap: 'Moderate' },
      { route: 'Metro Line Green', dest: 'Downtown Hub (Central Station)', dep: '5 mins', status: 'Optimal', cap: 'Low' },
      { route: 'Express Train Gold', dest: 'International Airport', dep: '8 mins', status: 'Boarding', cap: 'High' },
    ],
    bus: [
      { route: 'Shuttle 104', dest: 'East Commuter Lot', dep: '3 mins', status: 'Optimal', cap: 'Low' },
      { route: 'Shuttle 108', dest: 'South Park & Ride', dep: '7 mins', status: 'Delayed', cap: 'High' },
    ],
    rideshare: [
      { route: 'Uber/Lyft Zone A', dest: 'West Operations Gate', dep: 'Wait: ~12 mins', status: 'Surge Pricing Active', cap: 'Crowded' },
      { route: 'Official Taxi Zone', dest: 'East Operations Gate', dep: 'Wait: ~8 mins', status: 'Optimal', cap: 'Moderate' },
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
          Transit Departure Board
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          Real-time train/bus timetables, parking sensors, and carbon calculators
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Most Optimal Transit" 
          value="Green Metro Line" 
          change="Leaves in 2 mins" 
          changeType="positive"
          icon={<Train size={18} />} 
        />
        <MetricCard 
          title="Rideshare Wait Time" 
          value="12 Mins" 
          change="Surge Active" 
          changeType="negative"
          icon={<MapPin size={18} />} 
        />
        <MetricCard 
          title="Parking Zone A (West)" 
          value="95% Full" 
          change="Avoid Zone" 
          changeType="negative"
          icon={<AlertTriangle size={18} />} 
        />
        <MetricCard 
          title="Parking Zone B (East)" 
          value="40% Full" 
          change="Recommended" 
          changeType="positive"
          icon={<MapPin size={18} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Transit Timetable */}
        <Card className="lg:col-span-2 border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <CardTitle className="text-sm uppercase tracking-wider text-primary flex items-center gap-2">
              <Train size={16} className="text-secondary" />
              Schedules Timetable
            </CardTitle>
            
            <div className="flex gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-lg">
              {(['train', 'bus', 'rideshare'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setTransitTab(tab);
                    speak(`Switched timetable tab to ${tab}`);
                  }}
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded cursor-pointer transition-all ${
                    transitTab === tab 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {tab === 'train' ? 'Metro' : tab === 'bus' ? 'Shuttles' : 'Rideshare'}
                </button>
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="p-5">
            <div className="space-y-3.5">
              {transitData[transitTab].map((item, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl shadow-sm hover:scale-[1.01] duration-200 text-xs font-semibold text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-primary dark:text-white uppercase">{item.route}</span>
                      <Badge variant={item.status.includes('Optimal') || item.status.includes('Boarding') ? 'success' : 'warning'}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">{item.dest}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">Carriage Occupancy: {item.cap}</p>
                  </div>

                  <div className="flex items-center gap-3.5 ml-auto sm:ml-0">
                    <span className="text-base font-extrabold text-primary dark:text-secondary font-display">{item.dep}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        speak(`Directions requested for ${item.route}`);
                        alert(`Take East Concourse corridor, proceed past gate C exit down to Level 0 transit platform.`);
                      }}
                      className="text-[10px] uppercase font-bold py-1 h-7"
                    >
                      NAVIGATE
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Carbon Footprint Calculator */}
        <Card className="border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-sm uppercase tracking-wider text-primary">
              <Leaf size={16} className="text-secondary" />
              Transit Carbon Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4 text-left">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              See the environmental impact of your matchday transit choices. Choosing green transit rewards you with FWC Eco Points!
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="p-3 bg-green-50/50 dark:bg-green-950/10 border border-green-200/50 rounded-xl text-xs font-semibold space-y-1">
                <div className="flex justify-between items-center text-green-700 dark:text-green-400">
                  <span className="font-extrabold uppercase">Metro Rail / Shuttle</span>
                  <span className="font-extrabold">0.08 kg CO₂</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Earn +50 Eco Points on check-in</p>
              </div>

              <div className="p-3 bg-red-50/50 dark:bg-red-950/10 border border-red-200/50 rounded-xl text-xs font-semibold space-y-1">
                <div className="flex justify-between items-center text-red-700 dark:text-red-400">
                  <span className="font-extrabold uppercase">Private Taxi / Rideshare</span>
                  <span className="font-extrabold">12.40 kg CO₂</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">No Eco Points rewarded</p>
              </div>
            </div>

            <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-3.5 text-[11px] font-semibold text-slate-700 dark:text-white leading-relaxed text-left flex items-start gap-3 mt-4">
              <Leaf className="text-secondary-dark shrink-0 mt-0.5" size={16} />
              <p>Choosing the Metro over private rideshares today offsets **12.32 kg of CO₂**, equivalent to charging a smartphone **1,500 times**!</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
