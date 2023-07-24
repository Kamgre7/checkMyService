import { Prisma } from '@prisma/client';
import { getHostName } from '../../../utils/getHostName';
import {
  IUrlRepository,
  UrlRecord,
  urlRepository,
} from '../repository/UrlRepository';

export interface IUrlService {
  insert(url: string): Promise<string>;
  deactivateUrl(id: string): Promise<void>;
  getById(id: string): Promise<string>;
}

export class UrlService implements IUrlService {
  constructor(private readonly urlRepository: IUrlRepository) {}

  async insert(url: string): Promise<string> {
    try {
      return await this.urlRepository.insert(url);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return await this.tryToActivate(url);
      }

      throw error;
    }
  }

  async deactivateUrl(id: string): Promise<void> {
    await this.urlRepository.updateByContext(id, {
      isActive: false,
    });
  }

  async getById(id: string): Promise<string> {
    const url = await this.urlRepository.getById(id);

    if (!url) {
      throw new Error('Url does not exist');
    }

    return getHostName(url.url);
  }

  private async tryToActivate(url: string): Promise<string> {
    const record = (await this.urlRepository.getByContext({
      url,
    })) as UrlRecord;

    if (record.isActive) {
      throw new Error(`${url} already exists)`);
    }

    await this.urlRepository.updateByContext(record.id, {
      isActive: true,
    });

    return record.id;
  }
}

export const urlService = new UrlService(urlRepository);
