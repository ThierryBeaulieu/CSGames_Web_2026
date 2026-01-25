import { CollisionDetector } from './CollisionDetector';
import { MONSTER_SPRITE_URL } from './Constants';
import type { Coordinates, GameAsset } from './GameAsset';

export class Monster implements GameAsset {
  sprite: HTMLImageElement;
  pos: Coordinates;
  width: number = 40;
  height: number = 40;

  speed: number = -1;
  isAlive: boolean = true;

  constructor(x: number, y: number) {
    this.pos = { x: x, y: y };

    this.sprite = new Image();
    this.sprite.src = MONSTER_SPRITE_URL;
  }

  handleUserInput(): void {}

  detectCollisionFromPlayer(player: GameAsset) {
    const collision = CollisionDetector.collisionDetected(player, this);
    if (collision) {
      this.isAlive = false;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (!this.isAlive) return;

    this.pos.x += this.speed;

    if (this.pos.x <= 0 || this.pos.x + this.width >= ctx.canvas.width) {
      this.speed = -this.speed;
    }
    try {
      ctx.drawImage(this.sprite, this.pos.x, this.pos.y, this.width, this.height);
    } catch {
      ctx.fillStyle = 'brown';
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }
}
