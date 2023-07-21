import { z } from 'zod';

export const GetUrlParams = z.object({
  id: z.string().uuid(),
});

export const GetUrlSchema = z.object({
  params: GetUrlParams,
});

export type GetUrlReq = z.infer<typeof GetUrlSchema>;
