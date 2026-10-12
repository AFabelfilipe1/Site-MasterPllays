# MasterPllays

Site de streaming de conteúdo em React, TypeScript e Vite, com autenticação Firebase e páginas de vídeos, lives, planos e perfil.

## Executar localmente

1. Instale as dependências com `npm install`.
2. Copie `.env.local.example` para `.env.local` e configure os dados do Firebase.
3. Inicie o servidor com `npm run dev`.

## Verificações

- `npm run build` compila a aplicação para produção.
- `npm run lint` verifica o código.
- `npm run preview` abre localmente a build de produção.

## Publicação no GitHub Pages

A branch `main` contém o código-fonte. O workflow em `.github/workflows/deploy.yml` compila o site e publica o conteúdo de `dist/` na branch `gh-pages`. Nas configurações do repositório, selecione GitHub Pages → Deploy from a branch → `gh-pages` → `/(root)`.

Configure os segredos `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID` e `VITE_FIREBASE_APP_ID` no repositório se quiser habilitar a autenticação no site publicado.

## Pagamentos

O projeto não está integrado a um gateway de pagamento. A página de checkout informa isso e não coleta dados financeiros nem simula cobranças.
