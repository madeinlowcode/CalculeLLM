# Organização de Pastas e Estrutura do Projeto

## Estrutura Geral do Repositório

```
CalculeLLM/
├── .git/                    # Controle de versão Git
├── .gitignore              # Arquivos ignorados pelo Git
├── node_modules/           # Dependências npm
├── docs/                   # 📁 Documentação do projeto
├── components/             # 📁 Componentes React
├── package.json            # Configurações npm e scripts
├── package-lock.json       # Lock file das dependências
├── tsconfig.json          # Configurações TypeScript
├── vite.config.ts         # Configurações do Vite
├── index.html             # Template HTML principal
├── index.tsx              # Ponto de entrada da aplicação
├── App.tsx                # Componente raiz da aplicação
├── types.ts               # Definições de tipos TypeScript
├── constants.ts           # Constantes da aplicação
├── metadata.json          # Metadados do projeto
└── README.md              # Documentação inicial
```

## Detalhamento das Pastas

### 📁 Pasta Raiz (`/`)

#### Arquivos de Configuração
- **`package.json`**: Manifesto do projeto com dependências e scripts
- **`package-lock.json`**: Versões exatas das dependências instaladas
- **`tsconfig.json`**: Configurações do compilador TypeScript
- **`vite.config.ts`**: Configurações do bundler Vite
- **`.gitignore`**: Arquivos e pastas ignorados pelo Git

#### Arquivos de Entrada
- **`index.html`**: Template HTML principal da SPA
- **`index.tsx`**: Ponto de entrada do React (renderização inicial)
- **`App.tsx`**: Componente raiz da aplicação

#### Arquivos de Definições
- **`types.ts`**: Interfaces e tipos TypeScript
- **`constants.ts`**: Constantes da aplicação (atualmente vazio)
- **`metadata.json`**: Metadados do projeto para AI Studio

### 📁 `/components` - Componentes React

Organização modular de todos os componentes da interface:

```
components/
├── Header.tsx              # Cabeçalho da aplicação
├── Footer.tsx              # Rodapé da aplicação
├── ModelSelector.tsx       # Selecionador de modelos LLM
├── ConfigurationPanel.tsx  # Painel de configurações
├── ResultsDisplay.tsx      # Exibição de resultados
├── Summary.tsx            # Resumo dos cálculos
├── ComparisonChart.tsx    # Gráfico de comparação
├── CostCard.tsx           # Card de custo individual
├── CostInput.tsx          # Input de valores de custo
├── CurrencyConverter.tsx  # Conversor de moeda
└── icons/                 # Subpasta de ícones
    ├── SocialIcons.tsx    # Ícones de redes sociais
    ├── ThemeIcons.tsx     # Ícones de tema
    └── UtilityIcons.tsx   # Ícones utilitários
```

### 📁 `/docs` - Documentação

Documentação completa do projeto em português brasileiro:

```
docs/
├── README.md              # Índice da documentação
├── arquitetura.md         # Arquitetura do sistema
├── componentes.md         # Documentação dos componentes
├── organizacao-pastas.md  # Este arquivo
├── integracoes.md         # APIs e integrações
└── deploy.md              # Guia de deployment
```

### 📁 `/node_modules` - Dependências

Pasta gerenciada automaticamente pelo npm contendo todas as dependências do projeto.

### 📁 `/.git` - Controle de Versão

Pasta do Git contendo histórico de commits e configurações de versionamento.

## Convenções de Nomenclatura

### 1. Arquivos e Pastas
- **Componentes React**: PascalCase (ex: `ModelSelector.tsx`)
- **Arquivos de configuração**: kebab-case (ex: `tsconfig.json`)
- **Pastas**: camelCase (ex: `components/`)
- **Documentação**: kebab-case (ex: `organizacao-pastas.md`)

### 2. Estrutura de Arquivos TypeScript/React

```typescript
// 1. Imports externos
import React, { useState, useEffect } from 'react';
import { ExternalLibrary } from 'external-lib';

// 2. Imports internos
import { LLM } from '../types';
import { CONSTANTS } from '../constants';

// 3. Tipos e interfaces
interface ComponentProps {
  // definições
}

// 4. Componente principal
const Component: React.FC<ComponentProps> = (props) => {
  // implementação
};

// 5. Export default
export default Component;
```

### 3. Organização de Imports
1. Bibliotecas externas (React, bibliotecas npm)
2. Módulos internos (types, utils, constants)
3. Componentes locais
4. Arquivos de estilo (quando aplicável)

## Padrões de Organização

### 1. Separação por Funcionalidade
- Cada componente em arquivo separado
- Agrupamento de ícones em subpasta
- Documentação separada por tema

### 2. Colocation
- Tipos relacionados próximos ao código que os usa
- Componentes específicos próximos aos que os consomem
- Utilitários próximos à funcionalidade principal

### 3. Escalabilidade
A estrutura atual suporta crescimento através de:

```
components/
├── ui/                    # Componentes básicos reutilizáveis
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── features/              # Componentes específicos de features
│   ├── models/
│   ├── calculations/
│   └── charts/
├── layout/                # Componentes de layout
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
└── icons/                 # Ícones (atual)
```

## Critérios de Organização

### 1. Por Responsabilidade
- **UI Components**: Componentes reutilizáveis de interface
- **Feature Components**: Componentes específicos de funcionalidades
- **Layout Components**: Componentes de estrutura de página
- **Utility Components**: Componentes auxiliares

### 2. Por Complexidade
- **Atomic**: Componentes simples (botões, inputs)
- **Molecular**: Componentes compostos (formulários, cards)
- **Organismal**: Componentes complexos (seções completas)
- **Templates**: Estruturas de página
- **Pages**: Páginas completas

### 3. Por Reusabilidade
- **Shared**: Componentes usados em múltiplos lugares
- **Feature-specific**: Componentes específicos de uma funcionalidade
- **Page-specific**: Componentes específicos de uma página

## Arquivos de Configuração Detalhados

### `package.json`
```json
{
  "name": "llm-cost-calculator",
  "scripts": {
    "dev": "vite",           // Servidor de desenvolvimento
    "build": "vite build",   // Build de produção
    "preview": "vite preview" // Preview do build
  },
  "dependencies": {
    "react": "^19.1.1",     // Framework principal
    "react-dom": "^19.1.1", // DOM binding
    "recharts": "^3.2.0"    // Biblioteca de gráficos
  }
}
```

### `tsconfig.json`
Configurações do TypeScript para:
- Compilação ES modules
- Strict mode habilitado
- Support para JSX
- Resolução de módulos Node

### `vite.config.ts`
Configurações do Vite para:
- Variáveis de ambiente (GEMINI_API_KEY)
- Alias de paths (@/ para raiz)
- Build optimization

## Boas Práticas Implementadas

### 1. Estrutura Clara e Intuitiva
- Nomes descritivos para arquivos e pastas
- Agrupamento lógico de funcionalidades
- Separação clara entre código e configuração

### 2. Manutenibilidade
- Um componente por arquivo
- Imports organizados e limpos
- Documentação próxima ao código

### 3. Escalabilidade
- Estrutura preparada para crescimento
- Padrões consistentes
- Separação de responsabilidades

### 4. Colaboração
- Convenções claras de nomenclatura
- Estrutura autodocumentada
- Fácil navegação para novos desenvolvedores

## Recomendações para Expansão

### 1. Para Projetos Maiores
```
src/
├── components/
│   ├── ui/           # Design system
│   ├── features/     # Feature-specific
│   └── layout/       # Layout components
├── hooks/            # Custom hooks
├── utils/            # Utility functions
├── services/         # API services
├── store/            # State management
├── styles/           # Global styles
└── tests/            # Test files
```

### 2. Para Múltiplas Features
- Organização por domínios/features
- Barrel exports para facilitar imports
- Lazy loading para componentes pesados

### 3. Para Teams Maiores
- Lint rules para estrutura de pastas
- Generators para novos componentes
- Documentação automatizada