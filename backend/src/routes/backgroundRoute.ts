import { Router, Request, Response } from 'express';
import HTTP_STATUS from '../utils/http';
import AssetService from '../services/asset.service';

const router = Router();
const assetService = new AssetService();

router.get('/ground', async (req: Request, res: Response) => {
  try {
    const ground = await assetService.getGround();
    res.setHeader('Content-Type', 'image/png');
    res.send(ground);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

router.get('/sky', async (req: Request, res: Response) => {
  try {
    const sky = await assetService.getSky();
    res.setHeader('Content-Type', 'image/png');
    res.send(sky);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

router.get('/trees', async (req: Request, res: Response) => {
  try {
    const trees = await assetService.getTrees();
    res.setHeader('Content-Type', 'image/png');
    res.send(trees);
  } catch (error) {
    res.status(HTTP_STATUS.SERVER_ERROR).json(error);
  }
});

export default router;
