import React from 'react';
import VideoPlayer from './VideoPlayer';
import { Video } from '../types';

interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose }) => {
  if (!isOpen || !video) return null;

  // Construir URL do vídeo (usando youtubeId se disponível, senão usar id)
  const youtubeId = video.youtubeId || video.id;
  const videoUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1`;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-red-400 transition-colors"
          aria-label="Fechar vídeo"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Player de vídeo */}
        <div className="w-full bg-black rounded-lg overflow-hidden">
          <VideoPlayer videoUrl={videoUrl} />
        </div>

        {/* Informações do vídeo */}
        <div className="mt-4 text-white">
          <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <span>{video.category}</span>
            <span>•</span>
            <span>{video.views} visualizações</span>
            <span>•</span>
            <span>{video.creator || 'Desconhecido'}</span>
          </div>
          {video.description && (
            <p className="mt-4 text-gray-300 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
