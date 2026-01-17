// src/shared/ui/chat-ai/types.ts
import { MessageCategory } from './data/knowledgeBase';
import { RefObject } from 'react';

export type MessageType = MessageCategory | 'welcome' | 'text';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: MessageType;
}

export interface ChatAIProps {
  className?: string;
  placeholder?: string;
  title?: string;
}

export interface ChatAIComponentsProps extends ChatAIProps {
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSend: () => Promise<void>;
  handleSuggestionClick: (suggestion: string) => void;
  suggestions: string[];
  messagesContainerRef: RefObject<HTMLDivElement>;
}

// Для мобильной версии
export interface MobileChatAIProps extends ChatAIComponentsProps {
  isPopupOpen: boolean;
  onTogglePopup: () => void;
  onOpenPopup: () => void;
  onClosePopup: () => void;
}

// Props для ChatInputWrapper
export interface ChatInputWrapperProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onQuickQuestionClick: (suggestion: string) => void;
  onToggleQuickQuestions?: () => void;
  showQuickQuestions?: boolean;
  suggestions: string[];
  placeholder?: string;
  disabled?: boolean;
  isTyping?: boolean;
  isMobile?: boolean;
  onFocus?: () => void;
  className?: string;
}

// Props для MessageItem
export interface MessageItemProps {
  message: Message;
  index: number;
}