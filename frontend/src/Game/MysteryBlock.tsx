import { MYSTERY_BLOCK_SPRITE_URL } from './Constants';
import type { GameAsset } from './GameAsset';

export class MysteryBlock implements GameAsset {
  sprite: HTMLImageElement;
  x: number;
  y: number;
  width: number = 40;
  height: number = 40;

  isHit: boolean = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.sprite = new Image();
    this.sprite.src = MYSTERY_BLOCK_SPRITE_URL;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
  }

  render(ctx: CanvasRenderingContext2D): void {
    try {
      ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    } catch {
      ctx.fillStyle = 'gold';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
