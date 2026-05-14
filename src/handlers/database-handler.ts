export class DatabaseHandler {
  async query(topic: string, _options?: { database?: string }): Promise<any[]> {
    console.log(`DatabaseHandler: querying for "${topic}"`);
    return [];
  }
  async queryCVE(_cveId: string): Promise<any[]> { return []; }
  async queryExploitDB(_topic: string): Promise<any[]> { return []; }
}