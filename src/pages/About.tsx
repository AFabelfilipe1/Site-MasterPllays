
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 text-white sm:px-6 md:pt-28 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Hero */}
        <section className="mb-20 text-center">
          <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-red-500/30 bg-gradient-to-br from-red-500 to-red-900 shadow-2xl shadow-red-950/40 sm:h-36 sm:w-36">
            <span className="text-6xl font-black tracking-tight sm:text-7xl">
              M
            </span>
          </div>

          <span className="mb-4 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400">
            CONHEÇA O MASTERPLLAYS
          </span>

          <h1 className="mb-5 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Bem-vindo ao{' '}
            <span className="text-red-500">MasterPllays</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Um espaço dedicado aos games, à criatividade e ao entretenimento,
            onde compartilho vídeos, transmissões ao vivo e momentos especiais
            com a comunidade.
          </p>
        </section>

        {/* About Me */}
        <section className="mb-16 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 shadow-xl sm:p-10 md:p-12">
          <SectionTitle>Sobre Mim</SectionTitle>

          <div className="space-y-5 leading-relaxed text-gray-300">
            <p className="text-lg">
              Olá! Sou{' '}
              <span className="font-semibold text-red-400">
                Abel Filipe
              </span>
              , conhecido na internet como{' '}
              <span className="font-semibold text-red-400">
                MasterPllays
              </span>
              .
            </p>

            <p>
              Sou criador de conteúdo e apaixonado pelo universo dos games.
              Gosto de explorar diferentes jogos, compartilhar experiências,
              produzir vídeos e transmitir momentos de diversão ao vivo.
            </p>

            <p>
              O MasterPllays nasceu como um espaço para reunir minhas
              produções e aproximar ainda mais o conteúdo que crio das pessoas
              que acompanham meu trabalho.
            </p>

            <div className="rounded-xl border-l-4 border-red-600 bg-black/50 p-5">
              <h3 className="mb-2 font-bold text-white">
                🎯 Minha missão
              </h3>

              <p className="text-gray-300">
                Criar e compartilhar conteúdo que proporcione entretenimento,
                incentive a interação e construa uma comunidade acolhedora,
                na qual todos possam participar e aproveitar experiências
                relacionadas ao mundo dos games.
              </p>
            </div>
          </div>
        </section>

        {/* About Platform */}
        <section className="mb-16 rounded-2xl border border-gray-800 bg-gradient-to-br from-black to-gray-900 p-6 shadow-xl sm:p-10 md:p-12">
          <SectionTitle>Sobre a Plataforma</SectionTitle>

          <p className="mb-8 leading-relaxed text-gray-400">
            O site MasterPllays reúne diferentes espaços para você conhecer
            meus conteúdos, acompanhar transmissões e ficar por dentro das
            novidades.
          </p>

          <div className="grid gap-5 sm:grid-cols-2">

            <FeatureCard
              icon="🎮"
              title="Games"
              description="Conteúdos relacionados ao universo dos jogos, incluindo partidas, experiências, descobertas e momentos especiais."
            />

            <FeatureCard
              icon="📹"
              title="Vídeos"
              description="Uma biblioteca de vídeos com gameplays, vlogs e outros conteúdos para você assistir quando quiser."
            />

            <FeatureCard
              icon="🔴"
              title="Transmissões ao Vivo"
              description="Acompanhe as lives, participe do chat e interaja durante as transmissões em tempo real."
            />

            <FeatureCard
              icon="👤"
              title="Conta e Perfil"
              description="Acesse sua conta na plataforma e utilize os recursos de perfil que estiverem disponíveis."
            />

          </div>
        </section>

        {/* Values */}
        <section className="mb-16 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 shadow-xl sm:p-10 md:p-12">
          <SectionTitle>O Que Move o MasterPllays?</SectionTitle>

          <div className="space-y-6">

            <ValueItem
              icon="❤️"
              title="Paixão por Games"
              description="O universo dos jogos é a principal inspiração para os conteúdos e experiências compartilhados."
            />

            <ValueItem
              icon="🤝"
              title="Comunidade"
              description="Acredito que compartilhar experiências e interagir com outras pessoas torna tudo mais divertido."
            />

            <ValueItem
              icon="✨"
              title="Criatividade"
              description="Busco novas ideias e maneiras de produzir conteúdos que representem minha identidade."
            />

            <ValueItem
              icon="🚀"
              title="Evolução"
              description="O MasterPllays é um projeto em constante desenvolvimento, com espaço para novas ideias, melhorias e experiências."
            />

          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-700 via-red-600 to-red-800 p-7 text-center shadow-2xl shadow-red-950/30 sm:p-12">
          <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl">
            Faça Parte Dessa Experiência!
          </h2>

          <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-red-100">
            Explore os conteúdos, acompanhe as transmissões e venha conhecer
            tudo o que o universo MasterPllays tem a oferecer.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              to="/videos"
              className="rounded-lg bg-white px-8 py-3 font-bold text-red-700 transition-all duration-200 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
            >
              Explorar Vídeos
            </Link>

            <Link
              to="/lives"
              className="rounded-lg border border-white/40 bg-red-900/30 px-8 py-3 font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-red-900/60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700"
            >
              Assistir às Lives
            </Link>

          </div>
        </section>

        {/* Contact */}
        <section className="mt-16 border-t border-gray-800 pt-12 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">
            Entre em Contato
          </h2>

          <p className="mb-5 text-gray-400">
            Tem alguma dúvida, sugestão ou gostaria de entrar em contato?
            Será um prazer receber sua mensagem.
          </p>

          <a
            href="mailto:suporte@masterpllays.com"
            className="inline-flex items-center gap-2 font-semibold text-red-400 transition-colors hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            📧 suporte@masterpllays.com
          </a>
        </section>

        {/* Footer note */}
        <footer className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            MasterPllays — Games, conteúdo e comunidade.
          </p>
        </footer>

      </div>
    </main>
  );
};

/* Reusable section title */
interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h2 className="mb-7 flex items-center text-2xl font-extrabold sm:text-3xl">
    <span
      aria-hidden="true"
      className="mr-4 h-8 w-1.5 flex-shrink-0 rounded-full bg-red-600"
    />
    {children}
  </h2>
);

/* Platform feature card */
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <article className="rounded-xl border border-red-900/30 bg-gradient-to-br from-red-950/30 to-black p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/60">
    <div className="mb-4 text-3xl" aria-hidden="true">
      {icon}
    </div>

    <h3 className="mb-3 text-xl font-bold text-red-400">
      {title}
    </h3>

    <p className="leading-relaxed text-gray-300">
      {description}
    </p>
  </article>
);

/* Platform values */
interface ValueItemProps {
  icon: string;
  title: string;
  description: string;
}

const ValueItem: React.FC<ValueItemProps> = ({
  icon,
  title,
  description,
}) => (
  <article className="flex items-start gap-4">
    <div
      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-red-900/40 bg-red-950/40 text-2xl"
      aria-hidden="true"
    >
      {icon}
    </div>

    <div>
      <h3 className="mb-1 font-bold text-white">
        {title}
      </h3>

      <p className="leading-relaxed text-gray-400">
        {description}
      </p>
    </div>
  </article>
);

export default About;
