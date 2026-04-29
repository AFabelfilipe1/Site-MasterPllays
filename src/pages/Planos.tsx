import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { PLANS } from '../types/data'

export default function Planos() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleChoosePlan = (planName: string, planPrice: string) => {
    if (!user) {
      navigate('/auth')
      return
    }

    navigate(`/pagamento?plano=${encodeURIComponent(planName)}&preco=${encodeURIComponent(planPrice)}`)
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4 text-white">
          Nossos Planos
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Escolha o plano perfeito para você
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plano) => (
            <div key={plano.nome} className="border border-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl hover:border-red-600 transition-all bg-gray-900">
              <h2 className="text-2xl font-bold mb-4 text-white">{plano.nome}</h2>
              <p className="text-3xl font-bold text-red-600 mb-6">{plano.preco}</p>

              <ul className="space-y-3 mb-8">
                {plano.recursos.map((recurso) => (
                  <li key={recurso} className="flex items-center text-gray-300">
                    <span className="text-red-500 mr-3 text-lg">✓</span>
                    {recurso}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleChoosePlan(plano.nome, plano.preco)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                {user ? 'Escolher Plano' : 'Faça login para continuar'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Todos os planos incluem acesso à nossa biblioteca completa de vídeos.
          </p>
        </div>
      </div>
    </div>
  )
}