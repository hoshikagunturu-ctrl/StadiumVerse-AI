import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface StadiumMapProps {
  highlightedSection?: string;
  activeRoute?: 'seat' | 'food' | 'exit' | 'first-aid' | null;
  onSectionClick?: (sectionId: string) => void;
  showEmergencyExits?: boolean;
}

const StadiumMapComponent: React.FC<StadiumMapProps> = ({
  highlightedSection = '',
  activeRoute = null,
  onSectionClick,
  showEmergencyExits = false,
}) => {
  const [zoom, setZoom] = useState(1);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  return (
    <Card className="relative overflow-hidden bg-slate-900 text-white border border-white/10 select-none">
      {/* Map Control Bar */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-primary-dark/85 backdrop-blur border border-white/15 p-1 rounded-lg">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/10 p-1.5 min-w-0" 
          onClick={() => setZoom(Math.min(zoom + 0.25, 2.5))}
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/10 p-1.5 min-w-0" 
          onClick={() => setZoom(Math.max(zoom - 0.25, 0.75))}
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/10 p-1.5 min-w-0" 
          onClick={() => { setZoom(1); setSelectedPin(null); }}
          title="Reset View"
        >
          <RotateCcw size={16} />
        </Button>
      </div>

      {/* Map Information overlay */}
      <div className="absolute bottom-4 left-4 z-10 bg-primary-dark/85 backdrop-blur border border-white/15 px-3 py-2 rounded-lg text-xs flex flex-col gap-1 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-accent border border-white/30 rounded-sm"></span>
          <span>Pitch (Field of Play)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-secondary border border-white/30 rounded-sm animate-pulse"></span>
          <span>Your Seat (Sec 104)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-blue-500 border border-white/30 rounded-full"></span>
          <span>Food Concession Zone</span>
        </div>
        {showEmergencyExits && (
          <div className="flex items-center gap-2 text-red-400 font-bold">
            <span className="w-2.5 h-2.5 bg-red-600 border border-white/30 rounded-full animate-ping"></span>
            <span>Emergency Evac Exit</span>
          </div>
        )}
      </div>

      {/* Interactive SVG Stadium */}
      <div className="p-8 flex justify-center items-center overflow-auto min-h-[380px] md:min-h-[480px]">
        <svg 
          viewBox="0 0 800 800" 
          className="w-full max-w-[550px] transition-transform duration-300 origin-center"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Grid pitch pattern background overlay */}
          <rect x="0" y="0" width="800" height="800" fill="#030C17" rx="30" />
          
          {/* Stadium outer boundary */}
          <circle cx="400" cy="400" r="350" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="15" />
          <circle cx="400" cy="400" r="330" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="10 5" opacity="0.4" />
          
          {/* Seating Sectors */}
          {/* North Stand */}
          <path 
            d="M 120,200 A 300,300 0 0,1 680,200 L 580,270 A 180,180 0 0,0 220,270 Z" 
            className={`cursor-pointer transition-all duration-200 ${highlightedSection === '102' ? 'fill-secondary/50 stroke-secondary stroke-2' : 'fill-primary/20 stroke-primary/40 hover:fill-primary/30'}`}
            onClick={() => onSectionClick?.('102')}
          />
          {/* South Stand */}
          <path 
            d="M 120,600 A 300,300 0 0,0 680,600 L 580,530 A 180,180 0 0,1 220,530 Z" 
            className={`cursor-pointer transition-all duration-200 ${highlightedSection === '105' ? 'fill-primary/50 stroke-primary stroke-2' : 'fill-primary/10 stroke-primary/30 hover:fill-primary/20'}`}
            onClick={() => onSectionClick?.('105')}
          />
          {/* West Stand */}
          <path 
            d="M 100,240 A 300,300 0 0,0 100,560 L 190,500 A 180,180 0 0,1 190,300 Z" 
            className={`cursor-pointer transition-all duration-200 ${highlightedSection === '101' ? 'fill-primary/50 stroke-primary stroke-2' : 'fill-primary/20 stroke-primary/40 hover:fill-primary/30'}`}
            onClick={() => onSectionClick?.('101')}
          />
          {/* East Stand */}
          <path 
            d="M 700,240 A 300,300 0 0,1 700,560 L 610,500 A 180,180 0 0,0 610,300 Z" 
            className={`cursor-pointer transition-all duration-200 ${highlightedSection === '103' ? 'fill-primary/50 stroke-primary stroke-2' : 'fill-primary/20 stroke-primary/40 hover:fill-primary/30'}`}
            onClick={() => onSectionClick?.('103')}
          />
          
          {/* Sector label text nodes */}
          <text x="400" y="160" textAnchor="middle" className="fill-white/60 font-bold text-sm tracking-widest font-display select-none">NORTH STAND (102)</text>
          <text x="400" y="660" textAnchor="middle" className="fill-white/60 font-bold text-sm tracking-widest font-display select-none">SOUTH STAND (105)</text>
          <text x="140" y="408" textAnchor="middle" transform="rotate(-90 140 408)" className="fill-white/60 font-bold text-sm tracking-widest font-display select-none">WEST STAND (101)</text>
          <text x="660" y="408" textAnchor="middle" transform="rotate(90 660 408)" className="fill-white/60 font-bold text-sm tracking-widest font-display select-none">EAST STAND (103)</text>
          
          {/* Central Pitch Layout */}
          <rect x="260" y="320" width="280" height="160" fill="#00843D" stroke="#ffffff" strokeWidth="4" rx="2" className="bg-pitch-grid" />
          {/* Pitch markings */}
          <line x1="400" y1="320" x2="400" y2="480" stroke="#ffffff" strokeWidth="3" />
          <circle cx="400" cy="400" r="40" fill="none" stroke="#ffffff" strokeWidth="3" />
          <circle cx="400" cy="400" r="4" fill="#ffffff" />
          
          {/* Penalty boxes */}
          <rect x="260" y="360" width="40" height="80" fill="none" stroke="#ffffff" strokeWidth="3" />
          <rect x="500" y="360" width="40" height="80" fill="none" stroke="#ffffff" strokeWidth="3" />

          {/* Active Navigation Paths */}
          {activeRoute === 'seat' && (
            <>
              {/* Path from entrance Gate G (bottom left) to Section 104 (top right corner) */}
              <path 
                d="M 180,620 Q 150,450 250,300 T 540,250" 
                fill="none" 
                stroke="#FFD700" 
                strokeWidth="6" 
                strokeLinecap="round"
                strokeDasharray="12 6"
                className="animate-pulse"
              />
              <circle cx="180" cy="620" r="10" fill="#00F0FF" stroke="#white" strokeWidth="2" />
              <text x="180" y="650" textAnchor="middle" className="fill-[#00F0FF] text-[10px] font-extrabold tracking-widest">YOU ARE HERE (GATE G)</text>
              
              <circle cx="540" cy="250" r="10" fill="#D4AF37" stroke="white" strokeWidth="2" />
              <text x="540" y="225" textAnchor="middle" className="fill-[#D4AF37] text-[10px] font-extrabold tracking-widest">YOUR SEAT (SEC 104)</text>
            </>
          )}

          {activeRoute === 'food' && (
            <>
              {/* Path from seat (top right) to Concession B (top left) */}
              <path 
                d="M 540,250 Q 400,210 240,230" 
                fill="none" 
                stroke="#00F0FF" 
                strokeWidth="6" 
                strokeLinecap="round"
                strokeDasharray="10 5"
              />
              <circle cx="240" cy="230" r="10" fill="#3B82F6" stroke="white" strokeWidth="2" />
              <text x="240" y="205" textAnchor="middle" className="fill-[#3B82F6] text-[10px] font-extrabold tracking-widest">CONCESSION STAND B</text>
            </>
          )}

          {activeRoute === 'exit' && (
            <>
              {/* Path to nearest Exit Gate A (top center) */}
              <path 
                d="M 540,250 Q 450,180 400,100" 
                fill="none" 
                stroke="#EF4444" 
                strokeWidth="6" 
                strokeLinecap="round"
                strokeDasharray="8 4"
                className="animate-pulse"
              />
              <circle cx="400" cy="100" r="12" fill="#EF4444" stroke="white" strokeWidth="3" />
              <text x="400" y="75" textAnchor="middle" className="fill-[#EF4444] text-[10px] font-extrabold tracking-widest">EVACUATION EXIT GATE A</text>
            </>
          )}

          {/* Emergency exits glow */}
          {showEmergencyExits && (
            <g>
              <circle cx="400" cy="80" r="15" fill="#EF4444" opacity="0.3" className="animate-ping" />
              <circle cx="400" cy="80" r="8" fill="#EF4444" stroke="white" strokeWidth="2" />
              <circle cx="400" cy="720" r="15" fill="#EF4444" opacity="0.3" className="animate-ping" />
              <circle cx="400" cy="720" r="8" fill="#EF4444" stroke="white" strokeWidth="2" />
              <circle cx="80" cy="400" r="15" fill="#EF4444" opacity="0.3" className="animate-ping" />
              <circle cx="80" cy="400" r="8" fill="#EF4444" stroke="white" strokeWidth="2" />
              <circle cx="720" cy="400" r="15" fill="#EF4444" opacity="0.3" className="animate-ping" />
              <circle cx="720" cy="400" r="8" fill="#EF4444" stroke="white" strokeWidth="2" />
            </g>
          )}

          {/* Interactive Concession/Facility Pins */}
          <g className="cursor-pointer">
            {/* Concession Stand B (top left) */}
            <circle 
              cx="240" 
              cy="230" 
              r="8" 
              fill="#3B82F6" 
              stroke="white" 
              strokeWidth="2" 
              onClick={() => setSelectedPin('food-b')}
            />
            {/* Restrooms (bottom left) */}
            <circle 
              cx="220" 
              cy="560" 
              r="8" 
              fill="#8B5CF6" 
              stroke="white" 
              strokeWidth="2"
              onClick={() => setSelectedPin('restroom-w')}
            />
            {/* Medical station (bottom right) */}
            <circle 
              cx="580" 
              cy="550" 
              r="8" 
              fill="#10B981" 
              stroke="white" 
              strokeWidth="2"
              onClick={() => setSelectedPin('medical-e')}
            />
          </g>
        </svg>
      </div>

      {/* Pin Detail Overlay */}
      {selectedPin && (
        <div className="absolute top-16 right-4 z-10 w-64 bg-primary-dark/95 border border-white/10 p-4 rounded-xl shadow-xl glass-panel-dark">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
            <h4 className="text-sm font-bold text-secondary font-display uppercase">Facility Telemetry</h4>
            <button 
              className="text-white/60 hover:text-white text-xs cursor-pointer" 
              onClick={() => setSelectedPin(null)}
            >
              ✕
            </button>
          </div>
          {selectedPin === 'food-b' && (
            <div className="text-xs space-y-1.5">
              <p className="font-semibold text-white">Food Concession Stand B</p>
              <p className="text-white/60">Type: Vegan Burgers & Local Brews</p>
              <p className="text-green-400 font-bold">Line Wait: ~5 mins (Short)</p>
              <p className="text-white/40">Smart recommendations: Red bean burgers are 20% off with Eco points!</p>
            </div>
          )}
          {selectedPin === 'restroom-w' && (
            <div className="text-xs space-y-1.5">
              <p className="font-semibold text-white">Restroom Block West (L1)</p>
              <p className="text-white/60">Status: Fully Operational</p>
              <p className="text-amber-400 font-bold">Occupancy: 80% (Moderate Wait)</p>
            </div>
          )}
          {selectedPin === 'medical-e' && (
            <div className="text-xs space-y-1.5">
              <p className="font-semibold text-white">First Aid Station East</p>
              <p className="text-white/60">Staff: 2 EMT Paramedics on site</p>
              <p className="text-green-400 font-bold">Queue: Immediate Care Available</p>
              <p className="text-white/40">Includes mobility chair parking</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export const StadiumMap = React.memo(StadiumMapComponent);
