import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useSettings } from '../context/SettingsContext';
import type { Language } from '../context/SettingsContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { Settings as SettingsIcon, Bell, Globe, ShieldAlert } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const Settings: React.FC = () => {
  const { settings, updateSetting } = useSettings();
  const { speak } = useAccessibility();
  const { t } = useTranslation();

  const handleLanguageChange = (lang: Language) => {
    updateSetting('language', lang);
    const langNames = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      ar: 'Arabic'
    };
    speak(`${t("System language updated to")} ${t(langNames[lang])}`);
  };

  const handleToggle = <K extends keyof typeof settings>(key: K, name: string) => {
    const nextVal = !settings[key];
    updateSetting(key, nextVal as any);
    speak(`${t(name)} ${nextVal ? t('enabled') : t('disabled')}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
          {t("Control Panel")}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          {t("Manage system configurations, user profiles, and operations alerts")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core parameters toggles */}
        <Card className="lg:col-span-2 border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-sm uppercase tracking-wider text-primary flex items-center gap-2">
              <SettingsIcon size={16} className="text-secondary" />
              {t("Operations Preferences")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5 text-left text-xs font-semibold">
            
            {/* Language Selection */}
            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 space-y-3">
              <h4 className="text-sm font-bold text-primary dark:text-white flex items-center gap-2 uppercase tracking-wide">
                <Globe size={16} className="text-secondary" />
                {t("Tournament System Language")}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 font-medium">{t("Select your preferred FWC stadium documentation language translation.")}</p>
              
              <div className="flex gap-1.5 flex-wrap pt-1.5">
                {[
                  { id: 'en', name: 'English (US)' },
                  { id: 'es', name: 'Español' },
                  { id: 'fr', name: 'Français' },
                  { id: 'ar', name: 'العربية' }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageChange(lang.id as Language)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      settings.language === lang.id 
                        ? 'bg-primary text-white border-primary shadow-sm' 
                        : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification settings */}
            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 space-y-4">
              <h4 className="text-sm font-bold text-primary dark:text-white flex items-center gap-2 uppercase tracking-wide">
                <Bell size={16} className="text-secondary" />
                {t("Telemetry Banners & Audio")}
              </h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
                  <div>
                    <span className="font-bold">{t("Real-time Push Notifications")}</span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{t("Surge queue and transit notifications")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notificationsEnabled}
                    onChange={() => handleToggle('notificationsEnabled', 'Push notifications')}
                    className="w-5 h-5 accent-primary border-slate-300 rounded cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
                  <div>
                    <span className="font-bold">{t("Sound Alerts Ticker")}</span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{t("Goal scores sound cues and emergency notices")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.soundEnabled}
                    onChange={() => handleToggle('soundEnabled', 'Sound notifications')}
                    className="w-5 h-5 accent-primary border-slate-300 rounded cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between pb-1">
                  <div>
                    <span className="font-bold">{t("In-Seat Delivery Alerts")}</span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{t("Receive notifications when volunteer courier leaves concession")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.deliverToSeat}
                    onChange={() => handleToggle('deliverToSeat', 'In-seat delivery alerts')}
                    className="w-5 h-5 accent-primary border-slate-300 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* System parameters drills */}
        <Card className="border border-slate-100 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-sm uppercase tracking-wider text-primary">
              <ShieldAlert size={16} className="text-secondary" />
              {t("Safety Drills")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4 text-xs font-semibold text-left">
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {t("Organizers can simulate evacuation safety exercises in this companion portal to check volunteer task coordination.")}
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-3 bg-red-50/30 dark:bg-red-950/10 border border-red-200/50 rounded-xl space-y-2">
                <span className="font-extrabold text-red-600 dark:text-red-400 uppercase">{t("Stadium Evacuation Drill")}</span>
                <p className="text-[11px] text-slate-600 dark:text-white/60 leading-normal font-medium">{t("Toggling this globally broadcasts evacuation banners to all Fan digital wallets, directing them to the nearest exit gate.")}</p>
                
                <Button 
                  onClick={() => {
                    const nextVal = !settings.evacuationMode;
                    updateSetting('evacuationMode', nextVal);
                    speak(nextVal ? t("Evacuation drill active.") : t("Evacuation drill terminated."));
                  }}
                  variant={settings.evacuationMode ? 'primary' : 'danger'}
                  fullWidth
                  className="text-[10px] tracking-wider font-extrabold uppercase mt-1"
                >
                  {settings.evacuationMode ? t('TERMINATE DRILL') : t('TRIGGER EVAC SIGNALS')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
