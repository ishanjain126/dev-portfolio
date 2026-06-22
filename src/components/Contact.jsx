import { useTranslation } from 'react-i18next'
import profile from '../data/profile.json'
import Icon from '../lib/icons.jsx'

export default function Contact() {
  const { t } = useTranslation()
  const c = profile.contact
  return (
    <section className="section contact" id="contact">
      <span className="contact-eyebrow">{t('contact.eyebrow')}</span>
      <h2 className="contact-title">{t('contact.title')}</h2>
      <p className="contact-sub">{t('contact.sub')}</p>
      <div className="contact-links">
        <a href={'mailto:' + c.email}><Icon name="Mail" size={17} /> {c.email}</a>
        <a href={c.phoneHref}><Icon name="Phone" size={17} /> {c.phone}</a>
        <a href={c.linkedin} target="_blank" rel="noreferrer"><Icon name="Linkedin" size={17} /> LinkedIn</a>
        <a href={c.github} target="_blank" rel="noreferrer"><Icon name="Github" size={17} /> GitHub</a>
      </div>
    </section>
  )
}
