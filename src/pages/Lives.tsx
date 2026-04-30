import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface Live {
  id: string;
  title: string;
  twitchUsername: string;
  category: string;
  description: string;
  scheduledTime?: string;
  isLive: boolean;
  thumbnail: string;
}

const Lives: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedLive, setSelectedLive] = useState<Live | null>(null);

  // Dados das lives
  const lives: Live[] = [
    {
      id: '1',
      title: 'Minecraft Gameplay AO VIVO - Construindo a Base Épica',
      twitchUsername: 'masterpllays',
      category: 'Games',
      description: 'Vem acompanhar o gameplay ao vivo! Vamos continuar construindo a base mais épica do mundo do Minecraft. Chat interativo, desafios propostos pelos viewers e muito mais!',
      isLive: false,
      scheduledTime: '2026-05-01 20:00 BRT',
      thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=225&fit=crop'
    },
    {
      id: '2',
      title: 'Tutorial React com Especialista - Ao Vivo',
      twitchUsername: 'masterpllays',
      category: 'Programação',
      description: 'Sessão ao vivo de programação! Vamos aprender conceitos avançados de React e responder todas as suas dúvidas em tempo real.',
      isLive: false,
      scheduledTime: '2026-05-02 19:00 BRT',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop'
    },
    {
      id: '3',
      title: 'Just Chatting - Conversa com a Comunidade',
      twitchUsername: 'masterpllays',
      category: 'Entretenimento',
      description: 'Bora conversar! Just chatting com a comunidade MasterPllays. Histórias, perguntas, risadas e muita interação!',
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🔴 Lives na Twitch
          </h1>
          <p className="text-gray-300 text-lg">
            Acompanhe as transmissões ao vivo com a comunidade MasterPllays. Games, programação, conversa e muito mais!
          </p>
        </div>

        {/* Status das Lives */}
        <div className="mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            {lives.map((live) => (
              <div
                key={live.id}
                className="relative group cursor-pointer"
                onClick={() => setSelectedLive(live)}
              >
                {/* Card da Live */}
                <div className="relative overflow-hidden rounded-lg">
                  {/* Thumbnail */}
                  <img
                    src={live.thumbnail}
                    alt={live.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Status Badge */}
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-bold flex items-center space-x-1 ${
                      live.isLive ? 'bg-red-600' : 'bg-gray-700'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${live.isLive ? 'bg-white' : 'bg-gray-400'}`}></span>
                    <span>{live.isLive ? 'AO VIVO' : 'AGENDADO'}</span>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-white mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <p className="text-white font-semibold">Ver Live</p>
                    </div>
                  </div>
                </div>

                {/* Informações da Live */}
                <div className="p-4 bg-gray-800">
                  <h3 className="text-white font-bold mb-2 line-clamp-2">{live.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 text-sm font-semibold flex items-center space-x-1">
                      <span>🎮</span>
                      <span>{live.category}</span>
                    </span>
                    {live.isLive && (
                      <span className="animate-pulse text-red-500 text-xs font-bold">● AO VIVO</span>
                    )}
                  </div>
                  {!live.isLive && live.scheduledTime && (
                    <p className="text-gray-400 text-xs mt-2">📅 {live.scheduledTime}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Twitch Player */}
        {selectedLive && (
          <div className="mb-12 bg-black rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">{selectedLive.title}</h2>
              <button
                onClick={() => setSelectedLive(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Embed do Twitch */}
            <div className="bg-black rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '16 / 9' }}>
              <iframe
                src={`https://twitch.tv/embed/${selectedLive.twitchUsername}/chat?parent=afabelfilipe1.github.io`}
                height="600"
                width="100%"
                className="w-full"
                title="Twitch Live"
                frameBorder="0"
              />
            </div>

            {/* Informações */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Canal</p>
                <p className="text-white font-bold">@{selectedLive.twitchUsername}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Categoria</p>
                <p className="text-white font-bold">{selectedLive.category}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Status</p>
                <p className={`font-bold ${selectedLive.isLive ? 'text-red-500' : 'text-yellow-500'}`}>
                  {selectedLive.isLive ? '🔴 AO VIVO' : '⏰ Agendado'}
                </p>
              </div>
            </div>

            {/* Descrição */}
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-white font-bold mb-2">Sobre esta live</h3>
              <p className="text-gray-300">{selectedLive.description}</p>
            </div>

            {/* Botão para acessar no Twitch */}
            <a
              href={`https://twitch.tv/${selectedLive.twitchUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
            >
              Abrir no Twitch →
            </a>
          </div>
        )}

        {/* Seção de Informações */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-8 border border-purple-700/50">
          <h2 className="text-2xl font-bold text-white mb-4">📡 Como Participar das Lives</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 className="text-purple-400 font-bold mb-2">✨ Ao Vivo</h3>
              <p>Clique em uma live com status "AO VIVO" para assistir em tempo real, interagir no chat e participar dos desafios!</p>
            </div>
            <div>
              <h3 className="text-purple-400 font-bold mb-2">📅 Agendadas</h3>
              <p>Veja as próximas transmissões agendadas, adicione à sua agenda e receba notificações quando forem ao vivo!</p>
            </div>
            <div>
              <h3 className="text-purple-400 font-bold mb-2">💬 Comunidade</h3>
              <p>Participe do chat, faça perguntas, vote em enquetes e se conecte com outros fãs da comunidade.</p>
            </div>
            <div>
              <h3 className="text-purple-400 font-bold mb-2">🎁 Recompensas</h3>
              <p>Seguidores regulares podem ganhar pontos de comunidade, badges exclusivas e prêmios surpresa!</p>
            </div>
          </div>
        </div>

        {/* CTA para não logados */}
        {!user && (
          <div className="mt-12 text-center p-8 bg-red-900/20 rounded-lg border border-red-700">
            <h3 className="text-2xl font-bold text-white mb-2">Faça Login para Não Perder Nada!</h3>
            <p className="text-gray-300 mb-6">Crie sua conta para receber notificações das lives e participar da comunidade.</p>
            <button
              onClick={() => navigate('/auth')}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors inline-block"
            >
              Criar Conta Grátis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lives;
