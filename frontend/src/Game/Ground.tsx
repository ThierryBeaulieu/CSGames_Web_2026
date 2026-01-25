import { Camera } from './Camera';
import { GROUND_Y, GROUND_SPRITE_URL } from './Constants';
import type { Coordinates, GameAsset } from './GameAsset';

export class Ground implements GameAsset {
  sprite: HTMLImageElement;
  pos: Coordinates;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.sprite = new Image();

    this.width = width;
    this.height = height;

    this.pos = { x: 0, y: 0 };

    this.sprite = new Image();
    this.sprite.src = GROUND_SPRITE_URL;

    this.sprite.onload = () => {
      this.width = this.sprite!.naturalWidth;
      this.height = this.sprite!.naturalHeight;
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
  }

  render(ctx: CanvasRenderingContext2D): void {
    try {
      const camera = Camera.getInstance();

      ctx.drawImage(
        this.sprite,
        camera.worldToScreenX(this.pos.x),
        this.pos.y,
        this.width,
        this.height,
      );
    } catch {
      ctx.fillStyle = '#cf510c';
      ctx.fillRect(0, GROUND_Y, this.width, this.height - GROUND_Y);
    }
  }
}
