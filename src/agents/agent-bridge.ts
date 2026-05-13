import { EventBus } from '../event-bus';

export type SpecialistAgent = 'scout' | 'vulnhunter' | 'exploiter' | 'shadowops' | 'webbreaker' | 'airwave' | 'digitalwatcher' | 'cloudbreacher' | 'domainhunter' | 'humanphisher';

export class AgentBridge {
  private eventBus: EventBus;
  private integrationService: any = null;
  private connectedAgents = new Set<SpecialistAgent>(['scout', 'vulnhunter', 'exploiter', 'shadowops', 'webbreaker', 'airwave', 'digitalwatcher', 'cloudbreacher', 'domainhunter', 'humanphisher']);
  
  constructor(eventBus: EventBus) { this.eventBus = eventBus; }
  setIntegrationService(service: any) { this.integrationService = service; }
  getConnectedAgents(): SpecialistAgent[] { return Array.from(this.connectedAgents); }
  
  async triggerFromAgent(agent: SpecialistAgent, task: { action: string; target: string }): Promise<any> {
    console.log(`AgentBridge: ${agent} triggered with ${task.action}`);
    await this.eventBus.publish('agent.triggered', { agent, task, timestamp: Date.now() });
    if (this.integrationService) return this.integrationService.orchestrate({ agent, task });
    return { status: 'queued', agent, task };
  }
}