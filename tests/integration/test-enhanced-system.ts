import { describe, it, expect } from 'vitest';
import { createEventBus } from '../../src/event-bus/index';
import { ModeSwitcher } from '../../src/config/mode-switcher';
import { ConfigurableWebHandler } from '../../src/handlers/configurable-web-handler';
import { ExpandedScout } from '../../src/agents/expanded/scout-expanded';
import { IoTScanner, MobileGuardian, IndustrialGuard } from '../../src/agents/specialists/iot-scanner';

describe('Enhanced System Integration', () => {
  // Event Bus Tests
  it('should create event bus in production mode', () => {
    const eventBus = createEventBus('production');
    expect(eventBus).toBeDefined();
  });

  it('should create event bus in development mode', () => {
    const eventBus = createEventBus('development');
    expect(eventBus).toBeDefined();
  });

  // Mode Switcher Tests
  it('should switch between modes', () => {
    const switcher = new ModeSwitcher();
    expect(switcher.getMode()).toBe('development');
    
    switcher.setMode('production');
    expect(switcher.getMode()).toBe('production');
    expect(switcher.getEventBusType()).toBe('kafka');
    
    switcher.setMode('development');
    expect(switcher.getEventBusType()).toBe('in-memory');
  });

  // Source Handler Tests
  it('should support all source handler modes', async () => {
    const apiHandler = new ConfigurableWebHandler({ mode: 'api', sources: [] });
    const scrapingHandler = new ConfigurableWebHandler({ mode: 'scraping', sources: [] });
    const hybridHandler = new ConfigurableWebHandler({ mode: 'hybrid', sources: [] });
    
    expect(apiHandler.getMode()).toBe('api');
    expect(scrapingHandler.getMode()).toBe('scraping');
    expect(hybridHandler.getMode()).toBe('hybrid');
    
    // Test search works
    await apiHandler.search('test');
    await scrapingHandler.search('test');
    await hybridHandler.search('test');
  });

  // Expanded Agent Tests
  it('Scout should have 10 sub-agents', () => {
    const scout = new ExpandedScout();
    expect(scout.getSubAgents().length).toBe(10);
  });

  // New Specialist Tests
  it('IoTScanner should have 5 sub-agents', () => {
    const iot = new IoTScanner();
    expect(iot.getSubAgents().length).toBe(5);
  });

  it('MobileGuardian should have 5 sub-agents', () => {
    const mobile = new MobileGuardian();
    expect(mobile.getSubAgents().length).toBe(5);
  });

  it('IndustrialGuard should have 5 sub-agents', () => {
    const ics = new IndustrialGuard();
    expect(ics.getSubAgents().length).toBe(5);
  });
});