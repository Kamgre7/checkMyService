import { z } from 'zod';

export const ConfigSchema = z.object({
  urlFilePath: z.string().nonempty(),
  urlFilename: z.string().nonempty(),
  port: z
    .string()
    .nonempty()
    .transform((arg) => (isNaN(parseInt(arg)) ? 3001 : Number(arg))),
  host: z.string().nonempty(),
  hostName: z.string().nonempty(),
});
