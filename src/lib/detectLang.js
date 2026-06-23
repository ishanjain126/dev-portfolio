// Pick one of our supported languages from where the computer is.
// Offline-first: the OS timezone is a country signal that needs no network or
// permission; the browser's preferred language is the fallback. A separate hook
// (useAutoLanguage) can refine this with an actual IP-country lookup.
export const SUPPORTED = ['en', 'it', 'fr', 'de', 'ar']

// ISO-3166 country → our language. Everything not listed falls back to English.
const COUNTRY_LANG = {
  IT: 'it', SM: 'it', VA: 'it',
  FR: 'fr', BE: 'fr', MC: 'fr', LU: 'fr', SN: 'fr', CI: 'fr', ML: 'fr', CD: 'fr',
  CM: 'fr', CG: 'fr', GA: 'fr', BJ: 'fr', BF: 'fr', NE: 'fr', TG: 'fr', GN: 'fr', HT: 'fr', MG: 'fr',
  DE: 'de', AT: 'de', LI: 'de', CH: 'de',
  SA: 'ar', AE: 'ar', EG: 'ar', QA: 'ar', KW: 'ar', BH: 'ar', OM: 'ar', JO: 'ar', LB: 'ar',
  IQ: 'ar', SY: 'ar', YE: 'ar', LY: 'ar', TN: 'ar', DZ: 'ar', MA: 'ar', SD: 'ar', PS: 'ar', MR: 'ar',
}
export function langFromCountry(cc) {
  return COUNTRY_LANG[(cc || '').toUpperCase()] || 'en'
}

// A curated timezone → language map (covers the countries for our 4 non-English
// languages). Anything else returns null so we fall through to the browser pref.
const TZ_LANG = {
  'Europe/Rome': 'it',
  'Europe/Paris': 'fr', 'Europe/Brussels': 'fr', 'Europe/Monaco': 'fr', 'Europe/Luxembourg': 'fr', 'Africa/Dakar': 'fr', 'Africa/Abidjan': 'fr', 'Indian/Antananarivo': 'fr',
  'Europe/Berlin': 'de', 'Europe/Vienna': 'de', 'Europe/Zurich': 'de', 'Europe/Busingen': 'de', 'Europe/Vaduz': 'de',
  'Asia/Riyadh': 'ar', 'Asia/Dubai': 'ar', 'Africa/Cairo': 'ar', 'Asia/Qatar': 'ar', 'Asia/Kuwait': 'ar', 'Asia/Bahrain': 'ar',
  'Asia/Baghdad': 'ar', 'Asia/Amman': 'ar', 'Asia/Beirut': 'ar', 'Asia/Damascus': 'ar', 'Asia/Muscat': 'ar', 'Asia/Aden': 'ar',
  'Africa/Tunis': 'ar', 'Africa/Algiers': 'ar', 'Africa/Tripoli': 'ar', 'Africa/Khartoum': 'ar', 'Africa/Casablanca': 'ar', 'Africa/El_Aaiun': 'ar',
}
export function langFromTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (TZ_LANG[tz]) return TZ_LANG[tz]
  } catch (e) { /* ignore */ }
  return null
}

export function langFromNavigator() {
  try {
    const list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en']
    for (const l of list) {
      const base = (l || '').toLowerCase().split('-')[0]
      if (SUPPORTED.includes(base)) return base
    }
  } catch (e) { /* ignore */ }
  return null
}

// Instant, no-network best guess. Country (via timezone) wins over browser pref,
// matching "what country the computer is in".
export function detectLanguage() {
  return langFromTimezone() || langFromNavigator() || 'en'
}
