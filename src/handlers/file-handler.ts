import * as fs from 'fs';

export class FileHandler {
  async search(directory: string, pattern: string): Promise<any[]> {
    console.log(`FileHandler: searching "${directory}" for "${pattern}"`);
    return [];
  }

  async readFile(filePath: string): Promise<string> {
    return fs.readFileSync(filePath, 'utf-8');
  }

  async glob(pattern: string, directory: string): Promise<string[]> {
    return [];
  }
}