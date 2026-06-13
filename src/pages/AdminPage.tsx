import { useState } from 'react'
import { adminStore } from '../data/adminStore'
import { clearDataCache } from '../data/dataLoader'
import type { Miembro, FAQ } from '../data/config'

const ADMIN_PASSWORD = 'epikon2025'

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'evento' | 'staff' | 'faq' | 'galeria'>('evento')
  const [saved, setSaved] = useState(false)

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

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true)
      setError('')
    } else {
      setError('Contraseña incorrecta')
    }
  }

  const handleSave = () => {
    adminStore.save({
      evento,
      equipo: staff,
      faq,
      galeriaActual,
      galeriaAnterior,
    })
    clearDataCache()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
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
            <i className="fas fa-lock" /> Admin EPIKON
          </h1>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 rounded-lg bg-bg-dark border border-gray-600 text-white mb-4 outline-none focus:border-neon-cyan"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button onClick={handleLogin}
            className="w-full py-3 bg-neon-cyan text-black font-bold rounded-lg hover:brightness-110 transition-all">
            INGRESAR
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 max-w-[1200px] mx-auto">
      <h1 className="section-title">
        <i className="fas fa-cog" /> Panel Admin EPIKON
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-2 flex-wrap mb-8">
        {(['evento', 'staff', 'faq', 'galeria'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              tab === t
                ? 'bg-neon-cyan text-black'
                : 'bg-bg-card border border-gray-600 text-gray-400 hover:text-white'
            }`}
          >
            {t === 'evento' && '📅 Evento'}
            {t === 'staff' && '🛡️ Staff'}
            {t === 'faq' && '❓ FAQ'}
            {t === 'galeria' && '📸 Galería'}
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

      {/* Save Button */}
      <div className="text-center my-8">
        <button onClick={handleSave}
          className="px-10 py-4 bg-gradient-to-r from-neon-cyan to-neon-pink text-white text-lg font-bold rounded-xl hover:brightness-110 transition-all shadow-lg">
          <i className="fas fa-save" /> {saved ? '✓ GUARDADO' : 'GUARDAR CAMBIOS'}
        </button>
        <p className="text-gray-500 text-sm mt-2">Los datos se guardan en localStorage del navegador</p>

        <button onClick={() => {
          if (confirm('¿Restablecer valores por defecto? Se perderán todos tus cambios.')) {
            adminStore.clear()
            clearDataCache()
            window.location.reload()
          }
        }}
          className="mt-4 px-6 py-2 bg-red-900/30 border border-red-700/50 text-red-400 text-sm rounded-xl hover:bg-red-900/50 transition-all">
          <i className="fas fa-undo-alt" /> Restablecer valores por defecto
        </button>
      </div>
    </div>
  )
}
