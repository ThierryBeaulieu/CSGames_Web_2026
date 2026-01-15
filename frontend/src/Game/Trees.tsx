import { TREES_SPRITE_URL } from './Constants';
import type { GameAsset } from './GameAsset';

export class Trees implements GameAsset {
  sprite: HTMLImageElement;
  x: number = 0;
  y: number = 0;
  width: number;
  height: number;

  groundY: number;

  constructor(width: number, height: number, groundY: number) {
    this.groundY = groundY;
    this.sprite = new Image();

    this.width = width;
    this.height = height;

    this.sprite = new Image();
    this.sprite.src = TREES_SPRITE_URL;

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
      ctx.drawImage(this.sprite, 0, 0, this.width, this.height);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  }
}
