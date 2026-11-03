import Image from 'next/image'
import s from './home.module.css'
import { site, orgs, previously, contact, people, type Org } from '@/lib/site'

const ext = { target: '_blank', rel: 'noopener' } as const

function OrgLink({ org }: { org: Org }) {
  return (
    <a className={s.org} href={org.url} {...ext}>
      <Image className={`${s.ico} ${org.boxed ? s.boxed : ''}`} src={org.icon} alt="" width={16} height={16} />
      <span>{org.name}</span>
    </a>
  )
}

function Numenor() {
  return (
    <a className={s.mark} href={orgs.numenor.url} aria-label={orgs.numenor.name} {...ext}>
      <span className={s.nm}>
        <Image src="/icons/numenor-word.png" alt={orgs.numenor.name} width={301} height={96} />
        <Image className={s.scrib} src="/icons/numenor-scribble.png" alt="" width={301} height={96} />
      </span>
    </a>
  )
}

export default function Page() {
  return (
    <div className={s.page}>
      <main className={s.col}>
        <header className={s.head}>
          <p>{site.name}</p>
          <p className={s.sec}>{site.role}, {site.place}</p>
        </header>

        <section id="about">
          <h2>about</h2>
          <p>
            I&rsquo;m a fourth year at Stanford University studying Computer Science, Mathematics, and Music.
            Currently I&rsquo;m an engineer at <Numenor />, building intelligent change management systems for the physical world.
          </p>
          <p>
            I&rsquo;ve played the French horn since 7th grade, and currently play in the <OrgLink org={orgs.sso} />,
            studying under <a href={people.clevenger.url} {...ext}>{people.clevenger.name}</a>.
          </p>
          <p>
            Otherwise you can catch me bouldering, lifting weights, scootering around campus, or eating food off campus
            (add <a href={people.beli.url} {...ext}>{people.beli.name}</a>).
          </p>
        </section>

        <section id="previously">
          <h2>previously</h2>
          <ul className={s.list}>
            {previously.map(({ org, start, end }) => (
              <li key={org.name}>
                <OrgLink org={org} /><span className={s.sec}>, {start} to {end}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact">
          <h2>contact</h2>
          <ul className={s.links}>
            {contact.map(({ label, handle, href }) => (
              <li key={label}>
                <a href={href} {...(href.startsWith('mailto:') ? {} : ext)}>{label}</a><span className={s.sec}>, {handle}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
