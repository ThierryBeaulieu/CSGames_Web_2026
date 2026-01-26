import { GROUND_Y } from '../Game/Constants';
import { HighPalm, LargeTree, MediumPalm, Trees } from '../Game/Trees';

export class TreesConfig {
  private static instance: TreesConfig;

  gameTrees: Trees[] = [
    new LargeTree(40, GROUND_Y - 175),
    new HighPalm(240, GROUND_Y - 240),
    new MediumPalm(600, GROUND_Y - 188),
    new LargeTree(780, GROUND_Y - 175),
    new MediumPalm(1100, GROUND_Y - 188),
    new HighPalm(1200, GROUND_Y - 240),
  ];

  private constructor() {}

  static getInstance(): TreesConfig {
    if (!TreesConfig.instance) {
      TreesConfig.instance = new TreesConfig();
    }
    return TreesConfig.instance;
  }
}
