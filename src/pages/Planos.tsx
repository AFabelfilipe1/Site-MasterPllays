import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
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
    <div className="min-h-screen bg-[#09090b] pb-16 pt-24 text-white">
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-red-400">
          Escolha sua experiência
        </p>
        <h1 className="mb-4 text-center text-4xl font-black tracking-tight sm:text-5xl">
          Nossos Planos
        </h1>
        <p className="mb-12 text-center text-gray-400">
          Escolha o plano perfeito para você
        </p>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {PLANS.map((plano) => (
            <div key={plano.nome} className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.05] sm:p-7">
              <h2 className="mb-4 text-2xl font-bold text-white">{plano.nome}</h2>
              
              <div className="mb-7 min-h-24">
                {plano.desconto ? (
                  <div>
                    <p className="mb-2 text-sm text-gray-500 line-through">{plano.precoBase}</p>
                    <p className="text-3xl font-black text-red-400">{plano.precoComDesconto}</p>
                    <p className="mt-3 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">{plano.desconto}% OFF · {plano.periodoDesconto}</p>
                  </div>
                ) : (
                  <p className="text-3xl font-black text-red-400">{plano.precoBase}</p>
                )}
              </div>

              <ul className="mb-8 flex-1 space-y-3 border-t border-white/[0.08] pt-6">
                {plano.recursos.map((recurso) => (
                  <li key={recurso} className="flex items-start gap-3 text-sm leading-relaxed text-gray-300">
                    <span className="mt-0.5 text-red-400">✓</span>
                    {recurso}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleChoosePlan(plano.nome, plano.precoComDesconto || plano.precoBase)}
                className="w-full rounded-full bg-red-600 py-3 font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#111114]"
              >
                {user ? 'Escolher Plano' : 'Faça login para continuar'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Todos os planos incluem acesso à nossa biblioteca completa de vídeos.
          </p>
        </div>
      </div>
    </div>
  )
}