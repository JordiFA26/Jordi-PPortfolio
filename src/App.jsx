import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  GraduationCap,
  HandHeart,
  Gauge,
  Linkedin,
  Mail,
  Instagram,
  Mic,
  Send,
  Wind,
  Flag,
  MapPin,
  CornerDownRight,
  CornerDownLeft,
} from 'lucide-react'
import { useLang, useL } from './i18n.jsx'
import { LINKS, ytThumb, ytWatch } from './data.js'
import { shortTitle, useEpisodes } from './episodes.jsx'
import {
  AirflowField,
  CountUp,
  Eyebrow,
  PhotoSlot,
  SectionTitle,
  prefersReducedMotion,
  usePageTitle,
  useReveal,
} from './components.jsx'
import { AeroWing, strokeVar } from './AeroWing.jsx'

const container = 'max-w-7xl mx-auto px-6 sm:px-10 lg:px-16'

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function Hero() {
  const { t } = useLang()
  const { latest: LATEST } = useEpisodes()
  const heroRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' })
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-cta, .hero-meta', { y: 24, opacity: 0, duration: 0.8, delay: 0.8, stagger: 0.12, ease: 'power3.out' })
      gsap.from('.hero-photo', { x: 40, opacity: 0, duration: 1.2, delay: 0.6, ease: 'power3.out' })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <AirflowField />
      <div className="absolute -top-48 -left-48 h-[34rem] w-[34rem] rounded-full bg-primary/20 blur-[140px]" />
      <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-[18%] h-2 w-2 rounded-full bg-primary/70 animate-float" />
        <div className="absolute top-[58%] right-[8%] h-1.5 w-1.5 rounded-full bg-white/40 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[38%] right-[30%] h-1 w-1 rounded-full bg-accent/80 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className={`relative z-10 ${container} flex min-h-[100dvh] items-center pt-28 pb-20`}>
        <div className="grid grid-cols-1 w-full items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="hero-eyebrow inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-primary-light bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 mb-8">
              <GraduationCap className="h-3.5 w-3.5" />
              {t.hero.eyebrow}
            </p>
            <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tighter">
              <span className="hero-line-1 block text-5xl sm:text-7xl lg:text-[5.25rem] xl:text-8xl">{t.hero.line1}</span>
              <span
                className="hero-line-2 block font-serif italic font-medium gradient-text text-5xl sm:text-7xl lg:text-[5.25rem] xl:text-[6.25rem] mt-2 pb-2"
                style={{ lineHeight: 0.95 }}
              >
                {t.hero.line2}
              </span>
            </h1>
            <p className="hero-meta mt-8 max-w-xl text-white/65 text-base sm:text-lg leading-relaxed">{t.hero.sub}</p>

            <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/podcast"
                className="magnetic-btn group inline-flex items-center justify-center gap-2 bg-primary text-onprimary font-semibold px-7 py-4 rounded-full shadow-2xl shadow-primary/30"
              >
                <Mic className="h-4 w-4" />
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener"
                className="lift-on-hover inline-flex items-center justify-center gap-2 bg-white/[0.06] backdrop-blur-md text-white border border-white/15 font-medium px-7 py-4 rounded-full hover:bg-white/10 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                {t.hero.ctaSecondary}
              </a>
            </div>

            <a
              href={ytWatch(LATEST.id)}
              target="_blank"
              rel="noopener"
              className="hero-meta group mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] pl-2 pr-4 py-2 hover:border-primary/40 transition-colors"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-snow">
                <span className="h-1.5 w-1.5 rounded-full bg-snow animate-pulse" />
                {t.hero.live}
              </span>
              <span className="text-sm text-white/75 group-hover:text-white transition-colors">
                Ep. {LATEST.num} — {shortTitle(LATEST)}
              </span>
              <ArrowUpRight className="h-4 w-4 text-white/50 group-hover:text-primary transition-colors" />
            </a>
          </div>

          <div className="hero-photo hidden lg:block lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
              <PhotoSlot title={t.hero.photoTitle} desc={t.hero.photoDesc} aspect="aspect-[4/5]" className="relative" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 sm:right-12 hidden md:flex flex-col items-center gap-2 text-white/40">
        <span className="font-mono uppercase text-[10px] tracking-[0.3em]">{t.hero.scroll}</span>
        <div className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   About
---------------------------------------------------------------- */
function About() {
  const { t } = useLang()
  const ref = useReveal()
  return (
    <section id="about" ref={ref} className="relative py-24 sm:py-32 lg:py-40">
      <div className={container}>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 reveal-item lg:sticky lg:top-28">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/15 blur-xl" />
              <div className="relative overflow-hidden rounded-4xl border border-white/10 aspect-[3/4] max-w-sm mx-auto lg:max-w-none">
                <img src="/portrait.jpg" alt="Jordi Facha Álvarez" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between glass rounded-2xl px-4 py-3">
                  <span className="font-display font-semibold text-white text-sm">Jordi Facha Álvarez</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary">UFV · Madrid</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Eyebrow className="reveal-item mb-5">{t.about.eyebrow}</Eyebrow>
            <div className="reveal-item">
              <SectionTitle title={t.about.title} italic={t.about.titleItalic} />
            </div>
            <div className="mt-10 space-y-6 text-white/70 text-base sm:text-lg leading-relaxed">
              {t.about.p.map((p, i) => (
                <p key={i} className={`reveal-item ${i === t.about.p.length - 1 ? 'text-white font-medium' : ''}`}>
                  {p}
                </p>
              ))}
            </div>
            <div className="reveal-item mt-10 text-white/45">
              {t.about.sign}
              <span className="block mt-1 font-serif italic text-3xl text-primary-light">Jordi Facha Álvarez</span>
            </div>

            <div className="reveal-item mt-14 rounded-3xl border border-divider bg-surface p-6 sm:p-8">
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/45 mb-6">{t.about.toolkitTitle}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {t.about.toolkit.map((g) => (
                  <div key={g.group}>
                    <p className="font-display font-semibold text-white">{g.group}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <span key={item} className="rounded-full bg-white/[0.04] border border-white/10 px-3 py-1.5 text-sm text-white/70">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Feature card 1 — Episode shuffler
---------------------------------------------------------------- */
function EpisodeShuffler() {
  const l = useL()
  const { episodes } = useEpisodes()
  const [stack, setStack] = useState(episodes.slice(0, 3))
  useEffect(() => setStack(episodes.slice(0, 3)), [episodes])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-44 w-full">
      {stack.map((ep, i) => (
        <div
          key={ep.id}
          style={{
            transform: `translate(${i * 12}px, ${i * 12}px) scale(${1 - i * 0.05})`,
            zIndex: stack.length - i,
            opacity: 1 - i * 0.28,
            filter: i ? `blur(${i}px)` : 'none',
            transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease, filter 0.6s ease',
          }}
          className="absolute inset-0 right-6 bottom-6 flex gap-4 rounded-3xl border border-white/10 bg-surface2 p-4 shadow-xl shadow-shade/30"
        >
          <img src={ytThumb(ep.id)} alt="" className="h-full w-28 shrink-0 rounded-2xl object-cover" loading="lazy" />
          <div className="min-w-0 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Ep. {ep.num}
              </span>
              <span className="font-mono text-[10px] text-white/40">{ep.lang}</span>
            </div>
            <p className="mt-2 font-display text-sm font-semibold text-white leading-snug line-clamp-3">{ep.title}</p>
            <p className="mt-auto text-xs text-white/45 truncate">{l(ep.guest)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature card 3 — Cursor + weekly planner
---------------------------------------------------------------- */
function StudyScheduler() {
  const { t } = useLang()
  const n = t.features.now
  const [step, setStep] = useState(0)
  const target = 3 // Thursday

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStep(3)
      return
    }
    const id = setInterval(() => setStep((s) => (s + 1) % 5), 1400)
    return () => clearInterval(id)
  }, [])

  // Cursor positions in % of the grid box.
  const cursor = [
    { x: 88, y: 92 },
    { x: 60, y: 70 },
    { x: 7 + target * 14 + 4, y: 48 },
    { x: 7 + target * 14 + 4, y: 48 },
    { x: 88, y: 92 },
  ][step]
  const booked = step >= 3

  return (
    <div className="relative h-44 w-full rounded-3xl border border-white/10 bg-surface2 p-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">UFV · {n.tag}</span>
        <span className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-wider text-white/45">
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{n.lecture}</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{n.record}</span>
        </span>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1.5">
        {n.week.map((d, i) => {
          const isTarget = i === target
          const weekday = i < 5
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="font-mono text-[10px] text-white/40">{d}</span>
              <div
                className={`relative h-14 w-full rounded-lg border transition-all duration-500 ${
                  isTarget && booked
                    ? 'border-accent/60 bg-accent/15'
                    : isTarget && step === 2
                      ? 'border-primary/60 bg-primary/10'
                      : 'border-white/5 bg-white/[0.02]'
                }`}
              >
                {weekday && <span className="absolute left-1 right-1 top-1.5 h-2 rounded bg-primary/50" />}
                {weekday && i % 2 === 0 && <span className="absolute left-1 right-1 top-5 h-2 rounded bg-primary/30" />}
                {isTarget && (
                  <span
                    className={`absolute left-1 right-1 bottom-1.5 h-3 rounded bg-accent transition-all duration-500 ${
                      booked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2">
        <span className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${booked ? 'bg-accent' : 'bg-white/10'}`}>
          {booked && <Check className="h-2.5 w-2.5 text-snow" strokeWidth={3} />}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">{booked ? n.booked : n.picking}</span>
      </div>

      {/* Cursor */}
      <svg
        viewBox="0 0 24 24"
        className="absolute h-5 w-5 drop-shadow-lg pointer-events-none"
        style={{
          left: `${cursor.x}%`,
          top: `${cursor.y}%`,
          transform: `translate(-20%, -10%) scale(${step === 3 ? 0.85 : 1})`,
          transition: 'left 0.9s cubic-bezier(0.65,0,0.35,1), top 0.9s cubic-bezier(0.65,0,0.35,1), transform 0.15s ease',
        }}
      >
        <path d="M4 2 L20 12 L12.5 13.5 L9 21 Z" fill="#fff" stroke="#0D1016" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/* ----------------------------------------------------------------
   Features
---------------------------------------------------------------- */
function Features() {
  const { t } = useLang()
  const { episodes } = useEpisodes()
  const f = t.features
  const ref = useReveal('.feature-card', { stagger: 0.15 })

  const cards = [
    { ...f.podcast, Visual: EpisodeShuffler, to: '/podcast', Icon: Mic },
    { ...f.aero, Visual: AeroWing, to: '/research', Icon: Wind },
    { ...f.now, Visual: StudyScheduler, to: '/#journey', Icon: GraduationCap },
  ]

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 border-t border-divider">
      <div className={container}>
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">{f.eyebrow}</Eyebrow>
          <SectionTitle title={f.title} italic={f.titleItalic} />
          <p className="mt-6 text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl">{f.sub}</p>
        </div>

        <div ref={ref} className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map(({ tag, title, desc, bullets, Visual, to, href, Icon }) => {
            const inner = (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{tag}</span>
                  <Icon className="h-4 w-4 text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h3>
                <div className="mt-6">
                  <Visual />
                </div>
                <p className="mt-6 text-sm sm:text-base text-white/60 leading-relaxed">{desc}</p>
                <ul className="mt-5 space-y-2">
                  {bullets.map((b) => b.replace('{n}', episodes.length)).map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-white/75">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </>
            )
            const cls =
              'feature-card group block rounded-3xl bg-surface border border-divider p-6 sm:p-8 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5'
            return href ? (
              <a key={title} href={href} target="_blank" rel="noopener" className={cls}>
                {inner}
              </a>
            ) : (
              <Link key={title} to={to} className={cls}>
                {inner}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Pillars — animated counters
---------------------------------------------------------------- */
function Pillars() {
  const { t } = useLang()
  const { episodes } = useEpisodes()
  const ref = useReveal()
  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32 bg-deep border-y border-divider">
      <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-primary/15 blur-[110px]" />
      <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-accent/10 blur-[110px]" />
      <div className={`relative ${container}`}>
        <Eyebrow className="reveal-item mb-12 text-center">{t.pillars.eyebrow}</Eyebrow>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-0 lg:divide-x divide-divider">
          {t.pillars.items.map((p) => (
            <div key={p.label} className="reveal-item lg:px-12 text-center lg:text-left">
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/50">{p.label}</p>
              <p className="mt-4 font-display text-7xl sm:text-8xl font-extrabold tracking-tighter text-white">
                <CountUp end={p.end === 'episodes' ? episodes.length : p.end} suffix={p.suffix} />
              </p>
              <div className="relative mt-5 h-px w-full overflow-hidden bg-white/5">
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ animation: 'pillar-sweep 3s ease-in-out infinite' }}
                />
              </div>
              <p className="mt-5 text-white/55 leading-relaxed max-w-sm mx-auto lg:mx-0">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BackPill({ text }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-sm text-white">
      <CornerDownLeft className="h-3.5 w-3.5 text-primary" />
      {text}
    </span>
  )
}

function DetourCard({ d }) {
  return (
    <div className="rounded-3xl border border-dashed border-accent/40 bg-surface/80 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          <CornerDownRight className="h-3 w-3" />
          {d.label}
        </span>
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.16em] text-primary">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {d.place}
        </span>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] text-accent">{d.span}</span>
      </p>
      <h4 className="mt-2 font-display text-lg font-bold tracking-tight text-white">{d.school}</h4>
      <p className="mt-2 text-sm text-white/60 leading-relaxed">{d.desc}</p>
      {d.photoDesc && (
        <div className="mt-4">
          <PhotoSlot title={d.school} desc={d.photoDesc} aspect="aspect-[16/9]" compact />
        </div>
      )}
    </div>
  )
}

/* ----------------------------------------------------------------
   Journey — timeline of places and schools, line fills on scroll
---------------------------------------------------------------- */
function Journey() {
  const { t } = useLang()
  const j = t.journey
  const ref = useReveal('.stop-item', { stagger: 0.1 })
  const lineRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !lineRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: lineRef.current.parentElement, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  // Route strip: unique consecutive places (flag + city)
  const route = j.stops.map((s) => ({ flag: s.flag, city: s.chip, detour: s.detour }))

  return (
    <section id="journey" ref={ref} className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="absolute top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />
      <div className={`relative ${container}`}>
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">{j.eyebrow}</Eyebrow>
          <SectionTitle title={j.title} italic={j.titleItalic} />
          <p className="mt-6 text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl">{j.sub}</p>
        </div>

        {/* Route strip */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {route.map((r, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${i === route.length - 1 ? 'border-primary/40 bg-primary/10 text-white' : 'border-white/10 bg-white/[0.03] text-white/75'}`}>
                <span className="text-base leading-none">{r.flag}</span>
                {r.city}
                {r.detour && (
                  <span className="ml-1 inline-flex items-center gap-1 rounded-full border border-dashed border-accent/50 px-2 py-0.5 text-xs text-white/70">
                    <CornerDownRight className="h-3 w-3 text-accent" />
                    <span className="leading-none">{r.detour.flag}</span>
                    {r.detour.chip} · {r.detour.span}
                  </span>
                )}
              </span>
              {i < route.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-white/30" />}
            </span>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          <div className="absolute top-2 bottom-2 left-5 lg:left-1/2 w-px -translate-x-1/2 bg-divider">
            <div ref={lineRef} className="absolute inset-0 origin-top bg-gradient-to-b from-primary via-primary to-accent" />
          </div>

          <div className="space-y-10 lg:space-y-16">
            {j.stops.map((s, i) => {
              const left = i % 2 === 0
              return (
                <div key={i} className="stop-item relative grid grid-cols-1 lg:grid-cols-2 lg:gap-24 pl-14 lg:pl-0">
                  {/* Node */}
                  <span
                    className={`absolute left-5 lg:left-1/2 top-6 -translate-x-1/2 flex h-11 w-11 items-center justify-center rounded-full border-2 text-lg bg-surface z-10 ${
                      s.now ? 'border-primary ring-pulse' : 'border-divider'
                    }`}
                  >
                    {s.flag}
                  </span>

                  {/* Card */}
                  <div className={`lg:row-start-1 ${left ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
                    <div className={`rounded-3xl border bg-surface p-6 sm:p-8 transition-colors ${s.now ? 'border-primary/40 shadow-2xl shadow-primary/10' : 'border-divider'}`}>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-[0.16em] text-primary">
                          <MapPin className="h-3.5 w-3.5" />
                          {s.place}
                        </span>
                        {s.now && (
                          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-emerald-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-pulse-green" />
                            Live
                          </span>
                        )}
                        <span className="lg:hidden ml-auto rounded-full bg-white/[0.05] border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/70">
                          {s.span} {s.unit}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold tracking-tight text-white">{s.school}</h3>
                      <p className="mt-3 text-white/60 leading-relaxed">{s.desc}</p>
                      {s.steps && (
                        <ol className="mt-5 flex flex-wrap items-center gap-2">
                          {s.steps.map((st, k) => (
                            <li key={k} className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-baseline gap-1.5 rounded-xl border px-3 py-1.5 text-sm ${
                                  st.away ? 'border-dashed border-accent/50 bg-accent/5 text-white/80' : 'border-white/10 bg-white/[0.03] text-white'
                                }`}
                              >
                                <span className="font-semibold">{st.label}</span>
                                <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">{st.sub}</span>
                              </span>
                              {k < s.steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-white/30" />}
                            </li>
                          ))}
                        </ol>
                      )}
                      {s.link && (
                        <a
                          href={LINKS.researchPaper}
                          target="_blank"
                          rel="noopener"
                          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          {s.link}
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      {s.photoDesc && (
                        <div className={`mt-5 ${s.detour ? '' : 'lg:hidden'}`}>
                          <PhotoSlot title={s.school} desc={s.photoDesc} aspect="aspect-[16/9]" compact />
                        </div>
                      )}
                    </div>

                    {/* Detour (mobile): branches off the left timeline and rejoins it */}
                    {s.detour && (
                      <div className="lg:hidden relative mt-4">
                        <svg className="absolute top-0 bottom-0 -left-9 h-full w-9" viewBox="0 0 36 100" preserveAspectRatio="none" aria-hidden="true">
                          <path d="M0,0 C0,22 32,14 32,36 L32,64 C32,86 0,78 0,100" fill="none" style={strokeVar('accent')} strokeWidth="2" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
                        </svg>
                        <span className="absolute top-1/2 -left-[18px] -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-accent/60 bg-surface text-sm">
                          {s.detour.flag}
                        </span>
                        <div className="ml-4">
                          <DetourCard d={s.detour} />
                        </div>
                      </div>
                    )}
                    {s.detour && (
                      <div className="lg:hidden relative mt-4">
                        <span className="absolute top-1/2 -left-[36px] h-px w-[36px] bg-primary/50" />
                        <span className="absolute top-1/2 -left-[42px] -translate-y-1/2 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" />
                        <BackPill text={s.detour.back} />
                      </div>
                    )}
                  </div>

                  {/* Aside: big duration + photo (desktop) */}
                  <div className={`hidden lg:flex lg:row-start-1 flex-col gap-5 ${left ? 'lg:col-start-2 items-start' : 'lg:col-start-1 items-end text-right'}`}>
                    <p className="font-display font-extrabold tracking-tighter leading-none text-white/[0.12]">
                      <span className="text-7xl xl:text-8xl">{s.span}</span>
                      <span className="ml-2 text-2xl align-top text-white/30">{s.unit}</span>
                    </p>
                    {s.photoDesc && !s.detour && (
                      <PhotoSlot title={s.school} desc={s.photoDesc} aspect="aspect-[16/9]" className="w-full max-w-sm" compact />
                    )}

                    {/* Detour (desktop): a bump off the centre line out to this side and back */}
                    {s.detour && (
                      <div className={`relative w-full max-w-md ${left ? 'self-start' : 'self-end'}`}>
                        <svg
                          className={`absolute top-0 bottom-0 h-full w-12 ${left ? '-left-12 -scale-x-100' : '-right-12'}`}
                          viewBox="0 0 48 100"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <path d="M48,0 C48,22 4,14 4,36 L4,64 C4,86 48,78 48,100" fill="none" style={strokeVar('accent')} strokeWidth="2" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" />
                        </svg>
                        <span
                          className={`absolute top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent/60 bg-surface text-base ${
                            left ? '-left-5' : '-right-5'
                          }`}
                        >
                          {s.detour.flag}
                        </span>
                        <div className={`text-left ${left ? 'ml-8' : 'mr-8'}`}>
                          <DetourCard d={s.detour} />
                        </div>
                      </div>
                    )}
                    {s.detour && (
                      <div className={`relative ${left ? 'self-start' : 'self-end'}`}>
                        <span className={`absolute top-1/2 h-px w-12 bg-primary/50 ${left ? '-left-12' : '-right-12'}`} />
                        <span
                          className={`absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20 ${
                            left ? '-left-[54px]' : '-right-[54px]'
                          }`}
                        />
                        <BackPill text={s.detour.back} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Projects — dark tile grid
---------------------------------------------------------------- */
const PROJECT_META = {
  podcast: { Icon: Mic, to: '/podcast' },
  paper: { Icon: Wind, to: '/research' },
  fs: { Icon: Gauge, to: '/research' },
  services: { Icon: HandHeart, to: '/services' },
  sport: { Icon: Flag },
}

function Projects() {
  const { t } = useLang()
  const ref = useReveal('.svc-tile', { stagger: 0.08 })
  return (
    <section id="projects" className="relative bg-deep py-24 sm:py-32 lg:py-40 border-y border-divider">
      <div className={container}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <Eyebrow className="mb-5">{t.projects.eyebrow}</Eyebrow>
            <SectionTitle title={t.projects.title} italic={t.projects.titleItalic} />
          </div>
          <p className="text-white/55 max-w-md leading-relaxed">{t.projects.sub}</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-4xl overflow-hidden border border-white/[0.06]">
          {t.projects.items.map((p) => {
            const { Icon, to, href } = PROJECT_META[p.key]
            const inner = (
              <>
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  {(to || href) && (
                    <ArrowUpRight className="h-5 w-5 text-white/25 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </div>
                <h3 className="mt-8 font-display text-xl font-bold text-white tracking-tight">{p.title}</h3>
                <p className="mt-3 text-white/55 leading-relaxed text-sm sm:text-base">{p.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )
            const cls = `svc-tile group relative bg-deep p-8 sm:p-10 transition-colors duration-300 hover:bg-surface block ${p.key === 'podcast' ? 'sm:col-span-2' : ''}`
            if (href)
              return (
                <a key={p.key} href={href} target="_blank" rel="noopener" className={cls}>
                  {inner}
                </a>
              )
            if (to)
              return (
                <Link key={p.key} to={to} className={cls}>
                  {inner}
                </Link>
              )
            return (
              <div key={p.key} className={cls}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



/* ----------------------------------------------------------------
   Contact
---------------------------------------------------------------- */
function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">{label}</span>
      {children}
    </label>
  )
}

const inputCls =
  'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition focus:border-primary/60 focus:ring-4 focus:ring-primary/10'

function Contact() {
  const { t } = useLang()
  const c = t.contact
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const ref = useReveal()

  const onSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const message = String(form.get('message') || '').trim()
    if (!name || !email || !message) {
      setError(c.missing)
      return
    }
    setError('')
    setStatus('sending')
    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    setTimeout(() => {
      window.location.href = `mailto:${LINKS.podcastEmail}?subject=${subject}&body=${body}`
      setStatus('sent')
    }, 700)
  }

  const cards = [
    { Icon: Mail, label: c.emailLabel, value: LINKS.podcastEmail, href: `mailto:${LINKS.podcastEmail}` },
    { Icon: Linkedin, label: c.linkedinLabel, value: 'Jordi Facha Álvarez', href: LINKS.linkedin, external: true },
    { Icon: Instagram, label: c.instagramLabel, value: '@Jordi_fa_', href: LINKS.instagram, external: true },
  ]

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-24 sm:py-32 lg:py-40 border-t border-divider">
      <div className="absolute top-20 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />
      <div className={`relative ${container}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow className="reveal-item mb-5">{c.eyebrow}</Eyebrow>
            <div className="reveal-item">
              <SectionTitle title={c.title} italic={c.titleItalic} />
            </div>
            <p className="reveal-item mt-6 text-white/60 text-base sm:text-lg leading-relaxed">{c.sub}</p>

            <div className="mt-10 space-y-3">
              {cards.map(({ Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener' } : {})}
                  className="reveal-item group flex items-center gap-4 rounded-2xl border border-divider bg-surface px-5 py-4 transition-all hover:border-primary/40 hover:translate-x-1"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">{label}</span>
                    <span className="block text-white truncate">{value}</span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/30 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 reveal-item">
            <div className="rounded-4xl border border-divider bg-surface p-6 sm:p-10 shadow-2xl shadow-shade/30">
              {status === 'sent' ? (
                <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-onprimary shadow-xl shadow-primary/30">
                    <Check className="h-8 w-8" strokeWidth={3} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-white">{c.sentTitle}</h3>
                  <p className="mt-3 max-w-sm text-white/60 leading-relaxed">{c.sentDesc}</p>
                  <button onClick={() => setStatus('idle')} className="mt-8 text-sm font-semibold text-primary hover:text-primary-light">
                    {c.again}
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label={c.name}>
                      <input name="name" type="text" autoComplete="name" placeholder={c.namePh} className={inputCls} />
                    </Field>
                    <Field label={c.email}>
                      <input name="email" type="email" autoComplete="email" placeholder={c.emailPh} className={inputCls} />
                    </Field>
                  </div>
                  <Field label={c.message}>
                    <textarea name="message" rows={6} placeholder={c.messagePh} className={`${inputCls} resize-none`} />
                  </Field>
                  {error && <p className="text-sm text-accent">{error}</p>}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="magnetic-btn mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-onprimary shadow-xl shadow-primary/25 disabled:opacity-70"
                  >
                    {status === 'sending' ? c.sending : c.send}
                    <Send className="h-4 w-4" />
                  </button>
                  <p className="text-center text-xs text-white/40">{c.note}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Home
---------------------------------------------------------------- */
export default function App() {
  const { t } = useLang()
  usePageTitle(t.meta.title)
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Pillars />
      <Journey />
      <Projects />
      <Contact />
    </>
  )
}
