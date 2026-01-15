const cors = require('cors');
const path = require('path');
const express = require('express');
import { Request, Response, NextFunction } from 'express';
import SpriteService from './services/sprite.service';
import HTTP_STATUS from './utils/http';

const app = express();
const PORT = 5020;
const SIZE_LIMIT = '10mb';
const PUBLIC_PATH = path.resolve();

// Enable CORS
app.use(cors({ origin: '*' }));

// Log all incoming HTTP requests
app.use((request: Request, response: Response, next: NextFunction) => {
  console.log(`New HTTP request: ${request.method} ${request.url}`);
  next();
});

// Parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: SIZE_LIMIT }));

// Serve static files
app.use(express.static(PUBLIC_PATH));

const spriteService = new SpriteService();
app.get('/api/character/main-character', async (req: Request, res: Response) => {
  try {
    const mainCharacter = await spriteService.getMainCharacter();
    res.setHeader('Content-Type', 'image/png');
    res.send(mainCharacter.buffer);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
