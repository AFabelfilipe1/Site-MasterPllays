// src/pages/Videos.tsx
import React, { useState, useMemo } from 'react';
import { Video } from '../types';
import { VIDEOS, VIDEO_CATEGORIES } from '../types/data';

const Videos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('recentes');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedVideos = useMemo(() => {
    const filtered = VIDEOS.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (video.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ?? false);
      const matchesCategory = selectedCategory === 'Todos' || video.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recentes':
          return new Date(b.uploadDate || '').getTime() - new Date(a.uploadDate || '').getTime();
        case 'visualizacoes':
          return (parseFloat(b.views?.replace('K', '') || '0') || 0) - (parseFloat(a.views?.replace('K', '') || '0') || 0);
        case 'duracao':
          return (parseInt(b.duration.split(':')[0]) || 0) - (parseInt(a.duration.split(':')[0]) || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const VideoCard: React.FC<{ video: Video; isListView?: boolean }> = ({ video, isListView = false }) => (
    <div className={`group cursor-pointer ${isListView ? 'flex bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700' : ''} transition-all duration-300`}>
      <div className={`relative overflow-hidden bg-gray-800 ${isListView ? 'w-48 flex-shrink-0' : 'aspect-video'} rounded-lg`}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
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

      <div className={`flex-1 p-4 ${isListView ? '' : 'mt-3'}`}>
        <h3 className="text-white font-semibold text-sm group-hover:text-red-400 transition-colors duration-200 line-clamp-2 mb-1">
          {video.title}
        </h3>
        <div className="flex items-center text-gray-400 text-xs space-x-2 mb-2">
          <span>{video.category}</span>
          <span>•</span>
          <span>{video.views} visualizações</span>
          <span>•</span>
          <span>{video.uploadDate ? new Date(video.uploadDate).toLocaleDateString('pt-BR') : 'Data desconhecida'}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {video.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Biblioteca de Vídeos</h1>
          <p className="text-gray-400">Explore nossa coleção completa de conteúdo premium</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">

            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar vídeos, tags, categorias..."
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

            <div className="w-full lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="recentes" className="bg-gray-800">Mais Recentes</option>
                <option value="visualizacoes" className="bg-gray-800">Mais Visualizados</option>
                <option value="duracao" className="bg-gray-800">Maior Duração</option>
              </select>
            </div>

            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
                aria-label="Grid view"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
                aria-label="List view"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            {filteredAndSortedVideos.length} vídeo{filteredAndSortedVideos.length !== 1 ? 's' : ''} encontrado{filteredAndSortedVideos.length !== 1 ? 's' : ''}
            {searchTerm && ` para "${searchTerm}"`}
            {selectedCategory !== 'Todos' && ` em ${selectedCategory}`}
          </p>
        </div>

        {filteredAndSortedVideos.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredAndSortedVideos.map((video) => (
              <VideoCard key={video.id} video={video} isListView={viewMode === 'list'} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">Nenhum vídeo encontrado</h3>
            <p className="text-gray-400">Tente ajustar os filtros de busca ou categoria.</p>
          </div>
        )}

        {filteredAndSortedVideos.length >= 12 && (
          <div className="text-center mt-12">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Carregar Mais Vídeos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;