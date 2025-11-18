import React from 'react';
import type { DashboardMetric, ChartDefinition, TableData } from '../types';
import { DashboardCard } from './DashboardCard';
import { DashboardChart } from './DashboardChart';

interface DashboardProps {
    metrics: DashboardMetric[];
    chartDefinitions: ChartDefinition[];
    tableData: TableData;
}

export const Dashboard: React.FC<DashboardProps> = ({ metrics, chartDefinitions, tableData }) => {
    return (
        <div className="space-y-6">
            {metrics.length > 0 && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                        <DashboardCard key={index} metric={metric} />
                    ))}
                </div>
            )}

            {chartDefinitions.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {chartDefinitions.map((chartDef, index) => (
                        <DashboardChart key={index} definition={chartDef} tableData={tableData} />
                    ))}
                </div>
            )}
        </div>
    );
};