import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 text-white">
      <div className="max-w-md rounded-3xl border border-white/[0.08] bg-white/[0.025] p-8 text-center shadow-2xl shadow-black/30 sm:p-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-red-400">Erro de navegação</p>
        <h1 className="mb-4 text-8xl font-black tracking-tighter text-red-500 sm:text-9xl">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
          Página não encontrada
        </h2>
        <p className="mb-8 text-base leading-relaxed text-gray-400">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link 
            to="/" 
            className="inline-block rounded-full bg-red-600 px-7 py-3 font-semibold text-white transition-colors duration-200 hover:bg-red-500"
          >
            Voltar para Home
          </Link>
          <Link 
            to="/videos" 
            className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-7 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/[0.08]"
          >
            Explorar Vídeos
          </Link>
        </div>
      </div>
    </div>
  )
}