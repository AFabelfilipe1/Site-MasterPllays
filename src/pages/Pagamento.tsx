import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PLANS } from '../types/data';

export default function Pagamento() {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const plan = PLANS.find((item) => item.nome === searchParams.get('plano'));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-white" role="status">
        Carregando...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!plan) {
    return <Navigate to="/planos" replace />;
  }

  const price = plan.precoComDesconto || plan.precoBase;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 py-24 text-white">
      <section className="w-full max-w-xl rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 text-center shadow-2xl shadow-black/20 sm:p-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
          Finalização do plano
        </p>
        <h1 className="text-3xl font-black tracking-tight">Plano {plan.nome}</h1>
        <p className="mt-3 text-2xl font-bold text-red-400">{price}</p>
        <p className="mt-6 rounded-2xl border border-amber-400/15 bg-amber-400/[0.06] p-4 text-left leading-relaxed text-gray-300">
          O pagamento ainda não está disponível. Nenhuma cobrança foi realizada.
          Não informe dados de cartão ou documentos neste site.
        </p>
        <Link
          to="/planos"
          className="mt-8 inline-flex rounded-full bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-950/30 transition-colors hover:bg-red-500"
        >
          Voltar para os planos
        </Link>
      </section>
    </main>
  );
}
