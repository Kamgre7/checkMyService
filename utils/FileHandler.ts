import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export interface IFileHandler {
  readTxtFile(path: string, filename: string): Promise<string>;
}

export class FileHandler implements IFileHandler {
  constructor() {}

  async readTxtFile(path: string, filename: string): Promise<string> {
    return await readFile(join(path, filename), { encoding: 'utf8' });
  }

  async updateCSVFile(path: string, data: any) {
    return await writeFile(path, JSON.stringify(data));
  }

  async createCSVFile() {}
}

export const fileHandler = new FileHandler();
