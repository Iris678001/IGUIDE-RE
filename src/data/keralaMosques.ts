import { Mosque } from '../types/mosque';

export interface KeralaDistrictInfo {
  id: string;
  name: string;
  malayalamName: string;
  centerLat: number;
  centerLng: number;
}

export const KERALA_DISTRICTS: KeralaDistrictInfo[] = [
  { id: 'kozhikode', name: 'Kozhikode (Calicut)', malayalamName: 'കോഴിക്കോട്', centerLat: 11.2588, centerLng: 75.7804 },
  { id: 'malappuram', name: 'Malappuram', malayalamName: 'മലപ്പുറം', centerLat: 11.051, centerLng: 76.0711 },
  { id: 'ernakulam', name: 'Ernakulam / Kochi', malayalamName: 'എറണാകുളം / കൊച്ചി', centerLat: 9.9816, centerLng: 76.2999 },
  { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', malayalamName: 'തിരുവനന്തപുരം', centerLat: 8.5241, centerLng: 76.9366 },
  { id: 'thrissur', name: 'Thrissur', malayalamName: 'തൃശ്ശൂർ', centerLat: 10.5276, centerLng: 76.2144 },
  { id: 'kannur', name: 'Kannur', malayalamName: 'കണ്ണൂർ', centerLat: 11.8745, centerLng: 75.3704 },
  { id: 'kasaragod', name: 'Kasaragod', malayalamName: 'കാസർഗോഡ്', centerLat: 12.4996, centerLng: 74.9869 },
  { id: 'palakkad', name: 'Palakkad', malayalamName: 'പാലക്കാട്', centerLat: 10.7867, centerLng: 76.6548 },
  { id: 'kollam', name: 'Kollam', malayalamName: 'കൊല്ലം', centerLat: 8.8932, centerLng: 76.6141 },
  { id: 'alappuzha', name: 'Alappuzha', malayalamName: 'ആലപ്പുഴ', centerLat: 9.4981, centerLng: 76.3388 },
  { id: 'kottayam', name: 'Kottayam', malayalamName: 'കോട്ടയം', centerLat: 9.5916, centerLng: 76.5222 },
  { id: 'wayanad', name: 'Wayanad (Kalpetta)', malayalamName: 'വയനാട്', centerLat: 11.605, centerLng: 76.0828 },
  { id: 'idukki', name: 'Idukki (Thodupuzha)', malayalamName: 'ഇടുക്കി', centerLat: 9.8973, centerLng: 76.7136 },
  { id: 'pathanamthitta', name: 'Pathanamthitta', malayalamName: 'പത്തനംതിട്ട', centerLat: 9.2648, centerLng: 76.787 }
];

export const KERALA_GEO_BOUNDS = {
  minLat: 8.15,
  maxLat: 12.85,
  minLng: 74.8,
  maxLng: 77.5
};

export function isCoordinatesInKerala(lat: number, lng: number): boolean {
  return (
    lat >= KERALA_GEO_BOUNDS.minLat &&
    lat <= KERALA_GEO_BOUNDS.maxLat &&
    lng >= KERALA_GEO_BOUNDS.minLng &&
    lng <= KERALA_GEO_BOUNDS.maxLng
  );
}

export interface KeralaMosqueRecord extends Mosque {
  district: string;
  malayalamName?: string;
  historicSignificance?: string;
}

const DEFAULT_JAMAAH = {
  fajr: '05:30 AM',
  dhuhr: '01:15 PM',
  asr: '04:45 PM',
  maghrib: 'Sunset + 10m',
  isha: '08:00 PM',
  jummah: '01:15 PM'
};

export const KERALA_MOSQUES_DATASET: KeralaMosqueRecord[] = [
  // ==========================================
  // KOZHIKODE (CALICUT) DISTRICT
  // ==========================================
  {
    id: 'kl-clt-01',
    name: 'Mishkal Mosque (മിശ്കാൽ പള്ളി)',
    malayalamName: 'മിശ്കാൽ പള്ളി',
    district: 'Kozhikode',
    lat: 11.2384,
    lng: 75.7797,
    distanceKm: 0,
    address: 'Kuttichira, Kozhikode, Kerala 673001',
    historicSignificance: 'Historic 14th-century 4-tiered traditional wooden mosque built by Arab merchant Nakhooda Mishkal.',
    rating: 4.9,
    userRatingsTotal: 1850,
    openNow: true,
    phone: '+91 495 270 1234',
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-clt-02',
    name: 'Kuttichira Juma Masjid (കുറ്റിച്ചിറ വലിയ ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'കുറ്റിച്ചിറ വലിയ ജുമുഅ മസ്ജിദ്',
    district: 'Kozhikode',
    lat: 11.2392,
    lng: 75.7811,
    distanceKm: 0,
    address: 'Kuttichira, Halwa Bazaar, Kozhikode, Kerala 673001',
    historicSignificance: 'One of the largest traditional wooden Kerala mosques, holding over 1000 worshippers.',
    rating: 4.8,
    userRatingsTotal: 920,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-clt-03',
    name: 'Muchundi Mosque (മുച്ചുന്തി പള്ളി)',
    malayalamName: 'മുച്ചുന്തി പള്ളി',
    district: 'Kozhikode',
    lat: 11.2415,
    lng: 75.7801,
    distanceKm: 0,
    address: 'Kuttichira South, Kozhikode, Kerala 673001',
    historicSignificance: '13th-century mosque with historical granite slab inscriptions detailing royal grants from the Zamorin.',
    rating: 4.8,
    userRatingsTotal: 640,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-clt-04',
    name: 'Palayam Juma Masjid (പാളയം ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'പാളയം ജുമുഅ മസ്ജിദ് കോഴിക്കോട്',
    district: 'Kozhikode',
    lat: 11.2486,
    lng: 75.7845,
    distanceKm: 0,
    address: 'Palayam Junction, Kozhikode, Kerala 673002',
    rating: 4.7,
    userRatingsTotal: 880,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-clt-05',
    name: 'Calicut Stadium Juma Masjid (സ്റ്റേഡിയം ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'സ്റ്റേഡിയം ജുമുഅ മസ്ജിദ്',
    district: 'Kozhikode',
    lat: 11.2582,
    lng: 75.7852,
    distanceKm: 0,
    address: 'Rajaji Road, Near EMS Stadium, Kozhikode, Kerala 673004',
    rating: 4.7,
    userRatingsTotal: 1420,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-clt-06',
    name: 'Valiyangadi Juma Masjid (വലിയങ്ങാടി ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'വലിയങ്ങാടി ജുമുഅ മസ്ജിദ്',
    district: 'Kozhikode',
    lat: 11.2435,
    lng: 75.7762,
    distanceKm: 0,
    address: 'Valiyangadi, Old Merchant Street, Kozhikode, Kerala 673001',
    rating: 4.8,
    userRatingsTotal: 750,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-clt-07',
    name: 'Nadakkavu Town Juma Masjid (നടക്കാവ് ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'നടക്കാവ് ജുമുഅ മസ്ജിദ്',
    district: 'Kozhikode',
    lat: 11.2721,
    lng: 75.7785,
    distanceKm: 0,
    address: 'Vandipetta, Nadakkavu, Kozhikode, Kerala 673011',
    rating: 4.7,
    userRatingsTotal: 580,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-clt-08',
    name: 'Medical College Juma Masjid (മെഡിക്കൽ കോളേജ് മസ്ജിദ്)',
    malayalamName: 'മെഡിക്കൽ കോളേജ് ജുമുഅ മസ്ജിദ്',
    district: 'Kozhikode',
    lat: 11.2742,
    lng: 75.8365,
    distanceKm: 0,
    address: 'Medical College Campus, Kozhikode, Kerala 673008',
    rating: 4.8,
    userRatingsTotal: 1250,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-clt-09',
    name: 'Feroke Town Juma Masjid (ഫറോക്ക് ടൗൺ ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'ഫറോക്ക് ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Kozhikode',
    lat: 11.1782,
    lng: 75.8321,
    distanceKm: 0,
    address: 'Chungam, Feroke, Kozhikode, Kerala 673631',
    rating: 4.7,
    userRatingsTotal: 690,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-clt-10',
    name: 'Beypore Juma Masjid (ബേപ്പൂർ ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'ബേപ്പൂർ ജുമുഅ മസ്ജിദ്',
    district: 'Kozhikode',
    lat: 11.1824,
    lng: 75.8089,
    distanceKm: 0,
    address: 'Harbour Road, Beypore, Kozhikode, Kerala 673015',
    historicSignificance: 'Centuries-old port mosque adjacent to historic Uru ship-building harbor.',
    rating: 4.8,
    userRatingsTotal: 930,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-clt-11',
    name: 'Pavangad Juma Masjid (പാവങ്ങാട് ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'പാവങ്ങാട് ജുമുഅ മസ്ജിദ്',
    district: 'Kozhikode',
    lat: 11.3026,
    lng: 75.7609,
    distanceKm: 0,
    address: 'Old NH 66, Pavangad, Kozhikode, Kerala 673021',
    rating: 4.7,
    userRatingsTotal: 490,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-clt-12',
    name: 'Koyilandy Valiya Juma Masjid (കൊയിലാണ്ടി വലിയ ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'കൊയിലാണ്ടി വലിയ ജുമുഅ മസ്ജിദ്',
    district: 'Kozhikode',
    lat: 11.4421,
    lng: 75.6987,
    distanceKm: 0,
    address: 'Main Town, Koyilandy, Kozhikode, Kerala 673305',
    rating: 4.8,
    userRatingsTotal: 520,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-clt-13',
    name: 'Vadakara Town Juma Masjid (വടകര ടൗൺ ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'വടകര ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Kozhikode',
    lat: 11.6033,
    lng: 75.5891,
    distanceKm: 0,
    address: 'Old Bus Stand Road, Vadakara, Kozhikode, Kerala 673101',
    rating: 4.7,
    userRatingsTotal: 610,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-clt-14',
    name: 'Grand Juma Masjid Markaz Knowledge City',
    malayalamName: 'മർകസ് നോളജ് സിറ്റി ഗ്രാൻഡ് ജുമുഅ മസ്ജിദ്',
    district: 'Kozhikode',
    lat: 11.4589,
    lng: 75.9872,
    distanceKm: 0,
    address: 'Kaithapoyil, Calicut-Wayanad Highway, Kozhikode, Kerala 673580',
    historicSignificance: 'One of the grandest contemporary Islamic architectural marvels in South India.',
    rating: 4.9,
    userRatingsTotal: 3100,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },

  // ==========================================
  // ERNAKULAM / KOCHI DISTRICT
  // ==========================================
  {
    id: 'kl-ekm-01',
    name: 'Ernakulam Town Juma Masjid (Broadway)',
    malayalamName: 'എറണാകുളം ടൗൺ ജുമുഅ മസ്ജിദ് (ബ്രോഡ്‌വേ)',
    district: 'Ernakulam',
    lat: 9.9804,
    lng: 76.2798,
    distanceKm: 0,
    address: 'Broadway, Marine Drive, Kochi, Kerala 682031',
    historicSignificance: 'Centrally located on historic Broadway next to Marine Drive.',
    rating: 4.8,
    userRatingsTotal: 2200,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ekm-02',
    name: 'Kaloor Juma Masjid (കലൂർ ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'കലൂർ ജുമുഅ മസ്ജിദ്',
    district: 'Ernakulam',
    lat: 9.9982,
    lng: 76.2941,
    distanceKm: 0,
    address: 'Deshabhimani Road, Kaloor, Kochi, Kerala 682017',
    rating: 4.8,
    userRatingsTotal: 1950,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ekm-03',
    name: 'Palarivattom Juma Masjid (പാലാരിവട്ടം ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'പാലാരിവട്ടം ജുമുഅ മസ്ജിദ്',
    district: 'Ernakulam',
    lat: 10.0009,
    lng: 76.3017,
    distanceKm: 0,
    address: 'Banerji Road, Palarivattom Junction, Kochi, Kerala 682025',
    rating: 4.7,
    userRatingsTotal: 1100,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ekm-04',
    name: 'Edappally Toll Juma Masjid (ഇടപ്പള്ളി ടോൾ മസ്ജിദ്)',
    malayalamName: 'ഇടപ്പള്ളി ടോൾ ജുമുഅ മസ്ജിദ്',
    district: 'Ernakulam',
    lat: 10.0245,
    lng: 76.3121,
    distanceKm: 0,
    address: 'Near Lulu Mall, Edappally, Kochi, Kerala 682024',
    rating: 4.7,
    userRatingsTotal: 1680,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ekm-05',
    name: 'Kalamassery Central Juma Masjid (കളമശ്ശേരി മസ്ജിദ്)',
    malayalamName: 'കളമശ്ശേരി സെൻട്രൽ ജുമുഅ മസ്ജിദ്',
    district: 'Ernakulam',
    lat: 10.0462,
    lng: 76.3245,
    distanceKm: 0,
    address: 'Near CUSAT / Premier Junction, Kalamassery, Kerala 683104',
    rating: 4.8,
    userRatingsTotal: 940,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ekm-06',
    name: 'Kakkanad InfoPark Juma Masjid (കാക്കനാട് മസ്ജിദ്)',
    malayalamName: 'കാക്കനാട് ഇൻഫോപാർക്ക് ജുമുഅ മസ്ജിദ്',
    district: 'Ernakulam',
    lat: 10.016,
    lng: 76.3545,
    distanceKm: 0,
    address: 'InfoPark-Karimugal Road, Kakkanad, Kochi, Kerala 682030',
    rating: 4.8,
    userRatingsTotal: 1350,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ekm-07',
    name: 'Aluva Central Town Juma Masjid (ആലുവ മസ്ജിദ്)',
    malayalamName: 'ആലുവ സെൻട്രൽ ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Ernakulam',
    lat: 10.1082,
    lng: 76.3538,
    distanceKm: 0,
    address: 'Bank Road, Periyar Riverbank, Aluva, Kerala 683101',
    rating: 4.8,
    userRatingsTotal: 1400,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ekm-08',
    name: 'Kochangadi Juma Masjid (കൊച്ചങ്ങാടി ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'കൊച്ചങ്ങാടി ജുമുഅ മസ്ജിദ്',
    district: 'Ernakulam',
    lat: 9.9542,
    lng: 76.2575,
    distanceKm: 0,
    address: 'Kochangadi, Mattancherry, Kochi, Kerala 682002',
    historicSignificance: 'Built in 1345 CE, one of the oldest in Kochi.',
    rating: 4.8,
    userRatingsTotal: 840,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ekm-09',
    name: 'Fort Kochi Chembittapally (ചെമ്പിട്ടപ്പള്ളി)',
    malayalamName: 'ഫോർട്ട് കൊച്ചി ചെമ്പിട്ടപ്പള്ളി',
    district: 'Ernakulam',
    lat: 9.9612,
    lng: 76.2425,
    distanceKm: 0,
    address: 'Palace Road, Mattancherry, Kochi, Kerala 682002',
    historicSignificance: 'Famous for its historic copper-plated roof ("Chembitta") and timber carvings.',
    rating: 4.8,
    userRatingsTotal: 1100,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ekm-10',
    name: 'Vyttila Town Juma Masjid (വൈറ്റില ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'വൈറ്റില ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Ernakulam',
    lat: 9.9682,
    lng: 76.3185,
    distanceKm: 0,
    address: 'Near Vyttila Mobility Hub, Kochi, Kerala 682019',
    rating: 4.7,
    userRatingsTotal: 960,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ekm-11',
    name: 'Perumbavoor Central Juma Masjid (പെരുമ്പാവൂർ മസ്ജിദ്)',
    malayalamName: 'പെരുമ്പാവൂർ സെൻട്രൽ ജുമുഅ മസ്ജിദ്',
    district: 'Ernakulam',
    lat: 10.1142,
    lng: 76.4789,
    distanceKm: 0,
    address: 'MC Road, Perumbavoor, Ernakulam, Kerala 683542',
    rating: 4.8,
    userRatingsTotal: 1150,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ekm-12',
    name: 'Muvattupuzha Central Juma Masjid (മൂവാറ്റുപുഴ മസ്ജിദ്)',
    malayalamName: 'മൂവാറ്റുപുഴ സെൻട്രൽ ജുമുഅ മസ്ജിദ്',
    district: 'Ernakulam',
    lat: 9.9821,
    lng: 76.5784,
    distanceKm: 0,
    address: 'Kavumkara, Muvattupuzha, Kerala 686661',
    rating: 4.8,
    userRatingsTotal: 870,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },

  // ==========================================
  // MALAPPURAM DISTRICT
  // ==========================================
  {
    id: 'kl-mlp-01',
    name: 'Ponnani Valiya Juma Masjid (പൊന്നാനി വലിയ ജുമുഅ മസ്ജിദ്)',
    malayalamName: 'പൊന്നാനി വലിയ ജുമുഅ മസ്ജിദ്',
    district: 'Malappuram',
    lat: 10.7712,
    lng: 75.9254,
    distanceKm: 0,
    address: 'Ponnani South, Malappuram, Kerala 679577',
    historicSignificance: 'Famous as the "Little Mecca of Malabar", built around 1519 by Sheikh Zainuddin Makhdum I.',
    rating: 4.9,
    userRatingsTotal: 2900,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-mlp-02',
    name: 'Mamburam Maqam & Juma Masjid (മമ്പുറം പള്ളി)',
    malayalamName: 'മമ്പുറം മഖാം ജുമുഅ മസ്ജിദ്',
    district: 'Malappuram',
    lat: 11.0456,
    lng: 75.9682,
    distanceKm: 0,
    address: 'Mamburam, Tirurangadi, Malappuram, Kerala 676306',
    historicSignificance: 'Spiritual beacon founded by Sayyid Alavi Thangal in the 18th century.',
    rating: 4.9,
    userRatingsTotal: 4100,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-mlp-03',
    name: 'Malappuram Valiya Juma Masjid (മലപ്പുറം വലിയ പള്ളി)',
    malayalamName: 'മലപ്പുറം വലിയ ജുമുഅ മസ്ജിദ്',
    district: 'Malappuram',
    lat: 11.0722,
    lng: 76.0745,
    distanceKm: 0,
    address: 'Down Hill, Malappuram, Kerala 676505',
    rating: 4.8,
    userRatingsTotal: 1750,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-mlp-04',
    name: 'Manjeri Town Valiya Juma Masjid (മഞ്ചേരി ടൗൺ പള്ളി)',
    malayalamName: 'മഞ്ചേരി ടൗൺ വലിയ ജുമുഅ മസ്ജിദ്',
    district: 'Malappuram',
    lat: 11.1215,
    lng: 76.1205,
    distanceKm: 0,
    address: 'Kacherippadi, Manjeri, Malappuram, Kerala 676121',
    rating: 4.8,
    userRatingsTotal: 1200,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-mlp-05',
    name: 'Tirur Town Central Juma Masjid (തിരൂർ ടൗൺ പള്ളി)',
    malayalamName: 'തിരൂർ ടൗൺ സെൻട്രൽ ജുമുഅ മസ്ജിദ്',
    district: 'Malappuram',
    lat: 10.9167,
    lng: 75.9248,
    distanceKm: 0,
    address: 'Near Railway Station, Tirur, Malappuram, Kerala 676101',
    rating: 4.7,
    userRatingsTotal: 980,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-mlp-06',
    name: 'Kondotty Pazhayangadi Mosque (കൊണ്ടോട്ടി പഴയങ്ങാടി പള്ളി)',
    malayalamName: 'കൊണ്ടോട്ടി പഴയങ്ങാടി ജുമുഅ മസ്ജിദ്',
    district: 'Malappuram',
    lat: 11.1481,
    lng: 75.9628,
    distanceKm: 0,
    address: 'Pazhayangadi, Kondotty, Malappuram, Kerala 673638',
    historicSignificance: '500-year-old Mughal architectural style mosque.',
    rating: 4.8,
    userRatingsTotal: 1600,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-mlp-07',
    name: 'Kottakkal Town Juma Masjid (കോട്ടക്കൽ ടൗൺ മസ്ജിദ്)',
    malayalamName: 'കോട്ടക്കൽ ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Malappuram',
    lat: 11.0012,
    lng: 75.9984,
    distanceKm: 0,
    address: 'Changuvetty, Kottakkal, Malappuram, Kerala 676503',
    rating: 4.8,
    userRatingsTotal: 1050,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-mlp-08',
    name: 'Perinthalmanna Town Juma Masjid (പെരിന്തൽമണ്ണ പള്ളി)',
    malayalamName: 'പെരിന്തൽമണ്ണ ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Malappuram',
    lat: 10.9764,
    lng: 76.2251,
    distanceKm: 0,
    address: 'Bypass Junction, Perinthalmanna, Malappuram, Kerala 679322',
    rating: 4.7,
    userRatingsTotal: 840,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-mlp-09',
    name: 'Nilambur Central Juma Masjid (നിലമ്പൂർ സെൻട്രൽ പള്ളി)',
    malayalamName: 'നിലമ്പൂർ സെൻട്രൽ ജുമുഅ മസ്ജിദ്',
    district: 'Malappuram',
    lat: 11.2782,
    lng: 76.2285,
    distanceKm: 0,
    address: 'Main Town, Nilambur, Malappuram, Kerala 679329',
    rating: 4.8,
    userRatingsTotal: 730,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-mlp-10',
    name: 'Tanur Town Juma Masjid (താനൂർ ടൗൺ പള്ളി)',
    malayalamName: 'താനൂർ ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Malappuram',
    lat: 10.9745,
    lng: 75.8652,
    distanceKm: 0,
    address: 'Harbour Road, Tanur, Malappuram, Kerala 676302',
    rating: 4.7,
    userRatingsTotal: 620,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },

  // ==========================================
  // THRISSUR DISTRICT
  // ==========================================
  {
    id: 'kl-tsr-01',
    name: 'Cheraman Juma Masjid (ചേരമാൻ ജുമാ മസ്ജിദ്)',
    malayalamName: 'ചേരമാൻ ജുമാ മസ്ജിദ്',
    district: 'Thrissur',
    lat: 10.2163,
    lng: 76.1989,
    distanceKm: 0,
    address: 'Methala, Kodungallur, Thrissur, Kerala 680664',
    historicSignificance: 'Built in 629 CE by Malik Deenar, recognized as the very first mosque in India.',
    rating: 4.9,
    userRatingsTotal: 6200,
    openNow: true,
    phone: '+91 480 280 3170',
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-tsr-02',
    name: 'Thrissur City Juma Masjid (തൃശ്ശൂർ സിറ്റി പള്ളി)',
    malayalamName: 'തൃശ്ശൂർ സിറ്റി ജുമുഅ മസ്ജിദ്',
    district: 'Thrissur',
    lat: 10.5235,
    lng: 76.2165,
    distanceKm: 0,
    address: 'Post Office Road, Round South, Thrissur, Kerala 680001',
    rating: 4.7,
    userRatingsTotal: 1100,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-tsr-03',
    name: 'Chavakkad Manathala Juma Masjid (മണത്തല പള്ളി)',
    malayalamName: 'ചാവക്കാട് മണത്തല ജുമുഅ മസ്ജിദ്',
    district: 'Thrissur',
    lat: 10.5841,
    lng: 76.0245,
    distanceKm: 0,
    address: 'Manathala, Chavakkad, Thrissur, Kerala 680506',
    historicSignificance: 'Historic coastal shrine and mosque famous for communal harmony.',
    rating: 4.8,
    userRatingsTotal: 960,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-tsr-04',
    name: 'Guruvayur Juma Masjid (Chowghat)',
    malayalamName: 'ഗുരുവായൂർ ജുമുഅ മസ്ജിദ്',
    district: 'Thrissur',
    lat: 10.5962,
    lng: 76.0421,
    distanceKm: 0,
    address: 'West Nada Road, Guruvayur, Thrissur, Kerala 680101',
    rating: 4.7,
    userRatingsTotal: 730,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-tsr-05',
    name: 'Chalakudy Town Juma Masjid (ചാലക്കുടി ടൗൺ പള്ളി)',
    malayalamName: 'ചാലക്കുടി ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Thrissur',
    lat: 10.3082,
    lng: 76.3325,
    distanceKm: 0,
    address: 'Railway Station Road, Chalakudy, Thrissur, Kerala 680307',
    rating: 4.7,
    userRatingsTotal: 580,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-tsr-06',
    name: 'Kunnamkulam Town Juma Masjid (കുന്നത്ത് പള്ളി)',
    malayalamName: 'കുന്നത്ത് ജുമുഅ മസ്ജിദ് കുന്നംകുളം',
    district: 'Thrissur',
    lat: 10.6512,
    lng: 76.0684,
    distanceKm: 0,
    address: 'Main Road, Kunnamkulam, Thrissur, Kerala 680503',
    rating: 4.7,
    userRatingsTotal: 640,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },

  // ==========================================
  // THIRUVANANTHAPURAM (TRIVANDRUM) DISTRICT
  // ==========================================
  {
    id: 'kl-tvm-01',
    name: 'Palayam Juma Masjid (Masjid-i Jahan-Numa)',
    malayalamName: 'പാളയം ജുമാ മസ്ജിദ് തിരുവനന്തപുരം',
    district: 'Thiruvananthapuram',
    lat: 8.5028,
    lng: 76.9503,
    distanceKm: 0,
    address: 'Palayam Junction, Opp. Secretariat, Thiruvananthapuram, Kerala 695033',
    historicSignificance: 'Major landmark mosque established in 1813; icon of religious harmony adjacent to a church and temple.',
    rating: 4.9,
    userRatingsTotal: 3400,
    openNow: true,
    phone: '+91 471 247 2200',
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-tvm-02',
    name: 'Beemapally Dargah Shareef & Mosque (ബീമാപള്ളി)',
    malayalamName: 'ബീമാപള്ളി ദർഗ്ഗാ ഷെരീഫ്',
    district: 'Thiruvananthapuram',
    lat: 8.4552,
    lng: 76.9318,
    distanceKm: 0,
    address: 'Beemapally, Vallakkadavu PO, Thiruvananthapuram, Kerala 695008',
    historicSignificance: 'Famous pilgrim shrine of Syedunnisa Beema Beevi right on the Arabian seashore.',
    rating: 4.8,
    userRatingsTotal: 5100,
    openNow: true,
    phone: '+91 471 250 1888',
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-tvm-03',
    name: 'Kazhakkoottam Juma Masjid (കഴക്കൂട്ടം പള്ളി)',
    malayalamName: 'കഴക്കൂട്ടം ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Thiruvananthapuram',
    lat: 8.5684,
    lng: 76.8712,
    distanceKm: 0,
    address: 'Near Technopark Campus, Kazhakkoottam, Thiruvananthapuram, Kerala 695582',
    rating: 4.8,
    userRatingsTotal: 1450,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-tvm-04',
    name: 'Chalai Bazar Juma Masjid (ചാല വലിയ പള്ളി)',
    malayalamName: 'ചാല വലിയ ജുമുഅ മസ്ജിദ്',
    district: 'Thiruvananthapuram',
    lat: 8.4842,
    lng: 76.9545,
    distanceKm: 0,
    address: 'Chalai Market Road, Thiruvananthapuram, Kerala 695036',
    rating: 4.7,
    userRatingsTotal: 820,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-tvm-05',
    name: 'Attingal Town Juma Masjid (ആറ്റിങ്ങൽ പള്ളി)',
    malayalamName: 'ആറ്റിങ്ങൽ ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Thiruvananthapuram',
    lat: 8.6948,
    lng: 76.8152,
    distanceKm: 0,
    address: 'Kacheri Junction, Attingal, Thiruvananthapuram, Kerala 695101',
    rating: 4.7,
    userRatingsTotal: 580,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-tvm-06',
    name: 'Nedumangad Muslim Jamaath Mosque (നെടുമങ്ങാട് പള്ളി)',
    malayalamName: 'നെടുമങ്ങാട് മുസ്ലിം ജമാഅത്ത് പള്ളി',
    district: 'Thiruvananthapuram',
    lat: 8.6012,
    lng: 76.9984,
    distanceKm: 0,
    address: 'Market Junction, Nedumangad, Thiruvananthapuram, Kerala 695541',
    rating: 4.7,
    userRatingsTotal: 650,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-tvm-07',
    name: 'Vizhinjam Muslim Jamaath Old Mosque (വിഴിഞ്ഞം പള്ളി)',
    malayalamName: 'വിഴിഞ്ഞം മുസ്ലിം ജമാഅത്ത് പഴയ പള്ളി',
    district: 'Thiruvananthapuram',
    lat: 8.3789,
    lng: 76.9932,
    distanceKm: 0,
    address: 'Harbour Road, Vizhinjam Port, Thiruvananthapuram, Kerala 695521',
    rating: 4.8,
    userRatingsTotal: 870,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },

  // ==========================================
  // KANNUR DISTRICT
  // ==========================================
  {
    id: 'kl-knr-01',
    name: 'Madayi Mosque (മാടായി പള്ളി - മാലിക് ദീനാർ പള്ളി)',
    malayalamName: 'മാടായി പള്ളി',
    district: 'Kannur',
    lat: 12.0321,
    lng: 75.2594,
    distanceKm: 0,
    address: 'Pazhayangadi, Madayi, Kannur, Kerala 670303',
    historicSignificance: 'Founded in 1124 CE by Malik Ibn Dinar.',
    rating: 4.9,
    userRatingsTotal: 1950,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-knr-02',
    name: 'Kannur City Juma Masjid (കണ്ണൂർ സിറ്റി പള്ളി)',
    malayalamName: 'കണ്ണൂർ സിറ്റി ജുമുഅ മസ്ജിദ്',
    district: 'Kannur',
    lat: 11.8624,
    lng: 75.3789,
    distanceKm: 0,
    address: 'City Road, Near Arakkal Palace, Kannur, Kerala 670003',
    historicSignificance: 'Adjacent to the historic royal residence of the Arakkal Kingdom.',
    rating: 4.8,
    userRatingsTotal: 1350,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-knr-03',
    name: 'Thalassery Stadium Juma Masjid (തലശ്ശേരി പള്ളി)',
    malayalamName: 'തലശ്ശേരി സ്റ്റേഡിയം ജുമുഅ മസ്ജിദ്',
    district: 'Kannur',
    lat: 11.7512,
    lng: 75.4921,
    distanceKm: 0,
    address: 'Near Municipal Stadium, Thalassery, Kannur, Kerala 670101',
    rating: 4.8,
    userRatingsTotal: 1020,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-knr-04',
    name: 'Payyanur Central Juma Masjid (പയ്യന്നൂർ സെൻട്രൽ പള്ളി)',
    malayalamName: 'പയ്യന്നൂർ സെൻട്രൽ ജുമുഅ മസ്ജിദ്',
    district: 'Kannur',
    lat: 12.1025,
    lng: 75.2041,
    distanceKm: 0,
    address: 'Main Town, Payyanur, Kannur, Kerala 670307',
    rating: 4.7,
    userRatingsTotal: 690,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-knr-05',
    name: 'Valapattanam Valiya Juma Masjid (വളപട്ടണം പള്ളി)',
    malayalamName: 'വളപട്ടണം വലിയ ജുമുഅ മസ്ജിദ്',
    district: 'Kannur',
    lat: 11.9142,
    lng: 75.3612,
    distanceKm: 0,
    address: 'Valapattanam Riverbank, Kannur, Kerala 670010',
    rating: 4.8,
    userRatingsTotal: 880,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },

  // ==========================================
  // KASARAGOD DISTRICT
  // ==========================================
  {
    id: 'kl-ksd-01',
    name: 'Malik Dinar Grand Mosque (മാലിക് ദീനാർ പള്ളി)',
    malayalamName: 'മാലിക് ദീനാർ പള്ളി',
    district: 'Kasaragod',
    lat: 12.4862,
    lng: 74.9812,
    distanceKm: 0,
    address: 'Thalangara, Kasaragod, Kerala 671122',
    historicSignificance: 'One of India\'s most revered historic mosques built by Malik Dinar.',
    rating: 4.9,
    userRatingsTotal: 3800,
    openNow: true,
    phone: '+91 4994 220 540',
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ksd-02',
    name: 'Kasaragod Theruvath Juma Masjid (തെരുവത്ത് പള്ളി)',
    malayalamName: 'കാസർഗോഡ് തെരുവത്ത് ജുമുഅ മസ്ജിദ്',
    district: 'Kasaragod',
    lat: 12.5015,
    lng: 74.9924,
    distanceKm: 0,
    address: 'Theruvath, Kasaragod, Kerala 671121',
    rating: 4.7,
    userRatingsTotal: 820,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ksd-03',
    name: 'Kanhangad Central Juma Masjid (കാഞ്ഞങ്ങാട് പള്ളി)',
    malayalamName: 'കാഞ്ഞങ്ങാട് സെൻട്രൽ ജുമുഅ മസ്ജിദ്',
    district: 'Kasaragod',
    lat: 12.3125,
    lng: 75.0932,
    distanceKm: 0,
    address: 'Kailas Nagar, Kanhangad, Kasaragod, Kerala 671315',
    rating: 4.8,
    userRatingsTotal: 770,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ksd-04',
    name: 'Uppala Town Juma Masjid (ഉപ്പള പള്ളി)',
    malayalamName: 'ഉപ്പള ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Kasaragod',
    lat: 12.6842,
    lng: 74.9012,
    distanceKm: 0,
    address: 'NH 66, Uppala, Kasaragod, Kerala 671322',
    rating: 4.7,
    userRatingsTotal: 590,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },

  // ==========================================
  // PALAKKAD DISTRICT
  // ==========================================
  {
    id: 'kl-pkd-01',
    name: 'Palakkad Town Valiya Juma Masjid (പാലക്കാട് വലിയ പള്ളി)',
    malayalamName: 'പാലക്കാട് ടൗൺ വലിയ ജുമുഅ മസ്ജിദ്',
    district: 'Palakkad',
    lat: 10.7785,
    lng: 76.6521,
    distanceKm: 0,
    address: 'Big Bazaar, Palakkad, Kerala 678001',
    rating: 4.8,
    userRatingsTotal: 1280,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-pkd-02',
    name: 'Ottapalam Town Juma Masjid (ഒറ്റപ്പാലം പള്ളി)',
    malayalamName: 'ഒറ്റപ്പാലം ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Palakkad',
    lat: 10.7715,
    lng: 76.3812,
    distanceKm: 0,
    address: 'Main Road, Ottapalam, Palakkad, Kerala 679101',
    rating: 4.7,
    userRatingsTotal: 690,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-pkd-03',
    name: 'Pattambi Town Juma Masjid (പട്ടാമ്പി പള്ളി)',
    malayalamName: 'പട്ടാമ്പി ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Palakkad',
    lat: 10.8062,
    lng: 76.1954,
    distanceKm: 0,
    address: 'Nila Bank Road, Pattambi, Palakkad, Kerala 679303',
    rating: 4.8,
    userRatingsTotal: 910,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-pkd-04',
    name: 'Mannarkkad Central Juma Masjid (മണ്ണാർക്കാട് പള്ളി)',
    malayalamName: 'മണ്ണാർക്കാട് സെൻട്രൽ ജുമുഅ മസ്ജിദ്',
    district: 'Palakkad',
    lat: 10.9912,
    lng: 76.4589,
    distanceKm: 0,
    address: 'Tipu Sultan Road, Mannarkkad, Palakkad, Kerala 678582',
    rating: 4.7,
    userRatingsTotal: 620,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },

  // ==========================================
  // KOLLAM DISTRICT
  // ==========================================
  {
    id: 'kl-klm-01',
    name: 'Jonakapuram Valiya Pally (ജോനകപുറം വലിയ പള്ളി)',
    malayalamName: 'ജോനകപുറം വലിയ പള്ളി',
    district: 'Kollam',
    lat: 8.8789,
    lng: 76.5921,
    distanceKm: 0,
    address: 'Jonakapuram, Pallithottam, Kollam, Kerala 691006',
    historicSignificance: 'One of the oldest mosques in southern Kerala dating back to the Arab maritime traders.',
    rating: 4.8,
    userRatingsTotal: 1450,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-klm-02',
    name: 'Karunagappally Central Juma Masjid (കരുനാഗപ്പള്ളി പള്ളി)',
    malayalamName: 'കരുനാഗപ്പള്ളി സെൻട്രൽ ജുമുഅ മസ്ജിദ്',
    district: 'Kollam',
    lat: 9.0541,
    lng: 76.5389,
    distanceKm: 0,
    address: 'Lalaji Junction, Karunagappally, Kollam, Kerala 690518',
    rating: 4.7,
    userRatingsTotal: 830,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-klm-03',
    name: 'Kollam Chinnakkada Town Juma Masjid',
    malayalamName: 'ചിന്നക്കട ടൗൺ ജുമുഅ മസ്ജിദ് കൊല്ലം',
    district: 'Kollam',
    lat: 8.8874,
    lng: 76.6012,
    distanceKm: 0,
    address: 'Chinnakkada Clock Tower Junction, Kollam, Kerala 691001',
    rating: 4.7,
    userRatingsTotal: 1040,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-klm-04',
    name: 'Oachira Town Juma Masjid (ഓച്ചിറ പള്ളി)',
    malayalamName: 'ഓച്ചിറ ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Kollam',
    lat: 9.1245,
    lng: 76.5089,
    distanceKm: 0,
    address: 'NH 66, Oachira, Kollam, Kerala 690526',
    rating: 4.7,
    userRatingsTotal: 520,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },

  // ==========================================
  // ALAPPUZHA DISTRICT
  // ==========================================
  {
    id: 'kl-alp-01',
    name: 'Alappuzha Zakariya Bazar Juma Masjid',
    malayalamName: 'സക്കരിയ്യ ബസാർ ജുമുഅ മസ്ജിദ്',
    district: 'Alappuzha',
    lat: 9.4921,
    lng: 76.3278,
    distanceKm: 0,
    address: 'Zakariya Bazar, Alappuzha, Kerala 688012',
    historicSignificance: 'Built in the 18th century as part of planning the commercial port town.',
    rating: 4.8,
    userRatingsTotal: 1350,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-alp-02',
    name: 'Kayamkulam Town Juma Masjid (കായംകുളം പള്ളി)',
    malayalamName: 'കായംകുളം ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Alappuzha',
    lat: 9.1745,
    lng: 76.5021,
    distanceKm: 0,
    address: 'Town Hall Road, Kayamkulam, Alappuzha, Kerala 690502',
    rating: 4.7,
    userRatingsTotal: 790,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-alp-03',
    name: 'Mavelikkara Town Juma Masjid (മാവേലിക്കര പള്ളി)',
    malayalamName: 'മാവേലിക്കര ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Alappuzha',
    lat: 9.2712,
    lng: 76.5489,
    distanceKm: 0,
    address: 'Court Road, Mavelikkara, Alappuzha, Kerala 690101',
    rating: 4.7,
    userRatingsTotal: 460,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },

  // ==========================================
  // KOTTAYAM DISTRICT
  // ==========================================
  {
    id: 'kl-ktm-01',
    name: 'Thazhathangady Juma Masjid (താഴത്തങ്ങാടി ജുമാ മസ്ജിദ്)',
    malayalamName: 'താഴത്തങ്ങാടി ജുമാ മസ്ജിദ്',
    district: 'Kottayam',
    lat: 9.5842,
    lng: 76.5098,
    distanceKm: 0,
    address: 'Thazhathangady, Meenachil Riverbank, Kottayam, Kerala 686005',
    historicSignificance: 'Over 1000 years old, one of the most stunning heritage wooden mosques in Kerala.',
    rating: 4.9,
    userRatingsTotal: 2800,
    openNow: true,
    phone: '+91 481 258 1140',
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ktm-02',
    name: 'Changanassery Puthoorpally Muslim Jamaath',
    malayalamName: 'ചങ്ങനാശ്ശേരി പുതൂർപ്പള്ളി മുസ്ലിം ജമാഅത്ത്',
    district: 'Kottayam',
    lat: 9.4452,
    lng: 76.5412,
    distanceKm: 0,
    address: 'Puthoorpally, Changanassery, Kottayam, Kerala 686101',
    historicSignificance: 'Centuries-old heritage mosque known for Chandanakudam festival.',
    rating: 4.8,
    userRatingsTotal: 1540,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ktm-03',
    name: 'Erattupetta Valiya Juma Masjid (ഈരാറ്റുപേട്ട വലിയ പള്ളി)',
    malayalamName: 'ഈരാറ്റുപേട്ട വലിയ ജുമുഅ മസ്ജിദ്',
    district: 'Kottayam',
    lat: 9.6912,
    lng: 76.7825,
    distanceKm: 0,
    address: 'Main Town, Erattupetta, Kottayam, Kerala 686121',
    rating: 4.8,
    userRatingsTotal: 1680,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-ktm-04',
    name: 'Kanjirappally Nainar Juma Masjid (കാഞ്ഞിരപ്പള്ളി പള്ളി)',
    malayalamName: 'കാഞ്ഞിരപ്പള്ളി നൈനാർ ജുമുഅ മസ്ജിദ്',
    district: 'Kottayam',
    lat: 9.5541,
    lng: 76.7845,
    distanceKm: 0,
    address: 'Petta, Kanjirappally, Kottayam, Kerala 686507',
    rating: 4.7,
    userRatingsTotal: 620,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },

  // ==========================================
  // WAYANAD DISTRICT
  // ==========================================
  {
    id: 'kl-wyd-01',
    name: 'Kalpetta Town Central Juma Masjid (കൽപ്പറ്റ പള്ളി)',
    malayalamName: 'കൽപ്പറ്റ ടൗൺ സെൻട്രൽ ജുമുഅ മസ്ജിദ്',
    district: 'Wayanad',
    lat: 11.6082,
    lng: 76.0845,
    distanceKm: 0,
    address: 'Main Road, Kalpetta, Wayanad, Kerala 673121',
    rating: 4.8,
    userRatingsTotal: 1250,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-wyd-02',
    name: 'Sulthan Bathery Town Juma Masjid (ബത്തേരി പള്ളി)',
    malayalamName: 'സുൽത്താൻ ബത്തേരി ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Wayanad',
    lat: 11.6625,
    lng: 76.2584,
    distanceKm: 0,
    address: 'Chungam, Sulthan Bathery, Wayanad, Kerala 673592',
    rating: 4.7,
    userRatingsTotal: 840,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-wyd-03',
    name: 'Mananthavady Town Juma Masjid (മാനന്തവാടി പള്ളി)',
    malayalamName: 'മാനന്തവാടി ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Wayanad',
    lat: 11.8021,
    lng: 76.0028,
    distanceKm: 0,
    address: 'Valliyoorkavu Road, Mananthavady, Wayanad, Kerala 670645',
    rating: 4.7,
    userRatingsTotal: 670,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },

  // ==========================================
  // IDUKKI DISTRICT
  // ==========================================
  {
    id: 'kl-idk-01',
    name: 'Thodupuzha Town Juma Masjid (തൊടുപുഴ പള്ളി)',
    malayalamName: 'തൊടുപുഴ ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Idukki',
    lat: 9.8962,
    lng: 76.7112,
    distanceKm: 0,
    address: 'River Bridge Road, Thodupuzha, Idukki, Kerala 685584',
    rating: 4.8,
    userRatingsTotal: 930,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-idk-02',
    name: 'Munnar Town Muslim Jamaath Mosque (മൂന്നാർ പള്ളി)',
    malayalamName: 'മൂന്നാർ ടൗൺ മുസ്ലിം ജമാഅത്ത് പള്ളി',
    district: 'Idukki',
    lat: 10.0889,
    lng: 77.0621,
    distanceKm: 0,
    address: 'Bazaar Road, Munnar Hill Station, Idukki, Kerala 685612',
    rating: 4.8,
    userRatingsTotal: 1150,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-idk-03',
    name: 'Adimali Central Juma Masjid (അടിമാലി പള്ളി)',
    malayalamName: 'അടിമാലി സെൻട്രൽ ജുമുഅ മസ്ജിദ്',
    district: 'Idukki',
    lat: 10.0412,
    lng: 76.9542,
    distanceKm: 0,
    address: 'NH 85, Adimali, Idukki, Kerala 685561',
    rating: 4.7,
    userRatingsTotal: 510,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },

  // ==========================================
  // PATHANAMTHITTA DISTRICT
  // ==========================================
  {
    id: 'kl-pta-01',
    name: 'Pathanamthitta Town Central Juma Masjid',
    malayalamName: 'പത്തനംതിട്ട ടൗൺ സെൻട്രൽ ജുമുഅ മസ്ജിദ്',
    district: 'Pathanamthitta',
    lat: 9.2652,
    lng: 76.7865,
    distanceKm: 0,
    address: 'Ring Road, Pathanamthitta, Kerala 689645',
    rating: 4.7,
    userRatingsTotal: 680,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-pta-02',
    name: 'Adoor Town Juma Masjid (അടൂർ പള്ളി)',
    malayalamName: 'അടൂർ ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Pathanamthitta',
    lat: 9.1582,
    lng: 76.7321,
    distanceKm: 0,
    address: 'Central Junction, Adoor, Pathanamthitta, Kerala 691523',
    rating: 4.7,
    userRatingsTotal: 540,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  },
  {
    id: 'kl-pta-03',
    name: 'Pandalam Town Juma Masjid (പന്തളം പള്ളി)',
    malayalamName: 'പന്തളം ടൗൺ ജുമുഅ മസ്ജിദ്',
    district: 'Pathanamthitta',
    lat: 9.2312,
    lng: 76.6784,
    distanceKm: 0,
    address: 'MC Road, Pandalam, Pathanamthitta, Kerala 689501',
    rating: 4.7,
    userRatingsTotal: 490,
    openNow: true,
    jamaahTimes: DEFAULT_JAMAAH
  }
];
