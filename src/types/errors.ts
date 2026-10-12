import { ErrorCode } from './index';

export function parseFirebaseError(error: unknown): { code: ErrorCode; message: string } {
  if (error instanceof Error) {
    const err = error as { code?: string; message: string };
    return {
      code: err.code as ErrorCode || 'unknown',
      message: err.message
    };
  }

  if (typeof error === 'object' && error !== null) {
    const err = error as { code?: string; message?: string };
    return {
      code: err.code as ErrorCode || 'unknown',
      message: err.message || 'An unknown error occurred'
    };
  }

  return {
    code: 'unknown',
    message: String(error) || 'An unknown error occurred'
  };
}

export function getFirebaseErrorMessage(code: ErrorCode): string {
  const messages: Record<ErrorCode, string> = {
    'auth/invalid-email': 'Email inválido.',
    'auth/user-disabled': 'Esta conta foi desativada.',
    'auth/user-not-found': 'Usuário não encontrado. Verifique o email ou cadastre-se.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/email-already-in-use': 'Este email já está cadastrado.',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
    'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
    'auth/requires-recent-login': 'Para alterar email ou senha, faça login novamente.',
  };

  return messages[code] || 'Erro ao processar sua solicitação. Tente novamente.';
}
