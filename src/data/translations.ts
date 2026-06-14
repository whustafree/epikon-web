// ==================== TRANSLATIONS ====================
export type Locale = 'es' | 'en'

type TranslationMap = Record<string, string>

const es: TranslationMap = {
  // Navbar
  'nav.inicio': 'Inicio',
  'nav.comunidad': 'Comunidad',
  'nav.galeria': 'Galería',
  'nav.postular': 'Postular',
  'nav.instagram': 'Instagram',
  'nav.menu': 'Menú',
  'nav.modoClaro': 'Modo claro',
  'nav.modoOscuro': 'Modo oscuro',

  // Footer
  'footer.navegacion': 'Navegación',
  'footer.redes': 'Redes',
  'footer.github': 'GitHub',
  'footer.inicio': 'Inicio',
  'footer.comunidad': 'Comunidad',
  'footer.galeria': 'Galería',
  'footer.postularStand': 'Postular Stand',
  'footer.descripcion': 'Comunidad Geek de Rancagua. Eventos, torneos, cosplay y más.',
  'footer.hechoCon': 'Hecho con',
  'footer.porLaComunidad': 'por la comunidad',

  // HomePage - EventHero
  'home.agendar': 'AGENDAR',
  'home.mapa': 'MAPA',
  'home.compartir': 'COMPARTIR',
  'home.linkCopiado': 'Link copiado al portapapeles',
  'home.comparteLink': 'Comparte este link con tus amigos',

  // HomePage - Games
  'home.juegosGratis': 'Juegos Gratis',
  'home.todos': 'TODOS',
  'home.gratis': 'GRATIS',
  'home.abrir': 'ABRIR',
  'home.leer': 'LEER',
  'home.noJuegos': 'No hay juegos gratis para este filtro.',
  'home.juegosNoDisponibles': 'Juegos no disponibles',
  'home.juegosError': 'No se pudieron cargar los juegos. Intenta desactivar el bloqueador para este sitio.',
  'home.verGamerPower': 'VER EN GAMERPOWER',

  // HomePage - Anime Schedule
  'home.calendarioAnime': 'Calendario Anime',
  'home.animeDesc': 'Animes en emisión organizados por día de estreno',
  'home.cacheadoHoy': 'Cacheado hoy',
  'home.refrescar': 'Refrescar',
  'home.actualizando': 'Actualizando…',
  'home.buscarAnime': 'Buscar anime por nombre…',
  'home.noAnimes': 'No hay animes en emisión esta temporada.',
  'home.noEncontrado': 'No se encontró',
  'home.en': 'en',
  'home.esteDia': 'este día',
  'home.noProgramados': 'No hay animes programados para',
  'home.de': 'de',
  'home.animes': 'animes',
  'home.enTotal': 'en total',
  'home.info': 'INFO',
  'home.calendarioNoDisponible': 'Calendario no disponible',
  'home.calendarioError': 'No se pudo cargar el calendario de anime.',
  'home.sinConexion': 'Parece que no tienes conexión a internet.',
  'home.reintentar': 'REINTENTAR',
  'home.forzarCarga': 'FORZAR CARGA',
  'home.lunes': 'LUNES',
  'home.martes': 'MARTES',
  'home.miercoles': 'MIÉRCOLES',
  'home.jueves': 'JUEVES',
  'home.viernes': 'VIERNES',
  'home.sabado': 'SÁBADO',
  'home.domingo': 'DOMINGO',

  // HomePage - RSS
  'home.noticiasAnime': 'Noticias Anime',
  'home.radarGeek': 'Radar Geek',
  'home.noticiasNoDisponibles': 'Noticias no disponibles en este momento.',
  'home.revisaFuentes': 'Puedes revisar directamente en las fuentes.',

  // CommunityPage
  'comunidad.staff': '🛡️ Staff Epikon',
  'comunidad.conectar': 'CONECTAR',
  'comunidad.seguir': 'SEGUIR',
  'comunidad.participar': 'PARTICIPAR',
  'comunidad.participando': '¡Participando!',
  'comunidad.feedInstagram': '📸 Feed Instagram',
  'comunidad.cosplayers': '👥 Cosplayers',
  'comunidad.sorteo': '🎁 Sorteo',

  // GalleryPage
  'galeria.titulo': '📸 Galería Epikon',
  'galeria.eventoActual': 'EVENTO ACTUAL',
  'galeria.pasados': 'PASADOS',
  'galeria.noFotos': 'No hay fotos disponibles.',
  'galeria.foto': 'Foto',

  // AdminPage - Login
  'admin.loginTitle': 'Admin EPIKON',
  'admin.loginPlaceholder': 'Contraseña',
  'admin.loginError': 'Contraseña incorrecta',
  'admin.loginButton': 'INGRESAR',

  // AdminPage - Tabs
  'admin.panelTitle': 'Panel Admin EPIKON',
  'admin.tabEvento': '📅 Evento',
  'admin.tabStaff': '🛡️ Staff',
  'admin.tabFaq': '❓ FAQ',
  'admin.tabGaleria': '📸 Galería',
  'admin.tabAjustes': '⚙️ Ajustes',
  'admin.tabSorteo': '🎁 Sorteo',

  // AdminPage - Evento tab
  'admin.eventoTitle': 'Editar Evento Principal',
  'admin.visibleWeb': 'Visible en web',
  'admin.oculto': 'Oculto',
  'admin.flyerUrl': 'Flyer URL',
  'admin.mapaLink': 'Mapa Link',
  'admin.fechaInicio': 'Fecha Inicio',
  'admin.fechaFin': 'Fecha Fin',

  // AdminPage - Staff tab
  'admin.staffTitle': 'Editar Staff',
  'admin.anadir': '+ Añadir',
  'admin.eliminar': 'Eliminar',
  'admin.nombre': 'Nombre',
  'admin.rol': 'Rol',
  'admin.fotoUrl': 'Foto URL',
  'admin.linkInstagram': 'Link Instagram',
  'admin.activo': 'Activo',

  // AdminPage - FAQ tab
  'admin.faqTitle': 'Editar FAQ',
  'admin.pregunta': 'Pregunta',
  'admin.respuesta': 'Respuesta',

  // AdminPage - Gallery tab
  'admin.galeriaTitle': 'Galería de Fotos',
  'admin.fotoUrlPlaceholder': 'URL de la foto (o sube con Cloudinary abajo)',
  'admin.agregar': '+ Agregar',
  'admin.subirCloudinary': 'Subir con Cloudinary',
  'admin.cloudinaryDesc': 'Necesitas una cuenta Cloudinary gratuita. Crea un Upload Preset unsigned en Settings > Upload.',
  'admin.fotosActuales': 'Fotos actuales',
  'admin.fotosAnteriores': 'Fotos anteriores',
  'admin.archivar': 'Archivar',
  'admin.restaurar': 'Restaurar a actual',
  'admin.cloudNamePrompt': 'Ingresa tu Cloudinary Cloud Name:',
  'admin.uploadPresetPrompt': 'Ingresa tu Upload Preset (crea uno en Cloudinary > Settings > Upload):',
  'admin.cloudinaryError': 'El widget de Cloudinary no se cargó. Revisa tu conexión.',
  'admin.subirFotosDirecto': 'Sube fotos directamente desde Cloudinary:',

  // AdminPage - Ajustes tab
  'admin.ajustesRedes': 'Redes Sociales',
  'admin.urlInstagram': 'URL de Instagram',
  'admin.ajustesImagenes': 'Imágenes del Sitio',
  'admin.logoUrl': 'Logo URL',
  'admin.fondoUrl': 'Fondo URL',
  'admin.ajustesMusica': 'Música / Radio',
  'admin.urlStream': 'URL del Stream',
  'admin.mascotaTitle': 'Mascota / Guía',
  'admin.visible': 'Visible',
  'admin.oculta': 'Oculta',
  'admin.imagenUrl': 'Imagen URL',
  'admin.tiempoFrases': 'Tiempo entre frases (ms)',
  'admin.frases': 'Frases',
  'admin.nuevaFrase': 'Nueva frase…',
  'admin.feedInstagram': 'Feed Instagram',
  'admin.galeriaCosplay': 'Galería Cosplay',
  'admin.guiaComunidad': 'Guía de la Comunidad',
  'admin.guiaDesc': 'Controla la sección completa de guías y FAQ',

  // AdminPage - Sorteo tab
  'admin.sorteoTitle': 'Sorteo',
  'admin.sorteoActivo': 'Activo',
  'admin.inactivo': 'Inactivo',
  'admin.titulo': 'Título',
  'admin.fechaTermino': 'Fecha de término',
  'admin.imgPremioUrl': 'Imagen del premio URL',

  // AdminPage - Save/Export/Import
  'admin.guardarCambios': 'GUARDAR CAMBIOS',
  'admin.guardado': '✓ GUARDADO',
  'admin.localStorage': 'Los datos se guardan en localStorage del navegador',
  'admin.exportar': 'Exportar respaldo JSON',
  'admin.importar': 'Importar respaldo JSON',
  'admin.restablecer': 'Restablecer valores por defecto',
  'admin.restablecerConfirm': '¿Restablecer valores por defecto? Se perderán todos tus cambios.',
  'admin.importError': 'El archivo JSON no tiene el formato esperado. Debe contener evento y equipo.',
  'admin.importParseError': 'Error al leer el archivo JSON. Verifica que sea un archivo válido.',

  // AdminPage - Validation errors
  'admin.err.tituloVacio': 'El título no puede estar vacío',
  'admin.err.descripcionVacia': 'La descripción no puede estar vacía',
  'admin.err.flyerInvalido': 'URL del flyer inválida',
  'admin.err.mapaInvalido': 'URL del mapa inválida',
  'admin.err.fechaInicioInvalida': 'Fecha de inicio inválida',
  'admin.err.fechaFinInvalida': 'Fecha de fin inválida',
  'admin.err.sorteoTituloVacio': 'El título del sorteo no puede estar vacío',
  'admin.err.sorteoFechaInvalida': 'Fecha de término inválida',
  'admin.err.sorteoImgInvalida': 'URL de imagen del premio inválida',
  'admin.err.mascotaImgInvalida': 'URL de imagen de mascota inválida',
  'admin.err.mascotaTiempoInvalido': 'El tiempo debe ser un número positivo',
  'admin.err.mascotaSinFrases': 'Agrega al menos una frase',
  'admin.err.instagramInvalido': 'URL de Instagram inválida',
  'admin.err.streamInvalido': 'URL del stream inválida',
  'admin.err.logoInvalido': 'URL del logo inválida',
  'admin.err.fondoInvalido': 'URL de fondo inválida',
  'admin.erroresValidacion': 'Errores de validación',

  // MusicPlayer
  'music.lofi': 'LOFI',

  // InstallButton
  'install.instalar': 'INSTALAR APP',

  // Mascot
  'mascot.guia': 'Guía Epikon',
  'mascot.mascota': 'Mascota',
}

const en: TranslationMap = {
  // Navbar
  'nav.inicio': 'Home',
  'nav.comunidad': 'Community',
  'nav.galeria': 'Gallery',
  'nav.postular': 'Apply',
  'nav.instagram': 'Instagram',
  'nav.menu': 'Menu',
  'nav.modoClaro': 'Light mode',
  'nav.modoOscuro': 'Dark mode',

  // Footer
  'footer.navegacion': 'Navigation',
  'footer.redes': 'Social',
  'footer.github': 'GitHub',
  'footer.inicio': 'Home',
  'footer.comunidad': 'Community',
  'footer.galeria': 'Gallery',
  'footer.postularStand': 'Apply for Stand',
  'footer.descripcion': 'Geek Community of Rancagua. Events, tournaments, cosplay and more.',
  'footer.hechoCon': 'Made with',
  'footer.porLaComunidad': 'by the community',

  // HomePage - EventHero
  'home.agendar': 'SCHEDULE',
  'home.mapa': 'MAP',
  'home.compartir': 'SHARE',
  'home.linkCopiado': 'Link copied to clipboard',
  'home.comparteLink': 'Share this link with your friends',

  // HomePage - Games
  'home.juegosGratis': 'Free Games',
  'home.todos': 'ALL',
  'home.gratis': 'FREE',
  'home.abrir': 'OPEN',
  'home.leer': 'READ',
  'home.noJuegos': 'No free games for this filter.',
  'home.juegosNoDisponibles': 'Games unavailable',
  'home.juegosError': 'Could not load games. Try disabling your ad blocker for this site.',
  'home.verGamerPower': 'SEE ON GAMERPOWER',

  // HomePage - Anime Schedule
  'home.calendarioAnime': 'Anime Schedule',
  'home.animeDesc': 'Currently airing anime organized by premiere day',
  'home.cacheadoHoy': 'Cached today',
  'home.refrescar': 'Refresh',
  'home.actualizando': 'Updating…',
  'home.buscarAnime': 'Search anime by name…',
  'home.noAnimes': 'No anime airing this season.',
  'home.noEncontrado': 'Not found',
  'home.en': 'on',
  'home.esteDia': 'this day',
  'home.noProgramados': 'No anime scheduled for',
  'home.de': 'of',
  'home.animes': 'anime',
  'home.enTotal': 'total',
  'home.info': 'INFO',
  'home.calendarioNoDisponible': 'Schedule unavailable',
  'home.calendarioError': 'Could not load the anime schedule.',
  'home.sinConexion': 'You seem to be offline.',
  'home.reintentar': 'RETRY',
  'home.forzarCarga': 'FORCE LOAD',
  'home.lunes': 'MONDAY',
  'home.martes': 'TUESDAY',
  'home.miercoles': 'WEDNESDAY',
  'home.jueves': 'THURSDAY',
  'home.viernes': 'FRIDAY',
  'home.sabado': 'SATURDAY',
  'home.domingo': 'SUNDAY',

  // HomePage - RSS
  'home.noticiasAnime': 'Anime News',
  'home.radarGeek': 'Geek Radar',
  'home.noticiasNoDisponibles': 'News not available right now.',
  'home.revisaFuentes': 'You can check the sources directly.',

  // CommunityPage
  'comunidad.staff': '🛡️ Epikon Staff',
  'comunidad.conectar': 'CONNECT',
  'comunidad.seguir': 'FOLLOW',
  'comunidad.participar': 'ENTER',
  'comunidad.participando': 'Entering!',
  'comunidad.feedInstagram': '📸 Instagram Feed',
  'comunidad.cosplayers': '👥 Cosplayers',
  'comunidad.sorteo': '🎁 Giveaway',

  // GalleryPage
  'galeria.titulo': '📸 Epikon Gallery',
  'galeria.eventoActual': 'CURRENT EVENT',
  'galeria.pasados': 'PAST',
  'galeria.noFotos': 'No photos available.',
  'galeria.foto': 'Photo',

  // AdminPage - Login
  'admin.loginTitle': 'Admin EPIKON',
  'admin.loginPlaceholder': 'Password',
  'admin.loginError': 'Incorrect password',
  'admin.loginButton': 'LOGIN',

  // AdminPage - Tabs
  'admin.panelTitle': 'EPIKON Admin Panel',
  'admin.tabEvento': '📅 Event',
  'admin.tabStaff': '🛡️ Staff',
  'admin.tabFaq': '❓ FAQ',
  'admin.tabGaleria': '📸 Gallery',
  'admin.tabAjustes': '⚙️ Settings',
  'admin.tabSorteo': '🎁 Giveaway',

  // AdminPage - Evento tab
  'admin.eventoTitle': 'Edit Main Event',
  'admin.visibleWeb': 'Visible on web',
  'admin.oculto': 'Hidden',
  'admin.flyerUrl': 'Flyer URL',
  'admin.mapaLink': 'Map Link',
  'admin.fechaInicio': 'Start Date',
  'admin.fechaFin': 'End Date',

  // AdminPage - Staff tab
  'admin.staffTitle': 'Edit Staff',
  'admin.anadir': '+ Add',
  'admin.eliminar': 'Delete',
  'admin.nombre': 'Name',
  'admin.rol': 'Role',
  'admin.fotoUrl': 'Photo URL',
  'admin.linkInstagram': 'Instagram Link',
  'admin.activo': 'Active',

  // AdminPage - FAQ tab
  'admin.faqTitle': 'Edit FAQ',
  'admin.pregunta': 'Question',
  'admin.respuesta': 'Answer',

  // AdminPage - Gallery tab
  'admin.galeriaTitle': 'Photo Gallery',
  'admin.fotoUrlPlaceholder': 'Photo URL (or upload via Cloudinary below)',
  'admin.agregar': '+ Add',
  'admin.subirCloudinary': 'Upload via Cloudinary',
  'admin.cloudinaryDesc': 'You need a free Cloudinary account. Create an unsigned Upload Preset in Settings > Upload.',
  'admin.fotosActuales': 'Current photos',
  'admin.fotosAnteriores': 'Past photos',
  'admin.archivar': 'Archive',
  'admin.restaurar': 'Restore to current',
  'admin.cloudNamePrompt': 'Enter your Cloudinary Cloud Name:',
  'admin.uploadPresetPrompt': 'Enter your Upload Preset (create one in Cloudinary > Settings > Upload):',
  'admin.cloudinaryError': 'Cloudinary widget did not load. Check your connection.',
  'admin.subirFotosDirecto': 'Upload photos directly from Cloudinary:',

  // AdminPage - Ajustes tab
  'admin.ajustesRedes': 'Social Media',
  'admin.urlInstagram': 'Instagram URL',
  'admin.ajustesImagenes': 'Site Images',
  'admin.logoUrl': 'Logo URL',
  'admin.fondoUrl': 'Background URL',
  'admin.ajustesMusica': 'Music / Radio',
  'admin.urlStream': 'Stream URL',
  'admin.mascotaTitle': 'Mascot / Guide',
  'admin.visible': 'Visible',
  'admin.oculta': 'Hidden',
  'admin.imagenUrl': 'Image URL',
  'admin.tiempoFrases': 'Time between phrases (ms)',
  'admin.frases': 'Phrases',
  'admin.nuevaFrase': 'New phrase…',
  'admin.feedInstagram': 'Instagram Feed',
  'admin.galeriaCosplay': 'Cosplay Gallery',
  'admin.guiaComunidad': 'Community Guide',
  'admin.guiaDesc': 'Controls the complete guides and FAQ section',

  // AdminPage - Sorteo tab
  'admin.sorteoTitle': 'Giveaway',
  'admin.sorteoActivo': 'Active',
  'admin.inactivo': 'Inactive',
  'admin.titulo': 'Title',
  'admin.fechaTermino': 'End date',
  'admin.imgPremioUrl': 'Prize image URL',

  // AdminPage - Save/Export/Import
  'admin.guardarCambios': 'SAVE CHANGES',
  'admin.guardado': '✓ SAVED',
  'admin.localStorage': 'Data is saved in browser localStorage',
  'admin.exportar': 'Export JSON backup',
  'admin.importar': 'Import JSON backup',
  'admin.restablecer': 'Reset to defaults',
  'admin.restablecerConfirm': 'Reset to defaults? All your changes will be lost.',
  'admin.importError': 'The JSON file does not have the expected format. It must contain evento and equipo.',
  'admin.importParseError': 'Error reading JSON file. Make sure it is a valid file.',

  // AdminPage - Validation errors
  'admin.err.tituloVacio': 'Title cannot be empty',
  'admin.err.descripcionVacia': 'Description cannot be empty',
  'admin.err.flyerInvalido': 'Invalid flyer URL',
  'admin.err.mapaInvalido': 'Invalid map URL',
  'admin.err.fechaInicioInvalida': 'Invalid start date',
  'admin.err.fechaFinInvalida': 'Invalid end date',
  'admin.err.sorteoTituloVacio': 'Giveaway title cannot be empty',
  'admin.err.sorteoFechaInvalida': 'Invalid end date',
  'admin.err.sorteoImgInvalida': 'Invalid prize image URL',
  'admin.err.mascotaImgInvalida': 'Invalid mascot image URL',
  'admin.err.mascotaTiempoInvalido': 'Time must be a positive number',
  'admin.err.mascotaSinFrases': 'Add at least one phrase',
  'admin.err.instagramInvalido': 'Invalid Instagram URL',
  'admin.err.streamInvalido': 'Invalid stream URL',
  'admin.err.logoInvalido': 'Invalid logo URL',
  'admin.err.fondoInvalido': 'Invalid background URL',
  'admin.erroresValidacion': 'Validation errors',

  // MusicPlayer
  'music.lofi': 'LOFI',

  // InstallButton
  'install.instalar': 'INSTALL APP',

  // Mascot
  'mascot.guia': 'Epikon Guide',
  'mascot.mascota': 'Mascot',
}

export const translations: Record<Locale, TranslationMap> = { es, en }

export function t(locale: Locale, key: string, fallback?: string): string {
  return translations[locale][key] ?? fallback ?? key
}
