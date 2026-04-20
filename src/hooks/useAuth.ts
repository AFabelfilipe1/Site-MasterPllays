import { useState, useEffect } from 'react';
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

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      const { message } = parseFirebaseError(err);
      setError(message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout
  };
};