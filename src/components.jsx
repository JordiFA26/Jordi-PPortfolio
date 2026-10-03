import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  Camera,
  Linkedin,
  Mail,
  Menu,
  X,
  Youtube,
  Instagram,
  Music2,
  Clapperboard,
} from 'lucide-react'
import { useLang } from './i18n.jsx'
import { LINKS } from './data.js'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ----------------------------------------------------------------
   Page-level helpers
---------------------------------------------------------------- */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}

// Scroll to top on route change, or to #hash when present.
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const tryScroll = (n = 0) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else if (n < 10) setTimeout(() => tryScroll(n + 1), 60)
      }
      tryScroll()
    } else {
      window.scrollTo(0, 0)
    }
    const id = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(id)
  }, [pathname, hash])
  return null
}

// Fade-up reveal for every `.reveal-item` inside the returned ref.
export function useReveal(selector = '.reveal-item', opts = {}) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // fromTo (not from): elements with CSS transitions would otherwise be
      // read mid-transition and animate to opacity 0. clearProps hands
      // transform/opacity back to CSS so hover effects keep working.
      gsap.fromTo(
        selector,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          ...opts,
        },
      )
    }, ref)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return ref
}

/* ----------------------------------------------------------------
   Language toggle
---------------------------------------------------------------- */
export function LangToggle({ className = '' }) {
  const { lang, setLang } = useLang()
  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 font-mono text-[11px] ${className}`}
      role="group"
      aria-label="Language"
    >
      {['en', 'es'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1 rounded-full uppercase tracking-widest transition-colors ${
            lang === l ? 'bg-primary text-deep font-semibold' : 'text-white/60 hover:text-white'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Monogram() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
      <span className="font-display font-extrabold text-[13px] tracking-tight text-deep">JF</span>
      <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 group-hover:ring-primary/60 transition" />
    </span>
  )
}

export function Navbar() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const links = [
    { to: '/#about', label: t.nav.about },
    { to: '/#journey', label: t.nav.journey },
    { to: '/#projects', label: t.nav.projects },
    { to: '/podcast', label: t.nav.podcast },
    { to: '/#contact', label: t.nav.contact },
  ]

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-black/40' : 'bg-transparent border border-transparent'
        } rounded-full pl-2 pr-2 sm:pl-3 sm:pr-3 py-2 w-[calc(100%-2rem)] max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group min-w-0">
            <Monogram />
            <span className="font-display font-bold tracking-tight text-[15px] sm:text-base text-white truncate">
              Jordi Facha Álvarez
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium tracking-tight text-white/70 hover:text-white lift-on-hover transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LangToggle className="hidden sm:inline-flex" />
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener"
              className="hidden lg:inline-flex magnetic-btn items-center gap-1.5 bg-primary text-deep px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/25"
            >
              <Linkedin className="h-4 w-4" strokeWidth={2.4} />
              LinkedIn
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-full text-white hover:bg-white/10 transition"
              aria-label={t.nav.menu}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 left-0 right-0 bg-surface border-b border-divider rounded-b-5xl px-6 pt-7 pb-10 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="flex items-center gap-2.5">
              <Monogram />
              <span className="font-display font-bold text-lg text-white">Jordi Facha Álvarez</span>
            </span>
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-white/5 text-white" aria-label={t.nav.close}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-white py-3 border-b border-divider"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3">
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="magnetic-btn flex-1 flex items-center justify-center gap-2 bg-primary text-deep px-6 py-4 rounded-full font-semibold"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <LangToggle />
          </div>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Section heading (eyebrow + display title with serif italic flourish)
---------------------------------------------------------------- */
export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-primary ${className}`}>
      {children}
    </p>
  )
}

export function SectionTitle({ title, italic, className = '' }) {
  return (
    <h2
      className={`font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.02] text-balance ${className}`}
    >
      {title}{' '}
      <span className="font-serif italic font-medium text-primary-light tracking-tight">{italic}</span>
    </h2>
  )
}

/* ----------------------------------------------------------------
   Photo placeholder — describes the shot Jordi should add later
---------------------------------------------------------------- */
export function PhotoSlot({ title, desc, className = '', aspect = 'aspect-[4/3]' }) {
  const { t } = useLang()
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-dashed border-primary/30 photo-slot-bg ${aspect} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-accent/[0.05]" />
      <div className="relative h-full w-full flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
            <Camera className="h-3 w-3" />
            {t.photo.label}
          </span>
          <span className="h-2 w-2 rounded-full bg-accent/80" />
        </div>
        <div>
          <p className="font-display font-semibold text-white text-lg leading-tight">{title}</p>
          <p className="mt-2 text-sm text-white/55 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   CountUp (IntersectionObserver + RAF)
---------------------------------------------------------------- */
export function CountUp({ end, suffix = '', duration = 2000 }) {
  const [value, setValue] = useState(prefersReducedMotion() ? end : 0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTs = performance.now()
          const tick = (now) => {
            const p = Math.min(1, (now - startTs) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(Math.round(end * eased))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
}

/* ----------------------------------------------------------------
   Airflow field — canvas streamlines that bend around an invisible
   wing profile. Used as the hero background on every page.
---------------------------------------------------------------- */
export function AirflowField({ className = '', density = 34 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let raf = 0
    let particles = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((density * w) / 1000) + 16
      particles = Array.from({ length: count }, () => spawn(true))
    }

    // Flow deflection: streamlines lift over a body centred at (cx, cy).
    const deflect = (x, y) => {
      const cx = w * 0.68
      const cy = h * 0.58
      const rx = Math.max(w * 0.22, 160)
      const ry = Math.max(h * 0.12, 60)
      const dx = (x - cx) / rx
      const dy = (y - cy) / ry
      const d2 = dx * dx + dy * dy
      const push = Math.exp(-d2 * 1.4)
      return -Math.sign(dy || 1) * push * 1.6 - push * 0.5
    }

    const spawn = (anywhere = false) => ({
      x: anywhere ? Math.random() * w : -40 - Math.random() * 200,
      y: Math.random() * h,
      speed: 1.2 + Math.random() * 2.4,
      len: 40 + Math.random() * 120,
      alpha: 0.08 + Math.random() * 0.28,
      hot: Math.random() < 0.06,
      trail: [],
    })

    const step = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.speed
        p.y += deflect(p.x, p.y) * p.speed * 0.35
        p.trail.push([p.x, p.y])
        const maxPts = Math.round(p.len / p.speed)
        if (p.trail.length > maxPts) p.trail.shift()
        if (p.x - p.len > w + 20) Object.assign(p, spawn())

        if (p.trail.length > 1) {
          const [x0, y0] = p.trail[0]
          const grad = ctx.createLinearGradient(x0, y0, p.x, p.y)
          const c = p.hot ? '255,90,31' : '141,184,255'
          grad.addColorStop(0, `rgba(${c},0)`)
          grad.addColorStop(1, `rgba(${c},${p.alpha})`)
          ctx.strokeStyle = grad
          ctx.lineWidth = p.hot ? 1.4 : 1
          ctx.beginPath()
          ctx.moveTo(x0, y0)
          for (let i = 1; i < p.trail.length; i++) ctx.lineTo(p.trail[i][0], p.trail[i][1])
          ctx.stroke()
        }
      }
      raf = requestAnimationFrame(step)
    }

    resize()
    window.addEventListener('resize', resize)

    if (prefersReducedMotion()) {
      // Draw a single static frame.
      for (let i = 0; i < 120; i++) {
        for (const p of particles) {
          p.x += p.speed
          p.y += deflect(p.x, p.y) * p.speed * 0.35
          p.trail.push([p.x, p.y])
          if (p.trail.length > p.len / p.speed) p.trail.shift()
        }
      }
      step()
      cancelAnimationFrame(raf)
    } else {
      raf = requestAnimationFrame(step)
    }

    // Pause when the tab is hidden.
    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !prefersReducedMotion()) raf = requestAnimationFrame(step)
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [density])

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />
}

/* ----------------------------------------------------------------
   Sub-page hero (Podcast / Club / Services)
---------------------------------------------------------------- */
export function PageHero({ eyebrow, line1, line2, sub, children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.ph-eyebrow', { y: 20, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' })
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-meta', { y: 24, opacity: 0, duration: 0.8, delay: 0.8, stagger: 0.12, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[78dvh] flex items-end">
      <div className="absolute inset-0 grid-bg" />
      <AirflowField density={26} />
      <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/10 blur-[110px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 pb-16 sm:pb-20">
        <Eyebrow className="ph-eyebrow mb-6">{eyebrow}</Eyebrow>
        <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tighter">
          <span className="hero-line-1 block text-5xl sm:text-7xl lg:text-8xl">{line1}</span>
          <span className="hero-line-2 block font-serif italic font-medium text-primary text-6xl sm:text-8xl lg:text-9xl mt-1" style={{ lineHeight: 0.92 }}>
            {line2}
          </span>
        </h1>
        <p className="hero-meta mt-8 max-w-2xl text-white/65 text-base sm:text-lg leading-relaxed">{sub}</p>
        {children}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
export function Footer() {
  const { t } = useLang()
  const col = 'font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 mb-4'
  const item = 'text-sm text-white/70 hover:text-white transition-colors'

  return (
    <footer className="relative bg-deep text-white border-t border-divider overflow-hidden">
      <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Monogram />
              <span className="font-display font-bold text-lg">Jordi Facha Álvarez</span>
            </div>
            <p className="mt-5 max-w-sm text-white/55 leading-relaxed">{t.footer.tagline}</p>
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 ring-pulse-green" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">{t.footer.status}</span>
            </div>
          </div>

          <div>
            <p className={col}>{t.footer.explore}</p>
            <ul className="space-y-3">
              <li><Link to="/#about" className={item}>{t.nav.about}</Link></li>
              <li><Link to="/#journey" className={item}>{t.nav.journey}</Link></li>
              <li><Link to="/#projects" className={item}>{t.nav.projects}</Link></li>
              <li><Link to="/investment-club" className={item}>{t.footer.club}</Link></li>
              <li><Link to="/#contact" className={item}>{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <p className={col}>{t.footer.podcast}</p>
            <ul className="space-y-3">
              <li><Link to="/podcast" className={item}>Inside The Machine</Link></li>
              <li><a href={LINKS.youtube} target="_blank" rel="noopener" className={item}>YouTube</a></li>
              <li><a href={LINKS.spotify} target="_blank" rel="noopener" className={item}>Spotify</a></li>
              <li><a href={LINKS.tiktok} target="_blank" rel="noopener" className={item}>TikTok</a></li>
              <li><a href={LINKS.podcastInstagram} target="_blank" rel="noopener" className={item}>Instagram</a></li>
            </ul>
          </div>

          <div>
            <p className={col}>{t.footer.connect}</p>
            <ul className="space-y-3">
              <li><a href={LINKS.linkedin} target="_blank" rel="noopener" className={item}>LinkedIn</a></li>
              <li><a href={LINKS.instagram} target="_blank" rel="noopener" className={item}>@Jordi_fa_</a></li>
              <li><a href={`mailto:${LINKS.podcastEmail}`} className={`${item} break-all`}>{LINKS.podcastEmail}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-white/40">
          <span>© {new Date().getFullYear()} Jordi Facha Álvarez. {t.footer.rights}</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">{t.footer.made}</span>
            <LangToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   Platform link row (podcast page + contact)
---------------------------------------------------------------- */
export const PLATFORM_ICONS = {
  youtube: Youtube,
  spotify: Music2,
  tiktok: Clapperboard,
  instagram: Instagram,
  email: Mail,
  linkedin: Linkedin,
}

export function PlatformLink({ href, icon, name, handle, external = true }) {
  const Icon = PLATFORM_ICONS[icon]
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      className="group flex items-center gap-4 rounded-2xl border border-divider bg-surface px-5 py-4 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.03] hover:translate-x-1"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex flex-col">
        <span className="font-display font-semibold text-white">{name}</span>
        <span className="text-sm text-white/50 truncate">{handle}</span>
      </span>
      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/40 transition group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}
