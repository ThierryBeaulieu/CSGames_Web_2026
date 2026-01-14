import React, { useEffect, useRef } from 'react';

const MAIN_CHARACTER_SPRITE_URL = 'http://localhost:5020/api/sprite/main-character';
const BACKGROUND_SPRITE_URL = 'http://localhost:5020/api/sprite/background';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 400;

const GRAVITY = 0.5;
const GROUND_Y = 340;

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Player state
  const player = useRef(new Player(GRAVITY, GROUND_Y));

  const keys: React.RefObject<Record<string, boolean>> = useRef<Record<string, boolean>>({});
  const backgroundImage = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    // Load background Image
    const backgroundImg = new Image();
    backgroundImg.src = BACKGROUND_SPRITE_URL;
    backgroundImg.onload = () => {
      backgroundImage.current = backgroundImg;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      player.current.handleUserInput(keys);

      // Draw Background
      if (backgroundImage.current) {
        ctx.drawImage(backgroundImage.current, 0, 0, canvas.width, canvas.height);
      } else {
        // Sky
        ctx.fillStyle = '#5c94fc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Ground
        ctx.fillStyle = '#cf510c';
        ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
      }

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
      this.width = this.sprite.naturalWidth * scale;
      this.height = this.sprite.naturalHeight * scale;
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
    if (this.sprite) {
      ctx.save();

      if (this.direction === 'left') {
        ctx.scale(-1, 1);
        ctx.drawImage(this.sprite, -this.x - this.width, this.y, this.width, this.height);
      } else {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
      }

      ctx.restore();
      return;
    }

    // base case, we still want to display something
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Game;
