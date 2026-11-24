
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Videos from './pages/Videos';
import Lives from './pages/Lives';
import Clips from './pages/Clips';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Planos from './pages/Planos';
import Pagamento from './pages/Pagamento';
import About from './pages/About';
import NotFound from './pages/NotFound';

import SimpleTest from './components/SimpleTest';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<Home />} />

          {/* Conteúdos */}
          <Route path="/videos" element={<Videos />} />
          <Route path="/clipes" element={<Clips />} />
          <Route path="/lives" element={<Lives />} />

          {/* Institucional */}
          <Route path="/about" element={<About />} />

          {/* Conta e usuário */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />

          {/* Planos e pagamentos */}
          <Route path="/planos" element={<Planos />} />
          <Route path="/pagamento" element={<Pagamento />} />

          {/* Testes */}
          <Route path="/test" element={<SimpleTest />} />

          {/* Página não encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
