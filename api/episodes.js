// Vercel serverless function: latest full episodes from the Inside The
// Machine YouTube channel feed (Shorts excluded). Cached at the edge for
// a day, so YouTube is checked at most once every 24 hours.
const CHANNEL_ID = 'UCE9vcWT2FjOTDSj45brG_fQ'
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

const pick = (xml, tag) => {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
  return m ? decode(m[1].trim()) : ''
}

export function parseFeed(xml) {
  return xml
    .split('<entry>')
    .slice(1)
    .map((entry) => {
      const link = (entry.match(/<link rel="alternate" href="([^"]+)"/) || [])[1] || ''
      return {
        id: pick(entry, 'yt:videoId'),
        title: pick(entry, 'title'),
        published: pick(entry, 'published'),
        description: pick(entry, 'media:description'),
        short: link.includes('/shorts/'),
      }
    })
    .filter((v) => v.id && !v.short)
    .map(({ short, ...v }) => v)
}

export default async function handler(req, res) {
  try {
    const r = await fetch(FEED, { headers: { 'User-Agent': 'jordi-portfolio/1.0' } })
    if (!r.ok) throw new Error(`feed ${r.status}`)
    const videos = parseFeed(await r.text())
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800')
    res.status(200).json({ videos })
  } catch (err) {
    res.setHeader('Cache-Control', 's-maxage=300')
    res.status(502).json({ videos: [], error: String(err.message || err) })
  }
}
