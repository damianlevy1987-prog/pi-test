import { EventBus } from '../event-bus';
import { IntegrationService } from '../services/integration-service';
import { SpecialistAgent } from '../services/agent-dispatcher';

export class AgentBridge {
  private eventBus: EventBus;
  private integrationService: IntegrationService | null = null;
  private connectedAgents: Set<SpecialistAgent> = new Set([
    'scout', 'vulnhunter', 'exploiter', 'shadowops', 'webbreaker',
    'airwave', 'digitalwatcher', 'cloudbreacher', 'domainhunter', 'humanphisher'
  ]);

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  setIntegrationService(service: IntegrationService): void {
    this.integrationService = service;
  }

  getConnectedAgents(): SpecialistAgent[] {
    return Array.from(this.connectedAgents);
  }

  async triggerFromAgent(agent: SpecialistAgent, task: { action: string; target: string }): Promise<any> {
    console.log(`AgentBridge: ${agent} triggered with task ${task.action}`);
    
    await this.eventBus.publish('agent.triggered', {
      agent,
      task,
      timestamp: Date.now()
    });

    if (this.integrationService) {
      return this.integrationService.orchestrate({
        agent,
        task,
        options: { sources: ['web', 'database'] }
      });
    }

    return { status: 'queued', agent, task };
  }

  async receiveFromAgent(agent: SpecialistAgent, payload: any): Promise<any> {
    console.log(`AgentBridge: received from ${agent}`);
    
    await this.eventBus.publish('agent.response', {
      agent,
      payload,
      timestamp: Date.now()
    });

    return { status: 'received', agent };
  }
}