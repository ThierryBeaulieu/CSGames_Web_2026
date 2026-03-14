import { Camera } from './Camera';
import mainCharacterImg from '../assets/characters/main-character.png';
import slashImg from '../assets/characters/slash.png';
import { GROUND_Y } from './Constants';
import type { Coordinates, GameAsset } from './GameAsset';

export class Player implements GameAsset {
  private static instance: Player | null = null;

  sprite: HTMLImageElement;
  hittingSprite: HTMLImageElement;
  pos: Coordinates;

  hittingWidth: number = 102;
  hittingHeight: number = 51;
  hitHandled: boolean = false;

  width: number = 40;
  height: number = 50;

  vy: number = 0;
  onGround: boolean = false;
  direction: 'left' | 'right' = 'right';

  gravity: number;
  isBigger: boolean = false;
  isHitting: boolean = false;
  isHoldingHitting: boolean = false;
  isUsing: boolean = false;

  private constructor(gravity: number) {
    this.gravity = gravity;

    this.pos = { x: 50, y: 0 };

    this.sprite = new Image();
    this.sprite.src = mainCharacterImg;

    this.hittingSprite = new Image();
    this.hittingSprite.src = slashImg;
  }

  static getInstance(gravity: number = 0.8): Player {
    if (!Player.instance) {
      Player.instance = new Player(gravity);
    }
    return Player.instance;
  }

  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    // Horizontal movement + direction
    if (keys.current?.['ArrowLeft']) {
      this.pos.x -= 3;
      this.direction = 'left';
    }

    if (keys.current?.['ArrowRight']) {
      this.pos.x += 3;
      this.direction = 'right';
    }

    // Jump
    if (keys.current?.['ArrowUp'] && this.onGround) {
      this.vy = -12;
      this.onGround = false;
    }

    if (keys.current?.['ArrowRight']) {
      this.pos.x += 3;
      this.direction = 'right';
    }
    if (keys.current?.[' ']) {
      this.isHoldingHitting = this.isHitting;
      this.isHitting = true;
    } else {
      this.isHitting = false;
    }

    // Gravity
    this.vy += this.gravity;
    this.pos.y += this.vy;

    // Ground collision
    if (this.pos.y + this.height > GROUND_Y) {
      this.pos.y = GROUND_Y - this.height;
      this.vy = 0;
      this.onGround = true;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const camera = Camera.getInstance();
    const screenX = camera.worldToScreenX(this.pos.x);

    if (this.isHitting) {
      console.log('is hitting');
    }

    ctx.save();

    if (this.direction === 'left') {
      ctx.scale(-1, 1);
      ctx.drawImage(this.sprite, -screenX - this.width, this.pos.y, this.width, this.height);
      if (this.isHitting && !this.hitHandled) {
        ctx.drawImage(
          this.hittingSprite,
          -screenX - this.hittingWidth + 40,
          this.pos.y,
          this.hittingWidth,
          this.hittingHeight,
        );
      }
    } else {
      ctx.drawImage(this.sprite, screenX, this.pos.y, this.width, this.height);

      if (this.isHitting && !this.hitHandled) {
        ctx.drawImage(
          this.hittingSprite,
          screenX - 10,
          this.pos.y,
          this.hittingWidth,
          this.hittingHeight,
        );
      }
    }

    ctx.restore();
  }
}
