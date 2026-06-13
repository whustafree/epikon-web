import { Link } from 'react-router-dom'

export default function PostulacionPage() {
  return (
    <div className="px-5 max-w-[1000px] mx-auto">
      <header className="py-10 bg-gradient-to-b from-neon-cyan/10 to-bg-dark border-b border-gray-700 mb-8">
        <Link to="/" className="inline-block mb-5 text-gray-500 no-underline text-sm hover:text-white">
          <i className="fas fa-arrow-left" /> Volver al Inicio
        </Link>
        <h1 className="text-neon-cyan text-4xl uppercase tracking-wider m-0" style={{ textShadow: '0 0 10px rgba(0,255,204,0.3)' }}>
          Postulación Expositores
        </h1>
        <p className="text-gray-400 mt-2.5 max-w-[600px] mx-auto">
          ¿Quieres ser parte de EPIKON? Lee atentamente las bases y únete al evento geek más grande de la región.
        </p>
      </header>

      <h2 className="section-title">ℹ️ Información General</h2>
      <div className="grid-base mb-8">
        <div className="card p-5 flex-[1_1_300px] text-left">
          <h3 className="text-neon-cyan flex items-center gap-2.5 mt-0"><i className="far fa-calendar-alt" /> Coordenadas</h3>
          <ul className="list-none p-0 text-gray-300">
            <li><strong>Fecha:</strong> 23 de Noviembre</li>
            <li><strong>Horario:</strong> 10:00 a 20:00 hrs</li>
            <li><strong>Lugar:</strong> Av. la Compañía 128, Graneros</li>
            <li><strong>Valor Stand:</strong> $15.000 (2x1.5 mts)</li>
          </ul>
        </div>
        <div className="card p-5 flex-[1_1_300px] text-left">
          <h3 className="text-neon-cyan flex items-center gap-2.5 mt-0"><i className="fas fa-store" /> Tipos de Stand</h3>
          <ul className="text-gray-300">
            <li><strong>Tiendas:</strong> Venta de artículos geek, anime, juegos.</li>
            <li><strong>Snacks:</strong> Comida y bebestibles envasados.</li>
            <li><strong>Comida:</strong> Alimentos preparados (solo envasados, sin cocinar en sitio).</li>
          </ul>
        </div>
      </div>

      <h2 className="section-title">📜 Reglamento</h2>
      <div className="grid-base mb-8">
        <div className="card p-5 flex-[1_1_100%] text-left">
          <h3 className="text-neon-cyan flex items-center gap-2.5 mt-0"><i className="fas fa-clock" /> Horarios y Montaje</h3>
          <ul className="text-gray-300">
            <li>Llegada de expositores: desde las <strong>08:45 hrs</strong>.</li>
            <li>Montaje hasta las <strong>10:00 hrs</strong> (Se exige puntualidad).</li>
            <li>La ubicación será asignada por la organización previamente.</li>
            <li>No se puede montar sin recepción del Staff.</li>
          </ul>
        </div>
        <div className="card p-5 flex-[1_1_100%] text-left">
          <h3 className="text-neon-cyan flex items-center gap-2.5 mt-0"><i className="fas fa-box-open" /> Tu Stand</h3>
          <ul className="text-gray-300">
            <li>Debes llevar tu propia <strong>mesa y sillas</strong>.</li>
            <li>Uso obligatorio de <strong>mantel negro largo</strong>.</li>
            <li>Nombre o logo visible para reconocimiento.</li>
            <li>Permitido: Paneles, rejillas y estantes (sin tapar tránsito).</li>
            <li>Se recomienda asistir con 1 acompañante (el staff no cuida puestos).</li>
          </ul>
        </div>
        <div className="card p-5 flex-[1_1_100%] text-left">
          <h3 className="text-neon-cyan flex items-center gap-2.5 mt-0"><i className="fas fa-hand-holding-heart" /> Compromisos</h3>
          <ul className="text-gray-300">
            <li><strong>Limpieza:</strong> Llevar bolsas de basura y mantener el espacio limpio.</li>
            <li><strong>Premio:</strong> Donar un premio (valor mín. $5.000) para sorteos.</li>
            <li><strong>Difusión:</strong> Compartir el flyer oficial en redes sociales al menos 1 vez por semana.</li>
          </ul>
        </div>
      </div>

      <h2 className="section-title" style={{ color: '#ff0055', borderColor: '#ff0055' }}>⚠️ Importante</h2>
      <div className="grid-base mb-8">
        <div className="card p-5 flex-[1_1_300px] text-left border-neon-pink bg-neon-pink/5">
          <h3 className="text-neon-pink flex items-center gap-2.5 mt-0"><i className="fas fa-ban" /> Prohibido</h3>
          <ul className="text-gray-300">
            <li>Armas reales o réplicas peligrosas.</li>
            <li>Alcohol, Grow shop o Sex shop.</li>
            <li>Artículos racistas, de odio o contenido erótico explícito (+18).</li>
          </ul>
        </div>
        <div className="card p-5 flex-[1_1_300px] text-left border-neon-pink bg-neon-pink/5">
          <h3 className="text-neon-pink flex items-center gap-2.5 mt-0"><i className="fas fa-gavel" /> Legal</h3>
          <p className="text-gray-300 text-sm">
            Es responsabilidad de cada expositor contar con su formalización en el SII y/o Resolución Sanitaria si aplica. La organización no se hace responsable de multas por fiscalización.
          </p>
        </div>
      </div>

      <div className="my-12 text-center">
        <h2 className="mb-2.5">¿Listo para participar?</h2>
        <p className="text-gray-400">Completa el formulario y espera nuestra confirmación al correo.</p>
        <a href="https://forms.gle/wXUGVdmEctYRJ64h8" target="_blank" rel="noopener noreferrer"
          className="block w-full max-w-md mx-auto py-4 px-5 border border-neon-cyan text-neon-cyan rounded-lg font-bold no-underline mt-5 text-lg hover:bg-neon-cyan hover:text-black transition-all">
          <i className="fas fa-paper-plane" /> IR AL FORMULARIO DE POSTULACIÓN
        </a>
      </div>
    </div>
  )
}
