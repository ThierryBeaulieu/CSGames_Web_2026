import { Camera } from './Camera';
import mediumPalm from '../assets/scenery/trees/medium-palm.png';
import highPalm from '../assets/scenery/trees/high-palm.png';
import largeTree from '../assets/scenery/trees/large-tree.png';

import type { Coordinates, GameAsset } from './GameAsset';
import { GROUND_Y } from './Constants';

export class Trees implements GameAsset {
  sprite: HTMLImageElement;

  pos: Coordinates;

  width: number;
  height: number;

  groundY: number;

  useCamera: boolean = true;

  constructor(width: number, height: number, x: number, y: number, groundY: number, asset: string) {
    this.groundY = groundY;
    this.sprite = new Image();

    this.pos = { x: x, y: y };

    this.width = width;
    this.height = height;

    this.useCamera = true;

    this.sprite = new Image();
    this.sprite.src = asset;

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

    ctx.drawImage(
      this.sprite,
      this.useCamera ? camera.worldToScreenX(this.pos.x) : this.pos.x,
      this.pos.y,
      this.width,
      this.height,
    );
  }
}

export class LargeTree extends Trees {
  constructor(x: number, y: number) {
    const width = 58;
    const height = 175;
    super(width, height, x, y, GROUND_Y, largeTree);
  }
}

export class HighPalm extends Trees {
  constructor(x: number, y: number) {
    const width = 96;
    const height = 239;
    super(width, height, x, y, GROUND_Y, highPalm);
  }
}

export class MediumPalm extends Trees {
  constructor(x: number, y: number) {
    const width = 96;
    const height = 188;
    super(width, height, x, y, GROUND_Y, mediumPalm);
  }
}
