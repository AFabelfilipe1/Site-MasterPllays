// src/components/Header.tsx
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeMenus();
      navigate('/');
    } catch (error) {
      console.error('Não foi possível encerrar a sessão:', error);
    }
  };

  const userInitial =
    user?.displayName?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    'U';

  const userName = user?.displayName?.trim().split(' ')[0] || 'Usuário';

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
    }`;

  const mobileLinkClass =
    'block rounded-xl px-3 py-2.5 font-medium text-white/80 transition-colors duration-200 hover:bg-white/5 hover:text-white';

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] bg-[#09090b]/80 shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.25rem] items-center justify-between md:h-[4.75rem]">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenus}
            className="group flex items-center gap-3"
            aria-label="MasterPllays - Página inicial"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-700 text-lg font-black text-white shadow-lg shadow-red-950/40 transition-transform group-hover:scale-105 md:h-10 md:w-10 md:text-xl">
              M
            </span>
            <span className="text-lg font-bold tracking-tight text-white md:text-xl">
              MasterPllays
            </span>
          </Link>

          {/* Navegação para desktop */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Navegação principal"
          >
            <NavLink to="/" end className={linkClass}>
              Início
            </NavLink>

            <NavLink to="/videos" className={linkClass}>
              Vídeos
            </NavLink>

            <NavLink to="/clipes" className={linkClass}>
              Clipes
            </NavLink>

            <NavLink
              to="/lives"
              className={(state) => `${linkClass(state)} flex items-center gap-2`}
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              Lives
            </NavLink>

            <NavLink to="/planos" className={linkClass}>
              Planos
            </NavLink>

            <NavLink to="/about" className={linkClass}>
              Sobre
            </NavLink>
          </nav>

          {/* Ações do usuário */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 text-white transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="menu"
                  aria-label="Abrir menu do usuário"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-700 text-sm font-semibold text-white">
                    {userInitial}
                  </span>

                  <span className="hidden font-medium lg:block">{userName}</span>

                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isProfileMenuOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 9-7 7-7-7"
                    />
                  </svg>
                </button>

                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 mt-3 w-52 rounded-2xl border border-white/10 bg-[#111114]/95 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
                    role="menu"
                  >
                    <Link
                      to="/profile"
                      onClick={closeMenus}
                      className="flex items-center gap-2 px-4 py-2.5 text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                      role="menuitem"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"
                        />
                      </svg>
                      Meu Perfil
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                      role="menuitem"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"
                        />
                      </svg>
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={closeMenus}
                className="hidden rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-950/30 transition-all hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-red-950/50 sm:inline-flex"
              >
                Entrar
              </Link>
            )}

            {/* Botão do menu mobile */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="rounded-xl p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18 18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Navegação mobile */}
        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            className="border-t border-white/10 bg-[#09090b]/95 py-3 backdrop-blur-xl md:hidden"
            aria-label="Navegação mobile"
          >
            <div className="space-y-1 px-2">
              <Link to="/" className={mobileLinkClass} onClick={closeMenus}>
                Início
              </Link>

              <Link to="/videos" className={mobileLinkClass} onClick={closeMenus}>
                Vídeos
              </Link>

              <Link to="/clipes" className={mobileLinkClass} onClick={closeMenus}>
                Clipes
              </Link>

              <Link
                to="/lives"
                className={`${mobileLinkClass} flex items-center gap-2`}
                onClick={closeMenus}
              >
                <span className="animate-pulse text-red-500" aria-hidden="true">
                  🔴
                </span>
                Lives
              </Link>

              <Link to="/planos" className={mobileLinkClass} onClick={closeMenus}>
                Planos
              </Link>

              <Link to="/about" className={mobileLinkClass} onClick={closeMenus}>
                Sobre
              </Link>

              {user ? (
                <>
                  <div className="my-2 border-t border-gray-800" />

                  <Link
                    to="/profile"
                    className={mobileLinkClass}
                    onClick={closeMenus}
                  >
                    Meu Perfil
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`${mobileLinkClass} w-full text-left`}
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className={`${mobileLinkClass} mt-2 bg-red-600 text-center text-white hover:bg-red-500`}
                  onClick={closeMenus}
                >
                  Entrar
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
