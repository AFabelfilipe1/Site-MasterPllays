# 📁 Estrutura do Projeto MasterPllays

## Visão Geral

```
Novo-Site-MasterPllays/
├── 📁 src/                        # Código-fonte da aplicação
│   ├── 📁 components/             # Componentes reutilizáveis
│   ├── 📁 pages/                  # Páginas da aplicação
│   ├── 📁 hooks/                  # Custom hooks React
│   ├── 📁 contexts/               # React Context providers
│   ├── 📁 types/                  # Tipos TypeScript centralizados
│   ├── firebase.ts                # Configuração Firebase
│   ├── App.tsx                    # Componente raiz com routing
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Estilos globais
│   └── vite-env.d.ts              # Tipos de ambiente Vite
│
├── 📁 public/                     # Assets públicos (favicon, etc)
├── 📁 dist/                       # Build de produção (gerado)
├── 📁 node_modules/               # Dependências npm (gerado)
│
├── 📋 Arquivos de Configuração
│   ├── .env.example               # Template de variáveis de ambiente
│   ├── .env.local                 # Credenciais Firebase (NÃO COMMITAR)
│   ├── .gitignore                 # Arquivos ignorados pelo git
│   ├── .eslintrc.cjs              # Configuração ESLint
│   ├── vite.config.ts             # Configuração Vite (build)
│   ├── tsconfig.json              # Configuração TypeScript
│   ├── tsconfig.node.json         # TS config para build tools
│   ├── tailwind.config.js         # Configuração Tailwind CSS
│   ├── postcss.config.js          # Configuração PostCSS
│   └── package.json               # Dependências npm
│
├── 📚 Documentação
│   ├── README.md                  # Guia principal do projeto
│   ├── README_new.md              # Versão atualizada do README
│   ├── AUDIT.md                   # Relatório de auditoria completo
│   └── VERIFICACAO_FINAL.md       # Checklist de verificação
│
└── 🌐 index.html                  # HTML entry point

```

---

## 📂 Descrição Detalhada dos Diretórios

### `src/components/` - Componentes Reutilizáveis

```
components/
├── Header.tsx           # Navbar com navegação e menu de usuário
├── Footer.tsx           # Footer simples com copyright
├── VideoPlayer.tsx      # Player de vídeo (iframe wrapper)
└── SimpleTest.tsx       # Componente de teste para Firebase auth
```

**Características:**
- Tema escuro com acentos vermelhos
- Componentes sem estado ou com estado local mínimo
- Props bem tipadas com interfaces TypeScript

---

### `src/pages/` - Páginas da Aplicação

```
pages/
├── Home.tsx             # Landing page com hero e carousels
├── Auth.tsx             # Login e registro (Firebase)
├── Videos.tsx           # Biblioteca de vídeos com filtros
├── Profile.tsx          # Perfil do usuário (protegido)
├── Planos.tsx           # Planos de assinatura
├── Pagamento.tsx        # Checkout com 3 métodos de pagamento
└── NotFound.tsx         # Página 404
```

**Características:**
- Cada página é um componente React funcional com TypeScript
- Todas seguem o design system (preto + vermelho)
- Integradas com autenticação via useAuth hook
- Responsivas e acessíveis

---

### `src/hooks/` - Custom Hooks

```
hooks/
└── useAuth.ts           # Hook para acessar contexto de autenticação
```

**Funcionalidades:**
```typescript
const { user, login, logout, loading } = useAuth();
```

---

### `src/contexts/` - Contextos React

```
contexts/
└── AuthContext.tsx      # Provedor de autenticação com Firebase
```

**Funcionalidades:**
- Gerencia estado de autenticação
- Sincroniza com Firebase em tempo real
- Fornece user, login, logout, loading

---

### `src/types/` - Tipos TypeScript Centralizados

```
types/
├── index.ts             # Tipos principais (Video, Plan, ErrorCode)
├── data.ts              # Dados mockados (VIDEOS, PLANS, VIDEO_CATEGORIES)
└── errors.ts            # Tratamento de erros Firebase
```

**Tipos Principais:**
```typescript
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  duration: string;
  views?: string;
  uploadDate?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  description?: string;
  creator?: string;
  tags?: string[];
}

interface Plan {
  nome: string;
  preco: string;
  recursos: string[];
}
```

---

## 🛠 Arquivos de Configuração

### `.env.example` - Template de Variáveis de Ambiente

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

**Como usar:**
1. Copie `.env.example` para `.env.local`
2. Preencha com suas credenciais do Firebase
3. `.env.local` é ignorado pelo git (não fazer commit)

---

### `vite.config.ts` - Configuração do Build

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
```

---

### `tsconfig.json` - Configuração TypeScript

**Características principais:**
- `strict: true` - Type checking rigoroso
- `noUnusedLocals: true` - Detecta variáveis não usadas
- `noUnusedParameters: true` - Detecta parâmetros não usados
- `noFallthroughCasesInSwitch: true` - Evita switch fallthrough

---

### `tailwind.config.js` - Customizações Tailwind

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colors customizados se necessário
      }
    }
  }
}
```

---

### `.eslintrc.cjs` - Linting de Código

**Configuração:**
- ESLint recommended
- TypeScript ESLint plugin
- React hooks rules
- React Refresh rules

---

## 🎨 Design System - Cores Utilizadas

### Paleta de Cores Principal

| Cor | Hex | Tailwind | Uso |
|-----|-----|----------|-----|
| Preto | #000000 | black | Fundo principal |
| Gray-900 | #111827 | gray-900 | Cards e containers |
| Gray-800 | #1F2937 | gray-800 | Inputs e elementos |
| Gray-700 | #374151 | gray-700 | Borders |
| Gray-400 | #9CA3AF | gray-400 | Texto secundário |
| Branco | #FFFFFF | white | Texto principal |
| Red-600 | #DC2626 | red-600 | Botões de ação |
| Red-700 | #B91C1C | red-700 | Hover de botões |

---

## 📦 Dependências Principais

### Frontend
- **React 18** - UI library
- **React Router v6** - Routing
- **TypeScript** - Type safety
- **Vite** - Build tool (rápido)
- **Tailwind CSS** - Utility-first CSS
- **PostCSS** - CSS processing

### Backend/Services
- **Firebase** - Authentication e databases
- **react-firebase-hooks** (opcional) - Firebase hooks

### Dev Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TS linting
- **Vite plugins** - React plugin, etc

---

## 🚀 Scripts NPM

```bash
# Desenvolvimento
npm run dev              # Inicia dev server em localhost:5173

# Build
npm run build            # Compila para produção (dist/)
npm run preview          # Preview do build local

# Qualidade
npm run lint             # ESLint check (strict)

# Deploy (se configurado)
npm run deploy           # Deploy para GitHub Pages
```

---

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────┐
│                   App.tsx                           │
│  (Routes + Header + Footer + AuthContext Provider)  │
└────────────────┬────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
   ┌────▼──────┐   ┌─────▼──────┐
   │ AuthContext│   │   Routes   │
   │ (Firebase) │   │  (Pages)   │
   └────┬───────┘   └─────┬──────┘
        │                 │
        │            ┌────┴────────────────┐
        │            │                     │
        │     ┌──────▼──────┐      ┌──────▼──────┐
        │     │ Home        │      │ Auth/Videos │
        │     │ (useAuth)   │      │ (useAuth)   │
        │     └─────────────┘      └─────────────┘
        │
        └──────────────┐
                       │
            ┌──────────▼──────────┐
            │    useAuth Hook     │
            │  (AuthContext)      │
            └─────────────────────┘
```

---

## 🔐 Segurança

### Variáveis de Ambiente
- ✅ Credenciais em `.env.local`
- ✅ `.env.local` ignorado pelo git
- ✅ Template em `.env.example`

### Type Safety
- ✅ TypeScript strict mode
- ✅ Sem tipos `any`
- ✅ Interfaces bem definidas

### Validação
- ✅ Input validation básica
- ✅ Error handling type-safe
- ✅ Firebase security rules (configure no console)

---

## 📊 Estatísticas do Projeto

- **Arquivos TypeScript**: ~17
- **Componentes**: 8 (4 components + 7 pages)
- **Custom Hooks**: 1
- **Contextos**: 1
- **Tipo Interfaces**: 4+
- **Linhas de código**: ~2000+ (sem node_modules)
- **Tamanho dist/**: ~4KB gzip

---

## 🎯 Próximos Passos

1. **Configurar Firebase:**
   - Criar projeto no Firebase Console
   - Copiar credenciais
   - Preencher `.env.local`

2. **Desenvolvimento Local:**
   ```bash
   npm install
   npm run dev
   ```

3. **Integração de Pagamentos:**
   - Integrar Stripe, PagSeguro ou similar
   - Implementar backend para validações

4. **Deploy:**
   - GitHub Pages
   - Vercel
   - Netlify

---

**Documentação gerada**: 2024-12-21  
**Versão**: 1.0 (Produção Pronta)
