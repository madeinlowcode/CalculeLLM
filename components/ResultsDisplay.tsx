import React from 'react';
import { LLM } from '../types';
import ComparisonChart from './ComparisonChart';
import CostCard from './CostCard';
import Summary from './Summary';

interface ResultsDisplayProps {
  selectedModels: LLM[];
  inputTokens: number;
  outputTokens: number;
  favoriteModels: string[];
  onToggleFavorite: (modelId: string) => void;
  conversionRate: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ selectedModels, inputTokens, outputTokens, favoriteModels, onToggleFavorite, conversionRate }) => {
  const numericRate = parseFloat(conversionRate) || 0;

  const calculations = selectedModels.map(model => {
    const inputCost = (inputTokens / 1_000_000) * model.inputPricePerMillion;
    const outputCost = (outputTokens / 1_000_000) * model.outputPricePerMillion;
    const totalCost = inputCost + outputCost;
    return { ...model, inputCost, outputCost, totalCost };
  }).sort((a,b) => a.totalCost - b.totalCost);

  if (selectedModels.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
        <p className="text-slate-500 dark:text-slate-400 text-center">Selecione um ou mais modelos para visualizar os custos e iniciar a comparação.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Summary calculations={calculations} conversionRate={numericRate} />
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100 px-2">Gráfico Comparativo de Custos (USD)</h2>
        <div className="h-80 w-full">
          <ComparisonChart data={calculations} conversionRate={numericRate} />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Detalhes de Custo por Modelo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculations.map(calc => (
            <CostCard 
              key={calc.id} 
              calculation={calc}
              isFavorite={favoriteModels.includes(calc.id)}
              onToggleFavorite={() => onToggleFavorite(calc.id)}
              conversionRate={numericRate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;