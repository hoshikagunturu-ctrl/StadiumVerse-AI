import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../context/UserRoleContext';
import type { UserRole } from '../context/UserRoleContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Shield, Users, Trophy, ChevronRight } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useUserRole();
  const { speak } = useAccessibility();
  const navigate = useNavigate();

  const handleRoleSelection = (role: UserRole) => {
    login(role);
    speak(`Login successful. Connected to ${role} console.`);
    navigate(`/${role}-dashboard`);
  };

  const loginRoles = [
    {
      role: 'fan' as UserRole,
      title: 'Fan Hub Portal',
      description: 'Access digital tickets, in-seat gourmet delivery, transit telemetry, and eco offsets rewards.',
      badge: 'Spectator Access',
      badgeColor: 'primary' as const,
      icon: <Trophy className="text-secondary" size={24} />,
      demoUser: 'Alex Gonzalez (Row M, Seat 18)'
    },
    {
      role: 'volunteer' as UserRole,
      title: 'Volunteer Operations Grid',
      description: 'Check active task logs, coordinate mobility assistance, log stadium incidents, and scan ticket codes.',
      badge: 'Field Ops Access',
      badgeColor: 'accent' as const,
      icon: <Users className="text-accent-light" size={24} />,
      demoUser: 'Sophia Chen (Mobility Team)'
    },
    {
      role: 'organizer' as UserRole,
      title: 'Operations Command Console',
      description: 'Monitor crowd density, receive automatic dispatch SOS alerts, review concession stand wait-times, and issue announcements.',
      badge: 'Command Room Access',
      badgeColor: 'secondary' as const,
      icon: <Shield className="text-secondary" size={24} />,
      demoUser: 'Director Jean-Pierre (Command Room)'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8 text-center">
      <div className="space-y-3">
        <h2 className="text-3xl font-extrabold tracking-tight font-display text-primary dark:text-white uppercase">
          Tournament Portal Connection
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold max-w-lg mx-auto">
          Please select your operations console role card to log in. No credentials needed for this simulation build.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {loginRoles.map((item, idx) => (
          <Card key={idx} className="hover:scale-[1.03] duration-300 flex flex-col justify-between h-full border border-slate-100 shadow-lg">
            <CardHeader className="bg-slate-50/50 dark:bg-white/5 pb-4">
              <div className="flex items-center justify-between">
                <div className="bg-primary/5 dark:bg-white/5 p-2 rounded-lg">
                  {item.icon}
                </div>
                <Badge variant={item.badgeColor}>{item.badge}</Badge>
              </div>
              <CardTitle className="mt-3 text-primary dark:text-white font-display text-sm tracking-wide uppercase">
                {item.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-5 flex-1 flex flex-col justify-between gap-6">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {item.description}
              </p>
              
              <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-white/10">
                <div className="bg-slate-50 dark:bg-white/5 p-2.5 rounded-lg border border-slate-100 dark:border-white/5">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 block uppercase tracking-wider">Demo Identity</span>
                  <span className="text-xs font-bold text-primary dark:text-white block mt-0.5">{item.demoUser}</span>
                </div>
                
                <Button 
                  variant={item.role === 'fan' ? 'primary' : item.role === 'volunteer' ? 'accent' : 'secondary'}
                  fullWidth
                  className="text-xs tracking-widest uppercase font-bold"
                  onClick={() => handleRoleSelection(item.role)}
                >
                  CONNECT
                  <ChevronRight size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
