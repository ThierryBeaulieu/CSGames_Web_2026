import { neon } from '@neondatabase/serverless';
import fs from 'fs/promises';
import IDatabase from './IDatabase';
import Compressor from '../utils/Compressor';
import config from '../utils/config';
import { FileSystemDatabase } from './FileSystemDatabase';

export class NeonSQLDatabase implements IDatabase {
  private static instance: NeonSQLDatabase;
  private sql = neon(config.PostgreSQL);

  private constructor() {}

  static getInstance(): NeonSQLDatabase {
    if (!NeonSQLDatabase.instance) {
      NeonSQLDatabase.instance = new NeonSQLDatabase();
    }
    return NeonSQLDatabase.instance;
  }

  private async populateDB() {
    console.log('populate DB called');
    await this.sql`
      CREATE TABLE IF NOT EXISTS assets (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE,
        data BYTEA,
        content_type TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const existing = await this.sql`SELECT COUNT(*) FROM assets`;
    if (Number(existing[0].count) === 0) {
      const fsDatabase = new FileSystemDatabase();

      const mushroom: Buffer = await fsDatabase.getAsset('mushroom');
      const mysteryBlock: Buffer = await fsDatabase.getAsset('mystery-block');

      const mushroomCompressed: string = Compressor.compress(mushroom);
      const monsterCompressed: string = Compressor.compress(mysteryBlock);
      await this.sql`
        INSERT INTO assets (name, data, content_type) VALUES
        ('mushroom', ${Buffer.from(mushroomCompressed, 'base64')}, 'image/png'),
        ('mystery-block', ${Buffer.from(monsterCompressed, 'base64')}, 'image/png')
        ON CONFLICT (name) DO NOTHING
      `;
    }
  }

  private async connect() {
    await this.populateDB();
  }

  async getAsset(fileName: string): Promise<Buffer> {
    await this.connect();
    const result = await this.sql`SELECT * FROM assets WHERE name = ${fileName} LIMIT 1`;

    if (!result[0]) throw new Error(`Asset not found: ${fileName}`);
    const rawData = Compressor.decompress(result[0].data);
    return Buffer.from(rawData);
  }
}
