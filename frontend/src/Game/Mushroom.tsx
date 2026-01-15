import { CollisionDetector } from './CollisionDetector';
import { MUSHROOM_SPRITE_URL } from './Constants';
import type { GameAsset } from './GameAsset';
import type { MysteryBlock } from './MysteryBlock';

export class Mushroom implements GameAsset {
  sprite: HTMLImageElement;
  x: number;
  y: number;
  width: number = 40;
  height: number = 40;

  isVisible: boolean = false;
  riseDistance: number = 20;
  riseSpeed: number = 1;
  private startY: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.startY = y;

    this.sprite = new Image();
    this.sprite.src = MUSHROOM_SPRITE_URL;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
  }

  checkMysteryBoxState(mysteryBlock: MysteryBlock): void {
    if (mysteryBlock.isHit == true) {
      this.isVisible = true;
    }
  }

  detectCollision(mysteryBox: GameAsset, player: GameAsset) {
    const collision = CollisionDetector.collisionDetected(player, mysteryBox);
    if (collision) {
      this.isVisible = true;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (!this.isVisible) return;

    if (this.y > this.startY - this.riseDistance) {
      this.y -= this.riseSpeed;
    }

    try {
      ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch {
      ctx.fillStyle = 'orange';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
