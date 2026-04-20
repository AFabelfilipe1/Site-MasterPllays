import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-red-600 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-white mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Voltar para Home
          </Link>
          <Link 
            to="/videos" 
            className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Explorar Vídeos
          </Link>
        </div>
      </div>
    </div>
  )
}