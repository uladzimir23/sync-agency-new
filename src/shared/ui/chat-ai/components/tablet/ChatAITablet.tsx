// src/shared/ui/chat-ai/components/tablet/ChatAITablet.tsx
import React from 'react';
import { ChatAIComponentsProps } from '../../types';
import { ChatInputWrapper } from '../common/ChatInputWrapper';
import { MessageItem } from '../common/MessageItem';
import styles from './chat-ai-tablet.module.scss';

const ChatAITablet: React.FC<ChatAIComponentsProps> = ({
  messages,
  isTyping,
  inputValue,
  setInputValue,
  handleSend,
  handleSuggestionClick,
  suggestions,
  messagesContainerRef,
  placeholder = 'Спросите о наших услугах...',
}) => {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer} ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <MessageItem key={message.id} message={message} index={index} />
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
          <ChatInputWrapper
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            onKeyDown={() => {}}
            onQuickQuestionClick={handleSuggestionClick}
            suggestions={suggestions}
            placeholder={placeholder}
            disabled={isTyping}
            isTyping={isTyping}
            isMobile={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatAITablet;