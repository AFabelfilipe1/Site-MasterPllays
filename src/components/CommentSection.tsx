import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  createComment,
  editComment,
  getCommentLikeData,
  removeComment,
  reportComment,
  subscribeToComments,
  toggleCommentLike,
} from '../services/commentService';
import type { VideoComment } from '../types/comment';

interface CommentsSectionProps {
  videoId: string;
}

interface CommentItemProps {
  comment: VideoComment;
  replies: VideoComment[];
  videoId: string;
  currentUserId?: string;
  onReply: (commentId: string) => void;
  onEdit: (comment: VideoComment) => void;
  onDelete: (comment: VideoComment) => void;
  onReport: (comment: VideoComment) => void;
}

const formatDate = (date: Date | null) => {
  if (!date) return 'Agora mesmo';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  replies,
  videoId,
  currentUserId,
  onReply,
  onEdit,
  onDelete,
  onReport,
}) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const { user } = useAuth();
  const isOwner = currentUserId === comment.userId;

  useEffect(() => {
    let active = true;
    getCommentLikeData(videoId, comment.id, currentUserId)
      .then((data) => {
        if (active) {
          setLikeCount(data.count);
          setLiked(data.liked);
        }
      })
      .catch((error) => console.error('Erro ao carregar curtidas:', error));
    return () => {
      active = false;
    };
  }, [videoId, comment.id, currentUserId]);

  const handleLike = async () => {
    if (!user) return;
    setLikeLoading(true);
    try {
      const nextLiked = await toggleCommentLike(videoId, comment.id, user.uid);
      setLiked(nextLiked);
      setLikeCount((count) => Math.max(0, count + (nextLiked ? 1 : -1)));
    } catch (error) {
      console.error(error);
      window.alert('Não foi possível registrar sua curtida. Tente novamente.');
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <article className="border-b border-gray-800 py-5 last:border-b-0">
      <div className="flex items-start gap-3">
        {comment.userPhoto ? (
          <img src={comment.userPhoto} alt="" className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-700 font-bold text-white">
            {comment.username.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-semibold text-white">{comment.username}</span>
            <time className="text-xs text-gray-500">{formatDate(comment.createdAt)}</time>
          </div>

          <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-300">
            {comment.text}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
            <button
              type="button"
              onClick={handleLike}
              disabled={!user || likeLoading}
              title={!user ? 'Entre para curtir' : liked ? 'Remover curtida' : 'Curtir comentário'}
              className={`font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${liked ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
            >
              {liked ? 'Curtido' : 'Curtir'} · {likeCount}
            </button>

            {user && (
              <button type="button" onClick={() => onReply(comment.id)} className="font-medium text-gray-400 hover:text-white">
                Responder
              </button>
            )}

            {isOwner && (
              <>
                <button type="button" onClick={() => onEdit(comment)} className="font-medium text-gray-400 hover:text-white">
                  Editar
                </button>
                <button type="button" onClick={() => onDelete(comment)} className="font-medium text-red-400 hover:text-red-300">
                  Excluir
                </button>
              </>
            )}

            {user && !isOwner && (
              <button type="button" onClick={() => onReport(comment)} className="font-medium text-gray-500 hover:text-red-400">
                Denunciar
              </button>
            )}
          </div>

          {replies.length > 0 && (
            <div className="mt-3 border-l-2 border-gray-700 pl-4">
              {replies.map((reply) => (
                <div key={reply.id} className="border-b border-gray-800/70 py-3 last:border-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-white">{reply.username}</span>
                    <time className="text-xs text-gray-500">{formatDate(reply.createdAt)}</time>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm text-gray-300">{reply.text}</p>
                  {currentUserId === reply.userId && (
                    <div className="mt-2 flex gap-3 text-xs">
                      <button type="button" onClick={() => onEdit(reply)} className="text-gray-400 hover:text-white">Editar</button>
                      <button type="button" onClick={() => onDelete(reply)} className="text-red-400 hover:text-red-300">Excluir</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const CommentsSection: React.FC<CommentsSectionProps> = ({ videoId }) => {
  const { user, loading: authLoading } = useAuth();
  const [comments, setComments] = useState<VideoComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editing, setEditing] = useState<VideoComment | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = subscribeToComments(
        videoId,
        (items) => {
          setComments(items);
          setLoading(false);
          setError('');
        },
        (err) => {
          console.error('Erro ao receber comentários:', err);
          setError('Não foi possível carregar os comentários. Verifique a configuração do Firestore e as regras de segurança.');
          setLoading(false);
        },
      );
      return unsubscribe;
    } catch (err) {
      console.error('Firestore indisponível:', err);
      setError('O Cloud Firestore ainda não está configurado neste projeto.');
      setLoading(false);
      return undefined;
    }
  }, [videoId]);

  const visibleComments = useMemo(
    () => comments.filter((comment) => comment.status === 'visible'),
    [comments],
  );
  const rootComments = visibleComments.filter((comment) => !comment.parentId);
  const repliesByParent = useMemo(() => {
    const grouped = new Map<string, VideoComment[]>();
    visibleComments.forEach((comment) => {
      if (!comment.parentId) return;
      const list = grouped.get(comment.parentId) ?? [];
      list.push(comment);
      grouped.set(comment.parentId, list);
    });
    return grouped;
  }, [visibleComments]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !text.trim()) return;

    setSubmitting(true);
    setError('');
    try {
      if (editing) {
        await editComment(videoId, editing.id, text);
      } else {
        await createComment(videoId, user, text, replyTo);
      }
      setText('');
      setReplyTo(null);
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível publicar o comentário.');
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (comment: VideoComment) => {
    setEditing(comment);
    setReplyTo(null);
    setText(comment.text);
    document.getElementById(`comments-${videoId}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const deleteComment = async (comment: VideoComment) => {
    if (!window.confirm('Tem certeza de que deseja excluir este comentário?')) return;
    try {
      await removeComment(videoId, comment.id);
    } catch (err) {
      console.error(err);
      window.alert('Não foi possível excluir o comentário.');
    }
  };

  const handleReport = async (comment: VideoComment) => {
    if (!user) return;
    const reason = window.prompt('Por que você deseja denunciar este comentário?');
    if (!reason?.trim()) return;
    try {
      await reportComment(videoId, comment.id, user, reason);
      window.alert('Denúncia enviada. Obrigado por ajudar a manter a comunidade segura.');
    } catch (err) {
      console.error(err);
      window.alert('Não foi possível enviar a denúncia.');
    }
  };

  const selectedReply = replyTo ? comments.find((item) => item.id === replyTo) : null;

  return (
    <section id={`comments-${videoId}`} className="mt-8 border-t border-gray-800 pt-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-bold text-white">Comentários</h3>
        <span className="text-sm text-gray-400">{rootComments.length} comentário(s)</span>
      </div>

      {authLoading ? null : user ? (
        <form onSubmit={submit} className="mb-6">
          {(replyTo && selectedReply) && (
            <div className="mb-2 flex items-center justify-between rounded-lg bg-gray-800 px-3 py-2 text-xs text-gray-300">
              Respondendo a {selectedReply.username}
              <button type="button" onClick={() => setReplyTo(null)} className="text-gray-400 hover:text-white">Cancelar</button>
            </div>
          )}
          {editing && (
            <div className="mb-2 flex items-center justify-between rounded-lg bg-gray-800 px-3 py-2 text-xs text-gray-300">
              Editando seu comentário
              <button type="button" onClick={() => { setEditing(null); setText(''); }} className="text-gray-400 hover:text-white">Cancelar edição</button>
            </div>
          )}
          <label htmlFor={`comment-input-${videoId}`} className="mb-2 block text-sm font-medium text-gray-300">
            {editing ? 'Editar comentário' : replyTo ? 'Escreva sua resposta' : 'Deixe seu comentário'}
          </label>
          <textarea
            id={`comment-input-${videoId}`}
            value={text}
            onChange={(event) => setText(event.target.value)}
            maxLength={2000}
            rows={3}
            placeholder="Compartilhe sua opinião..."
            className="w-full resize-y rounded-lg border border-gray-700 bg-gray-800 p-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500"
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-gray-500">{text.length}/2000</span>
            <button
              type="submit"
              disabled={submitting || !text.trim()}
              className="rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Enviando...' : editing ? 'Salvar edição' : replyTo ? 'Enviar resposta' : 'Publicar comentário'}
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900 p-4 text-sm text-gray-300">
          <p>Entre na sua conta para publicar, responder e curtir comentários.</p>
          <Link to="/auth" className="mt-3 inline-flex rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-500">
            Entrar ou criar conta
          </Link>
        </div>
      )}

      {error && <p role="alert" className="mb-4 rounded-lg bg-red-950/60 p-3 text-sm text-red-300">{error}</p>}

      {loading ? (
        <p className="py-6 text-sm text-gray-400">Carregando comentários...</p>
      ) : rootComments.length === 0 ? (
        <p className="rounded-lg bg-gray-900 p-5 text-sm text-gray-400">Ainda não há comentários. Seja a primeira pessoa a comentar!</p>
      ) : (
        <div>
          {rootComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replies={repliesByParent.get(comment.id) ?? []}
              videoId={videoId}
              currentUserId={user?.uid}
              onReply={(id) => { setEditing(null); setText(''); setReplyTo(id); }}
              onEdit={startEdit}
              onDelete={deleteComment}
              onReport={handleReport}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentsSection;
