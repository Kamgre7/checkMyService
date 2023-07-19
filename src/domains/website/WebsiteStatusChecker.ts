import { IUrlRepository, UrlRepository } from './repository/UrlRepository';
import { IFileHandler, fileHandler } from './fileHandler/FileHandler';
import {
  IHttpReqHandler,
  WebsiteInfo,
  httpReqHandler,
} from './httpReqHandler/HttpReqHandler';

export interface IWebsiteStatusChecker {
  trackWebsiteStatus(): Promise<void>;
}

export class WebsiteStatusChecker implements IWebsiteStatusChecker {
  constructor(
    private readonly httpReqHandler: IHttpReqHandler,
    private readonly urlRepository: IUrlRepository,
    private readonly fileHandler: IFileHandler
  ) {}

  async trackWebsiteStatus(): Promise<void> {
    const urls = await this.urlRepository.getActiveUrlsName();
    const urlsStatusInfo = await this.httpReqHandler.getPagesStatus(urls);

    await this.saveStatusToCsv(urlsStatusInfo);
  }

  private async saveStatusToCsv(urlsStatusInfo: WebsiteInfo[]): Promise<void> {
    await this.fileHandler.pagesStatusToCsv(urlsStatusInfo);
  }
}

export const websiteStatusChecker = new WebsiteStatusChecker(
  httpReqHandler,
  new UrlRepository(),
  fileHandler
);
