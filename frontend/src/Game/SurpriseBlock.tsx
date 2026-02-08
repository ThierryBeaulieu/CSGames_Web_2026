import { Camera } from './Camera';

import surpriseBlock from '../assets/scenery/special/surprise-block.png';
import type { Coordinates, GameAsset } from './GameAsset';
import coinSoundAsset from '../assets/sounds/coin.wav';
import { CollisionDetector } from './CollisionDetector';

export class SurpriseBlock implements GameAsset {
  sprite: HTMLImageElement;
  sound: HTMLAudioElement;

  pos: Coordinates;
  width: number = 40;
  height: number = 40;

  isHit: boolean = false;

  constructor(x: number, y: number) {
    this.pos = { x: x, y: y };

    this.sprite = new Image();
    this.sprite.src = surpriseBlock;
    this.sound = new Audio(coinSoundAsset);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
  }

  detectCollisionFromPlayer(player: GameAsset) {
    const collision = CollisionDetector.collisionDetected(player, this);
    if (collision) {
      this.sound.currentTime = 0;
      this.sound.play();
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const camera = Camera.getInstance();

    ctx.drawImage(
      this.sprite,
      camera.worldToScreenX(this.pos.x),
      this.pos.y,
      this.width,
      this.height,
    );
  }
}
