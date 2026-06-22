import { useTranslation } from 'react-i18next'
import profile from '../data/profile.json'

export default function Stats() {
  const { t } = useTranslation()
  return (
    <div className="stats">
      {profile.stats.map((s) => (
        <div className="stat" key={s.id}>
          <div className="stat-num">{s.value}<span>{s.suffix}</span></div>
          <div className="stat-label">{t('stats.' + s.id)}</div>
        </div>
      ))}
    </div>
  )
}
