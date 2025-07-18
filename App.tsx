import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { CodeOutput } from './components/CodeOutput';
import { LanguageSelector } from './components/LanguageSelector';
import { ConvertButton } from './components/ConvertButton';
import { convertCodeStream, formatPhpCode } from './services/geminiService';
import { LANGUAGES, PHP_EXAMPLES } from './constants';
import { SwapIcon } from './components/icons/SwapIcon';
import { Footer } from './components/Footer';
import { getHighlightLanguage } from './utils/languageUtils';

const App: React.FC = () => {
  const [phpCode, setPhpCode] = useState<string>('');
  const [convertedCode, setConvertedCode] = useState<string>('');
  const [sourceLanguage, setSourceLanguage] = useState<string>('PHP');
  const [targetLanguage, setTargetLanguage] = useState<string>('JavaScript');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormatting, setIsFormatting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  const handleConvert = useCallback(async () => {
    if (!phpCode.trim()) {
      setError(`Please enter some ${sourceLanguage} code to convert.`);
      return;
    }
    if (sourceLanguage === targetLanguage) {
      setError('Source and target languages cannot be the same.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setConvertedCode('');
    try {
      await convertCodeStream(phpCode, sourceLanguage, targetLanguage, (chunk) => {
        setConvertedCode((prev) => prev + chunk);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [phpCode, sourceLanguage, targetLanguage]);

  const handleFormat = useCallback(async () => {
    if (!phpCode.trim()) {
      setError('Please enter some PHP code to format.');
      return;
    }
    setIsFormatting(true);
    setError(null);
    try {
      const formatted = await formatPhpCode(phpCode);
      setPhpCode(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsFormatting(false);
    }
  }, [phpCode]);

  const handleClear = () => {
    setPhpCode('');
  };
  
  const loadExample = (code: string) => {
    setPhpCode(code);
    setError(null);
    setConvertedCode('');
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-grow">
        <Header />
        <main className="mt-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <LanguageSelector
                label="From"
                languages={LANGUAGES}
                value={sourceLanguage}
                onChange={setSourceLanguage}
              />
              <button onClick={handleSwapLanguages} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-600" aria-label="Swap languages">
                  <SwapIcon className="h-5 w-5 text-slate-400" />
              </button>
              <LanguageSelector
                label="To"
                languages={LANGUAGES}
                value={targetLanguage}
                onChange={setTargetLanguage}
              />
            </div>
            <ConvertButton onClick={handleConvert} isLoading={isLoading} />
          </div>

          {sourceLanguage === 'PHP' && (
            <div className="text-center mb-6">
              <span className="text-slate-400 text-sm mr-2">No code? Try a PHP example:</span>
              <div className="inline-flex items-center gap-2 flex-wrap justify-center">
                {PHP_EXAMPLES.map(example => (
                  <button 
                    key={example.name} 
                    onClick={() => loadExample(example.code)}
                    className="px-3 py-1 text-xs font-semibold text-slate-200 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors"
                  >
                    {example.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg relative mb-6 max-w-4xl mx-auto" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-start">
            <CodeInput 
              value={phpCode} 
              onChange={(e) => setPhpCode(e.target.value)} 
              onFormat={handleFormat}
              onClear={handleClear}
              isFormatting={isFormatting}
              language={sourceLanguage}
              showFormatButton={sourceLanguage === 'PHP'}
            />
            <div className="hidden lg:flex items-center justify-center h-full pt-20">
                <SwapIcon className="h-12 w-12 text-slate-500" />
            </div>
            <CodeOutput 
              code={convertedCode} 
              isLoading={isLoading} 
              language={targetLanguage}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;