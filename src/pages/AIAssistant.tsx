import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { useAccessibility } from '../context/AccessibilityContext';
import { useUserRole } from '../context/UserRoleContext';
import { Sparkles, Send, User, Bot, HelpCircle } from 'lucide-react';
import { geminiService } from '../services/gemini';
import type { GeminiContent } from '../services/gemini';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from '../hooks/useTranslation';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const AIAssistant: React.FC = () => {
  const { speak } = useAccessibility();
  const { t } = useTranslation();
  const { user } = useUserRole();
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: 'ai', 
      text: `Hello ${user ? user.name : 'Fan'}! I am your AI Stadium Assistant. Ask me anything about match times, gate locations, queue lengths, or food concessions.`, 
      time: '18:30' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Where is Section 104, Row M?",
    "Wait time at Concession B?",
    "Where is the nearest first-aid box?",
    "How to offset carbon with recycling?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text: textToSend, time }]);
    setInputValue('');
    setIsTyping(true);
    speak(`You asked: ${textToSend}`);

    // Map conversation history, excluding error messages, and including the new prompt
    const history: GeminiContent[] = messages
      .filter(msg => !msg.text.startsWith('⚠️ **Gemini API Error:**'))
      .map(msg => ({
        role: (msg.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: msg.text }]
      }));
    
    history.push({
      role: 'user',
      parts: [{ text: textToSend }]
    });

    // Clean history: Filter out the initial welcome greeting if it has 'model' role as the first item
    const cleanHistory = history.filter((item, index) => {
      if (index === 0 && item.role === 'model') {
        return false;
      }
      return true;
    });

    // Ensure strict alternation of user and model roles as required by Gemini API.
    // If consecutive turns have the same role (e.g. after a previous failed request), merge them.
    const alternatingHistory: GeminiContent[] = [];
    for (const item of cleanHistory) {
      if (alternatingHistory.length === 0) {
        if (item.role === 'user') {
          alternatingHistory.push({
            role: item.role,
            parts: [{ text: item.parts[0].text }]
          });
        }
      } else {
        const lastItem = alternatingHistory[alternatingHistory.length - 1];
        if (lastItem.role === item.role) {
          lastItem.parts[0].text += "\n\n" + item.parts[0].text;
        } else {
          alternatingHistory.push({
            role: item.role,
            parts: [{ text: item.parts[0].text }]
          });
        }
      }
    }

    try {
      const response = await geminiService.generateContent(alternatingHistory);
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      if (response.text && !response.error) {
        // Successful response from Gemini API
        setMessages(prev => [...prev, { sender: 'ai', text: response.text, time: responseTime }]);
        speak(`AI response: ${response.text}`);
      } else {
        // Render only the complete Gemini error details with NO fallback response
        const errorText = `⚠️ **Gemini API Error:** ${response.error || 'Failed to fetch response'}`;
        setMessages(prev => [...prev, { sender: 'ai', text: errorText, time: responseTime }]);
        speak(`AI error: ${response.error || 'Failed to fetch response'}`);
        
        console.error("[AIAssistant] Gemini API returned error:", response.error);
      }
    } catch (error: any) {
      // Render only the complete network exception error details with NO fallback response
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const errorText = `⚠️ **Gemini API Error:** ${error?.message || 'Unknown network error'}`;
      setMessages(prev => [...prev, { sender: 'ai', text: errorText, time: responseTime }]);
      speak(`AI error: ${error?.message || 'Unknown network error'}`);
      
      console.error("[AIAssistant] Gemini API fetch threw exception:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
          {t("AI Stadium Assistant")}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          {t("Instant matchday companion chatbot")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Quick Prompts Panel */}
        <Card className="lg:col-span-1 border border-slate-100 shadow-md h-fit">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-xs uppercase tracking-wider text-primary">
              <HelpCircle size={14} className="text-secondary" />
              {t("Suggested Inquiries")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="w-full text-left text-xs p-2.5 rounded-lg border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors font-semibold text-slate-700 dark:text-white/80 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-3 border border-slate-100 shadow-lg flex flex-col h-[520px] justify-between">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 py-3 flex items-center justify-between">
            <CardTitle className="text-sm uppercase tracking-wider text-primary flex items-center gap-2">
              <Sparkles size={16} className="text-secondary animate-pulse-glow" />
              {t("Simulated Stadium Brain Feed")}
            </CardTitle>
            <Badge variant="primary" className="border-primary/20">{t("Operational Concierge")}</Badge>
          </CardHeader>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-55">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`p-2 rounded-lg h-fit shrink-0 ${msg.sender === 'user' ? 'bg-secondary text-primary' : 'bg-primary text-white'}`}>
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                
                <div className="space-y-1">
                  <div className={`p-3.5 rounded-xl text-xs font-semibold leading-relaxed text-left ${
                    msg.sender === 'user' 
                      ? 'bg-slate-100 text-slate-800' 
                      : 'bg-primary-dark/5 text-primary dark:bg-white/5 dark:text-white'
                  }`}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold block text-left px-1 uppercase tracking-wider">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="p-2 rounded-lg bg-primary text-white shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-primary-dark/5 dark:bg-white/5 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Area */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} 
            className="p-4 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-white/10 flex gap-2"
          >
            <Input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t("Ask about gates, food wait times, first-aid...")}
              className="flex-1"
              aria-label={t("Ask AI Stadium Assistant")}
            />
            <Button type="submit" variant="primary" className="px-5 cursor-pointer shrink-0" aria-label="Send">
              <Send size={16} />
            </Button>
          </form>
        </Card>

      </div>
    </div>
  );
};
