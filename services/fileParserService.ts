
import type { TableData } from '../types';

declare const XLSX: any;

export const parseFile = (file: File): Promise<TableData> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided.'));
    }

    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];

    if (!validTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.xls') && !file.name.endsWith('.xlsx')) {
        return reject(new Error('Invalid file type. Please upload an Excel or CSV file.'));
    }

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        if (!event.target?.result) {
            throw new Error("File could not be read.");
        }
        const data = new Uint8Array(event.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Using `sheet_to_json` with header: 1 to get an array of arrays
        const jsonData: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

        if (jsonData.length === 0) {
            throw new Error("The uploaded file is empty or could not be read correctly.");
        }
        
        // The first row is the headers
        const headers = jsonData[0];
        // The rest of the rows are the data
        const tableData = jsonData.slice(1);

        resolve({ headers, data: tableData });
      } catch (error) {
        reject(new Error('Failed to parse the file. Please ensure it is a valid Excel or CSV file.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading the file.'));
    };

    reader.readAsArrayBuffer(file);
  });
};
