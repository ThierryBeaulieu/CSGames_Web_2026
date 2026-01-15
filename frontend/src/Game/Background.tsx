import { DEFAULT_HEIGHT, DEFAULT_WIDTH, GROUND_Y } from './Constants';
import type { GameAsset } from './GameAsset';

export class Background implements GameAsset {
  sprite: HTMLImageElement | null;

  x: number = 50;
  y: number = 0;
  width: number = DEFAULT_WIDTH;
  height: number = DEFAULT_HEIGHT;

  constructor() {
    this.sprite = null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {}

  render(ctx: CanvasRenderingContext2D): void {
    // Sky
    ctx.fillStyle = '#5c94fc';
    ctx.fillRect(0, 0, this.width, this.height);

    // ground
    ctx.fillStyle = '#cf510c';
    ctx.fillRect(0, GROUND_Y, this.width, this.height - GROUND_Y);
  }
}
