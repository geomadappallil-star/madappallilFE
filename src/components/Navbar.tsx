import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Calendar, Globe, Menu, X, Settings, ShieldCheck, HeartHandshake } from 'lucide-react';

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

  // Short, concise nav items that fit gracefully without breaking the layout
  const navLinks = [
    { href: '#infertility-section', label: t.nav.infertility },
    { href: '#mental-health-section', label: t.nav.mentalHealth },
    { href: '#heritage', label: t.nav.heritage },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-2.5 group focus:outline-none shrink-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center shadow-sm border border-emerald-700 group-hover:scale-105 transition-transform shrink-0">
              <span className="text-white font-extrabold text-sm tracking-wider font-serif">MHD</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base leading-tight group-hover:text-emerald-700 transition-colors">
                  {t.clinicName}
                </span>
                <span className="hidden sm:inline-block bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-amber-200">
                  35+ Yrs
                </span>
              </div>
              <span className="text-[10px] text-emerald-800 font-medium tracking-wide hidden xs:flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600 inline shrink-0" />
                <span>{t.tagline}</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Clean, Short, No Overlap) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-emerald-700 transition-colors py-1 hover:border-b-2 hover:border-emerald-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-emerald-50 text-slate-800 text-[11px] sm:text-xs font-bold transition-all active:scale-95 shrink-0"
              title="Switch Language / ഭാഷ മാറ്റുക"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="text-emerald-800">
                {language === 'en' ? 'മലയാളം' : 'English'}
              </span>
            </button>

            {/* Quick Call Button (Desktop) */}
            <a
              href="tel:+919544548826"
              className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 border border-slate-200 transition-colors shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'ml' ? 'വിളിക്കുക' : 'Call'}</span>
            </a>

            {/* Primary CTA Button */}
            <a
              href="#book-form"
              className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-xs transition-all active:scale-95 shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.nav.bookConsultation}</span>
            </a>

            {/* Settings gear */}
            <button
              onClick={onOpenSettings}
              className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              title="Setup Google Sheets & Email"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 hover:text-emerald-800 rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slider Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-4 animate-fadeIn">
          <div className="flex flex-col gap-2">
            <div className="pb-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-emerald-900">{t.clinicName}</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLeadsDrawer();
                }}
                className="text-emerald-700 font-bold underline flex items-center gap-1"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                {t.nav.adminPortal}
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 hover:text-emerald-700 font-semibold py-2 text-sm border-b border-slate-50 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-slate-300">→</span>
              </a>
            ))}

            <div className="pt-2 flex gap-2">
              <a
                href="#book-form"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                {t.nav.bookConsultation}
              </a>
              <a
                href="tel:+919544548826"
                className="flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold text-xs"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'ml' ? 'വിളിക്കുക' : 'Call'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
