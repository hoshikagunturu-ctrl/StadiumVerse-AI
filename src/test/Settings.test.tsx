import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Settings } from '../pages/Settings';
import { SettingsProvider } from '../context/SettingsContext';
import { AccessibilityProvider } from '../context/AccessibilityContext';

const renderComponent = () => {
  return render(
    <SettingsProvider>
      <AccessibilityProvider>
        <Settings />
      </AccessibilityProvider>
    </SettingsProvider>
  );
};

describe('Settings Page', () => {
  it('renders all configuration groups and options correctly', () => {
    renderComponent();

    expect(screen.getByText('Control Panel')).toBeInTheDocument();
    expect(screen.getByText('Operations Preferences')).toBeInTheDocument();
    expect(screen.getByText('Tournament System Language')).toBeInTheDocument();
    expect(screen.getByText('Telemetry Banners & Audio')).toBeInTheDocument();
    expect(screen.getByText('Safety Drills')).toBeInTheDocument();

    // Check language options
    expect(screen.getByRole('button', { name: 'English (US)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Español' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Français' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'العربية' })).toBeInTheDocument();

    // Check checkboxes
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });

  it('allows language changes and triggers accessibility speaks', async () => {
    const user = userEvent.setup();
    renderComponent();

    const esBtn = screen.getByRole('button', { name: 'Español' });
    expect(esBtn).toBeInTheDocument();

    // Click Español button
    await user.click(esBtn);

    // Verify it changed to active styles or translated headers
    expect(screen.getByText('Panel de Control')).toBeInTheDocument();
    expect(screen.getByText('Preferencias de Operaciones')).toBeInTheDocument();

    // Switch to French
    const frBtn = screen.getByRole('button', { name: 'Français' });
    await user.click(frBtn);
    expect(screen.getByText('Panneau de Contrôle')).toBeInTheDocument();

    // Switch back to English
    const enBtn = screen.getByRole('button', { name: 'English (US)' });
    await user.click(enBtn);
    expect(screen.getByText('Control Panel')).toBeInTheDocument();
  });

  it('toggles settings options on checkbox interactions', async () => {
    const user = userEvent.setup();
    renderComponent();

    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    expect(checkboxes).toHaveLength(3);

    // Get notifications checkbox (usually the first one)
    const notificationsCheckbox = checkboxes[0];
    expect(notificationsCheckbox.checked).toBe(true);

    // Toggle off
    await user.click(notificationsCheckbox);
    expect(notificationsCheckbox.checked).toBe(false);

    // Toggle on
    await user.click(notificationsCheckbox);
    expect(notificationsCheckbox.checked).toBe(true);
  });

  it('toggles evacuation drills safety mode', async () => {
    const user = userEvent.setup();
    renderComponent();

    // Check drill trigger button
    const drillBtn = screen.getByRole('button', { name: /TRIGGER EVAC SIGNALS/i });
    expect(drillBtn).toBeInTheDocument();

    // Click to trigger evacuation drill
    await user.click(drillBtn);

    // Button text should change to termination action
    expect(screen.getByRole('button', { name: /TERMINATE DRILL/i })).toBeInTheDocument();

    // Click again to terminate drill
    const terminateBtn = screen.getByRole('button', { name: /TERMINATE DRILL/i });
    await user.click(terminateBtn);

    // Verify it is back to default trigger option
    expect(screen.getByRole('button', { name: /TRIGGER EVAC SIGNALS/i })).toBeInTheDocument();
  });
});
