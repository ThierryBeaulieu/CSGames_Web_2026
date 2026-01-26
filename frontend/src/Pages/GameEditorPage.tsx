/* eslint-disable react-hooks/immutability */
import { useState } from 'react';
import AssetEditor from '../AssetManager/AssetEditor';
import { HighPalm, LargeTree, MediumPalm, type Trees } from '../Game/Trees';
import { TreesConfig } from '../AssetManager/TreesConfig';
import { Modal } from '../Components/Modal';
import { GROUND_Y } from '../Game/Constants';
import './GameEditorPage.css';

import mediumPalm from '../assets/scenery/trees/medium-palm.png';
import highPalm from '../assets/scenery/trees/high-palm.png';
import largeTree from '../assets/scenery/trees/large-tree.png';
import { GroundPropsConfig } from '../AssetManager/GroundPropsConfig';

function GameEditorPage() {
  const treesConfig = TreesConfig.getInstance();
  const groundPropsConfig = GroundPropsConfig.getInstance();

  // Local React state just for re-rendering the UI
  const [, forceUpdate] = useState(0);
  const [random] = useState([100, 200, 1200, 500, 150, 250, 680, 50, 180, 700, 750, 800]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const moveTreeRight = (index: number) => {
    treesConfig.gameTrees[index].pos.x += 10;
    forceUpdate((n) => n + 1);
  };

  const moveTreeLeft = (index: number) => {
    treesConfig.gameTrees[index].pos.x -= 10;
    forceUpdate((n) => n + 1);
  };

  const deleteTree = (index: number) => {
    treesConfig.gameTrees.splice(index, 1);
    forceUpdate((n) => n + 1);
  };

  const addTree = (name: string) => {
    // Safe random position between 100 and 1200
    const randomX = random[randomIndex];

    if (name === 'Large Tree') {
      treesConfig.gameTrees.push(new LargeTree(randomX, GROUND_Y - 175));
    } else if (name == 'Medium Palm') {
      treesConfig.gameTrees.push(new MediumPalm(randomX, GROUND_Y - 188));
    } else if (name == 'High Palm') {
      treesConfig.gameTrees.push(new HighPalm(randomX, GROUND_Y - 240));
    }

    const newIndex = randomIndex + 1 >= random.length ? 0 : randomIndex + 1;
    setRandomIndex(newIndex);

    setModalOpen(!isModalOpen);
    forceUpdate((n) => n + 1);
  };

  const getTreeType = (tree: Trees) => {
    if (tree instanceof LargeTree) {
      return largeTree;
    } else if (tree instanceof MediumPalm) {
      return mediumPalm;
    } else if (tree instanceof HighPalm) {
      return highPalm;
    }
  };

  const randomizePropsPosition = () => {
    for (let i = 0; i < 10; i++) {
      const value = Math.floor(Math.random() * 1200) + 1;
      groundPropsConfig.groundProps[i].pos.x = value;
    }

    forceUpdate((n) => n + 1);
  };

  return (
    <div>
      <AssetEditor />

      <div>
        <button onClick={() => randomizePropsPosition()}>Randomize Ground Props Position</button>
        <button onClick={() => setModalOpen(!isModalOpen)}>AddTree</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title='Choose a tree'>
        <h2>Select the tree</h2>
        <div className='buttons-layout'>
          <button onClick={() => addTree('Large Tree')}>🌳 Large Tree</button>
          <button onClick={() => addTree('Medium Palm')}>🏝️ Medium Palm</button>
          <button onClick={() => addTree('High Palm')}>🌴 High Palm</button>
        </div>
      </Modal>

      {treesConfig.gameTrees.map((tree: Trees, index: number) => (
        <div className='trees-layout' key={index}>
          <img className='tree-img' src={getTreeType(tree)} />
          <div className='tree-item' id={index.toString()}>{`x: ${tree.pos.x}`}</div>
          <button className='tree-item' onClick={() => moveTreeLeft(index)}>
            Move Left
          </button>
          <button className='tree-item' onClick={() => moveTreeRight(index)}>
            Move Right
          </button>
          <button className='tree-item' onClick={() => deleteTree(index)}>
            Delete Tree
          </button>
        </div>
      ))}
    </div>
  );
}

export default GameEditorPage;
