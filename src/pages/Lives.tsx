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

  const lives: Live[] = [
    {
      id: '1',
      title: 'Minecraft Gameplay AO VIVO - Construindo a Base Épica',
      twitchUsername: 'masterpllays',
      category: 'Games',
      description: 'Gameplay ao vivo com a comunidade!',
      isLive: false,
      scheduledTime: '2026-05-01 20:00 BRT',
      thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=225&fit=crop'
    },
    {
      id: '2',
      title: 'Tutorial React ao Vivo',
      twitchUsername: 'masterpllays',
      category: 'Programação',
      description: 'Aprenda React ao vivo!',
      isLive: false,
      scheduledTime: '2026-05-02 19:00 BRT',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop'
    },
    {
      id: '3',
      title: 'Just Chatting - Comunidade',
      twitchUsername: 'masterpllays',
      category: 'Entretenimento',
      description: 'Conversando com a comunidade!',
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">🔴 Lives na Twitch</h1>
          <p className="text-gray-400">Assista e interaja ao vivo</p>
        </div>

        {/* LISTA */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {lives.map((live) => (
            <div
              key={live.id}
              className="cursor-pointer"
              onClick={() => {
                if (live.isLive) setSelectedLive(live);
              }}
            >
              <div className="relative">
                <img
                  src={live.thumbnail}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <div className={`absolute top-2 left-2 px-2 py-1 text-sm rounded ${
                  live.isLive ? 'bg-red-600 text-white' : 'bg-gray-700 text-white'
                }`}>
                  {live.isLive ? 'AO VIVO' : 'AGENDADO'}
                </div>
              </div>

              <div className="mt-2">
                <h3 className="text-white font-bold">{live.title}</h3>
                <p className="text-gray-400 text-sm">{live.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* PLAYER + CHAT */}
        {selectedLive && (
          <div className="bg-black p-6 rounded-lg border border-gray-700">

            {/* TOPO */}
            <div className="flex justify-between mb-4">
              <h2 className="text-white text-xl font-bold">
                {selectedLive.title}
              </h2>

              <button
                onClick={() => setSelectedLive(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* CONTAINER PRINCIPAL */}
            {selectedLive.isLive ? (
              <div className="flex flex-col md:flex-row gap-4">

                {/* ESQUERDA - PLAYER */}
                <div className="md:w-2/3 w-full">
                  <iframe
                    src={`https://player.twitch.tv/?channel=${selectedLive.twitchUsername}&parent=afabelfilipe1.github.io`}
                    height="500"
                    width="100%"
                    allowFullScreen
                    title="Twitch Player"
                  />
                </div>

                {/* DIREITA - CHAT */}
                <div className="md:w-1/3 w-full">
                  <iframe
                    src={`https://www.twitch.tv/embed/${selectedLive.twitchUsername}/chat?parent=afabelfilipe1.github.io`}
                    height="500"
                    width="100%"
                    title="Twitch Chat"
                  />
                </div>

              </div>
            ) : (
              <div className="text-center text-gray-400 p-10">
                ⏰ Live ainda não começou
              </div>
            )}

            {/* DESCRIÇÃO */}
            <div className="mt-4 text-gray-300">
              {selectedLive.description}
            </div>

            {/* BOTÃO */}
            <a
              href={`https://www.twitch.tv/${selectedLive.twitchUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
            >
              Abrir na Twitch
            </a>

          </div>
        )}

        {/* CTA LOGIN */}
        {!user && (
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/auth')}
              className="bg-red-600 px-6 py-3 text-white rounded"
            >
              Criar Conta
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Lives;