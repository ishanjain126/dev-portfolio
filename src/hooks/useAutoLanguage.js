import { useEffect } from 'react'
import i18n from '../i18n.js'
import { langFromCountry } from '../lib/detectLang.js'

// Refines the auto-detected language using the visitor's actual IP country.
// Runs once, only when the user hasn't manually picked a language. The initial
// (timezone-based) guess already rendered, so this just corrects it if the IP
// country maps to a different supported language. Fully best-effort: any
// network/CORS failure is ignored and the timezone guess stands.
export default function useAutoLanguage() {
  useEffect(() => {
    // a saved preference (manual choice, or a previously-resolved auto detection)
    // always wins — never re-query the IP once we have one.
    try { if (localStorage.getItem('langPref')) return } catch (e) { return }
    let cancelled = false
    fetch('https://get.geojs.io/v1/ip/country.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return
        const cc = d.country || d.country_code || ''
        const lng = langFromCountry(cc)
        if (lng && lng !== i18n.language) i18n.changeLanguage(lng)
        // remember the resolved language so future visits skip the IP call
        try { localStorage.setItem('langPref', lng) } catch (e) { /* ignore */ }
      })
      .catch(() => { /* offline / blocked — keep the timezone guess, retry next visit */ })
    return () => { cancelled = true }
  }, [])
}
