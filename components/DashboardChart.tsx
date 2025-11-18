import React, { useState, useEffect } from 'react';
import { generateChart } from '../services/geminiService';
import type { ChartDefinition, TableData, ChartData } from '../types';

interface DashboardChartProps {
    definition: ChartDefinition;
    tableData: TableData;
}

export const DashboardChart: React.FC<DashboardChartProps> = ({ definition, tableData }) => {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChartData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await generateChart(definition.prompt, tableData);
                setChartData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Could not load chart");
            } finally {
                setIsLoading(false);
            }
        };

        fetchChartData();
    }, [definition, tableData]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="animate-pulse flex flex-col justify-between h-full p-4">
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-slate-200 rounded"></div>
                        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                        <div className="h-4 bg-slate-200 rounded w-4/6"></div>
                    </div>
                </div>
            )
        }

        if (error) {
            return <p className="text-red-500 text-sm p-4">{error}</p>
        }

        if (chartData) {
            return <div className="p-4" dangerouslySetInnerHTML={{ __html: chartData.svg }} />;
        }

        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[300px] flex flex-col">
            <h3 className="text-md font-semibold text-slate-800 p-4 border-b border-slate-200">{definition.title}</h3>
            <div className="flex-1 flex items-center justify-center">
                {renderContent()}
            </div>
        </div>
    );
};