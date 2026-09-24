import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Clock, Phone, MessageSquare, Navigation, Mail, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, t } = useLanguage();

  const CLINIC_PHONE = '+91 95445 48826';
  const CLINIC_PHONE_CLEAN = '919544548826';
  const CLINIC_EMAIL = 'geomadappallil@gmail.com';
  const GOOGLE_MAPS_SEARCH_URL =
    'https://www.google.com/search?sca_esv=cc12825c4d4cb41c&sxsrf=APpeQnu39DMX5LjPqOocSri93s7Xy7tnLA:1790221283447&q=madappallil+homeo+dispensary+kattappana+address&ludocid=9708509916661251908&sa=X&ved=2ahUKEwj42Kz9pYaXAxXBRmcHHelqK8oQ6BN6BAg0EAI';

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

        {/* 4 Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* 1. Address & Google Maps */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                {t.contact.addressLabel}
              </h3>
              <p className="text-slate-700 font-semibold text-xs leading-relaxed mb-1">
                {t.contact.addressValue}
              </p>
              <p className="text-slate-500 text-[11px] mb-3">
                Kattappana, Idukki District, Kerala
              </p>
            </div>
            <a
              href={GOOGLE_MAPS_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all border border-emerald-200"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'ml' ? 'ഗൂഗിൾ മാപ്പ് കാണുക' : 'Open in Google Maps'}</span>
              <ExternalLink className="w-3 h-3 text-emerald-600" />
            </a>
          </div>

          {/* 2. Direct Phone & WhatsApp */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                {t.contact.phoneLabel}
              </h3>
              <p className="text-slate-900 font-black text-base mb-1 tracking-wide">
                {CLINIC_PHONE}
              </p>
              <p className="text-slate-500 text-[11px] mb-3">
                {language === 'ml' ? 'നേരിട്ട് വിളിക്കാനും WhatsApp ചെയ്യാനും' : 'Direct Call & WhatsApp Consultation'}
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={`tel:${CLINIC_PHONE.replace(/\s+/g, '')}`}
                className="flex-1 text-center py-2 px-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold active:scale-95 transition-all shadow-2xs"
              >
                {language === 'ml' ? 'വിളിക്കുക' : 'Call'}
              </a>
              <a
                href={`https://wa.me/${CLINIC_PHONE_CLEAN}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold active:scale-95 transition-all shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* 3. Direct Clinic Email */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-3">
                <Mail className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                {t.contact.emailLabel}
              </h3>
              <p className="text-slate-900 font-semibold text-xs mb-1 truncate" title={CLINIC_EMAIL}>
                {CLINIC_EMAIL}
              </p>
              <p className="text-slate-500 text-[11px] mb-3">
                {language === 'ml' ? 'ഡോക്ടറുടെ ഔദ്യോഗിക ഇമെയിൽ വിലാസം' : 'Official Clinic Doctor Email'}
              </p>
            </div>
            <a
              href={`mailto:${CLINIC_EMAIL}?subject=${encodeURIComponent(
                language === 'ml'
                  ? 'മാടപ്പള്ളിൽ ഹോമിയോ ക്ലിനിക്ക് കൺസൾട്ടേഷൻ അന്വേഷണം'
                  : 'Madappallil Homoeo Clinic Consultation Enquiry'
              )}`}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold transition-all border border-blue-200"
            >
              <Mail className="w-3.5 h-3.5 text-blue-700" />
              <span>{language === 'ml' ? 'ഇമെയിൽ അയക്കുക' : 'Send Email'}</span>
            </a>
          </div>

          {/* 4. Consultation Timings */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div>
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
            <span className="inline-block text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 text-center mt-2">
              {language === 'ml' ? '1992 മുതൽ സേവനരംഗത്ത്' : 'Serving Since 1992'}
            </span>
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
