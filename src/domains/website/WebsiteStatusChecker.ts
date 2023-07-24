import {
  IUrlRepository,
  UrlRecord,
  UrlRepository,
} from './repository/UrlRepository';
import {
  ICsvFileHandler,
  csvFileHandler,
} from './csvFileHandler/CsvFileHandler';
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
    private readonly csvFileHandler: ICsvFileHandler
  ) {}

  async trackWebsiteStatus(): Promise<void> {
    const urls = await this.urlRepository.getActive();
    const urlNames = this.getUrlNameFromRecords(urls);

    const urlsStatusInfo = await this.httpReqHandler.getPagesStatus(urlNames);

    await this.saveStatusToCsv(urlsStatusInfo);
  }

  private async saveStatusToCsv(urlsStatusInfo: WebsiteInfo[]): Promise<void> {
    await this.csvFileHandler.pagesStatusToCsv(urlsStatusInfo);
  }

  private getUrlNameFromRecords(urls: UrlRecord[]): string[] {
    return urls.map(({ url }) => url);
  }
}

export const websiteStatusChecker = new WebsiteStatusChecker(
  httpReqHandler,
  new UrlRepository(),
  csvFileHandler
);
