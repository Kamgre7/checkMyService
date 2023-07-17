import { validateReq } from '../middlewares/validateReq';
import { PostUrlSchema } from '../schemas/postUrlSchema';

export const validateUrlPostReq = validateReq(PostUrlSchema);
