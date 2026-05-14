import { describe, it, expect } from 'vitest';
import { ModeSwitcher } from '../../src/config/mode-switcher';

describe('ModeSwitcher', () => {
  it('should switch between modes', () => {
    const switcher = new ModeSwitcher();
    expect(switcher.getMode()).toBeDefined();
    switcher.setMode('production');
    expect(switcher.getMode()).toBe('production');
    expect(switcher.getEventBusType()).toBe('kafka');
  });
});