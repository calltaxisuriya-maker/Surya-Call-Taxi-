import { MessageCircle, Phone } from 'lucide-react';
import { CONTACT_INFO, type Language } from '../data/taxiData';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
  onQuickBook: () => void;
}

export function Hero({ lang, onLangChange, onQuickBook }: HeroProps) {
  const isTa = lang === 'ta';

  return (
    <section id="top" className="bg-[#0e243d] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        {/* Language selector bar inside hero (outside Top Bar Contract) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10">
          <p className="text-xs sm:text-sm text-slate-300 tracking-wide">
            {isTa
              ? 'திருப்பூர், தமிழ்நாடு · 24 மணி நேர டாக்ஸி சேவை'
              : 'Tiruppur, Tamil Nadu · 24 Hours Taxi Service'}
          </p>

          <div
            role="group"
            aria-label="Language selection"
            className="inline-flex items-center gap-1 p-1 bg-white/10 rounded-lg"
          >
            <button
              type="button"
              onClick={() => onLangChange('en')}
              className={`px-3 py-1.5 min-h-[34px] text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                lang === 'en'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onLangChange('ta')}
              className={`px-3 py-1.5 min-h-[34px] text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                lang === 'ta'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              தமிழ்
            </button>
          </div>
        </div>

        {/* 2-Column Hero Split with items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-8 lg:pt-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h1
                className="font-bold tracking-tight text-white text-balance leading-[1.12]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
              >
                {isTa
                  ? 'திருப்பூரில் பாதுகாப்பான 24 மணி நேர டாக்ஸி சேவை.'
                  : 'Safe, reliable taxi journeys across Tiruppur.'}
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
                {isTa
                  ? 'பாதுகாப்பான பயணம், சிறந்த சேவை, எளிதான முன்பதிவு. உள்ளூர், வெளியூர் மற்றும் விமான நிலைய பயணங்களுக்கு எப்போதும் தயாராக உள்ளோம்.'
                  : 'Safe Journey, Best Service, and Easy Booking. Doorstep pickups across Tiruppur for local travel, outstation trips, one-way drops, and airport transfers.'}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] text-sm sm:text-base font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e243d] focus-visible:ring-amber-400 tabular-nums"
                >
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    {isTa
                      ? `அழைக்க: ${CONTACT_INFO.primaryPhoneFormatted}`
                      : `Call Now: ${CONTACT_INFO.primaryPhoneFormatted}`}
                  </span>
                </a>

                <a
                  href={CONTACT_INFO.whatsappPrimary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] text-sm sm:text-base font-semibold text-white bg-[#15803d] hover:bg-[#166534] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e243d] focus-visible:ring-emerald-400"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{isTa ? 'வாட்ஸ்அப் முன்பதிவு' : 'WhatsApp Booking'}</span>
                </a>

                <button
                  type="button"
                  onClick={onQuickBook}
                  className="inline-flex items-center justify-center px-5 py-3.5 min-h-[48px] text-sm font-medium text-slate-100 border border-white/25 hover:bg-white/10 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  {isTa ? 'பயண விவரம் பதியவும்' : 'Plan Trip Details'}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-64 sm:h-80 lg:h-full min-h-[320px] rounded-xl overflow-hidden bg-slate-900 border border-white/10">
              <ImageWithFallback
                src={CONTACT_INFO.heroImage}
                alt="Surya Call Taxi white sedan ready for pickup in Tiruppur, Tamil Nadu"
                fallbackTitle="Surya Call Taxi — Tiruppur"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                <p className="text-xs text-slate-300">
                  {isTa ? 'முதலிபாளையம் · திருப்பூர்' : 'Mudalipalayam · Tiruppur'}
                </p>
                <p className="mt-1 text-sm sm:text-base font-medium text-white">
                  {isTa
                    ? 'நேரடி கார் முன்பதிவு — பகல் இரவு 24 மணி நேரமும்'
                    : 'Direct chauffeur dispatch — available day and night'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Dispatch Summary Strip below the hero split */}
        <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <p className="text-xs text-slate-300">
              {isTa ? 'சேவை நேரம்' : 'Operating Hours'}
            </p>
            <p className="mt-1 text-lg sm:text-xl font-semibold text-white tabular-nums">
              {isTa ? '24 மணி நேரம்' : '24 Hours Daily'}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-300">
              {isTa ? 'முதன்மை எண்' : 'Primary Dispatch'}
            </p>
            <a
              href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
              className="mt-1 inline-block text-lg sm:text-xl font-semibold text-amber-400 hover:text-amber-300 transition-colors font-mono tabular-nums"
            >
              {CONTACT_INFO.primaryPhoneFormatted}
            </a>
          </div>

          <div>
            <p className="text-xs text-slate-300">
              {isTa ? 'மாற்று எண்' : 'Alternate Line'}
            </p>
            <a
              href={`tel:${CONTACT_INFO.secondaryPhoneRaw}`}
              className="mt-1 inline-block text-lg sm:text-xl font-semibold text-white hover:text-amber-300 transition-colors font-mono tabular-nums"
            >
              {CONTACT_INFO.secondaryPhoneFormatted}
            </a>
          </div>

          <div>
            <p className="text-xs text-slate-300">
              {isTa ? 'முகவரி பகுதி' : 'Base Location'}
            </p>
            <p className="mt-1 text-lg sm:text-xl font-semibold text-white">
              {isTa ? 'முதலிபாளையம், 641606' : 'Mudalipalayam, 641606'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
