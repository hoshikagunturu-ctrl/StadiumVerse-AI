import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAccessibility } from '../context/AccessibilityContext';
import { Trophy, Gift } from 'lucide-react';

interface EcoReward {
  id: number;
  title: string;
  points: number;
  img: string;
}

export const EcoAssistant: React.FC = () => {
  const { speak } = useAccessibility();
  
  // Simulated eco points state
  const [points, setPoints] = useState(() => {
    return parseInt(localStorage.getItem('eco-points') || '850');
  });

  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'EcoChampion_99', points: 1850 },
    { rank: 2, name: 'GreenFan_A1', points: 1400 },
    { rank: 3, name: 'Alex Gonzalez (You)', points: 850 },
    { rank: 4, name: 'EcoSpectator', points: 720 },
  ]);

  const [redeemedCode, setRedeemedCode] = useState<string | null>(null);

  const rewardsList: EcoReward[] = [
    { id: 1, title: '50% off Vegan Burger (Stand B)', points: 400, img: '🍔' },
    { id: 2, title: 'Free Organic Fruit Juice (Stand B)', points: 250, img: '🥤' },
    { id: 3, title: 'FIFA World Cup Green Scarf', points: 800, img: '🧣' },
  ];

  const logRecyclingAction = (type: 'bottle' | 'container') => {
    const earned = type === 'bottle' ? 50 : 80;
    const newPoints = points + earned;
    setPoints(newPoints);
    localStorage.setItem('eco-points', String(newPoints));
    
    // Update leaderboard value for user
    setLeaderboard(prev => prev.map(p => p.name.includes('Alex') ? { ...p, points: newPoints } : p));
    
    speak(`Recycling logged: Earned ${earned} eco points! New balance: ${newPoints} XP.`);
    alert(`Success! Logged: Recycled 1 ${type}. Recipient: +${earned} XP.`);
  };

  const handleRedeem = (reward: EcoReward) => {
    if (points < reward.points) {
      speak("Insufficient eco points balance.");
      alert("Error: Insufficient points balance.");
      return;
    }
    const newPoints = points - reward.points;
    setPoints(newPoints);
    localStorage.setItem('eco-points', String(newPoints));
    
    // Update leaderboard
    setLeaderboard(prev => prev.map(p => p.name.includes('Alex') ? { ...p, points: newPoints } : p));
    
    const code = `ECO-REDEEM-${Math.floor(Math.random() * 9000) + 1000}`;
    setRedeemedCode(code);
    speak(`Redeemed reward: ${reward.title}. Deducted ${reward.points} points. Code is ${code}`);
    alert(`Successfully redeemed: ${reward.title}! Present barcode code ${code} at the concession stand.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
          Smart Eco Hub
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          Gamified recycling points, leaderboards, and merchandise vouchers
        </p>
      </div>

      {/* Points Telemetry overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Points Display */}
        <Card className="border border-secondary/20 shadow-lg bg-primary text-white relative overflow-hidden flex flex-col justify-between p-6">
          <div className="absolute inset-0 bg-pitch-stripes opacity-10" />
          
          <div className="relative z-10 space-y-2 text-left">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Available Rewards Wallet</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white font-display tracking-tight">{points}</span>
              <span className="text-sm text-secondary font-bold font-display">XP</span>
            </div>
            <p className="text-slate-300 text-xs font-semibold pt-2 leading-relaxed">
              Log recycling actions at Smart Eco Bins in the stadium corridors to accumulate points!
            </p>
          </div>

          <div className="relative z-10 pt-4 flex gap-2">
            <Button 
              onClick={() => logRecyclingAction('bottle')}
              variant="secondary"
              size="sm"
              className="text-[10px] uppercase font-bold tracking-wider flex-1"
            >
              Recycle Bottle (+50)
            </Button>
            <Button 
              onClick={() => logRecyclingAction('container')}
              variant="accent"
              size="sm"
              className="text-[10px] uppercase font-bold tracking-wider flex-1"
            >
              Recycle Box (+80)
            </Button>
          </div>
        </Card>

        {/* Leaderboard list */}
        <Card className="border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 py-3">
            <CardTitle className="text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Trophy size={14} className="text-secondary animate-pulse-glow" />
              Green Fans Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 text-xs font-semibold">
            <div className="space-y-2">
              {leaderboard.sort((a,b) => b.points - a.points).map((fan, idx) => (
                <div key={idx} className={`flex justify-between items-center p-2 rounded-lg ${fan.name.includes('You') ? 'bg-secondary/15 border border-secondary/30' : 'bg-slate-50 dark:bg-white/5'}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-primary dark:text-secondary">{idx + 1}.</span>
                    <span>{fan.name}</span>
                  </div>
                  <span className="font-bold">{fan.points} XP</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action items rewards */}
        <Card className="border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 py-3">
            <CardTitle className="text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Gift size={14} className="text-secondary" />
              Redeem Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {rewardsList.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{reward.img}</span>
                  <div className="text-left leading-normal">
                    <p className="font-bold text-primary dark:text-white truncate max-w-[130px]">{reward.title}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">{reward.points} XP required</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleRedeem(reward)}
                  disabled={points < reward.points}
                  variant="outline"
                  size="sm"
                  className="text-[9px] uppercase font-bold py-1 h-7 border-slate-200"
                >
                  REDEEM
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Redemption Code Overlay */}
      {redeemedCode && (
        <Card className="max-w-md mx-auto border-2 border-secondary/30 shadow-lg text-center p-6 space-y-4">
          <Badge variant="success" className="py-1 px-2.5">REDEEMED SUCCESS</Badge>
          <h4 className="text-sm font-bold text-primary dark:text-white uppercase font-display">Active Concession Voucher</h4>
          
          <div className="bg-white p-4 rounded-lg flex flex-col items-center gap-2 border border-slate-100 max-w-fit mx-auto">
            {/* Mock Barcode */}
            <div className="w-48 h-12 bg-slate-900 flex items-center justify-between px-2.5 gap-0.5">
              {[2,4,1,8,3,1,4,2,3,6,1,4,2,2,3,1,4,2].map((w, idx) => (
                <div key={idx} className="bg-white h-full" style={{ width: `${w * 1.5}px` }}></div>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800 tracking-widest">{redeemedCode}</span>
          </div>
          
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
            Please present this barcode voucher to the concession stand volunteers at Stand B to claim your item discount.
          </p>
        </Card>
      )}

    </div>
  );
};
