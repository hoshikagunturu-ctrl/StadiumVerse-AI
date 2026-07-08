import React from 'react';
import { Link } from 'react-router-dom';
import { useUserRole } from '../context/UserRoleContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MetricCard } from '../components/MetricCard';
import { 
  Trophy, MapPin, Compass, Leaf, Sparkles, Utensils, 
  Clock, Bus, ShieldAlert, Award, Ticket, ChevronRight
} from 'lucide-react';

export const FanDashboard: React.FC = () => {
  const { user } = useUserRole();
  const { speak } = useAccessibility();

  if (!user || user.role !== 'fan') {
    return (
      <div className="text-center py-10 space-y-4">
        <h3 className="text-lg font-bold text-red-500">Access Denied</h3>
        <p className="text-sm">Please log in as a Fan to access this dashboard.</p>
        <Link to="/login"><Button>Go to Login</Button></Link>
      </div>
    );
  }

  const shortcuts = [
    { path: "/indoor-navigation", label: "Find My Seat", icon: <Compass size={18} className="text-secondary" />, desc: "Route from gate G" },
    { path: "/food-recommendations", label: "Order Food", icon: <Utensils size={18} className="text-[#00F0FF]" />, desc: "In-seat delivery" },
    { path: "/queue-prediction", label: "Queue Times", icon: <Clock size={18} className="text-accent-light" />, desc: "Avoid queues" },
    { path: "/eco-assistant", label: "Eco Rewards", icon: <Leaf size={18} className="text-green-500" />, desc: "850 points balance" },
    { path: "/transport-suggestions", label: "Transit Info", icon: <Bus size={18} className="text-blue-400" />, desc: "Real-time departures" },
    { path: "/emergency-center", label: "SOS Centre", icon: <ShieldAlert size={18} className="text-red-500" />, desc: "First-aid / Safety" },
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
            Spectator Command Center
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            Matchday Portal for {user.name}
          </p>
        </div>
        
        <Badge variant="secondary" className="flex items-center gap-1.5 py-1 px-3">
          <Ticket size={12} />
          <span>TICKET STAGE: ACTIVE</span>
        </Badge>
      </div>

      {/* Telemetry Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Current Match Score" 
          value="ARG 2 - 1 BRA" 
          change="82' In-Play" 
          changeType="positive"
          icon={<Trophy size={18} />} 
        />
        <MetricCard 
          title="Eco Loyalty Wallet" 
          value="850 XP" 
          change="+150 today" 
          changeType="positive"
          icon={<Award size={18} />} 
        />
        <MetricCard 
          title="Nearest Concession" 
          value="Stand B (Vegan)" 
          change="Wait: ~5 mins" 
          changeType="positive"
          icon={<Utensils size={18} />} 
        />
        <MetricCard 
          title="Assigned Stadium Gate" 
          value="Gate G" 
          change="Walk: 3 mins" 
          changeType="neutral"
          icon={<MapPin size={18} />} 
        />
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Details & Seats */}
        <Card className="lg:col-span-2 flex flex-col justify-between border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-sm uppercase tracking-wider text-primary">
              <Ticket size={16} className="text-secondary" />
              Digital Ticket & Seating telemetry
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="bg-primary text-white p-6 rounded-xl relative overflow-hidden border-2 border-secondary/30">
              {/* Pitch stripes background */}
              <div className="absolute inset-0 bg-pitch-stripes opacity-10" />
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Official Entry Document</span>
                  <h3 className="text-xl font-extrabold font-display leading-tight tracking-tight">ARGENTINA vs BRAZIL</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                    <div>
                      <span className="text-[10px] text-white/50 block font-bold uppercase">Gate</span>
                      <span className="text-sm font-bold text-white">{user.details.gate?.split(' ')[1] || 'G'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block font-bold uppercase">Section</span>
                      <span className="text-sm font-bold text-white">{user.details.section?.split(' ')[1] || '104'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block font-bold uppercase">Row</span>
                      <span className="text-sm font-bold text-white">{user.details.row?.split(' ')[1] || 'M'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block font-bold uppercase">Seat</span>
                      <span className="text-sm font-bold text-secondary font-display">{user.details.seat?.split(' ')[1] || '18'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-lg flex flex-col items-center gap-1.5 self-center">
                  {/* Mock Barcode */}
                  <div className="w-32 h-16 bg-slate-900 flex items-center justify-between px-2.5 gap-0.5">
                    {[1,4,2,6,3,1,8,4,2,3,6,1,4,2,8,3,1].map((w, idx) => (
                      <div key={idx} className="bg-white h-full" style={{ width: `${w * 1.5}px` }}></div>
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-slate-800 tracking-widest">{user.details.ticketNumber}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 flex items-center gap-3">
                <Compass className="text-secondary shrink-0" size={18} />
                <div>
                  <p className="text-primary dark:text-white font-bold">Fastest Entrance Route</p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mt-0.5">Enter Gate G, turn right, escalators to L2.</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 flex items-center gap-3">
                <Sparkles className="text-accent shrink-0" size={18} />
                <div>
                  <p className="text-primary dark:text-white font-bold">In-Seat Service Status</p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mt-0.5">Deliveries available at Row M. Concession B active.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Actions & Shortcuts */}
        <Card className="border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-sm uppercase tracking-wider text-primary">
              <Sparkles size={16} className="text-secondary" />
              Smart Matchday Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-2">
              {shortcuts.map((shortcut, idx) => (
                <Link 
                  key={idx} 
                  to={shortcut.path}
                  onClick={() => speak(`Opening ${shortcut.label}`)}
                  className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors border border-slate-100 dark:border-white/5 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/5 dark:bg-white/5 p-2 rounded-lg group-hover:scale-105 duration-200">
                      {shortcut.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-primary dark:text-white group-hover:text-secondary duration-200">{shortcut.label}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{shortcut.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-1 duration-200" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
