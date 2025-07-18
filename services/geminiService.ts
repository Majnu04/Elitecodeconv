import { GoogleGenAI } from "@google/genai";
import { getHighlightLanguage } from "../utils/languageUtils";

// TypeScript: add type for import.meta.env
interface ImportMeta {
  env: {
    VITE_GEMINI_API_KEY: string;
  };
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const handleError = (error: unknown, context: string): never => {
  console.error(`Error in ${context}:`, error);
  if (error instanceof Error) {
      throw new Error(`Failed during ${context}: ${error.message}`);
  }
  throw new Error(`An unexpected error occurred during ${context}.`);
};

/**
 * Converts code from a source language to a target language using a streaming response.
 */
export const convertCodeStream = async (
  code: string, 
  sourceLanguage: string,
  targetLanguage: string,
  onStream: (chunk: string) => void
): Promise<void> => {
  const prompt = `
    You are an expert code converter. Your task is to convert the following ${sourceLanguage} code into ${targetLanguage}.
    
    IMPORTANT INSTRUCTIONS:
    1.  Provide ONLY the raw, converted code for ${targetLanguage}.
    2.  DO NOT include any explanations, comments about the conversion, or introductions like "Here is the converted code:".
    3.  DO NOT wrap the code in markdown backticks (e.g., \`\`\`${getHighlightLanguage(targetLanguage)}\`\`\`).
    4.  Ensure the output is clean and ready to be directly compiled or executed.
    5.  Preserve the original logic, structure, and functionality as closely as possible in the target language.

    ${sourceLanguage} Code to Convert:
    \`\`\`${getHighlightLanguage(sourceLanguage)}
    ${code}
    \`\`\`
    `;

  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.1,
      }
    });

    for await (const chunk of response) {
      if (chunk.text !== undefined) {
        onStream(chunk.text);
      }
    }
  } catch (error) {
    handleError(error, 'code conversion stream');
  }
};

/**
 * Formats PHP code according to PSR-12 standards.
 */
export const formatPhpCode = async (phpCode: string): Promise<string | undefined> => {
    const prompt = `
    You are an expert PHP code formatter. Your task is to format the following PHP code according to the PSR-12 standard.
    
    IMPORTANT INSTRUCTIONS:
    1.  Provide ONLY the raw, formatted PHP code.
    2.  DO NOT include any explanations or introductions.
    3.  DO NOT wrap the code in markdown backticks.

    PHP Code to Format:
    \`\`\`php
    ${phpCode}
    \`\`\`
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.0,
            }
        });
        return response.text?.trim();
    } catch (error) {
        handleError(error, 'code formatting');
    }
};