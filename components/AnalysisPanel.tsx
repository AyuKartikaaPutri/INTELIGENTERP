import React, { useState } from 'react';
import { Spinner } from './Spinner';

interface AnalysisPanelProps {
  onAnalyze: (prompt: string) => void;
  result: string;
  isLoading: boolean;
}

const suggestedPrompts = [
    "Summarize this data.",
    "Identify key trends or anomalies.",
    "What are the most important insights from this data?",
    "Generate a report based on these figures."
];

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ onAnalyze, result, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onAnalyze(prompt);
    }
  };

  const handleSuggestedPromptClick = (suggestedPrompt: string) => {
      setPrompt(suggestedPrompt);
      onAnalyze(suggestedPrompt);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 space-y-4">
          <form onSubmit={handleSubmit}>
            <label htmlFor="analysis-prompt" className="block text-md font-semibold text-slate-800 mb-2">
              Ask the AI Analyst
            </label>
            <textarea
              id="analysis-prompt"
              rows={4}
              className="block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 'What is the total sales for each region?'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
            <div className="mt-3 text-sm text-slate-600">
              Suggestions:
              <div className="flex flex-wrap gap-2 mt-2">
                  {suggestedPrompts.map(p => (
                       <button
                          key={p}
                          type="button"
                          onClick={() => handleSuggestedPromptClick(p)}
                          disabled={isLoading}
                          className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                          {p}
                      </button>
                  ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="mt-5 w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading && <Spinner />}
              {isLoading ? 'Analyzing...' : 'Submit Query'}
            </button>
          </form>
        </div>
      </div>
      {(isLoading || result) && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
             <div className="p-6">
                <h4 className="text-md font-semibold text-slate-800 mb-4">Analyst Response</h4>
                <div className="prose prose-sm max-w-none min-h-[100px]">
                    {isLoading && !result && <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-slate-200 rounded w-3/4"></div><div className="space-y-2"><div className="h-4 bg-slate-200 rounded"></div><div className="h-4 bg-slate-200 rounded w-5/6"></div></div></div></div>}
                    {result && <div dangerouslySetInnerHTML={{__html: result}}/>}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};