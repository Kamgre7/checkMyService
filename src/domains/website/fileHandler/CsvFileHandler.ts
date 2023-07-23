import { join } from 'path';
import { appConfig } from '../../../config/appConfig';
import { WebsiteInfo } from '../httpReqHandler/HttpReqHandler';
import { createObjectCsvWriter } from 'csv-writer';
import { getHostName } from '../../../utils/getHostName';

export interface ICsvFileHandler {
  saveSingleStatusToCsv(statuses: WebsiteInfo, path: string): Promise<void>;
  pagesStatusToCsv(statuses: WebsiteInfo[]): Promise<void>;
}

export class CsvFileHandler implements ICsvFileHandler {
  constructor() {}

  async pagesStatusToCsv(statuses: WebsiteInfo[]): Promise<void> {
    await Promise.all(
      statuses.map(async (websiteInfo) => {
        const host = getHostName(websiteInfo.name);
        const csvFilePath = join(appConfig.csvFilePath, `${host}.csv`);

        await this.saveSingleStatusToCsv(websiteInfo, csvFilePath);
      })
    );
  }

  async saveSingleStatusToCsv(
    status: WebsiteInfo,
    path: string
  ): Promise<void> {
    const csvWriter = createObjectCsvWriter({
      path: path,
      header: [
        { id: 'name', title: 'Title' },
        { id: 'statusCode', title: 'HttpCode' },
        { id: 'statusInfo', title: 'Status' },
        { id: 'time', title: 'Time' },
      ],
      append: true,
    });

    await csvWriter.writeRecords([status]);
  }
}

export const csvFileHandler = new CsvFileHandler();
