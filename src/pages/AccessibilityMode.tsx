import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAccessibility } from '../context/AccessibilityContext';
import { Accessibility, Eye, Volume2, Type, Info } from 'lucide-react';

export const AccessibilityMode: React.FC = () => {
  const { 
    highContrast, setHighContrast, 
    textScale, setTextScale, 
    screenReaderActive, setScreenReaderActive,
    speak, lastSpokenText
  } = useAccessibility();

  const handleTestVocal = () => {
    speak("This is a test of the AI Smart Stadium audio assist narrator. Visual elements will be spoken out loud as you interact.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
          Accessibility Center
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          Customize high contrast, text sizes, and audio assist parameters
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Toggle controls */}
        <Card className="lg:col-span-2 border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-sm uppercase tracking-wider text-primary flex items-center gap-2">
              <Accessibility size={16} className="text-secondary" />
              Adjust Options
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            
            {/* High Contrast */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 text-left text-xs font-semibold">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-primary dark:text-white flex items-center gap-2 uppercase tracking-wide">
                  <Eye size={16} className="text-secondary" />
                  High Contrast Colors
                </h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Overwrites styling palette to high-contrast black backgrounds with yellow borders.</p>
              </div>
              <Button
                variant={highContrast ? 'secondary' : 'outline'}
                onClick={() => {
                  setHighContrast(!highContrast);
                  speak(`High contrast mode ${!highContrast ? 'activated' : 'deactivated'}`);
                }}
                className="text-[10px] font-bold uppercase tracking-wider shrink-0"
              >
                {highContrast ? 'ENABLED (DISABLE)' : 'ENABLE CONTRAST'}
              </Button>
            </div>

            {/* Text Scale */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 text-left text-xs font-semibold">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-primary dark:text-white flex items-center gap-2 uppercase tracking-wide">
                  <Type size={16} className="text-secondary" />
                  Text Size Scaler
                </h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Increases scaling across paragraphs, labels, and operations headers.</p>
              </div>
              <div className="flex gap-1 bg-slate-200 dark:bg-white/10 p-1 rounded-lg shrink-0 w-fit self-start sm:self-center">
                {['normal', 'large', 'extra-large'].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => {
                      setTextScale(scale as any);
                      speak(`Text size set to ${scale}`);
                    }}
                    className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded cursor-pointer transition-all ${
                      textScale === scale 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    {scale.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Assist */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 text-left text-xs font-semibold">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-primary dark:text-white flex items-center gap-2 uppercase tracking-wide">
                  <Volume2 size={16} className="text-secondary" />
                  Audio Assist Narrator
                </h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Uses Web Speech synthesis output to vocalize updates, navigation alerts, and selections.</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  variant={screenReaderActive ? 'accent' : 'outline'}
                  onClick={() => {
                    const active = !screenReaderActive;
                    setScreenReaderActive(active);
                    speak(active ? "Audio assist narrator active." : "");
                  }}
                  className="text-[10px] font-bold uppercase tracking-wider"
                >
                  {screenReaderActive ? 'ACTIVE (DISABLE)' : 'ACTIVATE'}
                </Button>
                {screenReaderActive && (
                  <Button
                    variant="outline"
                    onClick={handleTestVocal}
                    className="text-[10px] font-bold uppercase tracking-wider"
                  >
                    TEST
                  </Button>
                )}
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Accessibility guidelines */}
        <Card className="border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-sm uppercase tracking-wider text-primary">
              <Info size={16} className="text-secondary" />
              Keyboard Shortcuts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4 text-xs font-semibold text-left">
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              This application has been fully structured with ARIA landmarks. Use standard browser keyboard shortcut maps for immediate navigation:
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-white/5 rounded border border-slate-100">
                <span>Navigate links</span>
                <Badge variant="outline">Tab</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-white/5 rounded border border-slate-100">
                <span>Select option / trigger button</span>
                <Badge variant="outline">Enter / Space</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-white/5 rounded border border-slate-100">
                <span>Expand dropdowns</span>
                <Badge variant="outline">Down Arrow</Badge>
              </div>
            </div>

            {/* Vocal status log */}
            {screenReaderActive && lastSpokenText && (
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Last Spoken Feed:</span>
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg text-slate-700 dark:text-white italic">
                  "{lastSpokenText}"
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
