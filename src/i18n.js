import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

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

const saved = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
    fr: { translation: fr },
    de: { translation: de },
    ar: { translation: ar },
  },
  lng: saved,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export function applyDir(lng) {
  const dir = RTL_LANGS.includes(lng) ? 'rtl' : 'ltr'
  document.documentElement.setAttribute('dir', dir)
  document.documentElement.setAttribute('lang', lng)
}

applyDir(saved)
i18n.on('languageChanged', (lng) => {
  try { localStorage.setItem('lang', lng) } catch (e) {}
  applyDir(lng)
})

export default i18n
