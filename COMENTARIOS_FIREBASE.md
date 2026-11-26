# Configuração dos comentários do MasterPllays

## O que foi adicionado

- Comentários em tempo real para cada vídeo.
- Respostas a comentários.
- Curtidas individuais por usuário.
- Edição e exclusão pelo autor.
- Denúncias de comentários.
- Página individual em `#/video/:videoId`.
- O modal e a página individual usam a mesma coleção do Firestore.

## 1. Configure o Firebase

O projeto já tinha Firebase Authentication configurado por variáveis de ambiente. Agora o código também inicializa o Cloud Firestore.

Crie/atualize o arquivo `.env.local` na raiz do projeto com os dados do seu projeto Firebase:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

Use os valores de Firebase Console > Configurações do projeto > Seus apps > Aplicativo da Web.

Não publique o `.env.local` no GitHub. O `.gitignore` já deve mantê-lo fora do repositório; confirme antes do push.

## 2. Ative o Cloud Firestore

No Firebase Console:
1. Abra o projeto correspondente às variáveis acima.
2. Entre em Build > Firestore Database.
3. Crie o banco de dados.
4. Escolha a região adequada ao seu público.
5. Abra a aba Rules e publique o conteúdo de `firestore.rules` deste projeto.

As regras permitem leitura pública, mas exigem autenticação para comentar, responder, curtir ou denunciar. O usuário só pode editar/excluir os próprios comentários.

## 3. Authentication

Mantenha habilitados no Firebase Authentication os provedores que o site já usa:
- E-mail/senha.
- Google.

Em Authentication > Settings > Authorized domains, confira se estão cadastrados:
- `localhost` para desenvolvimento.
- `afabelfilipe1.github.io` para o site atual.
- O domínio próprio quando o MasterPllays migrar para ele.

## 4. Estrutura dos dados

Os comentários são salvos em:

`videos/{videoId}/comments/{commentId}`

Curtidas:
`videos/{videoId}/comments/{commentId}/likes/{uid}`

Denúncias:
`videos/{videoId}/comments/{commentId}/reports/{reportId}`

O ID do vídeo usado é o `id` existente em `src/types/data.ts`. Assim, o modal e a página individual consultam exatamente os mesmos comentários.

## 5. Moderação

As regras reconhecem administradores com a custom claim `admin: true`. Essa claim deve ser atribuída por um ambiente confiável com Firebase Admin SDK; nunca tente concedê-la pelo frontend.

Nesta versão, a análise das denúncias e a alteração do status `visible`/`hidden` podem ser feitas no Firebase Console por um administrador autorizado. Ainda não existe um painel visual de moderação dentro do site.

## 6. Teste local

```bash
npm install
npm run dev
```

Teste:
1. Abra um vídeo.
2. Faça login.
3. Publique um comentário.
4. Abra a página individual do mesmo vídeo.
5. Confirme que o comentário aparece nos dois lugares.
6. Teste responder, curtir, editar, excluir e denunciar com contas diferentes.

Antes de publicar, execute:

```bash
npm run build
```

Se o Firestore não estiver criado ou as regras não estiverem publicadas, a área de comentários mostrará um aviso de falha ao carregar.
