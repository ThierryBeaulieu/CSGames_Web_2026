import React, { useEffect, useRef } from 'react';

const MAIN_CHARACTER_SPRITE_URL = 'http://localhost:5020/api/sprite/main-character';
const BACKGROUND_SPRITE_URL = 'http://localhost:5020/api/sprite/background';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 400;

const GRAVITY = 0.5;
const GROUND_Y = 340;

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys: React.RefObject<Record<string, boolean>> = useRef<Record<string, boolean>>({});

  /*
   * All game assets are declared here
   */
  const player = useRef(new Player(GRAVITY, GROUND_Y));
  const background = useRef(new Background(DEFAULT_WIDTH, DEFAULT_HEIGHT, GROUND_Y));

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const gameLoop = () => {
      player.current.handleUserInput(keys);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      background.current.render(ctx);
      player.current.render(ctx);

      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={DEFAULT_WIDTH}
      height={DEFAULT_HEIGHT}
      style={{ border: '1px solid black' }}
    />
  );
};

interface GameAsset {
  sprite: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;

  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void;
  render(ctx: CanvasRenderingContext2D): void;
}

class Background implements GameAsset {
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
    this.sprite.src = BACKGROUND_SPRITE_URL;

    this.sprite.onload = () => {
      this.width = this.sprite!.naturalWidth;
      this.height = this.sprite!.naturalHeight;
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    // nothing to do, it's the background
    return;
  }

  render(ctx: CanvasRenderingContext2D): void {
    // Draw Background
    try {
      ctx.drawImage(this.sprite, 0, 0, this.width, this.height);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Sky
      ctx.fillStyle = '#5c94fc';
      ctx.fillRect(0, 0, this.width, this.height);

      // Ground
      ctx.fillStyle = '#cf510c';
      ctx.fillRect(0, GROUND_Y, this.width, this.height - GROUND_Y);
    }
  }
}

class Player implements GameAsset {
  sprite: HTMLImageElement;
  x: number = 50;
  y: number = 0;
  width: number = 30;
  height: number = 50;

  vy: number = 0;
  onGround: boolean = false;
  direction: string = 'right' as 'left' | 'right';

  gravity: number;
  groundY: number;

  constructor(gravity: number, groundY: number) {
    this.gravity = gravity;
    this.groundY = groundY;

    this.sprite = new Image();
    this.sprite.src = MAIN_CHARACTER_SPRITE_URL;
    const scale = 0.2;
    this.sprite.onload = () => {
      this.width = this.sprite!.naturalWidth * scale;
      this.height = this.sprite!.naturalHeight * scale;
    };
  }

  handleUserInput(keys: React.RefObject<Record<string, boolean>>): void {
    // Horizontal movement + direction
    if (keys.current['ArrowLeft']) {
      this.x -= 5;
      this.direction = 'left';
    }

    if (keys.current['ArrowRight']) {
      this.x += 5;
      this.direction = 'right';
    }

    // Jump
    if (keys.current['ArrowUp'] && this.onGround) {
      this.vy = -12;
      this.onGround = false;
    }

    // Gravity
    this.vy += this.gravity;
    this.y += this.vy;

    // Ground collision
    if (this.y + this.height > this.groundY) {
      this.y = this.groundY - this.height;
      this.vy = 0;
      this.onGround = true;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    try {
      ctx.save();

      if (this.direction === 'left') {
        ctx.scale(-1, 1);
        ctx.drawImage(this.sprite, -this.x - this.width, this.y, this.width, this.height);
      } else {
        //console.log(this.sprite);
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
      }

      ctx.restore();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

export default Game;
