import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Settings, Globe } from 'lucide-react';

interface FooterProps {
  onOpenSettings: () => void;
  onOpenLeadsDrawer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSettings, onOpenLeadsDrawer }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <footer className="bg-emerald-950 text-slate-300 pt-10 pb-20 md:pb-10 border-t border-emerald-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8 border-b border-emerald-900/60">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center font-extrabold font-serif text-white text-xs border border-emerald-600">
                MHD
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-serif leading-tight">
                  {t.clinicName}
                </h3>
                <p className="text-[10px] text-amber-400 font-semibold">
                  {language === 'ml' ? '1992 മുതൽ • ഹോമിയോപ്പതി പരിചരണം' : 'Estd. 1992 • Homoeopathic Excellence'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.footer.about}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-xs border border-emerald-800 active:scale-95 transition-all"
              >
                <Globe className="w-3 h-3 text-emerald-400" />
                <span>{language === 'en' ? 'മലയാളം' : 'English'}</span>
              </button>

              <button
                onClick={onOpenSettings}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-slate-300 text-xs border border-emerald-800 active:scale-95 transition-all"
              >
                <Settings className="w-3 h-3 text-amber-400" />
                <span>Setup</span>
              </button>

              <button
                onClick={onOpenLeadsDrawer}
                className="px-2 py-1 text-xs text-emerald-400 hover:underline active:scale-95 transition-all"
              >
                Leads Vault
              </button>
            </div>
          </div>

          {/* Quick Specialties */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              {t.footer.departments}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a href="#specialties" className="hover:text-white transition-colors">
                  {t.specialties.infertilityTab}
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-white transition-colors">
                  {t.specialties.mentalHealthTab}
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-white transition-colors">
                  {t.specialties.allergyTab}
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-white transition-colors">
                  {t.specialties.hereditaryTab}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              {t.nav.contact}
            </h4>
            <div className="space-y-1 text-xs text-slate-400">
              <p className="text-slate-200 font-semibold">{t.clinicName}</p>
              <p>Q447+7WJ, Kattappana, Kerala 685508</p>
              <p className="pt-1 text-white font-semibold">
                <a href="tel:+919544548826" className="hover:text-emerald-300 transition-colors">
                  Ph: +91 95445 48826
                </a>
              </p>
              <p className="text-slate-300 truncate">
                <a href="mailto:geomadappallil@gmail.com" className="hover:text-emerald-300 transition-colors">
                  geomadappallil@gmail.com
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <p className="flex items-center gap-1">
            <span>{t.footer.devCredit}</span>
            <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
