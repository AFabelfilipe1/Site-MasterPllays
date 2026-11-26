import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/[0.08] bg-[#09090b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="inline-flex items-center gap-3" aria-label="MasterPllays — início">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-700 font-black text-white">
                M
              </span>
              <span className="font-bold tracking-tight">MasterPllays</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
              Vídeos, lives e criatividade em um só lugar.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400" aria-label="Links do rodapé">
              <Link to="/videos" className="transition-colors hover:text-white">Vídeos</Link>
              <Link to="/clipes" className="transition-colors hover:text-white">Clipes</Link>
              <Link to="/lives" className="transition-colors hover:text-white">Lives</Link>
              <Link to="/about" className="transition-colors hover:text-white">Sobre</Link>
            </nav>

            <a
              href="https://www.twitch.tv/masterpllays"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MasterPllays na Twitch (abre em nova aba)"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-gray-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 text-red-400 transition-colors group-hover:text-red-300"
                aria-hidden="true"
              >
                <path d="M5 3h16v13l-4 4h-4l-3 3v-3H5V3Z" strokeLinejoin="round" />
                <path d="M11 7v5M16 7v5" strokeLinecap="round" />
              </svg>
              Twitch
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/[0.06] pt-5 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} MasterPllays. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
