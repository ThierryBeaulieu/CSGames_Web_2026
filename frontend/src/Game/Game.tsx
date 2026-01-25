import React, { useEffect, useRef } from 'react';
import { DarkSky } from './DarkSky';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, GRAVITY, GROUND_Y } from './Constants';
import { Player } from './Player';
import { MysteryBlock } from './MysteryBlock';
import { Mushroom } from './Mushroom';
import { Monster } from './Monster';
import { Ground } from './Ground';
import { Trees } from './Trees';
import { Bottles } from './Bottles';
import { Camera } from './Camera';
import { LightSky } from './LightSky';
import { CloudySky } from './CloudySky';
import { Clouds } from './Clouds';
import { SurpriseBlock } from './SurpriseBlock';

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys: React.RefObject<Record<string, boolean>> = useRef<Record<string, boolean>>({});

  /*
   * All game assets are declared here
   */
  const player = useRef(Player.getInstance(GRAVITY));

  const camera = useRef(Camera.getInstance());

  const darkSky = useRef(new DarkSky(DEFAULT_WIDTH, DEFAULT_HEIGHT));
  const lightSky = useRef(new LightSky(DEFAULT_WIDTH, DEFAULT_HEIGHT));
  const cloudySky = useRef(new CloudySky(DEFAULT_WIDTH, DEFAULT_HEIGHT));

  const clouds = useRef(new Clouds(DEFAULT_WIDTH, DEFAULT_HEIGHT));

  const ground = useRef(new Ground(DEFAULT_WIDTH, DEFAULT_HEIGHT));
  const trees = useRef(new Trees(DEFAULT_WIDTH, DEFAULT_HEIGHT));
  const mysteryBlock = useRef(new MysteryBlock(300, GROUND_Y - 120));
  const surpriseBlock = useRef(new SurpriseBlock(600, GROUND_Y - 120));
  const mushroom = useRef(new Mushroom(600, GROUND_Y - 40));
  const monster = useRef(new Monster(700, GROUND_Y - 40));
  const bottles = useRef(new Bottles(DEFAULT_WIDTH, DEFAULT_HEIGHT, GROUND_Y));

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

      camera.current.follow(player.current);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mushroom.current.spawnMushroom(mysteryBlock.current, player.current);
      mushroom.current.detectCollisionFromPlayer(player.current);

      monster.current.detectCollisionFromPlayer(player.current);

      darkSky.current.render(ctx);
      lightSky.current.render(ctx);
      cloudySky.current.render(ctx);

      clouds.current.render(ctx);

      ground.current.render(ctx);
      trees.current.render(ctx);
      mushroom.current.render(ctx);
      mysteryBlock.current.render(ctx);
      surpriseBlock.current.render(ctx);
      player.current.render(ctx);
      monster.current.render(ctx);
      bottles.current.render(ctx);

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
