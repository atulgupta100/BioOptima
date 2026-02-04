
import { GoogleGenAI, Type } from "@google/genai";
import { ExperimentRun, AiSuggestion } from "../types";

// Always use the named parameter and process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiOptimizationSuggestion = async (
  history: ExperimentRun[],
  targetGoal: string
): Promise<AiSuggestion> => {
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: `As a world-class Bioprocessing AI, analyze the following experimental history and suggest the next round of optimizations to reach the goal: ${targetGoal}.
    
    Current History:
    ${JSON.stringify(history, null, 2)}
    
    Suggest 3 new experimental runs with specific parameters (mediaType, temperature, ph, dissolvedOxygen, glucoseFeedRate).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reasoning: { type: Type.STRING },
          suggestedRuns: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    mediaType: { type: Type.STRING },
                    temperature: { type: Type.NUMBER },
                    ph: { type: Type.NUMBER },
                    dissolvedOxygen: { type: Type.NUMBER },
                    glucoseFeedRate: { type: Type.NUMBER }
                  }
                }
              }
            }
          },
          predictions: {
            type: Type.OBJECT,
            properties: {
              expectedYieldGain: { type: Type.STRING },
              confidenceScore: { type: Type.NUMBER }
            }
          }
        },
        required: ["reasoning", "suggestedRuns", "predictions"]
      }
    }
  });

  // Extract text directly from property and parse JSON safely
  return JSON.parse(response.text || '{}');
};
