import React, { useEffect, useRef } from 'react';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, GRAVITY } from './Constants';
import { Player } from './Player';
import { Background } from './Background';

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys: React.RefObject<Record<string, boolean>> = useRef<Record<string, boolean>>({});

  /*
   * All game assets are declared here
   */
  const player = useRef(new Player(GRAVITY));
  const background = useRef(new Background());

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

export default Game;
