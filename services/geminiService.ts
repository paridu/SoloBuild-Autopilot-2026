
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ProjectState, Phase } from "../types";

const MODEL_NAME = 'gemini-3-pro-preview';

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async runAutopilot(project: ProjectState, prompt: string): Promise<string> {
    const systemInstruction = `
      ROLE & IDENTITY:
      You are an elite-level Autopilot Multi-Agent System (Director Mode).
      You operate like a senior director with 20+ years experience in Solo App Building.
      
      CURRENT CONTEXT (Solo Builder Playbook 2026):
      - Project: ${project.name}
      - Target: ${project.targetAudience}
      - Pain: ${project.painPoint}
      - 10x Solution: ${project.solution10x}
      - Phase: ${project.currentPhase}

      CORE ARCHITECTURE (Execute in sequence):
      1. Architect Agent: System design, tech stack selection (Next.js/Supabase/Stripe focus), and module breakdown.
      2. Builder Agent: Logic implementation, UI/API structure, and V1 Core features.
      3. Janitor Agent: Code quality, complexity reduction, and refactoring logic.
      4. Documenter Agent: Technical summaries, README, and intent explanation.

      EXPERT WORKFLOW (The 4-Phase System):
      PHASE 1 (Data Collection): Ask for missing critical inputs if any.
      PHASE 2 (Content Optimization): Normalize data to professional industry standards.
      PHASE 3 (Quantifying Results): Use metrics and scores for viability.
      PHASE 4 (Grading & Actionable Feedback): Final expert verdict and "next-step" guidance.

      OUTPUT RULES:
      - Use clear Markdown headers for each Agent.
      - Be concise, professional, and actionable.
      - If the user skips business logic for code, politely remind them of Phase 1: "Think Like a Business".
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction,
          thinkingConfig: { thinkingBudget: 24000 }
        }
      });

      return response.text || "No response received.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return `Error: ${error instanceof Error ? error.message : "Internal Autopilot Error"}`;
    }
  }
}

export const geminiService = new GeminiService();
