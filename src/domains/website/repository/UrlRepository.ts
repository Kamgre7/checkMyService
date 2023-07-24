import { prisma } from '../../../db/db';

export interface IUrlRepository {
  insert(url: string): Promise<string>;
  getAll(): Promise<UrlRecord[]>;
  getActive(): Promise<UrlRecord[]>;
  getById(id: string): Promise<UrlRecord | null>;
  getByContext(context: Partial<UrlRecord>): Promise<UrlRecord | null>;
  updateByContext(id: string, context: Partial<UrlRecord>): Promise<void>;
}

export interface UrlRecord {
  id: string;
  url: string;
  isActive: boolean;
}

export class UrlRepository implements IUrlRepository {
  constructor(private readonly urlList = prisma.urlList) {}

  async insert(url: string): Promise<string> {
    const record = await this.urlList.create({
      data: {
        url,
        isActive: true,
      },
    });

    return record.id;
  }

  async getAll(): Promise<UrlRecord[]> {
    return this.urlList.findMany();
  }

  async getActive(): Promise<UrlRecord[]> {
    return this.urlList.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async getById(id: string): Promise<UrlRecord | null> {
    return this.urlList.findUnique({
      where: {
        id,
      },
    });
  }

  async getByContext(context: Partial<UrlRecord>): Promise<UrlRecord | null> {
    return this.urlList.findFirst({
      where: context,
    });
  }

  async updateByContext(
    id: string,
    context: Partial<UrlRecord>
  ): Promise<void> {
    await this.urlList.update({
      where: {
        id,
      },
      data: context,
    });
  }
}

export const urlRepository = new UrlRepository();
