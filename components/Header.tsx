import React from 'react';
import { Icons } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center text-slate-800">
        <Icons.logo className="h-8 w-8" />
        <h1 className="ml-3 text-2xl font-bold tracking-tight">
          Intelligent ERP
        </h1>
    </header>
  );
};