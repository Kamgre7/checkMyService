import { v4 as uuid } from 'uuid';
import { createDbConnection } from '../db/db';
import { verbose } from 'sqlite3';

export interface IUrlRepository {
  init(): Promise<void>;
  insert(url: string): Promise<string>;
  getAllUrls(): Promise<UrlRecord[]>;
  getActiveUrls(): Promise<string[]>;
  deactivateUrl(id: string): Promise<void>;
}

export interface UrlRecord {
  id: string;
  url: string;
  isActive: boolean;
}

export class UrlRepository implements IUrlRepository {
  constructor() {}

  async init(): Promise<void> {
    verbose();
    const db = await createDbConnection();

    await db.run(`CREATE TABLE IF NOT EXISTS url_list (
    id VARCHAR(36) PRIMARY KEY,
    url VARCHAR(200) NOT NULL,
    isActive BOOLEAN NOT NULL
)`);
  }

  async insert(url: string): Promise<string> {
    verbose();

    const db = await createDbConnection();
    const id = uuid();

    await db.run(`INSERT INTO url_list(id, url, isActive) VALUES(?,?,?)`, [
      id,
      url,
      true,
    ]);

    return id;
  }

  async getAllUrls(): Promise<UrlRecord[]> {
    verbose();

    const db = await createDbConnection();

    const data: UrlRecord[] = await db.all(
      `SELECT * FROM url_List`,
      [],
      (err: Error, rows: any) => {
        if (err) {
          throw err;
        }
      }
    );

    return data;
  }

  async getActiveUrls(): Promise<string[]> {
    verbose();

    const db = await createDbConnection();

    const data: { url: string }[] = await db.all(
      `SELECT url FROM url_List WHERE isActive = ?`,
      [true],
      (err: Error, rows: any) => {
        if (err) {
          throw err;
        }
      }
    );

    return data.map(({ url }) => url);
  }

  async deactivateUrl(id: string): Promise<void> {
    verbose();

    const db = await createDbConnection();

    db.run(
      'UPDATE url_list SET isActive = ? WHERE id = ?',
      [false, id],
      (err: Error, rows: any) => {
        if (err) {
          throw err;
        }
      }
    );
  }
}

export const urlRepository = new UrlRepository();
