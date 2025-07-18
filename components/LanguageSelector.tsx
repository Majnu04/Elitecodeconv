import React from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface LanguageSelectorProps {
  languages: string[];
  value: string;
  onChange: (language: string) => void;
  label: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, value, onChange, label }) => {
  return (
    <div className="relative w-full">
      <select
        id={`select-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full bg-slate-800 border border-slate-600 text-slate-200 font-semibold py-3 pl-4 pr-10 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        aria-label={`${label} language`}
      >
        {languages.map(lang => (
          <option key={lang} value={lang} className="bg-slate-800 text-slate-200 font-semibold">
            {lang}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
        <ChevronDownIcon className="h-5 w-5" />
      </div>
    </div>
  );
};