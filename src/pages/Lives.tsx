
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const twitchChannel = {
  username: 'masterpllays',
  title: 'Canal MasterPllays',
  description:
    'Assista às transmissões e acompanhe os conteúdos publicados no canal oficial.',
  thumbnail:
    'https://images.unsplash.com/photo-1556438064-2d7646166914?w=1200&h=675&fit=crop',
};

export default function Lives() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showPlayer, setShowPlayer] = useState(false);

  // Domínio utilizado pela integração da Twitch.
  const parent = window.location.hostname;

  // URLs oficiais da Twitch.
  const playerUrl = new URL(
    'https://player.twitch.tv/'
  );

  playerUrl.searchParams.set(
    'channel',
    twitchChannel.username
  );
  playerUrl.searchParams.set('parent', parent);
  playerUrl.searchParams.set('autoplay', 'false');
  playerUrl.searchParams.set('muted', 'false');

  const chatUrl = new URL(
    `https://www.twitch.tv/embed/${twitchChannel.username}/chat`
  );

  chatUrl.searchParams.set('parent', parent);

  const channelUrl = `https://www.twitch.tv/${twitchChannel.username}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pb-12 pt-24">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Lives na Twitch
          </h1>

          <p className="mt-2 text-gray-400">
            Assista às transmissões do canal oficial MasterPllays.
          </p>
        </header>

        {/* Apresentação do canal */}
        <section aria-label="Canal oficial MasterPllays">
          <button
            type="button"
            onClick={() => setShowPlayer(true)}
            aria-expanded={showPlayer}
            className="group w-full max-w-3xl overflow-hidden rounded-xl border border-gray-800 bg-gray-900 text-left transition duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-900/20"
          >
            <div className="relative overflow-hidden">
              <img
                src={twitchChannel.thumbnail}
                alt="Imagem de apresentação do canal MasterPllays"
                loading="lazy"
                className="aspect-video w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                <span className="rounded-full bg-purple-600 p-4 text-white shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-9 w-9"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                {twitchChannel.title}
              </h2>

              <p className="mt-2 text-gray-400">
                {twitchChannel.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>

                {showPlayer
                  ? 'Abrir transmissão novamente'
                  : 'Abrir transmissão'}
              </span>
            </div>
          </button>
        </section>

        {/* Player e chat */}
        {showPlayer && (
          <section
            aria-label="Transmissão e chat da Twitch"
            className="mt-10 rounded-xl border border-gray-800 bg-gray-950 p-4 sm:p-6"
          >
            {/* Cabeçalho do player */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {twitchChannel.title}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Acompanhe a transmissão e participe do chat.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPlayer(false)}
                aria-label="Fechar transmissão"
                className="rounded-lg border border-gray-700 px-4 py-2 text-gray-300 transition hover:border-purple-500 hover:bg-gray-800 hover:text-white"
              >
                Fechar
              </button>
            </div>

            {/* Área de transmissão */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">

              {/* Player */}
              <div className="min-w-0 overflow-hidden rounded-lg bg-black">
                <iframe
                  src={playerUrl.toString()}
                  title="Transmissão MasterPllays na Twitch"
                  className="aspect-video w-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* Chat */}
              <div className="min-w-0 overflow-hidden rounded-lg bg-gray-900">
                <iframe
                  src={chatUrl.toString()}
                  title="Chat oficial MasterPllays na Twitch"
                  className="h-[450px] w-full lg:h-full lg:min-h-[400px]"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

            </div>

            {/* Link externo */}
            <div className="mt-5">
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700"
              >
                Abrir canal na Twitch

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M14 3h7v7" />
                  <path d="M10 14 21 3" />
                  <path d="M21 14v7H3V3h7" />
                </svg>
              </a>
            </div>
          </section>
        )}

        {/* Cadastro de visitantes */}
        {!user && (
          <section className="mt-12 rounded-xl border border-gray-800 bg-gray-900/70 p-6 text-center">
            <h2 className="text-xl font-bold text-white">
              Faça parte da comunidade MasterPllays!
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-gray-400">
              Crie sua conta para participar da comunidade e aproveitar os recursos disponíveis no site.
            </p>

            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="mt-5 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Criar conta
            </button>
          </section>
        )}

      </main>
    </div>
  );
}
