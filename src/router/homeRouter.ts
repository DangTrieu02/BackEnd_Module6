import {Router} from 'express'
import homeController from '../controller/homeController';
export const homeRouter = Router();

homeRouter.get('/',homeController.getAllHome)
homeRouter.get('/user/:id',homeController.getHomeByUserId)
homeRouter.get('/detail/:id',homeController.getHomeDetail)
homeRouter.post('/',homeController.createHome)
homeRouter.put('/:id',homeController.updateHome)
