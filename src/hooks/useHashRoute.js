import { useEffect, useState } from 'react'

export default function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || '/')
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#', '') || '/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const navigate = (to) => {
    window.location.hash = to
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return [route, navigate]
}
