import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PLANS } from '../types/data';

export default function Pagamento() {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const plan = PLANS.find((item) => item.nome === searchParams.get('plano'));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white" role="status">
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
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-24 text-white">
      <section className="w-full max-w-xl rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
        <h1 className="text-3xl font-bold">Plano {plan.nome}</h1>
        <p className="mt-3 text-xl text-red-500">{price}</p>
        <p className="mt-6 text-gray-300">
          O pagamento ainda não está disponível. Nenhuma cobrança foi realizada.
          Não informe dados de cartão ou documentos neste site.
        </p>
        <Link
          to="/planos"
          className="mt-8 inline-block rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
        >
          Voltar para os planos
        </Link>
      </section>
    </main>
  );
}
