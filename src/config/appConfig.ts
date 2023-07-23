import * as dotenv from 'dotenv';

dotenv.config();

import { z } from 'zod';

export const AppSchema = z.object({
  port: z
    .string()
    .nonempty()
    .transform((arg) => (isNaN(parseInt(arg)) ? 3001 : Number(arg))),
  host: z.string().nonempty(),
  hostName: z.string().nonempty(),
  databaseUrl: z.string().nonempty(),
  csvFilePath: z.string().nonempty(),
});

export const appConfig = AppSchema.parse({
  port: process.env.PORT,
  host: process.env.HOST,
  hostName: process.env.HOST_NAME,
  databaseUrl: process.env.DATABASE_URL,
  csvFilePath: process.env.CSV_FILENAME,
});
