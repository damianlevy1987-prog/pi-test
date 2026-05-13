// CLI for AI OS Security Operations
// Usage: npx ts-node src/cli/index.ts <command> [args]

import { EventBus } from '../event-bus';
import { ResearchService } from '../services/research-service';
import { ContextService } from '../services/context-service';
import { AgentDispatcher } from '../services/agent-dispatcher';
import { IntegrationService } from '../services/integration-service';

// Initialize services
const eventBus = new EventBus();
const researchService = new ResearchService(eventBus);
const contextService = new ContextService(eventBus);
const agentDispatcher = new AgentDispatcher(eventBus);
const integrationService = new IntegrationService(
  eventBus, 
  researchService, 
  contextService, 
  agentDispatcher
);

type Command = 'research' | 'context' | 'dispatch' | 'agents' | 'help';

function printUsage(): void {
  console.log(`
AI OS Security Operations CLI

Usage:
  node src/cli/index.js <command> [args]

Commands:
  research <topic>          Run parallel research on a topic
  context <agent> <topic>   Build context for an agent
  dispatch <agent> <action> <target>  Dispatch task to specialist agent
  agents                   List available specialist agents
  help                     Show this help message

Examples:
  node src/cli/index.js research "CVE-2024-1234"
  node src/cli/index.js context scout "target.com"
  node src/cli/index.js dispatch scout recon "target.com"
  `);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0] as Command;

  if (!command || command === 'help') {
    printUsage();
    return;
  }

  try {
    switch (command) {
      case 'research': {
        const topic = args[1] || 'test';
        const result = await integrationService.orchestrate({
          task: { action: 'research', target: topic },
          options: { sources: ['web', 'database'] }
        });
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case 'context': {
        const agent = args[1] || 'scout';
        const topic = args[2] || 'test';
        const result = await contextService.buildContext({
          agent_id: agent,
          topic,
          inputs: {}
        });
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case 'dispatch': {
        const agent = args[1] || 'scout';
        const action = args[2] || 'recon';
        const target = args[3] || 'unknown';
        const result = await integrationService.orchestrate({
          agent: agent as any,
          task: { action, target }
        });
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case 'agents': {
        const agents = agentDispatcher.getAvailableAgents();
        console.log('Available Specialist Agents:');
        agents.forEach(agent => console.log(`  - ${agent}`));
        break;
      }

      default:
        console.error(`Unknown command: ${command}`);
        printUsage();
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main().catch(console.error);

export { eventBus, researchService, contextService, agentDispatcher, integrationService };