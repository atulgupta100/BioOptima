
export interface ExperimentRun {
  id: string;
  round: number;
  parameters: {
    mediaType: string;
    temperature: number;
    ph: number;
    dissolvedOxygen: number;
    glucoseFeedRate: number;
  };
  results?: {
    yield: number;
    purity: number;
    titer: number;
    viability: number;
  };
  status: 'planned' | 'in-progress' | 'completed';
  timestamp: string;
}

export interface OptimizationMetrics {
  currentYield: number;
  targetYield: number;
  percentImprovement: number;
  costSaved: number;
  weeksSaved: number;
}

export interface AiSuggestion {
  reasoning: string;
  suggestedRuns: Partial<ExperimentRun>[];
  predictions: {
    expectedYieldGain: string;
    confidenceScore: number;
  };
}
