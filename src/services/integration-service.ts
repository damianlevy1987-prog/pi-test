import { EventBus } from '../event-bus';
import { ResearchService } from './research-service';
import { ContextService } from './context-service';
import { AgentDispatcher, SpecialistAgent, DispatchRequest } from './agent-dispatcher';

export type InteractionMode = 'agent-triggered' | 'user-driven' | 'hybrid' | 'autonomous';

export interface OrchestrationRequest {
  agent?: SpecialistAgent;
  task: {
    action: string;
    target: string;
    parameters?: any;
  };
  options?: {
    sources?: string[];
    contextType?: string;
  };
}

export class IntegrationService {
  private eventBus: EventBus;
  private researchService: ResearchService;
  private contextService: ContextService;
  private agentDispatcher: AgentDispatcher;

  constructor(
    eventBus: EventBus,
    researchService: ResearchService,
    contextService: ContextService,
    agentDispatcher: AgentDispatcher
  ) {
    this.eventBus = eventBus;
    this.researchService = researchService;
    this.contextService = contextService;
    this.agentDispatcher = agentDispatcher;

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.eventBus.subscribe('research.request', async (payload: any) => {
      return this.handleResearchRequest(payload);
    });

    this.eventBus.subscribe('context.build', async (payload: any) => {
      return this.handleContextBuild(payload);
    });
  }

  private async handleResearchRequest(payload: any): Promise<any> {
    return this.researchService.handleRequest(payload);
  }

  private async handleContextBuild(payload: any): Promise<any> {
    return this.contextService.buildContext(payload);
  }

  async orchestrate(request: OrchestrationRequest): Promise<any> {
    const sources = request.options?.sources || ['web', 'database'];
    
    // Step 1: Research
    const researchResults = await this.researchService.handleRequest({
      topic: request.task.target,
      sources,
      options: {}
    });

    // Step 2: Build Context
    const context = await this.contextService.buildContext({
      agent_id: request.agent || 'scout',
      topic: request.task.target,
      inputs: {
        research_results: researchResults.results,
        target_data: request.task
      }
    });

    // Step 3: Dispatch to Agent
    const dispatchResult = await this.agentDispatcher.dispatch(request.agent || 'scout', {
      context,
      task: request.task
    });

    return {
      research: researchResults,
      context,
      dispatch: dispatchResult
    };
  }

  async handleInteraction(mode: InteractionMode, payload: any): Promise<any> {
    switch (mode) {
      case 'agent-triggered':
        return this.handleAgentTriggered(payload);
      case 'user-driven':
        return this.handleUserDriven(payload);
      case 'hybrid':
        return this.handleHybrid(payload);
      case 'autonomous':
        return this.handleAutonomous(payload);
      default:
        throw new Error(`Unknown interaction mode: ${mode}`);
    }
  }

  private async handleAgentTriggered(payload: any): Promise<any> {
    return this.orchestrate({ task: payload.task, agent: payload.agent });
  }

  private async handleUserDriven(payload: any): Promise<any> {
    return this.orchestrate({ task: payload.task, options: payload.options });
  }

  private async handleHybrid(payload: any): Promise<any> {
    return this.orchestrate({ task: payload.task, agent: payload.agent, options: payload.options });
  }

  private async handleAutonomous(payload: any): Promise<any> {
    return this.orchestrate({ task: payload.task, agent: payload.suggestedAgent });
  }
}