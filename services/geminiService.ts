import { GoogleGenAI, Type } from "@google/genai";
import type { TableData, DashboardMetric, ChartDefinition, ChartData } from '../types';

declare const marked: { parse(markdown: string): string; };

const getAi = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const convertToCSV = (data: TableData, limit: number = 200): string => {
  const header = data.headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',');
  const rows = data.data.slice(0, limit).map(row => 
    row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(',')
  );
  return [header, ...rows].join('\n');
}

export const generateDashboardSummary = async (data: TableData): Promise<{ metrics: DashboardMetric[], charts: ChartDefinition[] }> => {
    const ai = getAi();
    const csvSample = convertToCSV(data, 50); // Send a sample of data

    const prompt = `
You are an expert BI (Business Intelligence) analyst for an ERP system.
Analyze this sample of data from a user's uploaded file and generate a summary for a dashboard.

**Instructions:**
1.  Identify 3-4 key metrics that are important for a business user. Examples: Total Revenue, Average Sale Amount, Total Units Sold, Number of Transactions, etc.
2.  For each metric, provide a label, the calculated value (formatted nicely, e.g., with commas or currency symbols), and a brief description.
3.  Suggest 2-3 useful charts that could be created from this data. Examples: "Sales by Region", "Revenue Over Time", "Product Category Distribution".
4.  For each chart, provide a title, a type (only 'bar' is supported for now), and a concise prompt that I can use to ask you (in a future request) to generate the data for this chart.

**Data Sample (CSV format):**
---
${csvSample}
---
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        metrics: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    label: { type: Type.STRING },
                                    value: { type: Type.STRING },
                                    description: { type: Type.STRING }
                                },
                                required: ["label", "value", "description"]
                            }
                        },
                        charts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    type: { type: Type.STRING, enum: ["bar"] },
                                    prompt: { type: Type.STRING }
                                },
                                required: ["title", "type", "prompt"]
                            }
                        }
                    },
                    required: ["metrics", "charts"]
                }
            }
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Gemini API call for dashboard summary failed:", error);
        throw new Error("Failed to generate the AI dashboard summary. The data might not be in a recognizable format.");
    }
};

export const generateChart = async (prompt: string, data: TableData): Promise<ChartData> => {
    const ai = getAi();
    const csvData = convertToCSV(data, 500); // Larger sample for charting

    const fullPrompt = `
You are a data visualization expert. Based on the user's request and the provided data, generate a single, complete, and valid SVG string for a bar chart.

**SVG Requirements:**
- Must be a single valid SVG element string. No extra explanations.
- Width should be responsive (e.g., width="100%"). A viewBox is required.
- Use a professional and clean color palette. (e.g., shades of slate and indigo).
- Include labels for the X and Y axes.
- Make the bars interactive with a <title> element for tooltips.
- Add subtle animations for the bars appearing.
- The entire response must be ONLY the SVG code.

**User Request:** "${prompt}"

**Dataset (CSV format):**
---
${csvData}
---
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: fullPrompt,
        });
        
        // Clean the response to ensure it's a valid SVG string
        const svgText = response.text.trim().replace(/```svg/g, '').replace(/```/g, '');
        return { svg: svgText };
    } catch (error) {
        console.error("Gemini API call for chart failed:", error);
        throw new Error("Failed to generate the chart visualization.");
    }
}

export const analyzeData = async (prompt: string, data: TableData): Promise<string> => {
    const ai = getAi();
    const csvData = convertToCSV(data);
    const truncatedCsvData = csvData.length > 100000 ? csvData.substring(0, 100000) + "\n... (data truncated)" : csvData;

    const fullPrompt = `
You are an expert data analyst for an advanced ERP system. 
Your task is to analyze the provided dataset based on the user's request.
Provide a clear, concise, and insightful analysis. Format your response using Markdown (e.g., for tables, lists, bold text).

User Request: "${prompt}"

Dataset (in CSV format):
---
${truncatedCsvData}
---
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: fullPrompt,
        });
        // Use marked to convert markdown to HTML
        return marked.parse(response.text);
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to get a response from the AI model. Please check the console for details.");
    }
};