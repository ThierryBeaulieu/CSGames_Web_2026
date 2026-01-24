import { FileSystemDatabase } from './FileSystemDatabase';
import IDatabase from './IDatabase';
import { MongoDBDatabase } from './MongoDBDatabase';
import { NeonSQLDatabase } from './NeonSQLDatabase';

export interface Databases {
  [details: string]: IDatabase;
}

class AssetService {
  database: Databases = {};

  constructor() {
    this.database['FileSystem'] = new FileSystemDatabase();
    this.database['MongoDB'] = MongoDBDatabase.getInstance();
    this.database['PostgreSQL'] = NeonSQLDatabase.getInstance();
  }

  // Characters
  async getMainCharacter(): Promise<Buffer> {
    return await this.database['MongoDB'].getAsset('main-character');
  }

  async getMonster(): Promise<Buffer> {
    return await this.database['MongoDB'].getAsset('monster');
  }

  // Background
  async getSky(): Promise<Buffer> {
    return await this.database['FileSystem'].getAsset('sky');
  }

  async getGround(): Promise<Buffer> {
    return await this.database['FileSystem'].getAsset('ground');
  }

  async getTrees(): Promise<Buffer> {
    return await this.database['FileSystem'].getAsset('trees');
  }

  // Scenery
  async getBottles(): Promise<Buffer> {
    return await this.database['FileSystem'].getAsset('bottles');
  }

  async getMysteryBlock(): Promise<Buffer> {
    return await this.database['PostgreSQL'].getAsset('mystery-block');
  }

  async getMushroom(): Promise<Buffer> {
    return await this.database['PostgreSQL'].getAsset('mushroom');
  }
}

export default AssetService;
