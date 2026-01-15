import { Router, Request, Response } from 'express';
import HTTP_STATUS from '../utils/http';
import SpriteService from '../services/sprite.service';

const router = Router();
const spriteService = new SpriteService();

router.get('/main-character', async (req: Request, res: Response) => {
  try {
    const mainCharacter = await spriteService.getMainCharacter();
    res.setHeader('Content-Type', 'image/png');
    res.send(mainCharacter.buffer);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

router.get('/ground', async (req: Request, res: Response) => {
  try {
    const ground = await spriteService.getGround();
    res.setHeader('Content-Type', 'image/png');
    res.send(ground.buffer);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

router.get('/bottles', async (req: Request, res: Response) => {
  try {
    const bottles = await spriteService.getBottles();
    res.setHeader('Content-Type', 'image/png');
    res.send(bottles.buffer);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

router.get('/sky', async (req: Request, res: Response) => {
  try {
    const sky = await spriteService.getSky();
    res.setHeader('Content-Type', 'image/png');
    res.send(sky.buffer);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});
router.get('/trees', async (req: Request, res: Response) => {
  try {
    const trees = await spriteService.getTrees();
    res.setHeader('Content-Type', 'image/png');
    res.send(trees.buffer);
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

router.get('/monster', async (req: Request, res: Response) => {
  try {
    const monster = await spriteService.getMonster();
    res.setHeader('Content-Type', 'image/png');
    res.send(monster.buffer);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

export default router;
