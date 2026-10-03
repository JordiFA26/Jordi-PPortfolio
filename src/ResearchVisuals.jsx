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
   Formula Student paper — underfloor & diffuser: side view focused on
   the floor. Flow speeds up through the floor/ground gap (ground
   effect), a low-pressure zone builds under the floor, and the diffuser
   expands the flow at the rear. Car body stays faded so the floor leads.
---------------------------------------------------------------- */
const FLOOR = 'M96,116 C110,118 150,119 196,119 C230,119 262,110 292,98'
const OVER_FLOW = [
  'M-10,36 C100,36 200,34 330,30',
  'M-10,66 C40,66 80,62 120,58 C160,52 200,52 240,56 C280,60 300,60 330,60',
]
const UNDER_FLOW = [
  'M-10,121 C40,121 80,121 100,121 C150,122 190,123 210,123 C246,122 276,112 330,94',
  'M-10,125 C60,125 150,126 200,126 C246,126 288,120 330,110',
]

export function FsCfd({ anim, className = 'h-64' }) {
  const idx = useCycle(anim.states.length)
  const meshing = idx === 0
  const flowing = idx >= 1
  const lowP = idx >= 2
  const diffuser = idx === 3

  return (
    <Frame header={anim.header} right={`ITER ${[120, 900, 2400, 3000][idx]}`} status={anim.states[idx]} tag={anim.tag} className={className}>
      <svg viewBox="0 0 320 150" className="absolute inset-x-2 top-8 bottom-8 w-[calc(100%-1rem)] h-[calc(100%-4rem)]" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="floor-p" x1="96" x2="292" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="rgb(var(--c-primary))" stopOpacity=".15" />
            <stop offset="0.5" stopColor="rgb(var(--c-primary))" stopOpacity=".9" />
            <stop offset="1" stopColor="rgb(var(--c-primary))" stopOpacity=".25" />
          </linearGradient>
          <pattern id="floor-mesh" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M6,0 L0,0 0,6 M0,6 L6,0" fill="none" style={strokeVar('primary-light')} strokeOpacity=".35" strokeWidth=".5" />
          </pattern>
          <clipPath id="under-floor">
            <path d={`${FLOOR} L300,128 L90,128 Z`} />
          </clipPath>
        </defs>

        {/* moving road */}
        <line x1="-10" y1="128.5" x2="330" y2="128.5" style={strokeVar('divider')} strokeWidth="1.5" />
        <line x1="-10" y1="131" x2="330" y2="131" style={strokeVar('fg')} strokeOpacity=".25" strokeWidth="1" strokeDasharray="6 10"
          className="motion-safe:[animation:rv-dash_1s_linear_infinite]" />

        {/* mesh under the floor while meshing */}
        <rect x="88" y="90" width="214" height="40" fill="url(#floor-mesh)" clipPath="url(#under-floor)" style={{ opacity: meshing ? 1 : 0, transition: 'opacity 0.6s ease' }} />

        {/* low-pressure field between floor and ground */}
        <path
          d={`${FLOOR} L292,128 L96,128 Z`}
          fill="url(#floor-p)"
          style={{ opacity: lowP ? 1 : 0, transition: 'opacity 0.7s ease', animation: lowP ? 'rv-pulse 2s ease-in-out infinite' : 'none' }}
        />

        {/* flow over the car (slow, faded) */}
        {OVER_FLOW.map((d, i) => (
          <path key={i} d={d} fill="none" style={strokeVar('flow')} strokeOpacity=".3" strokeWidth="1" strokeDasharray="14 12"
            className="motion-safe:[animation:rv-dash_2.6s_linear_infinite]" />
        ))}

        {/* accelerated flow under the floor */}
        {UNDER_FLOW.map((d, i) => (
          <path key={i} id={`uf-${i}`} d={d} fill="none" style={strokeVar(i === 0 ? 'flow' : 'primary')} strokeOpacity={flowing ? 0.9 : 0.2} strokeWidth="1.4" strokeDasharray="10 6"
            className="motion-safe:[animation:rv-dash_0.7s_linear_infinite]" />
        ))}
        {flowing &&
          UNDER_FLOW.map((_, i) =>
            [0, 1].map((k) => (
              <circle key={`${i}-${k}`} r="1.8" style={fillVar(k === 0 && i === 0 ? 'accent' : 'flow')}>
                <animateMotion dur={`${1.1 + i * 0.2}s`} begin={`${k * 0.55}s`} repeatCount="indefinite">
                  <mpath href={`#uf-${i}`} />
                </animateMotion>
              </circle>
            )),
          )}

        {/* faded single-seater body */}
        <g style={strokeVar('fg')} strokeOpacity=".4" strokeWidth="1.4" strokeLinejoin="round" fill="none">
          <path d="M8,118 L56,118 L56,121 L10,122 Z" />
          <path d="M30,110 C40,106 70,100 104,96 L128,94 C134,86 144,80 156,78 L170,78 L172,86 C196,88 222,92 246,98 L252,108" />
          <path d="M162,78 L166,62 L176,62 L178,86" />
          <path d="M266,46 L300,44 L298,96" strokeDasharray="3 3" />
          <path d="M258,52 C272,48 292,48 304,50 L304,55 C290,54 272,55 258,58 Z" />
          <path d="M244,98 C252,86 262,70 272,58" />
          <circle cx="70" cy="112" r="16" style={fillVar('surface2')} fillOpacity=".7" />
          <circle cx="236" cy="110" r="18" style={fillVar('surface2')} fillOpacity=".7" />
        </g>

        {/* the floor + diffuser (highlighted) */}
        <path d={FLOOR} fill="none" style={strokeVar('primary')} strokeWidth="2.6" strokeLinecap="round" />
        {[232, 252, 272].map((x, i) => (
          <line key={x} x1={x} y1={[116, 110.5, 104][i]} x2={x} y2={[123, 120, 117][i]} style={strokeVar('primary')} strokeWidth="1.4" strokeOpacity=".8" />
        ))}

        {/* diffuser expansion arrows */}
        <g style={{ opacity: diffuser ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${280 + i * 9},${118 - i * 2} l10,-8 m-5,0 l5,0 l0,5`} fill="none" style={strokeVar('accent')} strokeWidth="1.6" strokeLinecap="round"
              className="motion-safe:[animation:rv-pulse_1.2s_ease-in-out_infinite]" />
          ))}
        </g>

        {/* mini chart: pressure along the floor (dips at the throat, recovers in the diffuser) */}
        <g transform="translate(14 20)">
          <rect width="78" height="40" rx="5" style={{ ...fillVar('surface'), ...strokeVar('divider') }} strokeWidth="1" opacity=".92" />
          <line x1="8" y1="12" x2="72" y2="12" style={strokeVar('muted')} strokeWidth=".6" strokeDasharray="2 2" />
          <line x1="8" y1="6" x2="8" y2="34" style={strokeVar('muted')} strokeWidth=".8" />
          <path
            d="M8,12 C18,13 24,32 38,33 C50,34 60,22 72,15"
            fill="none"
            style={{ ...strokeVar('primary'), strokeDashoffset: lowP ? 0 : 1, transition: 'stroke-dashoffset 1.2s ease' }}
            strokeWidth="1.6"
            pathLength="1"
            strokeDasharray="1"
          />
          <text x="11" y="9" fontSize="5" fontFamily="JetBrains Mono, monospace" style={fillVar('muted')}>Cp</text>
          <text x="40" y="38.5" fontSize="4.2" fontFamily="JetBrains Mono, monospace" style={fillVar('muted')} textAnchor="middle">
            {anim.cp.toUpperCase()}
          </text>
        </g>
      </svg>
    </Frame>
  )
}

export const RESEARCH_VISUALS = { tunnel: WindTunnel, cfd: FsCfd }
