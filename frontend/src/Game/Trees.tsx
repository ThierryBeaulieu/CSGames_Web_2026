import { TREES_SPRITE_URL } from './Constants';
import type { Coordinates, GameAsset } from './GameAsset';

export class Trees implements GameAsset {
  sprite: HTMLImageElement;

  pos: Coordinates;

  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.sprite = new Image();

    this.pos = { x: 0, y: 0 };

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
    } catch (error) {
      /* empty */
    }
  }
}
