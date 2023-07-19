import { Router } from 'express';
import { validateUrlPostReq } from '../domains/website/validators/urlPostReq';
import { urlController } from '../domains/website/controllers/UrlController';
import { validateUrlPutReq } from '../domains/website/validators/urlPutReq';
import { validateUrlGetReq } from '../domains/website/validators/urlGetCsvReq';

export const urlRouter = Router();

urlRouter
  .route('/url')
  .post(validateUrlPostReq, urlController.postUrl)
  .put(validateUrlPutReq, urlController.putUrl);

urlRouter
  .route('/url/download-csv/:id')
  .get(validateUrlGetReq, urlController.downloadCsv);
