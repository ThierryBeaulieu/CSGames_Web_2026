import { Camera } from './Camera';
import { CollisionDetector } from './CollisionDetector';
import { MUSHROOM_SPRITE_URL } from './Constants';
import type { Coordinates, GameAsset } from './GameAsset';
import type { MysteryBlock } from './MysteryBlock';

export class Mushroom implements GameAsset {
  sprite: HTMLImageElement;
  pos: Coordinates;
  width: number = 40;
  height: number = 40;

  isVisible: boolean = false;

  constructor(x: number, y: number) {
    this.pos = { x: x, y: y };

    this.sprite = new Image();
    this.sprite.src = MUSHROOM_SPRITE_URL;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
  }

  checkMysteryBoxState(mysteryBlock: MysteryBlock): void {
    if (mysteryBlock.isHit == true) {
      this.isVisible = true;
    }
  }

  spawnMushroom(mysteryBox: GameAsset, player: GameAsset) {
    const collision = CollisionDetector.collisionDetected(player, mysteryBox);
    if (collision) {
      this.isVisible = true;
    }
  }

  detectCollisionFromPlayer(player: GameAsset) {
    const collision = CollisionDetector.collisionDetected(player, this);
    if (collision) {
      this.isVisible = false;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (!this.isVisible) return;

    const camera = Camera.getInstance();

    try {
      ctx.drawImage(
        this.sprite,
        camera.worldToScreenX(this.pos.x),
        this.pos.y,
        this.width,
        this.height,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch {
      ctx.fillStyle = 'orange';
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }
}
