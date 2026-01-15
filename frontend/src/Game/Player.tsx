import type { GameAsset } from './GameAsset';
import type { Monster } from './Monster';

const MAIN_CHARACTER_SPRITE_URL = 'http://localhost:5020/api/sprite/main-character';

export class Player implements GameAsset {
  sprite: HTMLImageElement;
  x: number = 50;
  y: number = 0;
  width: number = 40;
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
  }

  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    // Horizontal movement + direction
    if (keys.current['ArrowLeft']) {
      this.x -= 3;
      this.direction = 'left';
    }

    if (keys.current['ArrowRight']) {
      this.x += 3;
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

  checkMonsterCollision(monster: Monster) {
    if (!monster.isAlive) return;

    if (
      this.x < monster.x + monster.width &&
      this.x + this.width > monster.x &&
      this.y < monster.y + monster.height &&
      this.y + this.height > monster.y
    ) {
      const playerBottom = this.y + this.height;
      const monsterTop = monster.y;

      const fallingOnMonster = this.vy > 0 && playerBottom - this.vy <= monsterTop + 5;

      if (fallingOnMonster) {
        // ✅ Jumped on monster
        monster.isAlive = false;
        this.vy = -10; // bounce
        this.onGround = false;
      } else {
        // ❌ Side or bottom collision
        console.log('dead');
      }
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
