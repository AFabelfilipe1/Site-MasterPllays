
import React, { useEffect, useMemo, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import CommentsSection from './CommentsSection';
import { Link } from 'react-router-dom';
import { Video } from '../types';

interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
  playlistVideos?: Video[];
}

const VideoModal: React.FC<VideoModalProps> = ({
  video,
  isOpen,
  onClose,
  playlistVideos = [],
}) => {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(video);
  const [autoPlay, setAutoPlay] = useState(true);

  // Sincroniza o vídeo quando o modal recebe uma nova seleção.
  useEffect(() => {
    setCurrentVideo(video);
  }, [video]);

  // Mantém a ordem original da playlist, sem depender da pesquisa ou dos filtros.
  const playbackQueue = useMemo(() => {
    if (!video) return [];

    if (playlistVideos.length === 0) {
      return [video];
    }

    const selectedIndex = playlistVideos.findIndex(
      (item) => item.id === video.id
    );

    if (selectedIndex === -1) {
      return [video, ...playlistVideos];
    }

    return playlistVideos;
  }, [video, playlistVideos]);

  const currentIndex = playbackQueue.findIndex(
    (item) => item.id === currentVideo?.id
  );

  const hasPlaylist = playlistVideos.length > 0;
  const hasPrevious = hasPlaylist && currentIndex > 0;
  const hasNext =
    hasPlaylist &&
    currentIndex >= 0 &&
    currentIndex < playbackQueue.length - 1;

  const nextVideo = hasNext ? playbackQueue[currentIndex + 1] : null;

  const handlePreviousVideo = () => {
    if (!hasPrevious) return;

    setCurrentVideo(playbackQueue[currentIndex - 1]);
  };

  const handleNextVideo = () => {
    if (!hasNext) return;

    setCurrentVideo(playbackQueue[currentIndex + 1]);
  };

  const handleVideoEnded = () => {
    if (autoPlay && hasNext) {
      handleNextVideo();
    }
  };

  if (!isOpen || !currentVideo) return null;

  const youtubeId = currentVideo.youtubeId;

  const videoUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-y-auto rounded-3xl border border-white/10 bg-[#111114] p-4 text-white shadow-2xl shadow-black/50 md:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-2xl text-white transition hover:border-red-500/40 hover:bg-red-600"
          aria-label="Fechar vídeo"
        >
          &times;
        </button>

        {/* Título */}
        <div className="mb-4 pr-12">
          <h2 className="text-xl font-bold md:text-2xl">
            {currentVideo.title}
          </h2>

          {hasPlaylist && currentIndex >= 0 && (
            <p className="mt-1 text-sm text-gray-400">
              Vídeo {currentIndex + 1} de {playbackQueue.length}
            </p>
          )}
        </div>

        {/* Player */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          {youtubeId ? (
            <VideoPlayer
              key={currentVideo.id}
              videoUrl={videoUrl}
              onEnded={handleVideoEnded}
            />
          ) : (
            <div className="flex aspect-video items-center justify-center p-6 text-center">
              <div>
                <p className="text-lg font-semibold">
                  Vídeo indisponível
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Este vídeo ainda não possui um ID válido do YouTube.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="mt-5">
          {currentVideo.description && (
            <p className="mb-4 text-sm leading-relaxed text-gray-300">
              {currentVideo.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 text-xs text-gray-300 sm:text-sm">
            {currentVideo.category && (
              <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-red-200">Categoria: {currentVideo.category}</span>
            )}

            {currentVideo.duration && (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">Duração: {currentVideo.duration}</span>
            )}

            {currentVideo.views && (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">Visualizações: {currentVideo.views}</span>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Link
            to={`/video/${encodeURIComponent(currentVideo.id)}`}
            onClick={onClose}
            className="text-sm font-semibold text-red-300 transition hover:text-white"
          >
            Abrir página deste vídeo →
          </Link>
        </div>

        {/* Comentários compartilhados com a página individual do vídeo */}
        <CommentsSection videoId={currentVideo.id} />

        {/* Controles da playlist */}
        {hasPlaylist && (
          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-lg font-semibold">
                Reprodução da playlist
              </h3>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={autoPlay}
                  onChange={(event) => setAutoPlay(event.target.checked)}
                  className="h-4 w-4 accent-red-500"
                />
                Reproduzir próximo automaticamente
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handlePreviousVideo}
                disabled={!hasPrevious}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 font-medium transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Anterior
              </button>

              <button
                type="button"
                onClick={handleNextVideo}
                disabled={!hasNext}
                className="rounded-full bg-red-600 px-5 py-2.5 font-medium transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Próximo
              </button>
            </div>

            {/* Prévia do próximo vídeo */}
            <div className="mt-5">
              {nextVideo ? (
                <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
                  <img
                    src={nextVideo.thumbnail}
                    alt={`Miniatura de ${nextVideo.title}`}
                    className="h-20 w-32 rounded-xl object-cover"
                  />

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-300">
                      Próximo vídeo
                    </p>

                    <p className="mt-1 line-clamp-2 font-medium">
                      {nextVideo.title}
                    </p>

                    {nextVideo.duration && (
                      <p className="mt-1 text-xs text-gray-400">
                        {nextVideo.duration}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm text-gray-400">
                  Você chegou ao último vídeo desta playlist.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
