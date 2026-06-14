import { useState, useEffect, useRef } from 'react'
import { loadEvento } from '../data/dataLoader'
import { useLanguage } from '../contexts/LanguageContext'

// ==================== TYPES ====================
interface Game {
  title: string
  image: string
  platforms: string
  open_giveaway_url: string
  description: string
}

interface Anime {
  title: string
  images: { jpg: { large_image_url: string } }
  url: string
  synopsis: string
  episodes: number | null
  type: string
  score: number | null
}

interface RSSItem {
  title: string
  link: string
  thumbnail?: string
  description?: string
}

// ==================== CARD COMPONENT ====================
function Card({ img, title, meta, link, linkText }: {
  img: string; title: string; meta?: React.ReactNode; link: string; linkText?: string
}) {
  const [imgError, setImgError] = useState(false)
  const { t } = useLanguage()
  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <img
          src={imgError ? 'https://placehold.co/600x400/1a1a24/00ffcc?text=No+Image' : img}
          alt={title}
          className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div className="font-bold text-sm leading-tight mb-2 line-clamp-2">{title}</div>
        {meta && <div className="text-[11px] text-gray-400 mb-1">{meta}</div>}
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-action mt-auto">
          {linkText || t('home.abrir')}
        </a>
      </div>
    </div>
  )
}

// ==================== GAMES SECTION (direct API, no proxy) ====================
function GamesSection() {
  const [games, setGames] = useState<Game[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    let cancelled = false
    const fetchGames = async () => {
      try {
        // GamerPower supports CORS directly — no proxy needed!
        const r = await fetch('https://www.gamerpower.com/api/giveaways?platform=pc&type=game&sort-by=popularity')
        if (!r.ok) throw new Error('Error fetching games')
        const d: Game[] = await r.json()
        if (!cancelled) setGames(d)
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchGames()
    return () => { cancelled = true }
  }, [])

  const filtered = filter === 'all'
    ? games.slice(0, 6)
    : games.filter(g =>
        g.platforms.toLowerCase().includes(filter) ||
        g.title.toLowerCase().includes(filter)
      ).slice(0, 6)

  if (loading) {
    return (
      <div className="grid-base">
        {[1, 2, 3].map(i => (
          <div key={i} className="card">
            <div className="skeleton h-[180px] rounded-none" />
            <div className="p-4 space-y-2">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
              <div className="skeleton h-9 w-full mt-2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-6 border border-dashed border-red-500/50 rounded-xl bg-red-500/5 max-w-lg mx-auto">
        <i className="fas fa-shield-alt text-3xl text-red-500 mb-3" />
        <h3 className="text-red-400 font-bold m-0">{t('home.juegosNoDisponibles')}</h3>
        <p className="text-gray-400 text-sm mt-1 mb-4">{t('home.juegosError')}</p>
        <a href="https://www.gamerpower.com/giveaways" target="_blank" rel="noopener noreferrer"
          className="inline-block px-6 py-2.5 bg-neon-pink text-white rounded-lg font-bold text-sm no-underline hover:brightness-110 transition-all">
          {t('home.verGamerPower')} <i className="fas fa-external-link-alt ml-1" />
        </a>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center gap-2 mb-5 flex-wrap">
        {['all', 'steam', 'epic', 'gog'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
          >
            {f === 'all' ? t('home.todos') : f.toUpperCase()}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center">{t('home.noJuegos')}</p>
      ) : (
        <div className="grid-base">
          {filtered.map((g, i) => (
            <Card key={i} img={g.image} title={g.title}
              meta={`${g.platforms}${g.description ? ' · ' + g.description.substring(0, 60) + '…' : ''}`}
              link={g.open_giveaway_url} linkText={t('home.gratis')}
            />
          ))}
        </div>
      )}
    </>
  )
}

// ==================== ANIME SCHEDULE BY DAY ====================
const DAYS: { en: string; es: string; tKey: string }[] = [
  { en: 'monday', es: 'LUNES', tKey: 'home.lunes' },
  { en: 'tuesday', es: 'MARTES', tKey: 'home.martes' },
  { en: 'wednesday', es: 'MIÉRCOLES', tKey: 'home.miercoles' },
  { en: 'thursday', es: 'JUEVES', tKey: 'home.jueves' },
  { en: 'friday', es: 'VIERNES', tKey: 'home.viernes' },
  { en: 'saturday', es: 'SÁBADO', tKey: 'home.sabado' },
  { en: 'sunday', es: 'DOMINGO', tKey: 'home.domingo' },
]

const DAY_MAP: Record<string, string> = Object.fromEntries(DAYS.map(d => [d.en, d.es]))

// -------- Cache helpers --------
const CACHE_KEY = 'epikon_anime_schedule'
const CACHE_DATE_KEY = 'epikon_anime_cache_date'

function getTodayStr(): string {
  return new Date().toISOString().split('T')[0]
}

function loadCachedSchedule(): { data: Record<string, Anime[]>; fromCache: boolean } | null {
  try {
    const saved = localStorage.getItem(CACHE_KEY)
    const savedDate = localStorage.getItem(CACHE_DATE_KEY)
    if (!saved || !savedDate) return null
    if (savedDate !== getTodayStr()) {
      localStorage.removeItem(CACHE_KEY)
      localStorage.removeItem(CACHE_DATE_KEY)
      return null
    }
    return { data: JSON.parse(saved), fromCache: true }
  } catch {
    return null
  }
}

function saveCachedSchedule(data: Record<string, Anime[]>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    localStorage.setItem(CACHE_DATE_KEY, getTodayStr())
  } catch {
    // localStorage might be full or blocked (Brave, incognito), ignore
  }
}

function groupAnimeByDay(data: Anime[]): Record<string, Anime[]> {
  const grouped: Record<string, Anime[]> = {}
  for (const day of DAYS) grouped[day.en] = []
  grouped.unknown = []

  for (const anime of data) {
    // Jikan returns days in plural ("Sundays", "Mondays"), normalize by removing trailing 's'
    const day = (anime as any).broadcast?.day?.toLowerCase().replace(/s$/, '')
    if (day && grouped[day]) {
      grouped[day].push(anime)
    } else {
      grouped.unknown.push(anime)
    }
  }
  return grouped
}

// -------- AnimeSchedule component --------
function AnimeSchedule() {
  const [byDay, setByDay] = useState<Record<string, Anime[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedDay, setSelectedDay] = useState('monday')
  const [isCached, setIsCached] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const { t } = useLanguage()

  const cancelledRef = useRef(false)

  const doFetch = async (forceRefresh = false) => {
    try {
      // Try cache first (unless force refresh)
      if (!forceRefresh) {
        const cached = loadCachedSchedule()
        if (cached) {
          setByDay(cached.data)
          setIsCached(true)
          setLoading(false)
          return
        }
      }

      setIsCached(false)
      setError(false)

      // Fetch first page
      const r = await fetch('https://api.jikan.moe/v4/schedules')
      if (!r.ok) throw new Error('HTTP ' + r.status)
      const d = await r.json()
      if (cancelledRef.current) return

      let allAnime: Anime[] = d.data || []
      const pagination = d.pagination

      // Fetch more pages if available (max 5 pages total = ~125 anime)
      const maxPages = Math.min(pagination?.last_visible_page || 1, 5)
      for (let page = 2; page <= maxPages; page++) {
        await new Promise(r => setTimeout(r, 600)) // respect rate limit
        if (cancelledRef.current) return
        try {
          const res = await fetch(`https://api.jikan.moe/v4/schedules?page=${page}`)
          if (res.ok) {
            const pageData = await res.json()
            allAnime = allAnime.concat(pageData.data || [])
          }
        } catch {
          // If a page fails, continue with what we have
        }
      }

      if (cancelledRef.current) return

      const grouped = groupAnimeByDay(allAnime)
      setByDay(grouped)
      saveCachedSchedule(grouped)
    } catch {
      if (!cancelledRef.current) setError(true)
    } finally {
      if (!cancelledRef.current) {
        setLoading(false)
        setRefreshing(false)
      }
    }
  }

  useEffect(() => {
    cancelledRef.current = false
    doFetch()
    return () => { cancelledRef.current = true }
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    doFetch(true)
  }

  const currentAnimes = byDay[selectedDay] || []
  const filteredAnimes = searchTerm
    ? currentAnimes.filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : currentAnimes

  const total = Object.values(byDay).reduce((sum, arr) => sum + arr.length, 0)

  // -------- LOADING --------
  if (loading) {
    return (
      <div className="text-center">
        <div className="flex justify-center gap-2 mb-5 flex-wrap">
          {DAYS.map(d => (
            <div key={d.en} className="skeleton h-8 w-20 rounded-full" />
          ))}
        </div>
        <div className="grid-base">
          {[1, 2, 3].map(i => (
            <div key={i} className="card">
              <div className="skeleton h-[180px] rounded-none" />
              <div className="p-4 space-y-2">
                <div className="skeleton h-4 w-3/4" />
                <div className="skeleton h-9 w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // -------- ERROR --------
  if (error) {
    return (
      <div className="text-center p-6 border border-dashed border-yellow-500/50 rounded-xl bg-yellow-500/5 max-w-lg mx-auto">
        <i className="fas fa-exclamation-triangle text-3xl text-yellow-500 mb-3" />
        <h3 className="text-yellow-400 font-bold m-0">{t('home.calendarioNoDisponible')}</h3>
        <p className="text-gray-400 text-sm mt-2">
          {t('home.calendarioError')}{' '}
          {navigator.onLine === false && t('home.sinConexion')}
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <button onClick={handleRefresh}
            className="px-5 py-2 bg-yellow-600 text-white rounded-lg text-sm font-bold cursor-pointer hover:brightness-110 transition-all flex items-center gap-1.5">
            <i className="fas fa-sync-alt" /> {t('home.reintentar')}
          </button>
          <button onClick={() => { setError(false); setLoading(true); doFetch() }}
            className="px-5 py-2 bg-gray-700 text-white rounded-lg text-sm font-bold cursor-pointer hover:brightness-110 transition-all">
            <i className="fas fa-redo" /> {t('home.forzarCarga')}
          </button>
        </div>
      </div>
    )
  }

  // -------- CONTENT --------
  return (
    <>
      {/* Toolbar: badge + refresh + search */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        {isCached && (
          <span className="text-[10px] bg-green-900/40 text-green-400 px-2.5 py-1 rounded-full border border-green-700/30 flex items-center gap-1">
            <i className="fas fa-database text-[9px]" /> {t('home.cacheadoHoy')}
          </span>
        )}
        <button onClick={handleRefresh} disabled={refreshing}
          className="text-[10px] bg-gray-800/50 text-gray-400 px-2.5 py-1 rounded-full hover:text-white hover:bg-gray-700/50 transition-all disabled:opacity-50 flex items-center gap-1">
          <i className={`fas fa-sync-alt ${refreshing ? 'animate-spin' : ''}`} />{' '}
          {refreshing ? t('home.actualizando') : t('home.refrescar')}
        </button>
      </div>

      {/* Day selector pills */}
      <div className="flex justify-center gap-1.5 mb-4 flex-wrap">
        {DAYS.map(d => (
          <button key={d.en} onClick={() => setSelectedDay(d.en)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              selectedDay === d.en
                ? 'bg-neon-cyan text-black'
                : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            {t(d.tKey)} <span className="opacity-60">({(byDay[d.en] || []).length})</span>
          </button>
        ))}
      </div>

      {/* Search input (only show if there are anime) */}
      {total > 0 && (
        <div className="relative max-w-xs mx-auto mb-5">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
          <input
            type="text"
            placeholder={t('home.buscarAnime')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-full pl-8 pr-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-neon-cyan/50 transition-all"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-all text-xs">
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      )}

      {total === 0 ? (
        <p className="text-gray-500 text-center">{t('home.noAnimes')}</p>
      ) : filteredAnimes.length === 0 ? (
        <p className="text-gray-500 text-center">
          {searchTerm
            ? `${t('home.noEncontrado')} "${searchTerm}" ${t('home.en')} ${DAY_MAP[selectedDay]?.toLowerCase() || t('home.esteDia')}.`
            : `${t('home.noProgramados')} ${DAY_MAP[selectedDay]?.toLowerCase() || t('home.esteDia')}.`}
        </p>
      ) : (
        <>
          <p className="text-gray-500 text-xs text-center mb-4">
            {filteredAnimes.length} {t('home.de')} {currentAnimes.length} {t('home.animes')} {t('home.en')} {DAY_MAP[selectedDay]?.toLowerCase() || t('home.esteDia')}
            {' — '}{total} {t('home.enTotal')}
          </p>
          <div className="grid-base">
            {filteredAnimes.map((a, i) => (
              <div key={i} className="card group">
                <div className="relative overflow-hidden">
                  <img
                    src={a.images.jpg.large_image_url}
                    alt={a.title}
                    className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1a1a24/00ffcc?text=No+Image' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {a.score && (
                    <span className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      ★ {a.score}
                    </span>
                  )}
                </div>
                <div className="p-3 flex flex-col flex-1 justify-between">
                  <div className="font-bold text-xs leading-tight mb-1 line-clamp-2">{a.title}</div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-2">
                    {a.type && <span className="bg-gray-800 px-1.5 py-0.5 rounded">{a.type}</span>}
                    {a.episodes && <span>{a.episodes} ep.</span>}
                  </div>
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="btn-action text-xs py-2">
                    <i className="fas fa-info-circle" /> INFO
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

// ==================== RSS NEWS ====================
function RSSSection({ url, title, icon }: { url: string; title: string; icon: string }) {
  const [items, setItems] = useState<RSSItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    let cancelled = false
    const fetchNews = async () => {
      try {
        // Try direct fetch first, fallback to rss2json
        const r = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`)
        if (!r.ok) throw new Error('Error')
        const d = await r.json()
        if (!cancelled && d.items) setItems(d.items.slice(0, 4))
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchNews()
    return () => { cancelled = true }
  }, [url])

  if (loading) {
    return (
      <div className="grid-base">
        {[1, 2].map(i => (
          <div key={i} className="card">
            <div className="skeleton h-[140px] rounded-none" />
            <div className="p-4 space-y-2">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error || items.length === 0) {
    return (
      <div className="text-center p-6 border border-dashed border-gray-700 rounded-xl bg-gray-800/20 max-w-lg mx-auto">
        <i className={`fas ${icon} text-2xl text-gray-500 mb-2`} />
        <p className="text-gray-500 text-sm">{t('home.noticiasNoDisponibles')}</p>
        <p className="text-gray-600 text-xs mt-1">{t('home.revisaFuentes')}</p>
      </div>
    )
  }

  return (
    <div className="grid-base">
      {items.map((item: any, i) => {
        const enclosure = item.enclosure?.link
        const img = item.thumbnail ||
          enclosure ||
          item.description?.match(/<img[^>]+src="([^">]+)"/)?.[1] ||
          'https://placehold.co/600x400/1a1a24/00ffcc?text=' + encodeURIComponent(title)
        return (
          <Card key={i} img={img} title={item.title} link={item.link} linkText={t('home.leer')} />
        )
      })}
    </div>
  )
}

// ==================== EVENT HERO ====================
function EventHero() {
  const e = loadEvento()
  const { t } = useLanguage()
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
        .catch(() => {})
    } else {
      navigator.clipboard?.writeText(window.location.href)
        .then(() => alert(t('home.linkCopiado')))
        .catch(() => alert(t('home.comparteLink')))
    }
  }

  return (
    <div className="bg-gradient-to-b from-bg-card to-bg-dark border-2 border-neon-pink/70 rounded-2xl overflow-hidden mb-10 text-left neon-glow-pink">
      {e.flyer && (
        <img src={e.flyer} alt="Flyer" className="w-full h-auto max-h-[500px] object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      )}
      <div className="p-5 lg:p-8">
        <h2 className="text-neon-cyan text-2xl lg:text-3xl uppercase font-extrabold mb-3 leading-tight">{e.titulo}</h2>
        <div className="text-sm text-gray-300 mb-4 flex flex-col gap-1.5">
          <span><i className="fas fa-map-marker-alt text-neon-pink w-5 text-center mr-1" /> {e.ubicacion}</span>
          <span><i className="far fa-calendar-alt text-neon-pink w-5 text-center mr-1" /> {startDate.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span><i className="far fa-clock text-neon-pink w-5 text-center mr-1" /> {startDate.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })} hrs</span>
        </div>
        <p className="text-gray-300 mb-4 leading-relaxed">{e.descripcion}</p>
        {e.cronograma && (
          <div className="bg-white/5 p-3 rounded-lg text-sm text-gray-400 mb-5 border-l-4 border-neon-cyan">
            <i className="fas fa-list-ul" /> {e.cronograma}
          </div>
        )}
        <div className="flex gap-2.5 flex-wrap">
          <button onClick={addToCalendar}
            className="flex-1 min-w-[120px] py-3 px-4 bg-neon-cyan text-black border-none rounded-lg font-bold cursor-pointer flex items-center justify-center gap-2 text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all">
            <i className="far fa-calendar-plus" /> {t('home.agendar')}
          </button>
          {e.mapaLink && (
            <a href={e.mapaLink} target="_blank" rel="noopener noreferrer"
              className="flex-1 min-w-[120px] py-3 px-4 bg-gray-800 border border-gray-600 text-white rounded-lg font-bold no-underline flex items-center justify-center gap-2 text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all">
              <i className="fas fa-map" /> {t('home.mapa')}
            </a>
          )}
          <button onClick={shareEvent}
            className="flex-1 min-w-[120px] py-3 px-4 bg-neon-pink text-white border-none rounded-lg font-bold cursor-pointer flex items-center justify-center gap-2 text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all">
            <i className="fas fa-share-alt" /> {t('home.compartir')}
          </button>
        </div>
      </div>
    </div>
  )
}

// ==================== MAIN PAGE ====================
export default function HomePage() {
  const { t } = useLanguage()
  return (
    <div className="px-5 max-w-6xl mx-auto">
      <EventHero />

      {/* Games */}
      <section className="mb-12">
        <h2 className="section-title">
          <i className="fas fa-gift text-neon-pink mr-2" /> {t('home.juegosGratis')}
        </h2>
        <GamesSection />
      </section>

      {/* Anime Schedule */}
      <section className="mb-12">
        <h2 className="section-title">
          <i className="fas fa-calendar-week text-neon-pink mr-2" /> {t('home.calendarioAnime')}
        </h2>
        <p className="text-gray-500 text-sm text-center mb-4 -mt-4">
          {t('home.animeDesc')}
        </p>
        <AnimeSchedule />
      </section>

      {/* Anime News */}
      <section className="mb-12">
        <h2 className="section-title">
          <i className="fas fa-newspaper text-neon-pink mr-2" /> {t('home.noticiasAnime')}
        </h2>
        <RSSSection url="https://somoskudasai.com/noticias/feed/" title={t('home.noticiasAnime')} icon="fa-newspaper" />
      </section>

      {/* Geek News */}
      <section className="mb-12">
        <h2 className="section-title">
          <i className="fas fa-satellite-dish text-neon-pink mr-2" /> {t('home.radarGeek')}
        </h2>
        <RSSSection url="https://latam.ign.com/feed.xml" title={t('home.radarGeek')} icon="fa-satellite-dish" />
      </section>
    </div>
  )
}
