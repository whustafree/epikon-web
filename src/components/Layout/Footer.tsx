import { Link } from 'react-router-dom'
import { loadRedes, loadImagenes } from '../../data/dataLoader'
import { useLanguage } from '../../contexts/LanguageContext'

export default function Footer() {
  const year = new Date().getFullYear()
  const redes = loadRedes()
  const imagenes = loadImagenes()
  const { t } = useLanguage()

  return (
    <footer className="relative mt-16 border-t border-gray-800 bg-gradient-to-b from-transparent to-bg-dark/80">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src={imagenes.logo} alt="EPIKON" className="h-10 w-auto" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t('footer.descripcion')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">{t('footer.navegacion')}</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-gray-400 hover:text-neon-cyan text-sm transition-colors">{t('footer.inicio')}</Link>
              <Link to="/comunidad" className="text-gray-400 hover:text-neon-cyan text-sm transition-colors">{t('footer.comunidad')}</Link>
              <Link to="/galeria" className="text-gray-400 hover:text-neon-cyan text-sm transition-colors">{t('footer.galeria')}</Link>
              <Link to="/postulacion" className="text-gray-400 hover:text-neon-cyan text-sm transition-colors">{t('footer.postularStand')}</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">{t('footer.redes')}</h3>
            <div className="flex flex-col gap-2">
              <a href={redes.instagram} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 text-sm transition-colors flex items-center gap-2">
                <i className="fab fa-instagram" /> Instagram
              </a>
              <a href="https://github.com/whustafree/epikon-web" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                <i className="fab fa-github" /> {t('footer.github')}
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-600 text-xs">
            &copy; {year} EPIKON — Comunidad Geek Rancagua. {t('footer.hechoCon')} <i className="fas fa-heart text-neon-pink" /> {t('footer.porLaComunidad')}.
          </p>
        </div>
      </div>
    </footer>
  )
}
