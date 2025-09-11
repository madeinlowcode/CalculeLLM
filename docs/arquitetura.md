# Arquitetura do Sistema

## Visão Geral

O CalculeLLM é uma Single Page Application (SPA) construída com React e TypeScript, utilizando Vite como bundler. A aplicação segue uma arquitetura component-based com estado local gerenciado via React hooks.

## Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React SPA)                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │    App.tsx  │  │ Components  │  │   Hooks     │        │
│  │ (Container) │  │ (UI Layer)  │  │ (Estado)    │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Types     │  │ Constants   │  │ Local       │        │
│  │ (Interfaces)│  │ (Config)    │  │ Storage     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   OpenRouter API                            │
│              (Dados de Modelos LLM)                        │
└─────────────────────────────────────────────────────────────┘
```

## Camadas da Aplicação

### 1. Camada de Apresentação (UI)
- **Responsabilidade**: Renderização da interface e interação do usuário
- **Tecnologias**: React Components, TypeScript, Tailwind CSS
- **Localização**: `/components/*`

### 2. Camada de Estado (State Management)
- **Responsabilidade**: Gerenciamento do estado da aplicação
- **Tecnologias**: React useState, useEffect, useMemo
- **Localização**: `App.tsx` (estado global), componentes individuais (estado local)

### 3. Camada de Dados (Data Layer)
- **Responsabilidade**: Integração com APIs externas e persistência local
- **Tecnologias**: Fetch API, localStorage
- **Fontes**: OpenRouter API, localStorage do navegador

### 4. Camada de Tipos (Type Definitions)
- **Responsabilidade**: Definições de tipos TypeScript
- **Localização**: `types.ts`

## Fluxo de Dados

```
API Request → Data Processing → State Update → Component Re-render → UI Update
     ↑                                                                    ↓
Local Storage ←────────────────── User Interaction ←─────────────────────┘
```

### 1. Inicialização da Aplicação
1. App carrega com estado inicial
2. useEffect dispara requisição para OpenRouter API
3. Dados dos modelos são processados e filtrados
4. Estado é atualizado com modelos disponíveis
5. Interface é renderizada com dados

### 2. Interação do Usuário
1. Usuário interage com componentes (seleção de modelos, input de tokens)
2. Eventos disparam funções de callback
3. Estado da aplicação é atualizado
4. Componentes re-renderizam automaticamente
5. Dados relevantes são salvos no localStorage

### 3. Cálculos em Tempo Real
1. Mudanças nos inputs disparam recálculos
2. useMemo otimiza performance dos cálculos
3. Resultados são exibidos instantaneamente
4. Gráficos são atualizados dinamicamente

## Padrões Arquiteturais Utilizados

### 1. Component Composition
- Componentes pequenos e focados em responsabilidade única
- Reutilização através de props e composition
- Separação clara entre componentes de apresentação e lógica

### 2. Props Down, Events Up
- Dados fluem de componentes pai para filhos via props
- Eventos fluem de componentes filhos para pais via callbacks
- Estado centralizado no componente App

### 3. Custom Hooks Pattern
- Lógica reutilizável encapsulada em hooks customizados
- Separação de concerns entre UI e lógica de negócio
- Facilita testing e manutenção

### 4. Memoization Pattern
- useMemo para otimizar cálculos pesados
- Prevenção de re-renderizações desnecessárias
- Melhoria de performance da aplicação

## Otimizações de Performance

### 1. Memoization
```typescript
const availableModels = useMemo(() => {
  // Cálculo otimizado de modelos disponíveis
}, [selectedModels, favoriteModels, allModels]);
```

### 2. Lazy Loading
- Componentes carregados sob demanda
- Redução do bundle inicial

### 3. Efficient Re-renders
- Uso adequado de keys em listas
- Estado local quando apropriado
- Evitar prop drilling desnecessário

## Considerações de Segurança

### 1. API Key Management
- Chaves de API nunca expostas no frontend
- Uso de variáveis de ambiente
- Proxy através do backend quando necessário

### 2. Data Validation
- Validação de tipos em runtime
- Sanitização de inputs do usuário
- Tratamento de erros robusto

### 3. HTTPS Only
- Todas as comunicações via HTTPS
- Proteção contra man-in-the-middle attacks

## Escalabilidade

### Preparação para Crescimento
1. **State Management**: Estrutura preparada para migração para Redux/Zustand
2. **Component Library**: Base para criação de design system
3. **API Layer**: Abstração preparada para múltiplas APIs
4. **Testing**: Estrutura preparada para testes automatizados

### Pontos de Extensão
1. **Novos Provedores**: Fácil adição de novos provedores de LLM
2. **Funcionalidades**: Arquitetura modular permite novas features
3. **Internacionalização**: Estrutura preparada para i18n
4. **Themes**: Sistema de temas extensível