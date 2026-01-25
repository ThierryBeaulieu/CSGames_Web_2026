import { useEffect, useRef } from 'react';
import { MAP_HEIGHT, MAP_WIDTH } from '../Game/Constants';
import { EditorGround } from './EditorGround';
import { EditorDarkSky } from './EditorDarkSky';
import { EditorLightSky } from './EditorLightSky';
import { EditorCloudySky } from './EditorCloudySky';
import { TreesConfig } from './TreesConfig';

const AssetEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys: React.RefObject<Record<string, boolean>> = useRef<Record<string, boolean>>({});
  const ground = useRef(new EditorGround(MAP_WIDTH, MAP_HEIGHT));
  const darkSky = useRef(new EditorDarkSky(MAP_WIDTH, MAP_HEIGHT));
  const lightSky = useRef(new EditorLightSky(MAP_WIDTH, MAP_HEIGHT));
  const cloudySky = useRef(new EditorCloudySky(MAP_WIDTH, MAP_HEIGHT));

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

      darkSky.current.render(ctx);
      lightSky.current.render(ctx);
      cloudySky.current.render(ctx);

      treesConfig.current.editorTrees.forEach((tree) => {
        tree.render(ctx);
      });

      ground.current.render(ctx);

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
