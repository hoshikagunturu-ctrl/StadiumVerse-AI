import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, ChevronRight, Globe, Clock, 
  ShieldAlert, Brain, Accessibility, 
  Thermometer, Activity, Compass, 
  Tv, Radio, Shield, ArrowRight, 
  CheckCircle, Train, Car, Bus, Wind, CloudRain, Eye
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAccessibility } from '../context/AccessibilityContext';
import { useUserRole } from '../context/UserRoleContext';
import type { UserRole } from '../context/UserRoleContext';
import { StatusBadge } from '../components/StatusBadge';
import { DashboardCard } from '../components/DashboardCard';
import { mockIncidents, mockStats } from '../data/incidentsData';
import { IncidentCard } from '../components/IncidentCard';
import { ResponsePanel } from '../components/ResponsePanel';
import { StatisticsCard } from '../components/StatisticsCard';
import { mockForecasts, mockTwinZones, mockForecastInsights } from '../data/predictiveData';
import { ForecastCard } from '../components/ForecastCard';
import { InsightCard } from '../components/InsightCard';
import { ZoneDetailsPanel } from '../components/ZoneDetailsPanel';
import { mockFanInsights, mockAccessibilityItems, mockSustainabilityMetrics, mockNotifications } from '../data/fanSustainabilityData';
import { SectionHeader } from '../components/SectionHeader';
import { FanInsightCard } from '../components/FanInsightCard';
import { AccessibilityStatusCard } from '../components/AccessibilityStatusCard';
import { SustainabilityMetricCard } from '../components/SustainabilityMetricCard';
import { NotificationItem } from '../components/NotificationItem';
import { useTranslation } from '../hooks/useTranslation';

export const LandingPage: React.FC = () => {
  const { speak } = useAccessibility();
  const { login } = useUserRole();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Simulated live operations counters
  const [matchTime, setMatchTime] = useState(67);
  const [attendance, setAttendance] = useState(82450);
  const [gate4Queue, setGate4Queue] = useState(12);
  const [stadiumTemp, setStadiumTemp] = useState(26);
  const [lastUpdatedTime, setLastUpdatedTime] = useState('');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>(mockIncidents[0].id);
  const [selectedTwinZoneId, setSelectedTwinZoneId] = useState<string>(mockTwinZones[0].id);

  useEffect(() => {
    const now = new Date();
    setLastUpdatedTime(now.toLocaleTimeString());

    const interval = setInterval(() => {
      // 1. Tick match time
      setMatchTime(prev => (prev < 90 ? prev + 1 : 67));
      
      // 2. Wiggle attendance
      setAttendance(prev => prev + (Math.random() > 0.5 ? 3 : -2));
      
      // 3. Queue fluctuations
      setGate4Queue(prev => Math.max(5, Math.min(25, prev + (Math.random() > 0.6 ? 1 : -1))));
      
      if (Math.random() > 0.8) {
        setStadiumTemp(prev => Math.max(24, Math.min(28, prev + (Math.random() > 0.5 ? 1 : -1))));
      }

      // Update timestamp on each tick
      const t = new Date();
      setLastUpdatedTime(t.toLocaleTimeString());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleRoleQuickAction = useCallback((role: UserRole) => {
    login(role);
    speak(`Switched profile console to ${role}`);
    navigate(`/${role}-dashboard`);
  }, [login, speak, navigate]);

  const coreCapabilities = useMemo(() => [
    { 
      path: "/ai-assistant", 
      title: "Multilingual AI Assistant", 
      desc: "Instant conversational concierge translating queries into 4 major tournament languages in real time.", 
      icon: <Globe className="text-secondary" size={20} />,
      benefit: "In-seat order processing and general stadium help."
    },
    { 
      path: "/indoor-navigation", 
      title: "Indoor Navigation Pathfinder", 
      desc: "High-precision SVG-drawn paths directing fans from exterior entrance gates to section rows and seats.", 
      icon: <Compass className="text-accent" size={20} />,
      benefit: "Avoid complex physical map bottlenecking."
    },
    { 
      path: "/queue-prediction", 
      title: "Live Queue Intelligence", 
      desc: "Predictive wait times for food concession stands, restrooms, and security exits powered by crowd sensor loops.", 
      icon: <Clock className="text-[#00F0FF]" size={20} />,
      benefit: "Saves up to 18 minutes of lineup waiting."
    },
    { 
      path: "/emergency-center", 
      title: "Emergency Response AI", 
      desc: "One-tap panic SOS system dispatching coordinates directly to stadium coordinators and first-aid EMTs.", 
      icon: <ShieldAlert className="text-red-500" size={20} />,
      benefit: "Critical response time reduced to seconds."
    },
    { 
      path: "/organizer-dashboard", 
      title: "Operational Intelligence", 
      desc: "Crowd density hotspots forecasting models, volunteer availability logs, and automated staffing redeployments.", 
      icon: <Brain className="text-amber-400" size={20} />,
      benefit: "Centralized operational oversight command."
    },
    { 
      path: "/accessibility-mode", 
      title: "Accessibility Assistant", 
      desc: "Vocal speech narrator overlays, high-contrast layouts, text scaling, and clear focus-state keyboard navigations.", 
      icon: <Accessibility className="text-blue-400" size={20} />,
      benefit: "Fully WCAG compliant tournament companion."
    }
  ], []);

  const roles = useMemo(() => [
    {
      role: 'fan' as UserRole,
      title: 'Fan',
      icon: <Trophy className="text-secondary" size={22} />,
      responsibilities: "Spectating matches, navigating stalls, and offsetting carbon.",
      benefits: "Access digital wallets, check wait times, preorder food delivery to seat.",
      btnText: "CONNECT AS FAN",
      color: "primary" as const
    },
    {
      role: 'volunteer' as UserRole,
      title: 'Volunteer',
      icon: <Radio className="text-accent-light" size={22} />,
      responsibilities: "Assisting mobility flows, verifying tickets, logging incidents.",
      benefits: "Interactive check-ins checklists, real-time dispatcher logs, SOS notifications.",
      btnText: "CONNECT AS VOLUNTEER",
      color: "accent" as const
    },
    {
      role: 'organizer' as UserRole,
      title: 'Organizer',
      icon: <Shield className="text-secondary" size={22} />,
      responsibilities: "Stadium safety, crowd routing, volunteer tracking.",
      benefits: "AI operational telemetry feeds, hotspot risk warnings, global evac drills toggle.",
      btnText: "CONNECT AS ORGANIZER",
      color: "secondary" as const
    },
    {
      role: 'volunteer' as UserRole, // Map to volunteer dashboard for demo context
      title: 'Venue Staff',
      icon: <Activity className="text-blue-400" size={22} />,
      responsibilities: "Restocking concessions, checking facility sensors, cleanup logs.",
      benefits: "Sensor capacity heatmaps, inventory stock triggers, queue time graphs.",
      btnText: "CONNECT AS VENUE STAFF",
      color: "outline" as const
    }
  ], []);

  return (
    <div className="space-y-12 py-4">
      
      {/* Hero Banner Section */}
      <section 
        className="relative bg-stadium-lights p-8 md:p-14 rounded-3xl border border-white/10 text-white overflow-hidden text-center select-none"
        aria-labelledby="hero-heading"
      >
        {/* Pitch patterns & gradient blur glow */}
        <div className="absolute inset-0 bg-pitch-stripes opacity-5" />
        <div className="absolute inset-0 bg-pitch-grid opacity-10" />
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6 animate-fade-in">
          <div className="flex justify-center">
            <Badge variant="secondary" className="flex items-center gap-1.5 py-1.5 px-3.5 border border-secondary/20 font-bold uppercase tracking-widest text-[9px] bg-secondary/10">
              <Tv size={12} className="animate-pulse text-secondary" />
               <span>{t("StadiumVerse AI Operating Network")}</span>
            </Badge>
          </div>
          
          <h1 id="hero-heading" className="text-4xl md:text-6xl font-extrabold tracking-tight font-display text-white">
            StadiumVerse <span className="text-secondary">AI</span>
          </h1>
          
          <p className="text-slate-300 text-xs md:text-sm font-semibold tracking-wider uppercase">
            {t("AI-Powered Smart Stadium Platform for FIFA World Cup 2026")}
          </p>
          
          <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-medium">
            {t("Bridging fan experience and automated venue logistics. Monitor real-time crowd dynamics, dispatch instant emergency assistance, calculate queue telemetry, and offset carbon loads.")}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3.5 pt-4">
            <Link 
              to="/login" 
              onClick={() => speak("Connecting to operations dashboard console switcher")}
            >
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-xs tracking-wider uppercase font-bold px-6 border-b-4 border-secondary-dark">
                {t("AUTHORIZE CONSOLE")}
                <ChevronRight size={14} />
              </Button>
            </Link>
            <Link 
              to="/accessibility-mode"
              onClick={() => speak("Opening accessibility scaler settings")}
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-xs tracking-wider text-white border-white/20 hover:bg-white/10 hover:border-white">
                {t("ACCESSIBILITY OPTIONS")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NEW SECTION — LIVE MATCH OPERATIONS CENTER */}
      <section className="space-y-4 text-left">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="success" className="mb-1 py-0.5 px-2 bg-green-500/10 text-green-500 font-bold uppercase tracking-widest text-[9px]">
              {t("Live telemetry feed")}
            </Badge>
            <h2 className="text-lg md:text-xl font-extrabold text-primary dark:text-secondary uppercase tracking-wider font-display">
              {t("Live Match Operations Center")}
            </h2>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            {t("Live Stream Active")}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-semibold text-xs text-left">
          
          {/* Current Match */}
          <Card className="border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block tracking-wider">⚽ {t("Current Match")}</span>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-base font-extrabold text-primary dark:text-white">{t("Brazil")}</span>
                <span className="text-xs font-bold text-slate-400 uppercase">{t("vs")}</span>
                <span className="text-base font-extrabold text-primary dark:text-white">{t("Japan")}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-50 dark:border-white/5 pt-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">
                <span>{t("Group Stage")}</span>
                <Badge variant="success" className="animate-pulse">{matchTime}' {t("In-Play")}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Stadium */}
          <Card className="border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block tracking-wider">🏟 {t("Stadium")}</span>
              <div className="mt-3">
                <span className="text-sm font-extrabold text-primary dark:text-white block">{t("Lusail Stadium")}</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block mt-0.5">{t("Doha, Qatar")}</span>
              </div>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold block uppercase border-t border-slate-50 dark:border-white/5 pt-2">{t("Host Venue")}</span>
            </CardContent>
          </Card>

          {/* Attendance */}
          <Card className="border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block tracking-wider">👥 {t("Attendance")}</span>
              <div className="mt-3">
                <span className="text-sm font-extrabold text-primary dark:text-white block font-display">{attendance.toLocaleString()}</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block mt-0.5">/ {t("85,000 max")}</span>
              </div>
              <span className="text-[9px] text-green-600 dark:text-accent-light font-bold block uppercase border-t border-slate-50 dark:border-white/5 pt-2">{t("97% Capacity")}</span>
            </CardContent>
          </Card>

          {/* Weather */}
          <Card className="border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block tracking-wider">🌦 {t("Weather")}</span>
              <div className="mt-3 flex items-center gap-1.5">
                <Thermometer size={16} className="text-secondary shrink-0" />
                <div>
                  <span className="text-sm font-extrabold text-primary dark:text-white block">{stadiumTemp}°C</span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 block mt-0.5">{t("Clear Sky")}</span>
                </div>
              </div>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold block uppercase border-t border-slate-50 dark:border-white/5 pt-2">{t("Cooling grid on")}</span>
            </CardContent>
          </Card>

          {/* Gate 4 Queue */}
          <Card className="border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block tracking-wider">🚪 {t("Gate 4 Queue")}</span>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-extrabold text-primary dark:text-white">{t("Medium Flow")}</span>
                <Badge variant="warning">{gate4Queue} {t("Mins")}</Badge>
              </div>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold block uppercase border-t border-slate-50 dark:border-white/5 pt-2">{t("Entrance Gate")}</span>
            </CardContent>
          </Card>

          {/* Emergency Status */}
          <Card className="border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block tracking-wider">🚨 {t("Emergency Status")}</span>
              <div className="mt-3 flex items-center gap-2">
                <CheckCircle size={16} className="text-accent dark:text-accent-light shrink-0" />
                <span className="text-xs font-bold text-accent dark:text-accent-light uppercase tracking-wider">{t("No Active Alerts")}</span>
              </div>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold block uppercase border-t border-slate-50 dark:border-white/5 pt-2">{t("EMT Standby")}</span>
            </CardContent>
          </Card>

          {/* Metro Status */}
          <Card className="border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">🚆 {t("Metro Status")}</span>
              <div className="mt-3 flex items-center gap-2">
                <CheckCircle size={16} className="text-accent dark:text-accent-light shrink-0" />
                <span className="text-xs font-bold text-accent dark:text-accent-light uppercase tracking-wider">{t("Running Normally")}</span>
              </div>
              <span className="text-[9px] text-slate-400 font-bold block uppercase border-t border-slate-50 dark:border-white/5 pt-2">{t("Green/Red Lines")}</span>
            </CardContent>
          </Card>

          {/* Large AI Recommendation Card */}
          <Card className="md:col-span-4 border border-secondary/30 dark:border-secondary/50 shadow-md bg-secondary/5 dark:bg-secondary/10 overflow-hidden">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="bg-secondary/15 dark:bg-secondary/20 p-2 rounded-xl text-secondary-dark dark:text-secondary shrink-0 animate-pulse">
                <Brain size={20} />
              </div>
              <div className="space-y-1 text-left flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-primary dark:text-secondary uppercase tracking-wider block">{t("AI Operational Advisory")}</span>
                  <Badge variant="danger" className="text-[8px]">{t("94% Confidence")}</Badge>
                </div>
                <p className="text-slate-800 dark:text-white font-extrabold text-xs md:text-sm leading-relaxed mt-1">
                  "{t("AI predicts Gate 4 congestion within the next 12 minutes. Suggested action: Redirect arriving fans to Gate 6 bypass corridor immediately.")}"
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* NEW SECTION — AI OPERATIONAL INTELLIGENCE */}
      <section className="space-y-4 text-left animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="primary" className="mb-1 py-0.5 px-2 bg-primary/10 text-primary dark:text-secondary font-bold uppercase tracking-widest text-[9px]">
              {t("Decision advisory grid")}
            </Badge>
            <h2 className="text-lg md:text-xl font-extrabold text-primary dark:text-secondary uppercase tracking-wider font-display">
              {t("AI Operational Intelligence")}
            </h2>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            {t("Last Updated")}: {lastUpdatedTime}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Crowd Forecast",
              recommendation: "Gate 4 is expected to exceed safe capacity in 12 minutes.",
              confidence: "96%",
              priority: "High",
              time: "19:42"
            },
            {
              title: "Staff Allocation",
              recommendation: "Deploy 4 additional volunteers to East Entrance.",
              confidence: "91%",
              priority: "Medium",
              time: "19:40"
            },
            {
              title: "Queue Optimization",
              recommendation: "Redirect spectators to Gate 6 to reduce congestion by 25%.",
              confidence: "93%",
              priority: "High",
              time: "19:38"
            },
            {
              title: "Food & Inventory",
              recommendation: "Food Stall B is predicted to run out of bottled water within 18 minutes.",
              confidence: "87%",
              priority: "Low",
              time: "19:35"
            },
            {
              title: "Emergency Monitoring",
              recommendation: "No active incidents. Emergency response readiness: 98%.",
              confidence: "98%",
              priority: "Low",
              time: "19:45"
            },
            {
              title: "Sustainability",
              recommendation: "Recycling stations are 78% utilized. Open additional collection point near Gate 2.",
              confidence: "90%",
              priority: "Low",
              time: "19:30"
            }
          ].map((item, idx) => (
            <Card key={idx} variant="glass" className="hover:scale-[1.03] duration-300 border border-slate-100 dark:border-white/10 shadow-md flex flex-col justify-between">
              <CardHeader className="bg-slate-50/50 dark:bg-white/5 pb-2.5 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <div className="bg-secondary/15 p-1.5 rounded-lg text-secondary-dark dark:text-secondary shrink-0">
                    <Brain size={14} />
                  </div>
                  <CardTitle className="text-xs font-extrabold uppercase font-display tracking-wider text-primary dark:text-white">
                    {item.title}
                  </CardTitle>
                </div>
                <Badge variant={item.priority === 'High' ? 'danger' : item.priority === 'Medium' ? 'warning' : 'info'}>
                  {item.priority}
                </Badge>
              </CardHeader>
              <CardContent className="p-4 flex-1 flex flex-col justify-between gap-4">
                <p className="text-xs text-slate-700 dark:text-white leading-relaxed font-semibold">
                  "{item.recommendation}"
                </p>
                <div className="border-t border-slate-50 dark:border-white/5 pt-2 flex items-center justify-between text-[9px] text-slate-400 font-bold uppercase">
                  <span>🎯 Conf: {item.confidence}</span>
                  <span>🕒 {item.time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION — TOURNAMENT COMMAND DASHBOARD */}
      <section className="space-y-6 text-left">
        <div>
          <Badge variant="primary" className="mb-1 py-0.5 px-2 bg-primary/10 text-primary dark:text-secondary font-bold uppercase tracking-widest text-[9px]">
            {t("Operations Console")}
          </Badge>
          <h2 className="text-lg md:text-xl font-extrabold text-primary dark:text-secondary uppercase tracking-wider font-display">
            {t("Tournament Command Dashboard")}
          </h2>
        </div>

        {/* 12-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT PANEL (8 columns on desktop) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tournament Health status card */}
            <DashboardCard title="Tournament Health" variant="glass" className="border border-slate-100 dark:border-white/10 shadow-md">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: "Stadium Readiness", val: "98%", progress: 98, glowColor: "accent" },
                  { name: "Crowd Flow", val: "Normal", progress: 95, glowColor: "accent" },
                  { name: "AI Risk Score", val: "Low", progress: 12, glowColor: "success" },
                  { name: "Emergency Teams", val: "24 Active", progress: 80, glowColor: "primary" },
                  { name: "Active Venues", val: "16", progress: 100, glowColor: "primary" },
                  { name: "Connected Sensors", val: "18,240", progress: 99, glowColor: "accent" }
                ].map((kpi, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:scale-[1.03] transition-all duration-300 shadow-sm relative group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 duration-300 rounded-xl pointer-events-none" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">{kpi.name}</span>
                    <span className="text-base font-extrabold text-primary dark:text-white block mt-2 font-display">{kpi.val}</span>
                    
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden mt-3">
                      <div 
                        className={`h-full rounded-full ${
                          kpi.glowColor === 'accent' ? 'bg-accent shadow-[0_0_8px_rgba(0,132,61,0.5)]' :
                          kpi.glowColor === 'success' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                          'bg-primary dark:bg-secondary'
                        }`} 
                        style={{ width: `${kpi.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

            {/* Match Timeline Card */}
            <DashboardCard title="Matchday Operations Timeline" variant="glass" className="border border-slate-100 dark:border-white/10 shadow-md">
              <div className="flex flex-col sm:flex-row gap-4 overflow-x-auto pb-2 scrollbar-thin">
                {[
                  { match: "Mexico 🇲🇽 vs Japan 🇯🇵", time: "15:00", venue: "Estadio Azteca", capacity: "87,500", status: "Live" as const },
                  { match: "Brazil 🇧🇷 vs Germany 🇩🇪", time: "18:00", venue: "Lusail Stadium", capacity: "85,000", status: "Security Check" as const },
                  { match: "Spain 🇪🇸 vs USA 🇺🇸", time: "21:00", venue: "MetLife Stadium", capacity: "82,500", status: "Ready" as const },
                  { match: "Argentina 🇦🇷 vs France 🇫🇷", time: "Tomorrow", venue: "SoFi Stadium", capacity: "70,000", status: "Preparing" as const }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="min-w-[200px] flex-1 p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-bold block">{item.time}</span>
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-extrabold text-primary dark:text-white block truncate uppercase">{item.match}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block truncate">{item.venue}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold block border-t border-slate-50 dark:border-white/5 pt-1.5 uppercase">
                      👥 Cap: {item.capacity}
                    </span>
                  </div>
                ))}
              </div>
            </DashboardCard>

          </div>

          {/* RIGHT PANEL (4 columns on desktop) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Card 1: Security Overview */}
            <DashboardCard title="Security Overview" variant="glass" className="border border-slate-100 dark:border-white/10 shadow-md">
              <div className="space-y-4">
                {/* CSS Only Radar Graphic */}
                <div className="relative w-28 h-28 mx-auto bg-primary-dark/80 rounded-full border border-accent/20 flex items-center justify-center overflow-hidden shadow-inner">
                  {/* Concentric grid circles */}
                  <div className="absolute w-20 h-20 rounded-full border border-accent/5" />
                  <div className="absolute w-12 h-12 rounded-full border border-accent/10" />
                  <div className="absolute w-6 h-6 rounded-full border border-accent/10" />
                  
                  {/* Crosshairs */}
                  <div className="absolute w-full h-[1px] bg-accent/5" />
                  <div className="absolute w-[1px] h-full bg-accent/5" />
                  
                  {/* Sweeping Hand */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-transparent rounded-full animate-spin [animation-duration:3s]" />
                  
                  {/* Glowing Blips */}
                  <div className="absolute top-6 left-10 w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  <div className="absolute bottom-6 right-8 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                </div>

                <div className="flex justify-between items-center text-xs font-bold border-b border-slate-50 dark:border-white/5 pb-2">
                  <span className="text-slate-400 uppercase text-[9px] tracking-wider">Overall Status</span>
                  <Badge variant="success">Stable</Badge>
                </div>

                <div className="space-y-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">
                  {[
                    { name: "Crowd Density", state: "Normal" },
                    { name: "Restricted Zones", state: "Secure" },
                    { name: "Entry Gates", state: "Active Patrol" },
                    { name: "Drone Patrol", state: "On Flight" },
                    { name: "Medical Readiness", state: "EMT Standby" }
                  ].map((sec, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span>{sec.name}</span>
                      <span className="text-primary dark:text-secondary">{sec.state}</span>
                    </div>
                  ))}
                </div>
              </div>
            </DashboardCard>

            {/* Card 2: Transportation Status */}
            <DashboardCard title="Transportation Status" variant="glass" className="border border-slate-100 dark:border-white/10 shadow-md">
              <div className="space-y-3.5">
                {[
                  { name: "Metro Green Line", val: "3m Wait", prc: 98, icon: <Train size={14} className="text-secondary" />, status: "stable" },
                  { name: "Gate G Parking Lot", val: "92% Full", prc: 92, icon: <Car size={14} className="text-red-500" />, status: "busy" },
                  { name: "Shuttle Loop North", val: "Ready", prc: 85, icon: <Bus size={14} className="text-accent" />, status: "stable" },
                  { name: "Expressway Traffic", val: "Heavy Load", prc: 72, icon: <Activity size={14} className="text-amber-500" />, status: "warning" }
                ].map((tr, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs font-semibold">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {tr.icon}
                        <span className="text-slate-700 dark:text-white uppercase tracking-wider text-[10px] font-extrabold">{tr.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 font-bold">{tr.val}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          tr.status === 'stable' ? 'bg-green-500 animate-pulse' :
                          tr.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                        }`} />
                      </div>
                    </div>
                    {/* Progress slider */}
                    <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          tr.status === 'stable' ? 'bg-green-500' :
                          tr.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${tr.prc}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

            {/* Card 3: Weather Watch */}
            <DashboardCard title="Weather Watch" variant="glass" className="border border-slate-100 dark:border-white/10 shadow-md">
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider">🌡 Temperature</span>
                  <div className="mt-2 flex items-center gap-1">
                    <Thermometer size={14} className="text-secondary shrink-0" />
                    <span className="text-sm font-extrabold text-primary dark:text-white font-display">{stadiumTemp}°C</span>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider">🌬 Wind Speed</span>
                  <div className="mt-2 flex items-center gap-1">
                    <Wind size={14} className="text-[#00F0FF] shrink-0" />
                    <span className="text-sm font-extrabold text-primary dark:text-white font-display">12 km/h</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider">🌧 Rain Risk</span>
                  <div className="mt-2 flex items-center gap-1">
                    <CloudRain size={14} className="text-blue-400 shrink-0" />
                    <span className="text-sm font-extrabold text-primary dark:text-white font-display">5%</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider">👁 Visibility</span>
                  <div className="mt-2 flex items-center gap-1">
                    <Eye size={14} className="text-accent shrink-0" />
                    <span className="text-sm font-extrabold text-primary dark:text-white font-display">10 km</span>
                  </div>
                </div>
              </div>
            </DashboardCard>

          </div>

        </div>
      </section>

      {/* SECTION — AI INCIDENT RESPONSE CENTER */}
      <section className="space-y-6 text-left">
        <div>
          <Badge variant="primary" className="mb-1 py-0.5 px-2 bg-primary/10 text-primary dark:text-secondary font-bold uppercase tracking-widest text-[9px]">
            {t("Incident Desk")}
          </Badge>
          <h2 className="text-lg md:text-xl font-extrabold text-primary dark:text-secondary uppercase tracking-wider font-display">
            {t("AI Incident Response Center")}
          </h2>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT PANEL: Incident Feed (7 columns) */}
          <div className="lg:col-span-7 space-y-4 max-h-[620px] overflow-y-auto pr-1.5 scrollbar-thin animate-fade-in">
            {mockIncidents.map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                isSelected={selectedIncidentId === incident.id}
                onClick={() => {
                  setSelectedIncidentId(incident.id);
                  speak(`Selected incident ${incident.id}. Category: ${incident.category}. Status: ${incident.status}`);
                }}
              />
            ))}
          </div>

          {/* RIGHT PANEL: AI Response Panel (5 columns) */}
          <div className="lg:col-span-5">
            <ResponsePanel 
              incident={mockIncidents.find(inc => inc.id === selectedIncidentId) || null} 
            />
          </div>

        </div>

        {/* BOTTOM SECTION: Incident Statistics */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
          <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
            Tactical Operations Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatisticsCard 
              title="Open Incidents" 
              value={mockStats.openIncidents} 
              icon={<ShieldAlert size={18} className="text-red-500" />} 
            />
            <StatisticsCard 
              title="Resolved Today" 
              value={mockStats.resolvedToday} 
              icon={<CheckCircle size={18} className="text-accent" />} 
            />
            <StatisticsCard 
              title="Avg Response Time" 
              value={mockStats.avgResponseTime} 
              icon={<Clock size={18} className="text-secondary" />} 
            />
            <StatisticsCard 
              title="Critical Events" 
              value={mockStats.criticalEvents} 
              icon={<ShieldAlert size={18} className="text-amber-500 animate-pulse" />} 
            />
            <StatisticsCard 
              title="Prediction Accuracy" 
              value={mockStats.predictionAccuracy} 
              icon={<Activity size={18} className="text-secondary" />} 
            />
          </div>
        </div>
      </section>

      {/* SECTION — PREDICTIVE INTELLIGENCE & STADIUM DIGITAL TWIN */}
      <section className="space-y-8 text-left animate-fade-in">
        <div>
          <Badge variant="primary" className="mb-1 py-0.5 px-2 bg-primary/10 text-primary dark:text-secondary font-bold uppercase tracking-widest text-[9px]">
            {t("Future Operations")}
          </Badge>
          <h2 className="text-lg md:text-xl font-extrabold text-primary dark:text-secondary uppercase tracking-wider font-display">
            {t("Predictive Intelligence & Stadium Digital Twin")}
          </h2>
        </div>

        {/* SECTION 1 — Predictive Intelligence Grid */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
            {t("Predictive Intelligence Forecasts")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {mockForecasts.map((forecast) => (
              <ForecastCard key={forecast.id} item={forecast} />
            ))}
          </div>
        </div>

        {/* 2 Columns Grid for Section 2 (Digital Twin) & Section 3 (Forecast Insights) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* SECTION 2 — Stadium Digital Twin Map (7 columns) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
              {t("Stadium Digital Twin Area Map")}
            </h3>
            
            {/* HTML/CSS map representation */}
            <div className="flex-1 min-h-[380px] bg-slate-900/90 rounded-2xl border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden select-none">
              
              {/* Outer grid boundary details */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)] pointer-events-none" />
              
              {/* Top / North Row */}
              <div className="flex justify-between items-center gap-4">
                {/* Security HQ */}
                <button 
                  onClick={() => {
                    setSelectedTwinZoneId("zone-security");
                    speak("Selected Security HQ Command");
                  }}
                  className={`px-3 py-2 text-[10px] rounded-lg border uppercase font-extrabold transition-all duration-300 cursor-pointer ${
                    selectedTwinZoneId === 'zone-security' 
                      ? 'bg-accent/20 border-accent shadow-[0_0_12px_rgba(0,132,61,0.4)] text-white scale-[1.05]' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  👮 {t("Security HQ")}
                </button>

                {/* North Stand */}
                <button 
                  onClick={() => {
                    setSelectedTwinZoneId("zone-north");
                    speak("Selected North Stand");
                  }}
                  className={`flex-1 max-w-[200px] py-3 text-center text-[10px] rounded-xl border uppercase font-extrabold transition-all duration-300 cursor-pointer ${
                    selectedTwinZoneId === 'zone-north' 
                      ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)] text-white scale-[1.05]' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {t("North Stand (Caution)")}
                </button>

                {/* Medical Clinic */}
                <button 
                  onClick={() => {
                    setSelectedTwinZoneId("zone-medical");
                    speak("Selected Medical Clinic Sector");
                  }}
                  className={`px-3 py-2 text-[10px] rounded-lg border uppercase font-extrabold transition-all duration-300 cursor-pointer ${
                    selectedTwinZoneId === 'zone-medical' 
                      ? 'bg-accent/20 border-accent shadow-[0_0_12px_rgba(0,132,61,0.4)] text-white scale-[1.05]' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  🏥 {t("Medical Clinic")}
                </button>
              </div>

              {/* Middle Row (West Stand, Pitch center, East Stand) */}
              <div className="flex justify-between items-center gap-4 my-2">
                {/* West Stand */}
                <button 
                  onClick={() => {
                    setSelectedTwinZoneId("zone-west");
                    speak("Selected West Stand");
                  }}
                  className={`w-28 py-8 text-center text-[10px] rounded-xl border uppercase font-extrabold transition-all duration-300 cursor-pointer ${
                    selectedTwinZoneId === 'zone-west' 
                      ? 'bg-accent/20 border-accent shadow-[0_0_12px_rgba(0,132,61,0.4)] text-white scale-[1.05]' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {t("West Stand")}
                </button>

                {/* Central Pitch / Field Representation */}
                <div className="flex-1 max-w-[220px] aspect-[1.6/1] bg-green-950/40 rounded-lg border border-accent/30 flex items-center justify-center relative overflow-hidden shadow-inner">
                  {/* Center circle */}
                  <div className="w-14 h-14 rounded-full border border-accent/20 flex items-center justify-center">
                    {/* Mid line */}
                    <div className="absolute w-[1px] h-full bg-accent/25" />
                    <div className="w-1.5 h-1.5 bg-accent/40 rounded-full" />
                  </div>
                  <span className="absolute bottom-2 text-[8px] text-accent/35 font-extrabold uppercase tracking-wider">{t("Lusail Arena")}</span>
                </div>

                {/* East Stand */}
                <button 
                  onClick={() => {
                    setSelectedTwinZoneId("zone-east");
                    speak("Selected East Stand");
                  }}
                  className={`w-28 py-8 text-center text-[10px] rounded-xl border uppercase font-extrabold transition-all duration-300 cursor-pointer ${
                    selectedTwinZoneId === 'zone-east' 
                      ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)] text-white scale-[1.05]' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {t("East Stand")}
                </button>
              </div>

              {/* Bottom Row (Parking, South, VIP) */}
              <div className="flex justify-between items-center gap-4">
                {/* Parking Zone B */}
                <button 
                  onClick={() => {
                    setSelectedTwinZoneId("zone-parking");
                    speak("Selected Parking Zone B");
                  }}
                  className={`px-3 py-2 text-[10px] rounded-lg border uppercase font-extrabold transition-all duration-300 cursor-pointer ${
                    selectedTwinZoneId === 'zone-parking' 
                      ? 'bg-red-500/20 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)] text-white scale-[1.05]' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  🚗 {t("Parking Zone B")}
                </button>

                {/* South Stand */}
                <button 
                  onClick={() => {
                    setSelectedTwinZoneId("zone-south");
                    speak("Selected South Stand");
                  }}
                  className={`flex-1 max-w-[200px] py-3 text-center text-[10px] rounded-xl border uppercase font-extrabold transition-all duration-300 cursor-pointer ${
                    selectedTwinZoneId === 'zone-south' 
                      ? 'bg-accent/20 border-accent shadow-[0_0_12px_rgba(0,132,61,0.4)] text-white scale-[1.05]' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {t("South Stand")}
                </button>

                {/* VIP Stand Suite */}
                <button 
                  onClick={() => {
                    setSelectedTwinZoneId("zone-vip");
                    speak("Selected VIP Suite Stand");
                  }}
                  className={`px-3 py-2 text-[10px] rounded-lg border uppercase font-extrabold transition-all duration-300 cursor-pointer ${
                    selectedTwinZoneId === 'zone-vip' 
                      ? 'bg-accent/20 border-accent shadow-[0_0_12px_rgba(0,132,61,0.4)] text-white scale-[1.05]' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  👑 {t("VIP Suites")}
                </button>
              </div>

            </div>
          </div>

          {/* SECTION 2 (Side Panel Detail) & SECTION 3 (Insights Panel) (5 columns combined) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Zone details panel */}
            <div className="flex-1">
              <ZoneDetailsPanel 
                selectedZone={mockTwinZones.find(z => z.id === selectedTwinZoneId) || null} 
              />
            </div>

            {/* SECTION 3 — AI Forecast Insights */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-300 uppercase tracking-wider text-left">
                Predictive AI Insights
              </h3>
              <div className="space-y-3">
                {mockForecastInsights.map((insight) => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION — FAN EXPERIENCE, SUSTAINABILITY & ACCESSIBILITY INTELLIGENCE */}
      <section className="space-y-8 text-left animate-fade-in">
        <SectionHeader 
          badge="Spectator & Eco Console" 
          title="Fan Experience, Sustainability & Accessibility Intelligence" 
        />

        {/* SECTION 1 — Fan Experience Intelligence */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
            Fan Experience Intelligence
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {mockFanInsights.map((insight) => (
              <FanInsightCard key={insight.id} item={insight} />
            ))}
          </div>
        </div>

        {/* 2-column Grid for Section 2 (Accessibility) & Section 3 (Sustainability) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* SECTION 2 — Accessibility Intelligence */}
          <div className="space-y-4 flex flex-col">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
                Accessibility Operations
              </h4>
              <Badge variant="success" className="text-[10px] font-extrabold bg-green-500/10 text-green-500 border border-green-500/20">
                Score: 98%
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              {mockAccessibilityItems.map((item) => (
                <AccessibilityStatusCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* SECTION 3 — Sustainability Intelligence */}
          <div className="space-y-4 flex flex-col">
            <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
              Eco Operations Dashboard
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              {mockSustainabilityMetrics.map((item) => (
                <SustainabilityMetricCard key={item.id} item={item} />
              ))}
            </div>
          </div>

        </div>

        {/* SECTION 4 — Smart Notifications */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
          <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
            Smart Operations Notification Feed
          </h4>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1.5 scrollbar-thin">
            {mockNotifications.map((notif) => (
              <NotificationItem key={notif.id} item={notif} />
            ))}
          </div>
        </div>
      </section>

      {/* CORE AI CAPABILITIES SECTION */}
      <section className="space-y-6 text-left">
        <div>
          <h2 className="text-lg md:text-xl font-extrabold text-primary dark:text-secondary uppercase tracking-wider font-display">
            Core AI Capabilities
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase mt-0.5">
            Operational and spectator features built to optimize stadium logistics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreCapabilities.map((cap, idx) => (
            <Card key={idx} className="hover:scale-[1.02] duration-300 border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark flex flex-col justify-between">
              <CardHeader className="bg-slate-50/50 dark:bg-white/5 pb-2">
                <div className="flex items-center justify-between">
                  <div className="bg-primary/5 dark:bg-white/5 p-2 rounded-lg">
                    {cap.icon}
                  </div>
                  <Badge variant="outline" className="text-[8px]">Capability</Badge>
                </div>
                <CardTitle className="text-sm font-extrabold uppercase font-display tracking-wider text-primary dark:text-white mt-3">
                  {cap.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {cap.desc}
                  </p>
                  <p className="text-[10px] text-primary dark:text-secondary font-bold">
                    Benefit: {cap.benefit}
                  </p>
                </div>
                <Link 
                  to={cap.path}
                  onClick={() => speak(`Navigating to ${cap.title}`)}
                  className="w-full"
                >
                  <Button variant="outline" fullWidth className="text-xs uppercase font-bold tracking-wider py-2">
                    EXPLORE MODULE
                    <ChevronRight size={14} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ROLE BASED EXPERIENCE GRID */}
      <section className="space-y-6 text-left">
        <div>
          <h2 className="text-lg md:text-xl font-extrabold text-primary dark:text-secondary uppercase tracking-wider font-display">
            Role-Based Consoles
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase mt-0.5">
            Select your platform console identity to manage target telemetry screens
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((item, idx) => (
            <Card key={idx} className="hover:scale-[1.03] duration-300 border border-slate-100 dark:border-white/10 shadow-md bg-white dark:bg-stadium-dark flex flex-col justify-between">
              <CardHeader className="bg-slate-50/50 dark:bg-white/5 pb-2 flex-row justify-between items-center">
                <CardTitle className="text-sm font-extrabold uppercase font-display text-primary dark:text-white tracking-wide">
                  {item.title}
                </CardTitle>
                <div className="bg-primary/5 dark:bg-white/5 p-2 rounded-lg shrink-0">
                  {item.icon}
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-3.5 text-xs text-left">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-300 uppercase block tracking-wider">Responsibilities</span>
                    <p className="text-slate-600 dark:text-white font-semibold leading-normal mt-0.5">{item.responsibilities}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-300 uppercase block tracking-wider">AI Platform Value</span>
                    <p className="text-slate-600 dark:text-white font-semibold leading-normal mt-0.5">{item.benefits}</p>
                  </div>
                </div>

                <Button 
                  onClick={() => handleRoleQuickAction(item.role)}
                  variant={item.color === 'primary' ? 'primary' : item.color === 'accent' ? 'accent' : 'secondary'}
                  fullWidth
                  className="text-[10px] font-bold tracking-wider uppercase mt-2"
                >
                  {item.btnText}
                  <ArrowRight size={12} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
};
