const counters = new Map<string, number>();

export function incrementMetric(name: string): void {
  counters.set(name, (counters.get(name) ?? 0) + 1);
}

export function renderPrometheusMetrics(): string {
  return Array.from(counters.entries())
    .map(([k, v]) => `ai_os_${k} ${v}`)
    .join('\n');
}

export function metricsSnapshot(): Record<string, number> {
  return Object.fromEntries(counters.entries());
}
