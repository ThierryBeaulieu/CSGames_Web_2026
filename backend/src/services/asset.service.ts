import { FileSystemDatabase } from './FileSystemDatabase';
import IDatabase from './IDatabase';
import { MongoDBDatabase } from './MongoDBDatabase';
import { SQLDatabase } from './SQLDatabase';

export interface Databases {
  [details: string]: IDatabase;
}

class AssetService {
  database: Databases = {};

  constructor() {
    this.database['FileSystem'] = new FileSystemDatabase();
    this.database['MongoDB'] = MongoDBDatabase.getInstance();
    this.database['PostgreSQL'] = SQLDatabase.getInstance();
  }

  // Characters
  async getMainCharacter(): Promise<Buffer> {
    return await this.database['MongoDB'].getAsset('main-character');
  }

  async getMonster(): Promise<Buffer> {
    return await this.database['MongoDB'].getAsset('monster');
  }

  // Background
  async getLightSky(): Promise<Buffer> {
    return await this.database['FileSystem'].getAsset('light_sky');
  }

  async getDarkSky(): Promise<Buffer> {
    return await this.database['FileSystem'].getAsset('dark_sky');
  }

  async getCloudySky(): Promise<Buffer> {
    return await this.database['FileSystem'].getAsset('cloudy_sky');
  }

  async getGround(): Promise<Buffer> {
    return await this.database['FileSystem'].getAsset('ground');
  }

  async getTrees(): Promise<Buffer> {
    return await this.database['FileSystem'].getAsset('trees');
  }

  async getBottles(): Promise<Buffer> {
    return await this.database['FileSystem'].getAsset('bottles');
  }

  // Scenery
  async getMysteryBlock(): Promise<Buffer> {
    return await this.database['PostgreSQL'].getAsset('mystery-block');
  }

  async getMushroom(): Promise<Buffer> {
    return await this.database['PostgreSQL'].getAsset('mushroom');
  }

  async getClouds(): Promise<Buffer> {
    return await this.database['PostgreSQL'].getAsset('clouds');
  }
}

export default AssetService;
