import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Phone, MessageSquare, Globe } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();

  const handleBookClick = () => {
    const el = document.getElementById('book-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappMsg =
    language === 'ml'
      ? 'നമസ്കാരം ഡോക്ടർ, മാടപ്പള്ളിൽ ഹോമിയോ ഡിസ്പെൻസറിയിലെ കൺസൾട്ടേഷനെക്കുറിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Hello Doctor, I would like to enquire about a consultation at Madappallil Homoeo Dispensary.';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-3 py-2">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        
        {/* Quick Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="flex flex-col items-center justify-center p-1 rounded-xl text-slate-600 hover:text-emerald-800 active:scale-95 transition-all shrink-0"
          title="Switch Language"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold">
            <Globe className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-700 mt-0.5">
            {language === 'en' ? 'മലയാളം' : 'English'}
          </span>
        </button>

        {/* Call Doctor */}
        <a
          href="tel:+919544548826"
          className="flex flex-col items-center justify-center p-1 rounded-xl text-slate-600 hover:text-emerald-800 active:scale-95 transition-all shrink-0"
          title="Call Doctor"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
            <Phone className="w-4 h-4 text-emerald-800" />
          </div>
          <span className="text-[10px] font-bold text-slate-700 mt-0.5">
            {language === 'ml' ? 'വിളിക്കുക' : 'Call'}
          </span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href={`https://wa.me/919544548826?text=${encodeURIComponent(whatsappMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1 rounded-xl text-slate-600 hover:text-emerald-700 active:scale-95 transition-all shrink-0"
          title="WhatsApp"
        >
          <div className="w-8 h-8 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
            <MessageSquare className="w-4 h-4 text-[#20ba59]" />
          </div>
          <span className="text-[10px] font-bold text-slate-700 mt-0.5">WhatsApp</span>
        </a>

        {/* Primary CTA: Book Consultation */}
        <button
          onClick={handleBookClick}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-800 text-white font-bold text-xs shadow-md active:scale-95 transition-all ml-1"
        >
          <Calendar className="w-4 h-4 shrink-0 text-amber-300" />
          <span className="truncate">{t.hero.ctaBook}</span>
        </button>

      </div>
    </div>
  );
};
