import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, LogOut, Settings, LayoutDashboard, MapPin, 
  Utensils, Clock, Bus, Accessibility, Sparkles, Leaf, 
  ShieldAlert, Eye, Volume2, VolumeX, Shield, Globe, ChevronDown
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useUserRole } from '../context/UserRoleContext';
import type { UserRole } from '../context/UserRoleContext';
import { useSettings } from '../context/SettingsContext';
import { Breadcrumbs } from './Breadcrumbs';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const { 
    highContrast, setHighContrast, 
    textScale, setTextScale, 
    screenReaderActive, setScreenReaderActive,
    speak 
  } = useAccessibility();
  
  const { user, login, logout } = useUserRole();
  const { settings, updateSetting } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (role: UserRole) => {
    login(role);
    setProfileDropdownOpen(false);
    speak(`Switched role to ${role}`);
    navigate(`/${role}-dashboard`);
  };

  const navGroups = [
    {
      title: "Command Center",
      links: [
        { path: "/", label: "Tournament Portal", icon: <Globe size={18} /> },
        { path: "/fan-dashboard", label: "Fan Hub", icon: <LayoutDashboard size={18} />, role: "fan" },
        { path: "/volunteer-dashboard", label: "Volunteer Grid", icon: <LayoutDashboard size={18} />, role: "volunteer" },
        { path: "/organizer-dashboard", label: "Operations Command", icon: <LayoutDashboard size={18} />, role: "organizer" },
      ]
    },
    {
      title: "AI Services",
      links: [
        { path: "/ai-assistant", label: "Ask AI Assistant", icon: <Sparkles size={18} /> },
        { path: "/indoor-navigation", label: "Stadium Pathfinder", icon: <MapPin size={18} /> },
        { path: "/queue-prediction", label: "Queue Analytics", icon: <Clock size={18} /> },
      ]
    },
    {
      title: "Fan Experience",
      links: [
        { path: "/food-recommendations", label: "Gourmet Eats", icon: <Utensils size={18} /> },
        { path: "/lost-and-found", label: "Lost & Found Log", icon: <Shield size={18} /> },
        { path: "/eco-assistant", label: "Eco Rewards", icon: <Leaf size={18} /> },
      ]
    },
    {
      title: "Safety & Logistics",
      links: [
        { path: "/transport-suggestions", label: "Transit departures", icon: <Bus size={18} /> },
        { path: "/emergency-center", label: "SOS Response Room", icon: <ShieldAlert size={18} /> },
        { path: "/accessibility-mode", label: "Access Settings", icon: <Accessibility size={18} /> },
        { path: "/settings", label: "Control Panel", icon: <Settings size={18} /> },
      ]
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${highContrast ? 'dark bg-black' : 'bg-slate-50'}`}>
      {/* Broadcast LED Ticker Ribbon */}
      <div 
        className="w-full bg-primary text-white text-xs h-7 overflow-hidden flex items-center font-bold uppercase tracking-wider relative border-b border-secondary/20 z-50 shadow-sm"
        role="region" 
        aria-label="Tournament Status Ribbon"
      >
        <div className="bg-secondary text-primary px-3 py-1 flex items-center gap-1.5 h-full z-10 shrink-0 font-extrabold select-none shadow-md">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
          <span>LIVE BROADCAST FEED</span>
        </div>
        <div className="flex items-center gap-8 whitespace-nowrap animate-ticker pl-4 select-none">
          <span>🏆 FIFA WORLD CUP 2026 OFFICIAL OPERATIONS PANEL</span>
          <span className="text-secondary">•</span>
          <span>⚽ MATCH 48 LIVE: ARGENTINA 2 - 1 BRAZIL (82')</span>
          <span className="text-secondary">•</span>
          <span>🚆 METRO SYSTEM: GREEN LINE RUNNING AT 3-MINUTE SHIFT FREQUENCY</span>
          <span className="text-secondary">•</span>
          <span>🍔 FOOD CONCESSION B: WAIT TIME 5 MINS (ECO REWARD REDEMPTION AVAILABLE)</span>
          <span className="text-secondary">•</span>
          <span>🚨 WEATHER ADVISORY: 22°C STADIUM COOLING ACTIVE</span>
          <span className="text-secondary">•</span>
          <span>💡 VOLUNTEERS: MOBILITY MOBILIZATION REPORT TO GATE G IMMEDIATELY</span>
          <span className="text-secondary">•</span>
          <span>🏆 FIFA WORLD CUP 2026 OFFICIAL OPERATIONS PANEL</span>
        </div>
      </div>

      {/* Broadcast Top Nav Header */}
      <header className="bg-primary text-white shadow-lg broadcast-border z-40 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hover:bg-white/10 rounded-lg md:hidden cursor-pointer"
              aria-label={sidebarOpen ? "Close main navigation" : "Open main navigation"}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="flex items-center gap-3" onClick={() => speak("Navigated to Tournament Portal Home")}>
              <div className="bg-secondary text-primary p-2 rounded-lg font-bold text-sm tracking-wider flex items-center justify-center font-display border border-white/20">
                FWC
              </div>
              <div>
                <h1 className="text-sm font-extrabold tracking-tight font-display m-0 leading-none">STADIUMVERSE AI</h1>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none">Real-Time Operations</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Accessibility controls */}
            <div className="hidden lg:flex items-center gap-1.5 border-r border-white/10 pr-3 mr-1">
              <button
                onClick={() => {
                  setHighContrast(!highContrast);
                  speak(`High contrast mode ${!highContrast ? 'enabled' : 'disabled'}`);
                }}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${highContrast ? 'bg-secondary text-primary' : 'hover:bg-white/10 text-white/80 hover:text-white'}`}
                title="Toggle High Contrast"
                aria-label="Toggle High Contrast"
              >
                <Eye size={18} />
              </button>
              
              <button
                onClick={() => {
                  const nextScale = textScale === 'normal' ? 'large' : textScale === 'large' ? 'extra-large' : 'normal';
                  setTextScale(nextScale);
                  speak(`Text size set to ${nextScale}`);
                }}
                className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors flex items-center gap-0.5 cursor-pointer"
                title="Adjust Text Scale"
                aria-label="Adjust Text Scale"
              >
                <span className="text-xs font-bold font-display">A+</span>
              </button>

              <button
                onClick={() => {
                  const active = !screenReaderActive;
                  setScreenReaderActive(active);
                  speak(active ? "Audio assist narrator active." : "");
                }}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${screenReaderActive ? 'bg-accent text-white' : 'hover:bg-white/10 text-white/80 hover:text-white'}`}
                title="Toggle Audio Assist (Screen Reader)"
                aria-label="Toggle Audio Assist Narrator"
              >
                {screenReaderActive ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
            </div>

            {/* Profile Dropdown with Quick Role-Switching */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  aria-expanded={profileDropdownOpen}
                  aria-haspopup="true"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full object-cover border border-secondary"
                  />
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-bold leading-none">{user.name}</div>
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest">{user.role} console</div>
                  </div>
                  <ChevronDown size={14} className="text-white/60" />
                </button>

                {profileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileDropdownOpen(false)} />
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 text-slate-800 z-20 border border-slate-100 divide-y divide-slate-100"
                      role="menu"
                    >
                      <div className="px-4 py-2">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Switch System Console</p>
                        <div className="flex flex-col gap-1 mt-1.5">
                          {(['fan', 'volunteer', 'organizer'] as UserRole[]).map((r) => (
                            <button
                              key={r}
                              onClick={() => handleRoleChange(r)}
                              className={`w-full text-left px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-between cursor-pointer ${
                                user.role === r 
                                  ? 'bg-primary text-white font-bold' 
                                  : 'hover:bg-slate-100 text-slate-700'
                              }`}
                            >
                              <span>{r === 'fan' ? 'Fan Hub' : r === 'volunteer' ? 'Volunteer' : 'Operations Command'}</span>
                              {user.role === r && <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="p-1">
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                            speak("Logged out of system");
                            navigate('/login');
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 rounded flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut size={14} />
                          <span>DISCONNECT PORTAL</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link 
                to="/login"
                className="bg-secondary text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-secondary-light transition-all border-b-2 border-secondary-dark"
                onClick={() => speak("Navigated to Login Console")}
              >
                CONNECT
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid Wrapper */}
      <div className="flex-1 flex max-w-8xl w-full mx-auto relative">
        {/* Navigation Sidebar (Desktop) */}
        <aside className={`
          fixed md:sticky top-16 md:top-23 left-0 h-[calc(100vh-64px)] md:h-[calc(100vh-92px)] w-64 bg-primary text-white border-r border-white/5 py-6 px-4 overflow-y-auto shrink-0 z-30 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <nav className="flex flex-col gap-6" aria-label="Main Navigation">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="flex flex-col gap-1.5">
                <h4 className="text-[10px] font-extrabold text-secondary tracking-widest uppercase px-3 select-none mb-1 opacity-70">
                  {group.title}
                </h4>
                {group.links.map((link) => {
                  // Only show dashboard links that match current role, or highlight if clicked
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => {
                        setSidebarOpen(false);
                        speak(`Navigated to ${link.label}`);
                      }}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 group
                        ${isActive 
                          ? 'bg-secondary text-primary font-bold shadow-[0_0_12px_rgba(212,175,55,0.15)] border-l-4 border-accent' 
                          : 'text-white/70 hover:text-white hover:bg-white/5'}
                      `}
                    >
                      <span className={`${isActive ? 'text-primary' : 'text-secondary group-hover:scale-110 duration-200'}`}>
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* Backdrop for mobile menu */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-5xl mx-auto">
            <Breadcrumbs />
            {children}
          </div>
        </main>
      </div>

      {/* Emergency Global Ticker warning block (evacuationMode trigger check) */}
      {settings.evacuationMode && (
        <div className="fixed inset-x-0 top-7 bg-red-600 text-white font-bold text-center py-2 flex items-center justify-center gap-3 z-50 animate-pulse uppercase tracking-wider text-xs border-y border-red-700">
          <ShieldAlert size={16} />
          <span>EVACUATION DRILL ACTIVE - FOLLOW GREEN LIGHT PATHWAY DIRECTIVES TO NEAREST EMERGENCY GATES</span>
          <button 
            onClick={() => updateSetting('evacuationMode', false)}
            className="bg-white/20 hover:bg-white/30 text-white text-[10px] px-2 py-0.5 rounded cursor-pointer border border-white/30"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-primary-dark text-white/50 text-xs py-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 FIFA Operations. StadiumVerse AI. All Rights Reserved.</p>
          <div className="flex items-center gap-4 font-bold text-[10px] tracking-widest uppercase">
            <Link to="/accessibility-mode" className="hover:text-white transition-colors">Accessibility Policy</Link>
            <span>•</span>
            <Link to="/settings" className="hover:text-white transition-colors">Emergency Protocol</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
