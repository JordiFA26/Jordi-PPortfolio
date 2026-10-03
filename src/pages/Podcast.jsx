import { useState } from 'react'
import { ChevronDown, Mic, Music2, Play, Youtube } from 'lucide-react'
import { useLang, useL } from '../i18n.jsx'
import { EPISODES, LATEST, LINKS, ytThumb, ytWatch } from '../data.js'
import {
  CountUp,
  Eyebrow,
  PageHero,
  PlatformLink,
  SectionTitle,
  usePageTitle,
  useReveal,
} from '../components.jsx'

const container = 'max-w-7xl mx-auto px-6 sm:px-10 lg:px-16'

function EpisodeCard({ ep }) {
  const l = useL()
  return (
              <a
                href={ytWatch(ep.id)}
                target="_blank"
                rel="noopener"
                className="ep-card group flex flex-col overflow-hidden rounded-3xl border border-divider bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="relative aspect-video overflow-hidden bg-deep">
                  <img src={ytThumb(ep.id)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-black/70 backdrop-blur px-3 py-1 font-display text-xs font-bold text-snow">
                    Ep. {ep.num}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-onprimary shadow-2xl shadow-primary/40">
                      <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                    </span>
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                    {l(ep.date)} · {ep.lang} · {l(ep.guest)}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug text-white">{ep.title}</h3>
                  <p className="mt-3 text-sm text-white/55 leading-relaxed line-clamp-3">{l(ep.desc)}</p>
                </div>
              </a>
  )
}

export default function Podcast() {
  const { t } = useLang()
  const l = useL()
  const p = t.podcastPage
  usePageTitle(t.meta.podcastTitle)
  const [showAll, setShowAll] = useState(false)

  const aboutRef = useReveal()
  const latestRef = useReveal()
  const archiveRef = useReveal('.ep-card', { stagger: 0.08 })
  const followRef = useReveal()

  return (
    <>
      <PageHero eyebrow={p.eyebrow} line1={p.line1} line2={p.line2} sub={p.sub}>
        <div className="hero-meta mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noopener"
            className="magnetic-btn inline-flex items-center justify-center gap-2 bg-primary text-onprimary font-semibold px-7 py-4 rounded-full shadow-2xl shadow-primary/30"
          >
            <Youtube className="h-4 w-4" />
            {p.watch}
          </a>
          <a
            href={LINKS.spotify}
            target="_blank"
            rel="noopener"
            className="lift-on-hover inline-flex items-center justify-center gap-2 bg-white/[0.06] backdrop-blur-md text-white border border-white/15 font-medium px-7 py-4 rounded-full hover:bg-white/10 transition-colors"
          >
            <Music2 className="h-4 w-4" />
            {p.listen}
          </a>
        </div>
        <div className="hero-meta mt-8 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/30 px-3 py-1.5 text-xs text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {p.newChip}
          </span>
          {p.chips.map((c) => (
            <span key={c} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/65">
              {c}
            </span>
          ))}
        </div>
      </PageHero>

      {/* About + stats */}
      <section ref={aboutRef} className="py-24 sm:py-32">
        <div className={`${container} grid grid-cols-1 gap-14 lg:grid-cols-12 items-center`}>
          <div className="lg:col-span-6">
            <Eyebrow className="reveal-item mb-5">{p.aboutEyebrow}</Eyebrow>
            <div className="reveal-item">
              <SectionTitle title={p.aboutTitle} italic={p.aboutTitleItalic} />
            </div>
            <div className="mt-8 space-y-5 text-white/65 text-base sm:text-lg leading-relaxed">
              {p.aboutP.map((para, i) => (
                <p key={i} className="reveal-item">{para}</p>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {p.stats.map((s) => (
                <div key={s.label} className="reveal-item rounded-3xl border border-divider bg-surface p-5">
                  <p className="font-display text-4xl sm:text-5xl font-extrabold tracking-tighter text-white">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-white/50 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 reveal-item">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/10 blur-2xl" />
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                {EPISODES.slice(0, 4).map((ep, i) => (
                  <a
                    key={ep.id}
                    href={ytWatch(ep.id)}
                    target="_blank"
                    rel="noopener"
                    className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 aspect-video shadow-xl shadow-shade/20 transition-transform duration-500 hover:-translate-y-1 ${
                      i % 2 ? 'translate-y-6' : ''
                    }`}
                  >
                    <img src={ytThumb(ep.id)} alt={ep.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2.5 py-0.5 font-display text-[11px] font-bold text-snow">Ep. {ep.num}</span>
                  </a>
                ))}
              </div>
              <p className="relative mt-10 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{p.mosaicLabel}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest episode */}
      <section id="latest" ref={latestRef} className="pb-24 sm:pb-32">
        <div className={container}>
          <Eyebrow className="reveal-item mb-5">{p.latestEyebrow}</Eyebrow>
          <div className="reveal-item mb-12">
            <SectionTitle title={p.latestTitle} italic={p.latestTitleItalic} />
          </div>
          <div className="reveal-item grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-4xl border border-divider bg-surface">
            <div className="lg:col-span-7 aspect-video bg-deep">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${LATEST.id}`}
                title={LATEST.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-onprimary">
                  {p.episodeLabel} {LATEST.num}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/55">
                  {LATEST.lang} · {l(LATEST.date)}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                {LATEST.title}
              </h3>
              <p className="mt-5 text-white/60 leading-relaxed">{l(LATEST.desc)}</p>
              <div className="mt-auto pt-8 flex flex-wrap gap-6">
                <a href={ytWatch(LATEST.id)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light">
                  <Youtube className="h-4 w-4" /> {p.watchYt} →
                </a>
                <a href={LINKS.spotify} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light">
                  <Music2 className="h-4 w-4" /> {p.listenSp} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Archive */}
      <section id="episodes" className="bg-deep border-y border-divider py-24 sm:py-32">
        <div className={container}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <Eyebrow className="mb-5">{p.archiveEyebrow}</Eyebrow>
              <SectionTitle title={p.archiveTitle} italic={p.archiveTitleItalic} />
            </div>
            <p className="text-white/55 max-w-md leading-relaxed">{p.archiveSub}</p>
          </div>
          <div ref={archiveRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EPISODES.slice(0, 3).map((ep) => (
              <EpisodeCard key={ep.id} ep={ep} />
            ))}
          </div>

          {EPISODES.length > 3 && (
            <>
              <button
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                className="mt-8 flex w-full items-center justify-between rounded-2xl border border-divider bg-surface px-6 py-5 text-left transition-colors hover:border-primary/40"
              >
                <span className="font-display font-semibold text-white">
                  {showAll ? p.hideAll : `${p.showAll} (${EPISODES.length})`}
                </span>
                <ChevronDown className={`h-5 w-5 text-white/50 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
              </button>
              <div className={`grid transition-all duration-500 ${showAll ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <ul className="divide-y divide-divider rounded-2xl border border-divider bg-surface">
                    {EPISODES.slice(3).map((ep) => (
                      <li key={ep.id}>
                        <a
                          href={ytWatch(ep.id)}
                          target="_blank"
                          rel="noopener"
                          className="group flex items-center gap-4 p-4 sm:p-5 transition-colors hover:bg-white/[0.03]"
                        >
                          <img src={ytThumb(ep.id)} alt="" loading="lazy" className="h-16 w-28 shrink-0 rounded-xl object-cover" />
                          <span className="min-w-0 flex-1">
                            <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                              Ep. {ep.num} · {l(ep.date)} · {ep.lang}
                            </span>
                            <span className="mt-1 block font-display font-semibold text-white leading-snug line-clamp-2">{ep.title}</span>
                          </span>
                          <Play className="h-4 w-4 shrink-0 text-white/40 group-hover:text-primary transition-colors" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Follow + Spotify */}
      <section id="listen" ref={followRef} className="py-24 sm:py-32">
        <div className={`${container} grid grid-cols-1 gap-14 lg:grid-cols-2`}>
          <div>
            <Eyebrow className="reveal-item mb-5">{p.followEyebrow}</Eyebrow>
            <div className="reveal-item mb-10">
              <SectionTitle title={p.followTitle} italic={p.followTitleItalic} />
            </div>
            <div className="space-y-3">
              <div className="reveal-item"><PlatformLink href={LINKS.youtube} icon="youtube" name="YouTube" handle={p.platforms.youtube} /></div>
              <div className="reveal-item"><PlatformLink href={LINKS.spotify} icon="spotify" name="Spotify" handle={p.platforms.spotify} /></div>
              <div className="reveal-item"><PlatformLink href={LINKS.tiktok} icon="tiktok" name="TikTok" handle={`@itm_podcast_ · ${p.platforms.tiktok}`} /></div>
              <div className="reveal-item"><PlatformLink href={LINKS.podcastInstagram} icon="instagram" name="Instagram" handle={p.platforms.instagram} /></div>
              <div className="reveal-item"><PlatformLink href={`mailto:${LINKS.podcastEmail}`} icon="email" name={p.platforms.email} handle={LINKS.podcastEmail} external={false} /></div>
            </div>
          </div>
          <div>
            <Eyebrow className="reveal-item mb-5 flex items-center gap-2"><Mic className="h-3.5 w-3.5" /> Spotify</Eyebrow>
            <div className="reveal-item mb-10">
              <SectionTitle title={p.playTitle} italic={p.playTitleItalic} />
            </div>
            <iframe
              className="reveal-item w-full rounded-3xl border border-divider"
              style={{ height: 352 }}
              src={LINKS.spotifyEmbed}
              title="Inside The Machine on Spotify"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  )
}
