import { Link } from 'react-router-dom'
import { config } from '../../data/config'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-16 border-t border-gray-800 bg-gradient-to-b from-transparent to-bg-dark/80">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src={config.imagenes.logo} alt="EPIKON" className="h-10 w-auto" />
              <span className="text-neon-cyan font-bold text-lg tracking-wider">EPIKON</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Comunidad Geek de Rancagua. Eventos, torneos, cosplay y más.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navegación</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-gray-400 hover:text-neon-cyan text-sm transition-colors">Inicio</Link>
              <Link to="/comunidad" className="text-gray-400 hover:text-neon-cyan text-sm transition-colors">Comunidad</Link>
              <Link to="/galeria" className="text-gray-400 hover:text-neon-cyan text-sm transition-colors">Galería</Link>
              <Link to="/postulacion" className="text-gray-400 hover:text-neon-cyan text-sm transition-colors">Postular Stand</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Redes</h3>
            <div className="flex flex-col gap-2">
              <a href={config.redes.instagram} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 text-sm transition-colors flex items-center gap-2">
                <i className="fab fa-instagram" /> Instagram
              </a>
              <a href="https://github.com/whustafree/epikon-web" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                <i className="fab fa-github" /> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-600 text-xs">
            &copy; {year} EPIKON — Comunidad Geek Rancagua. Hecho con <i className="fas fa-heart text-neon-pink" /> por la comunidad.
          </p>
        </div>
      </div>
    </footer>
  )
}
