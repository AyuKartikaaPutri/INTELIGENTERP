import React from 'react';
import { Icons } from './Icons';

type View = 'dashboard' | 'data_explorer' | 'ai_analyst';

interface SidebarProps {
    currentView: View;
    setCurrentView: (view: View) => void;
    onUploadNew: () => void;
}

const NavLink: React.FC<{
    // FIX: Replaced JSX.Element with React.ReactElement to resolve namespace error.
    icon: React.ReactElement;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
    const baseClasses = "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200";
    const activeClasses = "bg-slate-200 text-slate-900";
    const inactiveClasses = "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900";

    return (
        <li>
            <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                {icon}
                <span className="ml-3">{label}</span>
            </a>
        </li>
    );
};


export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, onUploadNew }) => {
    return (
        <nav className="w-64 bg-white/80 backdrop-blur-md border-r border-slate-200 p-4 flex flex-col">
            <div className="flex items-center px-2 mb-6">
                <Icons.logo className="h-8 w-8 text-indigo-600"/>
                <span className="ml-3 text-lg font-bold text-slate-800">Intelligent ERP</span>
            </div>

            <ul className="space-y-1.5 flex-1">
                <NavLink 
                    icon={<Icons.dashboard className="h-5 w-5" />}
                    label="Dashboard"
                    isActive={currentView === 'dashboard'}
                    onClick={() => setCurrentView('dashboard')}
                />
                 <NavLink 
                    icon={<Icons.table className="h-5 w-5" />}
                    label="Data Explorer"
                    isActive={currentView === 'data_explorer'}
                    onClick={() => setCurrentView('data_explorer')}
                />
                 <NavLink 
                    icon={<Icons.analyst className="h-5 w-5" />}
                    label="AI Analyst"
                    isActive={currentView === 'ai_analyst'}
                    onClick={() => setCurrentView('ai_analyst')}
                />
            </ul>

            <div className="mt-auto">
                 <button 
                    onClick={onUploadNew}
                    className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    <Icons.upload className="h-5 w-5 mr-2"/>
                    Upload New File
                </button>
            </div>
        </nav>
    )
}