import {Router} from 'express'
import homeController from '../controller/homeController';
export const homeRouter = Router();

homeRouter.get('/',homeController.getAllHome)
homeRouter.post('/',homeController.createHome)
homeRouter.put('/:id',homeController.updateHome)