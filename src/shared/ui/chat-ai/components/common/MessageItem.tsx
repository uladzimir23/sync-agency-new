// src/shared/ui/chat-ai/components/common/MessageItem.tsx
import React from 'react';
import { MessageItemProps } from '../../types';
import styles from './MessageItem.module.scss';

export const MessageItem: React.FC<MessageItemProps> = ({ message, index }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      if (line.trim() === '') {
        return <div key={lineIndex} className={styles.emptyLine}></div>;
      }

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

      const emojiMatch = line.match(/^([🎨📈💻📊⚡✨👋]+)\s+(.+)/);
      if (emojiMatch) {
        return (
          <div key={lineIndex} className={styles.textLine}>
            <span>{emojiMatch[1]} </span>
            <strong style={{ color: 'var(--primary-color)' }}>{emojiMatch[2]}</strong>
          </div>
        );
      }

      if (line.trim().startsWith('•')) {
        return (
          <div key={lineIndex} className={styles.listItem}>
            <span className={styles.bullet}>•</span>
            <span>{line.substring(1).trim()}</span>
          </div>
        );
      }

      const numberedMatch = line.match(/^(\d+\.)\s+(.+)/);
      if (numberedMatch) {
        return (
          <div key={lineIndex} className={styles.listItem}>
            <span className={styles.number}>{numberedMatch[1]}</span>
            <span>{numberedMatch[2]}</span>
          </div>
        );
      }

      return <div key={lineIndex} className={styles.textLine}>{line}</div>;
    });
  };

  return (
    <div
      className={`${styles.message} ${styles[message.sender]}`}
      style={{ animationDelay: `${index * 100}ms` }}
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
  );
};