export class WebHandler {
  async search(topic: string, options?: { source?: string }): Promise<any[]> {
    console.log(`WebHandler: searching for "${topic}"`);
    return [];
  }
  async searchSecurityBlogs(topic: string): Promise<any[]> { return []; }
  async searchCVE(topic: string): Promise<any[]> { return []; }
}