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
          name='background'
          alt='background not loaded'
          imgSrc='http://localhost:5020/api/sprite/background'
        />
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
      </div>
    </>
  );
}

export default AssetsLoaded;
