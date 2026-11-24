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
