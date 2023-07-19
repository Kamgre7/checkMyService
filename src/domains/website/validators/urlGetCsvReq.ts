import { validateReq } from '../../../middlewares/validateReq';
import { GetUrlSchema } from '../schemas/getUrlSchema';

export const validateUrlGetReq = validateReq(GetUrlSchema);
