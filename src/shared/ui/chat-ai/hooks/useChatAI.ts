// src/shared/ui/chat-ai/hooks/useChatAI.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from '../types';
import knowledgeBase, { defaultResponse } from '../data/knowledgeBase';

const initialMessages: Message[] = [
  {
    id: 'welcome',
    content: `👋 **Привет! Я ваш SYNC AI Assistant.**\n\nЯ могу помочь вам узнать о наших услугах, процессе работы и забронировать консультацию.\n\nПопробуйте спросить о наших услугах или процессе работы!`,
    sender: 'ai',
    timestamp: new Date(),
    type: 'welcome'
  }
];

export const useChatAI = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    'Какие услуги вы предлагаете?',
    'Как проходит процесс работы?',
    'Расскажите о SYNC Agency',
    'Как забронировать консультацию?'
  ];

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = useCallback((question: string): { response: string; category: string } => {
    const normalizedQuestion = question.toLowerCase().trim();
    
    for (const [, data] of Object.entries(knowledgeBase)) {
      for (const pattern of data.patterns) {
        if (normalizedQuestion.includes(pattern)) {
          return {
            response: data.response,
            category: data.category
          };
        }
      }
    }
    
    return {
      response: defaultResponse,
      category: 'default'
    };
  }, []);

  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const { response, category } = findAnswer(inputValue.trim());
      
      const aiMessage: Message = {
        id: `ai_${Date.now()}`,
        content: response,
        sender: 'ai',
        timestamp: new Date(),
        type: category as any
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  }, [inputValue, isTyping, findAnswer]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    const userMessage: Message = {
      id: `suggestion_${Date.now()}`,
      content: suggestion,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const { response, category } = findAnswer(suggestion);
      
      const aiMessage: Message = {
        id: `ai_suggestion_${Date.now()}`,
        content: response,
        sender: 'ai',
        timestamp: new Date(),
        type: category as any
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  }, [findAnswer]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return {
    messages,
    setMessages,
    inputValue,
    setInputValue,
    isTyping,
    setIsTyping,
    suggestions,
    messagesContainerRef,
    handleSend,
    handleSuggestionClick,
    handleKeyDown,
  };
};