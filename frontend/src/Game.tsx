import React, { useEffect, useRef } from 'react';

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Player state
  const player = useRef({ x: 50, y: 0, width: 30, height: 50, vy: 0, onGround: false });

  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const gravity = 0.5;
    const groundY = 300;

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

      // Player movement
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

      // Draw ground
      ctx.fillStyle = 'green';
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

      // Draw player
      ctx.fillStyle = 'red';
      ctx.fillRect(player.current.x, player.current.y, player.current.width, player.current.height);

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
