import { config, type Evento, type Miembro, type FAQ, type PostInstagram, type Cosplayer, type Guia, type Mascota } from './config'
import { adminStore } from './adminStore'

let cachedData: ReturnType<typeof adminStore.load> | null = null

function getData() {
  if (!cachedData) {
    try {
      cachedData = adminStore.load()
    } catch {
      cachedData = null
    }
  }
  return cachedData
}

export function loadEvento(): Evento {
  const data = getData()
  return data?.evento ?? config.evento
}

export function loadEquipo(): Miembro[] {
  const data = getData()
  if (hasAdminData()) return data?.equipo ?? []
  return config.social.equipo.miembros.filter(m => m.activo)
}

export function loadFaq(): FAQ[] {
  const data = getData()
  if (hasAdminData()) return data?.faq ?? []
  return config.social.infoComunidad.faq
}

function hasAdminData(): boolean {
  try {
    return localStorage.getItem('epikon-admin-data') !== null
  } catch {
    return false
  }
}

export function loadGaleriaActual(): string[] {
  const data = getData()
  if (hasAdminData()) return data?.galeriaActual ?? []
  return config.social.galeriaCompleta.actual
}

export function loadGaleriaAnterior(): string[] {
  const data = getData()
  if (hasAdminData()) return data?.galeriaAnterior ?? []
  return config.social.galeriaCompleta.anterior
}

// ======== NEW LOADERS ========

export function loadRedes(): { instagram: string } {
  const data = getData()
  return data?.redes ?? config.redes
}

export function loadImagenes(): { logo: string; fondos: string[] } {
  const data = getData()
  return data?.imagenes ?? config.imagenes
}

export function loadMusica(): { streamUrl: string } {
  const data = getData()
  return data?.musica ?? config.musica
}

export function loadMascota(): Mascota {
  const data = getData()
  return data?.mascota ?? config.mascota
}

export function loadSorteo(): { activo: boolean; titulo: string; fechaTermino: string; imgPremio: string } {
  const data = getData()
  return data?.sorteo ?? config.social.sorteo
}

export function loadInstagramFeed(): { activo: boolean; posts: PostInstagram[] } {
  const data = getData()
  return data?.instagramFeed ?? config.social.instagramFeed
}

export function loadCosplayGallery(): { activo: boolean; list: Cosplayer[] } {
  const data = getData()
  return data?.cosplayGallery ?? config.social.cosplayGallery
}

export function loadInfoComunidad(): { activo: boolean; titulo: string; guias: Guia[] } {
  const data = getData()
  return data?.infoComunidad ?? config.social.infoComunidad
}

// Clear cache so next loads get fresh data
export function clearDataCache() {
  cachedData = null
}
