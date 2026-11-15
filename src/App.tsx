import { useState } from 'react';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RoutesSection } from './components/RoutesSection';
import { ServicesSection } from './components/ServicesSection';
import type { Language, RouteCorridor, TripServiceId } from './data/taxiData';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedService, setSelectedService] = useState<TripServiceId>('local');
  const [selectedDestination, setSelectedDestination] = useState<string>('');

  function scrollToBooking() {
    const el = document.getElementById('book');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleSelectService(serviceId: TripServiceId) {
    setSelectedService(serviceId);
    scrollToBooking();
  }

  function handleSelectRoute(route: RouteCorridor) {
    setSelectedService(route.serviceType);
    setSelectedDestination(lang === 'ta' ? route.destinationTa : route.destinationEn);
    scrollToBooking();
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header lang={lang} />
      <main className="flex-1">
        <Hero lang={lang} onLangChange={setLang} onQuickBook={scrollToBooking} />
        <ServicesSection lang={lang} onSelectService={handleSelectService} />
        <RoutesSection lang={lang} onSelectRoute={handleSelectRoute} />
        <BookingSection
          lang={lang}
          selectedService={selectedService}
          selectedDestination={selectedDestination}
          onServiceChange={setSelectedService}
        />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
