import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  type Unsubscribe,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from '../firebase';
import type { VideoComment } from '../types/comment';

const commentsCollection = (videoId: string) => {
  if (!db) throw new Error('Cloud Firestore não está configurado.');
  return collection(db, 'videos', videoId, 'comments');
};

const commentDocument = (videoId: string, commentId: string) => {
  if (!db) throw new Error('Cloud Firestore não está configurado.');
  return doc(db, 'videos', videoId, 'comments', commentId);
};

export function subscribeToComments(
  videoId: string,
  callback: (comments: VideoComment[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  const commentsQuery = query(
    commentsCollection(videoId),
    orderBy('createdAt', 'asc'),
  );

  return onSnapshot(
    commentsQuery,
    (snapshot) => {
      const comments = snapshot.docs.map((item) => {
        const data = item.data();
        return {
          id: item.id,
          videoId,
          userId: String(data.userId ?? ''),
          username: String(data.username ?? 'Usuário'),
          userPhoto: typeof data.userPhoto === 'string' ? data.userPhoto : null,
          text: String(data.text ?? ''),
          parentId: typeof data.parentId === 'string' ? data.parentId : null,
          status: data.status === 'hidden' ? 'hidden' : 'visible',
          createdAt: data.createdAt?.toDate?.() ?? null,
          updatedAt: data.updatedAt?.toDate?.() ?? null,
        } satisfies VideoComment;
      });
      callback(comments);
    },
    (error) => onError(error),
  );
}

export async function createComment(
  videoId: string,
  user: User,
  text: string,
  parentId: string | null = null,
): Promise<void> {
  const cleanText = text.trim();
  if (!cleanText) throw new Error('Escreva um comentário antes de publicar.');
  if (cleanText.length > 2000) throw new Error('O comentário deve ter no máximo 2.000 caracteres.');

  await addDoc(commentsCollection(videoId), {
    videoId,
    userId: user.uid,
    username: (user.displayName?.trim() || user.email?.split('@')[0] || 'Usuário').slice(0, 80),
    userPhoto: user.photoURL || null,
    text: cleanText,
    parentId,
    status: 'visible',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function editComment(
  videoId: string,
  commentId: string,
  text: string,
): Promise<void> {
  const cleanText = text.trim();
  if (!cleanText) throw new Error('O comentário não pode ficar vazio.');
  if (cleanText.length > 2000) throw new Error('O comentário deve ter no máximo 2.000 caracteres.');

  await updateDoc(commentDocument(videoId, commentId), {
    text: cleanText,
    updatedAt: serverTimestamp(),
  });
}

export async function removeComment(videoId: string, commentId: string): Promise<void> {
  await deleteDoc(commentDocument(videoId, commentId));
}

export async function toggleCommentLike(
  videoId: string,
  commentId: string,
  userId: string,
): Promise<boolean> {
  if (!db) throw new Error('Cloud Firestore não está configurado.');

  const likeRef = doc(db, 'videos', videoId, 'comments', commentId, 'likes', userId);
  const existing = await getDoc(likeRef);

  if (existing.exists()) {
    await deleteDoc(likeRef);
    return false;
  }

  await setDoc(likeRef, { userId, createdAt: serverTimestamp() });
  return true;
}

export async function getCommentLikeData(
  videoId: string,
  commentId: string,
  userId?: string,
): Promise<{ count: number; liked: boolean }> {
  if (!db) return { count: 0, liked: false };

  const likesRef = collection(db, 'videos', videoId, 'comments', commentId, 'likes');
  const countSnapshot = await getCountFromServer(likesRef);
  const liked = userId
    ? (await getDoc(doc(db, 'videos', videoId, 'comments', commentId, 'likes', userId))).exists()
    : false;

  return { count: countSnapshot.data().count, liked };
}

export async function reportComment(
  videoId: string,
  commentId: string,
  user: User,
  reason: string,
): Promise<void> {
  const cleanReason = reason.trim();
  if (!cleanReason) throw new Error('Informe o motivo da denúncia.');

  await addDoc(
    collection(commentDocument(videoId, commentId), 'reports'),
    {
      userId: user.uid,
      reason: cleanReason.slice(0, 500),
      createdAt: serverTimestamp(),
    },
  );
}
