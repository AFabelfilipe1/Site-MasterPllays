import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { parseFirebaseError } from '../types/errors';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Auth state change error:', error);
      setError('Erro ao verificar autenticação');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    if (!auth || !googleProvider) {
      const message = 'Login indisponível: configure as variáveis do Firebase para este ambiente.';
      setError(message);
      throw new Error(message);
    }
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const { message } = parseFirebaseError(err);
      setError(message);
      throw err;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    if (!auth) {
      const message = 'Login indisponível: configure as variáveis do Firebase para este ambiente.';
      setError(message);
      throw new Error(message);
    }
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const { message } = parseFirebaseError(err);
      setError(message);
      throw err;
    }
  };

  const registerWithEmail = async (email: string, password: string) => {
    if (!auth) {
      const message = 'Cadastro indisponível: configure as variáveis do Firebase para este ambiente.';
      setError(message);
      throw new Error(message);
    }
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const { message } = parseFirebaseError(err);
      setError(message);
      throw err;
    }
  };

  const logout = async () => {
    if (!auth) {
      setUser(null);
      return;
    }
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      const { message } = parseFirebaseError(err);
      setError(message);
      throw err;
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    loading,
    error,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
