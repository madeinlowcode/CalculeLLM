# 🧮 CalculeLLM - Calculadora de Custos de LLMs

<div align="center">

![CalculeLLM Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

**A ferramenta definitiva para desenvolvedores e empresas otimizarem seus gastos com IA**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Latest-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

[🚀 Demo ao Vivo](https://ai.studio/apps/drive/1FTXYo598CxVjW_iSV8-9bAxNdjxtNvPA) • [📚 Documentação](./docs/) • [🔗 GitHub](https://github.com/madeinlowcode/CalculeLLM) • [💬 WhatsApp](https://chat.whatsapp.com/JAaqJzXz88f2K1WyOPXDdk)

</div>

## 📋 Sobre o Projeto

O **CalculeLLM** é uma aplicação web moderna desenvolvida em React com TypeScript que permite calcular e comparar custos de diferentes modelos de Large Language Models (LLMs) em tempo real. Ideal para desenvolvedores, empresas e pesquisadores que precisam tomar decisões baseadas em dados sobre o uso de IA.

### ✨ Principais Funcionalidades

- 🔄 **Comparação em Tempo Real**: Compare custos entre múltiplos modelos de LLM simultaneamente
- 📊 **Visualização Avançada**: Gráficos interativos e dashboards intuitivos
- 💱 **Conversão de Moeda**: Suporte a conversão USD/BRL com taxas personalizáveis
- ⭐ **Sistema de Favoritos**: Marque e organize seus modelos preferidos
- 🌓 **Tema Claro/Escuro**: Interface adaptável com preferências do usuário
- 📱 **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🔄 **Dados Atualizados**: Integração com API OpenRouter para preços em tempo real
- 💾 **Persistência Local**: Salva preferências no navegador

### 🎯 Para Quem é Este Projeto

- **Desenvolvedores**: Otimize custos de APIs de IA em seus projetos
- **Empresas**: Tome decisões estratégicas sobre investimentos em IA
- **Pesquisadores**: Compare eficiência de custo entre diferentes modelos
- **Estudantes**: Aprenda sobre precificação de modelos de linguagem

## 🚀 Quick Start

### Pré-requisitos

- **Node.js** 18.0 ou superior
- **npm** 8.0 ou superior
- **Git** (para clonar o repositório)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/madeinlowcode/CalculeLLM.git
cd CalculeLLM
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure variáveis de ambiente** (opcional)
```bash
# Crie o arquivo .env.local
echo "GEMINI_API_KEY=sua_chave_aqui" > .env.local
```

4. **Execute o projeto**
```bash
npm run dev
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

## 🏗️ Arquitetura e Tecnologias

### Stack Principal
- **Frontend**: React 19.1.1 + TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Estilização**: Tailwind CSS
- **Gráficos**: Recharts 3.2.0
- **Fonte de Dados**: OpenRouter API

### Estrutura do Projeto
```
CalculeLLM/
├── 📁 components/           # Componentes React reutilizáveis
│   ├── Header.tsx          # Cabeçalho com navegação
│   ├── ModelSelector.tsx   # Seleção de modelos
│   ├── ResultsDisplay.tsx  # Exibição de resultados
│   ├── ComparisonChart.tsx # Gráfico de comparação
│   └── icons/              # Ícones SVG
├── 📁 docs/                # Documentação completa
├── 📄 App.tsx              # Componente principal
├── 📄 types.ts             # Definições TypeScript
├── 📄 vite.config.ts       # Configurações Vite
└── 📄 package.json         # Dependências e scripts
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Gera build otimizado
npm run preview      # Preview do build local
```

## 📊 Funcionalidades Detalhadas

### 🎯 Seleção de Modelos
- Busca e filtro por nome ou provedor
- Sistema de favoritos persistente
- Informações detalhadas de cada modelo
- Ordenação por custo ou popularidade

### 💰 Cálculo de Custos
- Input personalizado de tokens (entrada/saída)
- Cálculo automático baseado em preços reais
- Comparação lado a lado
- Projeções para diferentes volumes

### 📈 Visualização de Dados
- Gráficos de barras interativos
- Cards individuais por modelo
- Resumo estatístico
- Export de resultados

### ⚙️ Configurações
- Taxa de conversão USD/BRL personalizável
- Tema claro/escuro
- Valores padrão configuráveis
- Persistência de preferências

## 🌐 Integrações

### OpenRouter API
- **Endpoint**: `https://openrouter.ai/api/v1/models`
- **Propósito**: Dados atualizados de modelos e preços
- **Frequência**: Atualização a cada sessão
- **Filtros**: Modelos com contexto válido e preços disponíveis

### Armazenamento Local
- **localStorage**: Favoritos e configurações do usuário
- **Sessão**: Estado temporário da aplicação

## 🚀 Deploy e Hospedagem

### Opções de Deploy

#### 1. AI Studio (Atual)
```bash
# Deploy automático via Git
# URL: https://ai.studio/apps/drive/1FTXYo598CxVjW_iSV8-9bAxNdjxtNvPA
```

#### 2. Vercel
```bash
npm i -g vercel
vercel --prod
```

#### 3. Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

#### 4. GitHub Pages
```yaml
# .github/workflows/deploy.yml incluído
```

### Variáveis de Ambiente

```bash
# Produção
VITE_APP_ENV=production
GEMINI_API_KEY=sua_chave_gemini

# Desenvolvimento
VITE_APP_ENV=development
GEMINI_API_KEY=chave_desenvolvimento
```

## 📚 Documentação Completa

Acesse a documentação detalhada na pasta [`docs/`](./docs/):

- [🏗️ Arquitetura do Sistema](./docs/arquitetura.md)
- [🧩 Componentes](./docs/componentes.md)
- [📁 Organização de Pastas](./docs/organizacao-pastas.md)
- [🔗 Integrações](./docs/integracoes.md)
- [🚀 Deploy](./docs/deploy.md)

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### 📋 Roadmap

- [ ] **v2.0**: Sistema de autenticação
- [ ] **v2.1**: Histórico de cálculos
- [ ] **v2.2**: API própria para caching
- [ ] **v2.3**: Alertas de preços
- [ ] **v2.4**: Relatórios em PDF
- [ ] **v2.5**: Integração com múltiplas APIs

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma [issue](https://github.com/madeinlowcode/CalculeLLM/issues) com:

- **Descrição** detalhada do problema
- **Passos** para reproduzir
- **Screenshots** (se aplicável)
- **Ambiente** (OS, browser, versão)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

<div align="center">

**Desenvolvido com ❤️ pela [Scrip7 Software](https://scrip7.com)**

CNPJ: 32.329.917/0001-20

[🌐 Website](https://scrip7.com) • [📧 Contato](mailto:contato@scrip7.com) • [💬 WhatsApp](https://chat.whatsapp.com/JAaqJzXz88f2K1WyOPXDdk)

</div>

## 🙏 Agradecimentos

- **OpenRouter** pelos dados de preços dos modelos
- **Google AI Studio** pela plataforma de deploy
- **Tailwind CSS** pelo sistema de design
- **Recharts** pelos componentes de gráficos
- **Vite** pela ferramenta de build ultrarrápida

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!**

[![GitHub stars](https://img.shields.io/github/stars/madeinlowcode/CalculeLLM?style=social)](https://github.com/madeinlowcode/CalculeLLM)

</div>