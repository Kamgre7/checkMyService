import * as dotenv from 'dotenv';
import { AppSchema } from './appSchema';

dotenv.config();

export const config = AppSchema.parse({
  port: process.env.PORT,
  host: process.env.HOST,
  hostName: process.env.HOST_NAME,
  databaseUrl: process.env.DATABASE_URL,
  csvFilePath: process.env.CSV_FILENAME,
});
