import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ClipboardList, Stethoscope, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';

export const HealingJourney: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { number: '01', icon: ClipboardList, title: t.journey.step1Title, desc: t.journey.step1Desc },
    { number: '02', icon: Stethoscope, title: t.journey.step2Title, desc: t.journey.step2Desc },
    { number: '03', icon: Sparkles, title: t.journey.step3Title, desc: t.journey.step3Desc },
    { number: '04', icon: UserCheck, title: t.journey.step4Title, desc: t.journey.step4Desc },
  ];

  return (
    <section id="journey" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.journey.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif mb-2">
            {t.journey.title}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm">
            {t.journey.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-black font-serif text-emerald-900/20">
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
