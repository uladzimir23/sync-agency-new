// src/shared/ui/chat-ai/ChatAI.tsx
import React, { useState } from 'react';
import { useDeviceType } from '@/shared/hooks/useDeviceType';
import { useChatAI } from './hooks/useChatAI';
import ChatAIDesktop from './components/desktop/ChatAIDesktop';
import ChatAITablet from './components/tablet/ChatAITablet';
import ChatAIMobile from './components/mobile/ChatAIMobile';
import { ChatAIProps } from './types';
import styles from './chat-ai.module.scss';

export const ChatAI: React.FC<ChatAIProps> = (props) => {
  const deviceType = useDeviceType();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(false);

  const chatAI = useChatAI();

  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleToggleQuickQuestions = () => {
    setShowQuickQuestions(!showQuickQuestions);
  };

  // Подготовка общих пропсов для всех версий
  const commonProps = {
    ...chatAI,
    ...props,
  };

  // Дополнительные пропсы для мобильной версии
  const mobileProps = {
    ...commonProps,
    isPopupOpen,
    onTogglePopup: handleTogglePopup,
    onOpenPopup: handleOpenPopup,
    onClosePopup: handleClosePopup,
    showQuickQuestions,
    onToggleQuickQuestions: handleToggleQuickQuestions,
  };

  if (deviceType === 'mobile') {
    return (
      <div className={styles.chatContaineWrapper}>
        <ChatAIMobile {...mobileProps} />
      </div>
    );
  }

  if (deviceType === 'tablet') {
    return (
      <div className={styles.chatContaineWrapper}>
        <ChatAITablet {...commonProps} />
      </div>
    );
  }

  return (
    <div className={styles.chatContaineWrapper}>
      <ChatAIDesktop {...commonProps} />
    </div>
  );
};