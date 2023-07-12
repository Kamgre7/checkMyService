import { Response } from 'express';
import { PostUrlReq } from '../schemas/postUrlSchema';
import { IUrlService, urlService } from '../services/UrlService';

export interface IUrlController {
  postUrl(req: PostUrlReq, res: Response): Promise<void>;
}

export class UrlController implements IUrlController {
  constructor(private readonly urlService: IUrlService) {}

  postUrl = async (req: PostUrlReq, res: Response): Promise<void> => {
    const { url } = req.body;

    const id = await this.urlService.insert(url);

    res.status(200).json(id);
  };
}

export const urlController = new UrlController(urlService);
