import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Calendar, Phone, MessageSquare, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();

  const whatsappMsg =
    language === 'ml'
      ? 'നമസ്കാരം ഡോക്ടർ, മാടപ്പള്ളിൽ ഹോമിയോ ഡിസ്പെൻസറിയിലെ കൺസൾട്ടേഷനെക്കുറിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.'
      : 'Hello Doctor, I would like to enquire about a consultation at Madappallil Homoeo Dispensary.';

  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white overflow-hidden">
      
      {/* Subtle modern mesh gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[700px] h-[300px] bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Heritage Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-emerald-200 text-emerald-900 text-xs font-bold mb-3 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight mb-3 font-serif">
              {t.hero.titleStart}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Short Bio */}
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed mb-5 max-w-xl">
              {t.hero.description}
            </p>

            {/* 1-Tap Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full sm:w-auto mb-5">
              <a
                href="#book-form"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all text-center"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>{t.hero.ctaBook}</span>
              </a>

              <a
                href={`https://wa.me/919847000000?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-xs active:scale-95 transition-all text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+919847000000"
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-2xs active:scale-95 transition-all text-center"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>{t.hero.ctaCall}</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Side Effects</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>35+ Years Wisdom</span>
              </div>
              <div className="flex items-center gap-1">
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                <span>Non-Invasive Care</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual */}
          <div className="lg:col-span-5 relative mt-3 lg:mt-0">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white">
                <img
                  src="/images/hero_clinic.jpg"
                  alt="Madappallil Homoeo Dispensary Consultation"
                  className="w-full h-[240px] sm:h-[340px] object-cover object-center"
                />

                {/* Bottom Overlay Pill */}
                <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 font-bold text-xs">
                      MHD
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">
                        {t.clinicName}
                      </p>
                      <p className="text-[10px] text-emerald-700 font-medium">
                        Chief Homoeopathic Physician • 35+ Yrs
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-900 text-[10px] font-extrabold rounded-md border border-amber-200">
                    Trusted
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Stat Strip */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 text-center shadow-2xs">
            <div className="text-lg sm:text-2xl font-black text-emerald-900 font-serif">
              {t.hero.stat1Number}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-500 font-medium">
              {t.hero.stat1Label}
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 text-center shadow-2xs">
            <div className="text-lg sm:text-2xl font-black text-emerald-900 font-serif">
              {t.hero.stat2Number}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-500 font-medium">
              {t.hero.stat2Label}
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 text-center shadow-2xs">
            <div className="text-lg sm:text-2xl font-black text-emerald-700 font-serif">
              {t.hero.stat3Number}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-500 font-medium">
              {t.hero.stat3Label}
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 text-center shadow-2xs">
            <div className="text-lg sm:text-2xl font-black text-amber-700 font-serif">
              {t.hero.stat4Number}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-500 font-medium">
              {t.hero.stat4Label}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
