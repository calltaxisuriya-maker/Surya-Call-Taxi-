import { useEffect, useState, type FormEvent } from 'react';
import { Check, Copy, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CONTACT_INFO, type Language, type TripServiceId } from '../data/taxiData';

interface BookingSectionProps {
  lang: Language;
  selectedService: TripServiceId;
  selectedDestination: string;
  onServiceChange: (service: TripServiceId) => void;
}

const SERVICE_OPTIONS: { id: TripServiceId; labelEn: string; labelTa: string }[] = [
  { id: 'local', labelEn: 'Local Taxi', labelTa: 'உள்ளூர்' },
  { id: 'outstation', labelEn: 'Outstation', labelTa: 'வெளியூர்' },
  { id: 'oneway-round', labelEn: 'One Way / Round', labelTa: 'ஒரு / இரு வழி' },
  { id: 'airport', labelEn: 'Airport Transfer', labelTa: 'விமான நிலையம்' },
  { id: '24hours', labelEn: '24/7 Urgent', labelTa: '24 மணி நேர சேவை' },
];

export function BookingSection({
  lang,
  selectedService,
  selectedDestination,
  onServiceChange,
}: BookingSectionProps) {
  const isTa = lang === 'ta';

  const [pickup, setPickup] = useState('Mudalipalayam, Tiruppur');
  const [drop, setDrop] = useState(selectedDestination || '');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00');
  const [passengerName, setPassengerName] = useState('');
  const [phone, setPhone] = useState('');
  const [dispatchLine, setDispatchLine] = useState<'primary' | 'secondary'>('primary');
  const [errors, setErrors] = useState<{
    pickup?: string;
    drop?: string;
    phone?: string;
  }>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedDestination) {
      setDrop(selectedDestination);
    }
  }, [selectedDestination]);

  const activePhoneRaw =
    dispatchLine === 'primary'
      ? CONTACT_INFO.primaryPhoneRaw
      : CONTACT_INFO.secondaryPhoneRaw;
  const activePhoneFormatted =
    dispatchLine === 'primary'
      ? CONTACT_INFO.primaryPhoneFormatted
      : CONTACT_INFO.secondaryPhoneFormatted;

  function validateForm() {
    const nextErrors: { pickup?: string; drop?: string; phone?: string } = {};
    if (!pickup.trim()) {
      nextErrors.pickup = isTa
        ? 'பிக்அப் இடத்தை உள்ளிடவும்.'
        : 'Please enter a pickup location.';
    }
    if (!drop.trim()) {
      nextErrors.drop = isTa
        ? 'சேரும் இடத்தை உள்ளிடவும்.'
        : 'Please enter a drop destination.';
    }
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      nextErrors.phone = isTa
        ? 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.'
        : 'Please enter a valid 10-digit phone number.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    const serviceLabel =
      SERVICE_OPTIONS.find((s) => s.id === selectedService)?.[
        isTa ? 'labelTa' : 'labelEn'
      ] || 'Taxi Booking';

    const lines = [
      `Surya Call Taxi — Booking Request`,
      `Service: ${serviceLabel}`,
      `Pickup: ${pickup.trim()}`,
      `Drop: ${drop.trim()}`,
      `Date & Time: ${date} at ${time}`,
      passengerName.trim() ? `Passenger: ${passengerName.trim()}` : null,
      `Contact: ${phone.trim()}`,
    ].filter(Boolean);

    setSubmittedMessage(lines.join('\n'));
    setCopied(false);
  }

  async function handleCopy() {
    if (!submittedMessage) return;
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  }

  const whatsappDispatchUrl = submittedMessage
    ? `https://wa.me/91${activePhoneRaw}?text=${encodeURIComponent(submittedMessage)}`
    : `https://wa.me/91${activePhoneRaw}`;

  return (
    <section id="book" className="py-16 lg:py-20 bg-slate-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 7 cols: Interactive Trip Booking Builder */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
            <div>
              <p className="text-xs font-medium text-slate-500">
                {isTa ? 'எளிதான முன்பதிவு' : 'Easy Booking'}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0e243d]">
                {isTa
                  ? 'உங்கள் பயண விவரங்களைத் தயார் செய்யுங்கள்'
                  : 'Prepare your taxi booking request'}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {isTa
                  ? 'கீழே விவரங்களை நிரப்பி நேரடியாக வாட்ஸ்அப் வழியாக அனுப்பலாம் அல்லது அழைக்கலாம்.'
                  : 'Fill in your trip details below to generate a ready-to-send WhatsApp dispatch message or call directly.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              {/* Trip Service Segmented Selector */}
              <div>
                <span className="block text-xs font-medium text-slate-700 mb-2">
                  {isTa ? 'பயண வகை' : 'Trip Type'}
                </span>
                <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg">
                  {SERVICE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onServiceChange(opt.id)}
                      className={`px-3 py-2 min-h-[38px] text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                        selectedService === opt.id
                          ? 'bg-white text-[#0e243d] shadow-sm'
                          : 'text-slate-600 hover:text-[#0e243d]'
                      }`}
                    >
                      {isTa ? opt.labelTa : opt.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="pickup-input"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    {isTa ? 'பிக்அப் இடம் *' : 'Pickup Location *'}
                  </label>
                  <input
                    id="pickup-input"
                    type="text"
                    value={pickup}
                    onChange={(e) => {
                      setPickup(e.target.value);
                      if (errors.pickup) setErrors((prev) => ({ ...prev, pickup: undefined }));
                    }}
                    placeholder={isTa ? 'எ.கா: திருப்பூர் ரயில் நிலையம்' : 'e.g. Mudalipalayam, Tiruppur'}
                    className={`w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                      errors.pickup ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.pickup && (
                    <p role="alert" className="mt-1 text-xs text-red-600">
                      {errors.pickup}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="drop-input"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    {isTa ? 'சேரும் இடம் *' : 'Drop Destination *'}
                  </label>
                  <input
                    id="drop-input"
                    type="text"
                    value={drop}
                    onChange={(e) => {
                      setDrop(e.target.value);
                      if (errors.drop) setErrors((prev) => ({ ...prev, drop: undefined }));
                    }}
                    placeholder={
                      isTa ? 'எ.கா: கோவை விமான நிலையம்' : 'e.g. Coimbatore Airport (CJB)'
                    }
                    className={`w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                      errors.drop ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.drop && (
                    <p role="alert" className="mt-1 text-xs text-red-600">
                      {errors.drop}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="date-input"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    {isTa ? 'பயண தேதி' : 'Pickup Date'}
                  </label>
                  <input
                    id="date-input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border border-slate-300 bg-white text-slate-900 font-mono tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="time-input"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    {isTa ? 'நேரம்' : 'Pickup Time'}
                  </label>
                  <input
                    id="time-input"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border border-slate-300 bg-white text-slate-900 font-mono tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name-input"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    {isTa ? 'உங்கள் பெயர் (விருப்பம்)' : 'Passenger Name (Optional)'}
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    placeholder={isTa ? 'உங்கள் பெயர்' : 'Your name'}
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone-input"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    {isTa ? 'உங்கள் மொபைல் எண் *' : 'Your Mobile Number *'}
                  </label>
                  <input
                    id="phone-input"
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="98765 43210"
                    className={`w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border bg-white text-slate-900 font-mono tabular-nums placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                      errors.phone ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && (
                    <p role="alert" className="mt-1 text-xs text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Dispatch Line Selection */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span>{isTa ? 'தொடர்பு எண்:' : 'Dispatch to:'}</span>
                  <div className="inline-flex p-1 bg-slate-100 rounded-lg gap-1">
                    <button
                      type="button"
                      onClick={() => setDispatchLine('primary')}
                      className={`px-2.5 py-1 text-xs font-mono tabular-nums rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        dispatchLine === 'primary'
                          ? 'bg-white text-[#0e243d] font-semibold shadow-sm'
                          : 'text-slate-600 hover:text-[#0e243d]'
                      }`}
                    >
                      {CONTACT_INFO.primaryPhoneFormatted}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDispatchLine('secondary')}
                      className={`px-2.5 py-1 text-xs font-mono tabular-nums rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        dispatchLine === 'secondary'
                          ? 'bg-white text-[#0e243d] font-semibold shadow-sm'
                          : 'text-slate-600 hover:text-[#0e243d]'
                      }`}
                    >
                      {CONTACT_INFO.secondaryPhoneFormatted}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 min-h-[44px] text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500"
                >
                  {isTa ? 'முன்பதிவு விவரம் உருவாக்கு' : 'Prepare Booking Summary'}
                </button>
              </div>
            </form>

            {submittedMessage && (
              <div
                aria-live="polite"
                className="mt-6 pt-6 border-t border-slate-200 space-y-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-[#0e243d]">
                    {isTa
                      ? 'உங்கள் முன்பதிவு விவரம் தயாராக உள்ளது'
                      : 'Booking details ready to dispatch'}
                  </p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                        <span>{isTa ? 'நகலெடுக்கப்பட்டது' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isTa ? 'நகலெடு' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
                  {submittedMessage}
                </pre>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappDispatchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#15803d] hover:bg-[#166534] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>
                      {isTa
                        ? `வாட்ஸ்அப்பில் அனுப்பு (${activePhoneFormatted})`
                        : `Send via WhatsApp (${activePhoneFormatted})`}
                    </span>
                  </a>

                  <a
                    href={`tel:${activePhoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-[#0e243d] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>
                      {isTa ? `அழைக்க: ${activePhoneFormatted}` : `Call ${activePhoneFormatted}`}
                    </span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right 5 cols: About Surya Call Taxi & Direct Contact Details */}
          <aside id="contact" className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
              <p className="text-xs font-medium text-slate-500">
                {isTa ? 'எங்களை பற்றி' : 'About Surya Call Taxi'}
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#0e243d]">
                {isTa
                  ? 'திருப்பூரில் நம்பகமான டாக்ஸி சேவை'
                  : 'Reliable taxi service in Tiruppur'}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Surya Call Taxi provides reliable taxi service in Tiruppur. Call us
                for your travel needs.
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                திருப்பூரில் சிறந்த டாக்ஸி சேவைக்கு Surya Call Taxi-ஐ தொடர்பு கொள்ளுங்கள்.
              </p>
            </div>

            <div className="bg-[#0e243d] text-white rounded-xl p-6 sm:p-8">
              <p className="text-xs font-medium text-slate-300">
                {isTa ? 'நேரடி தொடர்பு' : 'Contact Us'}
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">
                {isTa ? '24 மணி நேர முன்பதிவு மையம்' : '24-Hour Dispatch Desk'}
              </h3>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 text-amber-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs text-slate-300">
                      {isTa ? 'அலுவலக முகவரி' : 'Office Address'}
                    </p>
                    <p className="mt-1 text-sm sm:text-base text-white leading-relaxed">
                      {CONTACT_INFO.address}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-300">
                      {CONTACT_INFO.addressTa}
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/15 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-300">
                        {isTa ? 'முதன்மை எண்' : 'Primary Phone'}
                      </p>
                      <a
                        href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
                        className="text-lg font-semibold font-mono tabular-nums text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        {CONTACT_INFO.primaryPhoneFormatted}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isTa ? 'அழைக்க' : 'Call Taxi'}</span>
                      </a>
                      <a
                        href={CONTACT_INFO.whatsappPrimary}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold text-white bg-[#15803d] hover:bg-[#166534] rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-300">
                        {isTa ? 'இரண்டாம் எண்' : 'Secondary Phone'}
                      </p>
                      <a
                        href={`tel:${CONTACT_INFO.secondaryPhoneRaw}`}
                        className="text-lg font-semibold font-mono tabular-nums text-white hover:text-amber-300 transition-colors"
                      >
                        {CONTACT_INFO.secondaryPhoneFormatted}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${CONTACT_INFO.secondaryPhoneRaw}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isTa ? 'அழைக்க' : 'Call Taxi'}</span>
                      </a>
                      <a
                        href={CONTACT_INFO.whatsappSecondary}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold text-white bg-[#15803d] hover:bg-[#166534] rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
