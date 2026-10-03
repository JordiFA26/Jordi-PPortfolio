import { useEffect, useState } from 'react'
import { prefersReducedMotion } from './components.jsx'
import { fillVar, strokeVar } from './AeroWing.jsx'

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
   IB Extended Essay — wind tunnel: fan, flow, model 911 RSR on a
   scale, rear wing length stepping up run by run, meter + mini chart
---------------------------------------------------------------- */
const TUNNEL_FLOW = [
  'M44,32 C120,32 200,32 316,30',
  'M44,50 C110,50 160,48 200,52 C230,56 246,58 254,56 C276,48 298,42 316,40',
  'M44,66 C90,66 140,66 170,70 C200,74 236,80 250,82 C272,80 296,74 316,70',
  'M44,98 C70,98 90,96 110,94 C150,90 210,94 270,100 C290,102 304,102 316,102',
]
const WING_LENGTHS = [12, 20, 28, 36]
const METER = [0.32, 0.55, 0.76, 0.94] // illustrative fill, not measured data

export function WindTunnel({ anim, className = 'h-64' }) {
  const idx = useCycle(anim.states.length)
  const wing = WING_LENGTHS[idx]
  const runs = idx + 1

  return (
    <Frame header={anim.header} right={`RUN ${runs}/4`} status={anim.states[idx]} tag={anim.tag} className={className}>
      <svg viewBox="0 0 320 150" className="absolute inset-x-2 top-8 bottom-8 w-[calc(100%-1rem)] h-[calc(100%-4rem)]" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* tunnel walls */}
        <line x1="44" y1="20" x2="316" y2="20" style={strokeVar('divider')} strokeWidth="2" />
        <line x1="44" y1="128" x2="316" y2="128" style={strokeVar('divider')} strokeWidth="2" />

        {/* fan */}
        <g transform="translate(24 74)">
          <circle r="22" fill="none" style={strokeVar('fg')} strokeOpacity=".35" strokeWidth="1.5" />
          <g style={{ animation: prefersReducedMotion() ? 'none' : 'rv-spin 0.9s linear infinite', transformBox: 'fill-box', transformOrigin: 'center' }}>
            {[0, 90, 180, 270].map((d) => (
              <path key={d} d="M0,0 C4,-6 6,-16 2,-19 C-2,-16 -3,-6 0,0 Z" transform={`rotate(${d})`} style={fillVar('primary')} opacity=".85" />
            ))}
          </g>
          <circle r="3.5" style={fillVar('fg')} />
        </g>

        {/* flow */}
        {TUNNEL_FLOW.map((d, i) => (
          <path key={i} id={`tf-${i}`} d={d} fill="none" style={strokeVar('flow')} strokeOpacity=".7" strokeWidth="1.2" strokeDasharray="14 10"
            className="motion-safe:[animation:rv-dash_1.6s_linear_infinite]" />
        ))}
        {TUNNEL_FLOW.map((_, i) => (
          <circle key={`p${i}`} r="1.8" style={fillVar(i === 1 ? 'accent' : 'flow')}>
            <animateMotion dur={`${1.8 + i * 0.25}s`} begin={`${i * 0.3}s`} repeatCount="indefinite">
              <mpath href={`#tf-${i}`} />
            </animateMotion>
          </circle>
        ))}

        {/* model 911 RSR (scaled profile) on the scale */}
        <g transform="translate(96 50) scale(0.58)">
          <path
            d="M7,110 L12,107 L11,100 C10,95 12,92 16,90 C26,86 38,82 50,80 C62,78 74,78 86,79 C96,79 104,78 110,77 C122,64 134,50 152,44 C164,40 180,40 192,42 C226,48 262,62 296,72 C302,74 306,76 307,80 L308,96 C308,103 305,107 300,108 L251.8,108 A20,20 0 1 0 212.2,108 L91.8,108 A20,20 0 1 0 52.2,108 L16,108 Z"
            style={{ ...fillVar('surface'), ...strokeVar('fg') }}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M121,72 C131,61 142,50 156,46 L186,45 C204,47 220,53 232,61 L226,65 L123,72 Z" style={fillVar('fg')} opacity=".15" />
          <circle cx="72" cy="101" r="16" style={{ ...fillVar('surface2'), ...strokeVar('fg') }} strokeWidth="3" />
          <circle cx="232" cy="101" r="16" style={{ ...fillVar('surface2'), ...strokeVar('fg') }} strokeWidth="3" />
          {/* strut + wing whose chord grows each run */}
          <line x1="270" y1="66" x2="270" y2="40" style={strokeVar('fg')} strokeWidth="3" />
          <rect
            x={270 - wing}
            y="32"
            width={wing * 2}
            height="7"
            rx="3.5"
            style={{ ...fillVar('primary'), transition: 'x 0.6s cubic-bezier(0.34,1.56,0.64,1), width 0.6s cubic-bezier(0.34,1.56,0.64,1)' }}
          />
        </g>

        {/* scale platform + reading bar */}
        <rect x="96" y="114" width="186" height="6" rx="2" style={fillVar('fg')} opacity=".25" />
        <rect x="150" y="124" width="90" height="5" rx="2.5" style={fillVar('divider')} />
        <rect x="150" y="124" width={90 * METER[idx]} height="5" rx="2.5" style={{ ...fillVar('accent'), transition: 'width 0.6s ease' }} />
        <text x="146" y="129" textAnchor="end" fontSize="6" fontFamily="JetBrains Mono, monospace" style={fillVar('muted')}>
          {anim.meter.toUpperCase()}
        </text>

        {/* mini chart: downforce vs wing length, points appear run by run */}
        <g transform="translate(254 26)">
          <rect width="60" height="40" rx="5" style={{ ...fillVar('surface'), ...strokeVar('divider') }} strokeWidth="1" opacity=".9" />
          <line x1="8" y1="33" x2="54" y2="33" style={strokeVar('muted')} strokeWidth=".8" />
          <line x1="8" y1="33" x2="8" y2="6" style={strokeVar('muted')} strokeWidth=".8" />
          <polyline
            points={METER.slice(0, runs).map((m, i) => `${12 + i * 13},${33 - m * 24}`).join(' ')}
            fill="none"
            style={strokeVar('primary')}
            strokeWidth="1.5"
          />
          {METER.slice(0, runs).map((m, i) => (
            <circle key={i} cx={12 + i * 13} cy={33 - m * 24} r="2" style={fillVar(i === runs - 1 ? 'accent' : 'primary')} />
          ))}
        </g>
      </svg>
    </Frame>
  )
}

/* ----------------------------------------------------------------
   Formula Student paper — CFD-style side view of a single-seater with
   pressure zones on the wings and a meshing → solving cycle
---------------------------------------------------------------- */
const CFD_FLOW = [
  'M-10,26 C80,26 200,24 330,20',
  'M-10,46 C40,46 80,44 120,40 C160,36 200,36 240,34 C262,30 284,20 330,14',
  'M-10,70 C20,70 40,66 70,62 C110,56 150,58 190,62 C230,66 252,58 270,52 C292,46 310,44 330,44',
  'M-10,104 C10,102 24,96 44,96 C80,96 120,100 200,102 C250,104 290,104 330,104',
]

export function FsCfd({ anim, className = 'h-64' }) {
  const idx = useCycle(anim.states.length)
  const meshing = idx === 0
  const showPressure = idx >= 2

  return (
    <Frame header={anim.header} right={`ITER ${[120, 860, 2400, 3000][idx]}`} status={anim.states[idx]} tag={anim.tag} className={className}>
      <svg viewBox="0 0 320 150" className="absolute inset-x-2 top-8 bottom-8 w-[calc(100%-1rem)] h-[calc(100%-4rem)]" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <radialGradient id="cfd-high">
            <stop offset="0" stopColor="rgb(var(--c-accent))" stopOpacity=".75" />
            <stop offset="1" stopColor="rgb(var(--c-accent))" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cfd-low">
            <stop offset="0" stopColor="rgb(var(--c-primary))" stopOpacity=".8" />
            <stop offset="1" stopColor="rgb(var(--c-primary))" stopOpacity="0" />
          </radialGradient>
          <pattern id="cfd-mesh" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M8,0 L0,0 0,8 M0,8 L8,0" fill="none" style={strokeVar('primary-light')} strokeOpacity=".25" strokeWidth=".5" />
          </pattern>
        </defs>

        {/* mesh overlay while meshing */}
        <rect x="0" y="14" width="320" height="112" fill="url(#cfd-mesh)" style={{ opacity: meshing ? 1 : 0, transition: 'opacity 0.6s ease' }} />

        {/* pressure zones */}
        <g style={{ opacity: showPressure ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <ellipse cx="34" cy="108" rx="34" ry="12" fill="url(#cfd-high)" style={{ animation: 'rv-pulse 2s ease-in-out infinite' }} />
          <ellipse cx="282" cy="36" rx="36" ry="12" fill="url(#cfd-high)" style={{ animation: 'rv-pulse 2s ease-in-out infinite' }} />
          <ellipse cx="282" cy="56" rx="34" ry="10" fill="url(#cfd-low)" style={{ animation: 'rv-pulse 2s ease-in-out .5s infinite' }} />
          <ellipse cx="150" cy="122" rx="90" ry="8" fill="url(#cfd-low)" style={{ animation: 'rv-pulse 2s ease-in-out .8s infinite' }} />
        </g>

        {/* streamlines */}
        {CFD_FLOW.map((d, i) => (
          <path key={i} id={`cf-${i}`} d={d} fill="none" style={strokeVar('flow')} strokeOpacity={idx === 0 ? 0.25 : 0.7} strokeWidth="1.2" strokeDasharray="14 10"
            className="motion-safe:[animation:rv-dash_2s_linear_infinite]" />
        ))}
        {idx > 0 &&
          CFD_FLOW.map((_, i) => (
            <circle key={`p${i}`} r="1.8" style={fillVar(i === 2 ? 'accent' : 'flow')}>
              <animateMotion dur={`${2 + i * 0.3}s`} begin={`${i * 0.25}s`} repeatCount="indefinite">
                <mpath href={`#cf-${i}`} />
              </animateMotion>
            </circle>
          ))}

        {/* single-seater, nose left */}
        <g style={{ ...strokeVar('fg') }} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          {/* front wing */}
          <path d="M6,112 L58,112 L58,116 L8,118 Z" style={fillVar('surface')} />
          <path d="M14,106 L52,106 L52,109 L16,110 Z" style={fillVar('surface')} />
          <line x1="20" y1="104" x2="20" y2="118" />
          {/* nose + monocoque + engine cover */}
          <path
            d="M30,104 C40,100 70,94 104,90 L128,88 C134,80 144,74 156,72 L170,72 L172,80 C196,82 222,86 246,92 L252,104 L118,108 C90,108 60,108 30,104 Z"
            style={fillVar('surface')}
          />
          {/* roll hoop + halo-ish line + driver helmet */}
          <path d="M162,72 L166,56 L176,56 L178,80" fill="none" />
          <circle cx="150" cy="78" r="6" style={fillVar('primary')} stroke="none" />
          {/* sidepod */}
          <path d="M120,96 L200,92 L214,104 L124,106 Z" style={fillVar('surface2')} />
          {/* rear wing: endplate + two elements */}
          <path d="M266,40 L300,38 L298,92 L270,94 Z" fill="none" strokeOpacity=".45" strokeDasharray="3 3" />
          <path d="M258,46 C272,42 292,42 304,44 L304,49 C290,48 272,49 258,52 Z" style={fillVar('primary')} />
          <path d="M276,34 C286,32 298,32 306,34 L306,38 C296,37 286,37 276,39 Z" style={fillVar('primary')} opacity=".75" />
          <path d="M244,92 C252,80 262,64 272,52" fill="none" />
          <path d="M250,96 C262,86 274,70 284,52" fill="none" strokeOpacity=".6" />
          {/* wheels */}
          <circle cx="76" cy="108" r="17" style={fillVar('surface2')} />
          <circle cx="76" cy="108" r="7" fill="none" strokeOpacity=".6" />
          <circle cx="232" cy="106" r="19" style={fillVar('surface2')} />
          <circle cx="232" cy="106" r="8" fill="none" strokeOpacity=".6" />
        </g>
        <line x1="-10" y1="126" x2="330" y2="126" style={strokeVar('divider')} strokeWidth="1" />
      </svg>
    </Frame>
  )
}

export const RESEARCH_VISUALS = { tunnel: WindTunnel, cfd: FsCfd }
