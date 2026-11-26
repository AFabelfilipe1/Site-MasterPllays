// src/components/SimpleTest.tsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const SimpleTest: React.FC = () => {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleGoogleLogin = async () => {
    setMessage('Iniciando login...');
    setError('');
    
    try {
      await loginWithGoogle();
      setMessage('Login realizado com sucesso!');
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Erro detalhado:', error);
      setError(`Erro: ${error.message}`);
      setMessage('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setMessage('Logout realizado com sucesso!');
    } catch (err: unknown) {
      const error = err as Error;
      setError(`Erro no logout: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-[#09090b] p-6 pt-24 text-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">🔧 Teste Firebase Authentication</h1>
      
      <div className="mb-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Informações do Projeto</h2>
        <ul className="space-y-2 text-gray-300">
          <li><strong>Projeto Firebase:</strong> masterpllays</li>
          <li><strong>Domínio Auth:</strong> masterpllays.firebaseapp.com</li>
          <li><strong>Domínio Atual:</strong> {window.location.hostname}</li>
          <li><strong>Status:</strong> {user ? '✅ Logado' : '❌ Não logado'}</li>
        </ul>
      </div>

      {!user ? (
        <div className="text-center">
          <button
            onClick={handleGoogleLogin}
            className="mx-auto flex items-center justify-center gap-3 rounded-full bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-500"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5"
            />
            Login com Google
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">✅ Logado com Sucesso!</h2>
          <div className="flex flex-col items-center mb-6">
            {user.photoURL && (
              <img 
                src={user.photoURL} 
                alt={user.displayName || 'Usuário'} 
                className="w-24 h-24 rounded-full mb-4"
              />
            )}
            <p className="text-xl font-semibold text-white">{user.displayName}</p>
            <p className="text-gray-400">{user.email}</p>
            <p className="text-sm text-gray-500 mt-2">ID: {user.uid.substring(0, 10)}...</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full bg-red-600 px-6 py-2 font-bold text-white transition hover:bg-red-500"
          >
            Sair
          </button>
        </div>
      )}

      {message && (
        <div className="mt-6 p-4 bg-green-900/20 border border-green-700 text-green-200 rounded-lg">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-900/20 border border-red-700 text-red-200 rounded-lg">
          <h3 className="font-bold">Erro:</h3>
          <p className="whitespace-pre-wrap">{error}</p>
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded">
            <h4 className="font-bold text-yellow-200">Solução:</h4>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-yellow-200">
              <li>Verifique se está no projeto <strong>masterpllays</strong> no Firebase Console</li>
              <li>Ative Google Sign-in em Authentication → Sign-in method</li>
              <li>Adicione <code>{window.location.hostname}</code> em Authorized domains</li>
            </ol>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
        <h3 className="font-bold text-lg mb-3 text-white">Próximos Passos:</h3>
        <ul className="space-y-2 text-gray-400">
          <li>✅ Acesse: <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-red-500 hover:text-red-400 underline">Firebase Console</a></li>
          <li>✅ Verifique projeto: <strong>masterpllays</strong> (com DOIS L)</li>
          <li>✅ Vá para: Build → Authentication → Sign-in method</li>
          <li>✅ Ative "Google" como provedor</li>
          <li>✅ Em Settings → Authorized domains, adicione:
            <ul className="ml-6 mt-2 space-y-1">
              <li><code>localhost</code></li>
              <li><code>afabelfilipe1.github.io</code></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleTest;