import React, { useEffect, useRef } from 'react';
import { Background } from './Background';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, GRAVITY, GROUND_Y } from './Constants';
import { Player } from './Player';
import { MysteryBlock } from './MysteryBlock';

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys: React.RefObject<Record<string, boolean>> = useRef<Record<string, boolean>>({});

  /*
   * All game assets are declared here
   */
  const player = useRef(new Player(GRAVITY, GROUND_Y));
  const background = useRef(new Background(DEFAULT_WIDTH, DEFAULT_HEIGHT, GROUND_Y));
  const mysteryBlock = useRef(new MysteryBlock(300, GROUND_Y - 120));

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
      mysteryBlock.current.checkHitFromBelow(player.current);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      background.current.render(ctx);
      mysteryBlock.current.render(ctx);
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
