import { Router, Request, Response } from 'express';
import HTTP_STATUS from '../utils/http';
import AssetService from '../services/asset.service';

const router = Router();
const spriteService = new AssetService();

router.get('/main-character', async (req: Request, res: Response) => {
  try {
    const mainCharacter = await spriteService.getMainCharacter();
    res.setHeader('Content-Type', 'image/png');
    res.send(mainCharacter);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

router.get('/monster', async (req: Request, res: Response) => {
  try {
    const monster = await spriteService.getMonster();
    res.setHeader('Content-Type', 'image/png');
    res.send(monster);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

export default router;
