// ChatAI.tsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatAI.module.scss';
import { ChatAIProps, Message } from './types';

// SVG иконка для кнопки отправки
const SendIcon = () => (
  <svg 
    className={styles.sendIcon} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Локальная база знаний с подготовленными ответами
const knowledgeBase = {
  'services': {
    patterns: ['services', 'offerings', 'what you offer', 'what do you do', 'услуги', 'предлагаете'],
    response: `**Мы предлагаем 5 основных услуг:**\n\n🎨 **Branding & Identity**\nПолная стратегия бренда, визуальная идентичность и бренд-гайдлайны.\n\n📈 **Marketing Strategy**\nКампании на основе данных, таргетирование аудитории, оптимизация конверсии.\n\n💻 **Product Development**\nПолный цикл дизайна, разработки и запуска продукта.\n\n📊 **Analytics & Optimization**\nОтслеживание производительности, A/B тестирование и принятие решений на основе данных.\n\n⚡ **Automation & Infrastructure**\nАвтоматизация рабочих процессов и масштабируемая технологическая инфраструктура.`,
    category: 'services'
  },
  
  'process': {
    patterns: ['process', 'how you work', 'methodology', 'approach', 'steps', 'процесс', 'работаете'],
    response: `**Наш 4-этапный процесс:**\n\n**1. Discovery** (1-2 недели)\n• Глубокое погружение в ваш бизнес\n• Анализ рынка и конкурентов\n• Постановка целей и KPI\n\n**2. Strategy** (2-3 недели)\n• Разработка индивидуальной стратегии\n• Создание дорожной карты\n• Планирование ресурсов\n\n**3. Execution** (4-12 недель)\n• Гибкие циклы разработки\n• Регулярные отчеты о прогрессе\n• Контроль качества\n\n**4. Optimization** (постоянно)\n• Мониторинг производительности\n• Непрерывное улучшение\n• Масштабирование успешных инициатив`,
    category: 'process'
  },
  
  'company': {
    patterns: ['company', 'about', 'sync agency', 'who are you', 'tell me about', 'компания', 'о компании'],
    response: `**SYNC Agency** — это агентство полного цикла в digital-маркетинге, брендинге и росте продуктов.\n\nМы создаем результаты через:\n• **Рекламу** — эффективные кампании\n• **Аналитику** — данные для принятия решений\n• **Дизайн** — визуальные решения\n• **Автоматизацию** — оптимизация процессов\n\nНаш интегрированный подход синхронизирует бренд, стратегию, технологии и данные в единую систему.`,
    category: 'company'
  },
  
  'consultation': {
    patterns: ['consultation', 'book', 'meeting', 'schedule', 'call', 'how to book', 'консультация', 'забронировать'],
    response: `**Забронируйте консультацию в 3 простых шага:**\n\n1. **Выберите время** — выберите из доступных слотов\n2. **Поделитесь деталями** — расскажите о своем проекте\n3. **Получите стратегию** — получите персонализированные рекомендации\n\n**Что вас ждет:**\n• 30-45 минутная беседа с экспертами\n• Анализ ваших потребностей\n• Практические рекомендации\n• Без обязательств к дальнейшему сотрудничеству\n\n**Используйте секцию бронирования ниже!**`,
    category: 'booking'
  }
};

// Стандартный ответ для неизвестных вопросов
const defaultResponse = `Отличный вопрос! Я специализируюсь на услугах SYNC Agency. Могу помочь вам с:\n• Нашими услугами\n• Процессом работы\n• Бронированием консультаций\n• Конкретными вопросами\n\nЧто вас интересует больше всего?`;

export const ChatAI: React.FC<ChatAIProps> = ({
  className = '',
  placeholder = 'Спросите о наших услугах, процессе или бронировании...',
  title = 'SYNC AI Assistant'
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: `👋 **Привет! Я ваш SYNC AI Assistant.**\n\nЯ могу помочь вам узнать о наших услугах, процессе работы и забронировать консультацию.\n\nПопробуйте спросить о наших услугах или процессе работы!`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'welcome'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Предложенные вопросы
  const suggestions = [
    'Какие услуги вы предлагаете?',
    'Как проходит процесс работы?',
    'Расскажите о SYNC Agency',
    'Как забронировать консультацию?'
  ];

  // Функция для скролла вниз
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Поиск ответа в базе знаний
  const findAnswer = (question: string): { response: string; category: string } => {
    const normalizedQuestion = question.toLowerCase().trim();
    
    // Ищем совпадение по паттернам
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
  };

  // Отправка сообщения
  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    // Сообщение пользователя
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    // Добавляем сообщение пользователя
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Имитируем задержку для AI
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
  };

  // Обработка предложенного вопроса
  const handleSuggestionClick = (suggestion: string) => {
    // Сразу добавляем вопрос пользователя
    const userMessage: Message = {
      id: `suggestion_${Date.now()}`,
      content: suggestion,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Ищем ответ и добавляем с задержкой
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
  };

  // Обработка нажатия Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Форматирование времени
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Рендеринг форматированного текста
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      if (line.trim() === '') {
        return <div key={lineIndex} className={styles.emptyLine}></div>;
      }

      // Обработка жирного текста
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <div key={lineIndex} className={styles.textLine}>
            {parts.map((part, partIndex) => 
              partIndex % 2 === 0 ? (
                part
              ) : (
                <strong key={partIndex} style={{ color: 'var(--primary-color)' }}>
                  {part}
                </strong>
              )
            )}
          </div>
        );
      }

      // Обработка эмодзи и жирного текста
      const emojiMatch = line.match(/^([🎨📈💻📊⚡✨👋]+)\s+(.+)/);
      if (emojiMatch) {
        return (
          <div key={lineIndex} className={styles.textLine}>
            <span>{emojiMatch[1]} </span>
            <strong style={{ color: 'var(--primary-color)' }}>{emojiMatch[2]}</strong>
          </div>
        );
      }

      // Обработка маркированного списка
      if (line.trim().startsWith('•')) {
        return (
          <div key={lineIndex} className={styles.listItem}>
            <span className={styles.bullet}>•</span>
            <span>{line.substring(1).trim()}</span>
          </div>
        );
      }

      // Обработка нумерованного списка
      const numberedMatch = line.match(/^(\d+\.)\s+(.+)/);
      if (numberedMatch) {
        return (
          <div key={lineIndex} className={styles.listItem}>
            <span className={styles.number}>{numberedMatch[1]}</span>
            <span>{numberedMatch[2]}</span>
          </div>
        );
      }

      // Обычный текст
      return <div key={lineIndex} className={styles.textLine}>{line}</div>;
    });
  };

  return (
    <div className={`${styles.chatContaineWrapper} ${className}`}>
    <div className={`${styles.chatContainer} ${className}`}>
      <div className={styles.messagesContainer} ref={messagesContainerRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${styles[message.sender]} ${
              message.type && message.type !== 'text' ? styles[`type-${message.type}`] : ''
            }`}
            style={{ animationDelay: `${messages.indexOf(message) * 100}ms` }}
          >
            <div className={styles.messageContent}>
              {renderFormattedText(message.content)}
            </div>
            <div className={styles.messageMeta}>
              <span className={styles.senderName}>
                {message.sender === 'ai' ? 'SYNC AI' : 'Вы'}
              </span>
              <span className={styles.timestamp}>
                {formatTime(message.timestamp)}
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
            <span>SYNC AI печатает...</span>
          </div>
        )}
      </div>

      <div className={styles.chatFooter}>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <textarea
              className={styles.chatInput}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              rows={1}
              disabled={isTyping}
            />
            <button
              className={styles.sendButton}
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
            >
              <SendIcon />
              <span className={styles.sendText}>Отправить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.suggestionsSection}>
          <div className={styles.suggestionsLabel}>Быстрые вопросы:</div>
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