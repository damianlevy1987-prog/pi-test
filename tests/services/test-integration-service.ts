import { describe, it, expect, beforeEach } from 'vitest';
import { IntegrationService } from '../../src/services/integration-service';
import { EventBus } from '../../src/event-bus';

describe('IntegrationService', () => {
  let eventBus: EventBus;
  let integrationService: IntegrationService;

  beforeEach(() => {
    eventBus = new EventBus();
    integrationService = new IntegrationService(eventBus);
  });

  it('should register integration', async () => {
    const config = {
      name: 'nessus',
      type: 'api' as const,
      enabled: true,
      config: { url: 'https://nessus.example.com', api_key: 'test' }
    };
    await integrationService.register(config);
    const integrations = integrationService.listIntegrations();
    expect(integrations).toHaveLength(1);
    expect(integrations[0].name).toBe('nessus');
  });

  it('should unregister integration', async () => {
    const config = {
      name: 'metasploit',
      type: 'api' as const,
      enabled: true,
      config: { url: 'https://msf.example.com' }
    };
    await integrationService.register(config);
    await integrationService.unregister('metasploit');
    const integrations = integrationService.listIntegrations();
    expect(integrations).toHaveLength(0);
  });

  it('should invoke integration action', async () => {
    const config = {
      name: 'shodan',
      type: 'api' as const,
      enabled: true,
      config: { api_key: 'test-key' }
    };
    await integrationService.register(config);
    const result = await integrationService.invoke('shodan', 'search', { query: 'test' });
    expect(result.status).toBe('success');
  });

  it('should throw error for non-existent integration', async () => {
    await expect(
      integrationService.invoke('nonexistent', 'action', {})
    ).rejects.toThrow('Integration not found: nonexistent');
  });

  it('should list multiple integrations', async () => {
    await integrationService.register({ name: 'int1', type: 'api', enabled: true, config: {} });
    await integrationService.register({ name: 'int2', type: 'database', enabled: true, config: {} });
    const integrations = integrationService.listIntegrations();
    expect(integrations).toHaveLength(2);
  });
});