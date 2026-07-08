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

interface Message {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const AIAssistant: React.FC = () => {
  const { speak } = useAccessibility();
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

  const getSimulatedResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('section') || q.includes('seat') || q.includes('row')) {
      return `According to your digital ticket profile, your seat is Section 104, Row M, Seat 18. You should enter through Gate G (North Entrance), take the escalators to Level 2, and proceed to Corridor 4.`;
    }
    if (q.includes('concession') || q.includes('wait') || q.includes('food') || q.includes('queue')) {
      return `Concession Stand B (Vegan Options) is currently the most optimal dining choice with a short 5-minute wait time. Concession C has an 18-minute line. You can order in advance via the Gourmet Eats tab!`;
    }
    if (q.includes('first-aid') || q.includes('medical') || q.includes('emergency') || q.includes('exits')) {
      return `The closest first-aid block to Section 104 is First Aid East, located just behind section 103 on Level 1. In case of evacuation, your nearest exit is Exit Gate A.`;
    }
    if (q.includes('carbon') || q.includes('recycle') || q.includes('eco') || q.includes('points')) {
      return `You can log eco points by recycling bottles at any Smart Eco Bin located in corridors 101 and 104. Use the Eco Rewards console to log actions and redeem food vouchers!`;
    }
    return `That is a great question. For this simulation: the match is live (ARG 2-1 BRA 82'). Please check the operations panel tabs for interactive maps, transit boards, and food pre-orders!`;
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text: textToSend, time }]);
    setInputValue('');
    setIsTyping(true);
    speak(`You asked: ${textToSend}`);

    // Map conversation history including the new prompt
    const history: GeminiContent[] = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    
    history.push({
      role: 'user',
      parts: [{ text: textToSend }]
    });

    try {
      const response = await geminiService.generateContent(history);
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      if (response.text && !response.error) {
        // Successful response from Gemini API
        setMessages(prev => [...prev, { sender: 'ai', text: response.text, time: responseTime }]);
        speak(`AI response: ${response.text}`);
      } else {
        // Fallback to simulated response when API key is missing or service returns an error
        const fallbackText = getSimulatedResponse(textToSend);
        setMessages(prev => [...prev, { sender: 'ai', text: fallbackText, time: responseTime }]);
        speak(`AI fallback response: ${fallbackText}`);
        
        console.warn("[AIAssistant] Gemini API returned error, fell back to local simulator:", response.error);
      }
    } catch (error) {
      // Fallback to simulated response on network exception
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const fallbackText = getSimulatedResponse(textToSend);
      setMessages(prev => [...prev, { sender: 'ai', text: fallbackText, time: responseTime }]);
      speak(`AI fallback response: ${fallbackText}`);
      
      console.error("[AIAssistant] Gemini API fetch threw exception, fell back to local simulator:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-primary dark:text-white uppercase font-display leading-tight">
          AI Stadium Assistant
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          Instant matchday companion chatbot
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Quick Prompts Panel */}
        <Card className="lg:col-span-1 border border-slate-100 shadow-md h-fit">
          <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100">
            <CardTitle className="text-xs uppercase tracking-wider text-primary">
              <HelpCircle size={14} className="text-secondary" />
              Suggested Inquiries
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
              🚀 GEMINI TEST 123
            </CardTitle>
            <Badge variant="primary" className="border-primary/20">Operational Concierge</Badge>
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
              placeholder="Ask about gates, food wait times, first-aid..."
              className="flex-1"
              aria-label="Ask AI Stadium Assistant"
            />
            <Button type="submit" variant="primary" className="px-5 cursor-pointer shrink-0">
              <Send size={16} />
            </Button>
          </form>
        </Card>

      </div>
    </div>
  );
};
