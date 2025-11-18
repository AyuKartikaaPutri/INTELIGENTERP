import React, { useState, useCallback } from 'react';
import { parseFile } from './services/fileParserService';
import { generateDashboardSummary, analyzeData } from './services/geminiService';
import { Sidebar } from './components/Sidebar';
import { FileUpload } from './components/FileUpload';
import { Dashboard } from './components/Dashboard';
import { DataTable } from './components/DataTable';
import { AnalysisPanel } from './components/AnalysisPanel';
import { StatusMessage } from './components/StatusMessage';
import type { TableData, DashboardMetric, ChartDefinition } from './types';
import { Header } from './components/Header';

type View = 'dashboard' | 'data_explorer' | 'ai_analyst';

export default function App() {
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'parsing' | 'generating' | 'analyzing'>('idle');
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetric[]>([]);
  const [chartDefinitions, setChartDefinitions] = useState<ChartDefinition[]>([]);
  
  const [analysisResult, setAnalysisResult] = useState<string>('');

  const handleFileSelect = useCallback(async (file: File) => {
    setStatus('parsing');
    setError(null);
    setTableData(null);
    setDashboardMetrics([]);
    setChartDefinitions([]);
    setAnalysisResult('');
    setFileName(file.name);

    try {
      const data = await parseFile(file);
      setTableData(data);
      setStatus('generating');
      const summary = await generateDashboardSummary(data);
      setDashboardMetrics(summary.metrics);
      setChartDefinitions(summary.charts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      handleReset();
    } finally {
      setStatus('idle');
    }
  }, []);

  const handleAnalyze = useCallback(async (prompt: string) => {
    if (!tableData) {
      setError('No data available to analyze. Please upload a file first.');
      return;
    }
    
    setStatus('analyzing');
    setError(null);
    setAnalysisResult('');

    try {
      const result = await analyzeData(prompt, tableData);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
      setAnalysisResult('');
    } finally {
      setStatus('idle');
    }
  }, [tableData]);

  const handleReset = () => {
    setTableData(null);
    setFileName('');
    setError(null);
    setAnalysisResult('');
    setDashboardMetrics([]);
    setChartDefinitions([]);
    setStatus('idle');
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    if (status === 'parsing') return <StatusMessage message="Parsing your file..." />;
    if (status === 'generating') return <StatusMessage message="Generating intelligent dashboard..." />;
    if (error) return <StatusMessage message={error} type="error" />;

    if (!tableData) {
        return (
             <div className="flex flex-col items-center justify-center h-full p-8">
                 <Header />
                 <div className="max-w-3xl w-full mx-auto mt-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-800">Intelligent ERP Dashboard</h2>
                        <p className="text-slate-500 mt-2">Upload an Excel (.xlsx, .xls) or .csv file to automatically generate insights.</p>
                    </div>
                    <FileUpload onFileSelect={handleFileSelect} disabled={status !== 'idle'} />
                 </div>
             </div>
        );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard metrics={dashboardMetrics} chartDefinitions={chartDefinitions} tableData={tableData} />;
      case 'data_explorer':
        return <DataTable data={tableData.data} headers={tableData.headers} />;
      case 'ai_analyst':
        return <AnalysisPanel onAnalyze={handleAnalyze} result={analysisResult} isLoading={status === 'analyzing'} />;
      default:
        return null;
    }
  }

  if (!tableData) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <main className="h-screen">
                {renderContent()}
            </main>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} onUploadNew={handleReset} />
        <div className="flex-1 flex flex-col">
            <header className="bg-white/60 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200">
                 <div className="p-4 sm:p-6">
                    <h1 className="text-xl font-bold text-slate-800">
                        {
                            {
                                'dashboard': 'AI-Powered Dashboard',
                                'data_explorer': 'Data Explorer',
                                'ai_analyst': 'AI Analyst'
                            }[currentView]
                        }
                    </h1>
                    <p className="text-sm text-slate-500">
                        {
                            {
                                'dashboard': `Showing insights for ${fileName}`,
                                'data_explorer': `Viewing raw data from ${fileName}`,
                                'ai_analyst': `Ask questions about ${fileName}`
                            }[currentView]
                        }
                    </p>
                 </div>
            </header>
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    </div>
  );
}