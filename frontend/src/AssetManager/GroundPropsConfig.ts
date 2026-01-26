import { GROUND_Y } from '../Game/Constants';
import { Bottle, Bush, Flowers, type GroundProps } from '../Game/GroundProps';

export class GroundPropsConfig {
  private static instance: GroundPropsConfig;

  groundProps: GroundProps[] = [
    new Flowers(123, GROUND_Y - 25),
    new Bottle(235, GROUND_Y - 42),
    new Bush(382, GROUND_Y - 40),
    new Flowers(452, GROUND_Y - 25),
    new Bottle(620, GROUND_Y - 42),
    new Bush(850, GROUND_Y - 40),
    new Bottle(1150, GROUND_Y - 42),
    new Flowers(1250, GROUND_Y - 25),
    new Bush(1450, GROUND_Y - 40),
    new Bush(1500, GROUND_Y - 40),
  ];

  private constructor() {}

  static getInstance(): GroundPropsConfig {
    if (!GroundPropsConfig.instance) {
      GroundPropsConfig.instance = new GroundPropsConfig();
    }
    return GroundPropsConfig.instance;
  }
}
