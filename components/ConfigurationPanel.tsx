import React from 'react';

interface ConfigurationPanelProps {
  inputTokens: string;
  outputTokens: string;
  setInputTokens: (value: string) => void;
  setOutputTokens: (value: string) => void;
  conversionRate: string;
  setConversionRate: (rate: string) => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  inputTokens,
  outputTokens,
  setInputTokens,
  setOutputTokens,
  conversionRate,
  setConversionRate
}) => {
  
  const handleTokenInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '');
    setter(numericValue);
  };

  const formatTokenNumber = (value: string) => {
    const number = parseInt(value, 10);
    return isNaN(number) ? '' : number.toLocaleString('pt-BR');
  }

  const handleRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setConversionRate(value);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Personalize seu Cálculo</h2>
      <div className="space-y-6">
        {/* Token Inputs */}
        <div className="space-y-4">
            <div>
              <label htmlFor="input-tokens" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tokens de Entrada (Prompt)
              </label>
              <input
                type="text"
                inputMode="numeric"
                id="input-tokens"
                value={formatTokenNumber(inputTokens)}
                onChange={handleTokenInputChange(setInputTokens)}
                placeholder="Ex: 1.000.000"
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-slate-200"
              />
            </div>
            <div>
              <label htmlFor="output-tokens" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tokens de Saída (Completion)
              </label>
              <input
                type="text"
                inputMode="numeric"
                id="output-tokens"
                value={formatTokenNumber(outputTokens)}
                onChange={handleTokenInputChange(setOutputTokens)}
                placeholder="Ex: 1.000.000"
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-slate-200"
              />
            </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-700"></div>

        {/* Currency Converter */}
        <div>
            <label htmlFor="conversion-rate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Taxa de conversão (USD para local)
            </label>
            <input
            type="text"
            inputMode="decimal"
            id="conversion-rate"
            value={conversionRate}
            onChange={handleRateInputChange}
            placeholder="Ex: 5.45"
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-slate-200"
            />
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;
