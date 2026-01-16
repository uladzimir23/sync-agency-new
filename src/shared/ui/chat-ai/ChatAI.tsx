// ChatAI.tsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatAI.module.scss';
import { ChatAIProps, Message } from './types';

// Локальная база знаний с подготовленными ответами
const knowledgeBase = {
  // Вопросы о компании
  'about': {
    patterns: ['about', 'company', 'sync agency', 'who are you', 'what do you do'],
    response: `**SYNC Agency** is a full-cycle digital agency specializing in marketing, branding, and product growth. We create results through advertising, analytics, design, and automation.\n\nOur integrated approach combines:\n• **Brand & Identity** - Building memorable brands\n• **Marketing Strategy** - Data-driven campaigns\n• **Product Development** - User-centered products\n• **Analytics & Optimization** - Performance intelligence\n• **Automation & Infrastructure** - Scalable solutions`,
    category: 'company'
  },
  
  // Услуги
  'services': {
    patterns: ['services', 'offerings', 'what you offer', 'work', 'do you do'],
    response: `We offer 5 core services:\n\n**🎨 Branding & Identity**\nComplete brand strategy, visual identity, and brand guidelines.\n\n**📈 Marketing Strategy**\nData-driven campaigns, audience targeting, and conversion optimization.\n\n**💻 Product Development**\nEnd-to-end product design, development, and launch.\n\n**📊 Analytics & Optimization**\nPerformance tracking, A/B testing, and data-driven decisions.\n\n**⚡ Automation & Infrastructure**\nWorkflow automation and scalable tech infrastructure.`,
    category: 'services'
  },
  
  // Процесс работы
  'process': {
    patterns: ['process', 'how you work', 'methodology', 'approach', 'steps'],
    response: `Our **4-step process**:\n\n**1. Discovery** (1-2 weeks)\n• Deep dive into your business\n• Market & competitor analysis\n• Goal setting & KPIs\n\n**2. Strategy** (2-3 weeks)\n• Custom strategy development\n• Roadmap creation\n• Resource planning\n\n**3. Execution** (4-12 weeks)\n• Agile development cycles\n• Regular progress updates\n• Quality assurance\n\n**4. Optimization** (ongoing)\n• Performance monitoring\n• Continuous improvements\n• Scaling successful initiatives`,
    category: 'process'
  },
  
  // Клиенты и кейсы
  'clients': {
    patterns: ['clients', 'projects', 'portfolio', 'case studies', 'work with'],
    response: `We work with:\n\n**🚀 Startups** (Seed to Series B)\n• MVP development\n• Go-to-market strategy\n• Growth hacking\n\n**🏢 Enterprises**\n• Digital transformation\n• Process automation\n• Brand revitalization\n\n**📱 Tech Companies**\n• SaaS platform development\n• API integrations\n• Tech stack optimization\n\n**🎯 E-commerce**\n• Conversion rate optimization\n• Marketing automation\n• Customer journey mapping`,
    category: 'clients'
  },
  
  // Консультации
  'consultation': {
    patterns: ['consultation', 'book', 'meeting', 'schedule', 'call'],
    response: `**Book a consultation in 3 easy steps:**\n\n1. **Choose a time** - Pick from available slots\n2. **Share details** - Tell us about your project\n3. **Get strategy** - Receive customized recommendations\n\n**What to expect:**\n• 30-45 minute call\n• Expert analysis of your needs\n• Actionable recommendations\n• No obligation to proceed\n\n**Use the booking section below or click the floating contact button!**`,
    category: 'booking'
  },
  
  // Цены
  'pricing': {
    patterns: ['pricing', 'cost', 'price', 'budget', 'investment'],
    response: `We offer **custom pricing** based on:\n\n**📐 Project Scope**\n• Complexity & requirements\n• Timeline & deliverables\n• Team size needed\n\n**🏢 Business Size**\n• Startups vs enterprises\n• Revenue & growth stage\n• Resource availability\n\n**🎯 Service Packages**\n• **Starter** (single service)\n• **Growth** (multiple services)\n• **Enterprise** (full package)\n\n**Book a consultation for a detailed quote!**`,
    category: 'pricing'
  },
  
  // Преимущества
  'different': {
    patterns: ['different', 'unique', 'advantage', 'better', 'stand out'],
    response: `**Why SYNC stands out:**\n\n**🔄 Integrated Approach**\nWe sync brand, strategy, tech, and data into one unified system.\n\n**📊 Data-Driven Decisions**\nEvery strategy is backed by analytics and market insights.\n\n**🎯 Results-Oriented**\nWe focus on measurable outcomes and ROI, not just deliverables.\n\n**⚡ Agile Methodology**\nFlexible processes that adapt to your changing needs.\n\n**🤝 Partnership Mindset**\nWe become an extension of your team, invested in your success.`,
    category: 'advantages'
  }
};

// Default response for unmatched questions
const defaultResponse = "Great question! While I specialize in SYNC Agency's services and processes, I'd recommend booking a consultation for detailed, personalized advice. Would you like me to help you with:\n• Our service offerings\n• Booking process\n• Case studies\n• Anything specific?";

export const ChatAI: React.FC<ChatAIProps> = ({
  className = '',
  initialMessages = [],
  onSendMessage,
  placeholder = 'Ask me anything about SYNC Agency services...',
  title = 'SYNC AI Assistant'
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `👋 **Hello! I'm your SYNC AI Assistant.**\n\nI can help you with:\n• Our services & process\n• Booking consultations\n• Project examples\n• Industry expertise\n\nWhat would you like to know about SYNC Agency?`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'welcome'
    },
    ...initialMessages
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Предложенные вопросы
  const suggestions = [
    'What services do you offer?',
    'How does your process work?',
    'Tell me about your company',
    'How to book a consultation?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Функция поиска ответа в базе знаний
  const findAnswer = (question: string) => {
    const normalizedQuestion = question.toLowerCase().trim();
    
    // Ищем совпадение по паттернам
    for (const [key, data] of Object.entries(knowledgeBase)) {
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
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (onSendMessage) {
        await onSendMessage(inputValue.trim());
      } else {
        // Ищем ответ в локальной базе
        const { response, category } = findAnswer(inputValue.trim());
        
        // Имитируем задержку для реалистичности
        setTimeout(() => {
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            content: response,
            sender: 'ai',
            timestamp: new Date(),
            type: category
          };
          setMessages(prev => [...prev, aiResponse]);
          setIsTyping(false);
        }, 800 + Math.random() * 700); // Random delay between 0.8-1.5s
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // Автоматически отправляем при клике на предложение
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSend();
    }, 100);
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

  // Функция для рендеринга форматированного текста
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Обработка заголовков и выделенного текста
      if (line.startsWith('**') && line.endsWith('**')) {
        return <strong key={index}>{line.slice(2, -2)}</strong>;
      }
      if (line.match(/^\*\*.*\*\*:/)) {
        const parts = line.split('**');
        return (
          <div key={index} style={{ marginBottom: '4px' }}>
            <strong>{parts[1]}</strong>
            {parts[2]}
          </div>
        );
      }
      // Обработка пунктов списка
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <div key={index} className={styles.listItem}>
            <span className={styles.bullet}>•</span>
            <span>{line.substring(2)}</span>
          </div>
        );
      }
      // Обработка нумерованного списка
      if (line.match(/^\d+\.\s/)) {
        return (
          <div key={index} className={styles.listItem}>
            <span className={styles.number}>{line.split('.')[0]}.</span>
            <span>{line.substring(line.indexOf(' ') + 1)}</span>
          </div>
        );
      }
      // Пустые строки для отступов
      if (line.trim() === '') {
        return <div key={index} className={styles.emptyLine}></div>;
      }
      return <div key={index}>{line}</div>;
    });
  };

  return (
    <div className={`${styles.chatContainer} ${className}`}>
      <div className={styles.chatHeader}>
        <h2>
          <span className={styles.aiIcon}>🤖</span>
          {title}
        </h2>
        <div className={styles.subtitle}>
          Ask questions about SYNC Agency services
        </div>
      </div>

      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${styles[message.sender]} ${
              message.type ? styles[`type-${message.type}`] : ''
            }`}
          >
            <div className={styles.messageContent}>
              {renderFormattedText(message.content)}
            </div>
            <div className={styles.messageMeta}>
              <span className={styles.senderName}>
                {message.sender === 'ai' ? 'SYNC AI' : 'You'}
              </span>
              <span className={styles.timestamp}>
                {formatTime(message.timestamp)}
                {message.type && message.type !== 'text' && (
                  <span className={styles.categoryTag}>
                    {message.type}
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className={styles.typingIndicator}>
            <div className={styles.typingAvatar}>
              <div className={styles.typingDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <span>SYNC AI is thinking...</span>
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
            <span className={styles.sendIcon}>↗</span>
            <span className={styles.sendText}>Send</span>
          </button>
        </div>

        <div className={styles.suggestionsSection}>
          <div className={styles.suggestionsLabel}>Quick questions:</div>
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
    </div>
  );
};