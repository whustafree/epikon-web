import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { config } from '../../data/config'
import Particles from '../ui/Particles'
import Mascot from '../ui/Mascot'
import MusicPlayer from '../ui/MusicPlayer'
import InstallButton from '../ui/InstallButton'

interface LayoutProps {
  children: React.ReactNode
}

const navItems = [
  { path: '/', label: 'INICIO', icon: 'fa-home' },
  { path: '/comunidad', label: 'COMUNIDAD', icon: 'fa-users' },
  { path: '/galeria', label: 'GALERÍA', icon: 'fa-images' },
  { path: '/instagram', label: 'INSTA', icon: 'fa-instagram', external: true },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const bgs = config.imagenes.fondos
    if (bgs.length > 1) {
      const interval = setInterval(() => {
        setBgIndex((prev) => (prev + 1) % bgs.length)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [])

  const handleNav = (item: typeof navItems[0]) => {
    if (item.external) {
      window.open(config.redes.instagram, '_blank')
    } else {
      navigate(item.path)
    }
  }

  const currentBg = config.imagenes.fondos[bgIndex] || ''

  return (
    <>
      <Particles />

      {/* Header */}
      <header
        className="h-[40vh] flex justify-center items-center relative mb-5 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url('${currentBg}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-bg-dark" />
        <img
          src={config.imagenes.logo}
          alt="Logo Epikon"
          className={`w-[70%] max-w-[350px] relative z-10 animate-float transition-opacity duration-500 ${
            logoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLogoLoaded(true)}
        />
      </header>

      {children}

      <Mascot />
      <MusicPlayer />
      <InstallButton />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-bg-card/95 backdrop-blur-md flex justify-around py-2.5 border-t border-gray-700 z-50"
        style={{ paddingBottom: 'calc(10px + env(safe-area-inset-bottom))' }}
      >
        {navItems.map((item) => {
          const isActive = item.path === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.path)
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item)}
              className={`flex flex-col items-center gap-1 text-xs cursor-pointer border-none bg-transparent transition-all ${
                isActive
                  ? 'text-neon-cyan'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={{ width: '25%' }}
            >
              <i className={`fas ${item.icon} text-lg`} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
