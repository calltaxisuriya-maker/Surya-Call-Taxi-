import { ArrowUpRight } from 'lucide-react';
import { SERVICES, type Language, type TripServiceId } from '../data/taxiData';
import { ImageWithFallback } from './ImageWithFallback';

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (serviceId: TripServiceId) => void;
}

export function ServicesSection({ lang, onSelectService }: ServicesSectionProps) {
  const isTa = lang === 'ta';
  const [localService, outstationService, airportService, oneWayService, hoursService] =
    SERVICES;

  return (
    <section id="services" className="py-16 lg:py-20 bg-slate-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-slate-500 tracking-wide">
            {isTa ? 'எங்கள் சேவைகள்' : 'Our Services'}
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#0e243d] text-balance">
            {isTa
              ? 'உள்ளூர் முதல் வெளியூர் வரை அனைத்து பயணங்களுக்கும் நம்பகமான டாக்ஸி.'
              : 'Five focused travel services tailored for Tiruppur passengers.'}
          </h2>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* 01. Local Taxi Service - Wide Feature Card */}
          <article className="lg:col-span-7 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden">
              <ImageWithFallback
                src={localService.image}
                alt={localService.imageAlt || localService.titleEn}
                fallbackTitle={localService.titleEn}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-500 font-mono">
                  {localService.index}{' '}
                  <span className="font-sans">
                    {isTa ? localService.coverageTa : localService.coverageEn}
                  </span>
                </p>
                <h3 className="mt-2 text-xl font-bold text-[#0e243d]">
                  {isTa ? localService.titleTa : localService.titleEn}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  {isTa ? localService.summaryTa : localService.summaryEn}
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  {isTa ? localService.titleEn : localService.titleTa}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectService(localService.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e243d] hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm py-1"
                >
                  <span>{isTa ? 'முன்பதிவு செய்ய' : 'Book Local Ride'}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>

          {/* 02. Outstation Taxi - Tall Right Feature Card */}
          <article className="lg:col-span-5 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden">
              <ImageWithFallback
                src={outstationService.image}
                alt={outstationService.imageAlt || outstationService.titleEn}
                fallbackTitle={outstationService.titleEn}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-500 font-mono">
                  {outstationService.index}{' '}
                  <span className="font-sans">
                    {isTa ? outstationService.coverageTa : outstationService.coverageEn}
                  </span>
                </p>
                <h3 className="mt-2 text-xl font-bold text-[#0e243d]">
                  {isTa ? outstationService.titleTa : outstationService.titleEn}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {isTa ? outstationService.summaryTa : outstationService.summaryEn}
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  {isTa ? outstationService.titleEn : outstationService.titleTa}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectService(outstationService.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e243d] hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm py-1"
                >
                  <span>{isTa ? 'வெளியூர் முன்பதிவு' : 'Book Outstation'}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>

          {/* 03. Airport Pickup & Drop */}
          <article className="lg:col-span-5 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden">
              <ImageWithFallback
                src={airportService.image}
                alt={airportService.imageAlt || airportService.titleEn}
                fallbackTitle={airportService.titleEn}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-500 font-mono">
                  {airportService.index}{' '}
                  <span className="font-sans">
                    {isTa ? airportService.coverageTa : airportService.coverageEn}
                  </span>
                </p>
                <h3 className="mt-2 text-xl font-bold text-[#0e243d]">
                  {isTa ? airportService.titleTa : airportService.titleEn}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {isTa ? airportService.summaryTa : airportService.summaryEn}
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  {isTa ? airportService.titleEn : airportService.titleTa}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectService(airportService.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e243d] hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm py-1"
                >
                  <span>{isTa ? 'ஏர்போர்ட் டாக்ஸி' : 'Schedule Transfer'}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>

          {/* 04 & 05 Stacked Clean Typographic Services on Right 7 Columns */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <article className="flex-1 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-500 font-mono">
                  {oneWayService.index}{' '}
                  <span className="font-sans">
                    {isTa ? oneWayService.coverageTa : oneWayService.coverageEn}
                  </span>
                </p>
                <h3 className="mt-2 text-xl font-bold text-[#0e243d]">
                  {isTa ? oneWayService.titleTa : oneWayService.titleEn}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  {isTa ? oneWayService.summaryTa : oneWayService.summaryEn}
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  {isTa ? oneWayService.titleEn : oneWayService.titleTa}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectService(oneWayService.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0e243d] hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm py-1"
                >
                  <span>{isTa ? 'டிரிப் தேர்ந்தெடுக்க' : 'Request One Way / Round'}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </article>

            <article className="flex-1 bg-[#0e243d] text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-300 font-mono">
                  {hoursService.index}{' '}
                  <span className="font-sans">
                    {isTa ? hoursService.coverageTa : hoursService.coverageEn}
                  </span>
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">
                  {isTa ? hoursService.titleTa : hoursService.titleEn}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
                  {isTa ? hoursService.summaryTa : hoursService.summaryEn}
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-300">
                  {isTa ? hoursService.titleEn : hoursService.titleTa}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectService(hoursService.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <span>{isTa ? 'உடனே முன்பதிவு' : 'Book 24/7 Dispatch'}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
