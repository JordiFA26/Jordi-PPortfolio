import { useEffect, useState } from 'react'
import { useLang } from './i18n.jsx'
import { prefersReducedMotion } from './components.jsx'

/* ----------------------------------------------------------------
   Feature card 2 — Signature animation: airflow over a Porsche 911
   GT3 RS side profile (re-skin of the skill's falling-drop component:
   source = car body, particles = air parcels, ripples = wake vortices)
---------------------------------------------------------------- */
// Coordinates follow the GT3 RS line drawing (public/gt3rs-lines.png),
// placed at x 0–1500, y 480–960. Wheel centres sit inside its arches.
const STREAMLINES = [
  'M-40,492 C400,492 900,486 1580,470',
  'M-40,600 C200,600 400,580 600,555 C750,530 900,515 1050,525 C1200,535 1300,525 1360,500 C1420,482 1500,470 1580,465',
  'M-40,705 C150,705 300,652 500,622 C650,590 800,550 950,542 C1100,536 1240,572 1330,598 C1420,602 1480,582 1580,560',
  'M-40,812 C60,790 150,708 300,676 C420,652 520,646 640,640',
]
const WHEELS = [305, 1150]

export const fillVar = (name) => ({ fill: `rgb(var(--c-${name}))` })
export const strokeVar = (name) => ({ stroke: `rgb(var(--c-${name}))` })

function Wheel({ x }) {
  const cy = 842
  return (
    <g fill="none" strokeLinecap="round">
      <circle cx={x} cy={cy} r="103" style={{ ...fillVar('surface2'), ...strokeVar('fg') }} strokeWidth="9" />
      <circle cx={x} cy={cy} r="66" style={strokeVar('fg')} strokeWidth="6" opacity=".7" />
      <g style={strokeVar('fg')} strokeWidth="6" opacity=".55">
        {[0, 36, 72, 108, 144].map((deg) => {
          const r = (deg * Math.PI) / 180
          return <line key={deg} x1={x - Math.cos(r) * 62} y1={cy - Math.sin(r) * 62} x2={x + Math.cos(r) * 62} y2={cy + Math.sin(r) * 62} />
        })}
      </g>
      <circle cx={x} cy={cy} r="14" style={fillVar('primary')} />
      <path d={`M${x - 58},${cy - 40} A70,70 0 0 1 ${x - 20},${cy - 67}`} style={strokeVar('accent')} strokeWidth="14" />
    </g>
  )
}

// `anim` overrides the labels; `plot` turns it into the IB Extended Essay
// version: the wing grows run by run and a downforce-vs-length chart plots.
const PLOT_SCALES = [0.7, 0.9, 1.1, 1.3]
const PLOT_METER = [0.32, 0.55, 0.76, 0.94] // illustrative trend, not measured data

export function AeroWing({ className = 'h-44', anim, plot = false }) {
  const { t } = useLang()
  const states = anim?.states ?? t.features.aero.states
  const header = anim?.header ?? t.features.aero.header
  const tag = anim?.tag ?? '911 GT3 RS'
  const [idx, setIdx] = useState(0)
  const [downforce, setDownforce] = useState(412)
  const wingScale = plot ? PLOT_SCALES : [0.78, 1, 1.18, 1]
  const runs = idx + 1

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % states.length)
      setDownforce(380 + Math.round(Math.random() * 90))
    }, 2300)
    return () => clearInterval(id)
  }, [states.length])

  return (
    <div className={`relative ${className} w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/15 via-surface2 to-surface2`}>
      <style>{`
        @keyframes air-dash { to { stroke-dashoffset: -520; } }
        @keyframes air-ripple {
          0%   { transform: scale(0.4); opacity: 0.9; }
          80%  { transform: scale(3.2); opacity: 0; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        @keyframes air-fadein { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Atmospheric blobs */}
      <div className="absolute -top-10 left-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute bottom-0 right-4 h-20 w-28 rounded-full bg-accent/10 blur-2xl" />

      {/* Header strip */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">{header}</span>
        <span className="font-mono text-[10px] text-primary-light tabular-nums">{plot ? `RUN ${runs}/4` : `DF ${downforce} kg`}</span>
      </div>

      <svg viewBox="-40 460 1600 500" className="absolute inset-x-2 top-9 bottom-7 w-[calc(100%-1rem)] h-[calc(100%-4rem)]" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="flow" x1="0" x2="1">
            <stop offset="0" stopColor="rgb(var(--c-flow))" stopOpacity="0" />
            <stop offset="0.5" stopColor="rgb(var(--c-flow))" stopOpacity="0.75" />
            <stop offset="1" stopColor="rgb(var(--c-primary))" stopOpacity="0.3" />
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
            strokeWidth="5"
            strokeDasharray="80 50"
            style={{ animation: `air-dash ${2.4 + i * 0.3}s linear infinite` }}
          />
        ))}

        {/* Air parcels travelling along the streamlines */}
        {STREAMLINES.map((_, i) =>
          [0, 1].map((k) => (
            <circle key={`${i}-${k}`} r={k ? 7 : 10} style={fillVar(i === 2 && k === 0 ? 'accent' : 'flow')}>
              <animateMotion dur={`${2.2 + i * 0.35}s`} begin={`${k * 1.1 + i * 0.3}s`} repeatCount="indefinite">
                <mpath href={`#sl-${i}`} />
              </animateMotion>
            </circle>
          )),
        )}

        {/* Porsche 911 GT3 RS line drawing, tinted with the theme colour via a mask */}
        <mask id="gt3rs-mask" maskUnits="userSpaceOnUse" x="0" y="480" width="1500" height="480">
          <image href="/gt3rs-lines.png" x="0" y="480" width="1500" height="480" preserveAspectRatio="none" />
        </mask>
        <rect x="0" y="480" width="1500" height="480" style={fillVar('fg')} mask="url(#gt3rs-mask)" opacity=".92" />

        {/* Rear wing plane — redrawn so its chord can change with each test state */}
        <g
          style={{
            transformBox: 'view-box',
            transformOrigin: '1342px 540px',
            transform: `scaleX(${wingScale[idx % wingScale.length]})`,
            transition: 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <path
            d="M1338,523 L1356,517 C1400,511 1450,507 1486,506 C1493,506 1495,510 1493,517 L1424,562 L1340,571 Z"
            style={{ fill: 'rgb(var(--c-primary) / 0.28)', ...strokeVar('primary') }}
            strokeWidth="9"
            strokeLinejoin="round"
          />
        </g>

        {WHEELS.map((x) => (
          <Wheel key={x} x={x} />
        ))}

        {plot && (
          <g transform="translate(-20 474) scale(4.2)">
            <rect width="78" height="40" rx="5" style={{ ...fillVar('surface'), ...strokeVar('divider') }} strokeWidth=".4" opacity=".92" />
            <line x1="8" y1="33" x2="72" y2="33" style={strokeVar('muted')} strokeWidth=".5" />
            <line x1="8" y1="33" x2="8" y2="6" style={strokeVar('muted')} strokeWidth=".5" />
            <polyline
              points={PLOT_METER.slice(0, runs).map((m, i) => `${16 + i * 16},${33 - m * 24}`).join(' ')}
              fill="none"
              style={strokeVar('primary')}
              strokeWidth="1.2"
            />
            {PLOT_METER.slice(0, runs).map((m, i) => (
              <circle key={i} cx={16 + i * 16} cy={33 - m * 24} r="2" style={fillVar(i === runs - 1 ? 'accent' : 'primary')} />
            ))}
            <text x="11" y="9" fontSize="4.2" fontFamily="JetBrains Mono, monospace" style={fillVar('muted')}>DF</text>
            <text x="72" y="38.5" fontSize="3.6" fontFamily="JetBrains Mono, monospace" textAnchor="end" style={fillVar('muted')}>
              {(anim?.axis ?? 'wing length').toUpperCase()}
            </text>
          </g>
        )}

        {/* Ground */}
        <line x1="-40" y1="947" x2="1580" y2="947" style={strokeVar('divider')} strokeWidth="5" />
      </svg>

      {/* Wake vortices (ripples) behind the wing */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute h-3 w-3 rounded-full border border-primary/60"
          style={{ right: `${3 + i * 4}%`, top: `${24 + i * 7}%`, animation: `air-ripple 2.4s ease-out ${i * 0.8}s infinite` }}
        />
      ))}

      {/* Footer strip */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 z-10">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span key={idx} className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70" style={{ animation: 'air-fadein 0.4s ease both' }}>
          {states[idx]}
        </span>
        <span className="ml-auto font-mono text-[10px] text-white/40">{tag}</span>
      </div>
    </div>
  )
}

