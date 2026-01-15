import { MONSTER_SPRITE_URL } from './Constants';
import type { GameAsset } from './GameAsset';

export class Monster implements GameAsset {
  sprite: HTMLImageElement;
  x: number;
  y: number;
  width: number = 40;
  height: number = 40;

  speed: number = -1;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.sprite = new Image();
    this.sprite.src = MONSTER_SPRITE_URL;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.x += this.speed;

    if (this.x <= 0 || this.x + this.width >= ctx.canvas.width) {
      this.speed = -this.speed;
    }
    try {
      ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    } catch {
      ctx.fillStyle = 'brown';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
