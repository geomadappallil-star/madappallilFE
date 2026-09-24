import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, CheckCircle2, Phone, MessageSquare } from 'lucide-react';

export const DoctorHeritage: React.FC = () => {
  const { language, t } = useLanguage();

  const whatsappMsg =
    language === 'ml'
      ? 'നമസ്കാരം ഡോക്ടർ, മാടപ്പള്ളിൽ ഹോമിയോ ഡിസ്പെൻസറിയിലെ കൺസൾട്ടേഷനെക്കുറിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Hello Doctor, I would like to enquire about a consultation at Madappallil Homoeo Dispensary.';

  return (
    <section id="heritage" className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Doctor Photo */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white bg-white">
                <img
                  src="/images/hero_clinic.jpg"
                  alt="Chief Homoeopathic Physician"
                  className="w-full h-[280px] sm:h-[360px] object-cover object-center"
                />
                <div className="p-3.5 bg-emerald-950 text-white flex items-center justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold font-serif leading-tight">
                      {t.heritage.doctorTitle}
                    </h3>
                    <p className="text-[11px] text-emerald-200">
                      {t.clinicName}
                    </p>
                  </div>
                  <span className="bg-amber-500 text-white font-black text-xs px-2 py-1 rounded-md">
                    35+ Yrs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Details */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{t.heritage.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif mb-2">
              {t.heritage.title}
            </h2>

            <p className="text-xs sm:text-sm font-semibold text-emerald-800 mb-3">
              {t.heritage.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {t.heritage.p1} {t.heritage.p2}
            </p>

            {/* Quote Pill */}
            <div className="w-full p-3.5 rounded-xl bg-white border border-amber-200 shadow-2xs mb-4">
              <p className="text-xs italic text-slate-700 font-serif leading-relaxed">
                "{t.heritage.quote}"
              </p>
            </div>

            {/* Checklist */}
            <div className="w-full space-y-1.5 mb-5">
              {t.heritage.creds.map((cred, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{cred}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <a
                href="#book-form"
                className="flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs"
              >
                {t.nav.bookConsultation}
              </a>

              <a
                href={`https://wa.me/919544548826?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+919544548826"
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-slate-800 border border-slate-200 font-semibold text-xs shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>Call Clinic</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
