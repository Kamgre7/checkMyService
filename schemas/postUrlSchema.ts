import { z } from 'zod';

export const PostUrlBody = z.object({
  url: z.string().url(),
});

export const PostUrlSchema = z.object({
  body: PostUrlBody,
});

export type PostUrlReq = z.infer<typeof PostUrlSchema>;
