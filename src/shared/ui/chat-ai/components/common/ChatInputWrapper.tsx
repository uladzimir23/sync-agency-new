// src/shared/ui/chat-ai/components/common/ChatInputWrapper.tsx
import React, { useState } from 'react';
import { SendIcon } from './SendIcon';
import { ChatInputWrapperProps } from '../../types';
import styles from './ChatInputWrapper.module.scss';

export const ChatInputWrapper: React.FC<ChatInputWrapperProps> = ({
  value,
  onChange,
  onSend,
  onKeyDown,
  onQuickQuestionClick,
  onToggleQuickQuestions,
  showQuickQuestions = false,
  suggestions,
  placeholder = 'Спросите о наших услугах...',
  disabled = false,
  isTyping = false,
  isMobile = false,
  onFocus,
  className = '',
}) => {
  const [localShowQuickQuestions, setLocalShowQuickQuestions] = useState(false);

  const handleToggleQuickQuestions = () => {
    if (onToggleQuickQuestions) {
      onToggleQuickQuestions();
    } else {
      setLocalShowQuickQuestions(!localShowQuickQuestions);
    }
  };

  const handleQuickQuestionClick = (suggestion: string) => {
    onQuickQuestionClick(suggestion);
    if (!onToggleQuickQuestions) {
      setLocalShowQuickQuestions(false);
    }
  };

  const handleSendClick = () => {
    if (!disabled && value.trim()) {
      onSend();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
    onKeyDown(e);
  };

  const shouldShowQuickQuestions = onToggleQuickQuestions 
    ? showQuickQuestions 
    : localShowQuickQuestions;

  return (
    
    <div className={`${styles.inputWrapper} ${isMobile ? styles.mobile : ''} ${className}`}>
        <button 
        className={styles.quickQuestionsButton}
        onClick={handleToggleQuickQuestions}
        type="button"
        disabled={disabled}
      >
        Быстрые вопросы
      </button>
      
      <textarea
        className={styles.chatInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        placeholder={placeholder}
        rows={1}
        disabled={disabled || isTyping}
      />
      
      <button
        className={styles.sendButton}
        onClick={handleSendClick}
        disabled={!value.trim() || disabled || isTyping}
        type="button"
      >
        <SendIcon className={styles.sendIcon} />
        <span className={styles.sendText}>Отправить</span>
      </button>

      {shouldShowQuickQuestions && (
        <div className={styles.quickQuestionsDropdown}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className={styles.quickQuestionItem}
              onClick={() => handleQuickQuestionClick(suggestion)}
              type="button"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};