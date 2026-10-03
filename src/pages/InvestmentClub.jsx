import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { ALLOCATION, ALL_HOLDINGS, NOTABLE_HOLDINGS } from '../data.js'
import { Eyebrow, PageHero, SectionTitle, prefersReducedMotion, usePageTitle, useReveal } from '../components.jsx'

const container = 'max-w-7xl mx-auto px-6 sm:px-10 lg:px-16'

function Donut({ active, setActive, total }) {
  const { t } = useLang()
  const ref = useRef(null)
  const [progress, setProgress] = useState(prefersReducedMotion() ? 1 : 0)
  const r = 80
  const circ = 2 * Math.PI * r

  useEffect(() => {
    if (prefersReducedMotion()) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - start) / 1400)
        setProgress(1 - Math.pow(1 - p, 3))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  let offset = 0
  const current = active != null ? ALLOCATION[active] : null

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-sm">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle cx="100" cy="100" r={r} fill="none" style={{ stroke: 'rgb(var(--c-divider))' }} strokeWidth="22" />
        {ALLOCATION.map((seg, i) => {
          const len = (seg.value / total) * circ * progress
          const el = (
            <circle
              key={seg.key}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={active === i ? 28 : 22}
              strokeDasharray={`${Math.max(len - 2, 0)} ${circ}`}
              strokeDashoffset={-offset}
              style={{ transition: 'stroke-width 0.25s ease', cursor: 'pointer', opacity: active == null || active === i ? 1 : 0.35 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            />
          )
          offset += (seg.value / total) * circ * progress
          return el
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-4xl font-extrabold tracking-tighter text-white tabular-nums">
          {current ? `${current.value.toFixed(2)}%` : '100%'}
        </span>
        <span className="mt-1 max-w-[9rem] text-xs text-white/50">{current ? t.clubPage.categories[current.key] : t.clubPage.total}</span>
      </div>
    </div>
  )
}

export default function InvestmentClub() {
  const { t } = useLang()
  const c = t.clubPage
  usePageTitle(t.meta.clubTitle)
  const [active, setActive] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const allocRef = useReveal()
  const holdRef = useReveal()
  const total = ALLOCATION.reduce((s, a) => s + a.value, 0)
  const maxPct = Math.max(...NOTABLE_HOLDINGS.map((h) => h.pct))

  return (
    <>
      <PageHero eyebrow={c.eyebrow} line1={c.line1} line2={c.line2} sub={c.sub} />

      <section ref={allocRef} className="py-24 sm:py-32">
        <div className={`${container} grid grid-cols-1 gap-14 lg:grid-cols-2 items-center`}>
          <div className="reveal-item">
            <Donut active={active} setActive={setActive} total={total} />
          </div>
          <div>
            <Eyebrow className="reveal-item mb-5">{c.allocEyebrow}</Eyebrow>
            <div className="reveal-item mb-10">
              <SectionTitle title={c.allocTitle} italic={c.allocTitleItalic} />
            </div>
            <div className="space-y-3">
              {ALLOCATION.map((seg, i) => (
                <button
                  key={seg.key}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className={`reveal-item flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all ${
                    active === i ? 'border-primary/40 bg-white/[0.04]' : 'border-divider bg-surface'
                  }`}
                >
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: seg.color }} />
                  <span className="text-white/80">{c.categories[seg.key]}</span>
                  <span className="ml-auto font-mono text-sm text-white tabular-nums">{seg.value.toFixed(2)}%</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={holdRef} className="bg-deep border-y border-divider py-24 sm:py-32">
        <div className={`${container} max-w-4xl`}>
          <p className="reveal-item text-white/55 leading-relaxed sm:text-lg">{c.disclaimer}</p>
          <p className="reveal-item mt-14 mb-6 font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-primary">{c.notable}</p>
          <div className="space-y-3">
            {NOTABLE_HOLDINGS.map((h) => (
              <div key={h.name} className="reveal-item rounded-2xl border border-divider bg-surface px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold text-white">{h.name}</span>
                  <span className="font-mono text-sm text-primary tabular-nums">{h.pct.toFixed(2)}%</span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary-dark to-primary" style={{ width: `${(h.pct / maxPct) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowAll((s) => !s)}
            aria-expanded={showAll}
            className="reveal-item mt-8 flex w-full items-center justify-between rounded-2xl border border-divider bg-surface px-5 py-4 text-white hover:border-primary/40 transition-colors"
          >
            <span className="font-semibold">{showAll ? c.hideAll : c.viewAll}</span>
            <ChevronDown className={`h-5 w-5 text-white/50 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
          </button>
          <div className={`grid transition-all duration-500 ${showAll ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="flex flex-wrap gap-2">
                {ALL_HOLDINGS.map((name) => (
                  <span key={name} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-white/75">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
