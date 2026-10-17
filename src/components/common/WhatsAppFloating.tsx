import React from 'react';
import { getWhatsAppLink } from '../../services/whatsapp';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  return (
    <aside aria-label="WhatsApp quick contact" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={getWhatsAppLink('Hi HelpHive, I would like to quickly book an assistant.')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
        title="Chat with HelpHive on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
        <span className="text-xs sm:text-sm hidden sm:inline">Book on WhatsApp</span>
      </a>
    </aside>
  );
};
