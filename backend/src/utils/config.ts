import { readFileSync } from 'fs';
import { join } from 'path';

export interface MongoDBConfig {
  username: string;
  password: string;
}

export interface Config {
  DeployedInProd: boolean;
  MongoDB: MongoDBConfig;
}

const raw = readFileSync(join(__dirname, 'config-prod.json'), 'utf-8');
const config: Config = JSON.parse(raw);

export default config;
