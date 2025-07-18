/**
 * Maps a language name to the corresponding class name for highlight.js.
 * @param lang The language name (e.g., "C#", "React (JSX)").
 * @returns The highlight.js compatible language class name.
 */
export const getHighlightLanguage = (lang: string): string => {
  const l = lang.toLowerCase();
  switch (l) {
    case 'react (jsx)':
      return 'jsx';
    case 'c#':
      return 'csharp';
    case 'c++':
      return 'cpp';
    default:
      return l;
  }
};
