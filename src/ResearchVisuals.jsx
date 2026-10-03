import { useEffect, useState } from 'react'
import { prefersReducedMotion } from './components.jsx'
import { AeroWing, fillVar, strokeVar } from './AeroWing.jsx'

// One animation per research paper. Each shares the same frame as the
// homepage GT3 RS card: header strip, scene, cycling status footer.

function useCycle(length, ms = 2300) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setIdx((i) => (i + 1) % length), ms)
    return () => clearInterval(id)
  }, [length, ms])
  return idx
}

const KEYFRAMES = `
  @keyframes rv-dash { to { stroke-dashoffset: -120; } }
  @keyframes rv-dash-lg { to { stroke-dashoffset: -400; } }
  @keyframes rv-spin { to { transform: rotate(360deg); } }
  @keyframes rv-fadein { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes rv-pulse { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
`

function Frame({ header, right, status, tag, className, children }) {
  return (
    <div className={`relative ${className} w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/15 via-surface2 to-surface2`}>
      <style>{KEYFRAMES}</style>
      <div className="absolute -top-10 left-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute bottom-0 right-4 h-20 w-28 rounded-full bg-accent/10 blur-2xl" />
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">{header}</span>
        <span className="font-mono text-[10px] text-primary-light tabular-nums">{right}</span>
      </div>
      {children}
      <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 z-10">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span key={status} className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70" style={{ animation: 'rv-fadein 0.4s ease both' }}>
          {status}
        </span>
        <span className="ml-auto font-mono text-[10px] text-white/40">{tag}</span>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   IB Extended Essay — the GT3 RS airflow card in "plot" mode: the rear
   wing grows run by run and a downforce-vs-wing-length chart fills in
---------------------------------------------------------------- */
export function WindTunnel({ anim, className = 'h-64' }) {
  return <AeroWing anim={anim} plot className={className} />
}

/* ----------------------------------------------------------------
   Formula Student paper — underfloor & diffuser on the team's car
   (public/fs-car-lines.png, traced from the render, nose left).
   Coordinates match the drawing: 895 × 354, floor ≈ y331 from x410–650,
   diffuser rising behind the rear wheel to ≈ (860, 300), ground ≈ y348.
---------------------------------------------------------------- */
const FS_FLOOR = 'M410,331 L650,331'
const FS_DIFFUSER = 'M650,331 C700,328 780,312 860,300'
const FS_UNDER = [
  'M-60,338 C200,338 380,338 420,338 L650,339 C720,338 800,320 860,303 C900,293 930,289 955,287',
  'M-60,344 C300,344 600,344 660,344 C740,343 820,330 955,317',
]
const FS_OVER = [
  'M-60,26 C300,26 600,22 955,14',
  'M-60,214 C40,211 120,196 250,186 C400,176 560,170 650,162 C720,150 770,110 800,60 C820,32 880,18 955,14',
]

export function FsCfd({ anim, className = 'h-64' }) {
  const idx = useCycle(anim.states.length)
  const meshing = idx === 0
  const flowing = idx >= 1
  const lowP = idx >= 2
  const diffuser = idx === 3

  return (
    <Frame header={anim.header} right={`ITER ${[120, 900, 2400, 3000][idx]}`} status={anim.states[idx]} tag={anim.tag} className={className}>
      <svg viewBox="-60 -10 1015 375" className="absolute inset-x-2 top-8 bottom-8 w-[calc(100%-1rem)] h-[calc(100%-4rem)]" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="fs-lowp" x1="410" x2="860" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="rgb(var(--c-primary))" stopOpacity=".2" />
            <stop offset="0.45" stopColor="rgb(var(--c-primary))" stopOpacity=".95" />
            <stop offset="1" stopColor="rgb(var(--c-primary))" stopOpacity=".25" />
          </linearGradient>
          <pattern id="fs-mesh" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14,0 L0,0 0,14 M0,14 L14,0" fill="none" style={strokeVar('primary-light')} strokeOpacity=".4" strokeWidth="1" />
          </pattern>
          <mask id="fs-car-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="895" height="354">
            <image href="/fs-car-lines.png" x="0" y="0" width="895" height="354" preserveAspectRatio="none" />
          </mask>
        </defs>

        {/* moving road */}
        <line x1="-60" y1="349" x2="955" y2="349" style={strokeVar('divider')} strokeWidth="3" />
        <line x1="-60" y1="357" x2="955" y2="357" style={strokeVar('fg')} strokeOpacity=".25" strokeWidth="2.5" strokeDasharray="18 28"
          className="motion-safe:[animation:rv-dash-lg_1s_linear_infinite]" />

        {/* flow over the car (slow, faded) */}
        {FS_OVER.map((d, i) => (
          <path key={i} d={d} fill="none" style={strokeVar('flow')} strokeOpacity=".3" strokeWidth="2.5" strokeDasharray="40 34"
            className="motion-safe:[animation:rv-dash-lg_2.8s_linear_infinite]" />
        ))}

        {/* mesh under the floor while meshing */}
        <path d="M400,326 L660,326 C710,322 790,306 870,292 L870,350 L400,350 Z" fill="url(#fs-mesh)" style={{ opacity: meshing ? 1 : 0, transition: 'opacity 0.6s ease' }} />

        {/* low-pressure field between floor/diffuser and ground */}
        <path
          d={`${FS_FLOOR} ${FS_DIFFUSER.replace('M650,331', '')} L860,348 L410,348 Z`}
          fill="url(#fs-lowp)"
          style={{ opacity: lowP ? 1 : 0, transition: 'opacity 0.7s ease', animation: lowP ? 'rv-pulse 2s ease-in-out infinite' : 'none' }}
        />

        {/* the team's car — traced line drawing tinted with the theme colour */}
        <rect x="0" y="0" width="895" height="354" style={fillVar('fg')} mask="url(#fs-car-mask)" opacity=".8" />

        {/* floor (solid) + diffuser ramp (dashed where it sits behind the rear wheel) */}
        <path d={FS_FLOOR} fill="none" style={strokeVar('primary')} strokeWidth="6" strokeLinecap="round" />
        <path d={FS_DIFFUSER} fill="none" style={strokeVar('primary')} strokeWidth="5" strokeLinecap="round" strokeDasharray="14 8" />

        {/* accelerated flow under the floor */}
        {FS_UNDER.map((d, i) => (
          <path key={i} id={`fu-${i}`} d={d} fill="none" style={strokeVar(i === 0 ? 'flow' : 'primary')} strokeOpacity={flowing ? 0.95 : 0.2} strokeWidth="3" strokeDasharray="26 14"
            className="motion-safe:[animation:rv-dash-lg_0.6s_linear_infinite]" />
        ))}
        {flowing &&
          FS_UNDER.map((_, i) =>
            [0, 1].map((k) => (
              <circle key={`${i}-${k}`} r="5" style={fillVar(k === 0 && i === 0 ? 'accent' : 'flow')}>
                <animateMotion dur={`${1.1 + i * 0.2}s`} begin={`${k * 0.55}s`} repeatCount="indefinite">
                  <mpath href={`#fu-${i}`} />
                </animateMotion>
              </circle>
            )),
          )}

        {/* diffuser expansion arrows */}
        <g style={{ opacity: diffuser ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${872 + i * 24},${312 - i * 6} l28,-22 m-14,0 l14,0 l0,14`} fill="none" style={strokeVar('accent')} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"
              className="motion-safe:[animation:rv-pulse_1.2s_ease-in-out_infinite]" />
          ))}
        </g>

        {/* mini chart: pressure along the floor */}
        <g transform="translate(-30 4) scale(3.1)">
          <rect width="78" height="40" rx="5" style={{ ...fillVar('surface'), ...strokeVar('divider') }} strokeWidth=".4" opacity=".92" />
          <line x1="8" y1="12" x2="72" y2="12" style={strokeVar('muted')} strokeWidth=".4" strokeDasharray="2 2" />
          <line x1="8" y1="6" x2="8" y2="34" style={strokeVar('muted')} strokeWidth=".5" />
          <path
            d="M8,12 C18,13 24,32 38,33 C50,34 60,22 72,15"
            fill="none"
            style={{ ...strokeVar('primary'), strokeDashoffset: lowP ? 0 : 1, transition: 'stroke-dashoffset 1.2s ease' }}
            strokeWidth="1.4"
            pathLength="1"
            strokeDasharray="1"
          />
          <text x="11" y="9" fontSize="4.6" fontFamily="JetBrains Mono, monospace" style={fillVar('muted')}>Cp</text>
          <text x="40" y="38.5" fontSize="3.6" fontFamily="JetBrains Mono, monospace" style={fillVar('muted')} textAnchor="middle">
            {anim.cp.toUpperCase()}
          </text>
        </g>
      </svg>
    </Frame>
  )
}

export const RESEARCH_VISUALS = { tunnel: WindTunnel, cfd: FsCfd }
