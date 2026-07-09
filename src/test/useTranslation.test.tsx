import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { SettingsProvider, useSettings } from '../context/SettingsContext';
import { useTranslation } from '../hooks/useTranslation';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SettingsProvider>
    {children}
  </SettingsProvider>
);

describe('useTranslation', () => {
  it('should translate correctly in English by default', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });

    expect(result.current.lang).toBe('en');
    expect(result.current.t('AI Stadium Assistant')).toBe('AI Stadium Assistant');
    expect(result.current.t('Gourmet Eats')).toBe('Gourmet Eats');
    // Non-existent key should return key itself
    expect(result.current.t('Random Key Name')).toBe('Random Key Name');
  });

  it('should update translations when settings language changes', () => {
    const { result } = renderHook(
      () => {
        const trans = useTranslation();
        const settingsContext = useSettings();
        return { trans, settingsContext };
      },
      { wrapper }
    );

    // Default English
    expect(result.current.trans.lang).toBe('en');
    expect(result.current.trans.t('Settings')).toBe('Settings');

    // Change to Spanish (es)
    act(() => {
      result.current.settingsContext.updateSetting('language', 'es');
    });

    expect(result.current.trans.lang).toBe('es');
    expect(result.current.trans.t('Settings')).toBe('Configuración');
    expect(result.current.trans.t('AI Stadium Assistant')).toBe('Asistente de Estadio de IA');

    // Change to French (fr)
    act(() => {
      result.current.settingsContext.updateSetting('language', 'fr');
    });

    expect(result.current.trans.lang).toBe('fr');
    expect(result.current.trans.t('Settings')).toBe('Paramètres');
    expect(result.current.trans.t('AI Stadium Assistant')).toBe('Assistant de Stade IA');

    // Change to Arabic (ar)
    act(() => {
      result.current.settingsContext.updateSetting('language', 'ar');
    });

    expect(result.current.trans.lang).toBe('ar');
    expect(result.current.trans.t('Settings')).toBe('الإعدادات');
    expect(result.current.trans.t('AI Stadium Assistant')).toBe('مساعد الاستاد بالذكاء الاصطناعي');
  });
});
