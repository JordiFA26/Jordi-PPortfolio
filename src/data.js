export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/jorge-facha-alvarez-977b48334/',
  instagram: 'https://instagram.com/Jordi_fa_',
  podcastEmail: 'Insidethemachinepodcast@gmail.com',
  youtube: 'https://www.youtube.com/@InsideTheMachinePodcast-v6d',
  spotify: 'https://open.spotify.com/show/0h9qnzTYmNVhmcotTQsve1',
  spotifyEmbed: 'https://open.spotify.com/embed/show/0h9qnzTYmNVhmcotTQsve1?utm_source=generator&theme=0',
  podcastInstagram: 'https://instagram.com/inside_the_machine_',
  tiktok: 'https://www.tiktok.com/@itm_podcast_',
  podcastSite: 'https://www.itm.org.es',
  researchPaper: '/aerodynamics-research-paper.pdf',
}

// Newest first. Titles stay in the language the episode was recorded in.
export const EPISODES = [
  {
    num: 6,
    id: 'sJJQrwBFWhQ',
    lang: 'EN',
    date: { en: 'Sept 2026', es: 'sept 2026' },
    title: 'Monterey Car Week — “It’s Not About How Many You Own”',
    guest: { en: 'Solo episode', es: 'Episodio en solitario' },
    desc: {
      en: 'A week inside Monterey Car Week with the Collection Suites crew — the RM Sotheby’s and Gooding auctions, Pebble Beach, The Quail, Laguna Seca and private brand houses most people never get near. Numbers included, from a $34.6M McLaren F1 GTR to a buried Mercedes wagon that sold for double its estimate.',
      es: 'Una semana dentro de la Monterey Car Week con el equipo de Collection Suites: las subastas de RM Sotheby’s y Gooding, Pebble Beach, The Quail, Laguna Seca y casas privadas de marcas a las que casi nadie accede. Con cifras incluidas, desde un McLaren F1 GTR de 34,6 M$ hasta un Mercedes familiar enterrado que se vendió por el doble de su estimación.',
    },
  },
  {
    num: 5,
    id: 'wd8ZWdcWemU',
    lang: 'ES',
    date: { en: 'Jul 2026', es: 'jul 2026' },
    title: 'Sebastián Arizmendi — El mecánico que se volvió piloto',
    guest: { en: 'Sebastián Arizmendi', es: 'Sebastián Arizmendi' },
    desc: {
      en: 'Raised inside the Farbén workshop, Sebastián now races a VW Caribe he built almost entirely himself — and explains why understanding the car changes how you drive it.',
      es: 'Criado dentro del taller Farbén, Sebastián compite hoy con un VW Caribe construido casi por completo con sus propias manos, y explica por qué entender el coche cambia tu forma de manejarlo.',
    },
  },
  {
    num: 4,
    id: 'EruQM0XubG4',
    lang: 'ES',
    date: { en: 'Jun 2026', es: 'jun 2026' },
    title: 'Yamil Atlante — “Si fuera de otra marca, no sería tan criticado”',
    guest: { en: 'Yamil Atlante', es: 'Yamil Atlante' },
    desc: {
      en: 'Automotive designer Yamil Atlante teaches how to read a car’s lines — and why so many brands are losing their design identity.',
      es: 'El diseñador automotriz Yamil Atlante nos enseña a leer las líneas de un coche, y por qué tantas marcas están perdiendo su identidad de diseño.',
    },
  },
  {
    num: 3,
    id: 'CHfNLpqSXC8',
    lang: 'EN',
    date: { en: 'Apr 2026', es: 'abr 2026' },
    title: 'It’s Not About Speed: Inside the Mind of Ferrari Collector Lino Fayen',
    guest: { en: 'Lino Fayen', es: 'Lino Fayen' },
    desc: {
      en: 'A Ferrari collector and race winner on what truly makes a car great, the shift from analog to modern, and the reality of collecting.',
      es: 'Un coleccionista de Ferrari y ganador de carreras sobre lo que realmente hace grande a un coche, el paso de lo analógico a lo moderno y la realidad del coleccionismo.',
    },
  },
  {
    num: 2,
    id: 'OgotbiAKBLc',
    lang: 'EN',
    date: { en: 'Mar 2026', es: 'mar 2026' },
    title: 'Enzo Fittipaldi Explains the Real Differences Between Racing Categories',
    guest: { en: 'Enzo Fittipaldi', es: 'Enzo Fittipaldi' },
    desc: {
      en: 'Racing driver Enzo Fittipaldi on adapting to different cars, categories and driving styles at the professional level.',
      es: 'El piloto Enzo Fittipaldi habla de cómo adaptarse a distintos coches, categorías y estilos de conducción a nivel profesional.',
    },
  },
  {
    num: 1,
    id: 'vJ-NoWyI_f8',
    lang: 'EN',
    date: { en: 'Feb 2026', es: 'feb 2026' },
    title: 'How a Panamericana-Winning Porsche Is Engineered — Diego Cándano',
    guest: { en: 'Diego Cándano', es: 'Diego Cándano' },
    desc: {
      en: 'Three-time Carrera Panamericana winner Diego Cándano breaks down the engineering behind a race-winning Porsche.',
      es: 'Diego Cándano, tres veces ganador de La Carrera Panamericana, desglosa la ingeniería detrás de un Porsche ganador.',
    },
  },
  {
    num: 0,
    id: 'EeMJqWs0CY0',
    lang: 'EN',
    date: { en: 'Jan 2026', es: 'ene 2026' },
    title: 'Episode 0: The Start',
    guest: { en: 'Introduction', es: 'Presentación' },
    desc: {
      en: 'Where it all began — what Inside The Machine is about and why it exists.',
      es: 'Donde empezó todo: de qué trata Inside The Machine y por qué existe.',
    },
  },
]

export const LATEST = EPISODES[0]

export const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
export const ytWatch = (id) => `https://www.youtube.com/watch?v=${id}`
