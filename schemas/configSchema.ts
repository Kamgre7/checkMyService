import { z } from 'zod';

export const ConfigSchema = z.object({
  port: z
    .string()
    .nonempty()
    .transform((arg) => (isNaN(parseInt(arg)) ? 3001 : Number(arg))),
  host: z.string().nonempty(),
  hostName: z.string().nonempty(),
  dbFilename: z.string().nonempty(),
  csvFilePath: z.string().nonempty(),
});
