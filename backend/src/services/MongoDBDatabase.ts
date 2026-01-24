import { MongoClient, Db, ServerApiVersion } from 'mongodb';
import IDatabase from './IDatabase';
import { FileSystemDatabase } from './FileSystemDatabase';
import config, { MongoDBConfig } from '../utils/config';
import Compressor from '../utils/Compressor';

export class MongoDBDatabase implements IDatabase {
  private static instance: MongoDBDatabase;

  private client: MongoClient;
  private db?: Db;

  private constructor() {
    const userData: MongoDBConfig = config.MongoDB;
    const uri = `mongodb+srv://${userData.username}:${userData.password}@gameasset.shkzoek.mongodb.net/?appName=GameAsset`;

    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  static getInstance(): MongoDBDatabase {
    if (!MongoDBDatabase.instance) {
      MongoDBDatabase.instance = new MongoDBDatabase();
    }
    return MongoDBDatabase.instance;
  }

  private async populateDB() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db('GameAsset');
      const assetsCollection = this.db.collection('assets');

      const result = await assetsCollection.deleteMany({});
      console.log(result);

      const fsDatabase = new FileSystemDatabase();

      const mainCharacter: Buffer = await fsDatabase.getAsset('main-character');
      const monster: Buffer = await fsDatabase.getAsset('monster');

      const mainCharacterCompressed: string = Compressor.compress(mainCharacter);
      const monsterCompressed: string = Compressor.compress(monster);

      await assetsCollection.insertMany([
        {
          name: 'main-character',
          data: mainCharacterCompressed,
          contentType: 'image/png',
          createdAt: new Date(),
        },
        {
          name: 'monster',
          data: monsterCompressed,
          contentType: 'image/png',
          createdAt: new Date(),
        },
      ]);
    }
  }

  // Ensure connection exists
  private async connect(): Promise<Db> {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db('GameAsset');

      console.log('MongoDB connected and initialized');
    }

    return this.db;
  }

  async getAsset(fileName: string): Promise<Buffer> {
    if (config.DeployedInProd) {
      this.populateDB(); // REMOVE, ONLY FOR DEFAULT INIT
    }

    const db = await this.connect();

    const asset = await db.collection('assets').findOne({ name: fileName });

    if (!asset || !asset.data) {
      throw new Error(`Asset ${fileName} not found`);
    }

    console.log('Fetched Data correctly from mongoDB');

    return Compressor.decompress(asset.data);
  }

  async close() {
    await this.client.close();
  }
}
