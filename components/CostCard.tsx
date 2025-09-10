import React from 'react';
import { Calculation } from '../types';
import { StarIcon } from './icons/UtilityIcons';

interface CostCardProps {
  calculation: Calculation;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  conversionRate: number;
}

const formatUSD = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    });
};

const formatLocalCurrency = (value: number, rate: number) => {
    if (isNaN(rate) || rate <= 0) return null;
    const convertedValue = value * rate;
    return (
        <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
            (~{convertedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
        </span>
    );
};


const formatNumber = (value: number) => {
    return value.toLocaleString('pt-BR');
};


const CostCard: React.FC<CostCardProps> = ({ calculation, isFavorite, onToggleFavorite, conversionRate }) => {
  const { name, provider, contextWindow, inputCost, outputCost, totalCost } = calculation;

  return (
    <div className="bg-white dark:bg-slate-800/50 p-5 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600 flex flex-col">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">{name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{provider}</p>
        </div>
        <button 
            onClick={onToggleFavorite} 
            className="p-1.5 -mr-1 -mt-1 rounded-full text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
            <StarIcon isFilled={isFavorite} className={`w-5 h-5 ${isFavorite ? 'text-amber-400' : ''}`} />
        </button>
      </div>

       <div className="mt-4 text-right">
            <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">
                Contexto: {formatNumber(contextWindow)}
            </span>
        </div>
      
      <div className="mt-4 space-y-3 flex-grow flex flex-col justify-end">
        <div>
            <div className="flex justify-between items-baseline">
                <span className="text-sm text-slate-600 dark:text-slate-300">Entrada</span>
                <span className="font-medium text-slate-800 dark:text-slate-100">{formatUSD(inputCost)}{formatLocalCurrency(inputCost, conversionRate)}</span>
            </div>
            <div className="flex justify-between items-baseline mt-2">
                <span className="text-sm text-slate-600 dark:text-slate-300">Saída</span>
                <span className="font-medium text-slate-800 dark:text-slate-100">{formatUSD(outputCost)}{formatLocalCurrency(outputCost, conversionRate)}</span>
            </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-2">
            <div className="flex justify-between items-baseline">
                <span className="text-base font-semibold text-slate-700 dark:text-slate-200">Custo Total</span>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{formatUSD(totalCost)}{formatLocalCurrency(totalCost, conversionRate)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CostCard;