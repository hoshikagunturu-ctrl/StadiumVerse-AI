import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StadiumMap } from '../components/StadiumMap';
import { useAccessibility } from '../context/AccessibilityContext';
import { useSettings } from '../context/SettingsContext';
import { ShieldAlert, Phone, AlertOctagon, HeartPulse, Send } from 'lucide-react';

export const EmergencyCenter: React.FC = () => {
  const { speak } = useAccessibility();
  const { updateSetting } = useSettings();
  const [sosTriggered, setSosTriggered] = useState(false);
  const [incidentText, setIncidentText] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  const handleSos = () => {
    const nextSos = !sosTriggered;
    setSosTriggered(nextSos);
    if (nextSos) {
      speak("Emergency SOS Triggered. Dispatching security and medical personnel to Row M, Seat 18 immediately. Please remain at your seat.");
      // Auto-trigger evacuation Mode for demo visual reinforcement
      updateSetting('evacuationMode', true);
    } else {
      speak("SOS alert cancelled.");
      updateSetting('evacuationMode', false);
    }
  };

  const handleIncidentReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentText.trim()) return;
    setReportSuccess(true);
    speak("Incident report submitted. Stadium Control Dispatch has received your ticket coordinate telemetry.");
    setIncidentText('');
    setTimeout(() => setReportSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
          SOS Emergency Command Room
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          Instant assistance dispatch and safety evacuation guides
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SOS Action Card */}
        <div className="space-y-6">
          <Card className={`border-2 shadow-xl text-center overflow-hidden transition-colors duration-300 ${sosTriggered ? 'border-red-600 bg-red-50 dark:bg-red-950/20' : 'border-slate-100'}`}>
            <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 flex justify-between items-center py-3">
              <CardTitle className="text-xs uppercase tracking-wider text-primary">
                <AlertOctagon size={16} className="text-red-500" />
                Medical & Safety SOS
              </CardTitle>
              <Badge variant={sosTriggered ? 'danger' : 'outline'}>
                {sosTriggered ? 'DISPATCH ACTIVE' : 'STANDBY'}
              </Badge>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Tap the button below to instantly trigger emergency dispatch to your exact seating telemetry.
              </p>
              
              <div className="flex justify-center">
                <button
                  onClick={handleSos}
                  className={`w-36 h-36 rounded-full flex flex-col items-center justify-center font-bold tracking-widest text-white shadow-2xl transition-all duration-300 cursor-pointer border-4 border-white ${
                    sosTriggered 
                      ? 'bg-red-700 animate-pulse scale-95 shadow-red-500/50' 
                      : 'bg-red-600 hover:bg-red-500 hover:scale-105 shadow-red-600/30'
                  }`}
                  aria-label="Trigger Emergency SOS Dispatch"
                  aria-pressed={sosTriggered}
                >
                  <ShieldAlert size={36} className="mb-2" />
                  <span className="text-sm font-extrabold uppercase font-display">SOS</span>
                  <span className="text-[9px] text-white/80 uppercase font-bold mt-1">
                    {sosTriggered ? 'CANCEL SOS' : 'TAP TO TRIGGER'}
                  </span>
                </button>
              </div>

              {sosTriggered && (
                <div className="p-3 bg-red-100 text-red-800 rounded-lg text-xs font-bold leading-normal text-left">
                  🚨 **DISPATCH ACTIVE**: Medical and safety coordinators are en route to **Section 104, Row M, Seat 18**. Please remain where you are.
                </div>
              )}
            </CardContent>
          </Card>

          {/* First Aid Hotlines */}
          <Card className="border border-slate-100 shadow-md text-left">
            <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
              <CardTitle className="text-xs uppercase tracking-wider text-primary">
                <Phone size={16} className="text-secondary" />
                Safety Communications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5 text-xs font-semibold">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-white/5 rounded-lg">
                <div>
                  <p className="text-primary dark:text-white font-extrabold">Emergency Command</p>
                  <p className="text-slate-400 font-bold uppercase text-[9px] mt-0.5">Control Room hotline</p>
                </div>
                <a href="tel:+18005552026" className="text-secondary-dark font-extrabold hover:underline">+1 800 555-2026</a>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-white/5 rounded-lg">
                <div>
                  <p className="text-primary dark:text-white font-extrabold">First Aid Station East</p>
                  <p className="text-slate-400 font-bold uppercase text-[9px] mt-0.5">Level 1 medical center</p>
                </div>
                <a href="tel:+18005550199" className="text-secondary-dark font-extrabold hover:underline">+1 800 555-0199</a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Evacuation Map & Incident Reporter */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-slate-100 shadow-md">
            <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
              <CardTitle className="text-sm uppercase tracking-wider text-primary">
                <HeartPulse size={16} className="text-secondary" />
                Evacuation Exit Route Telemetry
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <StadiumMap activeRoute="exit" showEmergencyExits={true} />
            </CardContent>
          </Card>

          {/* Form to report specific details */}
          <Card className="border border-slate-100 shadow-md">
            <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
              <CardTitle className="text-xs uppercase tracking-wider text-primary">
                <Send size={16} className="text-secondary" />
                Report Stadium Incident
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <form onSubmit={handleIncidentReport} className="flex gap-2">
                <input
                  type="text"
                  value={incidentText}
                  onChange={(e) => setIncidentText(e.target.value)}
                  placeholder="Report slips, broken chairs, blocked corridors..."
                  className="flex-1 text-sm px-3.5 py-2.5 bg-white dark:bg-primary-dark/50 border border-slate-200 dark:border-white/10 focus:border-secondary focus:ring-secondary rounded-lg text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                  aria-label="Report Stadium Incident Description"
                />
                <Button type="submit" variant="primary" className="px-5 shrink-0">
                  SEND LOG
                </Button>
              </form>
              {reportSuccess && (
                <div className="p-2.5 bg-green-50 border border-green-200 text-green-800 rounded-lg text-xs font-bold mt-3 text-center">
                  Incident details successfully transmitted to Command Dispatch.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};
