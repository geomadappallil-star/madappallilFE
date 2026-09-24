import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Baby, Brain, Wind, Dna, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { clinicImages } from '../assets/images';

export type SpecialtyKey = 'infertility' | 'mental_health' | 'allergy' | 'hereditary';

interface SpecializationsProps {
  onSelectCondition: (condition: SpecialtyKey | 'general') => void;
}

export const Specializations: React.FC<SpecializationsProps> = ({ onSelectCondition }) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<SpecialtyKey>('infertility');
  const [selectedSymptomIdx, setSelectedSymptomIdx] = useState<number>(0);

  const handleBooking = (condition: SpecialtyKey) => {
    onSelectCondition(condition);
    const el = document.getElementById('book-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getSpecialtyData = () => {
    switch (activeTab) {
      case 'infertility':
        return {
          data: t.specialties.infertility,
          image: clinicImages.infertility,
          tagline: language === 'ml' ? 'സ്വാഭാവിക ഗർഭധാരണം • 1992 മുതൽ' : 'Natural Conception • Since 1992',
          imageCaption: language === 'ml'
            ? 'ആയിരക്കണക്കിന് ദമ്പതികൾക്ക് മാതൃത്വ-പിതൃത്വ ഭാഗ്യം സമ്മാനിച്ച ചികിത്സ.'
            : 'Thousands of couples blessed with natural, healthy parenthood.',
        };
      case 'mental_health':
        return {
          data: t.specialties.mentalHealth,
          image: clinicImages.mentalHealth,
          tagline: language === 'ml' ? 'ശാന്തമായ മനസ്സ് • മയക്കമില്ലാത്ത ചികിത്സ' : 'Peaceful Mind • Non-Habit Forming',
          imageCaption: language === 'ml'
            ? 'മയക്കമരുന്നുകളോ അടിമപ്പെടലോ ഇല്ലാതെ ഉത്കണ്ഠയ്ക്കും ഉറക്കക്കുറവിനും ആശ്വാസം.'
            : 'Safe natural recovery for nervous system, peaceful sleep, and chronic stress.',
        };
      case 'allergy':
        return {
          data: t.specialties.allergy,
          image: clinicImages.remedies,
          tagline: language === 'ml' ? 'പ്രതിരോധശേഷി വർദ്ധിപ്പിക്കൽ • സ്റ്റിറോയിഡ് രഹിതം' : 'Immune Balance • Steroid-Free',
          imageCaption: language === 'ml'
            ? 'തുമ്മൽ, ആസ്ത്മ, ത്വക്ക് അലർജികൾ എന്നിവയ്ക്ക് ശാശ്വത പരിഹാരം.'
            : 'Permanent immune desensitization for respiratory and chronic skin allergies.',
        };
      case 'hereditary':
        return {
          data: t.specialties.hereditary,
          image: clinicImages.heroClinic,
          tagline: language === 'ml' ? 'കോൺസ്റ്റിറ്റ്യൂഷണൽ കെയർ • തലമുറകളുടെ ആരോഗ്യം' : 'Constitutional Care • Deep Healing',
          imageCaption: language === 'ml'
            ? 'പാരമ്പര്യമായി വരുന്ന മൈഗ്രേൻ, സോറിയാസിസ്, സന്ധി വേദനകൾക്ക് ആശ്വാസം.'
            : 'Targets genetic predispositions, chronic migraines, and autoimmune tendencies.',
        };
    }
  };

  const current = getSpecialtyData();

  const tabs: { key: SpecialtyKey; label: string; icon: React.ReactNode }[] = [
    { key: 'infertility', label: t.specialties.infertilityTab, icon: <Baby className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { key: 'mental_health', label: t.specialties.mentalHealthTab, icon: <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { key: 'allergy', label: t.specialties.allergyTab, icon: <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { key: 'hereditary', label: t.specialties.hereditaryTab, icon: <Dna className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
  ];

  return (
    <section id="specialties" className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-100">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.specialties.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif mb-2">
            {t.specialties.title}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm">
            {t.specialties.subtitle}
          </p>

          {/* Interactive 4-Department Tab Bar */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setActiveTab(tab.key);
                  setSelectedSymptomIdx(0);
                }}
                className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all text-center ${
                  activeTab === tab.key
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.icon}
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Main Department Card */}
        <div className="bg-slate-50 rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left: Interactive Condition Chip Selector */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-md border border-amber-300 mb-1.5">
                  {language === 'ml' ? '1992 മുതൽ സ്പെഷ്യലൈസ്ഡ് പരിചരണം' : 'Specialized Care Since 1992'}
                </div>
                <h3 className="text-lg sm:text-2xl font-bold font-serif text-slate-900 mb-1">
                  {current.data.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-emerald-800">
                  {current.data.subtitle}
                </p>
              </div>

              {/* Interactive Condition Chips */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {language === 'ml' ? 'പരിഹാരം കാണുന്ന പ്രധാന ബുദ്ധിമുട്ടുകൾ:' : 'Key Conditions Treated:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.data.keyPoints.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSymptomIdx(idx)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        selectedSymptomIdx === idx
                          ? 'bg-white border-emerald-600 text-emerald-950 ring-2 ring-emerald-600 shadow-xs'
                          : 'bg-white/70 border-slate-200 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          selectedSymptomIdx === idx ? 'text-emerald-600' : 'text-slate-400'
                        }`}
                      />
                      <span className="leading-snug">{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Advantage Pill */}
              <div className="p-3.5 rounded-xl bg-emerald-100/70 border border-emerald-200/80 flex items-start gap-2.5 text-xs text-emerald-950 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{current.data.advantage}</span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleBooking(activeTab)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-xs active:scale-95 transition-all"
              >
                <span>{current.data.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-white aspect-[4/3] bg-white">
                <img
                  src={current.image}
                  alt={current.data.title}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                      {current.tagline}
                    </span>
                    <p className="text-xs text-slate-200 mt-1 font-medium leading-relaxed">
                      {current.imageCaption}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
