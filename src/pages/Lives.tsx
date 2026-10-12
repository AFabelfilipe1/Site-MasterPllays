import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const twitchChannel = {
  username: 'masterpllays',
  title: 'Canal MasterPllays',
  description: 'Assista às transmissões e aos vídeos publicados no canal oficial.',
  thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=450&fit=crop',
};

export default function Lives() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPlayer, setShowPlayer] = useState(false);
  const parent = window.location.hostname;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pb-12 pt-24">
      <main className="mx-auto max-w-7xl px-4">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-white">Lives na Twitch</h1>
          <p className="text-gray-400">Assista ao canal oficial MasterPllays.</p>
        </header>

        <button
          type="button"
          onClick={() => setShowPlayer(true)}
          className="group w-full max-w-2xl overflow-hidden rounded-xl border border-gray-800 bg-gray-900 text-left transition hover:border-purple-500"
        >
          <img
            src={twitchChannel.thumbnail}
            alt="Prévia do canal MasterPllays na Twitch"
            className="aspect-video w-full object-cover transition group-hover:scale-[1.01]"
          />
          <span className="block p-5">
            <span className="block text-xl font-bold text-white">{twitchChannel.title}</span>
            <span className="mt-2 block text-gray-400">{twitchChannel.description}</span>
            <span className="mt-4 inline-block rounded-lg bg-purple-600 px-5 py-2 font-semibold text-white">
              Abrir transmissão
            </span>
          </span>
        </button>

        {showPlayer && (
          <section className="mt-10 rounded-lg border border-gray-700 bg-black p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-white">{twitchChannel.title}</h2>
              <button
                type="button"
                onClick={() => setShowPlayer(false)}
                className="rounded px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                aria-label="Fechar transmissão"
              >
                Fechar
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
              <iframe
                src={`https://player.twitch.tv/?channel=${twitchChannel.username}&parent=${encodeURIComponent(parent)}&autoplay=false`}
                className="aspect-video w-full rounded-lg bg-gray-900"
                allowFullScreen
                title="Transmissão MasterPllays na Twitch"
              />
              <iframe
                src={`https://www.twitch.tv/embed/${twitchChannel.username}/chat?parent=${encodeURIComponent(parent)}`}
                className="h-96 w-full rounded-lg bg-gray-900 lg:h-auto"
                title="Chat MasterPllays na Twitch"
              />
            </div>

            <a
              href={`https://www.twitch.tv/${twitchChannel.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-lg bg-purple-600 px-5 py-2 font-semibold text-white hover:bg-purple-700"
            >
              Abrir na Twitch
            </a>
          </section>
        )}

        {!user && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="rounded bg-red-600 px-6 py-3 text-white hover:bg-red-700"
            >
              Criar conta
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
