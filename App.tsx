import React, { useState, useEffect, useMemo } from 'react';
import { LLM } from './types';
import Header from './components/Header';
import ModelSelector from './components/ModelSelector';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import ConfigurationPanel from './components/ConfigurationPanel';

type Theme = 'light' | 'dark';

// Helper to capitalize the first letter of a string
const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [allModels, setAllModels] = useState<LLM[]>([]);
  const [selectedModels, setSelectedModels] = useState<LLM[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [conversionRate, setConversionRate] = useState<string>('5.4');
  const [inputTokens, setInputTokens] = useState<string>('1000000');
  const [outputTokens, setOutputTokens] = useState<string>('1000000');


  const [favoriteModels, setFavoriteModels] = useState<string[]>(() => {
    try {
      const savedFavorites = localStorage.getItem('favoriteModels');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/models');
        if (!response.ok) {
          throw new Error(`Failed to fetch models: ${response.statusText}`);
        }
        const data = await response.json();
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
        
        setAllModels(models);
        // Set some default models for demonstration
        const defaultModel1 = models.find(m => m.id === 'openai/gpt-4o');
        const defaultModel2 = models.find(m => m.id === 'google/gemini-1.5-flash');
        setSelectedModels([defaultModel1, defaultModel2].filter(Boolean) as LLM[]);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchModels();
  }, []);


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem('favoriteModels', JSON.stringify(favoriteModels));
  }, [favoriteModels]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleFavorite = (modelId: string) => {
    setFavoriteModels(prevFavorites =>
      prevFavorites.includes(modelId)
        ? prevFavorites.filter(id => id !== modelId)
        : [...prevFavorites, modelId]
    );
  };

  const availableModels = useMemo(() => {
    const selectedModelIds = new Set(selectedModels.map(m => m.id));
    return allModels
      .filter(m => !selectedModelIds.has(m.id))
      .sort((a, b) => {
        const aIsFav = favoriteModels.includes(a.id);
        const bIsFav = favoriteModels.includes(b.id);
        if (aIsFav && !bIsFav) return -1;
        if (!aIsFav && bIsFav) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [selectedModels, favoriteModels, allModels]);
  
  const addModel = (model: LLM) => {
    if (!selectedModels.find(m => m.id === model.id)) {
      setSelectedModels([...selectedModels, model]);
    }
  };

  const removeModel = (model: LLM) => {
    setSelectedModels(selectedModels.filter(m => m.id !== model.id));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Calcule e Compare Custos de LLMs
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                A ferramenta definitiva para desenvolvedores e empresas otimizarem seus gastos com IA. Selecione os modelos, insira os tokens e tome decisões baseadas em dados.
            </p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <ModelSelector 
              selectedModels={selectedModels}
              availableModels={availableModels}
              onAddModel={addModel}
              onRemoveModel={removeModel}
              favoriteModels={favoriteModels}
              onToggleFavorite={toggleFavorite}
              isLoading={isLoading}
              error={error}
            />
            <ConfigurationPanel
              inputTokens={inputTokens}
              outputTokens={outputTokens}
              setInputTokens={setInputTokens}
              setOutputTokens={setOutputTokens}
              conversionRate={conversionRate}
              setConversionRate={setConversionRate}
            />
          </div>
          <div className="lg:col-span-3">
            <ResultsDisplay
              selectedModels={selectedModels}
              inputTokens={parseInt(inputTokens) || 0}
              outputTokens={parseInt(outputTokens) || 0}
              favoriteModels={favoriteModels}
              onToggleFavorite={toggleFavorite}
              conversionRate={conversionRate}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;