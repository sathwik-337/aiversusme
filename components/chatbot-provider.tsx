'use client';

import dynamic from 'next/dynamic';

const DynamicChatbot = dynamic(() => import('./chatbot'), { ssr: false });

export default function ChatbotProvider() {
  return <DynamicChatbot />;
}
