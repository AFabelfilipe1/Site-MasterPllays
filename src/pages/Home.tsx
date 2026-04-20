// src/pages/Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Video } from '../types';
import { VIDEOS } from '../types/data';

interface CarouselProps {
  videos: Video[];
  title: string;
}

const VideoCarousel: React.FC<CarouselProps> = ({ videos, title }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleScroll = () => checkScrollButtons();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [videos]);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity`}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity`}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex-shrink-0 w-80 group cursor-pointer"
          >
            <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden mb-3">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
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

            <div className="space-y-1">
              <h3 className="text-white font-semibold text-sm group-hover:text-red-400 transition-colors duration-200 line-clamp-2">
                {video.title}
              </h3>
              {video.creator && (
                <p className="text-gray-400 text-xs">{video.creator}</p>
              )}
              {video.views && (
                <p className="text-gray-500 text-xs">{video.views} visualizações</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const { user } = useAuth();
  const [featuredVideo, setFeaturedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const featured = VIDEOS.find(video => video.isFeatured) || VIDEOS[0];
    setFeaturedVideo(featured);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={featuredVideo?.thumbnail || 'https://images.unsplash.com/photo-1489599735734-79b4ba6a1403?w=1920&h=1080&fit=crop'}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Master<span className="text-red-600">Pllays</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Assista aos melhores conteúdos exclusivos. Tutoriais, cursos e entretenimento premium em um só lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {!user ? (
                <>
                  <Link
                    to="/auth"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 text-center"
                  >
                    Começar Agora
                  </Link>
                  <Link
                    to="/planos"
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 backdrop-blur-sm border border-white/20 text-center"
                  >
                    Ver Planos
                  </Link>
                </>
              ) : (
                <Link
                  to="/videos"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 text-center"
                >
                  Explorar Conteúdo
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <main className="relative z-10 -mt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {user && (
          <VideoCarousel
            videos={VIDEOS.slice(0, 6)}
            title="Continuar Assistindo"
          />
        )}

        <VideoCarousel
          videos={VIDEOS.filter(v => v.isNew).slice(0, 8)}
          title="Em Alta Agora"
        />

        <VideoCarousel
          videos={VIDEOS.filter(v => v.category === 'Programação').slice(0, 8)}
          title="Programação"
        />

        <VideoCarousel
          videos={VIDEOS.filter(v => v.category === 'Design').slice(0, 8)}
          title="Design & Criatividade"
        />

        <VideoCarousel
          videos={VIDEOS.filter(v => v.category === 'IA').slice(0, 8)}
          title="Inteligência Artificial"
        />

        <VideoCarousel
          videos={VIDEOS.filter(v => ['Fotografia', 'Música', 'Viagem', 'Games'].includes(v.category)).slice(0, 8)}
          title="Mais Categorias"
        />

        {!user && (
          <section className="mt-20 bg-gradient-to-r from-red-600 to-red-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Pronto para começar?
                </h2>
                <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                  Junte-se a milhares de usuários e tenha acesso ilimitado ao melhor conteúdo.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/planos"
                    className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    Ver Planos
                  </Link>
                  <Link
                    to="/auth"
                    className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-800 transition-colors duration-200"
                  >
                    Criar Conta
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;