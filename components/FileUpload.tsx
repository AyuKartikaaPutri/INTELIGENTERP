import React, { useState, useCallback } from 'react';
import { Icons } from './Icons';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const baseClasses = "relative block w-full border-2 border-dashed rounded-xl p-12 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 bg-white shadow-sm";
  const inactiveClasses = "border-slate-300 hover:border-indigo-400";
  const activeClasses = "border-indigo-600 bg-indigo-50";

  return (
    <div
      className={`${baseClasses} ${isDragging ? activeClasses : inactiveClasses}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleChange}
        accept=".xlsx, .xls, .csv"
        disabled={disabled}
      />
      <div className="flex flex-col items-center">
        <Icons.upload className="mx-auto h-12 w-12 text-slate-400" />
        <span className="mt-4 block text-base font-medium text-slate-800">
          <span className="text-indigo-600 font-semibold">Click to upload</span> or drag and drop
        </span>
        <p className="mt-1 text-sm text-slate-500">
          XLSX, XLS, or CSV file
        </p>
      </div>
    </div>
  );
};