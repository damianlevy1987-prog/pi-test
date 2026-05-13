export class DatabaseHandler {
  async query(topic: string, options?: { database?: string }): Promise<any[]> {
    console.log(`DatabaseHandler: querying for "${topic}"`);
    return [];
  }
  async queryCVE(cveId: string): Promise<any[]> { return []; }
  async queryExploitDB(topic: string): Promise<any[]> { return []; }
}