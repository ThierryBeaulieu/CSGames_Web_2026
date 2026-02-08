import { Camera } from './Camera';
import type { Coordinates, GameAsset } from './GameAsset';
import bottle from '../assets/scenery/ground_props/bottle.png';
import flowery_bush from '../assets/scenery/ground_props/flowery_bush.png';
import bush from '../assets/scenery/ground_props/bush.png';
import { GROUND_Y } from './Constants';

export class GroundProps implements GameAsset {
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

export class Bottle extends GroundProps {
  constructor(x: number, y: number) {
    const width = 24;
    const height = 42;
    super(width, height, x, y, GROUND_Y, bottle);
  }
}

export class Flowers extends GroundProps {
  constructor(x: number, y: number) {
    const width = 37;
    const height = 24;
    super(width, height, x, y, GROUND_Y, flowery_bush);
  }
}

export class Bush extends GroundProps {
  constructor(x: number, y: number) {
    const width = 40;
    const height = 40;
    super(width, height, x, y, GROUND_Y, bush);
  }
}
