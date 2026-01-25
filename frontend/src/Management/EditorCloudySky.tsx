import cloudySkyAsset from '../assets/cloudy_sky.png';
import type { Coordinates, GameAsset } from '../Game/GameAsset';

export class EditorCloudySky implements GameAsset {
  sprite: HTMLImageElement;

  width: number;
  height: number;

  pos: Coordinates;

  constructor(width: number, height: number) {
    this.sprite = new Image();

    this.width = width;
    this.height = height;

    this.pos = { x: 0, y: 0 };

    this.sprite = new Image();
    this.sprite.src = cloudySkyAsset;

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
      ctx.drawImage(this.sprite, this.pos.x, this.pos.y, this.width, this.height);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      ctx.fillStyle = '#5c94fc';
      ctx.fillRect(0, 0, this.width, this.height);
    }
  }
}
