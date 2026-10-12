# MasterPllays - Plataforma de Streaming de Conteúdo Premium

Uma plataforma moderna de streaming de vídeos com autenticação Firebase, gerenciamento de planos de assinatura e sistema de pagamento integrado.

## 🎯 Características

- ✅ Autenticação via Firebase (Google + Email/Password)
- ✅ Gerenciamento de perfil de usuário
- ✅ Biblioteca completa de vídeos com filtros e busca
- ✅ Sistema de planos e assinatura
- ✅ Integração com múltiplos métodos de pagamento (Cartão, PIX, Boleto)
- ✅ Tema escuro moderno com branding MasterPllays
- ✅ Responsivo para dispositivos móveis
- ✅ TypeScript com tipo de segurança completa

## 🛠 Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Auth**: Firebase Authentication
- **Linting**: ESLint + TypeScript ESLint

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Firebase com projeto configurado

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/Novo-Site-MasterPllays.git
cd Novo-Site-MasterPllays
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com suas credenciais Firebase:

```env
VITE_FIREBASE_API_KEY=sua_chave_api
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_FIREBASE_MEASUREMENT_ID=seu_measurement_id
```

> Copie `.env.example` como referência

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Faz build para produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa ESLint com verificação rigorosa
- `npm run deploy` - Deploy para GitHub Pages

## 🏗 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── VideoPlayer.tsx
│   └── SimpleTest.tsx
├── contexts/          # React Context (Auth)
│   └── AuthContext.tsx
├── hooks/             # Custom Hooks
│   └── useAuth.ts
├── pages/             # Páginas da aplicação
│   ├── Home.tsx
│   ├── Auth.tsx
│   ├── Videos.tsx
│   ├── Profile.tsx
│   ├── Planos.tsx
│   ├── Pagamento.tsx
│   └── NotFound.tsx
├── types/             # TypeScript types e interfaces
│   ├── index.ts
│   ├── data.ts
│   └── errors.ts
├── firebase.ts        # Configuração Firebase
├── main.tsx           # Entry point
├── App.tsx            # Componente raiz
└── index.css          # Estilos globais
```

## 🔐 Configuração Firebase

### Requisitos

1. Projeto Firebase criado no [Firebase Console](https://console.firebase.google.com)
2. Authentication ativada com:
   - Google Sign-in
   - Email/Password

### Configuração de Domínios Autorizados

No Firebase Console → Authentication → Settings → Authorized domains:

- `localhost` (para desenvolvimento)
- `seu-dominio.com` (para produção)

## 📱 Páginas da Aplicação

| Rota | Descrição |
|------|-----------|
| `/` | Home com destaque e carrossel de vídeos |
| `/auth` | Login e registro |
| `/videos` | Biblioteca completa com busca e filtros |
| `/profile` | Perfil do usuário (requer autenticação) |
| `/planos` | Planos de assinatura disponíveis |
| `/pagamento` | Checkout de pagamento |
| `/test` | Teste de autenticação Firebase |
| `*` | Página 404 (não encontrada) |

## 🎨 Tema e Estilo

- **Cores principais**: Vermelho (#DC2626) e Preto (#000000)
- **Tema**: Escuro (Dark Mode)
- **Font**: Sistema padrão (Segoe UI, Roboto, etc.)
- **Componentes**: Tailwind CSS com customizações

## 🐛 Troubleshooting

### Erro: "Firebase configuration is missing"

Verifique se `.env.local` existe e contém todas as variáveis Firebase necessárias.

### Erro: "User not authorized for Google Sign-in"

No Firebase Console:
1. Vá para Authentication → Sign-in method
2. Certifique-se que "Google" está habilitado
3. Adicione seu domínio em Authorized domains

### Erro: "Cannot find module '@/...'"

Execute `npm install` novamente para garantir que todas as dependências estão instaladas.

## 📝 Licença

MIT - Veja LICENSE para detalhes

## 👥 Suporte

Para questões ou sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando React + Firebase + TypeScript**
