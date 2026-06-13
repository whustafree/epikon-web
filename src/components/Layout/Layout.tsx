import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { config } from '../../data/config'
import Particles from '../ui/Particles'
import Mascot from '../ui/Mascot'
import MusicPlayer from '../ui/MusicPlayer'
import InstallButton from '../ui/InstallButton'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const navItems = [
  { path: '/', label: 'Inicio', icon: 'fa-home' },
  { path: '/comunidad', label: 'Comunidad', icon: 'fa-users' },
  { path: '/galeria', label: 'Galería', icon: 'fa-images' },
  { path: '/postulacion', label: 'Postular', icon: 'fa-store' },
  { path: '/admin', label: 'Admin', icon: 'fa-cog' },
]

// Pages that show the header banner
const HEADER_PAGES = ['/', '/comunidad', '/galeria']

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [bgIndex, setBgIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const showHeader = HEADER_PAGES.includes(location.pathname)

  useEffect(() => {
    const bgs = config.imagenes.fondos
    if (bgs.length > 1) {
      const interval = setInterval(() => {
        setBgIndex((prev) => (prev + 1) % bgs.length)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [])

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const handleNav = (path: string) => {
    if (path === '/instagram') {
      window.open(config.redes.instagram, '_blank', 'noopener')
    } else {
      navigate(path)
    }
  }

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const currentBg = config.imagenes.fondos[bgIndex] || ''

  return (
    <>
      <Particles />

      {/* ===== DESKTOP NAVBAR (hidden on mobile) ===== */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-bg-dark/90 backdrop-blur-md border-b border-gray-800 transition-all duration-300"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <button onClick={() => navigate('/')} className="flex items-center gap-3 bg-none border-none cursor-pointer">
            <img src={config.imagenes.logo} alt="EPIKON" className="h-9 w-auto" />
            <span className="text-neon-cyan font-bold text-lg tracking-wider">EPIKON</span>
          </button>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'text-neon-cyan bg-neon-cyan/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`fas ${item.icon} text-xs`} />
                {item.label}
              </button>
            ))}
            <a
              href={config.redes.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:brightness-110 transition-all flex items-center gap-2"
            >
              <i className="fab fa-instagram" /> Instagram
            </a>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE TOP BAR ===== */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-bg-dark/90 backdrop-blur-md border-b border-gray-800"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 bg-none border-none cursor-pointer">
            <img src={config.imagenes.logo} alt="EPIKON" className="h-8 w-auto" />
            <span className="text-neon-cyan font-bold">EPIKON</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white text-2xl bg-none border-none cursor-pointer p-1"
            aria-label="Menú"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="bg-bg-card border-t border-gray-700 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-semibold border-b border-gray-800 transition-all ${
                  isActive(item.path)
                    ? 'text-neon-cyan bg-neon-cyan/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`fas ${item.icon} w-5 text-center`} />
                {item.label}
              </button>
            ))}
            <a
              href={config.redes.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-pink-400 hover:bg-white/5 transition-all"
            >
              <i className="fab fa-instagram w-5 text-center" />
              Instagram
            </a>
          </div>
        )}
      </div>

      {/* ===== HEADER BANNER (only on main pages) ===== */}
      {showHeader && (
        <header
          className="h-[35vh] lg:h-[40vh] flex justify-center items-center relative mb-6 lg:mb-8 bg-cover bg-center transition-all duration-1000 mt-14 lg:mt-16"
          style={{ backgroundImage: `url('${currentBg}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-bg-dark" />
          <img
            src={config.imagenes.logo}
            alt="Logo Epikon"
            className={`w-[65%] max-w-[320px] lg:max-w-[400px] relative z-10 animate-float transition-opacity duration-500 ${
              logoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLogoLoaded(true)}
          />
        </header>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main className={`min-h-[60vh] ${showHeader ? '' : 'pt-16 lg:pt-20'} pb-24 lg:pb-12`}>
        {children}
      </main>

      <Footer />

      <Mascot />
      <MusicPlayer />
      <InstallButton />

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-card/95 backdrop-blur-md border-t border-gray-700"
        style={{ paddingBottom: 'calc(8px + env(safe-area-inset-bottom))' }}
      >
        <div className="flex justify-around items-center py-1.5">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-all min-w-0 ${
                isActive(item.path)
                  ? 'text-neon-cyan'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <i className={`fas ${item.icon} text-lg`} />
              <span className="text-[10px] font-semibold leading-tight">{item.label}</span>
            </button>
          ))}
          <a
            href={config.redes.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-gray-500 hover:text-pink-400 transition-all"
          >
            <i className="fab fa-instagram text-lg" />
            <span className="text-[10px] font-semibold leading-tight">Instagram</span>
          </a>
        </div>
      </nav>
    </>
  )
}
