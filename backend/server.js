const express = require('express');
//const cors = require('cors');
const path = require('path');

const spriteRouter = require('./routes/sprite');

const app = express();
const PORT = 5020;
const SIZE_LIMIT = '10mb';
const PUBLIC_PATH = path.join(__dirname);

//app.use(cors({ origin: '*' }));

// Affichage de nouvelles requêtes dans la console
app.use((request, response, next) => {
  console.log(`New HTTP request: ${request.method} ${request.url}`);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: SIZE_LIMIT }));
app.use(express.static(PUBLIC_PATH));

app.use('/api/sprite', spriteRouter.router);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
