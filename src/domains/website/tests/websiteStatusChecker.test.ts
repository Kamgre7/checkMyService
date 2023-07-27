import { v4 as uuid } from 'uuid';
import { ICsvFileHandler } from '../csvFileHandler/CsvFileHandler';
import { IHttpReqHandler, WebsiteInfo } from '../httpReqHandler/HttpReqHandler';
import { IUrlRepository, UrlRecord } from '../repository/UrlRepository';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import {
  IWebsiteStatusChecker,
  WebsiteStatusChecker,
} from '../WebsiteStatusChecker';

describe('Website status checker', () => {
  let activeUrlRecord: UrlRecord;
  let inactiveUrlRecord: UrlRecord;
  let websiteStatusInfo: WebsiteInfo;
  let websiteStatusFailInfo: WebsiteInfo;

  let urlRepositoryMock: IUrlRepository;
  let httpReqHandlerMock: IHttpReqHandler;
  let csvFileHandlerMock: ICsvFileHandler;

  let websiteStatusChecker: IWebsiteStatusChecker;

  beforeEach(() => {
    activeUrlRecord = {
      id: uuid(),
      url: 'https://www.google.com',
      isActive: true,
    };

    inactiveUrlRecord = {
      id: uuid(),
      url: 'https://www.youtube.com',
      isActive: false,
    };

    websiteStatusInfo = {
      name: 'https://www.google.com',
      statusCode: 200,
      statusInfo: 'RUNNING',
      time: getCurrentDate(),
    };

    websiteStatusFailInfo = {
      name: 'https://www.youtube.com',
      statusCode: 200,
      statusInfo: 'DOWN',
      time: getCurrentDate(),
    };

    urlRepositoryMock = {
      create: jest.fn().mockResolvedValue(uuid()),
      getAll: jest.fn().mockResolvedValue([activeUrlRecord, inactiveUrlRecord]),
      getActive: jest.fn().mockResolvedValue([activeUrlRecord]),
      getById: jest.fn().mockResolvedValue(activeUrlRecord),
      getByContext: jest.fn().mockResolvedValue(inactiveUrlRecord),
      updateByContext: jest.fn(),
    };

    httpReqHandlerMock = {
      getPagesStatus: jest
        .fn()
        .mockResolvedValue([websiteStatusInfo, websiteStatusFailInfo]),
      getSinglePageStatus: jest
        .fn()
        .mockResolvedValueOnce(websiteStatusInfo)
        .mockResolvedValueOnce(websiteStatusFailInfo),
    };

    csvFileHandlerMock = {
      pagesStatusToCsv: jest.fn(),
      saveSingleStatusToCsv: jest.fn(),
    };

    websiteStatusChecker = new WebsiteStatusChecker(
      httpReqHandlerMock,
      urlRepositoryMock,
      csvFileHandlerMock
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call getActive, getPagesStatus and pagesStatusToCsv file when run trackWebsiteStatus method', async () => {
    await websiteStatusChecker.trackWebsiteStatus();

    expect(urlRepositoryMock.getActive).toBeCalledTimes(1);
    expect(httpReqHandlerMock.getPagesStatus).toBeCalledTimes(1);
    expect(csvFileHandlerMock.pagesStatusToCsv).toBeCalledTimes(1);
  });
});
