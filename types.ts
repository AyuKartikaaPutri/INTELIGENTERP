export type TableData = {
  headers: string[];
  data: string[][];
};

export type DashboardMetric = {
  label: string;
  value: string;
  description: string;
};

export type ChartDefinition = {
  title: string;
  type: 'bar' | 'line' | 'pie'; // Expandable
  prompt: string; // The prompt to send to Gemini to get chart data/svg
};

export type ChartData = {
  svg: string; // Gemini will return an SVG string
};