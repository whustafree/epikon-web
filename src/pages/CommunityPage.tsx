import { useState, useEffect } from 'react'
import { loadEquipo, loadFaq, loadSorteo, loadInstagramFeed, loadCosplayGallery, loadInfoComunidad } from '../data/dataLoader'

function SorteoSection() {
  const s = loadSorteo()
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const end = new Date(s.fechaTermino).getTime()
    const timer = setInterval(() => {
      const d = end - new Date().getTime()
      if (d <= 0) { clearInterval(timer); setTimeLeft(''); return }
      const days = Math.floor(d / (1000 * 60 * 60 * 24))
      const hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const mins = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60))
      setTimeLeft(`${days}d ${hours}h ${mins}m`)
    }, 1000)
    return () => clearInterval(timer)
  }, [s.fechaTermino])

  return (
    <div className="bg-gradient-to-br from-[#2a0a38] to-bg-dark border-2 border-neon-cyan rounded-2xl p-5 mx-auto mb-10 max-w-[600px] flex flex-wrap items-center justify-center gap-5">
      <img src={s.imgPremio} alt="Premio" className="w-[120px] h-[120px] object-cover rounded-xl" />
      <div>
        <h3 className="text-white m-0">{s.titulo}</h3>
        <div className="font-mono text-2xl text-neon-cyan font-bold my-4">{timeLeft || '...'}</div>
        <button onClick={() => alert('¡Participando!')} className="btn-action">PARTICIPAR</button>
      </div>
    </div>
  )
}

function StaffCard({ miembro }: { miembro: { activo: boolean; nombre: string; rol: string; foto: string; link: string } }) {
  return (
    <div className="card items-center text-center">
      <div className="p-5 flex flex-col items-center">
        <img src={miembro.foto} alt={miembro.nombre}
          className="w-[100px] h-[100px] rounded-full object-cover border-4 border-neon-pink mb-2.5"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=Staff' }}
        />
        <h3 className="text-white m-1">{miembro.nombre}</h3>
        <div className="text-gray-400 text-sm italic mb-2.5">{miembro.rol}</div>
        <a href={miembro.link} target="_blank" rel="noopener noreferrer" className="btn-action text-xs">
          <i className="fas fa-link" /> CONECTAR
        </a>
      </div>
    </div>
  )
}

export default function CommunityPage() {
  const miembros = loadEquipo()
  const faqList = loadFaq()
  const sorteo = loadSorteo()
  const instagramFeed = loadInstagramFeed()
  const cosplayGallery = loadCosplayGallery()
  const infoComunidad = loadInfoComunidad()

  return (
    <div className="px-5 max-w-[1200px] mx-auto">
      {/* Staff */}
      {miembros.length > 0 && (
        <>
          <h2 className="section-title">🛡️ Staff Epikon</h2>
          <div className="grid-base mb-10">
            {miembros.map((m, i) => (
              <StaffCard key={i} miembro={m} />
            ))}
          </div>
        </>
      )}

      {/* Community Guide */}
      {infoComunidad.activo && (
        <>
          <h2 className="section-title">{infoComunidad.titulo}</h2>
          <div className="grid-base mb-8">
            {infoComunidad.guias.filter(g => g.activo).map((g, i) => (
              <a key={i} href={g.link}
                className="card flex-1 min-w-[150px] no-underline"
                style={{ background: 'linear-gradient(45deg, #1a1a24, #2a0a38)' }}
              >
                <div className="p-5 flex flex-col items-center">
                  <i className={`${g.icono} text-3xl text-neon-cyan mb-2.5`} />
                  <span className="font-bold text-white">{g.titulo}</span>
                </div>
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4 max-w-[800px] mx-auto mb-10">
            {faqList.map((f, i) => (
              <div key={i} className="bg-bg-card border border-gray-700 rounded-xl p-4 text-left">
                <h4 className="text-neon-cyan m-0 mb-1 text-lg">
                  <i className="far fa-question-circle" /> {f.p}
                </h4>
                <p className="text-gray-300 m-0 text-sm">{f.r}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Instagram Feed */}
      {instagramFeed.activo && (
        <>
          <h2 className="section-title">📸 Feed Instagram</h2>
          <div className="grid-base mb-10">
            {instagramFeed.posts.filter(p => p.activo).slice(0, 4).map((post, i) => {
              const isVideo = post.foto.endsWith('.mp4')
              return (
                <div key={i} className="relative rounded-xl overflow-hidden border border-gray-700 flex-[0_1_200px] min-w-[150px] aspect-square bg-black">
                  {isVideo ? (
                    <video src={post.foto} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                  ) : (
                    <img src={post.foto} className="w-full h-full object-cover" alt="Instagram" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <i className="fab fa-instagram text-3xl" />
                  </div>
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0" />
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Sorteo */}
      {sorteo.activo && <SorteoSection />}

      {/* Cosplay Gallery */}
      {cosplayGallery.activo && (
        <>
          <h2 className="section-title">👥 Cosplayers</h2>
          <div className="grid-base">
            {cosplayGallery.list.filter(i => i.activo).map((item, i) => (
              <div key={i} className="card">
                <img src={item.foto} alt={item.usuario} className="w-full h-[300px] object-cover" />
                <div className="p-4">
                  <span className="font-bold">{item.usuario}</span>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-action">SEGUIR</a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
