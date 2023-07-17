import { validateReq } from '../middlewares/validateReq';
import { PutUrlSchema } from '../schemas/putUrlSchema';

export const validateUrlPutReq = validateReq(PutUrlSchema);
