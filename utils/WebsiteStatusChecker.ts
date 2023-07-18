import { IUrlRepository, UrlRepository } from '../repository/UrlRepository';
import { IFileHandler, fileHandler } from './FileHandler';
import { IHttpReqHandler, httpReqHandler } from './HttpReqHandler';

export interface IWebsiteStatusChecker {
  trackWebsiteStatus(): Promise<void>;
}

export class WebsiteStatusChecker implements IWebsiteStatusChecker {
  constructor(
    private readonly httpReqHandler: IHttpReqHandler,
    private readonly urlRecord: IUrlRepository,
    private readonly fileHandler: IFileHandler
  ) {}

  async trackWebsiteStatus(): Promise<void> {
    const urls = await this.urlRecord.getActiveUrls();
    const urlsStatusInfo = await this.httpReqHandler.getPagesStatus(urls);

    await this.fileHandler.pagesStatusToCsv(urlsStatusInfo);
  }
}

export const websiteStatusChecker = new WebsiteStatusChecker(
  httpReqHandler,
  new UrlRepository(),
  fileHandler
);
