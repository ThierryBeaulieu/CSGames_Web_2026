import { useState } from 'react';
import './AssetsLoaded.css';

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
          imgSrc='http://localhost:5020/api/sprite/main-character'
        />
        <AssetCard
          name='ground'
          alt='ground not loaded'
          imgSrc='http://localhost:5020/api/sprite/ground'
        />
        <AssetCard
          name='trees'
          alt='trees not loaded'
          imgSrc='http://localhost:5020/api/sprite/trees'
        />

        <AssetCard
          name='bottles'
          alt='bottles not loaded'
          imgSrc='http://localhost:5020/api/sprite/bottles'
        />

        <AssetCard name='sky' alt='sky not loaded' imgSrc='http://localhost:5020/api/sprite/sky' />
        <AssetCard
          name='mystery-block'
          alt='mystery-block not loaded'
          imgSrc='http://localhost:5020/api/sprite/mystery-block'
        />
        <AssetCard
          name='mushroom'
          alt='mushroom not loaded'
          imgSrc='http://localhost:5020/api/sprite/mushroom'
        />
        <AssetCard
          name='monster'
          alt='monster not loaded'
          imgSrc='http://localhost:5020/api/sprite/monster'
        />
      </div>
    </>
  );
}

export default AssetsLoaded;
