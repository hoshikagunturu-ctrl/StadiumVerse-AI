import { useSettings } from '../context/SettingsContext';
import { translations } from '../utils/translations';

export const useTranslation = () => {
  const { settings } = useSettings();
  const lang = settings.language || 'en';

  const t = (key: string): string => {
    const dict = (translations as any)[lang] || translations['en'];
    return dict[key] || key;
  };

  return { t, lang };
};
