import * as dotenv from 'dotenv';
import { ConfigSchema } from '../schemas/configSchema';

dotenv.config();

export const config = ConfigSchema.parse({
  urlFilePath: process.env.URL_FILE_PATH,
  urlFilename: process.env.URL_FILENAME,
  port: process.env.PORT,
  host: process.env.HOST,
  hostName: process.env.HOST_NAME,
  dbFilename: process.env.DB_FILENAME,
});
