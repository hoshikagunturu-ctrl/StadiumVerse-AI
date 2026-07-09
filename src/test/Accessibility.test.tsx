import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { AccessibilityProvider, useAccessibility } from '../context/AccessibilityContext';

const TestComponent = () => {
  const { highContrast, setHighContrast, textScale, setTextScale, speak } = useAccessibility();
  return (
    <div>
      <span data-testid="contrast">{highContrast ? 'dark' : 'light'}</span>
      <span data-testid="scale">{textScale}</span>
      <button onClick={() => setHighContrast(true)}>Enable Contrast</button>
      <button onClick={() => setTextScale('large')}>Large Text</button>
      <button onClick={() => speak('Hello World')}>Speak English</button>
    </div>
  );
};

describe('AccessibilityProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('speechSynthesis', {
      speak: vi.fn(),
      cancel: vi.fn(),
      getVoices: vi.fn().mockReturnValue([
        { lang: 'en-US', name: 'English Voice' },
        { lang: 'es-ES', name: 'Spanish Voice' }
      ])
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders default accessibility state', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );
    expect(screen.getByTestId('contrast')).toHaveTextContent('light');
    expect(screen.getByTestId('scale')).toHaveTextContent('normal');
  });

  it('toggles high contrast classes and properties', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    const button = screen.getByText('Enable Contrast');
    act(() => {
      button.click();
    });

    expect(screen.getByTestId('contrast')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe('#000000');
  });

  it('toggles body text scale classes', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    const button = screen.getByText('Large Text');
    act(() => {
      button.click();
    });

    expect(screen.getByTestId('scale')).toHaveTextContent('large');
    expect(document.body.classList.contains('text-lg')).toBe(true);
  });
});
