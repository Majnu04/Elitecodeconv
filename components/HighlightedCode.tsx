import React, { useEffect, useRef } from 'react';

// Make hljs available in the scope from the CDN script in index.html
declare const hljs: any;

interface HighlightedCodeProps {
  code: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  language: string;
  placeholder?: string;
}

export const HighlightedCode: React.FC<HighlightedCodeProps> = ({ code, onChange, language, placeholder }) => {
  const codeRef = useRef<HTMLElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (codeRef.current) {
        // Use highlight.js to apply syntax highlighting, ignoring illegals for robustness
        codeRef.current.innerHTML = hljs.highlight(code, { language: language, ignoreIllegals: true }).value;
    }
  }, [code, language]);

  // Sync scrolling between textarea and pre
  const handleScroll = () => {
    if (codeRef.current?.parentElement && textareaRef.current) {
        codeRef.current.parentElement.scrollTop = textareaRef.current.scrollTop;
        codeRef.current.parentElement.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  return (
    <div className="relative w-full h-full">
      <textarea
        ref={textareaRef}
        value={code}
        onChange={onChange}
        onScroll={handleScroll}
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        className="absolute inset-0 w-full h-full p-4 font-mono text-sm bg-transparent text-transparent resize-none border-0 outline-none overflow-auto z-10 whitespace-pre-wrap caret-slate-100 placeholder:text-slate-500"
        placeholder={placeholder}
        aria-label="Code Input"
      />
      <pre className="w-full h-full p-4 overflow-auto pointer-events-none absolute inset-0 bg-slate-800 rounded-b-lg" aria-hidden="true">
        <code
          ref={codeRef}
          className={`language-${language} font-mono text-sm whitespace-pre-wrap`}
        />
      </pre>
    </div>
  );
};