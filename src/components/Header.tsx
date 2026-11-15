import { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { CONTACT_INFO, type Language } from '../data/taxiData';

interface HeaderProps {
  lang: Language;
}

export function Header({ lang }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '#services', label: lang === 'ta' ? 'சேவைகள்' : 'Services' },
    { href: '#routes', label: lang === 'ta' ? 'வழித்தடங்கள்' : 'Routes' },
    { href: '#book', label: lang === 'ta' ? 'முன்பதிவு' : 'Book Ride' },
    { href: '#contact', label: lang === 'ta' ? 'தொடர்பு' : 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element brand wordmark */}
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-[#0e243d] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
        >
          {CONTACT_INFO.brandName}
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label={lang === 'ta' ? 'முதன்மை வழிசெலுத்தல்' : 'Primary Navigation'}
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#0e243d] hover:underline underline-offset-4 decoration-amber-500 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile drawer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 tabular-nums"
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{CONTACT_INFO.primaryPhoneFormatted}</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label={lang === 'ta' ? 'மொபைல் வழிசெலுத்தல்' : 'Mobile Navigation'}
          className="md:hidden bg-white border-t border-slate-200 px-4 py-3 flex flex-col gap-1"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 min-h-[44px] flex items-center text-sm font-medium text-slate-700 hover:text-[#0e243d] hover:bg-slate-50 rounded-lg transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
