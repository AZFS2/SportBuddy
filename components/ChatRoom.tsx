import React, { useState, useEffect, useRef } from 'react';
import { BuddyProfile, Message } from '../types';
import { SendIcon, ChevronLeftIcon } from './Icons';
import { generateChatReply } from '../services/geminiService';
import SportAvatar from './SportAvatar';

interface ChatRoomProps {
  buddy: BuddyProfile;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (text: string) => void;
  onReceiveReply: (text: string) => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ buddy, messages, onBack, onSendMessage, onReceiveReply }) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText;
    setInputText('');
    onSendMessage(text);

    // Simulate typing delay then generate reply
    setIsTyping(true);
    setTimeout(async () => {
      // Pass the buddy's area to context so the AI knows where the game is
      const reply = await generateChatReply(buddy.name, buddy.sport as string, buddy.area, text);
      setIsTyping(false);
      onReceiveReply(reply);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="h-full flex flex-col bg-background z-50 fixed inset-0">
      {/* Header */}
      <div className="bg-surface-50 px-4 py-3 pt-safe flex items-center shadow-sm border-b border-surface-200">
        <button onClick={onBack} className="p-2 -ml-2 mr-2 text-gray-400 hover:bg-surface-100 rounded-full transition">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <div className="relative w-10 h-10">
           <SportAvatar sport={buddy.sport as any} className="w-10 h-10 rounded-full" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-brand-500 border-2 border-surface-50 rounded-full"></div>
        </div>
        <div className="ml-3">
          <h3 className="font-bold text-white text-sm">{buddy.name}</h3>
          <p className="text-xs text-brand-500 font-medium">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
        <div className="text-center text-xs text-gray-500 my-4">
          You joined {buddy.name}'s {buddy.sport} game in {buddy.area}.
        </div>
        
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                msg.isUser 
                  ? 'bg-brand-600 text-white rounded-tr-none' 
                  : 'bg-surface-100 text-gray-200 border border-surface-200 rounded-tl-none'
              }`}
            >
              {msg.text}
              <div className={`text-[10px] mt-1 text-right ${msg.isUser ? 'text-brand-200' : 'text-gray-500'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-surface-100 px-4 py-3 rounded-2xl rounded-tl-none border border-surface-200">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="bg-surface-50 p-3 pb-safe border-t border-surface-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask for location, time..."
          className="flex-1 bg-surface-100 text-white rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 placeholder-gray-500 border border-surface-200"
        />
        <button 
          type="submit" 
          disabled={!inputText.trim() || isTyping}
          className="p-3 bg-brand-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-400 transition shadow-lg shadow-brand-500/20"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;