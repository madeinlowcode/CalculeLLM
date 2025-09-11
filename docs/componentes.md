# Documentação dos Componentes

## Visão Geral

A aplicação é construída com uma arquitetura de componentes modular, onde cada componente tem uma responsabilidade específica e bem definida. Todos os componentes são desenvolvidos em TypeScript e seguem as melhores práticas do React.

## Estrutura de Componentes

```
components/
├── Header.tsx              # Cabeçalho com navegação e toggle de tema
├── ModelSelector.tsx       # Seleção e gerenciamento de modelos
├── ConfigurationPanel.tsx  # Painel de configuração de tokens e moeda
├── ResultsDisplay.tsx      # Exibição de resultados e comparações
├── Summary.tsx            # Resumo dos cálculos
├── ComparisonChart.tsx    # Gráfico de comparação
├── CostCard.tsx           # Card individual de custo por modelo
├── CostInput.tsx          # Input para valores de custo
├── CurrencyConverter.tsx  # Conversor de moeda
├── Footer.tsx             # Rodapé da aplicação
└── icons/
    ├── SocialIcons.tsx    # Ícones sociais
    ├── ThemeIcons.tsx     # Ícones de tema
    └── UtilityIcons.tsx   # Ícones utilitários
```

## Componentes Principais

### 1. App.tsx
**Localização**: `/App.tsx`  
**Responsabilidade**: Componente raiz que gerencia o estado global da aplicação

#### Props
Não recebe props (componente raiz)

#### Estado Gerenciado
```typescript
- theme: Theme                    // Tema atual (light/dark)
- allModels: LLM[]               // Todos os modelos disponíveis
- selectedModels: LLM[]          // Modelos selecionados para comparação
- isLoading: boolean             // Estado de carregamento
- error: string | null           // Mensagens de erro
- conversionRate: string         // Taxa de conversão USD/BRL
- inputTokens: string            // Número de tokens de entrada
- outputTokens: string           // Número de tokens de saída
- favoriteModels: string[]       // IDs dos modelos favoritos
```

#### Principais Funcionalidades
- Fetch de modelos da API OpenRouter
- Gerenciamento de tema claro/escuro
- Persistência de favoritos no localStorage
- Gerenciamento de estado global

---

### 2. Header.tsx
**Localização**: `/components/Header.tsx`  
**Responsabilidade**: Cabeçalho da aplicação com navegação e controles de tema

#### Props
```typescript
interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}
```

#### Funcionalidades
- Toggle entre tema claro e escuro
- Logo e branding da aplicação
- Links para redes sociais
- Responsividade para mobile

---

### 3. ModelSelector.tsx
**Localização**: `/components/ModelSelector.tsx`  
**Responsabilidade**: Interface para seleção e gerenciamento de modelos LLM

#### Props
```typescript
interface ModelSelectorProps {
  selectedModels: LLM[];
  availableModels: LLM[];
  onAddModel: (model: LLM) => void;
  onRemoveModel: (model: LLM) => void;
  favoriteModels: string[];
  onToggleFavorite: (modelId: string) => void;
  isLoading: boolean;
  error: string | null;
}
```

#### Funcionalidades
- Lista de modelos disponíveis com busca
- Sistema de favoritos
- Adição/remoção de modelos para comparação
- Filtros por provedor
- Ordenação por popularidade/custo
- Estados de loading e erro

---

### 4. ConfigurationPanel.tsx
**Localização**: `/components/ConfigurationPanel.tsx`  
**Responsabilidade**: Painel de configuração para tokens e conversão de moeda

#### Props
```typescript
interface ConfigurationPanelProps {
  inputTokens: string;
  outputTokens: string;
  setInputTokens: (value: string) => void;
  setOutputTokens: (value: string) => void;
  conversionRate: string;
  setConversionRate: (value: string) => void;
}
```

#### Funcionalidades
- Input para número de tokens de entrada
- Input para número de tokens de saída
- Configuração de taxa de conversão USD/BRL
- Validação de inputs numéricos
- Presets para valores comuns

---

### 5. ResultsDisplay.tsx
**Localização**: `/components/ResultsDisplay.tsx`  
**Responsabilidade**: Exibição dos resultados de comparação de custos

#### Props
```typescript
interface ResultsDisplayProps {
  selectedModels: LLM[];
  inputTokens: number;
  outputTokens: number;
  favoriteModels: string[];
  onToggleFavorite: (modelId: string) => void;
  conversionRate: string;
}
```

#### Funcionalidades
- Cálculo automático de custos
- Exibição em cards individuais
- Gráfico de comparação
- Resumo consolidado
- Ordenação por custo
- Export de resultados

---

## Componentes de Apoio

### 6. CostCard.tsx
**Responsabilidade**: Card individual mostrando custos de um modelo específico

#### Props
```typescript
interface CostCardProps {
  model: LLM;
  calculation: Calculation;
  isFavorite: boolean;
  onToggleFavorite: (modelId: string) => void;
  conversionRate: string;
}
```

#### Funcionalidades
- Exibição de custo por modelo
- Breakdown de custos (input/output)
- Indicador de favorito
- Conversão de moeda
- Comparação relativa

---

### 7. ComparisonChart.tsx
**Responsabilidade**: Gráfico de barras para comparação visual de custos

#### Props
```typescript
interface ComparisonChartProps {
  calculations: Calculation[];
  conversionRate: string;
}
```

#### Funcionalidades
- Gráfico de barras responsivo
- Comparação visual de custos
- Tooltip com detalhes
- Cores distintas por provedor
- Animações suaves

---

### 8. Summary.tsx
**Responsabilidade**: Resumo estatístico dos modelos selecionados

#### Props
```typescript
interface SummaryProps {
  calculations: Calculation[];
  conversionRate: string;
}
```

#### Funcionalidades
- Modelo mais barato/caro
- Custo médio
- Economia potencial
- Estatísticas comparativas

---

### 9. CurrencyConverter.tsx
**Responsabilidade**: Componente para conversão de moeda

#### Props
```typescript
interface CurrencyConverterProps {
  conversionRate: string;
  setConversionRate: (rate: string) => void;
}
```

#### Funcionalidades
- Input para taxa de conversão
- Validação de formato numérico
- Atualização automática de cotação (futuro)

---

### 10. Footer.tsx
**Responsabilidade**: Rodapé da aplicação com informações e links

#### Props
Não recebe props

#### Funcionalidades
- Links para redes sociais
- Informações de copyright
- Links úteis
- Informações do projeto

---

## Componentes de Ícones

### SocialIcons.tsx
- Ícones para GitHub, WhatsApp, etc.
- Utilizados no Header e Footer

### ThemeIcons.tsx
- Ícones de sol/lua para toggle de tema
- Estados light/dark

### UtilityIcons.tsx
- Ícones utilitários (estrela, lixeira, etc.)
- Utilizados em diversos componentes

## Padrões de Design Utilizados

### 1. Compound Components
Componentes que trabalham juntos para formar funcionalidades complexas:
```typescript
<ModelSelector>
  <ModelList />
  <SearchInput />
  <FilterButtons />
</ModelSelector>
```

### 2. Render Props / Children as Function
Para componentes flexíveis e reutilizáveis:
```typescript
<DataFetcher>
  {({ data, loading, error }) => (
    <ModelList models={data} loading={loading} error={error} />
  )}
</DataFetcher>
```

### 3. Higher-Order Components (HOCs)
Para funcionalidades transversais como loading e error handling.

### 4. Custom Hooks
Extração de lógica reutilizável:
```typescript
const useModels = () => {
  // Lógica de fetch e gerenciamento de modelos
};
```

## Convenções de Código

### 1. Naming
- Componentes: PascalCase (`ModelSelector`)
- Props interfaces: `ComponentNameProps`
- Handlers: `handle*` ou `on*`

### 2. File Structure
```typescript
// Imports (bibliotecas externas primeiro)
import React from 'react';
import { LLM } from '../types';

// Interface de props
interface ComponentProps {
  // props
}

// Componente principal
const Component: React.FC<ComponentProps> = ({ props }) => {
  // Estado local
  // Efeitos
  // Handlers
  // Render
};

export default Component;
```

### 3. Props Validation
- Uso de TypeScript para validação estática
- Destructuring de props no parâmetro da função
- Props opcionais com valores padrão

### 4. Estado Local vs Global
- Estado global: dados compartilhados entre componentes
- Estado local: dados específicos do componente
- Preferência por estado local quando possível

## Performance e Otimização

### 1. Memoization
- React.memo para componentes puros
- useMemo para cálculos pesados
- useCallback para funções estáveis

### 2. Lazy Loading
- Componentes carregados sob demanda
- Suspense boundaries para loading states

### 3. Virtual Scrolling
- Para listas longas de modelos
- Melhor performance com muitos itens

### 4. Debouncing
- Inputs de busca e filtros
- Redução de requisições desnecessárias