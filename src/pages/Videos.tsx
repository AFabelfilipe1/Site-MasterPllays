// src/pages/Videos.tsx
import React, { useState, useMemo } from 'react';
import VideoModal from '../components/VideoModal';
import { Video, Playlist } from '../types';
import { VIDEOS, PLAYLISTS, VIDEO_CATEGORIES } from '../types/data';

const Videos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [expandedPlaylists, setExpandedPlaylists] = useState<Set<string>>(new Set());

  const togglePlaylistExpanded = (playlistId: string) => {
    const newSet = new Set(expandedPlaylists);
    if (newSet.has(playlistId)) {
      newSet.delete(playlistId);
    } else {
      newSet.add(playlistId);
    }
    setExpandedPlaylists(newSet);
  };

  const filteredPlaylists = useMemo(() => {
    let playlists = PLAYLISTS;

    if (selectedCategory !== 'Todos') {
      playlists = playlists.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      playlists = playlists.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return playlists;
  }, [searchTerm, selectedCategory]);

  const getVideosByPlaylist = (videoIds: string[]): Video[] => {
    return videoIds
      .map(id => VIDEOS.find(v => v.id === id))
      .filter((v): v is Video => v !== undefined);
  };

  const VideoCard: React.FC<{ video: Video }> = ({ video }) => (
    <div
      className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-300"
      onClick={() => setSelectedVideo(video)}
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>

        {video.isNew && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
            NOVO
          </div>
        )}
      </div>

      <div className="p-3">
        <h4 className="text-white font-semibold text-sm group-hover:text-red-400 transition-colors duration-200 line-clamp-2 mb-1">
          {video.title}
        </h4>
        <div className="flex items-center text-gray-400 text-xs space-x-2">
          <span>{video.views} visualizações</span>
          <span>•</span>
          <span>{video.duration}</span>
        </div>
      </div>
    </div>
  );

  const PlaylistCard: React.FC<{ playlist: Playlist }> = ({ playlist }) => {
    const isExpanded = expandedPlaylists.has(playlist.id);
    const videos = getVideosByPlaylist(playlist.videoIds);

    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-300 mb-4">
        <div
          className="cursor-pointer p-4 flex items-start gap-4"
          onClick={() => togglePlaylistExpanded(playlist.id)}
        >
          <img
            src={playlist.thumbnail}
            alt={playlist.name}
            className="w-24 h-24 rounded object-cover flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg hover:text-red-400 transition-colors">
                  {playlist.name}
                </h3>
                {playlist.isNew && (
                  <span className="inline-block bg-red-600 text-white text-xs px-2 py-0.5 rounded font-semibold mt-1">
                    NOVO
                  </span>
                )}
              </div>
              <svg
                className={`w-6 h-6 text-red-500 flex-shrink-0 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>

            <p className="text-gray-300 text-sm mt-2 line-clamp-2">{playlist.description}</p>

            <div className="flex items-center text-gray-400 text-xs mt-3 space-x-3">
              <span>{playlist.videoCount} vídeo{playlist.videoCount !== 1 ? 's' : ''}</span>
              {playlist.creator && (
                <>
                  <span>•</span>
                  <span>{playlist.creator}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {isExpanded && videos.length > 0 && (
          <div className="border-t border-gray-700 bg-gray-900/50 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const categoriesWithPlaylists = useMemo(() => {
    const categories = selectedCategory === 'Todos' 
      ? VIDEO_CATEGORIES.filter(cat => cat !== 'Todos')
      : [selectedCategory];

    return categories.map(cat => ({
      category: cat,
      playlists: filteredPlaylists.filter(p => p.category === cat)
    })).filter(item => item.playlists.length > 0);
  }, [filteredPlaylists, selectedCategory]);

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Biblioteca de Vídeos</h1>
          <p className="text-gray-400">Explore nossas coleções organizadas em playlists temáticas</p>
        </div>

        {/* Filtros */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar playlists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="w-full lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {VIDEO_CATEGORIES.map((category) => (
                  <option key={category} value={category} className="bg-gray-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        {categoriesWithPlaylists.length > 0 ? (
          <div className="space-y-8">
            {categoriesWithPlaylists.map(({ category, playlists }) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-8 bg-red-600 rounded" />
                  {category}
                </h2>
                <div className="space-y-4">
                  {playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">Nenhuma playlist encontrada</h3>
            <p className="text-gray-400">Tente ajustar os filtros de busca ou categoria.</p>
          </div>
        )}
      </div>

      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};

export default Videos;