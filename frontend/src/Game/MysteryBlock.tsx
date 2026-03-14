import { Camera } from './Camera';

import mysteryBlockAsset from '../assets/scenery/special/mystery-block.png';
import type { Coordinates, GameAsset } from './GameAsset';
import soundAsset from '../assets/sounds/power_up.wav';
import { CollisionDetector } from './CollisionDetector';
import type { Player } from './Player';

export class MysteryBlock implements GameAsset {
  sprite: HTMLImageElement;
  sound: HTMLAudioElement;

  pos: Coordinates;
  width: number = 40;
  height: number = 40;

  isHit: boolean = false;

  constructor(x: number, y: number) {
    this.pos = { x: x, y: y };

    this.sprite = new Image();
    this.sprite.src = mysteryBlockAsset;
    this.sound = new Audio(soundAsset);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
  }

  detectCollisionFromPlayer(item: GameAsset) {
    const collision = CollisionDetector.collisionDetected(item, this);
    const player = item as Player;
    if (collision) {
      player.vy = 0;
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
