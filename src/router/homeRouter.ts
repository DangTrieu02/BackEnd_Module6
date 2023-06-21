import { Router } from "express";
import homeController from "../controller/homeController";
import { auth } from "../middleware/auth";
import {userAuth} from "../middleware/user";

export const homeRouter = Router();
// homeRouter.use(auth);

homeRouter.get('/find-by-address',homeController.findHomeByAddress);
homeRouter.get('/for-rent',homeController.findHomeForRent);
homeRouter.get('/rented',homeController.findHomeForRented);
homeRouter.get('/',homeController.getAllHome)
homeRouter.post('/',homeController.createHome)
homeRouter.put('/:id',homeController.updateHome)
homeRouter.get("/find-by-id/:idHome", homeController.findByIdHome);
homeRouter.get("/search", homeController.search);
