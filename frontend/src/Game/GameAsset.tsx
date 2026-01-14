export interface GameAsset {
  sprite: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;

  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void;
  render(ctx: CanvasRenderingContext2D): void;
}
