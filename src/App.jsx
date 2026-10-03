import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  FileText,
  GraduationCap,
  HandHeart,
  Linkedin,
  Mail,
  Instagram,
  Mic,
  Send,
  TrendingUp,
  Trophy,
  Users,
  Wind,
  Globe2,
  Flag,
} from 'lucide-react'
import { useLang, useL } from './i18n.jsx'
import { EPISODES, LATEST, LINKS, ytThumb, ytWatch } from './data.js'
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

const container = 'max-w-7xl mx-auto px-6 sm:px-10 lg:px-16'

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function Hero() {
  const { t } = useLang()
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
                className="magnetic-btn group inline-flex items-center justify-center gap-2 bg-primary text-deep font-semibold px-7 py-4 rounded-full shadow-2xl shadow-primary/30"
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                {t.hero.live}
              </span>
              <span className="text-sm text-white/75 group-hover:text-white transition-colors">
                Ep. {LATEST.num} — Monterey Car Week
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
                <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between glass rounded-2xl px-4 py-3">
                  <span className="font-display font-semibold text-white text-sm">Jordi Facha Álvarez</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary-light">UFV · Madrid</span>
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
  const [stack, setStack] = useState(EPISODES.slice(0, 3))

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
          className="absolute inset-0 right-6 bottom-6 flex gap-4 rounded-3xl border border-white/10 bg-[#141922] p-4 shadow-xl shadow-black/40"
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
   Feature card 2 — Signature animation: airflow over a rear wing
   (re-skin of the skill's falling-drop component: source = car body,
   particles = air parcels, ripples = wake vortices)
---------------------------------------------------------------- */
const STREAMLINES = [
  'M-10,20 C80,20 170,16 330,12',
  'M-10,34 C70,34 120,30 170,30 C220,30 245,34 262,34 C285,24 305,18 330,16',
  'M-10,48 C40,48 70,46 100,40 C140,30 190,32 230,42 C250,46 262,46 270,44 C290,36 310,30 330,28',
  'M-10,62 C30,62 50,62 70,58 C110,48 170,48 230,56 C255,60 275,62 330,60',
]

function AeroWing() {
  const { t } = useLang()
  const states = t.features.aero.states
  const [idx, setIdx] = useState(0)
  const [downforce, setDownforce] = useState(42)
  const wingLens = [34, 46, 58, 46]

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % states.length)
      setDownforce(38 + Math.round(Math.random() * 14))
    }, 2300)
    return () => clearInterval(id)
  }, [states.length])

  const wing = wingLens[idx % wingLens.length]

  return (
    <div className="relative h-44 w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0E1A30] via-[#0B1120] to-[#08090C]">
      <style>{`
        @keyframes air-dash { to { stroke-dashoffset: -120; } }
        @keyframes air-ripple {
          0%   { transform: scale(0.4); opacity: 0.9; }
          80%  { transform: scale(3.2); opacity: 0; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        @keyframes air-fadein { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Atmospheric blobs */}
      <div className="absolute -top-10 left-6 h-24 w-24 rounded-full bg-primary/25 blur-2xl" />
      <div className="absolute bottom-0 right-4 h-20 w-28 rounded-full bg-accent/15 blur-2xl" />

      {/* Header strip */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">{t.features.aero.header}</span>
        <span className="font-mono text-[10px] text-primary-light tabular-nums">DF {downforce} N</span>
      </div>

      <svg viewBox="0 0 320 140" className="absolute inset-x-0 bottom-6 w-full h-[120px]" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="flow" x1="0" x2="1">
            <stop offset="0" stopColor="#8DB8FF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#8DB8FF" stopOpacity="0.8" />
            <stop offset="1" stopColor="#4C8DFF" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="body" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#1F2A3D" />
            <stop offset="1" stopColor="#111722" />
          </linearGradient>
        </defs>

        {/* Streamlines (dashed, flowing) */}
        {STREAMLINES.map((d, i) => (
          <path
            key={i}
            id={`sl-${i}`}
            d={d}
            fill="none"
            stroke="url(#flow)"
            strokeWidth="1.2"
            strokeDasharray="18 12"
            style={{ animation: `air-dash ${2.4 + i * 0.35}s linear infinite` }}
          />
        ))}

        {/* Air parcels travelling along the streamlines */}
        {STREAMLINES.map((_, i) =>
          [0, 1].map((k) => (
            <circle key={`${i}-${k}`} r={k ? 1.6 : 2.2} fill={i === 2 && k === 0 ? '#FF5A1F' : '#CFE0FF'}>
              <animateMotion dur={`${2.2 + i * 0.4}s`} begin={`${k * 1.1 + i * 0.3}s`} repeatCount="indefinite">
                <mpath href={`#sl-${i}`} />
              </animateMotion>
            </circle>
          )),
        )}

        {/* Car body (911 RSR-ish profile, nose left) */}
        <path
          d="M28,104 C28,94 36,88 52,86 L92,80 C110,62 140,54 176,54 C206,54 226,64 240,76 L276,82 C290,84 296,92 296,104 Z"
          fill="url(#body)"
          stroke="#2C3A52"
          strokeWidth="1"
        />
        <path d="M104,78 C120,66 142,60 170,60 C192,60 206,66 216,74 Z" fill="#0B111B" opacity="0.9" />
        <circle cx="78" cy="104" r="13" fill="#05070A" stroke="#2C3A52" />
        <circle cx="78" cy="104" r="5" fill="#1F2A3D" />
        <circle cx="250" cy="104" r="13" fill="#05070A" stroke="#2C3A52" />
        <circle cx="250" cy="104" r="5" fill="#1F2A3D" />

        {/* Rear wing — length changes with state */}
        <line x1="270" y1="80" x2="270" y2="54" stroke="#3A4B68" strokeWidth="2" />
        <rect
          x={270 - wing / 2}
          y="48"
          width={wing}
          height="5"
          rx="2.5"
          fill="#4C8DFF"
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.56,0.64,1), width 0.6s cubic-bezier(0.34,1.56,0.64,1)' }}
        />

        {/* Ground */}
        <line x1="0" y1="118" x2="320" y2="118" stroke="#1E2430" strokeWidth="1" />
      </svg>

      {/* Wake vortices (ripples) */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute h-3 w-3 rounded-full border border-primary/60"
          style={{
            right: `${8 + i * 6}%`,
            top: `${42 + i * 6}%`,
            animation: `air-ripple 2.4s ease-out ${i * 0.8}s infinite`,
          }}
        />
      ))}

      {/* Footer strip */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 z-10">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span key={idx} className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70" style={{ animation: 'air-fadein 0.4s ease both' }}>
          {states[idx]}
        </span>
      </div>
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
    <div className="relative h-44 w-full rounded-3xl border border-white/10 bg-[#0E1218] p-4 overflow-hidden">
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
          {booked && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
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
        <path d="M4 2 L20 12 L12.5 13.5 L9 21 Z" fill="#fff" stroke="#08090C" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/* ----------------------------------------------------------------
   Features
---------------------------------------------------------------- */
function Features() {
  const { t } = useLang()
  const f = t.features
  const ref = useReveal('.feature-card', { stagger: 0.15 })

  const cards = [
    { ...f.podcast, Visual: EpisodeShuffler, to: '/podcast', Icon: Mic },
    { ...f.aero, Visual: AeroWing, href: LINKS.researchPaper, Icon: Wind },
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
                  {bullets.map((b) => (
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
                <CountUp end={p.end} suffix={p.suffix} />
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

/* ----------------------------------------------------------------
   Journey — sticky stack with GSAP scrub
---------------------------------------------------------------- */
function Journey() {
  const { t } = useLang()
  const j = t.journey
  const ref = useRef(null)
  const icons = [BookOpen, GraduationCap, Trophy]

  useEffect(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    // Sticky stack only on large screens; on phones the cards are taller
    // than the viewport and would cover each other.
    mm.add('(min-width: 1024px)', () => {
      const cards = gsap.utils.toArray('.journey-card', ref.current)
      cards.slice(0, -1).forEach((card) => {
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: 'top top+=100', end: '+=500', scrub: 1 },
          scale: 0.92,
          filter: 'blur(6px) saturate(0.7)',
          opacity: 0.5,
          ease: 'none',
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="journey" ref={ref} className="relative py-24 sm:py-32 lg:py-40">
      <div className={container}>
        <div className="max-w-3xl mb-16">
          <Eyebrow className="mb-5">{j.eyebrow}</Eyebrow>
          <SectionTitle title={j.title} italic={j.titleItalic} />
        </div>

        <div className="relative">
          {j.steps.map((s, i) => {
            const Icon = icons[i]
            return (
              <div key={s.title} className="journey-card lg:sticky lg:top-24 mb-6 lg:mb-10 origin-top">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 rounded-4xl border border-divider bg-surface p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/50 min-h-[28rem]">
                  <div className="lg:col-span-3 flex flex-col">
                    <div className="flex items-center gap-4">
                      <span className="font-display text-5xl sm:text-6xl font-extrabold tracking-tighter text-white/10">
                        0{i + 1}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                        <Icon className="h-3.5 w-3.5" />
                        {s.tag}
                      </span>
                      {i === 1 && (
                        <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-pulse-green" />
                          Live
                        </span>
                      )}
                    </div>
                    <h3 className="mt-6 font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">{s.title}</h3>
                    <p className="mt-5 text-white/60 leading-relaxed sm:text-lg">{s.desc}</p>
                    <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {s.bullets.map((b) => (
                        <li key={b} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-white/75">
                          {b}
                        </li>
                      ))}
                    </ul>
                    {s.link && (
                      <a
                        href={LINKS.researchPaper}
                        target="_blank"
                        rel="noopener"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        {s.link}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="lg:col-span-2">
                    <PhotoSlot title={s.photoTitle} desc={s.photoDesc} className="h-full min-h-[14rem]" aspect="" />
                  </div>
                </div>
              </div>
            )
          })}
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
  paper: { Icon: Wind, href: LINKS.researchPaper },
  club: { Icon: TrendingUp, to: '/investment-club' },
  services: { Icon: HandHeart, to: '/services' },
  gcc: { Icon: Globe2, to: '/services' },
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
            const cls = 'svc-tile group relative bg-deep p-8 sm:p-10 transition-colors duration-300 hover:bg-white/[0.03] block'
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
   Highlights + toolkit
---------------------------------------------------------------- */
function Highlights() {
  const { t } = useLang()
  const h = t.highlights
  const ref = useReveal()
  const icons = [Users, Award, Trophy]
  return (
    <section ref={ref} className="relative py-24 sm:py-32 lg:py-40">
      <div className={container}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Eyebrow className="reveal-item mb-5">{h.eyebrow}</Eyebrow>
          <div className="reveal-item">
            <SectionTitle title={h.title} italic={h.titleItalic} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {h.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <div
                key={item.title}
                className="reveal-item rounded-3xl border border-divider bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-deep shadow-lg shadow-primary/20">
                  <Icon className="h-5 w-5" strokeWidth={2.4} />
                </span>
                <h3 className="mt-6 font-display text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="reveal-item mt-20 max-w-6xl mx-auto rounded-4xl border border-divider bg-surface/60 p-6 sm:p-10">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/45 mb-8">{h.skillsTitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {h.skills.map((g) => (
              <div key={g.group}>
                <p className="font-display font-semibold text-white">{g.group}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="rounded-full bg-white/[0.04] border border-white/10 px-3 py-1.5 text-sm text-white/70">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
            <div className="rounded-4xl border border-divider bg-surface p-6 sm:p-10 shadow-2xl shadow-black/40">
              {status === 'sent' ? (
                <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-deep shadow-xl shadow-primary/30">
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
                    className="magnetic-btn mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-deep shadow-xl shadow-primary/25 disabled:opacity-70"
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
      <Highlights />
      <Contact />
    </>
  )
}
