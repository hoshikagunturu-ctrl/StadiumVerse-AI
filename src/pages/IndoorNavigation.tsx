import React, { useState } from 'react';
import { StadiumMap } from '../components/StadiumMap';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAccessibility } from '../context/AccessibilityContext';
import { MapPin, Compass, Utensils, AlertTriangle, Shield } from 'lucide-react';

export const IndoorNavigation: React.FC = () => {
  const { speak } = useAccessibility();
  const [activeRoute, setActiveRoute] = useState<'seat' | 'food' | 'exit' | null>('seat');
  const [highlightedSection, setHighlightedSection] = useState<string>('104');

  const handleRouteSelect = (route: 'seat' | 'food' | 'exit') => {
    setActiveRoute(route);
    if (route === 'seat') {
      setHighlightedSection('104');
      speak("Active routing line drawn to Section 104, Row M, Seat 18 from entrance Gate G.");
    } else if (route === 'food') {
      setHighlightedSection('102');
      speak("Active routing line drawn to Concession Stand B (Vegan Burger Hub) from Section 104.");
    } else if (route === 'exit') {
      setHighlightedSection('');
      speak("Active emergency evacuation route drawn to Exit Gate A.");
    }
  };

  const handleSectionClick = (sectionId: string) => {
    setHighlightedSection(sectionId);
    speak(`Selected stadium section ${sectionId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
            Stadium Pathfinder
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            Interactive indoor navigation and seat locator
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Navigation Directions Control Card */}
        <Card className="border border-slate-100 shadow-md h-fit">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-xs uppercase tracking-wider text-primary">
              <Compass size={16} className="text-secondary" />
              Pathfinder Directories
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex flex-col gap-2">
              <Button
                variant={activeRoute === 'seat' ? 'primary' : 'outline'}
                onClick={() => handleRouteSelect('seat')}
                className="w-full text-xs font-bold uppercase tracking-wider justify-start gap-3"
              >
                <MapPin size={16} className="text-secondary" />
                ROUTE TO MY SEAT (SEC 104)
              </Button>
              
              <Button
                variant={activeRoute === 'food' ? 'primary' : 'outline'}
                onClick={() => handleRouteSelect('food')}
                className="w-full text-xs font-bold uppercase tracking-wider justify-start gap-3"
              >
                <Utensils size={16} className="text-[#00F0FF]" />
                ROUTE TO CONCESSION B
              </Button>
              
              <Button
                variant={activeRoute === 'exit' ? 'danger' : 'outline'}
                onClick={() => handleRouteSelect('exit')}
                className="w-full text-xs font-bold uppercase tracking-wider justify-start gap-3"
              >
                <Shield size={16} className="text-red-500" />
                EMERGENCY EVAC ROUTE
              </Button>
            </div>

            {/* Directions Walkthrough */}
            <div className="border-t border-slate-100 dark:border-white/10 pt-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-left">Route Instructions</h4>
              
              {activeRoute === 'seat' && (
                <div className="space-y-3 text-xs text-left font-semibold text-slate-700 dark:text-white/80">
                  <div className="flex gap-2.5 items-start">
                    <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center shrink-0 text-[10px]">1</span>
                    <p>Enter via **Gate G** (North Gate Entrance).</p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center shrink-0 text-[10px]">2</span>
                    <p>Take the main escalators to Level 2 (North Concourse).</p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center shrink-0 text-[10px]">3</span>
                    <p>Proceed past concession stand B, turn right to Section 104 corridor. Your seat is Row M, Seat 18.</p>
                  </div>
                </div>
              )}

              {activeRoute === 'food' && (
                <div className="space-y-3 text-xs text-left font-semibold text-slate-700 dark:text-white/80">
                  <div className="flex gap-2.5 items-start">
                    <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center shrink-0 text-[10px]">1</span>
                    <p>Exit Section 104 into Level 2 concourse corridor.</p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center shrink-0 text-[10px]">2</span>
                    <p>Turn left and walk 120 meters toward the North Gate escalators.</p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center shrink-0 text-[10px]">3</span>
                    <p>Concession Stand B (Vegan Burger Hub) is located immediately adjacent to the escalator hub.</p>
                  </div>
                </div>
              )}

              {activeRoute === 'exit' && (
                <div className="space-y-3 text-xs text-left font-semibold text-slate-700 dark:text-white/80 bg-red-50/50 dark:bg-red-950/10 p-3 rounded-lg border border-red-200/40">
                  <div className="flex gap-2.5 items-start">
                    <AlertTriangle className="text-red-600 shrink-0" size={16} />
                    <p className="text-red-700 dark:text-red-400 font-extrabold uppercase">Critical Evacuation Route</p>
                  </div>
                  <p>In the event of an emergency evacuation, immediately exit Section 104 through the main portal. Follow the green illuminated floor light strips towards **Exit Gate A** (North Gate Exit).</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stadium Interactive Map Display */}
        <div className="lg:col-span-2 space-y-4">
          <StadiumMap 
            highlightedSection={highlightedSection}
            activeRoute={activeRoute}
            onSectionClick={handleSectionClick}
            showEmergencyExits={activeRoute === 'exit'}
          />
          <div className="text-[10px] text-slate-400 dark:text-white/30 font-bold uppercase tracking-widest text-center select-none">
            💡 Tap on facility pins on the map (colored dots) to view live telemetry info.
          </div>
        </div>

      </div>
    </div>
  );
};
