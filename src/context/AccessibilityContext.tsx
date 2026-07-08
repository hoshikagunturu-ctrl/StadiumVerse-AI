import React, { createContext, useContext, useState, useEffect } from 'react';

type TextScale = 'normal' | 'large' | 'extra-large';

interface AccessibilityContextType {
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  textScale: TextScale;
  setTextScale: (scale: TextScale) => void;
  screenReaderActive: boolean;
  setScreenReaderActive: (val: boolean) => void;
  speak: (text: string) => void;
  lastSpokenText: string;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('hc-mode') === 'true';
  });
  const [textScale, setTextScale] = useState<TextScale>(() => {
    return (localStorage.getItem('text-scale') as TextScale) || 'normal';
  });
  const [screenReaderActive, setScreenReaderActive] = useState<boolean>(() => {
    const saved = localStorage.getItem('sr-active');
    return saved === null ? true : saved === 'true';
  });
  const [lastSpokenText, setLastSpokenText] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('hc-mode', String(highContrast));
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('dark'); // Let's use Tailwind's dark utility for high contrast or customized styles
      root.style.setProperty('--color-primary', '#000000');
      root.style.setProperty('--color-stadium-dark', '#000000');
      root.style.setProperty('--color-secondary', '#FFFF00'); // Neon gold/yellow for high contrast
    } else {
      root.classList.remove('dark');
      root.style.removeProperty('--color-primary');
      root.style.removeProperty('--color-stadium-dark');
      root.style.removeProperty('--color-secondary');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('text-scale', textScale);
    const body = document.body;
    body.classList.remove('text-lg', 'text-xl');
    if (textScale === 'large') {
      body.classList.add('text-lg');
    } else if (textScale === 'extra-large') {
      body.classList.add('text-xl');
    }
  }, [textScale]);

  useEffect(() => {
    localStorage.setItem('sr-active', String(screenReaderActive));
  }, [screenReaderActive]);

  const speak = (text: string) => {
    setLastSpokenText(text);
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        
        if (!screenReaderActive) return;

        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 1.0;
          
          const voices = window.speechSynthesis.getVoices();
          if (voices && voices.length > 0) {
            const enVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
            utterance.voice = enVoice;
          }
          window.speechSynthesis.speak(utterance);
        }, 50);
      } catch (err) {
        console.error("Speech Synthesis Error:", err);
      }
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        setHighContrast,
        textScale,
        setTextScale,
        screenReaderActive,
        setScreenReaderActive,
        speak,
        lastSpokenText,
      }}
    >
      {children}
      {screenReaderActive && lastSpokenText && (
        <div 
          className="fixed bottom-4 right-4 bg-secondary text-primary font-bold px-4 py-2 rounded-lg shadow-lg z-50 text-sm flex items-center gap-2 animate-bounce border-2 border-primary"
          role="status"
          aria-live="assertive"
        >
          <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></span>
          <span>Audio Assist: "{lastSpokenText}"</span>
        </div>
      )}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
