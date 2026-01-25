import { GROUND_Y } from '../Game/Constants';
import groundAsset from '../assets/ground.png';
import type { Coordinates, GameAsset } from '../Game/GameAsset';

export class EditorGround implements GameAsset {
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
    this.sprite.src = groundAsset;

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
    } catch {
      ctx.fillStyle = '#cf510c';
      ctx.fillRect(0, GROUND_Y, this.width, this.height - GROUND_Y);
    }
  }
}
