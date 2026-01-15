const cors = require('cors');
const path = require('path');
const express = require('express');
import { Request, Response, NextFunction } from 'express';

import characterRoutes from './routes/characterRoute';
import backgroundRoutes from './routes/backgroundRoute';
import sceneryRoutes from './routes/sceneryRoute';

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

app.use('/api/character', characterRoutes);
app.use('/api/background', backgroundRoutes);
app.use('/api/scenery', sceneryRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
