import { v4 as uuid } from 'uuid';
import { IUrlRepository, UrlRecord } from '../repository/UrlRepository';
import { IUrlService, UrlService } from '../services/UrlService';
import { getHostName } from '../../../utils/getHostName';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

describe('Url Service', () => {
  let urlRepositoryMock: IUrlRepository;
  let activeUrlRecord: UrlRecord;
  let inactiveUrlRecord: UrlRecord;
  let urlService: IUrlService;

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

    urlRepositoryMock = {
      insert: jest.fn().mockResolvedValue(uuid()),
      getAll: jest.fn().mockResolvedValue([activeUrlRecord, inactiveUrlRecord]),
      getActive: jest.fn().mockResolvedValue([activeUrlRecord]),
      getById: jest.fn().mockResolvedValue(activeUrlRecord),
      getByContext: jest.fn().mockResolvedValue(inactiveUrlRecord),
      updateByContext: jest.fn(),
    };

    urlService = new UrlService(urlRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call insert method of urlRepository, when adding new url', async () => {
    await urlService.insert('https://www.yahoo.com');

    expect(urlRepositoryMock.insert).toBeCalledTimes(1);
  });

  it('Should call insert, getByContext, updateByContext method of urlRepository, when adding again url (inactive in database)', async () => {
    urlRepositoryMock.insert = jest.fn().mockRejectedValueOnce(
      new PrismaClientKnownRequestError('Some Prisma error message', {
        code: 'P2002',
        clientVersion: '',
      })
    );

    const id = await urlService.insert(inactiveUrlRecord.url);

    expect(urlRepositoryMock.insert).toBeCalledTimes(1);
    expect(urlRepositoryMock.getByContext).toBeCalledTimes(1);
    expect(urlRepositoryMock.updateByContext).toBeCalledTimes(1);
    expect(id).toBe(inactiveUrlRecord.id);
  });

  it('Should call updateByContext method of urlRepository, when updating urlRecord isActive status', async () => {
    await urlService.deactivateUrl(activeUrlRecord.id);

    expect(urlRepositoryMock.updateByContext).toBeCalledTimes(1);
  });

  it('Should call getById method of urlRepository, when finding hostname using id. Should return url host name', async () => {
    const result = await urlService.getByIdHostname(activeUrlRecord.id);

    expect(urlRepositoryMock.getById).toBeCalledTimes(1);
    expect(result).toBe(getHostName(activeUrlRecord.url));
  });

  it('Should throw error when trying to add again existing url with isActive true flag', async () => {
    inactiveUrlRecord.isActive = true;

    urlRepositoryMock.insert = jest.fn().mockRejectedValueOnce(
      new PrismaClientKnownRequestError('Some Prisma error message', {
        code: 'P2002',
        clientVersion: '',
      })
    );

    await expect(
      urlService.insert('https://www.youtube.com')
    ).rejects.toThrow();
  });
});
