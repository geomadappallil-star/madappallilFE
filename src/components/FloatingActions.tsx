import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, MessageSquare, ArrowUp } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { language } = useLanguage();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMsg =
    language === 'ml'
      ? 'നമസ്കാരം ഡോക്ടർ, മാടപ്പള്ളിൽ ഹോമിയോ ഡിസ്പെൻസറിയിലെ കൺസൾട്ടേഷനെക്കുറിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Hello Doctor, I would like to enquire about a consultation at Madappallil Homoeo Dispensary.';

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Scroll to Top */}
      <button
        onClick={handleScrollToTop}
        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:shadow-lg border border-slate-200 text-slate-700 flex items-center justify-center transition-all hover:-translate-y-0.5"
        title="Scroll to Top"
        aria-label="Scroll to Top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Direct Phone Dial */}
      <a
        href="tel:+919847000000"
        className="w-12 h-12 rounded-full bg-healing-700 hover:bg-healing-800 text-white shadow-lg flex items-center justify-center transition-all hover:scale-105"
        title="Call Clinic / ക്ലിനിക്കിലേക്ക് വിളിക്കുക"
        aria-label="Call Clinic"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp Quick Chat */}
      <a
        href={`https://wa.me/919847000000?text=${encodeURIComponent(whatsappMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline">
          {language === 'ml' ? 'WhatsApp ചാറ്റ്' : 'WhatsApp Us'}
        </span>
      </a>
    </div>
  );
};
