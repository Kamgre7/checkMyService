import { z } from 'zod';

export const PutUrlBody = z.object({
  id: z.string().uuid(),
});

export const PutUrlSchema = z.object({
  body: PutUrlBody,
});

export type PutUrlReq = z.infer<typeof PutUrlSchema>;
