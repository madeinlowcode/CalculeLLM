import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear() + 1; // As per request for 2025
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-16">
      <div className="container mx-auto px-4 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
        <div className="flex flex-col items-center space-y-4">
            {/* Logo */}
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              🧮 Calcule LLMs
            </h2>
            {/* Description */}
            <p className="max-w-md">
              Plataforma gratuita para calcular e comparar custos de modelos de linguagem. Otimize seus gastos com IA de forma inteligente.
            </p>
            
            <div className="space-y-2 pt-4">
                 <p>
                    Valores de precificação fornecidos pela API da{' '}
                    <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-500 hover:underline">
                    OpenRouter
                    </a>.
                </p>
                <p>
                    Feito com <span className="text-red-500">❤️</span> pela <strong className="font-semibold text-slate-600 dark:text-slate-300">Scrip7 Software</strong> utilizando{' '}
                    <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-500 hover:underline">
                    Google AI Studio
                    </a>.
                </p>
                 <p className="text-xs text-slate-400 dark:text-slate-500 pt-1">
                    CNPJ: 32.329.917/0001-20
                </p>
            </div>
            {/* Copyright */}
             <p className="text-xs text-slate-400 dark:text-slate-500 pt-4">
                &copy; {currentYear} Calcule LLMs. Todos os direitos reservados.
             </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;