import { config, type Evento, type Miembro, type FAQ } from './config'
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
  // If admin has saved data, use it even if empty (they may have deleted all photos)
  if (hasAdminData()) return data?.galeriaActual ?? []
  return config.social.galeriaCompleta.actual
}

export function loadGaleriaAnterior(): string[] {
  const data = getData()
  if (hasAdminData()) return data?.galeriaAnterior ?? []
  return config.social.galeriaCompleta.anterior
}

// Clear cache so next loads get fresh data
export function clearDataCache() {
  cachedData = null
}
