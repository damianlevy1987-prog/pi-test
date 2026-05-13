import { describe, it, expect } from 'vitest';
import { ModeSwitcher } from '../../src/config/mode-switcher';

describe('ModeSwitcher', () => {
  it('should switch between production and development modes', () => {
    const switcher = new ModeSwitcher();
    switcher.setMode('production');
    expect(switcher.getMode()).toBe('production');
    expect(switcher.getEventBusType()).toBe('kafka');
    
    switcher.setMode('development');
    expect(switcher.getMode()).toBe('development');
    expect(switcher.getEventBusType()).toBe('in-memory');
  });
});