/**
 * StadiumVerse AI Gemini API Service.
 * Securely communicates with the Google Gemini API using VITE_GEMINI_API_KEY.
 */

export interface GeminiContent {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface GeminiResponse {
  text: string;
  error?: string;
}

export const geminiService = {
  /**
   * Retrieves the secure API key from Vite environment variables.
   */
  getApiKey: (): string => {
    return import.meta.env.VITE_GEMINI_API_KEY || '';
  },

  /**
   * Checks if the Gemini API key is configured.
   */
  isConfigured: (): boolean => {
    return !!geminiService.getApiKey();
  },

  /**
   * Calls the Google Gemini API to generate content.
   * Supports both simple prompt strings and multi-turn conversation history.
   * If the key is missing or the request fails, returns a professional error message.
   */
  generateContent: async (contents: string | GeminiContent[], model: string = 'gemini-2.5-flash'): Promise<GeminiResponse> => {
    const apiKey = geminiService.getApiKey();
    
    if (!apiKey) {
      const errorMsg = "Configuration Error: Gemini API key is missing. Please configure VITE_GEMINI_API_KEY in your local environment configuration (.env.local).";
      console.error("[Gemini API] Error:", errorMsg);
      return {
        text: '',
        error: errorMsg
      };
    }

    let contentsBody: any[];
    if (typeof contents === 'string') {
      contentsBody = [
        {
          role: 'user',
          parts: [{ text: contents }]
        }
      ];
    } else {
      contentsBody = contents;
    }

    console.log("[Gemini API] Outgoing Request Payload:", JSON.stringify({ contents: contentsBody }, null, 2));

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: contentsBody
          })
        }
      );

      console.log("[Gemini API] HTTP Status Code:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("[Gemini API] Error Response Data:", JSON.stringify(errorData, null, 2));
        const errMsg = errorData?.error?.message || `HTTP error! Status: ${response.status}`;
        throw new Error(errMsg);
      }

      const data = await response.json();
      console.log("[Gemini API] Successful Response Data:", JSON.stringify(data, null, 2));
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("Invalid response format received from Gemini API.");
      }

      return { text };
    } catch (err: any) {
      const errMsg = err.message || 'Unknown network error occurred.';
      console.error("[Gemini API] Exception Error:", errMsg);
      return {
        text: '',
        error: `API Communication Error: ${errMsg}`
      };
    }
  }
};
