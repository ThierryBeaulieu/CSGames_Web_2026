import { neon } from '@neondatabase/serverless';
import IDatabase from './IDatabase';
import Compressor from '../utils/Compressor';
import config from '../utils/config';
import { FileSystemDatabase } from './FileSystemDatabase';

export class SQLDatabase implements IDatabase {
  private static instance: SQLDatabase;
  private sql = neon(config.PostgreSQL);

  private constructor() {}

  static getInstance(): SQLDatabase {
    if (!SQLDatabase.instance) {
      SQLDatabase.instance = new SQLDatabase();
    }
    return SQLDatabase.instance;
  }

  private async populateDB() {
    await this.sql`
      CREATE TABLE IF NOT EXISTS assets (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE,
        data BYTEA,
        content_type TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const fsDatabase = new FileSystemDatabase();

    const mushroom: Buffer = await fsDatabase.getAsset('mushroom');
    const mysteryBlock: Buffer = await fsDatabase.getAsset('mystery-block');
    const clouds: Buffer = await fsDatabase.getAsset('clouds');

    const mushroomCompressed: string = Compressor.compress(mushroom);
    const monsterCompressed: string = Compressor.compress(mysteryBlock);
    const cloudsCompressed: string = Compressor.compress(clouds);

    await this.sql`
        INSERT INTO assets (name, data, content_type) VALUES
        ('mushroom', ${Buffer.from(mushroomCompressed, 'base64')}, 'image/png'),
        ('mystery-block', ${Buffer.from(monsterCompressed, 'base64')}, 'image/png'),
        ('clouds', ${Buffer.from(cloudsCompressed, 'base64')}, 'image/png')
        ON CONFLICT (name) DO NOTHING
      `;
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
