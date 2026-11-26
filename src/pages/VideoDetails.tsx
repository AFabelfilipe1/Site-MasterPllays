import React from 'react';
import { Link, useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import CommentsSection from '../components/CommentsSection';
import { VIDEOS } from '../types/data';

const VideoDetails: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const video = VIDEOS.find((item) => item.id === videoId);

  if (!video) {
    return (
      <main className="min-h-screen bg-[#09090b] px-4 pb-16 pt-28 text-white">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 text-center shadow-xl sm:p-12">
          <h1 className="text-2xl font-bold">Vídeo não encontrado</h1>
          <p className="mt-3 text-gray-400">Este conteúdo não está disponível na biblioteca atual.</p>
          <Link to="/videos" className="mt-6 inline-flex rounded-full bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-500">
            Voltar para os vídeos
          </Link>
        </div>
      </main>
    );
  }

  const videoUrl = video.youtubeId
    ? `https://www.youtube.com/embed/${video.youtubeId}`
    : '';

  return (
    <main className="min-h-screen bg-[#09090b] px-4 pb-16 pt-28 text-white">
      <article className="mx-auto max-w-5xl">
        <Link to="/videos" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-red-300 transition hover:text-white">
          ← Voltar para a biblioteca
        </Link>

        <h1 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl">{video.title}</h1>
        <div className="mb-6 flex flex-wrap gap-2 text-xs text-gray-300 sm:text-sm">
          {video.category && <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-red-200">{video.category}</span>}
          {video.duration && <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">{video.duration}</span>}
          {video.creator && <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">Por {video.creator}</span>}
          {video.views && <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">{video.views} visualizações</span>}
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/30">
          {video.youtubeId ? (
            <VideoPlayer videoUrl={videoUrl} />
          ) : (
            <div className="flex aspect-video items-center justify-center p-6 text-center text-gray-400">
              Este vídeo ainda não possui um ID válido do YouTube.
            </div>
          )}
        </div>

        {video.description && (
          <p className="mt-6 whitespace-pre-wrap leading-relaxed text-gray-300">{video.description}</p>
        )}

        <CommentsSection videoId={video.id} />
      </article>
    </main>
  );
};

export default VideoDetails;
