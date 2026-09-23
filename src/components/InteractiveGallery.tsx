import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Image as ImageIcon, ZoomIn, X, ChevronRight, Sparkles } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  category: 'clinic' | 'infertility' | 'mental_health' | 'remedies';
  title: { en: string; ml: string };
  subtitle: { en: string; ml: string };
  description: { en: string; ml: string };
  imageUrl: string;
}

export const InteractiveGallery: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const photos: GalleryPhoto[] = [
    {
      id: 'clinic-1',
      category: 'clinic',
      title: { en: 'Consultation Space', ml: 'ക്ലിനിക് അന്തരീക്ഷം' },
      subtitle: { en: 'Madappallil Homoeo Dispensary', ml: 'മാടപ്പള്ളിൽ ഹോമിയോ ഡിസ്പെൻസറി' },
      description: {
        en: 'A quiet, unhurried space designed for private and compassionate medical case consultations.',
        ml: 'രോഗികൾക്ക് അവരുടെ ശാരീരിക-മാനസിക ബുദ്ധിമുട്ടുകൾ ശാന്തമായി തുറന്നു പറയാവുന്ന അന്തരീക്ഷം.',
      },
      imageUrl: '/images/hero_clinic.jpg',
    },
    {
      id: 'infertility-1',
      category: 'infertility',
      title: { en: 'Parenthood Joy', ml: 'മാതൃത്വ സന്തോഷം' },
      subtitle: { en: 'Natural Conception Support', ml: 'സ്വാഭാവിക ഗർഭധാരണം' },
      description: {
        en: 'Natural homoeopathic conception support for couples facing PCOD, low sperm count, and unexplained delays.',
        ml: 'PCOD, ബീജക്കുറവ്, മറ്റ് പ്രത്യുൽപാദന പ്രശ്നങ്ങൾ എന്നിവയ്ക്ക് പാർശ്വഫലങ്ങളില്ലാത്ത ചികിത്സ.',
      },
      imageUrl: '/images/infertility.jpg',
    },
    {
      id: 'mental-1',
      category: 'mental_health',
      title: { en: 'Emotional Renewal', ml: 'മനഃസമാധാനം' },
      subtitle: { en: 'Non-Habit Forming Relief', ml: 'സമ്മർദ്ദത്തിൽ നിന്ന് മോചനം' },
      description: {
        en: 'Gentle remedies that restore restful sleep, calm panic attacks, and alleviate depression naturally.',
        ml: 'മയക്കുമരുന്നുകളോ അടിമപ്പെടലോ ഇല്ലാതെ ഉത്കണ്ഠയ്ക്കും ഉറക്കക്കുറവിനും ശാശ്വത ആശ്വാസം.',
      },
      imageUrl: '/images/mental_health.jpg',
    },
    {
      id: 'remedies-1',
      category: 'remedies',
      title: { en: 'Natural Remedies', ml: 'പ്രകൃതിദത്ത മരുന്നുകൾ' },
      subtitle: { en: 'Safe Micro-Dose Medicines', ml: 'ശുദ്ധമായ ഔഷധങ്ങൾ' },
      description: {
        en: 'Dynamized homoeopathic remedies that stimulate the body’s innate self-healing response.',
        ml: 'ശരീരത്തിന്റെ രോഗപ്രതിരോധ ശേഷിയെ ഉണർത്തുന്ന പ്രകൃതിദത്ത ഹോമിയോ മരുന്നുകൾ.',
      },
      imageUrl: '/images/remedies.jpg',
    },
  ];

  const filtered = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  return (
    <section id="gallery" className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-100">
            <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.gallery.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif mb-2">
            {t.gallery.title}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm">
            {t.gallery.subtitle}
          </p>

          {/* Quick Filters */}
          <div className="mt-5 flex flex-wrap justify-center gap-1.5">
            {[
              { id: 'all', label: t.gallery.filterAll },
              { id: 'clinic', label: t.gallery.filterClinic },
              { id: 'infertility', label: t.gallery.filterInfertility },
              { id: 'mental_health', label: t.gallery.filterMental },
              { id: 'remedies', label: t.gallery.filterRemedies },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveCategory(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === f.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col active:scale-98"
            >
              <div className="relative overflow-hidden w-full h-[200px] sm:h-[260px] bg-slate-200">
                <img
                  src={item.imageUrl}
                  alt={item.title[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-800 flex items-center gap-1 shadow-xs">
                  <ZoomIn className="w-3 h-3 text-emerald-700" />
                  <span>Tap to View</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-bold font-serif leading-tight">
                    {item.title[language]}
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    {item.subtitle[language]}
                  </p>
                </div>
              </div>

              <div className="p-3.5 flex items-center justify-between">
                <p className="text-xs text-slate-600 line-clamp-1 leading-relaxed">
                  {item.description[language]}
                </p>
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title[language]}
              className="w-full h-[260px] object-cover"
            />

            <div className="p-5">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-extrabold uppercase mb-2">
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>{selectedPhoto.category}</span>
              </div>

              <h3 className="text-lg font-bold font-serif text-slate-900 mb-0.5">
                {selectedPhoto.title[language]}
              </h3>

              <p className="text-xs text-emerald-700 font-semibold mb-2">
                {selectedPhoto.subtitle[language]}
              </p>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {selectedPhoto.description[language]}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[10px] text-slate-500 font-medium">
                  {t.clinicName}
                </span>

                <a
                  href="#book-form"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold"
                >
                  {t.nav.bookConsultation}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
