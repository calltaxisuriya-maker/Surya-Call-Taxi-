import heroTaxiImg from '../assets/images/hero_tiruppur_taxi_1794716560222.jpg';
import airportTransferImg from '../assets/images/service_airport_transfer_1794716562048.jpg';
import outstationHighwayImg from '../assets/images/service_outstation_highway_1794716562108.jpg';
import localCityImg from '../assets/images/service_local_city_1794716561509.jpg';

export type Language = 'en' | 'ta';

export type TripServiceId =
  | 'local'
  | 'outstation'
  | 'oneway-round'
  | 'airport'
  | '24hours';

export interface ServiceItem {
  id: TripServiceId;
  index: string;
  titleEn: string;
  titleTa: string;
  summaryEn: string;
  summaryTa: string;
  coverageEn: string;
  coverageTa: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
}

export interface RouteCorridor {
  id: string;
  origin: string;
  destinationEn: string;
  destinationTa: string;
  distanceKm: number;
  durationEn: string;
  durationTa: string;
  serviceType: TripServiceId;
  noteEn: string;
  noteTa: string;
}

export const CONTACT_INFO = {
  brandName: 'Surya Call Taxi',
  primaryPhoneRaw: '9488802242',
  primaryPhoneFormatted: '94888 02242',
  secondaryPhoneRaw: '7667664406',
  secondaryPhoneFormatted: '76676 64406',
  whatsappPrimary: 'https://wa.me/919488802242',
  whatsappSecondary: 'https://wa.me/917667664406',
  address: 'Varnam Garden, Mudalipalayam, Tiruppur - 641606',
  addressTa: 'வர்ணம் கார்டன், முதலிபாளையம், திருப்பூர் - 641606',
  regionEn: 'Tiruppur, Tamil Nadu',
  regionTa: 'திருப்பூர், தமிழ்நாடு',
  heroImage: heroTaxiImg,
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'local',
    index: '01.',
    titleEn: 'Local Taxi Service',
    titleTa: 'உள்ளூர் டாக்ஸி சேவை',
    summaryEn:
      'Prompt doorstep pickups across Tiruppur industrial hubs, textile markets, railway station, and residential neighbourhoods.',
    summaryTa:
      'திருப்பூர் நகரம், தொழிற்பேட்டைகள், ரயில் நிலையம் மற்றும் குடியிருப்பு பகுதிகளுக்கு விரைவான உள்ளூர் டாக்ஸி சேவை.',
    coverageEn: 'Tiruppur City · Avinashi · Mudalipalayam · Palladam',
    coverageTa: 'திருப்பூர் நகரம் · அவிநாசி · முதலிபாளையம் · பல்லடம்',
    image: localCityImg,
    imageAlt: 'White sedan taxi driving smoothly along a sunlit avenue in Tamil Nadu',
    featured: true,
  },
  {
    id: 'outstation',
    index: '02.',
    titleEn: 'Outstation Taxi',
    titleTa: 'வெளியூர் டாக்ஸி',
    summaryEn:
      'Comfortable highway-ready sedans and SUVs for family trips, temple visits, and business travel across Tamil Nadu and Kerala.',
    summaryTa:
      'குடும்ப சுற்றுலா, கோவில் தரிசனம் மற்றும் தொழில் பயணங்களுக்கு தமிழ்நாடு முழுவதும் வசதியான வெளியூர் கார் சேவை.',
    coverageEn: 'Ooty · Kodaikanal · Madurai · Chennai · Bengaluru',
    coverageTa: 'ஊட்டி · கொடைக்கானல் · மதுரை · சென்னை · பெங்களூரு',
    image: outstationHighwayImg,
    imageAlt: 'Modern touring SUV cruising along a green highway toward the Western Ghats',
    featured: true,
  },
  {
    id: 'airport',
    index: '03.',
    titleEn: 'Airport Pickup & Drop',
    titleTa: 'விமான நிலைய பிக்அப் & டிராப்',
    summaryEn:
      'Punctual early-morning and late-night transfers to Coimbatore International Airport and regional terminals with luggage space.',
    summaryTa:
      'கோயம்புத்தூர் விமான நிலையத்திற்கு அதிகாலை மற்றும் நள்ளிரவு நேரங்களிலும் சரியான நேரத்தில் பிக்அப் மற்றும் டிராப்.',
    coverageEn: 'Coimbatore (CJB) · Trichy · Madurai · Chennai Airports',
    coverageTa: 'கோயம்புத்தூர் (CJB) · திருச்சி · மதுரை · சென்னை விமான நிலையங்கள்',
    image: airportTransferImg,
    imageAlt: 'Executive taxi waiting cleanly at an airport terminal arrival lane',
  },
  {
    id: 'oneway-round',
    index: '04.',
    titleEn: 'One Way & Round Trip',
    titleTa: 'ஒரு வழி & இரு வழி பயணம்',
    summaryEn:
      'Flexible single-drop one-way rides or multi-day round-trip packages tailored to your schedule with transparent dispatch.',
    summaryTa:
      'உங்கள் பயணத் தேவைக்கேற்ப ஒரு வழி டிராப் அல்லது பல நாள் சுற்றுலா இரு வழி டாக்ஸி முன்பதிவு வசதி.',
    coverageEn: 'Point-to-Point Drops · Same-Day & Multi-Day Returns',
    coverageTa: 'நேரடி டிராப் · ஒரே நாள் & பல நாள் திரும்பும் பயணம்',
  },
  {
    id: '24hours',
    index: '05.',
    titleEn: '24 Hours Service',
    titleTa: '24 மணி நேர சேவை',
    summaryEn:
      'Direct phone and WhatsApp dispatch operating day and night for urgent hospital visits, late trains, and early departures.',
    summaryTa:
      'அவசர மருத்துவப் பயணங்கள், இரவு ரயில் வருகை மற்றும் அதிகாலை பயணங்களுக்கு 24 மணி நேரமும் நேரடி தொடர்பு.',
    coverageEn: 'Day & Night Dispatch · 94888 02242 / 76676 64406',
    coverageTa: 'பகல் & இரவு சேவை · 94888 02242 / 76676 64406',
  },
];

export const POPULAR_ROUTES: RouteCorridor[] = [
  {
    id: 'cjb-airport',
    origin: 'Tiruppur',
    destinationEn: 'Coimbatore Airport (CJB)',
    destinationTa: 'கோயம்புத்தூர் விமான நிலையம் (CJB)',
    distanceKm: 46,
    durationEn: '1 hr 10 min',
    durationTa: '1 மணி 10 நிமிடம்',
    serviceType: 'airport',
    noteEn: '24/7 flight-aligned pickup & terminal drop',
    noteTa: 'விமான நேரத்திற்கேற்ப 24 மணி நேர சேவை',
  },
  {
    id: 'coimbatore-city',
    origin: 'Tiruppur',
    destinationEn: 'Coimbatore City & RS Puram',
    destinationTa: 'கோயம்புத்தூர் நகரம் & ஆர்.எஸ். புரம்',
    distanceKm: 54,
    durationEn: '1 hr 25 min',
    durationTa: '1 மணி 25 நிமிடம்',
    serviceType: 'oneway-round',
    noteEn: 'Business, hospital & shopping trips',
    noteTa: 'வணிகம், மருத்துவமனை & நகரப் பயணம்',
  },
  {
    id: 'erode',
    origin: 'Tiruppur',
    destinationEn: 'Erode Junction',
    destinationTa: 'ஈரோடு சந்திப்பு',
    distanceKm: 56,
    durationEn: '1 hr 20 min',
    durationTa: '1 மணி 20 நிமிடம்',
    serviceType: 'oneway-round',
    noteEn: 'Direct NH corridor one-way or return',
    noteTa: 'நேரடி நெடுஞ்சாலை ஒரு வழி / இரு வழி',
  },
  {
    id: 'pollachi',
    origin: 'Tiruppur',
    destinationEn: 'Pollachi & Valparai Gate',
    destinationTa: 'பொள்ளாச்சி',
    distanceKm: 72,
    durationEn: '1 hr 45 min',
    durationTa: '1 மணி 45 நிமிடம்',
    serviceType: 'outstation',
    noteEn: 'Scenic route via Palladam',
    noteTa: 'பல்லடம் வழியாக இனிமையான பயணம்',
  },
  {
    id: 'ooty',
    origin: 'Tiruppur',
    destinationEn: 'Ooty & Coonoor (Nilgiris)',
    destinationTa: 'ஊட்டி & குன்னூர் (நீலகிரி)',
    distanceKm: 122,
    durationEn: '3 hr 30 min',
    durationTa: '3 மணி 30 நிமிடம்',
    serviceType: 'outstation',
    noteEn: 'Experienced hill-route chauffeurs',
    noteTa: 'மலைப்பாதை அனுபவமிக்க ஓட்டுநர்கள்',
  },
  {
    id: 'madurai',
    origin: 'Tiruppur',
    destinationEn: 'Madurai Meenakshi Temple',
    destinationTa: 'மதுரை',
    distanceKm: 205,
    durationEn: '4 hr 15 min',
    durationTa: '4 மணி 15 நிமிடம்',
    serviceType: 'outstation',
    noteEn: 'Family & pilgrimage round trips',
    noteTa: 'குடும்ப மற்றும் ஆன்மீக சுற்றுலா',
  },
  {
    id: 'salem',
    origin: 'Tiruppur',
    destinationEn: 'Salem',
    destinationTa: 'சேலம்',
    distanceKm: 118,
    durationEn: '2 hr 20 min',
    durationTa: '2 மணி 20 நிமிடம்',
    serviceType: 'oneway-round',
    noteEn: 'NH-544 fast highway transfer',
    noteTa: 'NH-544 விரைவு நெடுஞ்சாலை பயணம்',
  },
  {
    id: 'chennai',
    origin: 'Tiruppur',
    destinationEn: 'Chennai',
    destinationTa: 'சென்னை',
    distanceKm: 455,
    durationEn: '7 hr 45 min',
    durationTa: '7 மணி 45 நிமிடம்',
    serviceType: 'outstation',
    noteEn: 'Long-distance executive sedan & SUV',
    noteTa: 'தொலைதூர சொகுசு செடான் & எஸ்யூவி',
  },
];
