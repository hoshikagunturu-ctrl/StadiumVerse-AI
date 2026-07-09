import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock speech synthesis API
if (typeof window !== 'undefined') {
  // SpeechSynthesisUtterance mock
  class MockSpeechSynthesisUtterance {
    text: string;
    lang: string = 'en-US';
    rate: number = 1;
    pitch: number = 1;
    volume: number = 1;
    voice: any = null;
    onstart: any = null;
    onend: any = null;
    onerror: any = null;

    constructor(text: string) {
      this.text = text;
    }
  }
  (window as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;

  // SpeechSynthesis mock
  (window as any).speechSynthesis = {
    speak: vi.fn((utterance: any) => {
      if (utterance.onstart) utterance.onstart();
      if (utterance.onend) {
        setTimeout(() => utterance.onend(), 10);
      }
    }),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: vi.fn().mockReturnValue([
      { name: 'Mock Voice English', lang: 'en-US', default: true },
      { name: 'Mock Voice Spanish', lang: 'es-ES', default: false }
    ]),
    speaking: false,
    pending: false,
    paused: false,
    onvoiceschanged: null,
  } as any;

  // Mock Element.prototype.scrollIntoView
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
}
