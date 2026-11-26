import { Link } from 'react-router-dom';

type SocialPlatform =
  | 'Facebook'
  | 'Instagram'
  | 'Twitch'
  | 'X'
  | 'Discord'
  | 'TikTok'
  | 'Threads';

const socialProfiles: Array<{
  platform: SocialPlatform;
  label: string;
  href?: string;
}> = [
  { platform: 'Facebook', label: 'Facebook' },
  { platform: 'Instagram', label: '@masterpllaysyt', href: 'https://instagram.com/masterpllaysyt' },
  { platform: 'Instagram', label: '@masterpllaysvlogs', href: 'https://instagram.com/masterpllaysvlogs' },
  { platform: 'Instagram', label: '@masterpllays', href: 'https://instagram.com/masterpllays' },
  { platform: 'Twitch', label: '@masterpllays', href: 'https://twitch.tv/masterpllays' },
  { platform: 'X', label: '@mpllays', href: 'https://x.com/mpllays' },
  { platform: 'X', label: '@mpllaysvlogs', href: 'https://x.com/mpllaysvlogs' },
  { platform: 'Discord', label: 'Comunidade', href: 'https://discord.gg/b93D3wUa2' },
  {
    platform: 'TikTok',
    label: '@abelfilipecardosocandido',
    href: 'https://tiktok.com/abelfilipecardosocandido',
  },
  {
    platform: 'Threads',
    label: '@abelfilipecardosocandido',
    href: 'https://threads.com/@abelfilipecardosocandido',
  },
];

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  const commonProps = {
    'aria-hidden': true as const,
    className: 'h-4 w-4 shrink-0',
    viewBox: '0 0 24 24',
  };

  switch (platform) {
    case 'Facebook':
      return (
        <svg {...commonProps}>
          <path
            fill="currentColor"
            d="M13.4 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.5V10H6.7v3h2.8v8h3.9Z"
          />
        </svg>
      );
    case 'Instagram':
      return (
        <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'Twitch':
      return (
        <svg {...commonProps} fill="currentColor">
          <path d="M4 3h18v13l-5 5h-4l-3 3v-3H5v-4H2V6l2-3Zm2 2L5 7v8h4v3l3-3h4l4-4V5H6Zm5 3h2v5h-2V8Zm5 0h2v5h-2V8Z" />
        </svg>
      );
    case 'X':
      return (
        <svg {...commonProps} fill="currentColor">
          <path d="M18.9 3H22l-7.8 8.9L23.4 21h-6.3l-5-6.1L6.7 21H3.5l8.3-9.5L3 3h6.5l4.5 5.7L18.9 3Zm-1.1 16.2h1.7L8.7 4.7H6.9l10.9 14.5Z" />
        </svg>
      );
    case 'Discord':
      return (
        <svg {...commonProps} fill="currentColor">
          <path d="M19.7 5.4A18 18 0 0 0 15.3 4l-.6 1.2a16 16 0 0 0-5.4 0L8.7 4a18 18 0 0 0-4.4 1.4C1.5 9.5.7 13.5 1.1 17.5a18 18 0 0 0 5.4 2.7l1.2-2a12 12 0 0 1-1.9-.9l.5-.4a12 12 0 0 0 11.4 0l.5.4a12 12 0 0 1-1.9.9l1.2 2a18 18 0 0 0 5.4-2.7c.5-4.7-.8-8.7-3.2-12.1ZM8.7 14.5c-.8 0-1.4-.7-1.4-1.5s.6-1.5 1.4-1.5 1.4.7 1.4 1.5-.6 1.5-1.4 1.5Zm6.6 0c-.8 0-1.4-.7-1.4-1.5s.6-1.5 1.4-1.5 1.4.7 1.4 1.5-.6 1.5-1.4 1.5Z" />
        </svg>
      );
    case 'TikTok':
      return (
        <svg {...commonProps} fill="currentColor">
          <path d="M16 3h3c.2 2.6 1.6 4.1 4 4.5v3.2a9.3 9.3 0 0 1-4-1.2v6.2a5.5 5.5 0 1 1-5.5-5.5c.4 0 .8 0 1.2.1v3.3a2.3 2.3 0 1 0 1.3 2.1V3Z" />
        </svg>
      );
    case 'Threads':
      return (
        <svg
          {...commonProps}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M18.8 10.2c-.4-4-2.7-6.3-6.5-6.3-4.4 0-7.2 3.1-7.2 8.1s2.7 8.1 7.1 8.1c3 0 5.4-1.3 6.3-3.5.6-1.6-.1-3.1-1.8-3.6-1.2-.4-2.4 0-3.2.9-.8.8-1 1.8-.5 2.6" />
          <path d="M7.8 8.2c1.1-1.1 2.5-1.6 4.3-1.6 3.8 0 6 2.4 6 6.5" />
          <path d="M8.2 12.1c1-.7 2.2-1 3.8-1 2.4 0 4.2 1 5.3 2.8" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/[0.08] bg-[#09090b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
        <div className="grid gap-9 lg:grid-cols-[minmax(15rem,1fr)_2fr]">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              aria-label="MasterPllays — início"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-700 font-black text-white">
                M
              </span>
              <span className="font-bold tracking-tight">MasterPllays</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
              Vídeos, lives e criatividade em um só lugar.
            </p>

            <nav
              className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-400"
              aria-label="Links do rodapé"
            >
              <Link to="/videos" className="transition-colors hover:text-white">Vídeos</Link>
              <Link to="/clipes" className="transition-colors hover:text-white">Clipes</Link>
              <Link to="/lives" className="transition-colors hover:text-white">Lives</Link>
              <Link to="/planos" className="transition-colors hover:text-white">Planos</Link>
              <Link to="/about" className="transition-colors hover:text-white">Sobre</Link>
            </nav>
          </div>

          <section aria-labelledby="footer-social-heading">
            <div className="mb-4">
              <h2 id="footer-social-heading" className="text-sm font-semibold text-white">
                Acompanhe nas redes
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Encontre o MasterPllays nas plataformas.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {socialProfiles.map((profile) => {
                const label = `${profile.platform} ${profile.label}`;
                const className =
                  'inline-flex min-h-10 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 text-xs text-gray-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500';

                return profile.href ? (
                  <a
                    key={`${profile.platform}-${profile.href}`}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={className}
                  >
                    <SocialIcon platform={profile.platform} />
                    <span>{profile.label}</span>
                  </a>
                ) : (
                  <span
                    key={profile.platform}
                    aria-label="Facebook: link não informado"
                    title="Facebook: link não informado"
                    className={`${className} cursor-not-allowed opacity-50`}
                  >
                    <SocialIcon platform={profile.platform} />
                    <span>{profile.label}</span>
                  </span>
                );
              })}
            </div>
          </section>
        </div>

        <div className="mt-8 border-t border-white/[0.06] pt-5 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} MasterPllays. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
