import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Baby, Brain, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface SpecializationsProps {
  onSelectCondition: (condition: 'infertility' | 'mental_health' | 'general') => void;
}

export const Specializations: React.FC<SpecializationsProps> = ({ onSelectCondition }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'infertility' | 'mental_health'>('infertility');
  const [selectedSymptomIdx, setSelectedSymptomIdx] = useState<number>(0);

  const handleBooking = (condition: 'infertility' | 'mental_health') => {
    onSelectCondition(condition);
    const el = document.getElementById('book-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentSpecialty = activeTab === 'infertility' ? t.specialties.infertility : t.specialties.mentalHealth;

  return (
    <section id="specialties" className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
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

          {/* Interactive Dual Department Tabs */}
          <div className="mt-6 inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => {
                setActiveTab('infertility');
                setSelectedSymptomIdx(0);
              }}
              className={`flex items-center gap-2 px-5 sm:px-8 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'infertility'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Baby className="w-4 h-4" />
              <span>{t.specialties.infertilityTab}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('mental_health');
                setSelectedSymptomIdx(0);
              }}
              className={`flex items-center gap-2 px-5 sm:px-8 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'mental_health'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>{t.specialties.mentalHealthTab}</span>
            </button>
          </div>
        </div>

        {/* Interactive Main Card */}
        <div className="bg-slate-50 rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left: Interactive Condition Chip Selector */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold font-serif text-slate-900 mb-1">
                  {currentSpecialty.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-emerald-800">
                  {currentSpecialty.subtitle}
                </p>
              </div>

              {/* Interactive Symptom Chips */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Tap to select condition:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentSpecialty.keyPoints.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSymptomIdx(idx)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        selectedSymptomIdx === idx
                          ? 'bg-white border-emerald-600 text-emerald-950 ring-2 ring-emerald-600 shadow-sm'
                          : 'bg-white/60 border-slate-200 text-slate-700 hover:bg-white'
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

              {/* Homoeopathic Advantage Box */}
              <div className="p-3.5 rounded-xl bg-emerald-100/70 border border-emerald-200/80 flex items-start gap-2.5 text-xs text-emerald-950 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{currentSpecialty.advantage}</span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleBooking(activeTab)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-sm active:scale-95 transition-all"
              >
                <span>{currentSpecialty.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-white aspect-[4/3]">
                <img
                  src={activeTab === 'infertility' ? '/images/infertility.jpg' : '/images/mental_health.jpg'}
                  alt={currentSpecialty.title}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      35+ Years Proven Excellence
                    </span>
                    <p className="text-xs text-slate-200 mt-0.5 font-medium">
                      {activeTab === 'infertility'
                        ? 'Thousands of couples blessed with healthy children.'
                        : 'Safe recovery for mind, sleep, and emotional health.'}
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
