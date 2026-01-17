// src/shared/ui/chat-ai/components/mobile/ChatAIMobile.tsx
import React, { useState } from 'react';
import { MobileChatAIProps } from '../../types';
import { ChatInputWrapper } from '../common/ChatInputWrapper';
import { MessageItem } from '../common/MessageItem';
import styles from './chat-ai-mobile.module.scss';

const ChatAIMobile: React.FC<MobileChatAIProps> = ({
  messages,
  isTyping,
  inputValue,
  setInputValue,
  handleSend,
  handleSuggestionClick,
  suggestions,
  messagesContainerRef,
  isPopupOpen,
  onOpenPopup,
  onClosePopup,
  showQuickQuestions,
  onToggleQuickQuestions,
  placeholder = 'Спросите о наших услугах...',
}) => {
  const [localShowQuickQuestions, setLocalShowQuickQuestions] = useState(false);

  const handleQuickQuestionClick = (suggestion: string) => {
    handleSuggestionClick(suggestion);
    if (onToggleQuickQuestions) {
      onToggleQuickQuestions();
    } else {
      setLocalShowQuickQuestions(false);
    }
    onOpenPopup();
  };

  const handleToggleQuickQuestions = () => {
    if (onToggleQuickQuestions) {
      onToggleQuickQuestions();
    } else {
      setLocalShowQuickQuestions(!localShowQuickQuestions);
    }
  };

  const handleOpenPopupWithInputFocus = () => {
    onOpenPopup();
  };

  return (
    <>
      {/* Основной input контейнер - виден всегда */}
      <div className={styles.mobileInputContainer}>
        <ChatInputWrapper
          value={inputValue}
          onChange={setInputValue}
          onSend={handleOpenPopupWithInputFocus}
          onKeyDown={() => {}}
          onQuickQuestionClick={handleQuickQuestionClick}
          onToggleQuickQuestions={handleToggleQuickQuestions}
          showQuickQuestions={showQuickQuestions || localShowQuickQuestions}
          suggestions={suggestions}
          placeholder={placeholder}
          disabled={isTyping}
          isTyping={isTyping}
          isMobile={true}
          onFocus={onOpenPopup}
          className={styles.mobileInputWrapper}
        />
      </div>

      {/* Попап с полным чатом */}
      {isPopupOpen && (
        <div className={styles.chatPopup}>
          <div className={styles.popupOverlay} onClick={onClosePopup} />
          
          <div className={styles.popupContent}>
            <div className={styles.popupHeader}>
              <button className={styles.closeButton} onClick={onClosePopup}>
                ×
              </button>
              <h3>SYNC AI Assistant</h3>
            </div>
            
            <div className={styles.popupMessagesContainer} ref={messagesContainerRef}>
              {messages.map((message, index) => (
                <MessageItem key={message.id} message={message} index={index} />
              ))}
              
              {isTyping && (
                <div className={styles.typingIndicator}>
                  <div className={styles.typingDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span>SYNC AI печатает...</span>
                </div>
              )}
            </div>
            
            <div className={styles.popupInputContainer}>
              <ChatInputWrapper
                value={inputValue}
                onChange={setInputValue}
                onSend={handleSend}
                onKeyDown={() => {}}
                onQuickQuestionClick={handleSuggestionClick}
                onToggleQuickQuestions={handleToggleQuickQuestions}
                showQuickQuestions={showQuickQuestions || localShowQuickQuestions}
                suggestions={suggestions}
                placeholder={placeholder}
                disabled={isTyping}
                isTyping={isTyping}
                isMobile={true}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAIMobile;