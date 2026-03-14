import { Camera } from './Camera';
import cloudsAsset from '../assets/scenery/clouds/clouds.png';
import type { Coordinates, GameAsset } from './GameAsset';
import { GROUND_Y } from './Constants';

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
}

export class Clouds implements GameAsset {
  sprite: HTMLImageElement;

  width: number;
  height: number;

  isRaining: boolean = false;

  pos: Coordinates;

  private rainDrops: RainDrop[] = [];
  private readonly RAIN_DROP_COUNT = 50;
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(width: number, height: number) {
    this.sprite = new Image();

    this.width = width;
    this.height = height;
    this.canvasWidth = width;
    this.canvasHeight = height;

    this.pos = { x: 0, y: 0 };

    this.sprite = new Image();
    this.sprite.src = cloudsAsset;

    this.sprite.onload = () => {
      this.width = this.sprite!.naturalWidth;
      this.height = this.sprite!.naturalHeight;
    };

    this.initRainDrops();
  }

  private initRainDrops(): void {
    this.rainDrops = Array.from({ length: this.RAIN_DROP_COUNT }, () => this.createRainDrop(true));
  }

  private createRainDrop(randomizeY = false): RainDrop {
    return {
      x:
        Math.random() < 0.5
          ? Math.random() * (190 - 90) + 90 // x ∈ [100, 200]
          : Math.random() * (700 - 600) + 600, // x ∈ [500, 600]
      y: randomizeY ? Math.random() * this.canvasHeight : 140, // spawn at y = 200
      length: Math.random() * 15 + 10,
      speed: Math.random() * 6 + 8,
      opacity: Math.random() * 0.4 + 0.3,
      width: Math.random() * 1 + 0.7,
    };
  }

  private updateRainDrops(): void {
    for (const drop of this.rainDrops) {
      drop.y += drop.speed;

      if (drop.y > this.canvasHeight + drop.length) {
        // Recycle drop back to the top with a fresh random x
        Object.assign(drop, this.createRainDrop(false));
      }
    }
  }

  private renderRain(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    for (const drop of this.rainDrops) {
      if (drop.y > GROUND_Y) continue;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(174, 214, 241, ${drop.opacity})`;
      ctx.lineWidth = drop.width;

      // Slight diagonal angle (wind effect)
      const angle = 0.0;
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x + Math.sin(angle) * drop.length, drop.y + Math.cos(angle) * drop.length);
      ctx.stroke();
    }

    ctx.restore();
  }

  setRaining(raining: boolean) {
    this.isRaining = raining;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    return;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const camera = Camera.getInstance();

    ctx.drawImage(this.sprite, -camera.x * 0.3, this.pos.y, this.width, this.height);

    if (this.isRaining) {
      this.updateRainDrops();
      this.renderRain(ctx);
    }
  }
}
