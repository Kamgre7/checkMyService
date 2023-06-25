import axios from 'axios';
import { httpStatusCodeRegex } from './regEx';

export enum HttpPageStatus {
  UP = 'UP',
  DOWN = 'DOWN',
}

export interface IHttpReqHandler {
  getSinglePageStatus(url: string): Promise<string>;
  getPagesStatus(data: string[]): Promise<string[]>;
}

export class HttpReqHandler implements IHttpReqHandler {
  constructor() {}

  async getPagesStatus(data: string[]): Promise<string[]> {
    return await Promise.all(
      data.map(async (link) => await this.getSinglePageStatus(link))
    );
  }

  async getSinglePageStatus(url: string): Promise<string> {
    try {
      const { status } = await axios.get(url);

      return httpStatusCodeRegex.test(String(status))
        ? HttpPageStatus.UP
        : HttpPageStatus.DOWN;
    } catch (err) {
      return HttpPageStatus.DOWN;
    }
  }
}

export const httpReqHandler = new HttpReqHandler();
