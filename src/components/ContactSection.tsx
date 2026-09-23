import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Clock, Phone, MessageSquare, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, t } = useLanguage();

  const whatsappMsg =
    language === 'ml'
      ? 'നമസ്കാരം ഡോക്ടർ, മാടപ്പള്ളിൽ ഹോമിയോ ഡിസ്പെൻസറിയിലെ കൺസൾട്ടേഷനെക്കുറിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Hello Doctor, I would like to enquire about a consultation at Madappallil Homoeo Dispensary.';

  return (
    <section id="contact" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.contact.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif mb-1.5">
            {t.contact.title}
          </h2>

          <p className="text-emerald-800 font-semibold text-xs sm:text-sm">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          {/* Address */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                {t.contact.addressLabel}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-3">
                {t.contact.addressValue}
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Timings */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              {t.contact.timingsLabel}
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-line">
              {t.contact.timingsValue}
            </p>
          </div>

          {/* Phone & Direct Actions */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                {t.contact.phoneLabel}
              </h3>
              <p className="text-slate-800 font-semibold text-sm mb-3">
                {t.contact.phoneValue}
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href="tel:+919847000000"
                className="flex-1 text-center py-2 px-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold active:scale-95 transition-all"
              >
                {language === 'ml' ? 'വിളിക്കുക' : 'Call'}
              </a>
              <a
                href={`https://wa.me/919847000000?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold active:scale-95 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-500 text-center max-w-2xl mx-auto">
          {t.contact.disclaimer}
        </div>

      </div>
    </section>
  );
};
