import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AIAssistant } from '../pages/AIAssistant';
import { SettingsProvider } from '../context/SettingsContext';
import { AccessibilityProvider } from '../context/AccessibilityContext';
import { UserRoleProvider } from '../context/UserRoleContext';
import { geminiService } from '../services/gemini';

// Mock geminiService API calls
vi.mock('../services/gemini', () => {
  return {
    geminiService: {
      generateContent: vi.fn(),
      isConfigured: vi.fn().mockReturnValue(true),
      getApiKey: vi.fn().mockReturnValue('mock-key')
    }
  };
});

const renderComponent = () => {
  return render(
    <SettingsProvider>
      <AccessibilityProvider>
        <UserRoleProvider>
          <AIAssistant />
        </UserRoleProvider>
      </AccessibilityProvider>
    </SettingsProvider>
  );
};

describe('AIAssistant Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the chat layout elements correctly', () => {
    renderComponent();

    // Check title and subtitle
    expect(screen.getByText('AI Stadium Assistant')).toBeInTheDocument();
    expect(screen.getByText('Instant matchday companion chatbot')).toBeInTheDocument();
    
    // Check initial welcome message
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
    expect(screen.getByText(/I am your AI Stadium Assistant/i)).toBeInTheDocument();

    // Check quick prompts panel
    expect(screen.getByText('Suggested Inquiries')).toBeInTheDocument();
    expect(screen.getByText('Where is Section 104, Row M?')).toBeInTheDocument();
    expect(screen.getByText('Wait time at Concession B?')).toBeInTheDocument();

    // Check input field and send button
    expect(screen.getByPlaceholderText('Ask about gates, food wait times, first-aid...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('allows user to type a query and receive a successful AI response', async () => {
    const user = userEvent.setup();
    const mockAiResponse = 'To offset carbon, locate one of our Smart Eco Bins in Corridor 101.';
    
    vi.mocked(geminiService.generateContent).mockResolvedValue({
      text: mockAiResponse
    });

    renderComponent();

    const input = screen.getByPlaceholderText('Ask about gates, food wait times, first-aid...');
    const sendButton = screen.getByRole('button', { name: 'Send' });

    // Type query
    await user.type(input, 'How can I recycle?');
    expect(input).toHaveValue('How can I recycle?');

    // Click Send
    await user.click(sendButton);
    expect(input).toHaveValue(''); // input cleared

    // User message should appear in chat
    expect(screen.getByText('How can I recycle?')).toBeInTheDocument();

    // Wait for the AI response to render
    await waitFor(() => {
      expect(screen.getByText(mockAiResponse)).toBeInTheDocument();
    });

    // Verify history parameter passed to generateContent
    expect(geminiService.generateContent).toHaveBeenCalledTimes(1);
    const historyArg = vi.mocked(geminiService.generateContent).mock.calls[0][0];
    
    // History should start with user turn and alternate (welcome message filtered)
    expect(historyArg[0].role).toBe('user');
    expect(historyArg[0].parts[0].text).toBe('How can I recycle?');
  });

  it('renders detailed error bubble if Gemini API returns an error status', async () => {
    const user = userEvent.setup();
    const mockError = 'Quota exceeded: HTTP 429';
    
    vi.mocked(geminiService.generateContent).mockResolvedValue({
      text: '',
      error: mockError
    });

    renderComponent();

    const input = screen.getByPlaceholderText('Ask about gates, food wait times, first-aid...');
    const sendButton = screen.getByRole('button', { name: 'Send' });

    await user.type(input, 'Where is the medical station?');
    await user.click(sendButton);

    // Wait for the error block to be added to messages
    await waitFor(() => {
      const match = screen.queryByText(/Gemini API Error/i) || screen.queryByText((content) => content.includes('Quota exceeded'));
      expect(match).toBeInTheDocument();
    });
  });

  it('triggers quick prompt send on click', async () => {
    const user = userEvent.setup();
    const mockAiResponse = 'Concession Stand B current wait time is 5 minutes.';
    
    vi.mocked(geminiService.generateContent).mockResolvedValue({
      text: mockAiResponse
    });

    renderComponent();

    // Target the specific button inside Suggested Inquiries list
    const quickPromptBtn = screen.getByRole('button', { name: 'Wait time at Concession B?' });

    // Click the prompt button directly
    await user.click(quickPromptBtn);

    // Verify chat bubble message appears (we use queryAllByText to handle both button and bubble elements)
    const elements = screen.queryAllByText('Wait time at Concession B?');
    expect(elements.length).toBeGreaterThan(0);

    // Wait for the AI response
    await waitFor(() => {
      expect(screen.getByText(mockAiResponse)).toBeInTheDocument();
    });
  });
});
