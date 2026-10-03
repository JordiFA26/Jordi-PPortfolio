import { Link } from 'react-router-dom'
import { ArrowLeft, Hammer } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { PageHero, PhotoSlot, usePageTitle, useReveal } from '../components.jsx'

export default function Services() {
  const { t } = useLang()
  const s = t.servicesPage
  usePageTitle(t.meta.servicesTitle)
  const ref = useReveal()

  return (
    <>
      <PageHero eyebrow={s.eyebrow} line1={s.line1} line2={s.line2} sub={s.sub} />
      <section ref={ref} className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="reveal-item mx-auto max-w-2xl rounded-4xl border border-divider bg-surface p-8 sm:p-12 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
              <Hammer className="h-6 w-6" />
            </span>
            <p className="mt-6 font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-accent">{s.soonTag}</p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">{s.soonTitle}</h2>
            <p className="mt-4 text-white/60 leading-relaxed">{s.soonDesc}</p>
            <Link
              to="/"
              className="magnetic-btn mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-onprimary"
            >
              <ArrowLeft className="h-4 w-4" />
              {s.back}
            </Link>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {s.photos.map((p) => (
              <div key={p.title} className="reveal-item">
                {p.src ? (
                  <figure className="overflow-hidden rounded-3xl border border-divider bg-surface">
                    <img src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                    <figcaption className="px-5 py-4">
                      <p className="font-display font-semibold text-white">{p.title}</p>
                      <p className="mt-1 text-sm text-white/55">{p.desc}</p>
                    </figcaption>
                  </figure>
                ) : (
                  <PhotoSlot title={p.title} desc={p.desc} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
