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
    <div className="min-h-screen bg-[#09090b] pt-20 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
            Acesso e benefícios
          </p>
          <h1 className="mb-4 text-4xl font-black tracking-tight sm:text-5xl">
            Nossos Planos
          </h1>
          <p className="mx-auto max-w-xl text-gray-400">
            Escolha o plano perfeito para você
          </p>
        </header>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {PLANS.map((plano) => (
            <article key={plano.nome} className="flex flex-col rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-xl shadow-black/15 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.045] sm:p-8">
              <h2 className="mb-4 text-2xl font-bold text-white">{plano.nome}</h2>
              
              <div className="mb-6 min-h-24">
                {plano.desconto ? (
                  <div>
                    <p className="text-sm text-gray-400 line-through mb-2">{plano.precoBase}</p>
                    <p className="text-3xl font-black text-red-400">{plano.precoComDesconto}</p>
                    <p className="mt-2 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">{plano.desconto}% OFF - {plano.periodoDesconto}</p>
                  </div>
                ) : (
                  <p className="text-3xl font-black text-red-400">{plano.precoBase}</p>
                )}
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plano.recursos.map((recurso) => (
                  <li key={recurso} className="flex items-center text-gray-300">
                    <span className="mr-3 text-lg text-red-400">✓</span>
                    {recurso}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleChoosePlan(plano.nome, plano.precoComDesconto || plano.precoBase)}
                className="w-full rounded-full bg-red-600 py-3 font-semibold text-white shadow-lg shadow-red-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-500"
              >
                {user ? 'Escolher Plano' : 'Faça login para continuar'}
              </button>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-center">
          <p className="text-gray-400">
            Todos os planos incluem acesso à nossa biblioteca completa de vídeos.
          </p>
        </div>
      </div>
    </div>
  )
}