import { createContext, useContext, useEffect, useState } from 'react'
import { EPISODES } from './data.js'

// Episodes start from the hand-written list in data.js (with EN/ES summaries)
// and are topped up from /api/episodes, which reads the YouTube feed once a
// day. New uploads appear automatically using YouTube's own title/description.

const EpisodesContext = createContext({ episodes: EPISODES, latest: EPISODES[0] })

const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'],
}

const SPANISH = /[ñ¿¡]|\b(el|la|los|las|que|por|una|del|sin|con|cómo|qué)\b/i

function fromFeed(v) {
  const num = Number((v.title.match(/\bEp(?:isode|\.)?\s*0*(\d+)/i) || [])[1])
  const d = new Date(v.published)
  const firstPara = (v.description.split(/\n\s*\n/)[0] || '').trim()
  const desc = firstPara.length > 260 ? `${firstPara.slice(0, 257).trimEnd()}…` : firstPara
  const title = v.title.replace(/^\s*Ep(?:isode|\.)?\s*0*\d+\s*[|:–—-]\s*/i, '').trim() || v.title
  return {
    num: Number.isFinite(num) ? num : null,
    id: v.id,
    lang: SPANISH.test(v.title) ? 'ES' : 'EN',
    date: { en: `${MONTHS.en[d.getMonth()]} ${d.getFullYear()}`, es: `${MONTHS.es[d.getMonth()]} ${d.getFullYear()}` },
    title,
    guest: { en: '', es: '' },
    desc: { en: desc, es: desc },
    auto: true,
  }
}

export function mergeEpisodes(base, videos) {
  const known = new Set(base.map((e) => e.id))
  const maxNum = Math.max(...base.map((e) => e.num))
  const extra = videos.filter((v) => !known.has(v.id)).map(fromFeed)
  // Fill missing numbers after the highest known one (oldest new upload first).
  let next = maxNum + 1
  ;[...extra].reverse().forEach((e) => {
    if (e.num == null || e.num <= maxNum) e.num = next
    next = Math.max(next, e.num) + 1
  })
  return [...extra, ...base].sort((a, b) => b.num - a.num)
}

export function EpisodesProvider({ children }) {
  const [episodes, setEpisodes] = useState(EPISODES)

  useEffect(() => {
    let cancelled = false
    fetch('/api/episodes')
      .then((r) => (r.ok ? r.json() : { videos: [] }))
      .then(({ videos }) => {
        if (!cancelled && videos?.length) setEpisodes(mergeEpisodes(EPISODES, videos))
      })
      .catch(() => {}) // offline / local dev: keep the built-in list
    return () => {
      cancelled = true
    }
  }, [])

  return <EpisodesContext.Provider value={{ episodes, latest: episodes[0] }}>{children}</EpisodesContext.Provider>
}

export const useEpisodes = () => useContext(EpisodesContext)

// Short label for badges: "Monterey Car Week" from "Monterey Car Week — “…”"
export const shortTitle = (ep) => ep.title.split(/\s+[—|–-]\s+|:\s/)[0].replace(/^Episode \d+\s*/, '').trim()
