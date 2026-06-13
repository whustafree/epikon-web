import { useState } from 'react'
import { config } from '../data/config'

export default function GalleryPage() {
  const [type, setType] = useState<'actual' | 'anterior'>('actual')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const photos = config.social.galeriaCompleta[type] || []

  return (
    <div className="px-5 max-w-[1200px] mx-auto">
      <h2 className="section-title">📸 Galería Epikon</h2>

      <div className="flex justify-center gap-2.5 mb-5 flex-wrap">
        <button onClick={() => setType('actual')}
          className={`filter-btn ${type === 'actual' ? 'active' : ''}`}>
          EVENTO ACTUAL
        </button>
        <button onClick={() => setType('anterior')}
          className={`filter-btn ${type === 'anterior' ? 'active' : ''}`}>
          PASADOS
        </button>
      </div>

      {photos.length === 0 ? (
        <p className="text-gray-500">No hay fotos disponibles.</p>
      ) : (
        <div className="gallery-grid">
          {photos.map((url, i) => (
            <div key={i} className="gallery-item" onClick={() => setLightbox(url)}>
              <img src={url} loading="lazy" alt={`Foto ${i + 1}`} className="w-full block" />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-[2000] flex items-center justify-center backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 text-white text-3xl cursor-pointer bg-none border-none"
          >
            &times;
          </button>
          <img
            src={lightbox}
            alt="Lightbox"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-[0_0_30px_#00ffcc]"
          />
        </div>
      )}
    </div>
  )
}
