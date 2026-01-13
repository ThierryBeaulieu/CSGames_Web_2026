const express = require('express');
const { createCanvas } = require('canvas');

const app = express();
const PORT = 3000;

app.get('/sprite', (req, res) => {
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
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
