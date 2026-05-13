import { AgentBridge } from './agent-bridge';

export class SpecialistConnectors {
  private bridge: AgentBridge;
  constructor(bridge: AgentBridge) { this.bridge = bridge; }
  async triggerScout(task: any) { return this.bridge.triggerFromAgent('scout', task); }
  async triggerVulnHunter(task: any) { return this.bridge.triggerFromAgent('vulnhunter', task); }
  async triggerExploiter(task: any) { return this.bridge.triggerFromAgent('exploiter', task); }
  async triggerShadowOps(task: any) { return this.bridge.triggerFromAgent('shadowops', task); }
  async triggerWebBreaker(task: any) { return this.bridge.triggerFromAgent('webbreaker', task); }
  async triggerAirWave(task: any) { return this.bridge.triggerFromAgent('airwave', task); }
  async triggerDigitalWatcher(task: any) { return this.bridge.triggerFromAgent('digitalwatcher', task); }
  async triggerCloudBreacher(task: any) { return this.bridge.triggerFromAgent('cloudbreacher', task); }
  async triggerDomainHunter(task: any) { return this.bridge.triggerFromAgent('domainhunter', task); }
  async triggerHumanPhisher(task: any) { return this.bridge.triggerFromAgent('humanphisher', task); }
}