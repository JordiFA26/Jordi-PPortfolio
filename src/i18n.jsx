import { createContext, useContext, useEffect, useState } from 'react'
import { COPY } from './copy.js'

const LangContext = createContext({ lang: 'en', setLang: () => {}, t: COPY.en })

function initialLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'en' || saved === 'es') return saved
  } catch {
    // storage unavailable (private mode, blocked) — fall through
  }
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es')) return 'es'
  return 'en'
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)

  const setLang = (next) => {
    setLangState(next)
    try {
      localStorage.setItem('lang', next)
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang, t: COPY[lang] }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

// Pick the current language from an { en, es } object.
export const useL = () => {
  const { lang } = useLang()
  return (obj) => (obj && typeof obj === 'object' ? obj[lang] ?? obj.en : obj)
}

/* ----------------------------------------------------------------
   Theme (dark / light) — the attribute is set before paint in index.html
---------------------------------------------------------------- */
const ThemeContext = createContext({ theme: 'dark', setTheme: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  )

  const setTheme = (next) => {
    setThemeState(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#F6F7FA' : '#12151C')
    window.dispatchEvent(new Event('themechange'))
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
