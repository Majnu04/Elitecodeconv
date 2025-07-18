import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 text-center py-4">
      <p className="text-sm text-slate-400">
        Developed by{' '}
        <a 
          href="https://www.elitedigitalsolutions.tech/" 
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-slate-300 hover:text-blue-400 transition-colors"
        >
          Elite Digital Solutions
        </a>
      </p>
    </footer>
  );
};