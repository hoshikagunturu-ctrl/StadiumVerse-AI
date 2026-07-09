import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { geminiService } from '../services/gemini';

describe('geminiService', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should check configuration correctly', () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'test-api-key');
    expect(geminiService.getApiKey()).toBe('test-api-key');
    expect(geminiService.isConfigured()).toBe(true);

    vi.stubEnv('VITE_GEMINI_API_KEY', '');
    expect(geminiService.getApiKey()).toBe('');
    expect(geminiService.isConfigured()).toBe(false);
  });

  it('should return error immediately if API key is missing', async () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', '');
    const result = await geminiService.generateContent('Hello');
    expect(result.error).toContain('Configuration Error');
    expect(result.text).toBe('');
  });

  it('should call fetch and generate content for single prompt string', async () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'key-123');
    
    const mockResponseText = 'This is a Gemini AI response.';
    const mockJsonPromise = Promise.resolve({
      candidates: [
        {
          content: {
            parts: [{ text: mockResponseText }]
          }
        }
      ]
    });
    
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => mockJsonPromise
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await geminiService.generateContent('Hi there');
    
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=key-123'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('"text":"Hi there"')
      })
    );
    expect(result.text).toBe(mockResponseText);
    expect(result.error).toBeUndefined();
  });

  it('should handle custom model selection', async () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'key-123');
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({
        candidates: [{ content: { parts: [{ text: 'response' }] } }]
      })
    });
    vi.stubGlobal('fetch', mockFetch);

    await geminiService.generateContent('Hi', 'gemini-1.5-pro');
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/models/gemini-1.5-pro:generateContent'),
      expect.any(Object)
    );
  });

  it('should handle API HTTP errors with status codes', async () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'key-123');
    
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: () => Promise.resolve({
        error: { message: 'Quota exceeded for this API key.' }
      })
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await geminiService.generateContent('Hi');
    expect(result.text).toBe('');
    expect(result.error).toContain('API Communication Error: Quota exceeded for this API key.');
  });

  it('should handle API invalid JSON response structure', async () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'key-123');
    
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}) // Empty JSON
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await geminiService.generateContent('Hi');
    expect(result.text).toBe('');
    expect(result.error).toContain('Invalid response format received from Gemini API.');
  });

  it('should handle fetch exception throws (network down)', async () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'key-123');
    
    const mockFetch = vi.fn().mockRejectedValue(new Error('DNS lookup failed'));
    vi.stubGlobal('fetch', mockFetch);

    const result = await geminiService.generateContent('Hi');
    expect(result.text).toBe('');
    expect(result.error).toContain('API Communication Error: DNS lookup failed');
  });
});
