# 🔧 Correção: GitHub Pages Build Error

## Problema
O GitHub Pages estava tentando fazer build com **Jekyll** em vez de **Vite**, causando o erro:
```
Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/css/style.scss':
No such file or directory @ dir_chdir0 - /github/workspace/docs
```

## Solução Aplicada

### 1. Arquivo `.nojekyll`
Criado na raiz do repositório para desabilitar o processamento Jekyll do GitHub Pages.

### 2. GitHub Actions Workflow
Criado workflow em `.github/workflows/deploy.yml` que:
- ✅ Instala dependências com `npm ci`
- ✅ Faz build com `npm run build` (Vite)
- ✅ Deploy automático para GitHub Pages na branch `gh-pages`
- ✅ Suporta custom domain (masterplays.com)

## Configuração Necessária

### No GitHub (Settings → Pages)
1. Vá para **Settings** → **Pages**
2. Em "Build and deployment" → "Source", selecione:
   - **Deploy from a branch**
   - **Branch**: `gh-pages`
   - **Directory**: `/ (root)`
3. Clique em **Save**

## Como Funciona

Quando você faz `git push` para `main`:
1. GitHub Actions executa o workflow `deploy.yml`
2. Faz build do projeto com Vite → cria pasta `dist/`
3. Faz push automático para branch `gh-pages`
4. GitHub Pages publica os arquivos estáticos

## Status
✅ Build agora funcionará automaticamente!
