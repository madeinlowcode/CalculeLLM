export interface LLM {
  id: string;
  name: string;
  provider: string;
  inputPricePerMillion: number; // Price per 1 million input tokens in USD
  outputPricePerMillion: number; // Price per 1 million output tokens in USD
  contextWindow: number;
}

export interface Calculation extends LLM {
  inputCost: number;
  outputCost: number;
  totalCost: number;
}