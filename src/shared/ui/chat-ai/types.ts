// types.ts
export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    type?: 'text' | 'welcome' | 'company' | 'services' | 'process' | 'clients' | 'booking' | 'pricing' | 'advantages' | 'default';
  }
  
  export interface ChatAIProps {
    className?: string;
    initialMessages?: Message[];
    onSendMessage?: (message: string) => Promise<void>;
    placeholder?: string;
    title?: string;
  }