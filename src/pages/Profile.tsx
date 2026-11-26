// src/pages/Profile.tsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import {
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await updateProfile(user, {
        displayName: displayName
      });

      // Se o email foi alterado, precisa reautenticar
      if (email !== user.email && currentPassword) {
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, email);
      }

      // Se nova senha foi definida
      if (newPassword && currentPassword) {
        if (newPassword !== confirmPassword) {
          throw new Error('As senhas não coincidem');
        }
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
      }

      setSuccess('Perfil atualizado com sucesso!');
      setIsEditing(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Recarregar a página para atualizar o header
      setTimeout(() => window.location.reload(), 1500);

    } catch (err) {
      let code = 'unknown';
      if (err instanceof Error && 'code' in err) {
        code = (err.code as string) || 'unknown';
      }
      console.error('Erro ao atualizar perfil:', err);

      const errorMessages: Record<string, string> = {
        'auth/requires-recent-login': 'Para alterar email ou senha, faça login novamente.',
        'auth/wrong-password': 'Senha atual incorreta.',
        'auth/email-already-in-use': 'Este email já está em uso.',
        'auth/weak-password': 'A nova senha deve ter pelo menos 6 caracteres.',
      };

      setError(errorMessages[code] || 'Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentPassword) {
      setError('Digite sua senha atual para confirmar a exclusão.');
      return;
    }

    setIsSubmitting(true);
    try {
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);

      setSuccess('Conta excluída com sucesso.');
      setTimeout(() => logout(), 2000);

    } catch (err) {
      let code = 'unknown';
      if (err instanceof Error && 'code' in err) {
        code = (err.code as string) || 'unknown';
      }
      console.error('Erro ao excluir conta:', err);

      setError(code === 'auth/wrong-password' ? 'Senha incorreta.' : 'Erro ao excluir conta. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isGoogleUser = user.providerData.some(provider => provider.providerId === 'google.com');

  return (
    <div className="min-h-screen bg-[#09090b] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/30">
        <div className="px-6 py-8 sm:px-8">
          <div className="text-center mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">Sua conta</p>
            <h1 className="text-3xl font-black tracking-tight text-white">Meu Perfil</h1>
            <p className="mt-2 text-gray-400">Gerencie suas informações pessoais</p>
          </div>

          {/* Avatar e Info Básica */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-800 text-2xl font-bold text-white ring-4 ring-red-500/10">
                  {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold text-white">
              {user.displayName || 'Usuário'}
            </h2>
            <p className="text-gray-400">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Conta criada em {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('pt-BR') : 'Data desconhecida'}
            </p>
            {isGoogleUser && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-300 mt-2 border border-red-700">
                Conta Google
              </span>
            )}
          </div>

          {/* Mensagens de Status */}
          {error && (
            <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-sm text-green-200">{success}</p>
            </div>
          )}

          {/* Formulário de Edição */}
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-300">
                  Nome de Exibição
                </label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-white/10 bg-[#0b0b0e] px-4 py-3 text-white placeholder-gray-500 transition focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-white/10 bg-[#0b0b0e] px-4 py-3 text-white placeholder-gray-500 transition focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              {!isGoogleUser && (
                <>
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300">
                      Senha Atual (obrigatória para alterações)
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="mt-1 block w-full rounded-xl border border-white/10 bg-[#0b0b0e] px-4 py-3 text-white placeholder-gray-500 transition focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                      placeholder="Digite sua senha atual"
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
                      Nova Senha (opcional)
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 block w-full rounded-xl border border-white/10 bg-[#0b0b0e] px-4 py-3 text-white placeholder-gray-500 transition focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                      placeholder="Digite a nova senha"
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 block w-full rounded-xl border border-white/10 bg-[#0b0b0e] px-4 py-3 text-white placeholder-gray-500 transition focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                      placeholder="Confirme a nova senha"
                      minLength={6}
                    />
                  </div>
                </>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-full bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setDisplayName(user.displayName || '');
                    setEmail(user.email || '');
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setError('');
                  }}
                  className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-gray-300 transition hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full rounded-full bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Editar Perfil
              </button>
            </div>
          )}

          {/* Excluir Conta */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Zona de Perigo</h3>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full rounded-full border border-red-500/30 bg-red-500/10 px-4 py-3 font-semibold text-red-200 transition hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Excluir Conta
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-400">
                  Esta ação não pode ser desfeita. Digite sua senha para confirmar:
                </p>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full rounded-xl border border-white/10 bg-[#0b0b0e] px-4 py-3 text-white placeholder-gray-500 transition focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  placeholder="Digite sua senha"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isSubmitting}
                    className="flex-1 rounded-full bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? 'Excluindo...' : 'Confirmar Exclusão'}
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setCurrentPassword('');
                    }}
                    className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-gray-300 transition hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;