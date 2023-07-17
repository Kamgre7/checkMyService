import { Router } from 'express';
import { validateUrlPostReq } from '../validators/urlPostReq';
import { urlController } from '../controllers/UrlController';
import { validateUrlPutReq } from '../validators/urlPutReq';

export const urlRouter = Router();

urlRouter
  .route('/url')
  .post(validateUrlPostReq, urlController.postUrl)
  .put(validateUrlPutReq, urlController.putUrl);

urlRouter.route('/url/download-csv').get(urlController.downloadCsv);
