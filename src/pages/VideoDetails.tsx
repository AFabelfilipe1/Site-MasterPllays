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
      <main className="min-h-screen bg-black px-4 pb-16 pt-28 text-white">
        <div className="mx-auto max-w-4xl rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
          <h1 className="text-2xl font-bold">Vídeo não encontrado</h1>
          <p className="mt-3 text-gray-400">Este conteúdo não está disponível na biblioteca atual.</p>
          <Link to="/videos" className="mt-6 inline-flex rounded-lg bg-purple-600 px-5 py-2 font-semibold hover:bg-purple-500">
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
    <main className="min-h-screen bg-black px-4 pb-16 pt-28 text-white">
      <article className="mx-auto max-w-5xl">
        <Link to="/videos" className="mb-5 inline-flex text-sm font-medium text-purple-400 hover:text-purple-300">
          ← Voltar para a biblioteca
        </Link>

        <h1 className="mb-3 text-2xl font-bold sm:text-3xl">{video.title}</h1>
        <div className="mb-5 flex flex-wrap gap-3 text-sm text-gray-400">
          {video.category && <span>{video.category}</span>}
          {video.duration && <span>{video.duration}</span>}
          {video.creator && <span>Por {video.creator}</span>}
          {video.views && <span>{video.views} visualizações</span>}
        </div>

        <div className="overflow-hidden rounded-xl bg-gray-950">
          {video.youtubeId ? (
            <VideoPlayer videoUrl={videoUrl} />
          ) : (
            <div className="flex aspect-video items-center justify-center p-6 text-center text-gray-400">
              Este vídeo ainda não possui um ID válido do YouTube.
            </div>
          )}
        </div>

        {video.description && (
          <p className="mt-5 whitespace-pre-wrap leading-relaxed text-gray-300">{video.description}</p>
        )}

        <CommentsSection videoId={video.id} />
      </article>
    </main>
  );
};

export default VideoDetails;
