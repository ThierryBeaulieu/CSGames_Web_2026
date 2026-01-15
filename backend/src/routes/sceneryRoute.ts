import { Router, Request, Response } from 'express';
import HTTP_STATUS from '../utils/http';
import SpriteService from '../services/sprite.service';

const router = Router();
const spriteService = new SpriteService();

router.get('/bottles', async (req: Request, res: Response) => {
  try {
    const bottles = await spriteService.getBottles();
    res.setHeader('Content-Type', 'image/png');
    res.send(bottles.buffer);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

router.get('/mystery-block', async (req: Request, res: Response) => {
  try {
    const background = await spriteService.getMysteryBlock();
    res.setHeader('Content-Type', 'image/png');
    res.send(background.buffer);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

router.get('/mushroom', async (req: Request, res: Response) => {
  try {
    const mushroom = await spriteService.getMushroom();
    res.setHeader('Content-Type', 'image/png');
    res.send(mushroom.buffer);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

export default router;
