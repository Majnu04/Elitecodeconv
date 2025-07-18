import React from 'react';
import { HighlightedCode } from './HighlightedCode';
import { SparklesIcon } from './icons/SparklesIcon';
import { TrashIcon } from './icons/TrashIcon';
import { getHighlightLanguage } from '../utils/languageUtils';


interface CodeInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFormat: () => void;
  onClear: () => void;
  isFormatting: boolean;
  language: string;
  showFormatButton: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({ value, onChange, onFormat, onClear, isFormatting, language, showFormatButton }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-slate-700">
        <h2 className="font-semibold text-slate-300">{language} Code</h2>
        <div className="flex items-center gap-2">
            {showFormatButton && (
              <button
                onClick={onFormat}
                disabled={isFormatting || !value}
                className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-wait"
                aria-label="Format code"
              >
                {isFormatting ? (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <SparklesIcon className="h-4 w-4 text-purple-400" />
                )}
                <span>{isFormatting ? 'Formatting...' : 'Format PHP'}</span>
              </button>
            )}
             <button
              onClick={onClear}
              disabled={!value}
              className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors disabled:opacity-50"
              aria-label="Clear input"
            >
              <TrashIcon className="h-4 w-4 text-red-400" />
            </button>
        </div>
      </div>
      <div className="relative w-full flex-grow h-full min-h-[445px]">
        <HighlightedCode 
          code={value}
          onChange={onChange}
          language={getHighlightLanguage(language)}
          placeholder={`Enter your ${language} code here...`}
        />
      </div>
    </div>
  );
};