// src/shared/ui/chat-ai/components/common/SendIcon.tsx
import React from 'react';

interface SendIconProps {
  className?: string;
}

export const SendIcon: React.FC<SendIconProps> = ({ className = '' }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
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