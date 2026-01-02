import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Globe, Smile, Frown, Meh } from 'lucide-react';
import { ChatMessage, Language } from '../types';
import { analyzeSentiment, generateResponse, getLanguageName } from '../utils/chatbot';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      const welcomeMessage: ChatMessage = {
        id: '1',
        text: getWelcomeMessage(currentLanguage),
        sender: 'bot',
        timestamp: new Date(),
        language: currentLanguage,
        sentiment: 'neutral'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, currentLanguage]);

  const getWelcomeMessage = (lang: Language): string => {
    const messages = {
      en: "Hello! I'm your learning assistant. I can help you find courses, answer questions, and support your learning journey. How can I help you today?",
      hi: "नमस्ते! मैं आपका शिक्षा सहायक हूं। मैं आपको पाठ्यक्रम खोजने, प्रश्नों के उत्तर देने और आपकी शिक्षा यात्रा में सहायता कर सकता हूं। मैं आज आपकी कैसे मदद कर सकता हूं?",
      fr: "Bonjour ! Je suis votre assistant d'apprentissage. Je peux vous aider à trouver des cours, répondre aux questions et soutenir votre parcours d'apprentissage. Comment puis-je vous aider aujourd'hui ?"
    };
    return messages[lang];
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const sentiment = analyzeSentiment(inputText);
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      language: currentLanguage,
      sentiment
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(async () => {
      const botResponse = await generateResponse(inputText, sentiment, currentLanguage);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        language: currentLanguage,
        sentiment: 'neutral'
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'happy': return <Smile className="h-4 w-4 text-green-500" />;
      case 'sad': return <Frown className="h-4 w-4 text-red-500" />;
      default: return <Meh className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle className="h-8 w-8" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">EduMaster Assistant</h3>
                <p className="text-sm opacity-90">
                  {getLanguageName(currentLanguage)} • Online
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as Language)}
                className="bg-white/20 text-white text-sm rounded-lg px-2 py-1 border border-white/30"
              >
                <option value="en">🇺🇸 EN</option>
                <option value="hi">🇮🇳 HI</option>
                <option value="fr">🇫🇷 FR</option>
              </select>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                      : 'bg-white text-slate-800 rounded-bl-md shadow-sm border border-slate-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                    <span>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {message.sentiment && getSentimentIcon(message.sentiment)}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 p-3 rounded-2xl rounded-bl-md shadow-sm border border-slate-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  currentLanguage === 'hi' 
                    ? 'अपना संदेश टाइप करें...'
                    : currentLanguage === 'fr'
                    ? 'Tapez votre message...'
                    : 'Type your message...'
                }
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isTyping}
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;