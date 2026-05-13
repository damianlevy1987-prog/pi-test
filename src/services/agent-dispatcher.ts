import { EventBus } from '../event-bus';

export type SpecialistAgent = 
  | 'scout' | 'vulnhunter' | 'exploiter' | 'shadowops' | 'webbreaker'
  | 'airwave' | 'digitalwatcher' | 'cloudbreacher' | 'domainhunter' | 'humanphisher';

export interface DispatchRequest {
  agent: SpecialistAgent;
  context: any;
  task: {
    action: string;
    target: string;
    parameters?: any;
  };
}

export interface DispatchResponse {
  status: 'success' | 'failed';
  agent: SpecialistAgent;
  result?: any;
  error?: string;
}

export class AgentDispatcher {
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  async dispatch(agent: SpecialistAgent, request: { context: any; task: any }): Promise<DispatchResponse> {
    console.log(`AgentDispatcher: dispatching to ${agent}`);
    
    try {
      await this.eventBus.publish('dispatch.to.agent', {
        agent,
        context: request.context,
        task: request.task
      });

      return {
        status: 'success',
        agent,
        result: { message: `Dispatched to ${agent}` }
      };
    } catch (error) {
      return {
        status: 'failed',
        agent,
        error: String(error)
      };
    }
  }

  getAvailableAgents(): SpecialistAgent[] {
    return ['scout', 'vulnhunter', 'exploiter', 'shadowops', 'webbreaker', 
            'airwave', 'digitalwatcher', 'cloudbreacher', 'domainhunter', 'humanphisher'];
  }
}