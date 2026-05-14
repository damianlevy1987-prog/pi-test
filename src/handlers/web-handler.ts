export class WebHandler {
  async search(topic: string, _options?: { source?: string }): Promise<any[]> {
    console.log(`WebHandler: searching for "${topic}"`);
    return [];
  }
  async searchSecurityBlogs(_topic: string): Promise<any[]> { return []; }
  async searchCVE(_topic: string): Promise<any[]> { return []; }
}