import { config, type PostInstagram, type Cosplayer, type Guia } from '../config'
import { getData } from './cache'

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
