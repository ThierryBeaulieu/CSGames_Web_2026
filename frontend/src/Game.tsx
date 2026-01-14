import React, { useEffect, useRef } from 'react';

const MAIN_CHARACTER_SPRITE_URL = 'http://localhost:5020/api/sprite/main-character';
const BACKGROUND_SPRITE_URL = 'http://localhost:5020/api/sprite/background';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 400;

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Player state
  const player = useRef({
    x: 50,
    y: 0,
    width: 30,
    height: 50,
    vy: 0,
    onGround: false,
    direction: 'right' as 'left' | 'right',
  });

  const keys = useRef<Record<string, boolean>>({});
  const playerImage = useRef<HTMLImageElement | null>(null);
  const backgroundImage = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    const gravity = 0.5;
    const groundY = 340;

    // Load player Image
    const playerImg = new Image();
    playerImg.src = MAIN_CHARACTER_SPRITE_URL;
    playerImg.onload = () => {
      const scale = 0.2;
      player.current.width = playerImg.naturalWidth * scale;
      player.current.height = playerImg.naturalHeight * scale;
      playerImage.current = playerImg;
    };

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

      // Horizontal movement + direction
      if (keys.current['ArrowLeft']) {
        player.current.x -= 5;
        player.current.direction = 'left';
      }

      if (keys.current['ArrowRight']) {
        player.current.x += 5;
        player.current.direction = 'right';
      }

      // Jump
      if (keys.current['ArrowUp'] && player.current.onGround) {
        player.current.vy = -12;
        player.current.onGround = false;
      }

      // Gravity
      player.current.vy += gravity;
      player.current.y += player.current.vy;

      // Ground collision
      if (player.current.y + player.current.height > groundY) {
        player.current.y = groundY - player.current.height;
        player.current.vy = 0;
        player.current.onGround = true;
      }

      // Draw Background
      if (backgroundImage.current) {
        ctx.drawImage(backgroundImage.current, 0, 0, canvas.width, canvas.height);
      } else {
        // Sky
        ctx.fillStyle = '#5c94fc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Ground
        ctx.fillStyle = '#cf510c';
        ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
      }

      // Draw sprite (flipped if going left)
      if (playerImage.current) {
        ctx.save();

        if (player.current.direction === 'left') {
          ctx.scale(-1, 1);
          ctx.drawImage(
            playerImage.current,
            -player.current.x - player.current.width,
            player.current.y,
            player.current.width,
            player.current.height,
          );
        } else {
          ctx.drawImage(
            playerImage.current,
            player.current.x,
            player.current.y,
            player.current.width,
            player.current.height,
          );
        }

        ctx.restore();
      } else {
        // Draw player
        ctx.fillStyle = 'red';
        ctx.fillRect(
          player.current.x,
          player.current.y,
          player.current.width,
          player.current.height,
        );
      }

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

export default Game;
