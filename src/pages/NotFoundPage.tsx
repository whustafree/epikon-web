import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-5">
      <h1 className="text-6xl m-0" style={{ textShadow: '0 0 20px #00ffcc' }}>GAME OVER</h1>
      <p className="text-2xl text-white my-4">La página que buscas ha sido eliminada por el sistema.</p>
      <p className="text-white">INSERT COIN TO CONTINUE</p>
      <Link to="/"
        className="border-2 border-neon-cyan bg-transparent text-neon-cyan px-8 py-4 text-lg no-underline font-bold mt-5 hover:bg-neon-cyan hover:text-black transition-all"
        style={{ boxShadow: 'none' }}
      >
        VOLVER AL INICIO
      </Link>
    </div>
  )
}
