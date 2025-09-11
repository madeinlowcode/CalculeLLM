# Guia de Deploy e Configuração

## Visão Geral

Este documento detalha todas as opções de deploy disponíveis para o CalculeLLM, desde desenvolvimento local até produção em diferentes plataformas cloud.

## Deploy Local

### Pré-requisitos
- **Node.js**: Versão 18.0 ou superior
- **npm**: Versão 8.0 ou superior (incluído com Node.js)
- **Git**: Para clone do repositório

### Instalação e Execução

#### 1. Clone do Repositório
```bash
git clone <repository-url>
cd CalculeLLM
```

#### 2. Instalação de Dependências
```bash
npm install
```

#### 3. Configuração de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:
```bash
# .env.local
GEMINI_API_KEY=your_gemini_api_key_here
```

#### 4. Execução em Desenvolvimento
```bash
npm run dev
```
- **URL**: http://localhost:5173
- **Hot Reload**: Ativado automaticamente
- **DevTools**: React DevTools compatível

#### 5. Build de Produção
```bash
npm run build
```
- **Output**: Pasta `dist/`
- **Otimizações**: Minificação, tree-shaking, code splitting

#### 6. Preview do Build
```bash
npm run preview
```
- **URL**: http://localhost:4173
- **Simula**: Ambiente de produção local

## Deploy no AI Studio (Atual)

### Configuração Atual
- **URL**: https://ai.studio/apps/drive/1FTXYo598CxVjW_iSV8-9bAxNdjxtNvPA
- **Status**: ✅ Ativo
- **Auto-deploy**: Configurado

### Funcionalidades do AI Studio
1. **Deploy automático** via Git integration
2. **Preview deployments** para branches
3. **Environment variables** management
4. **Built-in analytics**
5. **Custom domains** (opcional)

### Configurações Específicas

#### Variáveis de Ambiente
```typescript
// vite.config.ts
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
}
```

#### Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x

## Deploy em Vercel

### Configuração Recomendada

#### 1. Arquivo `vercel.json`
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": "dist",
  "env": {
    "GEMINI_API_KEY": "@gemini-api-key"
  }
}
```

#### 2. Deploy via CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy de produção
vercel --prod
```

#### 3. Deploy via GitHub
1. Conectar repositório no dashboard Vercel
2. Configurar environment variables
3. Deploy automático em commits

### Vantagens do Vercel
- ✅ **Edge Network**: CDN global
- ✅ **Serverless Functions**: Para APIs futuras
- ✅ **Automatic HTTPS**
- ✅ **Git Integration**
- ✅ **Preview Deployments**

## Deploy em Netlify

### Configuração

#### 1. Arquivo `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2. Deploy via CLI
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Build e deploy
npm run build
netlify deploy --prod --dir=dist
```

### Vantagens do Netlify
- ✅ **Forms**: Para contato futuro
- ✅ **Identity**: Para auth futuro
- ✅ **Analytics**: Built-in
- ✅ **Split Testing**: A/B testing

## Deploy em GitHub Pages

### Configuração

#### 1. GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm install

    - name: Build
      run: npm run build
      env:
        GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

#### 2. Configuração do Repository
1. **Settings** → **Pages**
2. **Source**: GitHub Actions
3. **Custom domain** (opcional)

## Deploy em Firebase Hosting

### Configuração

#### 1. Instalação do Firebase CLI
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

#### 2. Arquivo `firebase.json`
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

#### 3. Deploy
```bash
npm run build
firebase deploy
```

## Deploy em AWS S3 + CloudFront

### Configuração

#### 1. AWS CLI Setup
```bash
aws configure
```

#### 2. Script de Deploy
```bash
#!/bin/bash
# deploy.sh

# Build
npm run build

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

#### 3. CloudFront Distribution
- **Origin**: S3 bucket
- **Default Root Object**: `index.html`
- **Error Pages**: 404 → `/index.html` (para SPA routing)

## Configurações de Produção

### 1. Environment Variables

#### Desenvolvimento
```bash
# .env.local
VITE_APP_ENV=development
VITE_API_BASE_URL=http://localhost:3000
GEMINI_API_KEY=dev_key_here
```

#### Produção
```bash
# Production environment
VITE_APP_ENV=production
VITE_API_BASE_URL=https://api.calculellm.com
GEMINI_API_KEY=prod_key_here
```

### 2. Build Optimizations

#### Vite Production Config
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### 3. Security Headers

#### Netlify `_headers`
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://openrouter.ai;
```

## Monitoramento e Analytics

### 1. Performance Monitoring

#### Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    configPath: './lighthouserc.json'
    uploadArtifacts: true
```

#### Web Vitals
```typescript
// Adicionar ao index.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### 2. Error Tracking

#### Sentry Integration
```bash
npm install @sentry/react @sentry/tracing
```

```typescript
// main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

### 3. Analytics

#### Google Analytics 4
```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## SSL/TLS e Domínio

### 1. Custom Domain
```bash
# Verificar DNS
dig CNAME your-domain.com

# Configurar CNAME
your-domain.com. CNAME your-app.vercel.app.
```

### 2. SSL Certificate
- **Let's Encrypt**: Automático em Vercel/Netlify
- **CloudFlare**: Proxy SSL gratuito
- **AWS Certificate Manager**: Para AWS deployments

## Backup e Disaster Recovery

### 1. Database Backup (localStorage)
```typescript
// Backup automático
const backupData = {
  favoriteModels: localStorage.getItem('favoriteModels'),
  theme: localStorage.getItem('theme'),
  timestamp: new Date().toISOString()
};

// Restore
const restoreData = (backup: any) => {
  Object.keys(backup).forEach(key => {
    if (key !== 'timestamp') {
      localStorage.setItem(key, backup[key]);
    }
  });
};
```

### 2. Code Backup
- **Git**: Controle de versão
- **Multiple Remotes**: GitHub + GitLab
- **Automated Backups**: GitHub → S3

## Troubleshooting

### Problemas Comuns

#### 1. Build Falha
```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install

# Verificar versões
node --version
npm --version
```

#### 2. Environment Variables não carregam
```typescript
// Verificar no browser
console.log(import.meta.env);

// Prefixo obrigatório para Vite
VITE_API_KEY=value  // ✅
API_KEY=value       // ❌
```

#### 3. CORS Issues
```typescript
// Proxy de desenvolvimento
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://openrouter.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

### Performance Issues

#### 1. Bundle Size
```bash
# Análise do bundle
npm run build
npx vite-bundle-analyzer dist
```

#### 2. Loading Performance
```typescript
// Lazy loading de componentes
const LazyChart = lazy(() => import('./ComparisonChart'));

// Preload de recursos críticos
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
```

## CI/CD Pipeline

### GitHub Actions Completo
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run test
      - run: npm run lint
      - run: npm run type-check

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      - name: Deploy to Production
        run: |
          # Deploy script here
```