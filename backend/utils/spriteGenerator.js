class SpriteGenerator {
  // accepts an array with the content (pixel[][]) and we define the pixel class
  generate() {}
}

/*
  const { createCanvas } = require('canvas');


  const pixelSize = 20;
  const width = marioPixels[0].length * pixelSize;
  const height = marioPixels.length * pixelSize;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // draw pixels
  for (let y = 0; y < marioPixels.length; y++) {
    for (let x = 0; x < marioPixels[y].length; x++) {
      const color = marioPixels[y][x];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }

  // send PNG response
  res.setHeader('Content-Type', 'image/png');
  canvas.createPNGStream().pipe(res);
*/
