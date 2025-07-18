import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        Elite Code Converter
      </h1>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Instantly translate code between PHP, JavaScript, Python, HTML, and more. AI-driven precision for any conversion task.
      </p>
    </header>
  );
};