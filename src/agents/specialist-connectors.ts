import { AgentBridge } from './agent-bridge';
import { SpecialistAgent } from '../services/agent-dispatcher';

export class SpecialistConnectors {
  private bridge: AgentBridge;

  constructor(bridge: AgentBridge) {
    this.bridge = bridge;
  }

  async triggerScout(task: { action: string; target: string }): Promise<any> {
    return this.bridge.triggerFromAgent('scout', task);
  }

  async triggerVulnHunter(task: { action: string; target: string }): Promise<any> {
    return this.bridge.triggerFromAgent('vulnhunter', task);
  }

  async triggerExploiter(task: { action: string; target: string }): Promise<any> {
    return this.bridge.triggerFromAgent('exploiter', task);
  }

  async triggerShadowOps(task: { action: string; target: string }): Promise<any> {
    return this.bridge.triggerFromAgent('shadowops', task);
  }

  async triggerWebBreaker(task: { action: string; target: string }): Promise<any> {
    return this.bridge.triggerFromAgent('webbreaker', task);
  }

  async triggerAirWave(task: { action: string; target: string }): Promise<any> {
    return this.bridge.triggerFromAgent('airwave', task);
  }

  async triggerDigitalWatcher(task: { action: string; target: string }): Promise<any> {
    return this.bridge.triggerFromAgent('digitalwatcher', task);
  }

  async triggerCloudBreacher(task: { action: string; target: string }): Promise<any> {
    return this.bridge.triggerFromAgent('cloudbreacher', task);
  }

  async triggerDomainHunter(task: { action: string; target: string }): Promise<any> {
    return this.bridge.triggerFromAgent('domainhunter', task);
  }

  async triggerHumanPhisher(task: { action: string; target: string }): Promise<any> {
    return this.bridge.triggerFromAgent('humanphisher', task);
  }
}