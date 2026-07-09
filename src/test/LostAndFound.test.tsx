import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { LostAndFound } from '../pages/LostAndFound';
import { SettingsProvider, useSettings } from '../context/SettingsContext';
import { AccessibilityProvider } from '../context/AccessibilityContext';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AccessibilityProvider>
      <SettingsProvider>
        {children}
      </SettingsProvider>
    </AccessibilityProvider>
  );
};

// Helper component to switch language inside tests
const LanguageSwitcher: React.FC = () => {
  const { updateSetting } = useSettings();
  return (
    <button onClick={() => updateSetting('language', 'es')}>Switch to Spanish</button>
  );
};

describe('LostAndFound Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('speechSynthesis', {
      speak: vi.fn(),
      cancel: vi.fn(),
      getVoices: vi.fn().mockReturnValue([])
    });
  });

  it('renders default English view correctly', () => {
    render(
      <TestWrapper>
        <LostAndFound />
      </TestWrapper>
    );

    expect(screen.getByText('Lost & Found Registry')).toBeInTheDocument();
    expect(screen.getByText('File Loss Incident')).toBeInTheDocument();
    expect(screen.getByText('Active Depots Inventory')).toBeInTheDocument();
  });

  it('submits a new loss report successfully', () => {
    render(
      <TestWrapper>
        <LostAndFound />
      </TestWrapper>
    );

    const nameInput = screen.getByLabelText('Item Name / Category');
    const locInput = screen.getByLabelText('Approximate Loss Location');
    const descInput = screen.getByLabelText('Description & Contact info');
    const submitBtn = screen.getByText('SUBMIT REPORT');

    fireEvent.change(nameInput, { target: { value: 'Golden Keyring' } });
    fireEvent.change(locInput, { target: { value: 'Section 204' } });
    fireEvent.change(descInput, { target: { value: 'Contact 555' } });

    act(() => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText('Golden Keyring')).toBeInTheDocument();
    expect(screen.getByText('Section 204')).toBeInTheDocument();
  });

  it('responds to language switching updates', () => {
    render(
      <TestWrapper>
        <LanguageSwitcher />
        <LostAndFound />
      </TestWrapper>
    );

    // Initial English
    expect(screen.getByText('Lost & Found Registry')).toBeInTheDocument();

    // Toggle to Spanish
    const switchBtn = screen.getByText('Switch to Spanish');
    act(() => {
      switchBtn.click();
    });

    // Check Spanish translation
    expect(screen.getByText('Registro de Objetos Perdidos')).toBeInTheDocument();
    expect(screen.getByText('Reportar pérdida de objeto')).toBeInTheDocument();
  });
});
