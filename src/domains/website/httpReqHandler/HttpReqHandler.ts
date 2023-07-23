import axios, { isAxiosError } from 'axios';
import { httpStatusCodeRegex } from '../../../utils/utils';
import { getCurrentDate } from '../../../utils/getCurrentDate';

export enum HttpPageStatus {
  RUNNING = 'RUNNING',
  DOWN = 'DOWN',
}

export type WebsiteInfo = {
  name: string;
  statusCode: number;
  statusInfo: string;
  time: string;
};

export interface IHttpReqHandler {
  getSinglePageStatus(url: string): Promise<WebsiteInfo>;
  getPagesStatus(data: string[]): Promise<WebsiteInfo[]>;
}

export class HttpReqHandler implements IHttpReqHandler {
  async getPagesStatus(urls: string[]): Promise<WebsiteInfo[]> {
    return await Promise.all(
      urls.map(async (url) => await this.getSinglePageStatus(url))
    );
  }

  async getSinglePageStatus(url: string): Promise<WebsiteInfo> {
    try {
      const { status } = await axios.get(url);

      const httpStatus = httpStatusCodeRegex.test(String(status))
        ? HttpPageStatus.RUNNING
        : HttpPageStatus.DOWN;

      return {
        name: url,
        statusCode: status,
        statusInfo: httpStatus,
        time: getCurrentDate(),
      };
    } catch (err) {
      if (isAxiosError(err)) {
        return {
          name: url,
          statusCode: err.status ?? 500,
          statusInfo: HttpPageStatus.DOWN,
          time: getCurrentDate(),
        };
      }

      throw err;
    }
  }
}

export const httpReqHandler = new HttpReqHandler();
