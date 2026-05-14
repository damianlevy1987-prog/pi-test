export function validateTopic(topic: string): boolean {
  return typeof topic === 'string' && topic.length > 0 && topic.length < 500;
}

export function validateAgent(agent: string): boolean {
  const validAgents = ['scout', 'vulnhunter', 'exploiter', 'shadowops', 'webbreaker', 'airwave', 'digitalwatcher', 'cloudbreacher', 'domainhunter', 'humanphisher'];
  return validAgents.includes(agent);
}

export function validateSource(source: string): boolean {
  const validSources = ['web', 'database', 'file', 'api'];
  return validSources.includes(source);
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '').substring(0, 1000);
}