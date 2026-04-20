export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  duration: string;
  views?: string;
  uploadDate?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  description?: string;
  creator?: string;
  tags?: string[];
}

export interface Plan {
  nome: string;
  preco: string;
  recursos: string[];
}

export type ErrorCode =
  | 'auth/invalid-email'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/weak-password'
  | 'auth/network-request-failed'
  | 'auth/requires-recent-login'
  | string;
