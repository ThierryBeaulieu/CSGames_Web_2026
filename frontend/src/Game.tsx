import React, { useEffect, useRef } from 'react';

const SPRITE_URL = 'http://localhost:5020/api/sprite/main-character';

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
  });

  const keys = useRef<Record<string, boolean>>({});
  const spriteImage = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const gravity = 0.5;
    const groundY = 300;

    const img = new Image();
    img.src = SPRITE_URL;
    img.onload = () => {
      spriteImage.current = img;
      player.current.width = img.naturalWidth * 0.2;
      player.current.height = img.naturalHeight * 0.2;
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

      // Movement
      if (keys.current['ArrowLeft']) player.current.x -= 5;
      if (keys.current['ArrowRight']) player.current.x += 5;
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

      // Ground
      ctx.fillStyle = 'green';
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

      // Draw player sprite
      if (spriteImage.current) {
        ctx.drawImage(
          spriteImage.current,
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

  return <canvas ref={canvasRef} width={800} height={400} style={{ border: '1px solid black' }} />;
};

export default Game;
