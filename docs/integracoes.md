# Integrações e APIs Externas

## Visão Geral

O CalculeLLM integra-se com serviços externos para obter dados atualizados de modelos LLM e suas precificações. Esta documentação detalha todas as integrações implementadas e planejadas.

## Integrações Atuais

### 1. OpenRouter API

**URL Base**: `https://openrouter.ai/api/v1/`  
**Documentação**: [OpenRouter API Docs](https://openrouter.ai/docs)  
**Uso**: Fonte principal de dados de modelos LLM

#### Endpoint Utilizado
```http
GET https://openrouter.ai/api/v1/models
```

#### Estrutura de Resposta
```json
{
  "data": [
    {
      "id": "openai/gpt-4o",
      "name": "GPT-4o",
      "pricing": {
        "prompt": "0.000005",      // USD por token de entrada
        "completion": "0.000015"   // USD por token de saída
      },
      "context_length": 128000,    // Tamanho da janela de contexto
      "architecture": {
        "modality": "text",
        "tokenizer": "cl100k_base"
      }
    }
  ]
}
```

#### Processamento dos Dados
```typescript
// App.tsx:44-59
const models: LLM[] = data.data
  .map((model: any) => ({
    id: model.id,
    name: model.name,
    provider: capitalizeFirstLetter(model.id.split('/')[0]),
    inputPricePerMillion: parseFloat(model.pricing.prompt) * 1_000_000,
    outputPricePerMillion: parseFloat(model.pricing.completion) * 1_000_000,
    contextWindow: model.context_length || 0,
  }))
  .filter((model: LLM) => 
    model.contextWindow > 0 &&
    !isNaN(model.inputPricePerMillion) &&
    !isNaN(model.outputPricePerMillion) &&
    (model.inputPricePerMillion > 0 || model.outputPricePerMillion > 0)
  );
```

#### Filtros Aplicados
1. **Contexto válido**: `contextWindow > 0`
2. **Preços válidos**: Preços não são NaN
3. **Modelo não gratuito**: Pelo menos um preço > 0

#### Tratamento de Erros
```typescript
// App.tsx:67-68
catch (err) {
  setError(err instanceof Error ? err.message : 'An unknown error occurred');
}
```

#### Frequência de Atualização
- **Atual**: Uma vez por sessão (na inicialização)
- **Planejado**: Atualização periódica a cada 1 hora

### 2. Google AI Studio Integration

**Configuração**: `vite.config.ts`  
**Uso**: Deploy e configuração via AI Studio

#### Variáveis de Ambiente
```typescript
// vite.config.ts:8-9
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
}
```

#### Deploy URL
- **AI Studio**: https://ai.studio/apps/drive/1FTXYo598CxVjW_iSV8-9bAxNdjxtNvPA

## Integrações de Frontend

### 1. Browser APIs

#### LocalStorage
**Uso**: Persistência de preferências do usuário

```typescript
// Favoritos dos modelos
const favoriteModels = localStorage.getItem('favoriteModels');
localStorage.setItem('favoriteModels', JSON.stringify(favoriteModels));

// Tema da aplicação
const savedTheme = localStorage.getItem('theme');
localStorage.setItem('theme', 'dark');
```

#### MediaQuery API
**Uso**: Detecção de preferência de tema do sistema

```typescript
// App.tsx:79
const prefersDark = window.matchMedia && 
  window.matchMedia('(prefers-color-scheme: dark)').matches;
```

### 2. Fetch API
**Uso**: Requisições HTTP para APIs externas

```typescript
// App.tsx:40-43
const response = await fetch('https://openrouter.ai/api/v1/models');
if (!response.ok) {
  throw new Error(`Failed to fetch models: ${response.statusText}`);
}
```

## Bibliotecas e Dependências

### 1. React 19.1.1
**Funcionalidades utilizadas**:
- Hooks (useState, useEffect, useMemo)
- Components funcionais
- Event handling

### 2. Recharts 3.2.0
**Uso**: Visualização de dados em gráficos

```typescript
// ComparisonChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
```

### 3. TypeScript 5.8.2
**Configuração**: Tipagem estática e autocomplete

### 4. Vite 6.2.0
**Funcionalidades**:
- Hot Module Replacement (HMR)
- Build optimization
- Environment variables
- Asset handling

## Configurações de Rede

### 1. CORS Policy
**Status**: Não aplicável (requisições diretas do client)  
**OpenRouter**: Permite requisições cross-origin

### 2. Rate Limiting
**OpenRouter**: Não documentado limite específico  
**Estratégia**: Cache local para reduzir requisições

### 3. Error Handling
```typescript
// Estratégia de retry (planejado)
const fetchWithRetry = async (url: string, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

## Integrações Planejadas

### 1. Cotação de Moedas
**API sugerida**: Exchange Rates API  
**Endpoint**: `https://api.exchangerate-api.com/v4/latest/USD`  
**Propósito**: Atualização automática da taxa USD/BRL

```typescript
// Implementação planejada
const fetchExchangeRate = async () => {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await response.json();
  return data.rates.BRL;
};
```

### 2. Authentication (GitHub OAuth)
**Propósito**: Sincronização de favoritos entre dispositivos
**Provedor**: GitHub OAuth Apps
**Escopo**: `user:email` (leitura do email)

### 3. Analytics
**Provedor**: Google Analytics 4
**Eventos rastreados**:
- Seleção de modelos
- Mudanças de configuração
- Export de resultados

### 4. CDN para Assets
**Provedor**: Cloudflare / Vercel
**Conteúdo**: Imagens, ícones, assets estáticos

## Segurança e Privacidade

### 1. API Keys
```typescript
// ❌ NUNCA fazer
const API_KEY = 'sk-1234567890abcdef';

// ✅ Usar variáveis de ambiente
const API_KEY = process.env.GEMINI_API_KEY;
```

### 2. Data Privacy
- **Nenhum dado pessoal enviado** para APIs externas
- **LocalStorage apenas**: preferências locais
- **Sem tracking**: cookies ou identificadores únicos

### 3. HTTPS Only
- Todas as APIs utilizam HTTPS
- Certificados válidos verificados
- Sem mixed content

## Monitoramento e Observabilidade

### 1. Error Tracking (Planejado)
**Provedor**: Sentry  
**Eventos monitorados**:
- Falhas de API
- Erros de JavaScript
- Performance issues

### 2. Performance Monitoring
**Métricas**:
- Tempo de carregamento inicial
- Tempo de resposta da API
- Tamanho do bundle

### 3. Uptime Monitoring
**APIs externas**:
- OpenRouter API status
- Exchange Rates API status

## Testes de Integração

### 1. API Testing (Planejado)
```typescript
// __tests__/api/openrouter.test.ts
describe('OpenRouter API', () => {
  test('should fetch models successfully', async () => {
    const models = await fetchModels();
    expect(models).toHaveLength.greaterThan(0);
    expect(models[0]).toHaveProperty('id');
    expect(models[0]).toHaveProperty('pricing');
  });
});
```

### 2. Mock Strategy
```typescript
// Mock para testes
const mockOpenRouterResponse = {
  data: [
    {
      id: 'openai/gpt-4o',
      name: 'GPT-4o',
      pricing: { prompt: '0.000005', completion: '0.000015' },
      context_length: 128000
    }
  ]
};
```

### 3. E2E Testing
- Cypress para testes end-to-end
- Testes de fluxo completo
- Mocking de APIs externas

## Documentação das APIs

### OpenRouter API
- **Rate Limits**: Não especificado
- **Authentication**: Não requerida para endpoint público
- **Response Format**: JSON
- **Error Codes**: HTTP standard codes
- **Uptime**: 99.9% SLA (estimado)

### Troubleshooting Comum

#### 1. CORS Issues
```javascript
// Se necessário, usar proxy
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'https://openrouter.ai/api/v1/models';
fetch(proxyUrl + targetUrl)
```

#### 2. Network Timeouts
```javascript
// Configurar timeout
const controller = new AbortController();
setTimeout(() => controller.abort(), 10000);

fetch(url, { signal: controller.signal })
```

#### 3. Invalid JSON Response
```javascript
// Validar response antes de parse
const response = await fetch(url);
const text = await response.text();
try {
  return JSON.parse(text);
} catch (error) {
  console.error('Invalid JSON:', text);
  throw new Error('Invalid API response');
}
```

## Performance e Otimização

### 1. Caching Strategy
- **Browser Cache**: Headers apropriados
- **Memory Cache**: Dados da sessão
- **Service Worker**: Cache offline (planejado)

### 2. Bundle Optimization
- **Tree Shaking**: Remoção de código não utilizado
- **Code Splitting**: Carregamento sob demanda
- **Compression**: Gzip/Brotli para assets

### 3. API Optimization
- **Debouncing**: Para inputs de usuário
- **Batch Requests**: Quando possível
- **Parallel Requests**: Para dados independentes