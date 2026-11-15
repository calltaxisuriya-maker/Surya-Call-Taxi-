import { CONTACT_INFO, type Language } from '../data/taxiData';

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const isTa = lang === 'ta';

  return (
    <footer className="bg-[#0e243d] text-slate-300 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <p className="text-lg font-bold tracking-tight text-white">
              {CONTACT_INFO.brandName}
            </p>
            <p className="mt-1 text-sm text-slate-300">
              {CONTACT_INFO.address}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a href="#services" className="hover:text-white transition-colors">
              {isTa ? 'சேவைகள்' : 'Services'}
            </a>
            <a href="#routes" className="hover:text-white transition-colors">
              {isTa ? 'வழித்தடங்கள்' : 'Routes'}
            </a>
            <a href="#book" className="hover:text-white transition-colors">
              {isTa ? 'முன்பதிவு' : 'Book Ride'}
            </a>
            <a
              href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
              className="font-mono tabular-nums text-amber-400 hover:text-amber-300 transition-colors"
            >
              {CONTACT_INFO.primaryPhoneFormatted}
            </a>
            <a
              href={`tel:${CONTACT_INFO.secondaryPhoneRaw}`}
              className="font-mono tabular-nums hover:text-white transition-colors"
            >
              {CONTACT_INFO.secondaryPhoneFormatted}
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 Surya Call Taxi</p>
          <p>{isTa ? 'திருப்பூர் - தமிழ்நாடு' : 'Tiruppur - Tamil Nadu'}</p>
        </div>
      </div>
    </footer>
  );
}
