import React from 'react';

interface DataTableProps {
  headers: string[];
  data: string[][];
}

export const DataTable: React.FC<DataTableProps> = ({ headers, data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        {headers.map((header, index) => (
                            <th 
                                key={index} 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
         {data.length === 0 && (
            <p className="p-6 text-center text-slate-500">No data to display in the table.</p>
        )}
    </div>
  );
};