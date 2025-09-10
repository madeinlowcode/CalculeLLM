import React from 'react';
import { SunIcon, MoonIcon } from './icons/ThemeIcons';
import { GitHubIcon, WhatsAppIcon } from './icons/SocialIcons';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              🧮 Calcule LLMs
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="GitHub Repository">
                <GitHubIcon className="w-5 h-5" />
            </a>
            <a href="https://chat.whatsapp.com/JAaqJzXz88f2K1WyOPXDdk" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="WhatsApp Group">
                <WhatsAppIcon className="w-5 h-5 fill-current" />
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;