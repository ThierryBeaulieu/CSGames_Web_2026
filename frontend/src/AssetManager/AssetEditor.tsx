import { useEffect, useRef } from 'react';
import { MAP_HEIGHT, MAP_WIDTH } from '../Game/Constants';
import { TreesConfig } from './TreesConfig';
import { Ground } from '../Game/Ground';
import { DarkSky } from '../Game/DarkSky';
import { LightSky } from '../Game/LightSky';
import { CloudySky } from '../Game/CloudySky';

const AssetEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys: React.RefObject<Record<string, boolean>> = useRef<Record<string, boolean>>({});
  const ground = useRef(new Ground(MAP_WIDTH, MAP_HEIGHT));
  const darkSky = useRef(new DarkSky(MAP_WIDTH, MAP_HEIGHT));
  const lightSky = useRef(new LightSky(MAP_WIDTH, MAP_HEIGHT));
  const cloudySky = useRef(new CloudySky(MAP_WIDTH, MAP_HEIGHT));

  const treesConfig = useRef(TreesConfig.getInstance());

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

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      darkSky.current.useCamera = false;
      lightSky.current.useCamera = false;
      cloudySky.current.useCamera = false;
      ground.current.useCamera = false;

      darkSky.current.render(ctx);
      lightSky.current.render(ctx);
      cloudySky.current.render(ctx);
      ground.current.render(ctx);

      darkSky.current.useCamera = true;
      lightSky.current.useCamera = true;
      cloudySky.current.useCamera = true;
      ground.current.useCamera = true;

      treesConfig.current.gameTrees.forEach((tree) => {
        tree.useCamera = false;
        tree.render(ctx);
        tree.useCamera = true;
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
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      style={{ border: '1px solid black' }}
    />
  );
};

export default AssetEditor;
