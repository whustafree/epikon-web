import { config, type Mascota } from '../config'
import { getData } from './cache'

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
