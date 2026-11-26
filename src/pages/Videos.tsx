
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import VideoModal from '../components/VideoModal';

import type { Video, Playlist } from '../types';

import {
  isRecentlyUploaded,
  VIDEOS,
  PLAYLISTS,
  VIDEO_CATEGORIES,
} from '../types/data';

// ======================================================
// CONFIGURAÇÃO E INDEXAÇÃO DOS VÍDEOS
// ======================================================

// Índice por ID para evitar buscas repetidas no array.
const VIDEO_BY_ID = new Map<string, Video>(
  VIDEOS.map((video) => [video.id, video])
);

// Recupera os vídeos associados a uma playlist.
function getVideosByPlaylist(videoIds: string[]): Video[] {
  return videoIds
    .map((id) => VIDEO_BY_ID.get(id))
    .filter((video): video is Video => video !== undefined);
}

// Normaliza textos para pesquisas sem diferença de acentos.
function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// ======================================================
// COMPONENTE: CARTÃO DE VÍDEO
// ======================================================

interface VideoCardProps {
  video: Video;
  onSelect: (video: Video) => void;
}

function VideoCard({ video, onSelect }: VideoCardProps) {
  const isNew = isRecentlyUploaded(video.uploadDate);

  return (
    <button
      type="button"
      onClick={() => onSelect(video)}
      aria-label={`Assistir vídeo: ${video.title}`}
      className="group w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#121216] text-left shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-[#18181d] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      {/* Miniatura */}
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        <img
          src={video.thumbnail}
          alt={`Miniatura: ${video.title}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Sobreposição */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity group-hover:opacity-70" />

        {/* Botão visual de reprodução */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/95 text-white shadow-xl shadow-red-950/40 ring-4 ring-white/15">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-1 h-6 w-6"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duração */}
        <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {video.duration}
        </span>

        {/* Identificação de novidade */}
        {isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold tracking-wider text-white">
            NOVO
          </span>
        )}
      </div>

      {/* Informações */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-relaxed text-white transition-colors group-hover:text-red-300">
          {video.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{video.views} visualizações</span>
        </div>
      </div>
    </button>
  );
}

// ======================================================
// COMPONENTE: CARTÃO DE PLAYLIST
// ======================================================

interface PlaylistCardProps {
  playlist: Playlist;
  videos: Video[];
  playlistVideos: Video[];
  isExpanded: boolean;
  onToggle: (playlistId: string) => void;
  onSelectVideo: (video: Video, playlistVideos: Video[]) => void;
}

function PlaylistCard({
  playlist,
  videos,
  playlistVideos,
  isExpanded,
  onToggle,
  onSelectVideo,
}: PlaylistCardProps) {
  const contentId = `playlist-content-${playlist.id}`;

  return (
    <article className="mb-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111114] shadow-lg shadow-black/10 transition-colors hover:border-white/15">

      {/* Cabeçalho expansível */}
      <button
        type="button"
        onClick={() => onToggle(playlist.id)}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className="flex w-full items-start gap-4 p-4 text-left transition-colors hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500 sm:p-5"
      >
        {/* Miniatura da playlist */}
        <img
          src={playlist.thumbnail}
          alt={`Miniatura da playlist ${playlist.name}`}
          loading="lazy"
          decoding="async"
          className="h-20 w-24 shrink-0 rounded-xl border border-white/10 bg-gray-900 object-cover sm:h-24 sm:w-32"
        />

        {/* Informações */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold text-white transition-colors hover:text-red-400 sm:text-lg">
              {playlist.name}
            </h3>

            {/* Indicador de expansão */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={`h-6 w-6 shrink-0 text-red-400 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            >
              <path
                d="m6 9 6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-gray-300">
            {playlist.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span>
              {videos.length} vídeo{videos.length !== 1 ? 's' : ''}
            </span>

            {playlist.creator && (
              <>
                <span aria-hidden="true">•</span>
                <span>{playlist.creator}</span>
              </>
            )}
          </div>
        </div>
      </button>

      {/* Conteúdo expandido */}
      {isExpanded && (
        <div
          id={contentId}
          className="border-t border-white/[0.07] bg-black/20 p-4 sm:p-5"
        >
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onSelect={(selectedVideo) =>
                    onSelectVideo(selectedVideo, playlistVideos)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-400">
                Nenhum vídeo disponível nesta playlist.
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

// ======================================================
// COMPONENTE PRINCIPAL: VIDEOS
// ======================================================

const Videos: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // Vídeo selecionado
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Fila completa da playlist selecionada
  const [selectedPlaylistVideos, setSelectedPlaylistVideos] = useState<
    Video[]
  >([]);

  // Playlists expandidas
  const [expandedPlaylists, setExpandedPlaylists] = useState<Set<string>>(
    () => new Set()
  );

  // ====================================================
  // SELEÇÃO DE VÍDEO E PLAYLIST
  // ====================================================

  const handleSelectVideo = (
    video: Video,
    playlistVideos: Video[]
  ) => {
    setSelectedPlaylistVideos(playlistVideos);
    setSelectedVideo(video);
  };

  // ====================================================
  // CATEGORIA SINCRONIZADA COM A URL
  // ====================================================

  const requestedCategory = searchParams.get('category');

  const selectedCategory =
    requestedCategory &&
    VIDEO_CATEGORIES.includes(
      requestedCategory as (typeof VIDEO_CATEGORIES)[number]
    )
      ? requestedCategory
      : 'Todos';

  const handleCategoryChange = (category: string) => {
    setSearchParams((previousParams) => {
      const nextParams = new URLSearchParams(previousParams);

      if (category === 'Todos') {
        nextParams.delete('category');
      } else {
        nextParams.set('category', category);
      }

      return nextParams;
    });
  };

  // ====================================================
  // EXPANSÃO DE PLAYLISTS
  // ====================================================

  const togglePlaylistExpanded = (playlistId: string) => {
    setExpandedPlaylists((previous) => {
      const updated = new Set(previous);

      if (updated.has(playlistId)) {
        updated.delete(playlistId);
      } else {
        updated.add(playlistId);
      }

      return updated;
    });
  };

  // ====================================================
  // PESQUISA E FILTROS
  // ====================================================

  const filteredPlaylists = useMemo(() => {
    const normalizedTerm = normalizeSearch(searchTerm);

    return PLAYLISTS.flatMap((playlist) => {
      // Filtro de categoria
      if (
        selectedCategory !== 'Todos' &&
        playlist.category !== selectedCategory
      ) {
        return [];
      }

      // Lista completa e ordenada da playlist
      const playlistVideos = getVideosByPlaylist(playlist.videoIds);

      // Pesquisa nas informações da playlist
      const playlistMatches =
        !normalizedTerm ||
        [
          playlist.name,
          playlist.description,
          playlist.category,
          playlist.creator ?? '',
        ].some((value) =>
          normalizeSearch(value).includes(normalizedTerm)
        );

      // Pesquisa nos títulos dos vídeos
      const matchingVideos = !normalizedTerm
        ? playlistVideos
        : playlistVideos.filter((video) =>
            normalizeSearch(video.title).includes(normalizedTerm)
          );

      // Elimina playlists sem correspondência
      if (
        normalizedTerm &&
        !playlistMatches &&
        matchingVideos.length === 0
      ) {
        return [];
      }

      // A exibição pode ser filtrada.
      // A fila completa permanece intacta para o player.
      return [
        {
          playlist,
          videos: playlistMatches
            ? playlistVideos
            : matchingVideos,
          playlistVideos,
        },
      ];
    });
  }, [searchTerm, selectedCategory]);

  // ====================================================
  // ORGANIZAÇÃO POR CATEGORIAS
  // ====================================================

  const categoriesWithPlaylists = useMemo(() => {
    const categories =
      selectedCategory === 'Todos'
        ? VIDEO_CATEGORIES.filter((category) => category !== 'Todos')
        : [selectedCategory];

    return categories
      .map((category) => ({
        category,
        playlists: filteredPlaylists.filter(
          (item) => item.playlist.category === category
        ),
      }))
      .filter((item) => item.playlists.length > 0);
  }, [filteredPlaylists, selectedCategory]);

  // ====================================================
  // RESULTADOS DA BIBLIOTECA
  // ====================================================

  const totalPlaylists = filteredPlaylists.length;

  const totalVideos = filteredPlaylists.reduce(
    (total, item) => total + item.videos.length,
    0
  );

  // ====================================================
  // INTERFACE
  // ====================================================

  return (
    <div className="min-h-screen bg-[#09090b] pb-16 pt-20">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ============================================
            CABEÇALHO
        ============================================ */}

        <header className="mb-8 pt-3 sm:mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
            MasterPllays · Biblioteca
          </p>
          <h1 className="mb-3 text-3xl font-black tracking-tight text-white sm:text-5xl">
            Biblioteca de Vídeos
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
            Explore nossas coleções organizadas em playlists temáticas
            e encontre seus conteúdos favoritos.
          </p>
        </header>

        {/* ============================================
            PESQUISA E FILTROS
        ============================================ */}

        <section
          aria-label="Pesquisa e filtros da biblioteca"
          className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 shadow-xl shadow-black/10 backdrop-blur sm:p-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row">

            {/* Pesquisa */}
            <div className="min-w-0 flex-1">
              <label
                htmlFor="video-search"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Pesquisar vídeos e playlists
              </label>

              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" strokeWidth={2} />
                  <path
                    d="m16 16 4 4"
                    strokeLinecap="round"
                    strokeWidth={2}
                  />
                </svg>

                <input
                  id="video-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Digite o nome de um vídeo ou playlist..."
                  autoComplete="off"
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b0e] py-3 pl-10 pr-4 text-white placeholder-gray-500 transition focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>
            </div>

            {/* Categoria */}
            <div className="w-full lg:w-64">
              <label
                htmlFor="video-category"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Filtrar por categoria
              </label>

              <select
                id="video-category"
                value={selectedCategory}
                onChange={(event) =>
                  handleCategoryChange(event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#0b0b0e] px-4 py-3 text-white transition focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              >
                {VIDEO_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Informações dos resultados */}
          <div
            className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4"
            aria-live="polite"
          >
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span>
                <strong className="text-white">{totalPlaylists}</strong>
                {' '}playlists
              </span>

              <span>
                <strong className="text-white">{totalVideos}</strong>
                {' '}vídeos encontrados
              </span>
            </div>

            {(searchTerm || selectedCategory !== 'Todos') && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  handleCategoryChange('Todos');
                }}
                className="rounded-full px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </section>

        {/* ============================================
            CONTEÚDO DA BIBLIOTECA
        ============================================ */}

        {categoriesWithPlaylists.length > 0 ? (
          <div className="space-y-10">

            {categoriesWithPlaylists.map(
              ({ category, playlists }) => (
                <section key={category} aria-label={category}>

                  {/* Título da categoria */}
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="h-8 w-1 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]"
                      aria-hidden="true"
                    />

                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                      {category}
                    </h2>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-gray-400">
                      {playlists.length}
                    </span>
                  </div>

                  {/* Playlists */}
                  <div className="space-y-4">
                    {playlists.map(
                      ({ playlist, videos, playlistVideos }) => (
                        <PlaylistCard
                          key={playlist.id}
                          playlist={playlist}
                          videos={videos}
                          playlistVideos={playlistVideos}
                          isExpanded={expandedPlaylists.has(playlist.id)}
                          onToggle={togglePlaylistExpanded}
                          onSelectVideo={handleSelectVideo}
                        />
                      )
                    )}
                  </div>

                </section>
              )
            )}

          </div>
        ) : (

          /* ==========================================
             ESTADO VAZIO
          ========================================== */

          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.025] px-4 py-16 text-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="mx-auto mb-5 h-16 w-16 text-gray-600"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                strokeWidth={1.5}
              />

              <path
                d="m10 9 5 3-5 3z"
                strokeWidth={1.5}
                strokeLinejoin="round"
              />
            </svg>

            <h2 className="mb-2 text-xl font-bold text-white">
              Nenhuma playlist encontrada
            </h2>

            <p className="mx-auto max-w-md text-sm text-gray-400">
              Não encontramos vídeos ou playlists correspondentes
              à sua pesquisa. Tente modificar os filtros.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                handleCategoryChange('Todos');
              }}
              className="mt-6 rounded-full bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Limpar filtros
            </button>
          </section>
        )}

      </main>

      {/* ==============================================
          MODAL DE REPRODUÇÃO
      ============================================== */}

      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        playlistVideos={selectedPlaylistVideos}
        onClose={() => {
          setSelectedVideo(null);
          setSelectedPlaylistVideos([]);
        }}
      />

    </div>
  );
};

export default Videos;
