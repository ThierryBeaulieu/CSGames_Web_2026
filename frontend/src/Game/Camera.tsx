import { DEFAULT_WIDTH } from './Constants';
import { Player } from './Player';

export class Camera {
  private static instance: Camera;

  x = 0;
  y = 0;

  private readonly leftMargin = DEFAULT_WIDTH * 0.3;
  private readonly rightMargin = DEFAULT_WIDTH * 0.3;

  private constructor() {}

  static getInstance(): Camera {
    if (!Camera.instance) {
      Camera.instance = new Camera();
    }
    return Camera.instance;
  }

  follow(player: Player) {
    const playerScreenX = player.pos.x - this.x;

    if (playerScreenX > DEFAULT_WIDTH - this.rightMargin) {
      this.x = player.pos.x - (DEFAULT_WIDTH - this.rightMargin);
    }

    if (playerScreenX < this.leftMargin) {
      this.x = player.pos.x - this.leftMargin;
    }
  }

  worldToScreenX(x: number) {
    return x - this.x;
  }

  worldToScreenY(y: number) {
    return y - this.y;
  }
}
