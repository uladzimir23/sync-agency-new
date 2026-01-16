// ChatAI.tsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatAI.module.scss';
import { ChatAIProps, Message } from './types';

export const ChatAI: React.FC<ChatAIProps> = ({
  className = '',
  initialMessages = [],
  onSendMessage,
  placeholder = 'Ask me anything about our services...',
  title = 'Sync AI Assistant'
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your Sync AI assistant. I can help you with information about our services, booking consultations, or answering any questions you might have.',
      sender: 'ai',
      timestamp: new Date()
    },
    ...initialMessages
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    'Tell me about your services',
    'How to book a consultation?',
    'What makes Sync Agency different?',
    'What industries do you work with?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (onSendMessage) {
        await onSendMessage(inputValue.trim());
      } else {
        // Default AI response
        setTimeout(() => {
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            content: `Thanks for your question! I'm currently learning about Sync Agency's services. For detailed information, please visit our services page or book a consultation with our experts.`,
            sender: 'ai',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiResponse]);
          setIsTyping(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`${styles.chatContainer} ${className}`}>
      <div className={styles.chatHeader}>
        <h2>{title}</h2>
        <div className={styles.subtitle}>
          Ask questions about our services, get instant answers
        </div>
      </div>

      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${styles[message.sender]}`}
          >
            <div className={styles.messageContent}>
              {message.content}
            </div>
            <div className={styles.messageMeta}>
              <span>{message.sender === 'ai' ? 'Sync AI' : 'You'}</span>
              <span>{formatTime(message.timestamp)}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className={styles.typingIndicator}>
            <span>AI is typing</span>
            <div className={styles.dots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.chatInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            rows={2}
            disabled={isTyping}
          />
          <button
            className={styles.sendButton}
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
          >
            <span className={styles.sendIcon}>✈️</span>
            Send
          </button>
        </div>

        <div className={styles.suggestions}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className={styles.suggestionButton}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isTyping}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};