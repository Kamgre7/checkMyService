import { prisma } from '../../../db/db';

export interface IUrlRepository {
  insert(url: string): Promise<string>;
  getAllUrls(): Promise<UrlRecord[]>;
  getActiveUrls(): Promise<UrlRecord[]>;
  getActiveUrlsName(): Promise<string[]>;
  getUrlByName(url: string): Promise<UrlRecord | null>;
  getUrlById(id: string): Promise<UrlRecord | null>;
  deactivateUrl(id: string): Promise<void>;
}

export interface UrlRecord {
  id: string;
  url: string;
  isActive: boolean;
}

export class UrlRepository implements IUrlRepository {
  constructor() {}

  async insert(url: string): Promise<string> {
    const record = await prisma.urlList.create({
      data: {
        url,
      },
    });

    return record.id;
  }

  async getAllUrls(): Promise<UrlRecord[]> {
    return prisma.urlList.findMany();
  }

  async getActiveUrls(): Promise<UrlRecord[]> {
    return prisma.urlList.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async getActiveUrlsName(): Promise<string[]> {
    const result = await this.getActiveUrls();

    return result.map(({ url }) => url);
  }

  async getUrlById(id: string): Promise<UrlRecord | null> {
    return prisma.urlList.findUnique({
      where: {
        id,
      },
    });
  }

  async getUrlByName(url: string): Promise<UrlRecord | null> {
    return prisma.urlList.findUnique({
      where: {
        url,
      },
    });
  }

  async deactivateUrl(id: string): Promise<void> {
    await prisma.urlList.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}

export const urlRepository = new UrlRepository();
