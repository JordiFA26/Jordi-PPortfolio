import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App.jsx'
import Podcast from './pages/Podcast.jsx'
import Services from './pages/Services.jsx'
import Research from './pages/Research.jsx'
import { LangProvider, ThemeProvider } from './i18n.jsx'
import { EpisodesProvider } from './episodes.jsx'
import { Footer, Navbar, ScrollManager } from './components.jsx'
import './index.css'

function Layout() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <ScrollManager />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LangProvider>
        <EpisodesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<App />} />
              <Route path="/podcast" element={<Podcast />} />
              <Route path="/services" element={<Services />} />
              <Route path="/research" element={<Research />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </EpisodesProvider>
      </LangProvider>
    </ThemeProvider>
  </StrictMode>,
)
