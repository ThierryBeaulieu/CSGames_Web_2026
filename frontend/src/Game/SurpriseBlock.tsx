import { Camera } from './Camera';

import surpriseBlock from '../assets/surprise-block.png';
import type { Coordinates, GameAsset } from './GameAsset';

export class SurpriseBlock implements GameAsset {
  sprite: HTMLImageElement;

  pos: Coordinates;
  width: number = 40;
  height: number = 40;

  isHit: boolean = false;

  constructor(x: number, y: number) {
    this.pos = { x: x, y: y };

    this.sprite = new Image();
    this.sprite.src = surpriseBlock;
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
    } catch {
      ctx.fillStyle = 'gold';
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }
}
