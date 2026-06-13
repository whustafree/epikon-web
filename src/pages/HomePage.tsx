import { useState, useEffect } from 'react'
import { config } from '../data/config'

// --- Types ---
interface Game {
  title: string
  image: string
  platforms: string
  open_giveaway_url: string
}

interface Anime {
  title: string
  images: { jpg: { large_image_url: string } }
  url: string
  broadcast: { day: string }
}

interface RSSItem {
  title: string
  link: string
  thumbnail?: string
  description?: string
}

const DAY_MAP: Record<string, string> = {
  Mondays: 'Lunes', Tuesdays: 'Martes', Wednesdays: 'Miércoles',
  Thursdays: 'Jueves', Fridays: 'Viernes', Saturdays: 'Sábados', Sundays: 'Domingos',
}

function Card({ img, title, meta, link, linkText }: {
  img: string; title: string; meta?: React.ReactNode; link: string; linkText?: string
}) {
  return (
    <div className="card">
      <img src={img} alt={title} className="w-full h-[160px] object-cover"
        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1a1a24/00ffcc?text=No+Image' }}
      />
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="font-bold mb-2.5">{title}</div>
        {meta && <div className="text-xs text-gray-400 mb-1">{meta}</div>}
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-action mt-2.5">
          {linkText || 'ABRIR'}
        </a>
      </div>
    </div>
  )
}

// --- Games ---
function GamesSection() {
  const [games, setGames] = useState<Game[]>([])
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest='
        const targetUrl = 'https://www.gamerpower.com/api/giveaways?platform=pc&type=game&sort-by=popularity'
        const r = await fetch(proxyUrl + encodeURIComponent(targetUrl))
        if (!r.ok) throw new Error('Error Proxy')
        const d = await r.json()
        setGames(d)
      } catch {
        setError(true)
      }
    }
    fetchGames()
  }, [])

  const filtered = filter === 'all'
    ? games.slice(0, 4)
    : games.filter(g => g.platforms.toLowerCase().includes(filter) || g.title.toLowerCase().includes(filter)).slice(0, 4)

  if (error) {
    return (
      <div className="col-span-full text-center p-5 border border-dashed border-red-500 rounded-xl">
        <i className="fas fa-shield-alt text-3xl text-red-500 mb-2.5" />
        <h3 className="text-red-500 m-1">Bloqueador Detectado</h3>
        <p className="text-gray-300 text-sm">Tu DNS o Adblock impide cargar la lista automática.</p>
        <a href="https://www.gamerpower.com/giveaways" target="_blank" rel="noopener noreferrer"
          className="inline-block mt-2.5 px-8 py-2.5 bg-neon-pink text-white border-none rounded-lg font-bold no-underline">
          VER JUEGOS EN WEB EXTERNA <i className="fas fa-external-link-alt" />
        </a>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center gap-2.5 mb-5 flex-wrap">
        {['all', 'steam', 'epic'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
          >
            {f === 'all' ? 'TODOS' : f.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid-base">
        {filtered.map((g, i) => (
          <Card key={i} img={g.image} title={g.title} meta={g.platforms} link={g.open_giveaway_url} linkText="GRATIS" />
        ))}
      </div>
    </>
  )
}

// --- Anime ---
function AnimeSection() {
  const [animeList, setAnimeList] = useState<Anime[]>([])
  const [hidden, setHidden] = useState<Anime[]>([])
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/seasons/now?limit=20')
      .then(r => r.json())
      .then(d => {
        if (d.data) {
          setAnimeList(d.data.slice(0, 4))
          setHidden(d.data.slice(4))
        }
      })
      .catch(() => {})
  }, [])

  const display = expanded ? [...animeList, ...hidden] : animeList

  return (
    <>
      <div className="grid-base">
        {display.map((a, i) => (
          <Card key={i} img={a.images.jpg.large_image_url} title={a.title}
            meta={<><i className="far fa-clock" /> {DAY_MAP[a.broadcast.day] || 'Por definir'}</> as any}
            link={a.url} linkText="INFO"
          />
        ))}
      </div>
      {!expanded && hidden.length > 0 && (
        <div className="text-center w-full mt-5">
          <button onClick={() => setExpanded(true)}
            className="bg-transparent border border-neon-cyan text-neon-cyan px-5 py-2.5 rounded-full cursor-pointer">
            VER MÁS ANIMES
          </button>
        </div>
      )}
    </>
  )
}

// --- RSS News ---
function RSSSection({ url }: { url: string }) {
  const [items, setItems] = useState<RSSItem[]>([])

  useEffect(() => {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`)
      .then(r => r.json())
      .then(d => {
        if (d.items) setItems(d.items.slice(0, 3))
      })
      .catch(() => {})
  }, [url])

  return (
    <div className="grid-base">
      {items.map((item, i) => {
        const img = item.thumbnail || item.description?.match(/<img[^>]+src="([^">]+)"/)?.[1] || 'https://placehold.co/600x400/1a1a24/00ffcc?text=News'
        return (
          <Card key={i} img={img} title={item.title} link={item.link} linkText="LEER" />
        )
      })}
    </div>
  )
}

// --- Event Hero ---
function EventHero() {
  const e = config.evento
  if (!e.activo) return null

  const startDate = new Date(e.fechaInicio)

  const addToCalendar = () => {
    const s = e.fechaInicio.replace(/-|:/g, '')
    const end = e.fechaFin.replace(/-|:/g, '')
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e.titulo)}&dates=${s}/${end}&details=${encodeURIComponent(e.descripcion)}&location=${encodeURIComponent(e.ubicacion)}`,
      '_blank'
    )
  }

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({ title: e.titulo, text: `¡Nos vemos en ${e.titulo}!`, url: window.location.href })
    } else {
      alert('Link copiado')
    }
  }

  return (
    <div className="bg-gradient-to-b from-bg-card to-bg-dark border-2 border-neon-pink rounded-2xl overflow-hidden mb-10 text-left shadow-lg"
      style={{ boxShadow: '0 0 20px rgba(255, 0, 85, 0.2)' }}
    >
      {e.flyer && (
        <img src={e.flyer} alt="Flyer" className="w-full h-auto max-h-[600px] object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      )}
      <div className="p-5">
        <h2 className="text-neon-cyan text-3xl uppercase font-extrabold mb-2.5 leading-tight">{e.titulo}</h2>
        <div className="text-sm text-gray-300 mb-4 flex flex-col gap-2">
          <span><i className="fas fa-map-marker-alt text-neon-pink w-5 mr-1" /> {e.ubicacion}</span>
          <span><i className="far fa-calendar-alt text-neon-pink w-5 mr-1" /> {startDate.toLocaleDateString()}</span>
          <span><i className="far fa-clock text-neon-pink w-5 mr-1" /> {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} hrs</span>
        </div>
        <p className="text-gray-300 mb-4 leading-relaxed">{e.descripcion}</p>
        {e.cronograma && (
          <div className="bg-white/5 p-2.5 rounded-lg text-sm text-gray-400 mb-4 border-l-4 border-neon-cyan">
            <i className="fas fa-list-ul" /> {e.cronograma}
          </div>
        )}
        <div className="flex gap-2.5 flex-wrap">
          <button onClick={addToCalendar}
            className="flex-1 py-3 px-4 bg-neon-cyan text-black border-none rounded-lg font-bold cursor-pointer flex items-center justify-center gap-2 text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all">
            <i className="far fa-calendar-plus" /> AGENDAR
          </button>
          {e.mapaLink && (
            <a href={e.mapaLink} target="_blank" rel="noopener noreferrer"
              className="flex-1 py-3 px-4 bg-gray-800 border border-gray-600 text-white rounded-lg font-bold no-underline flex items-center justify-center gap-2 text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all">
              <i className="fas fa-map" /> MAPA
            </a>
          )}
          <button onClick={shareEvent}
            className="flex-1 py-3 px-4 bg-neon-pink text-white border-none rounded-lg font-bold cursor-pointer flex items-center justify-center gap-2 text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all">
            <i className="fas fa-share-alt" /> COMPARTIR
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Main Page ---
export default function HomePage() {
  return (
    <div className="px-5 max-w-[1200px] mx-auto">
      <EventHero />

      <h2 className="section-title">🎁 Juegos Gratis</h2>
      <GamesSection />

      <h2 className="section-title">📅 Calendario Anime</h2>
      <AnimeSection />

      <h2 className="section-title">🎎 Noticias Anime</h2>
      <RSSSection url="https://somoskudasai.com/feed/" />

      <h2 className="section-title">📰 Radar Geek</h2>
      <RSSSection url="https://latam.ign.com/feed.xml" />
    </div>
  )
}
