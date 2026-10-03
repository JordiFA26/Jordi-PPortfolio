import { ArrowUpRight, CalendarClock, CheckCircle2, FileText, Loader } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { LINKS } from '../data.js'
import { Eyebrow, PageHero, usePageTitle, useReveal } from '../components.jsx'
import { AeroWing } from '../AeroWing.jsx'

const container = 'max-w-7xl mx-auto px-6 sm:px-10 lg:px-16'

function StatusBadge({ status, r }) {
  return status === 'done' ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-500">
      <CheckCircle2 className="h-3.5 w-3.5" />
      {r.completed}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
      <Loader className="h-3.5 w-3.5 animate-spin [animation-duration:3s]" />
      {r.inProgress}
    </span>
  )
}

export default function Research() {
  const { t } = useLang()
  const r = t.researchPage
  usePageTitle(t.meta.researchTitle)
  const papersRef = useReveal('.paper-card', { stagger: 0.12 })

  return (
    <>
      <PageHero eyebrow={r.eyebrow} line1={r.line1} line2={r.line2} sub={r.sub}>
        <div className="hero-meta mt-10 max-w-2xl">
          <AeroWing className="h-56 sm:h-64" />
        </div>
      </PageHero>

      <section className="py-24 sm:py-32">
        <div className={container}>
          <div ref={papersRef} className="grid grid-cols-1 gap-6">
            {r.papers.map((paper) => {
              const done = paper.status === 'done'
              return (
                <article
                  key={paper.key}
                  className={`paper-card grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-4xl border bg-surface p-6 sm:p-10 transition-colors ${
                    done ? 'border-divider hover:border-primary/30' : 'border-dashed border-accent/40'
                  }`}
                >
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge status={paper.status} r={r} />
                      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.16em] text-primary">{paper.context}</span>
                    </div>
                    <h2 className="mt-5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight text-balance">
                      {paper.title}
                    </h2>
                    <p className="mt-4 text-white/60 leading-relaxed sm:text-lg">{paper.abstract}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {paper.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col justify-center gap-4 lg:border-l lg:border-divider lg:pl-8">
                    {done && paper.pdf ? (
                      <a
                        href={LINKS.researchPaper}
                        target="_blank"
                        rel="noopener"
                        className="magnetic-btn inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-onprimary shadow-xl shadow-primary/20"
                      >
                        <FileText className="h-4 w-4" />
                        {r.readPdf}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/5 px-5 py-4">
                          <CalendarClock className="h-5 w-5 shrink-0 text-accent" />
                          <span className="font-semibold text-white">{r.due}</span>
                        </div>
                        <span className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3.5 text-sm text-white/50">
                          {r.soon}
                        </span>
                      </>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-16 rounded-4xl border border-divider bg-surface/60 p-6 sm:p-10">
            <Eyebrow className="mb-5">{r.interestsTitle}</Eyebrow>
            <div className="flex flex-wrap gap-2">
              {r.interests.map((i) => (
                <span key={i} className="rounded-full bg-white/[0.04] border border-white/10 px-4 py-2 text-white/75">
                  {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
