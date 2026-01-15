import { GROUND_Y, MAIN_CHARACTER_SPRITE_URL } from './Constants';
import type { GameAsset } from './GameAsset';

export class Player implements GameAsset {
  sprite: HTMLImageElement;

  x: number = 50;
  y: number = 0;
  width: number = 40;
  height: number = 50;

  vy: number = 0;
  onGround: boolean = false;

  gravity: number;

  isBigger: boolean = false;

  constructor(gravity: number) {
    this.gravity = gravity;

    this.sprite = new Image();
    this.sprite.src = MAIN_CHARACTER_SPRITE_URL;
  }

  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    // Jump
    if (keys.current['ArrowUp'] && this.onGround) {
      this.vy = -12;
      this.onGround = false;
    }

    // Gravity
    this.vy += this.gravity;
    this.y += this.vy;

    // Ground collision
    if (this.y + this.height > GROUND_Y) {
      this.y = GROUND_Y - this.height;
      this.vy = 0;
      this.onGround = true;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    try {
      ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    } catch {
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
