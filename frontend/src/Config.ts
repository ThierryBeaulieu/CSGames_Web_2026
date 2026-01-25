import type { Coordinates } from './Game/GameAsset';
import mediumPalm from '../src/assets/scenery/trees/medium-palm.png';
import highPalm from '../src/assets/scenery/trees/high-palm.png';
import largeTree from '../src/assets/scenery/trees/large-tree.png';

export abstract class Trees {
  pos: Coordinates;
  asset: string;

  constructor(x: number, y: number, asset: string) {
    this.pos = { x: x, y: y };
    this.asset = asset;
  }
}

export class LargeTree extends Trees {}

export class HighPalm extends Trees {}

export class MediumPalm extends Trees {}

export class Config {
  private static instance: Config;

  static bottles: Coordinates[] = [];
  static trees: Trees[] = [
    new LargeTree(40, 40, largeTree),
    new HighPalm(80, 40, highPalm),
    new MediumPalm(120, 40, mediumPalm),
  ];

  private constructor() {}

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}
