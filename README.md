# MasterPllays

Site de vídeos, transmissões, planos e perfil, desenvolvido com React, TypeScript, Vite, Tailwind CSS e Firebase Authentication.

## Executar localmente

1. Instale o Node.js 20 ou superior.
2. Execute `npm ci`.
3. Copie `.env.local.example` para `.env.local` e preencha as credenciais do Firebase.
4. Execute `npm run dev`.

`npm run lint` verifica o código e `npm run build` executa o TypeScript e compila o site.

## Publicar no GitHub Pages

O branch `main` contém o código-fonte. Ao enviar alterações para `main`, o GitHub Actions instala as dependências, executa o lint e o build e publica somente os arquivos compilados na raiz de `gh-pages`. O workflow também configura automaticamente o GitHub Pages para servir `gh-pages` na raiz.

Para habilitar login e cadastro na versão publicada, adicione os valores Firebase de `.env.local.example` como secrets do repositório. Sem essa configuração, o site continua disponível, mas a autenticação não pode ser usada.

## Pagamentos

Este projeto ainda não está integrado a um gateway de pagamento. O checkout explica essa limitação e não coleta dados financeiros nem simula cobranças.
