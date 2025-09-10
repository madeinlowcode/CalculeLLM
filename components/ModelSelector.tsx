import React, { useState, useRef, useEffect } from 'react';
import { LLM } from '../types';
import { PlusIcon, SearchIcon, XIcon, StarIcon } from './icons/UtilityIcons';

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

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModels, availableModels, onAddModel, onRemoveModel, favoriteModels, onToggleFavorite, isLoading, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredModels = availableModels.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  
  const handleSelectModel = (model: LLM) => {
    onAddModel(model);
    setSearchTerm('');
    setIsOpen(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-slate-500 dark:text-slate-400 p-2">Carregando modelos...</p>;
    }
    if (error) {
      return <p className="text-red-500 p-2">Erro ao carregar modelos: {error}</p>;
    }
    return (
      <div ref={wrapperRef} className="relative">
        <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500">
           <SearchIcon className="h-5 w-5 text-slate-400 mx-3" />
           <input
            type="text"
            placeholder="Adicionar modelo para comparar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="w-full bg-transparent p-2.5 pr-4 focus:outline-none text-slate-700 dark:text-slate-200"
          />
        </div>
        {isOpen && filteredModels.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
            <ul>
              {filteredModels.map(model => {
                const isFavorite = favoriteModels.includes(model.id);
                return (
                  <li key={model.id}
                      onClick={() => handleSelectModel(model)}
                      className="p-3 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/50 flex justify-between items-center transition-colors">
                    <div className="flex items-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(model.id);
                        }}
                        className="mr-3 p-1 rounded-full text-slate-400 hover:text-amber-500"
                        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      >
                        <StarIcon isFilled={isFavorite} className={`w-5 h-5 ${isFavorite ? 'text-amber-400' : ''}`} />
                      </button>
                      <div>
                        <span className="font-medium text-slate-800 dark:text-slate-100">{model.name}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">{model.provider}</span>
                      </div>
                    </div>
                    <PlusIcon className="h-5 w-5 text-indigo-500" />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Selecionar Modelos</h2>
      {renderContent()}
      <div className="mt-4 flex flex-wrap gap-2">
        {selectedModels.map(model => (
          <span key={model.id} className="flex items-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 text-sm font-medium px-2.5 py-1 rounded-full">
            {model.name}
            <button onClick={() => onRemoveModel(model)} className="ml-1.5 p-0.5 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800/60 focus:outline-none">
              <XIcon className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;