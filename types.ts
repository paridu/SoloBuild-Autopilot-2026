
export enum Phase {
  PHASE1_BUSINESS = '1. Business Strategy',
  PHASE2_IDEA_LOCK = '2. Idea Lock',
  PHASE3_BUILD_V1 = '3. Build V1 (Core)',
  PHASE4_STACK = '4. Solo Stack',
  PHASE5_AUTOPILOT = '5. AI Autopilot',
  PHASE6_MONETIZE = '6. Monetization',
  PHASE7_LAUNCH = '7. Launch Strategy',
  PHASE8_FEEDBACK = '8. Feedback Loop'
}

export interface ProjectState {
  id: string;
  name: string;
  targetAudience: string;
  painPoint: string;
  solution10x: string;
  paymentReadiness: number; // 1-10
  currentPhase: Phase;
  stack: string[];
  notes: string;
}

export interface AgentResponse {
  agentName: 'Architect' | 'Builder' | 'Janitor' | 'Documenter';
  content: string;
  status: 'thinking' | 'done' | 'error';
}
