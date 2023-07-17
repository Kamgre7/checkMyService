import { IUrlRepository, urlRepository } from '../repository/UrlRepository';

export interface IUrlService {
  insert(url: string): Promise<string>;
  deactivateUrl(id: string): Promise<void>;
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
}

export const urlService = new UrlService(urlRepository);
