import { useState } from 'react';
import AssetEditor from '../AssetManager/AssetEditor';
import type { Trees } from '../Game/Trees';
import { TreesConfig } from '../AssetManager/TreesConfig';

function GameEditorPage() {
  const treesConfig = TreesConfig.getInstance();

  // Local React state just for re-rendering the UI
  const [, forceUpdate] = useState(0);

  const moveTreeRight = (index: number) => {
    treesConfig.gameTrees[index].pos.x += 10;
    forceUpdate((n) => n + 1);
  };

  const moveTreeLeft = (index: number) => {
    treesConfig.gameTrees[index].pos.x -= 10;
    forceUpdate((n) => n + 1);
  };

  return (
    <div>
      <AssetEditor />

      {treesConfig.gameTrees.map((tree: Trees, index: number) => (
        <div key={index}>
          <div id={index.toString()}>{`x: ${tree.pos.x}, y: ${tree.pos.y}`}</div>
          <button onClick={() => moveTreeRight(index)}>Move Right</button>
          <button onClick={() => moveTreeLeft(index)}>Move Left</button>
        </div>
      ))}
    </div>
  );
}

export default GameEditorPage;
