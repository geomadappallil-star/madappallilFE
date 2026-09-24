import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Calendar, Globe, Menu, X, Settings, ShieldCheck, HeartHandshake, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenSettings: () => void;
  onOpenLeadsDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSettings, onOpenLeadsDrawer }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#infertility-section', label: t.nav.infertility },
    { href: '#mental-health-section', label: t.nav.mentalHealth },
    { href: '#specialties', label: t.nav.allergy },
    { href: '#specialties', label: t.nav.hereditary },
    { href: '#heritage', label: t.nav.heritage },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/90 py-2 sm:py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-2.5 sm:py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Brand Logo & Clinic Identity */}
          <a href="#" className="flex items-center gap-2 group focus:outline-none min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-900 flex items-center justify-center shadow-xs border border-emerald-700 shrink-0 group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-xs sm:text-sm tracking-wider font-serif">MHD</span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Responsive Clinic Name: Compact on tiny mobile, full on sm+ */}
                <span className="font-extrabold text-slate-900 tracking-tight text-xs sm:text-base leading-tight truncate group-hover:text-emerald-700 transition-colors">
                  <span className="inline sm:hidden">
                    {language === 'ml' ? 'മാടപ്പള്ളിൽ ഹോമിയോ' : 'Madappallil Homoeo'}
                  </span>
                  <span className="hidden sm:inline">
                    {t.clinicName}
                  </span>
                </span>
                
                <span className="bg-amber-100 text-amber-900 text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border border-amber-300 shrink-0">
                  {language === 'ml' ? '1992 മുതൽ' : 'Since 1992'}
                </span>
              </div>

              <span className="text-[10px] text-emerald-800 font-medium tracking-wide flex items-center gap-1 truncate">
                <ShieldCheck className="w-3 h-3 text-emerald-600 inline shrink-0" />
                <span className="truncate">
                  {language === 'ml' ? 'കട്ടപ്പന • ഇടുക്കി' : 'Kattappana, Kerala'}
                </span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (hidden on mobile, visible on lg+) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-semibold text-slate-700">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-emerald-700 transition-colors py-1 hover:border-b-2 hover:border-emerald-600 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 text-slate-800 text-[11px] sm:text-xs font-bold transition-all active:scale-95 shrink-0"
              title="Switch Language / ഭാഷ മാറ്റുക"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="text-emerald-800 font-bold">
                {language === 'en' ? 'മലയാളം' : 'EN'}
              </span>
            </button>

            {/* Direct Phone Call Button (Icon on mobile, Full on Desktop) */}
            <a
              href="tel:+919544548826"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-emerald-800 bg-emerald-50/80 border border-emerald-200 hover:bg-emerald-100 transition-colors shrink-0"
              title="Call Clinic / ക്ലിനിക്കിലേക്ക് വിളിക്കുക"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline font-bold text-emerald-900">
                {language === 'ml' ? 'വിളിക്കുക' : 'Call'}
              </span>
            </a>

            {/* Primary CTA Button (Visible on md+) */}
            <a
              href="#book-form"
              className="hidden md:flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 sm:py-2 rounded-xl shadow-xs transition-all active:scale-95 shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.nav.bookConsultation}</span>
            </a>

            {/* Settings gear (Visible on md+) */}
            <button
              onClick={onOpenSettings}
              className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              title="Setup Google Sheets & Email"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle (for mobile screens) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 hover:text-emerald-800 hover:bg-slate-100 rounded-lg focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-800" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-4 animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <div className="pb-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-emerald-900">{t.clinicName}</span>
              <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {language === 'ml' ? '1992 മുതൽ' : 'Since 1992'}
              </span>
            </div>

            {/* Navigation links */}
            <div className="divide-y divide-slate-100">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-800 hover:text-emerald-700 font-semibold py-2.5 text-xs sm:text-sm flex items-center justify-between active:bg-slate-50 rounded-lg px-1 transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </a>
              ))}
            </div>

            {/* Quick Action Buttons in Menu */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="#book-form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>{t.nav.bookConsultation}</span>
              </a>

              <div className="flex gap-2">
                <a
                  href="tel:+919544548826"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-bold text-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>+91 95445 48826</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLeadsDrawer();
                  }}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs flex items-center justify-center gap-1"
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t.nav.adminPortal}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
