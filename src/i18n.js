import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { detectLanguage } from './lib/detectLang.js'

import en from './locales/en.json'
import it from './locales/it.json'
import fr from './locales/fr.json'
import de from './locales/de.json'
import ar from './locales/ar.json'

export const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'it', label: 'Italiano' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ar', label: 'العربية' },
]

export const RTL_LANGS = ['ar']

// A saved language preference (set on manual choice, or once auto-detection has
// resolved) always wins. Otherwise fall back to instant offline detection.
function initialLanguage() {
  try { const pref = localStorage.getItem('langPref'); if (pref) return pref } catch (e) { /* ignore */ }
  return detectLanguage()
}
const initial = initialLanguage()

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
    fr: { translation: fr },
    de: { translation: de },
    ar: { translation: ar },
  },
  lng: initial,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export function applyDir(lng) {
  const dir = RTL_LANGS.includes(lng) ? 'rtl' : 'ltr'
  document.documentElement.setAttribute('dir', dir)
  document.documentElement.setAttribute('lang', lng)
}

applyDir(initial)
// only direction here; persistence lives with the explicit preference (langPref),
// so an auto/IP-driven change doesn't masquerade as a saved choice.
i18n.on('languageChanged', applyDir)

export default i18n
