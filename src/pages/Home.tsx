// src/pages/Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import VideoModal from '../components/VideoModal';
import { Video } from '../types';
import { VIDEOS } from '../types/data';

interface CarouselProps {
  videos: Video[];
  title: string;
  subtitle?: string;
  onVideoClick?: (video: Video) => void;
}

const VideoCarousel: React.FC<CarouselProps> = ({ videos, title, subtitle, onVideoClick }) => {
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
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h2>
          {subtitle && <p className="text-gray-400 text-lg">{subtitle}</p>}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform hover:scale-110`}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform hover:scale-110`}
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
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex-shrink-0 w-72 group cursor-pointer transform transition-all duration-300 hover:-translate-y-4"
            onClick={() => onVideoClick?.(video)}
          >
            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden mb-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-semibold">
                {video.duration}
              </div>

              {video.isNew && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                  ✨ NOVO
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-white font-bold text-sm group-hover:text-red-400 transition-colors duration-200 line-clamp-2">
                {video.title}
              </h3>
              {video.creator && (
                <p className="text-gray-400 text-xs font-medium">{video.creator}</p>
              )}
              {video.views && (
                <p className="text-gray-500 text-xs flex items-center space-x-1">
                  <span>👁️</span>
                  <span>{video.views} visualizações</span>
                </p>
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
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const featured = VIDEOS.find(video => video.isFeatured) || VIDEOS[0];
    setFeaturedVideo(featured);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-950/20 to-black/80 z-0" />
        
        <div className="absolute inset-0">
          <img
            src={featuredVideo?.thumbnail || 'https://images.unsplash.com/photo-1489599735734-79b4ba6a1403?w=1920&h=1080&fit=crop'}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Heading with gradient */}
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-red-600/20 border border-red-600/50 rounded-full mb-4 backdrop-blur-sm">
                <p className="text-red-400 text-sm font-bold">🎬 BEM-VINDO AO STREAMING PREMIUM</p>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
                Master<span className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-transparent bg-clip-text">Pllays</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                Acesso ilimitado aos melhores tutoriais, cursos e conteúdo premium. Tutores experientes, vídeos exclusivos e comunidade ativa em um só lugar.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10 max-w-xl">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4">
                <p className="text-2xl font-bold text-red-500">500+</p>
                <p className="text-gray-400 text-sm">Vídeos</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4">
                <p className="text-2xl font-bold text-red-500">50K+</p>
                <p className="text-gray-400 text-sm">Usuários</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4">
                <p className="text-2xl font-bold text-red-500">100%</p>
                <p className="text-gray-400 text-sm">HD Quality</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {!user ? (
                <>
                  <Link
                    to="/auth"
                    className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>🚀 Começar Agora</span>
                  </Link>
                  <Link
                    to="/planos"
                    className="group bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 backdrop-blur-sm hover:border-white/40 transform hover:scale-105"
                  >
                    Ver Planos
                  </Link>
                </>
              ) : (
                <Link
                  to="/videos"
                  className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>📺 Explorar Conteúdo</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-400 text-sm">Deslize para explorar</p>
            <svg className="w-6 h-6 text-red-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="relative z-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Continuar Assistindo */}
        {user && (
          <div className="mb-20">
            <VideoCarousel
              videos={VIDEOS.slice(0, 6)}
              title="📖 Continuar Assistindo"
              subtitle="Retome de onde parou"
              onVideoClick={setSelectedVideo}
            />
          </div>
        )}

        {/* Em Alta */}
        <div className="mb-20">
          <VideoCarousel
            videos={VIDEOS.filter(v => v.isNew).slice(0, 8)}
            title="🔥 Em Alta Agora"
            subtitle="Conteúdo mais assistido agora"
            onVideoClick={setSelectedVideo}
          />
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Programação */}
          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-2xl p-8 hover:border-blue-500/60 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-4xl">💻</span>
              <h3 className="text-2xl font-bold text-white">Programação</h3>
            </div>
            <p className="text-gray-400 mb-6">Aprenda as últimas tecnologias e frameworks</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {VIDEOS.filter(v => v.category === 'Programação').slice(0, 4).map(video => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="h-20 bg-blue-900/30 rounded-lg overflow-hidden cursor-pointer group hover:bg-blue-900/50 transition-all"
                >
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
            <Link to="/videos?category=Programação" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-2">
              <span>Ver Mais</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Design */}
          <div className="bg-gradient-to-br from-pink-900/20 to-rose-900/20 border border-pink-500/30 rounded-2xl p-8 hover:border-pink-500/60 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-4xl">🎨</span>
              <h3 className="text-2xl font-bold text-white">Design & Criatividade</h3>
            </div>
            <p className="text-gray-400 mb-6">Domine UI/UX, Figma e design moderno</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {VIDEOS.filter(v => v.category === 'Design').slice(0, 4).map(video => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="h-20 bg-pink-900/30 rounded-lg overflow-hidden cursor-pointer group hover:bg-pink-900/50 transition-all"
                >
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
            <Link to="/videos?category=Design" className="text-pink-400 hover:text-pink-300 font-semibold flex items-center space-x-2">
              <span>Ver Mais</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* IA */}
        <div className="mb-20">
          <VideoCarousel
            videos={VIDEOS.filter(v => v.category === 'IA').slice(0, 8)}
            title="🤖 Inteligência Artificial"
            subtitle="O futuro está aqui"
            onVideoClick={setSelectedVideo}
          />
        </div>

        {/* Mais Categorias */}
        <div className="mb-20">
          <VideoCarousel
            videos={VIDEOS.filter(v => ['Fotografia', 'Música', 'Viagem', 'Games'].includes(v.category)).slice(0, 8)}
            title="✨ Explore Mais"
            subtitle="Descobrir novos conteúdos"
            onVideoClick={setSelectedVideo}
          />
        </div>

        {/* CTA Section */}
        {!user && (
          <section className="relative mb-20 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
            
            <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-20 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Pronto para começar sua jornada?
              </h2>
              <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
                Junte-se a mais de 50 mil usuários que já estão aprendendo com nosso conteúdo premium exclusivo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/planos"
                  className="bg-white text-red-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Ver Planos
                </Link>
                <Link
                  to="/auth"
                  className="bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-800 transition-all duration-300 transform hover:scale-105 border border-white/20"
                >
                  Criar Conta Grátis
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Features */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Por que escolher MasterPllays?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎯', title: 'Conteúdo Focado', desc: 'Aulas estruturadas e diretas ao ponto' },
              { icon: '👨‍🏫', title: 'Mestres Experientes', desc: 'Profissionais com anos de experiência' },
              { icon: '📱', title: 'Acesso em Qualquer Lugar', desc: 'Assista no celular, tablet ou PC' },
              { icon: '♾️', title: 'Acesso Ilimitado', desc: 'Sem limite de horas ou vídeos' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-red-500/50 hover:bg-red-950/10 transition-all duration-300 transform hover:-translate-y-2"
              >
                <p className="text-4xl mb-3">{feature.icon}</p>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};

export default Home;