import type { GameAsset } from './GameAsset';

const MAIN_CHARACTER_SPRITE_URL = 'http://localhost:5020/api/sprite/main-character';

export class Player implements GameAsset {
  sprite: HTMLImageElement;
  x: number = 50;
  y: number = 0;
  width: number = 30;
  height: number = 50;

  vy: number = 0;
  onGround: boolean = false;
  direction: string = 'right' as 'left' | 'right';

  gravity: number;
  groundY: number;

  constructor(gravity: number, groundY: number) {
    this.gravity = gravity;
    this.groundY = groundY;

    this.sprite = new Image();
    this.sprite.src = MAIN_CHARACTER_SPRITE_URL;
    const scale = 0.2;
    this.sprite.onload = () => {
      this.width = this.sprite!.naturalWidth * scale;
      this.height = this.sprite!.naturalHeight * scale;
    };
  }

  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    // Horizontal movement + direction
    if (keys.current['ArrowLeft']) {
      this.x -= 5;
      this.direction = 'left';
    }

    if (keys.current['ArrowRight']) {
      this.x += 5;
      this.direction = 'right';
    }

    // Jump
    if (keys.current['ArrowUp'] && this.onGround) {
      this.vy = -12;
      this.onGround = false;
    }

    // Gravity
    this.vy += this.gravity;
    this.y += this.vy;

    // Ground collision
    if (this.y + this.height > this.groundY) {
      this.y = this.groundY - this.height;
      this.vy = 0;
      this.onGround = true;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    try {
      ctx.save();

      if (this.direction === 'left') {
        ctx.scale(-1, 1);
        ctx.drawImage(this.sprite, -this.x - this.width, this.y, this.width, this.height);
      } else {
        //console.log(this.sprite);
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
      }

      ctx.restore();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
