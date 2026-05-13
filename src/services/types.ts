export interface ResearchRequest {
  topic: string;
  sources: string[];
  options?: {
    depth?: 'shallow' | 'deep';
    timeout?: number;
    filters?: string[];
  };
}

export interface ResearchResult {
  topic: string;
  results: any[];
  metadata: {
    sources_used: string[];
    duration: number;
    items_found: number;
  };
}

export interface ContextBuildRequest {
  agent_id: string;
  topic: string;
  inputs: {
    research_results?: any[];
    target_data?: any;
    session_data?: any;
  };
}
