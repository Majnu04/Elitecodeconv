import React, { useState, useEffect, useRef } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import { getHighlightLanguage } from '../utils/languageUtils';

// Make hljs available in the scope from the CDN script in index.html
declare const hljs: any;

interface CodeOutputProps {
  code: string;
  isLoading: boolean;
  language: string;
}

const LoadingSpinner: React.FC = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80 rounded-b-lg z-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
);


export const CodeOutput: React.FC<CodeOutputProps> = ({ code, isLoading, language }) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const languageClass = getHighlightLanguage(language);

  useEffect(() => {
    if (codeRef.current && code) {
      // Use highlight.js to apply syntax highlighting
      // Use `ignoreIllegals: true` to prevent errors on partial code streams
      codeRef.current.innerHTML = hljs.highlight(code, { language: languageClass, ignoreIllegals: true }).value;
    } else if (codeRef.current) {
        // Clear content if code is empty
        codeRef.current.innerHTML = '';
    }
  }, [code, languageClass]);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);
  
  useEffect(() => {
    // Reset copied state when code or language changes
    setIsCopied(false);
  }, [code, language]);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-slate-700">
        <h2 className="font-semibold text-slate-300">{language} Code</h2>
        <button
          onClick={handleCopy}
          disabled={!code || isLoading}
          className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Copy converted code"
        >
          {isCopied ? <CheckIcon className="h-4 w-4 text-green-400" /> : <CopyIcon className="h-4 w-4 text-slate-400" />}
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="relative w-full flex-grow h-full min-h-[445px]">
        {isLoading && !code && <LoadingSpinner />}
        <pre className="w-full h-full p-4 overflow-auto bg-transparent rounded-b-lg">
          <code
            ref={codeRef}
            className={`language-${languageClass} font-mono text-sm whitespace-pre-wrap`}
          >
            {/* Content set via innerHTML */}
          </code>
          {!code && !isLoading && (
            <span className="absolute top-4 left-4 font-mono text-sm text-slate-500 pointer-events-none">
              Converted code will appear here...
            </span>
          )}
        </pre>
      </div>
    </div>
  );
};