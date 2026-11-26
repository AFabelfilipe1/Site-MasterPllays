// src/pages/Clips.tsx
import React, { useMemo, useState } from 'react';

type ClipCategory = 'Minecraft' | 'Games' | 'Momentos engraçados' | 'Outros';

interface LiveClip {
  id: string;
  title: string;
  description?: string;
  creator: string;
  game: string;
  category: ClipCategory;
  thumbnail: string;
  videoUrl: string;
  embedUrl?: string;
  views: number;
  createdAt: string; // Formato: YYYY-MM-DD
  duration: string;
}

/**
 * Adicione seus clipes nesta lista.
 *
 * Exemplo:
 * {
 *   id: 'clip-001',
 *   title: 'Meu melhor momento na live!',
 *   description: 'Um momento especial durante a transmissão.',
 *   creator: 'MasterPllays',
 *   game: 'Minecraft',
 *   category: 'Minecraft',
 *   thumbnail: 'https://URL-DA-MINIATURA',
 *   videoUrl: 'https://www.twitch.tv/...',
 *   embedUrl: 'https://clips.twitch.tv/embed?clip=SLUG&parent=SEU-DOMINIO',
 *   views: 120,
 *   createdAt: '2026-11-24',
 *   duration: '0:32',
 * }
 */
const CLIPS: LiveClip[] = [];

const CATEGORIES: Array<'Todos' | ClipCategory> = [
  'Todos',
  'Minecraft',
  'Games',
  'Momentos engraçados',
  'Outros',
];

type SortOption = 'recentes' | 'populares' | 'antigos';

const formatViews = (views: number): string =>
  new Intl.NumberFormat('pt-BR', {
    notation: views >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(views);

const formatDate = (date: string): string => {
  const parsedDate = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return date;

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
};

const Clips: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'Todos' | ClipCategory>('Todos');
  const [sort, setSort] = useState<SortOption>('recentes');
  const [selectedClip, setSelectedClip] = useState<LiveClip | null>(null);

  const filteredClips = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR');

    const result = CLIPS.filter((clip) => {
      const matchesCategory = category === 'Todos' || clip.category === category;
      const searchableText = [
        clip.title,
        clip.description ?? '',
        clip.creator,
        clip.game,
      ].join(' ').toLocaleLowerCase('pt-BR');

      return matchesCategory && searchableText.includes(normalizedSearch);
    });

    return [...result].sort((a, b) => {
      if (sort === 'populares') return b.views - a.views;
      if (sort === 'antigos') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [search, category, sort]);

  const closePlayer = () => setSelectedClip(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#09090b] via-[#111114] to-[#09090b] pb-20 pt-28 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <header className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">
              Melhores momentos das transmissões
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Clipes de <span className="text-red-500">Lives</span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Reviva os melhores momentos das lives do MasterPllays:
            jogadas incríveis, momentos engraçados e acontecimentos
            que merecem ser assistidos novamente.
          </p>
        </header>

        {/* Resumo */}
        <section
          aria-label="Resumo dos clipes"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <p className="text-sm text-gray-400">Clipes publicados</p>
            <p className="mt-1 text-3xl font-bold text-white">{CLIPS.length}</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <p className="text-sm text-gray-400">Categorias</p>
            <p className="mt-1 text-3xl font-bold text-white">
              {new Set(CLIPS.map((clip) => clip.category)).size}
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <p className="text-sm text-gray-400">Visualizações dos clipes</p>
            <p className="mt-1 text-3xl font-bold text-red-500">
              {formatViews(CLIPS.reduce((total, clip) => total + clip.views, 0))}
            </p>
          </div>
        </section>

        {/* Busca e filtros */}
        <section className="mb-8 space-y-5" aria-label="Filtros de clipes">
          <div className="flex flex-col gap-3 md:flex-row">
            <label className="relative block flex-1">
              <span className="sr-only">Pesquisar clipes</span>
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <path d="m16 16 4 4" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Pesquisar por título, jogo ou criador..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-500 focus:border-red-500"
              />
            </label>

            <label className="md:w-52">
              <span className="sr-only">Ordenar clipes</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="w-full rounded-xl border border-white/10 bg-[#0b0b0e] px-4 py-3 text-white outline-none focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
              >
                <option value="recentes">Mais recentes</option>
                <option value="populares">Mais populares</option>
                <option value="antigos">Mais antigos</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((item) => {
              const active = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? 'border-red-500 bg-red-600 text-white'
                      : 'border-white/10 bg-white/5 text-gray-300 hover:border-red-500/50 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </section>

        {/* Lista de clipes */}
        <section aria-live="polite">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-white">Biblioteca de clipes</h2>
            <span className="text-sm text-gray-500">
              {filteredClips.length} {filteredClips.length === 1 ? 'clipe' : 'clipes'}
            </span>
          </div>

          {filteredClips.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredClips.map((clip) => (
                <article
                  key={clip.id}
                  className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111114] transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-950/20"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedClip(clip)}
                    className="relative block aspect-video w-full overflow-hidden bg-black text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500"
                    aria-label={`Assistir ao clipe: ${clip.title}`}
                  >
                    <img
                      src={clip.thumbnail}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/40">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition group-hover:scale-110">
                        <svg className="ml-1 h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white">
                      {clip.duration}
                    </span>
                    <span className="absolute left-3 top-3 rounded-full bg-red-600/90 px-3 py-1 text-xs font-bold text-white">
                      {clip.category}
                    </span>
                  </button>

                  <div className="p-5">
                    <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white transition group-hover:text-red-400">
                      {clip.title}
                    </h3>
                    {clip.description && (
                      <p className="mb-3 line-clamp-2 text-sm text-gray-400">
                        {clip.description}
                      </p>
                    )}
                    <p className="mb-4 text-sm text-gray-400">
                      {clip.game} <span className="px-1 text-gray-600">•</span> {clip.creator}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs text-gray-500">
                      <span>{formatViews(clip.views)} visualizações</span>
                      <time dateTime={clip.createdAt}>{formatDate(clip.createdAt)}</time>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-16 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-3xl">
                {CLIPS.length === 0 ? '🎬' : '🔎'}
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                {CLIPS.length === 0
                  ? 'Os clipes serão publicados em breve!'
                  : 'Nenhum clipe encontrado'}
              </h3>
              <p className="mx-auto max-w-lg text-sm leading-relaxed text-gray-400">
                {CLIPS.length === 0
                  ? 'Esta biblioteca está pronta para receber os melhores momentos das transmissões do MasterPllays. Adicione os clipes à lista CLIPS para exibi-los aqui.'
                  : 'Tente pesquisar por outro termo ou selecionar uma categoria diferente.'}
              </p>
              {(search || category !== 'Todos') && CLIPS.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setCategory('Todos');
                  }}
                  className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Player de clipe */}
      {selectedClip && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clip-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePlayer();
          }}
        >
          <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#111114] shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <h2 id="clip-modal-title" className="truncate font-bold text-white">
                  {selectedClip.title}
                </h2>
                <p className="text-sm text-gray-400">{selectedClip.creator}</p>
              </div>
              <button
                type="button"
                onClick={closePlayer}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-red-600"
                aria-label="Fechar clipe"
              >
                ×
              </button>
            </div>

            <div className="aspect-video bg-black">
              {selectedClip.embedUrl ? (
                <iframe
                  key={selectedClip.id}
                  src={selectedClip.embedUrl}
                  title={selectedClip.title}
                  className="h-full w-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                  <p className="text-gray-300">
                    O player incorporado ainda não foi configurado para este clipe.
                  </p>
                  <a
                    href={selectedClip.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700"
                  >
                    Assistir na plataforma original
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Clips;
