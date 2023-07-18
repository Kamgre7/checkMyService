import { Response } from 'express';
import { PostUrlReq } from '../schemas/postUrlSchema';
import { IUrlService, urlService } from '../services/UrlService';
import { PutUrlReq } from '../schemas/putUrlSchema';
import { config } from '../config/default';
import { GetUrlReq } from '../schemas/getUrlSchema';
import { join } from 'path';

export interface IUrlController {
  postUrl(req: PostUrlReq, res: Response): Promise<void>;
  putUrl(req: PutUrlReq, res: Response): Promise<void>;
  downloadCsv(req: GetUrlReq, res: Response): Promise<void>;
}

export class UrlController implements IUrlController {
  constructor(private readonly urlService: IUrlService) {}

  postUrl = async (req: PostUrlReq, res: Response): Promise<void> => {
    const { url } = req.body;
    const id = await this.urlService.insert(url);

    res.status(200).json(id);
  };

  putUrl = async (req: PutUrlReq, res: Response): Promise<void> => {
    const { id } = req.body;
    await this.urlService.deactivateUrl(id);

    res.status(204).end();
  };

  downloadCsv = async (req: GetUrlReq, res: Response): Promise<void> => {
    const { id } = req.params;

    const url = await this.urlService.getUrlById(id);
    const path = join(config.csvFilePath, `${url}.csv`);

    res.download(path, (err) => {
      if (err) {
        res.status(500).send(err.message);
      }
    });
  };
}

export const urlController = new UrlController(urlService);
