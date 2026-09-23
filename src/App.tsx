import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Specializations } from './components/Specializations';
import { HealingJourney } from './components/HealingJourney';
import { InteractiveGallery } from './components/InteractiveGallery';
import { DoctorHeritage } from './components/DoctorHeritage';
import { LeadBookingForm } from './components/LeadBookingForm';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { MobileBottomBar } from './components/MobileBottomBar';
import { GoogleSheetSetupModal } from './components/GoogleSheetSetupModal';
import { AdminLeadsDrawer } from './components/AdminLeadsDrawer';

export function AppContent() {
  const [selectedCondition, setSelectedCondition] = useState<'infertility' | 'mental_health' | 'general'>('infertility');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLeadsDrawerOpen, setIsLeadsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-warmth-50 font-sans selection:bg-healing-200 selection:text-healing-900 text-slate-800 pb-16 md:pb-0">
      
      {/* Top Sticky Navbar */}
      <Navbar
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenLeadsDrawer={() => setIsLeadsDrawerOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Specializations (Infertility & Mental Health) */}
        <Specializations onSelectCondition={(condition) => setSelectedCondition(condition)} />

        {/* 4-Step Clinical Process */}
        <HealingJourney />

        {/* Interactive Picture Gallery */}
        <InteractiveGallery />

        {/* 35+ Year Heritage & Chief Doctor */}
        <DoctorHeritage />

        {/* Direct Lead Generation & Appointment Booking Form */}
        <LeadBookingForm
          selectedCondition={selectedCondition}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* Location & Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenLeadsDrawer={() => setIsLeadsDrawerOpen(true)}
      />

      {/* Floating WhatsApp and Call buttons (for Desktop) */}
      <div className="hidden md:block">
        <FloatingActions />
      </div>

      {/* Mobile-First Sticky Bottom App Bar (for Mobile) */}
      <MobileBottomBar />

      {/* Turnkey Google Sheet & Email Setup Modal */}
      <GoogleSheetSetupModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Offline / Local Leads Vault Drawer */}
      <AdminLeadsDrawer
        isOpen={isLeadsDrawerOpen}
        onClose={() => setIsLeadsDrawerOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
