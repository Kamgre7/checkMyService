import { config } from '../config/default';
import { IFileHandler, fileHandler } from './FileHandler';
import { IHttpReqHandler, httpReqHandler } from './HttpReqHandler';
import { urlValidator } from './UrlValidator';

export interface ICheckMyService {
  trackWebsiteStatus(): Promise<void>;
}

export class CheckMyService implements ICheckMyService {
  constructor(
    private readonly httpReqHandler: IHttpReqHandler,
    private readonly fileHandler: IFileHandler
  ) {}

  async trackWebsiteStatus(): Promise<void> {
    const urls = await this.fileHandler.readTxtFile(
      config.urlFilePath,
      config.urlFilename
    );
    const urlsToArray = urls.replace(/\r\n/g, '\n').split('\n');
    const validUrls = urlValidator.filterValidURL(urlsToArray);

    const result = await this.httpReqHandler.getPagesStatus(validUrls);

    console.log(result);
  }
}

export const checkMyService = new CheckMyService(httpReqHandler, fileHandler);
