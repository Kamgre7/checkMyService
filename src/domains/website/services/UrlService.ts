import { Prisma } from '@prisma/client';
import { getHostName } from '../../../utils/getHostName';
import { IUrlRepository, urlRepository } from '../repository/UrlRepository';
import { UNIQUE_CODE_ERROR_PRISMA } from '../../../utils/utils';

export interface IUrlService {
  create(url: string): Promise<string>;
  deactivateUrl(id: string): Promise<void>;
  getHostnameById(id: string): Promise<string>;
}

export class UrlService implements IUrlService {
  constructor(private readonly urlRepository: IUrlRepository) {}

  async create(url: string): Promise<string> {
    try {
      return await this.urlRepository.create(url);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === UNIQUE_CODE_ERROR_PRISMA
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

  async getHostnameById(id: string): Promise<string> {
    const urlRecord = await this.urlRepository.getById(id);

    if (!urlRecord) {
      throw new Error('Url does not exist');
    }

    return getHostName(urlRecord.url);
  }

  private async tryToActivate(url: string): Promise<string> {
    const urlRecord = (await this.urlRepository.getByContext({
      url,
    }))!;

    if (urlRecord.isActive) {
      throw new Error(`${url} already exists)`);
    }

    await this.urlRepository.updateByContext(urlRecord.id, {
      isActive: true,
    });

    return urlRecord.id;
  }
}

export const urlService = new UrlService(urlRepository);
