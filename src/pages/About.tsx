// src/pages/About.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="pt-20 md:pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-6xl">M</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Bem-vindo ao MasterPllays
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Conheça mais sobre mim e o propósito deste espaço
        </p>
      </div>

      {/* About Me Section */}
      <div className="mb-16 bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-2xl border border-gray-800 hover:border-red-600 transition-colors duration-300">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center">
          <span className="w-2 h-8 bg-red-600 mr-4 rounded"></span>
          Sobre Mim
        </h2>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-lg">
            Olá! Meu nome é <span className="text-red-400 font-semibold">Abel Filipe Cardoso Cândido</span>, mas conhecido como <span className="text-red-400 font-semibold">MasterPllays</span>, e sou criador de conteúdo dedicado a compartilhar conhecimento, entretenimento e experiências significativas através de vídeos e transmissões ao vivo.
          </p>
          
          <p className="text-lg">
            Sou apaixonado por criar conteúdo de qualidade que inspire, divirta e eduque a minha comunidade. 
            Através da minha plataforma MasterPllays, trabalho constantemente para trazer o melhor das minhas produções e interações diretas com meus seguidores.
          </p>

          <div className="bg-black/50 border-l-4 border-red-600 pl-4 py-2 my-6">
            <p className="text-white font-semibold mb-2">🎯 Minha Missão:</p>
            <p className="text-gray-300">
              Conectar-me com minha comunidade, compartilhar momentos autênticos e criar um espaço onde todos se sintam bem-vindos a participar de algo especial.
            </p>
          </div>
        </div>
      </div>

      {/* About the Platform */}
      <div className="mb-16 bg-gradient-to-br from-black to-gray-900 p-8 md:p-12 rounded-2xl border border-gray-800 hover:border-red-600 transition-colors duration-300">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center">
          <span className="w-2 h-8 bg-red-600 mr-4 rounded"></span>
          Sobre a Plataforma
        </h2>

        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-900/20 to-red-800/5 p-6 rounded-xl border border-red-800/30">
              <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center">
                <span className="text-2xl mr-2">📹</span>
                Vídeos
              </h3>
              <p className="text-gray-300">
                Uma biblioteca completa de vídeos selecionados com conteúdo exclusivo, tutoriais e momentos memoráveis de games e vlogs e conversar com o publico da live. Acesse toda a produção a qualquer hora.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-900/20 to-red-800/5 p-6 rounded-xl border border-red-800/30">
              <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center">
                <span className="text-2xl mr-2">🔴</span>
                Lives
              </h3>
              <p className="text-gray-300">
                As Transmissões ao vivo onde vocês podemos interagir em tempo real. Participe, faça perguntas e seja parte da experiência enquanto ela acontece ao vivo.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-900/20 to-red-800/5 p-6 rounded-xl border border-red-800/30">
              <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center">
                <span className="text-2xl mr-2">💎</span>
                Planos Premium
              </h3>
              <p className="text-gray-300">
                São diferentes planos de assinatura para se adequar ao seu orçamento, com benefícios exclusivos e acesso prioritário ao conteúdo.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-900/20 to-red-800/5 p-6 rounded-xl border border-red-800/30">
              <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center">
                <span className="text-2xl mr-2">👤</span>
                Perfil
              </h3>
              <p className="text-gray-300">
                Sua conta pessoal onde você pode gerenciar sua assinatura, preferências e acompanhar todo seu histórico na plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16 bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-2xl border border-gray-800 hover:border-red-600 transition-colors duration-300">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center">
          <span className="w-2 h-8 bg-red-600 mr-4 rounded"></span>
          Por Que Escolher MasterPllays?
        </h2>

        <ul className="space-y-4">
          <li className="flex items-start space-x-4">
            <span className="text-red-500 text-2xl flex-shrink-0">✓</span>
            <div>
              <h4 className="text-white font-semibold mb-1">Conteúdo Exclusivo</h4>
              <p className="text-gray-400">Acesso a material que você não encontrará em nenhum outro lugar</p>
            </div>
          </li>

          <li className="flex items-start space-x-4">
            <span className="text-red-500 text-2xl flex-shrink-0">✓</span>
            <div>
              <h4 className="text-white font-semibold mb-1">Comunidade Ativa</h4>
              <p className="text-gray-400">Conecte-se com pessoas que compartilham os mesmos interesses</p>
            </div>
          </li>

          <li className="flex items-start space-x-4">
            <span className="text-red-500 text-2xl flex-shrink-0">✓</span>
            <div>
              <h4 className="text-white font-semibold mb-1">Qualidade Premium</h4>
              <p className="text-gray-400">Produção profissional em todos os nossos conteúdos</p>
            </div>
          </li>

          <li className="flex items-start space-x-4">
            <span className="text-red-500 text-2xl flex-shrink-0">✓</span>
            <div>
              <h4 className="text-white font-semibold mb-1">Suporte Dedicado</h4>
              <p className="text-gray-400">Estou sempre disponível para ajudar e responder suas dúvidas</p>
            </div>
          </li>

          <li className="flex items-start space-x-4">
            <span className="text-red-500 text-2xl flex-shrink-0">✓</span>
            <div>
              <h4 className="text-white font-semibold mb-1">Atualizações Constantes</h4>
              <p className="text-gray-400">Novo conteúdo adicionado regularmente à plataforma</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 md:p-12 rounded-2xl text-center shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Pronto para Começar?
        </h2>
        <p className="text-red-100 text-lg mb-8">
          Escolha um plano e tenha acesso imediato a todo o conteúdo exclusivo
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/planos"
            className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
          >
            Ver Planos
          </Link>
          <Link
            to="/"
            className="inline-block bg-red-800/50 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-red-800 transition-colors duration-200 border border-white/20 transform hover:scale-105"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-16 pt-16 border-t border-gray-800 text-center">
        <p className="text-gray-400 mb-4">
          Tem perguntas ou sugestões? Adoraria saber sua opinião!
        </p>
        <p className="text-gray-300 text-sm">
          <span className="text-red-400">📧 Email:</span> suporte@masterpllays.com
        </p>
      </div>
    </div>
  );
};

export default About;
