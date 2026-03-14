import { Camera } from './Camera';
import { CollisionDetector } from './CollisionDetector';
import cloud_board from '../assets/scenery/special/cloud_board.png';
import type { Coordinates, GameAsset } from './GameAsset';
import type { Player } from './Player';

export class CloudBoard implements GameAsset {
  sprite: HTMLImageElement;
  pos: Coordinates;
  width: number = 49;
  height: number = 49;

  isVisible: boolean = true;
  isRaining: boolean = false;

  constructor(x: number, y: number) {
    this.pos = { x: x, y: y };

    this.sprite = new Image();
    this.sprite.src = cloud_board;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
  }

  detectCollisionFromPlayer(item: GameAsset) {
    const collision = CollisionDetector.collisionDetected(item, this);
    const player = item as Player;
    if (collision && player.isHitting) {
      player.hitHandled = true;
      this.isRaining = true;
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
