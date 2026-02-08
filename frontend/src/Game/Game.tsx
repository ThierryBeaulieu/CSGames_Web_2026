import React, { useEffect, useRef } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH, GRAVITY, GROUND_Y } from './Constants';
import { Player } from './Player';
import { MysteryBlock } from './MysteryBlock';
import { Mushroom } from './Mushroom';
import { Monster } from './Monster';
import { Ground } from './Ground';
import { Camera } from './Camera';
import { DarkSky } from './DarkSky';
import { LightSky } from './LightSky';
import { CloudySky } from './CloudySky';
import { Clouds } from './Clouds';
import { SurpriseBlock } from './SurpriseBlock';
import { TreesConfig } from '../AssetManager/TreesConfig';
import { GroundPropsConfig } from '../AssetManager/GroundPropsConfig';

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys: React.RefObject<Record<string, boolean>> = useRef<Record<string, boolean>>({});

  /*
   * All game assets are declared here
   */
  const player = useRef(Player.getInstance(GRAVITY));

  const camera = useRef(Camera.getInstance());

  const darkSky = useRef(new DarkSky(CANVAS_WIDTH, CANVAS_HEIGHT));
  const lightSky = useRef(new LightSky(CANVAS_WIDTH, CANVAS_HEIGHT));
  const cloudySky = useRef(new CloudySky(CANVAS_WIDTH, CANVAS_HEIGHT));

  const clouds = useRef(new Clouds(CANVAS_WIDTH, CANVAS_HEIGHT));

  const ground = useRef(new Ground(CANVAS_WIDTH, CANVAS_HEIGHT));
  const mysteryBlock = useRef(new MysteryBlock(300, GROUND_Y - 120));
  const surpriseBlock = useRef(new SurpriseBlock(600, GROUND_Y - 120));
  const mushroom = useRef(new Mushroom(600, GROUND_Y - 40));
  const monster = useRef(new Monster(700, GROUND_Y - 40));

  const treesConfig = useRef(TreesConfig.getInstance());
  const groundPropsConfig = useRef(GroundPropsConfig.getInstance());

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

      ground.current.render(ctx);
      clouds.current.render(ctx);
      cloudySky.current.render(ctx);

      treesConfig.current.gameTrees.forEach((tree) => {
        tree.render(ctx);
      });

      mushroom.current.render(ctx);
      mysteryBlock.current.render(ctx);
      surpriseBlock.current.render(ctx);
      surpriseBlock.current.detectCollisionFromPlayer(player.current);
      
      player.current.render(ctx);
      monster.current.render(ctx);

      groundPropsConfig.current.groundProps.forEach((props) => {
        props.render(ctx);
      });

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
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{ border: '1px solid black' }}
    />
  );
};

export default Game;
