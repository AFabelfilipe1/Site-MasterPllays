import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import VideoModal from '../components/VideoModal';
import type { Video } from '../types';
import { isRecentlyUploaded, VIDEOS } from '../types/data';

interface CarouselProps {
  videos: Video[];
  title: string;
  subtitle?: string;
  onVideoClick: (video: Video) => void;
}

interface CategoryCardProps {
  title: string;
  description: string;
  category: string;
  icon: string;
  color: 'blue' | 'pink';
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

const VideoCarousel: React.FC<CarouselProps> = ({
  videos,
  title,
  subtitle,
  onVideoClick,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = useCallback(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    setCanScrollLeft(carousel.scrollLeft > 1);
    setCanScrollRight(maxScrollLeft > 1 && carousel.scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    checkScrollButtons();

    const handleScroll = () => checkScrollButtons();
    const resizeObserver = new ResizeObserver(checkScrollButtons);

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    resizeObserver.observe(carousel);

    window.addEventListener('resize', checkScrollButtons);

    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, [checkScrollButtons, videos.length]);

  const scroll = (direction: 'left' | 'right') => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  };

  if (videos.length === 0) return null;

  return (
    <section className="mb-16" aria-label={title}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
            {title}
          </h2>
          {subtitle && <p className="text-sm text-gray-400 md:text-base">{subtitle}</p>}
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="rounded-full bg-red-600 p-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label={`Rolar ${title} para a esquerda`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="rounded-full bg-red-600 p-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label={`Rolar ${title} para a direita`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => onVideoClick(video)}
            className="group w-64 flex-shrink-0 cursor-pointer text-left transition-transform duration-300 hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 md:w-72"
            aria-label={`Assistir: ${video.title}`}
          >
            <div className="relative mb-3 aspect-video overflow-hidden rounded-xl bg-gray-900 shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
              <img
                src={video.thumbnail}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
                  <svg className="ml-1 h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>

              {video.duration && (
                <span className="absolute bottom-3 right-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
                  {video.duration}
                </span>
              )}

              {isRecentlyUploaded(video.uploadDate) && (
                <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  ✨ NOVO
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="line-clamp-2 text-sm font-bold text-white transition-colors group-hover:text-red-400">
                {video.title}
              </h3>

              {video.creator && (
                <p className="text-xs font-medium text-gray-400">{video.creator}</p>
              )}

              {video.views !== undefined && video.views !== null && (
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  <span aria-hidden="true">👁️</span>
                  <span>{video.views} visualizações</span>
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  category,
  icon,
  color,
  videos,
  onVideoClick,
}) => {
  const isBlue = color === 'blue';
  const borderColor = isBlue ? 'border-blue-500/30 hover:border-blue-500/60' : 'border-pink-500/30 hover:border-pink-500/60';
  const background = isBlue ? 'from-blue-900/20 to-purple-900/20' : 'from-pink-900/20 to-rose-900/20';
  const accent = isBlue ? 'text-blue-400 hover:text-blue-300' : 'text-pink-400 hover:text-pink-300';

  return (
    <section className={`rounded-2xl border bg-gradient-to-br ${background} ${borderColor} p-6 transition-all duration-300 md:p-8`}>
      <div className="mb-4 flex items-center gap-3">
        <span className="text-4xl" aria-hidden="true">{icon}</span>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>

      <p className="mb-6 text-gray-400">{description}</p>

      {videos.length > 0 ? (
        <div className="mb-6 grid grid-cols-2 gap-3">
          {videos.slice(0, 4).map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => onVideoClick(video)}
              className="group h-24 overflow-hidden rounded-lg bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label={`Assistir: ${video.title}`}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </button>
          ))}
        </div>
      ) : (
        <p className="mb-6 text-sm text-gray-500">
          Novos conteúdos desta categoria serão adicionados em breve.
        </p>
      )}

      <Link
        to={`/videos?category=${encodeURIComponent(category)}`}
        className={`inline-flex items-center gap-2 font-semibold transition-colors ${accent}`}
      >
        Ver conteúdos
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </section>
  );
};

const Home: React.FC = () => {
  const { user } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // O vídeo em destaque é derivado diretamente dos dados, sem estado ou efeito extra.
  const featuredVideo = VIDEOS.find((video) => video.isFeatured) ?? VIDEOS[0];

  const programmingVideos = VIDEOS.filter((video) => video.category === 'Programação');
  const designVideos = VIDEOS.filter((video) => video.category === 'Design');
  const aiVideos = VIDEOS.filter((video) => video.category === 'IA');
  const otherVideos = VIDEOS.filter((video) =>
    ['Fotografia', 'Música', 'Viagem', 'Games'].includes(video.category)
  );

  const openVideo = (video: Video) => setSelectedVideo(video);
  const closeVideo = () => setSelectedVideo(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Seção principal */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-20">
        <div className="absolute inset-0" aria-hidden="true">
          {featuredVideo?.thumbnail && (
            <img
              src={featuredVideo.thumbnail}
              alt=""
              className="h-full w-full object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-red-500/5 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-block rounded-full border border-red-600/50 bg-red-600/20 px-4 py-2 backdrop-blur-sm">
              <p className="text-sm font-bold text-red-400">
                🎮 GAMES, VÍDEOS E CRIATIVIDADE
              </p>
            </div>

            <h1 className="mb-6 text-5xl font-black leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Master
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent">
                Pllays
              </span>
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl md:text-2xl">
              Um espaço para acompanhar gameplays, vídeos, transmissões e conteúdos
              sobre o universo dos games e da criatividade.
            </p>

            <div className="mb-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/videos"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-red-700 hover:to-red-800 hover:shadow-2xl"
              >
                📺 Explorar vídeos
              </Link>

              {!user ? (
                <Link
                  to="/auth"
                  className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-center text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/40"
                >
                  Criar conta / Entrar
                </Link>
              ) : (
                <Link
                  to="/videos"
                  className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-center text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                >
                  Ver biblioteca
                </Link>
              )}
            </div>

            <div className="inline-flex rounded-lg border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">
              <p className="text-gray-300">
                <span className="font-bold text-red-500">{VIDEOS.length}</span>
                {' '}vídeos cadastrados na biblioteca
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            document.getElementById('conteudos')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-400 transition-colors hover:text-white"
          aria-label="Ir para os conteúdos"
        >
          <span className="text-sm">Explore os conteúdos</span>
          <svg className="h-6 w-6 animate-bounce text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </section>

      {/* Conteúdos */}
      <main id="conteudos" className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="pt-16">
          <VideoCarousel
            videos={VIDEOS.slice(0, 8)}
            title="🎬 Biblioteca de vídeos"
            subtitle="Explore os conteúdos disponíveis no MasterPllays."
            onVideoClick={openVideo}
          />
        </div>

        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          <CategoryCard
            title="Programação"
            description="Conteúdos sobre tecnologia, desenvolvimento e programação."
            category="Programação"
            icon="💻"
            color="blue"
            videos={programmingVideos}
            onVideoClick={openVideo}
          />

          <CategoryCard
            title="Design & Criatividade"
            description="Explore conteúdos de design, ferramentas e criatividade."
            category="Design"
            icon="🎨"
            color="pink"
            videos={designVideos}
            onVideoClick={openVideo}
          />
        </div>

        <VideoCarousel
          videos={aiVideos.slice(0, 8)}
          title="🤖 Inteligência Artificial"
          subtitle="Conteúdos sobre ferramentas e novidades de IA."
          onVideoClick={openVideo}
        />

        <VideoCarousel
          videos={otherVideos.slice(0, 8)}
          title="✨ Explore mais categorias"
          subtitle="Descubra outros conteúdos da biblioteca."
          onVideoClick={openVideo}
        />

        {!user && (
          <section className="relative mb-20 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" aria-hidden="true" />

            <div className="relative z-10 px-6 py-16 text-center sm:px-12 lg:px-16 lg:py-20">
              <h2 className="mb-4 text-3xl font-black text-white md:text-5xl">
                Faça parte do MasterPllays
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-red-100 md:text-xl">
                Crie sua conta para acessar os recursos disponíveis e acompanhar
                os conteúdos da plataforma.
              </p>

              <Link
                to="/auth"
                className="inline-flex rounded-xl bg-white px-10 py-4 text-lg font-bold text-red-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100"
              >
                Criar conta ou entrar
              </Link>
            </div>
          </section>
        )}

        <section className="mb-10">
          <h2 className="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
            O que você encontra no MasterPllays?
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: '🎮',
                title: 'Universo dos games',
                description: 'Gameplays e conteúdos relacionados aos jogos.',
              },
              {
                icon: '🎬',
                title: 'Vídeos',
                description: 'Uma biblioteca para encontrar e acompanhar conteúdos.',
              },
              {
                icon: '🔴',
                title: 'Transmissões',
                description: 'Acompanhe as atividades e transmissões do criador.',
              },
              {
                icon: '🌐',
                title: 'Comunidade',
                description: 'Um espaço para reunir conteúdos e experiências.',
              },
            ].map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-red-500/50 hover:bg-red-950/10"
              >
                <p className="mb-3 text-4xl" aria-hidden="true">{feature.icon}</p>
                <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <VideoModal
        video={selectedVideo}
        isOpen={selectedVideo !== null}
        onClose={closeVideo}
      />
    </div>
  );
};

export default Home;
