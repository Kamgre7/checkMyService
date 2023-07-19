import { getHostName } from '../../../utils/getHostName';
import { IUrlRepository, urlRepository } from '../repository/UrlRepository';

export interface IUrlService {
  insert(url: string): Promise<string>;
  deactivateUrl(id: string): Promise<void>;
  getUrlById(id: string): Promise<string>;
}

export class UrlService implements IUrlService {
  constructor(private readonly urlRepository: IUrlRepository) {}

  async insert(url: string): Promise<string> {
    const recordExist = await this.urlRepository.getUrlByName(url);

    if (recordExist) {
      throw new Error(`${url} already exists)`);
    }

    const id = await this.urlRepository.insert(url);

    return id;
  }

  async deactivateUrl(id: string): Promise<void> {
    await this.urlRepository.deactivateUrl(id);
  }

  async getUrlById(id: string): Promise<string> {
    const url = await this.urlRepository.getUrlById(id);

    if (!url) {
      throw new Error('Url does not exist');
    }

    return getHostName(url.url);
  }
}

export const urlService = new UrlService(urlRepository);
