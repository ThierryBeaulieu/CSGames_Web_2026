import { Camera } from './Camera';
import { CollisionDetector } from './CollisionDetector';
import cloud_board from '../assets/scenery/special/cloud_board.png';
import thunderImg from '../assets/scenery/lightning/Lightning_Yellow.png';
import type { Coordinates, GameAsset } from './GameAsset';
import type { Player } from './Player';

export class CloudBoard implements GameAsset {
  sprite: HTMLImageElement;
  thunderSprite: HTMLImageElement;
  thunderWidth: number = 120;
  thunderHeight: number = 308;

  pos: Coordinates;
  width: number = 49;
  height: number = 49;

  isVisible: boolean = true;
  isRaining: boolean = false;
  thunderStormBegin: boolean = false;

  constructor(x: number, y: number) {
    this.pos = { x: x, y: y };

    this.sprite = new Image();
    this.sprite.src = cloud_board;

    this.thunderSprite = new Image();
    this.thunderSprite.src = thunderImg;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
  }

  detectCollisionFromPlayer(item: GameAsset) {
    const collision = CollisionDetector.collisionDetected(item, this);
    const player = item as Player;
    this.thunderStormBegin = false;
    if (collision && player.isHitting) {
      player.hitHandled = true;
      this.isRaining = true;
      this.thunderStormBegin = true;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const camera = Camera.getInstance();

    if (this.thunderStormBegin) {
      ctx.drawImage(
        this.thunderSprite,
        camera.worldToScreenX(this.pos.x) + 60,
        this.pos.y - 155,
        this.thunderWidth,
        this.thunderHeight,
      );
    }
    ctx.drawImage(
      this.sprite,
      camera.worldToScreenX(this.pos.x),
      this.pos.y,
      this.width,
      this.height,
    );

    if (this.thunderStormBegin) {
      ctx.save();
      ctx.globalCompositeOperation = 'difference';
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.restore();
    }
  }
}
