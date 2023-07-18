import { IUrlRepository, urlRepository } from '../repository/UrlRepository';
import { getHostName } from '../utils/utils';

export interface IUrlService {
  insert(url: string): Promise<string>;
  deactivateUrl(id: string): Promise<void>;
  getUrlById(id: string): Promise<string>;
}

export class UrlService implements IUrlService {
  constructor(private readonly urlRepository: IUrlRepository) {}

  async insert(url: string): Promise<string> {
    const id = await this.urlRepository.insert(url);

    return id;
  }

  async deactivateUrl(id: string): Promise<void> {
    await this.urlRepository.deactivateUrl(id);
  }

  async getUrlById(id: string): Promise<string> {
    const url = await this.urlRepository.getUrlById(id);

    return getHostName(url);
  }
}

export const urlService = new UrlService(urlRepository);
