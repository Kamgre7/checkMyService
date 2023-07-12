import { validatePostReq } from '../middlewares/validatePostReq';
import { PostUrlSchema } from '../schemas/postUrlSchema';

export const validateUrlPostReq = validatePostReq(PostUrlSchema);
