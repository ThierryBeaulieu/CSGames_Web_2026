import { Camera } from './Camera';
import { CollisionDetector } from './CollisionDetector';
import monsterAsset from '../assets/characters/monster.png';
import type { Coordinates, GameAsset } from './GameAsset';

export class Monster implements GameAsset {
  sprite: HTMLImageElement;
  pos: Coordinates;
  width: number = 40;
  height: number = 40;

  speed: number = -1;

  constructor(x: number, y: number) {
    this.pos = { x: x, y: y };

    this.sprite = new Image();
    this.sprite.src = monsterAsset;
  }

  handleUserInput(): void {}

  detectCollisionFromPlayer(player: GameAsset) {
    const collision = CollisionDetector.collisionDetected(player, this);
    if (collision) {
      console.log('collision with monster');
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const camera = Camera.getInstance();

    this.pos.x += this.speed;

    if (this.pos.x <= 0 || this.pos.x + this.width >= ctx.canvas.width) {
      this.speed = -this.speed;
    }
    try {
      ctx.drawImage(
        this.sprite,
        camera.worldToScreenX(this.pos.x),
        this.pos.y,
        this.width,
        this.height,
      );
    } catch {
      ctx.fillStyle = 'brown';
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }
}
