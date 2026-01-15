import { MYSTERY_BLOCK_SPRITE_URL } from './Constants';
import type { GameAsset } from './GameAsset';
import type { Player } from './Player';

export class MysteryBlock implements GameAsset {
  sprite: HTMLImageElement;
  x: number;
  y: number;
  width: number = 40;
  height: number = 40;

  isHit: number = 0;

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

  checkHitFromBelow(player: Player) {
    const playerTop = player.y;
    const playerBottom = player.y + player.height;
    const playerLeft = player.x;
    const playerRight = player.x + player.width;

    const blockBottom = this.y + this.height;
    const blockLeft = this.x;
    const blockRight = this.x + this.width;

    const horizontalOverlap = playerRight > blockLeft && playerLeft < blockRight;

    const hitFromBelow =
      horizontalOverlap && playerTop <= blockBottom && playerBottom > blockBottom && player.vy < 0;

    if (hitFromBelow) {
      player.vy = 2;
      this.isHit++;
      console.log('Mystery block hit!');
    }
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
