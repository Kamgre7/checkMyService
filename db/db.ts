import { open } from 'sqlite';
import { Database } from 'sqlite3';
import { config } from '../config/default';

export async function createDbConnection() {
  return open({
    filename: config.dbFilename,
    driver: Database,
  });
}
