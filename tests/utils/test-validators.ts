import { describe, it, expect } from 'vitest';
import { validateTopic, validateAgent, validateSource, sanitizeInput } from '../../src/utils/validators';

describe('Validators', () => {
  it('should validate topic', () => { expect(validateTopic('test')).toBe(true); });
  it('should reject empty topic', () => { expect(validateTopic('')).toBe(false); });
  it('should validate agent', () => { expect(validateAgent('scout')).toBe(true); });
  it('should reject invalid agent', () => { expect(validateAgent('invalid')).toBe(false); });
  it('should validate source', () => { expect(validateSource('web')).toBe(true); });
  it('should sanitize input', () => { expect(sanitizeInput('<script>')).toBe('script'); });
});