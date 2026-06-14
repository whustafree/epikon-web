import { useState, useRef } from 'react'
import { adminStore } from '../data/adminStore'
import { clearDataCache } from '../data/dataLoader'
import { validateAllAdminData, type ValidationError } from '../data/validation'
import { useLanguage } from '../contexts/LanguageContext'
import type { Miembro, FAQ, Mascota } from '../data/config'

const ADMIN_PASSWORD = 'epikon2025'

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'evento' | 'staff' | 'faq' | 'galeria' | 'ajustes' | 'sorteo'>('evento')
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()

  // Evento state
  const [evento, setEvento] = useState(adminStore.load().evento)
  // Staff state
  const [staff, setStaff] = useState<Miembro[]>(adminStore.load().equipo)
  // FAQ state
  const [faq, setFaq] = useState<FAQ[]>(adminStore.load().faq)
  // Gallery state
  const [galeriaActual, setGaleriaActual] = useState<string[]>(adminStore.load().galeriaActual)
  const [galeriaAnterior, setGaleriaAnterior] = useState<string[]>(adminStore.load().galeriaAnterior)
  // New photo URL input
  const [newPhoto, setNewPhoto] = useState('')
  // Ajustes state
  const load = adminStore.load()
  const [redes, setRedes] = useState(load.redes)
  const [imagenes, setImagenes] = useState(load.imagenes)
  const [musica, setMusica] = useState(load.musica)
  const [mascota, setMascota] = useState<Mascota>(load.mascota)
  const [nuevaFrase, setNuevaFrase] = useState('')
  // Sorteo state
  const [sorteo, setSorteo] = useState(load.sorteo)
  // Instagram Feed state
  const [instagramFeed, setInstagramFeed] = useState(load.instagramFeed)
  // Cosplay Gallery state
  const [cosplayGallery, setCosplayGallery] = useState(load.cosplayGallery)
  // Info Comunidad state
  const [infoComunidad, setInfoComunidad] = useState(load.infoComunidad)

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true)
      setError('')
    } else {
      setError('Contraseña incorrecta')
    }
  }

  const handleSave = () => {
    // Validate before saving
    const validationErrors = validateAllAdminData({ evento, redes, imagenes, musica, mascota, sorteo })
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors([])
    adminStore.save({
      evento,
      equipo: staff,
      faq,
      galeriaActual,
      galeriaAnterior,
      redes,
      imagenes,
      musica,
      mascota,
      sorteo,
      instagramFeed,
      cosplayGallery,
      infoComunidad,
    })
    clearDataCache()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // Export data as JSON file
  const handleExport = () => {
    const data = adminStore.load()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `epikon-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Import data from JSON file
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string)
        // Validate that it has the required fields
        if (!data.evento || !data.equipo) {
          alert('El archivo JSON no tiene el formato esperado. Debe contener evento y equipo.')
          return
        }
        adminStore.save(data)
        clearDataCache()
        window.location.reload()
      } catch {
        alert('Error al leer el archivo JSON. Verifica que sea un archivo válido.')
      }
    }
    reader.readAsText(file)
    // Reset input so the same file can be re-imported
    e.target.value = ''
  }

  // Staff management
  const updateStaff = (index: number, field: keyof Miembro, value: string | boolean) => {
    setStaff(prev => prev.map((m, i) => i === index ? { ...m, [field]: value } : m))
  }
  const addStaff = () => {
    setStaff(prev => [...prev, { activo: true, nombre: '', rol: '', foto: '', link: '' }])
  }
  const removeStaff = (index: number) => {
    setStaff(prev => prev.filter((_, i) => i !== index))
  }

  // FAQ management
  const updateFaq = (index: number, field: 'p' | 'r', value: string) => {
    setFaq(prev => prev.map((f, i) => i === index ? { ...f, [field]: value } : f))
  }
  const addFaq = () => {
    setFaq(prev => [...prev, { p: '', r: '' }])
  }
  const removeFaq = (index: number) => {
    setFaq(prev => prev.filter((_, i) => i !== index))
  }

  // Gallery management
  const addPhoto = () => {
    if (!newPhoto.trim()) return
    if (tab === 'galeria') {
      setGaleriaActual(prev => [...prev, newPhoto.trim()])
      setNewPhoto('')
    }
  }
  const removePhoto = (index: number, type: 'actual' | 'anterior') => {
    if (type === 'actual') {
      setGaleriaActual(prev => prev.filter((_, i) => i !== index))
    } else {
      setGaleriaAnterior(prev => prev.filter((_, i) => i !== index))
    }
  }
  const openCloudinaryWidget = () => {
    const cloudName = prompt('Ingresa tu Cloudinary Cloud Name:')
    if (!cloudName) return
    const uploadPreset = prompt('Ingresa tu Upload Preset (crea uno en Cloudinary > Settings > Upload):')
    if (!uploadPreset) return
    const cld = (window as any).cloudinary
    if (!cld) { alert('El widget de Cloudinary no se cargó. Revisa tu conexión.'); return }
    const widget = cld.createUploadWidget(
      { cloudName, uploadPreset, sources: ['local', 'url', 'camera'] },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          setGaleriaActual(function (prev) { return [...prev, result.info.secure_url] })
        }
      }
    )
    widget.open()
  }

  if (!loggedIn) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="bg-bg-card border border-gray-700 rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl text-neon-cyan text-center mb-6">
            <i className="fas fa-lock" /> {t('admin.loginTitle')}
          </h1>
          <input
            type="password"
            placeholder={t('admin.loginPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 rounded-lg bg-bg-dark border border-gray-600 text-white mb-4 outline-none focus:border-neon-cyan"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button onClick={handleLogin}
            className="w-full py-3 bg-neon-cyan text-black font-bold rounded-lg hover:brightness-110 transition-all">
            {t('admin.loginButton')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 max-w-[1200px] mx-auto">
      <h1 className="section-title">
        <i className="fas fa-cog" /> {t('admin.panelTitle')}
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-2 flex-wrap mb-8">
        {(['evento', 'staff', 'faq', 'galeria', 'ajustes', 'sorteo'] as const).map(tabKey => (
          <button key={tabKey} onClick={() => setTab(tabKey)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              tab === tabKey
                ? 'bg-neon-cyan text-black'
                : 'bg-bg-card border border-gray-600 text-gray-400 hover:text-white'
            }`}
          >
            {tabKey === 'evento' && '📅 ' + t('admin.tabEvento')}
            {tabKey === 'staff' && '🛡️ ' + t('admin.tabStaff')}
            {tabKey === 'faq' && '❓ ' + t('admin.tabFaq')}
            {tabKey === 'galeria' && '📸 ' + t('admin.tabGaleria')}
            {tabKey === 'ajustes' && '⚙️ ' + t('admin.tabAjustes')}
            {tabKey === 'sorteo' && '🎁 ' + t('admin.tabSorteo')}
          </button>
        ))}
      </div>

      {/* Evento Editor */}
      {tab === 'evento' && (
        <div className="bg-bg-card border border-gray-700 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-neon-cyan text-xl">Editar Evento Principal</h2>
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input type="checkbox" checked={evento.activo} onChange={e => setEvento(prev => ({ ...prev, activo: e.target.checked }))}
                className="accent-neon-cyan w-5 h-5" />
              <span className={evento.activo ? 'text-green-400' : 'text-red-400'}>
                {evento.activo ? 'Visible en web' : 'Oculto'}
              </span>
            </label>
          </div>
          {(['titulo', 'descripcion', 'cronograma', 'ubicacion'] as const).map(field => (
            <div key={field}>
              <label className="text-gray-400 text-sm uppercase block mb-1">{field}</label>
              {field === 'descripcion' || field === 'cronograma' ? (
                <textarea value={evento[field]} onChange={e => setEvento(prev => ({ ...prev, [field]: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" rows={3} />
              ) : (
                <input value={evento[field]} onChange={e => setEvento(prev => ({ ...prev, [field]: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
              )}
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm uppercase block mb-1">Flyer URL</label>
              <input value={evento.flyer} onChange={e => setEvento(prev => ({ ...prev, flyer: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
            </div>
            <div>
              <label className="text-gray-400 text-sm uppercase block mb-1">Mapa Link</label>
              <input value={evento.mapaLink} onChange={e => setEvento(prev => ({ ...prev, mapaLink: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm uppercase block mb-1">Fecha Inicio</label>
              <input value={evento.fechaInicio} onChange={e => setEvento(prev => ({ ...prev, fechaInicio: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
            </div>
            <div>
              <label className="text-gray-400 text-sm uppercase block mb-1">Fecha Fin</label>
              <input value={evento.fechaFin} onChange={e => setEvento(prev => ({ ...prev, fechaFin: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
            </div>
          </div>
        </div>
      )}

      {/* Staff Editor */}
      {tab === 'staff' && (
        <div className="bg-bg-card border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-neon-cyan text-xl">Editar Staff</h2>
            <button onClick={addStaff}
              className="px-4 py-2 bg-neon-cyan text-black rounded-lg font-bold text-sm hover:brightness-110">
              + Añadir
            </button>
          </div>
          <div className="space-y-4">
            {staff.map((m, i) => (
              <div key={i} className="bg-bg-dark rounded-xl p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-neon-cyan font-bold">#{i + 1}</span>
                  <button onClick={() => removeStaff(i)} className="text-red-500 text-sm hover:text-red-400">
                    <i className="fas fa-trash" /> Eliminar
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Nombre" value={m.nombre} onChange={e => updateStaff(i, 'nombre', e.target.value)}
                    className="px-3 py-2 rounded-lg bg-bg-card border border-gray-600 text-white outline-none focus:border-neon-cyan" />
                  <input placeholder="Rol" value={m.rol} onChange={e => updateStaff(i, 'rol', e.target.value)}
                    className="px-3 py-2 rounded-lg bg-bg-card border border-gray-600 text-white outline-none focus:border-neon-cyan" />
                  <input placeholder="Foto URL" value={m.foto} onChange={e => updateStaff(i, 'foto', e.target.value)}
                    className="px-3 py-2 rounded-lg bg-bg-card border border-gray-600 text-white outline-none focus:border-neon-cyan" />
                  <input placeholder="Link Instagram" value={m.link} onChange={e => updateStaff(i, 'link', e.target.value)}
                    className="px-3 py-2 rounded-lg bg-bg-card border border-gray-600 text-white outline-none focus:border-neon-cyan" />
                </div>
                <label className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                  <input type="checkbox" checked={m.activo} onChange={e => updateStaff(i, 'activo', e.target.checked)}
                    className="accent-neon-cyan" />
                  Activo
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Editor */}
      {tab === 'faq' && (
        <div className="bg-bg-card border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-neon-cyan text-xl">Editar FAQ</h2>
            <button onClick={addFaq}
              className="px-4 py-2 bg-neon-cyan text-black rounded-lg font-bold text-sm hover:brightness-110">
              + Añadir
            </button>
          </div>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <div key={i} className="bg-bg-dark rounded-xl p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-neon-cyan font-bold">#{i + 1}</span>
                  <button onClick={() => removeFaq(i)} className="text-red-500 text-sm hover:text-red-400">
                    <i className="fas fa-trash" /> Eliminar
                  </button>
                </div>
                <input placeholder="Pregunta" value={f.p} onChange={e => updateFaq(i, 'p', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-bg-card border border-gray-600 text-white outline-none focus:border-neon-cyan mb-2" />
                <textarea placeholder="Respuesta" value={f.r} onChange={e => updateFaq(i, 'r', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-bg-card border border-gray-600 text-white outline-none focus:border-neon-cyan" rows={3} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Editor */}
      {tab === 'galeria' && (
        <div className="bg-bg-card border border-gray-700 rounded-2xl p-6">
          <h2 className="text-neon-cyan text-xl mb-4">Galería de Fotos</h2>
          
          {/* Add photo */}
          <div className="flex gap-2 mb-6">
            <input placeholder="URL de la foto (o sube con Cloudinary abajo)" value={newPhoto}
              onChange={e => setNewPhoto(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
            <button onClick={addPhoto}
              className="px-4 py-2 bg-neon-cyan text-black rounded-lg font-bold hover:brightness-110">
              + Agregar
            </button>
          </div>

          {/* Cloudinary Upload Widget */}
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/20 to-neon-cyan/10 rounded-xl border border-dashed border-neon-cyan">
            <p className="text-sm text-gray-400 mb-2">
              <i className="fas fa-cloud-upload-alt text-neon-cyan" /> Sube fotos directamente desde Cloudinary:
            </p>
            <button onClick={openCloudinaryWidget}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-neon-cyan text-white rounded-lg font-bold hover:brightness-110 transition-all">
              <i className="fab fa-cloudinary" /> Subir con Cloudinary
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Necesitas una cuenta Cloudinary gratuita. Crea un Upload Preset unsigned en Settings &gt; Upload.
            </p>
          </div>

          {/* Current photos */}
          <div>
            <h3 className="text-neon-cyan mb-2">Fotos actuales ({galeriaActual.length})</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-6">
              {galeriaActual.map((url, i) => (
                <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-700">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all" />
                  <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setGaleriaAnterior(prev => [...prev, url]); removePhoto(i, 'actual') }}
                      className="bg-yellow-600 text-white w-6 h-6 rounded-full text-[10px] hover:brightness-110" title="Archivar">
                      <i className="fas fa-archive" />
                    </button>
                    <button onClick={() => removePhoto(i, 'actual')}
                      className="bg-red-600 text-white w-6 h-6 rounded-full text-xs hover:brightness-110" title="Eliminar">
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-neon-cyan mb-2">Fotos anteriores ({galeriaAnterior.length})</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {galeriaAnterior.map((url, i) => (
                <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-700">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all" />
                  <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setGaleriaActual(prev => [...prev, url]); removePhoto(i, 'anterior') }}
                      className="bg-neon-cyan text-black w-6 h-6 rounded-full text-[10px] hover:brightness-110" title="Restaurar a actual">
                      <i className="fas fa-undo" />
                    </button>
                    <button onClick={() => removePhoto(i, 'anterior')}
                      className="bg-red-600 text-white w-6 h-6 rounded-full text-xs hover:brightness-110" title="Eliminar">
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ajustes Tab */}
      {tab === 'ajustes' && (
        <div className="space-y-6">
          {/* Redes Sociales */}
          <div className="bg-bg-card border border-gray-700 rounded-2xl p-6">
            <h2 className="text-neon-cyan text-xl mb-4"><i className="fas fa-share-alt" /> Redes Sociales</h2>
            <label className="text-gray-400 text-sm uppercase block mb-1">URL de Instagram</label>
            <input value={redes.instagram} onChange={e => setRedes(prev => ({ ...prev, instagram: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
          </div>

          {/* Imágenes */}
          <div className="bg-bg-card border border-gray-700 rounded-2xl p-6">
            <h2 className="text-neon-cyan text-xl mb-4"><i className="fas fa-image" /> Imágenes del Sitio</h2>
            <div className="space-y-3">
              <div>
                <label className="text-gray-400 text-sm uppercase block mb-1">Logo URL</label>
                <input value={imagenes.logo} onChange={e => setImagenes(prev => ({ ...prev, logo: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
                {imagenes.logo && <img src={imagenes.logo} className="h-12 mt-2 rounded" />}
              </div>
              <div>
                <label className="text-gray-400 text-sm uppercase block mb-1">Fondo URL</label>
                <div className="flex gap-2 mb-2">
                  <input value={imagenes.fondos[0] || ''} onChange={e => setImagenes(prev => ({ ...prev, fondos: [e.target.value] }))}
                    className="flex-1 px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
                </div>
              </div>
            </div>
          </div>

          {/* Música */}
          <div className="bg-bg-card border border-gray-700 rounded-2xl p-6">
            <h2 className="text-neon-cyan text-xl mb-4"><i className="fas fa-music" /> Música / Radio</h2>
            <label className="text-gray-400 text-sm uppercase block mb-1">URL del Stream</label>
            <input value={musica.streamUrl} onChange={e => setMusica(prev => ({ ...prev, streamUrl: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
          </div>

          {/* Mascota */}
          <div className="bg-bg-card border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-neon-cyan text-xl"><i className="fas fa-dog" /> Mascota / Guía</h2>
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" checked={mascota.activo} onChange={e => setMascota(prev => ({ ...prev, activo: e.target.checked }))}
                  className="accent-neon-cyan w-5 h-5" />
                <span className={mascota.activo ? 'text-green-400' : 'text-red-400'}>{mascota.activo ? 'Visible' : 'Oculta'}</span>
              </label>
            </div>
            <div className="mb-3">
              <label className="text-gray-400 text-sm uppercase block mb-1">Imagen URL</label>
              <input value={mascota.imagenPng} onChange={e => setMascota(prev => ({ ...prev, imagenPng: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
            </div>
            <div className="mb-3">
              <label className="text-gray-400 text-sm uppercase block mb-1">Tiempo entre frases (ms)</label>
              <input type="number" value={mascota.tiempoEntreFrases} onChange={e => setMascota(prev => ({ ...prev, tiempoEntreFrases: Number(e.target.value) }))}
                className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-400 text-sm uppercase">Frases</label>
                <div className="flex gap-2">
                  <input placeholder="Nueva frase…" value={nuevaFrase} onChange={e => setNuevaFrase(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-bg-dark border border-gray-600 text-white text-sm outline-none focus:border-neon-cyan w-48" />
                  <button onClick={() => { if (nuevaFrase.trim()) { setMascota(prev => ({ ...prev, frases: [...prev.frases, nuevaFrase.trim()] })); setNuevaFrase('') } }}
                    className="px-3 py-1.5 bg-neon-cyan text-black rounded-lg text-sm font-bold hover:brightness-110">+</button>
                </div>
              </div>
              <div className="space-y-2">
                {mascota.frases.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 bg-bg-dark rounded-lg p-2 border border-gray-700">
                    <span className="text-neon-cyan text-xs font-bold min-w-[20px]">#{i + 1}</span>
                    <input value={f} onChange={e => setMascota(prev => ({ ...prev, frases: prev.frases.map((fr, idx) => idx === i ? e.target.value : fr) }))}
                      className="flex-1 px-2 py-1 rounded bg-bg-card border border-gray-600 text-white text-sm outline-none focus:border-neon-cyan" />
                    <button onClick={() => setMascota(prev => ({ ...prev, frases: prev.frases.filter((_, idx) => idx !== i) }))}
                      className="text-red-500 text-xs hover:text-red-400 bg-none border-none cursor-pointer">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instagram Feed Toggle */}
          <div className="bg-bg-card border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-neon-cyan text-xl"><i className="fab fa-instagram" /> Feed Instagram</h2>
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" checked={instagramFeed.activo} onChange={e => setInstagramFeed(prev => ({ ...prev, activo: e.target.checked }))}
                  className="accent-neon-cyan w-5 h-5" />
                <span className={instagramFeed.activo ? 'text-green-400' : 'text-red-400'}>{instagramFeed.activo ? 'Visible' : 'Oculto'}</span>
              </label>
            </div>
          </div>

          {/* Cosplay Gallery Toggle */}
          <div className="bg-bg-card border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-neon-cyan text-xl"><i className="fas fa-mask" /> Galería Cosplay</h2>
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" checked={cosplayGallery.activo} onChange={e => setCosplayGallery(prev => ({ ...prev, activo: e.target.checked }))}
                  className="accent-neon-cyan w-5 h-5" />
                <span className={cosplayGallery.activo ? 'text-green-400' : 'text-red-400'}>{cosplayGallery.activo ? 'Visible' : 'Oculta'}</span>
              </label>
            </div>
          </div>

          {/* Info Comunidad Toggle */}
          <div className="bg-bg-card border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-neon-cyan text-xl"><i className="fas fa-book" /> Guía de la Comunidad</h2>
                <p className="text-gray-500 text-sm mt-1">Controla la sección completa de guías y FAQ</p>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" checked={infoComunidad.activo} onChange={e => setInfoComunidad(prev => ({ ...prev, activo: e.target.checked }))}
                  className="accent-neon-cyan w-5 h-5" />
                <span className={infoComunidad.activo ? 'text-green-400' : 'text-red-400'}>{infoComunidad.activo ? 'Visible' : 'Oculta'}</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Sorteo Tab */}
      {tab === 'sorteo' && (
        <div className="bg-bg-card border border-gray-700 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-neon-cyan text-xl"><i className="fas fa-gift" /> Sorteo</h2>
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input type="checkbox" checked={sorteo.activo} onChange={e => setSorteo(prev => ({ ...prev, activo: e.target.checked }))}
                className="accent-neon-cyan w-5 h-5" />
              <span className={sorteo.activo ? 'text-green-400' : 'text-red-400'}>{sorteo.activo ? 'Activo' : 'Inactivo'}</span>
            </label>
          </div>
          <div>
            <label className="text-gray-400 text-sm uppercase block mb-1">Título</label>
            <input value={sorteo.titulo} onChange={e => setSorteo(prev => ({ ...prev, titulo: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
          </div>
          <div>
            <label className="text-gray-400 text-sm uppercase block mb-1">Fecha de término</label>
            <input value={sorteo.fechaTermino} onChange={e => setSorteo(prev => ({ ...prev, fechaTermino: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" placeholder="December 25, 2026 20:00:00" />
          </div>
          <div>
            <label className="text-gray-400 text-sm uppercase block mb-1">Imagen del premio URL</label>
            <input value={sorteo.imgPremio} onChange={e => setSorteo(prev => ({ ...prev, imgPremio: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-bg-dark border border-gray-600 text-white outline-none focus:border-neon-cyan" />
            {sorteo.imgPremio && <img src={sorteo.imgPremio} className="h-24 mt-2 rounded object-cover" />}
          </div>
        </div>
      )}

      {/* Validation Errors */}
      {errors.length > 0 && (
        <div className="max-w-lg mx-auto mb-6 bg-red-900/30 border border-red-500/50 rounded-xl p-4">
          <h3 className="text-red-400 text-sm font-bold mb-2 flex items-center gap-2">
            <i className="fas fa-exclamation-triangle" /> Errores de validación
          </h3>
          <ul className="list-disc list-inside text-red-300 text-xs space-y-1">
            {errors.map((err, i) => (
              <li key={i}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Save Button */}
      <div className="text-center my-8">
        <button onClick={handleSave}
          className="px-10 py-4 bg-gradient-to-r from-neon-cyan to-neon-pink text-white text-lg font-bold rounded-xl hover:brightness-110 transition-all shadow-lg">
          <i className="fas fa-save" /> {saved ? t('admin.guardado') : t('admin.guardarCambios')}
        </button>
        <p className="text-gray-500 text-sm mt-2">{t('admin.localStorage')}</p>

        <div className="flex justify-center gap-3 mt-4 flex-wrap">
          {/* Export */}
          <button onClick={handleExport}
            className="px-5 py-2 bg-blue-900/30 border border-blue-700/50 text-blue-400 text-sm rounded-xl hover:bg-blue-900/50 transition-all flex items-center gap-2">
            <i className="fas fa-download" /> {t('admin.exportar')}
          </button>
          {/* Import */}
          <button onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2 bg-green-900/30 border border-green-700/50 text-green-400 text-sm rounded-xl hover:bg-green-900/50 transition-all flex items-center gap-2">
            <i className="fas fa-upload" /> {t('admin.importar')}
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          {/* Reset */}
          <button onClick={() => {
            if (confirm(t('admin.restablecerConfirm'))) {
              adminStore.clear()
              clearDataCache()
              window.location.reload()
            }
          }}
            className="px-5 py-2 bg-red-900/30 border border-red-700/50 text-red-400 text-sm rounded-xl hover:bg-red-900/50 transition-all flex items-center gap-2">
            <i className="fas fa-undo-alt" /> {t('admin.restablecer')}
          </button>
        </div>
      </div>
    </div>
  )
}
