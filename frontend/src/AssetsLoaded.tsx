import { useState } from 'react';
import './AssetsLoaded.css';
import {
  BOTTLES_SPRITE_URL,
  GROUND_SPRITE_URL,
  MAIN_CHARACTER_SPRITE_URL,
  MONSTER_SPRITE_URL,
  MUSHROOM_SPRITE_URL,
  MYSTERY_BLOCK_SPRITE_URL,
  SKY_SPRITE_URL,
  TREES_SPRITE_URL,
} from './Game/Constants';

type AssetCardProps = {
  name: string;
  alt: string;
  imgSrc: string;
};

function AssetCard({ name, alt, imgSrc }: AssetCardProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`card-wrapper ${hasError ? 'error' : ''}`}>
      <p>{name}</p>
      <img
        src={imgSrc}
        alt={alt}
        className='asset-image'
        onError={() => setHasError(true)}
        onLoad={() => setHasError(false)}
      />
    </div>
  );
}

function AssetsLoaded() {
  return (
    <>
      <h3>Assets Loaded Correctly</h3>
      <div className='cards'>
        <AssetCard
          name='main-character'
          alt='main-character not loaded'
          imgSrc={MAIN_CHARACTER_SPRITE_URL}
        />
        <AssetCard name='ground' alt='ground not loaded' imgSrc={GROUND_SPRITE_URL} />
        <AssetCard name='trees' alt='trees not loaded' imgSrc={TREES_SPRITE_URL} />
        <AssetCard name='bottles' alt='bottles not loaded' imgSrc={BOTTLES_SPRITE_URL} />
        <AssetCard name='sky' alt='sky not loaded' imgSrc={SKY_SPRITE_URL} />
        <AssetCard
          name='mystery-block'
          alt='mystery-block not loaded'
          imgSrc={MYSTERY_BLOCK_SPRITE_URL}
        />
        <AssetCard name='mushroom' alt='mushroom not loaded' imgSrc={MUSHROOM_SPRITE_URL} />
        <AssetCard name='monster' alt='monster not loaded' imgSrc={MONSTER_SPRITE_URL} />
      </div>
    </>
  );
}

export default AssetsLoaded;
