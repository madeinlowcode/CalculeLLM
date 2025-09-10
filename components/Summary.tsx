import React from 'react';
import { Calculation } from '../types';

interface SummaryProps {
  calculations: Calculation[];
  conversionRate: number;
}

const formatUSD = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
};

const formatLocalCurrency = (value: number, rate: number) => {
    if (isNaN(rate) || rate <= 0) return '';
    const convertedValue = value * rate;
    return ` (~${convertedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`;
};

const Summary: React.FC<SummaryProps> = ({ calculations, conversionRate }) => {
  if (calculations.length === 0) {
    return null;
  }

  const cheapest = calculations[0]; // Already sorted in ResultsDisplay

  return (
    <div className="bg-indigo-50 dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-indigo-200 dark:border-slate-700">
      <h2 className="text-xl font-semibold mb-2 text-indigo-800 dark:text-indigo-100">Resumo da Comparação</h2>
      <p className="text-indigo-700 dark:text-indigo-200 leading-relaxed">
        Com base nos modelos e tokens selecionados, a opção mais econômica é o{' '}
        <strong className="font-bold">{cheapest.name}</strong>, 
        com um custo total de{' '}
        <strong className="font-bold text-green-600 dark:text-green-400">
          {formatUSD(cheapest.totalCost)}
          <span className="text-sm font-medium">{formatLocalCurrency(cheapest.totalCost, conversionRate)}</span>
        </strong>.
      </p>
    </div>
  );
};

export default Summary;