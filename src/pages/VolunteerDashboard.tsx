import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserRole } from '../context/UserRoleContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { MetricCard } from '../components/MetricCard';
import { 
  CheckSquare, Clipboard, Scan, 
  MapPin, ShieldAlert, Check, Calendar, Radio
} from 'lucide-react';

export const VolunteerDashboard: React.FC = () => {
  const { user } = useUserRole();
  const { speak } = useAccessibility();
  const [tasks, setTasks] = useState([
    { id: 1, text: "Verify accessibility ramp clearing at North Gate G", done: true },
    { id: 2, text: "Check ticket scanner calibration at entrance G2", done: false },
    { id: 3, text: "Report to Zone B coordination desk for halftime briefing", done: false },
    { id: 4, text: "Pre-position wheelchair support in corridor 104", done: false },
  ]);
  const [incidents] = useState([
    { id: 'INC-402', location: 'Gate G corridor', desc: 'Assist fan with broken crutch to first-aid', status: 'In-Progress', time: '18:15' },
    { id: 'INC-398', location: 'Section 104, Row M', desc: 'Spill alert - cleaning dispatch notified', status: 'Completed', time: '17:40' },
  ]);
  const [scanCode, setScanCode] = useState('');
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  if (!user || user.role !== 'volunteer') {
    return (
      <div className="text-center py-10 space-y-4">
        <h3 className="text-lg font-bold text-red-500">Access Denied</h3>
        <p className="text-sm">Please log in as a Volunteer to access this dashboard.</p>
        <Link to="/login"><Button>Go to Login</Button></Link>
      </div>
    );
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    const target = tasks.find(t => t.id === id);
    if (target) {
      speak(`Task marked as ${!target.done ? 'completed' : 'uncompleted'}`);
    }
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanCode.trim()) return;
    
    // Simulate ticket scanning logic
    if (scanCode.toUpperCase().startsWith('WC-2026-F')) {
      setScanMessage(`✅ VALID TICKET: Seat 18 Section 104 Category 1`);
      speak("Ticket scanned successfully: Valid ticket.");
    } else {
      setScanMessage(`❌ INVALID OR UNRESOLVED TICKET REFERENCE`);
      speak("Ticket verification failed.");
    }
    setScanCode('');
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
            Field Operations Grid
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            Volunteer Shift Console for {user.name} ({user.details.volunteerId})
          </p>
        </div>
        
        <Badge variant="accent" className="flex items-center gap-1.5 py-1 px-3">
          <Radio size={12} className="animate-pulse" />
          <span>Radio Channel: 4-Delta</span>
        </Badge>
      </div>

      {/* Incident & Task Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Assigned Zone" 
          value="Gate G Entrance" 
          change="Mobility Team" 
          changeType="neutral"
          icon={<MapPin size={18} />} 
        />
        <MetricCard 
          title="Shift Time" 
          value="17:00 - 23:00" 
          change="In-Progress" 
          changeType="positive"
          icon={<Calendar size={18} />} 
        />
        <MetricCard 
          title="Open Tasks" 
          value={`${tasks.filter(t => !t.done).length} / ${tasks.length}`} 
          change="Update now" 
          changeType="neutral"
          icon={<CheckSquare size={18} />} 
        />
        <MetricCard 
          title="Zone Incidents" 
          value="1 Active" 
          change="Resolved: 1" 
          changeType="positive"
          icon={<ShieldAlert size={18} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks List */}
        <Card className="border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-sm uppercase tracking-wider text-primary">
              <CheckSquare size={16} className="text-secondary" />
              Shift Tasks Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3">
              {tasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="w-full text-left flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-100 dark:border-white/5 transition-colors cursor-pointer"
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${task.done ? 'bg-accent border-accent text-white' : 'border-slate-300 bg-white'}`}>
                    {task.done && <Check size={12} />}
                  </div>
                  <span className={`text-xs font-semibold leading-normal ${task.done ? 'line-through text-slate-400' : 'text-slate-700 dark:text-white/80'}`}>
                    {task.text}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Incidents Dispatch Panel */}
        <Card className="border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-sm uppercase tracking-wider text-primary">
              <Clipboard size={16} className="text-secondary" />
              Incidents Dispatch Log
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3">
              {incidents.map(inc => (
                <div 
                  key={inc.id} 
                  className={`p-3 rounded-lg border text-left space-y-2 text-xs font-semibold ${
                    inc.status === 'In-Progress' 
                      ? 'bg-amber-50/30 border-amber-200 dark:bg-amber-950/10' 
                      : 'bg-green-50/30 border-green-200 dark:bg-green-950/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-primary dark:text-secondary">{inc.id}</span>
                    <Badge variant={inc.status === 'In-Progress' ? 'warning' : 'success'}>
                      {inc.status}
                    </Badge>
                  </div>
                  <p className="text-slate-700 dark:text-white/80 leading-normal">{inc.desc}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase pt-1">
                    <span>📍 {inc.location}</span>
                    <span>🕒 {inc.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ticket Scanner Sim */}
        <Card className="border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-sm uppercase tracking-wider text-primary">
              <Scan size={16} className="text-secondary" />
              Entry barcode scanner
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Simulate scanning a digital ticket. Enter the ticket ID below (e.g. `WC-2026-F8902`).
            </p>
            
            <form onSubmit={handleScan} className="space-y-3">
              <Input 
                value={scanCode}
                onChange={(e) => setScanCode(e.target.value)}
                placeholder="Type or paste ticket barcode..."
                aria-label="Ticket Reference Entry"
              />
              <Button type="submit" variant="primary" fullWidth className="text-xs tracking-wider uppercase">
                VERIFY TICKET
              </Button>
            </form>

            {scanMessage && (
              <div className={`p-3 rounded-lg border text-xs font-bold text-center leading-relaxed ${
                scanMessage.startsWith('❌') 
                  ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20' 
                  : 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20'
              }`}>
                {scanMessage}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
