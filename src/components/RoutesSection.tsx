import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  POPULAR_ROUTES,
  type Language,
  type RouteCorridor,
  type TripServiceId,
} from '../data/taxiData';

interface RoutesSectionProps {
  lang: Language;
  onSelectRoute: (route: RouteCorridor) => void;
}

export function RoutesSection({ lang, onSelectRoute }: RoutesSectionProps) {
  const isTa = lang === 'ta';
  const [filter, setFilter] = useState<'all' | TripServiceId>('all');

  const filteredRoutes =
    filter === 'all'
      ? POPULAR_ROUTES
      : POPULAR_ROUTES.filter((r) => r.serviceType === filter);

  const filterButtons: { id: 'all' | TripServiceId; labelEn: string; labelTa: string }[] = [
    { id: 'all', labelEn: 'All Corridors', labelTa: 'அனைத்து வழித்தடங்கள்' },
    { id: 'airport', labelEn: 'Airport', labelTa: 'விமான நிலையம்' },
    { id: 'oneway-round', labelEn: 'One Way / City', labelTa: 'ஒரு வழி / நகரம்' },
    { id: 'outstation', labelEn: 'Outstation', labelTa: 'வெளியூர்' },
  ];

  return (
    <section id="routes" className="py-16 lg:py-20 bg-white border-y border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-slate-500">
              {isTa ? 'முக்கிய வழித்தடங்கள்' : 'Regional Coverage'}
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#0e243d] text-balance">
              {isTa
                ? 'திருப்பூரிலிருந்து முக்கிய நகரங்கள் மற்றும் விமான நிலையங்களுக்கு.'
                : 'Frequent corridors dispatched from Tiruppur.'}
            </h2>
          </div>

          <div
            role="group"
            aria-label={isTa ? 'வழித்தட வடிகட்டி' : 'Filter routes by service type'}
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start md:self-auto"
          >
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setFilter(btn.id)}
                className={`px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  filter === btn.id
                    ? 'bg-white text-[#0e243d] shadow-sm'
                    : 'text-slate-600 hover:text-[#0e243d]'
                }`}
              >
                {isTa ? btn.labelTa : btn.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Hairline Table Layout */}
        <div className="mt-8 overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium text-slate-500">
                <th className="py-3.5 px-4 sm:px-6">
                  {isTa ? 'பயண இலக்கு' : 'Destination'}
                </th>
                <th className="py-3.5 px-4 hidden sm:table-cell">
                  {isTa ? 'விவரம்' : 'Route Note'}
                </th>
                <th className="py-3.5 px-4 text-right">
                  {isTa ? 'தூரம்' : 'Distance'}
                </th>
                <th className="py-3.5 px-4 text-right hidden md:table-cell">
                  {isTa ? 'பயண நேரம்' : 'Est. Drive'}
                </th>
                <th className="py-3.5 px-4 sm:px-6 text-right">
                  {isTa ? 'செயல்' : 'Action'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredRoutes.map((route) => (
                <tr
                  key={route.id}
                  className="hover:bg-slate-50/80 transition-colors duration-150"
                >
                  <td className="py-4 px-4 sm:px-6 font-semibold text-[#0e243d]">
                    <div>{isTa ? route.destinationTa : route.destinationEn}</div>
                    <div className="text-xs font-normal text-slate-500 mt-0.5 sm:hidden">
                      {isTa ? route.noteTa : route.noteEn}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 hidden sm:table-cell">
                    {isTa ? route.noteTa : route.noteEn}
                  </td>
                  <td className="py-4 px-4 text-right font-mono tabular-nums text-slate-700 whitespace-nowrap">
                    {route.distanceKm} km
                  </td>
                  <td className="py-4 px-4 text-right tabular-nums text-slate-600 whitespace-nowrap hidden md:table-cell">
                    {isTa ? route.durationTa : route.durationEn}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectRoute(route)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] text-xs font-semibold text-[#0e243d] bg-slate-100 hover:bg-amber-400 hover:text-slate-950 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      <span>{isTa ? 'தேர்வு செய்க' : 'Select Route'}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
