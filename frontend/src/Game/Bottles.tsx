import { Camera } from './Camera';
import bottlesAsset from '../assets/bottles.png';
import type { Coordinates, GameAsset } from './GameAsset';

export class Bottles implements GameAsset {
  sprite: HTMLImageElement;

  pos: Coordinates;

  width: number;
  height: number;

  groundY: number;

  constructor(width: number, height: number, groundY: number) {
    this.groundY = groundY;
    this.sprite = new Image();

    this.pos = { x: 0, y: 0 };

    this.width = width;
    this.height = height;

    this.sprite = new Image();
    this.sprite.src = bottlesAsset;

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
    } catch (error) {
      /* empty */
    }
  }
}
