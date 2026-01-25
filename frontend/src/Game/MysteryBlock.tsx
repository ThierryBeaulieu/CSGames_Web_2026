import { MYSTERY_BLOCK_SPRITE_URL } from './Constants';
import type { Coordinates, GameAsset } from './GameAsset';

export class MysteryBlock implements GameAsset {
  sprite: HTMLImageElement;

  pos: Coordinates;
  width: number = 40;
  height: number = 40;

  isHit: boolean = false;

  constructor(x: number, y: number) {
    this.pos = { x: x, y: y };

    this.sprite = new Image();
    this.sprite.src = MYSTERY_BLOCK_SPRITE_URL;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
  }

  render(ctx: CanvasRenderingContext2D): void {
    try {
      ctx.drawImage(this.sprite, this.pos.x, this.pos.y, this.width, this.height);
    } catch {
      ctx.fillStyle = 'gold';
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }
}
