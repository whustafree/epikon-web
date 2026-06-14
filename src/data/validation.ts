// ==================== VALIDATION HELPERS ====================

export interface ValidationError {
  field: string
  message: string
}

export function isValidUrl(str: string): boolean {
  if (!str) return true // optional
  try {
    const url = new URL(str)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function isValidRelativeOrAbsoluteUrl(str: string): boolean {
  if (!str) return true // optional
  if (str.startsWith('/')) return true // relative URL like /foto.jpg
  return isValidUrl(str)
}

export function isValidDate(str: string): boolean {
  if (!str) return true // optional
  const d = new Date(str)
  return !isNaN(d.getTime())
}

export function isValidPositiveNumber(val: number): boolean {
  return typeof val === 'number' && val > 0 && !isNaN(val)
}

export function isNotEmpty(str: string): boolean {
  return str.trim().length > 0
}

// ==================== ADMIN FORM VALIDATION ====================

interface EventoInput {
  activo: boolean
  titulo: string
  flyer: string
  descripcion: string
  cronograma: string
  ubicacion: string
  mapaLink: string
  fechaInicio: string
  fechaFin: string
}

interface SorteoInput {
  activo: boolean
  titulo: string
  fechaTermino: string
  imgPremio: string
}

interface MascotaInput {
  activo: boolean
  imagenPng: string
  frases: string[]
  tiempoEntreFrases: number
}

export function validateEvento(e: EventoInput): ValidationError[] {
  const errors: ValidationError[] = []
  if (e.activo) {
    if (!isNotEmpty(e.titulo)) errors.push({ field: 'evento.titulo', message: 'El título no puede estar vacío' })
    if (!isNotEmpty(e.descripcion)) errors.push({ field: 'evento.descripcion', message: 'La descripción no puede estar vacía' })
    if (!isValidRelativeOrAbsoluteUrl(e.flyer)) errors.push({ field: 'evento.flyer', message: 'URL del flyer inválida' })
    if (!isValidUrl(e.mapaLink)) errors.push({ field: 'evento.mapaLink', message: 'URL del mapa inválida' })
    if (e.fechaInicio && !isValidDate(e.fechaInicio)) errors.push({ field: 'evento.fechaInicio', message: 'Fecha de inicio inválida' })
    if (e.fechaFin && !isValidDate(e.fechaFin)) errors.push({ field: 'evento.fechaFin', message: 'Fecha de fin inválida' })
  }
  return errors
}

export function validateSorteo(s: SorteoInput): ValidationError[] {
  const errors: ValidationError[] = []
  if (s.activo) {
    if (!isNotEmpty(s.titulo)) errors.push({ field: 'sorteo.titulo', message: 'El título del sorteo no puede estar vacío' })
    if (!isValidDate(s.fechaTermino)) errors.push({ field: 'sorteo.fechaTermino', message: 'Fecha de término inválida' })
    if (!isValidUrl(s.imgPremio)) errors.push({ field: 'sorteo.imgPremio', message: 'URL de imagen del premio inválida' })
  }
  return errors
}

export function validateMascota(m: MascotaInput): ValidationError[] {
  const errors: ValidationError[] = []
  if (m.activo) {
    if (!isValidRelativeOrAbsoluteUrl(m.imagenPng)) errors.push({ field: 'mascota.imagenPng', message: 'URL de imagen de mascota inválida' })
    if (!isValidPositiveNumber(m.tiempoEntreFrases)) errors.push({ field: 'mascota.tiempoEntreFrases', message: 'El tiempo debe ser un número positivo' })
    if (m.frases.length === 0) errors.push({ field: 'mascota.frases', message: 'Agrega al menos una frase' })
  }
  return errors
}

export function validateRedes(redes: { instagram: string }): ValidationError[] {
  const errors: ValidationError[] = []
  if (redes.instagram && !isValidUrl(redes.instagram)) errors.push({ field: 'redes.instagram', message: 'URL de Instagram inválida' })
  return errors
}

export function validateMusica(musica: { streamUrl: string }): ValidationError[] {
  const errors: ValidationError[] = []
  if (musica.streamUrl && !isValidUrl(musica.streamUrl)) errors.push({ field: 'musica.streamUrl', message: 'URL del stream inválida' })
  return errors
}

export function validateImagenes(imagenes: { logo: string; fondos: string[] }): ValidationError[] {
  const errors: ValidationError[] = []
  if (!isValidRelativeOrAbsoluteUrl(imagenes.logo)) errors.push({ field: 'imagenes.logo', message: 'URL del logo inválida' })
  for (let i = 0; i < imagenes.fondos.length; i++) {
    if (imagenes.fondos[i] && !isValidRelativeOrAbsoluteUrl(imagenes.fondos[i])) {
      errors.push({ field: `imagenes.fondo[${i}]`, message: `URL de fondo #${i + 1} inválida` })
    }
  }
  return errors
}

export function validateAllAdminData(data: {
  evento: EventoInput
  redes: { instagram: string }
  imagenes: { logo: string; fondos: string[] }
  musica: { streamUrl: string }
  mascota: MascotaInput
  sorteo: SorteoInput
}): ValidationError[] {
  return [
    ...validateEvento(data.evento),
    ...validateRedes(data.redes),
    ...validateImagenes(data.imagenes),
    ...validateMusica(data.musica),
    ...validateMascota(data.mascota),
    ...validateSorteo(data.sorteo),
  ]
}
