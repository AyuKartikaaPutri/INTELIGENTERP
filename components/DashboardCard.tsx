import React from 'react';
import type { DashboardMetric } from '../types';

interface DashboardCardProps {
    metric: DashboardMetric;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ metric }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500">{metric.label}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900 tracking-tight">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-500">{metric.description}</p>
        </div>
    );
};