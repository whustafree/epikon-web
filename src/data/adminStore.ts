import { config, type Miembro, type FAQ, type Evento, type PostInstagram, type Cosplayer, type Guia, type Mascota } from './config'

const STORAGE_KEY = 'epikon-admin-data'

export interface AdminData {
  evento: Evento
  equipo: Miembro[]
  faq: FAQ[]
  galeriaActual: string[]
  galeriaAnterior: string[]
  // New sections
  redes: { instagram: string }
  imagenes: { logo: string; fondos: string[] }
  musica: { streamUrl: string }
  mascota: Mascota
  sorteo: { activo: boolean; titulo: string; fechaTermino: string; imgPremio: string }
  instagramFeed: { activo: boolean; posts: PostInstagram[] }
  cosplayGallery: { activo: boolean; list: Cosplayer[] }
  infoComunidad: { activo: boolean; titulo: string; guias: Guia[] }
}

function loadData(): AdminData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  // Default from config
  return {
    evento: { ...config.evento },
    equipo: config.social.equipo.miembros.filter(m => m.activo),
    faq: [...config.social.infoComunidad.faq],
    galeriaActual: [...config.social.galeriaCompleta.actual],
    galeriaAnterior: [...config.social.galeriaCompleta.anterior],
    redes: { ...config.redes },
    imagenes: { ...config.imagenes, fondos: [...config.imagenes.fondos] },
    musica: { ...config.musica },
    mascota: { ...config.mascota, frases: [...config.mascota.frases] },
    sorteo: { ...config.social.sorteo },
    instagramFeed: {
      activo: config.social.instagramFeed.activo,
      posts: config.social.instagramFeed.posts.map(p => ({ ...p })),
    },
    cosplayGallery: {
      activo: config.social.cosplayGallery.activo,
      list: config.social.cosplayGallery.list.map(c => ({ ...c })),
    },
    infoComunidad: {
      activo: config.social.infoComunidad.activo,
      titulo: config.social.infoComunidad.titulo,
      guias: config.social.infoComunidad.guias.map(g => ({ ...g })),
    },
  }
}

function saveData(data: AdminData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const adminStore = {
  load: loadData,
  save: saveData,
  clear: () => localStorage.removeItem(STORAGE_KEY),
}
