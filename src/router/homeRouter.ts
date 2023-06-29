import {Router} from 'express'
import homeController from '../controller/homeController';
import {adminAuth} from "../middleware/adminAuth";

export const homeRouter = Router();

homeRouter.get('/', homeController.getAllHome)
homeRouter.get('/user/:id', homeController.getHomeByUserId)
homeRouter.post('/', homeController.createHome)
homeRouter.put('/:id', homeController.updateHome)
homeRouter.get("/", homeController.findAll);
homeRouter.get("/status", homeController.findByStatus);
homeRouter.get("/find-by-address", homeController.findHomeByAddress);
homeRouter.get("/for-rent", homeController.findHomeForRent);
homeRouter.get("/rented", homeController.findHomeRented);
homeRouter.post("/", adminAuth, homeController.createHome);
homeRouter.delete("/:idHome", adminAuth, homeController.removeHome);
homeRouter.get("/filter", homeController.findByNameHome);
homeRouter.get("/price", homeController.findByPrice);
homeRouter.put("/:idHome", adminAuth, homeController.updateHome);
homeRouter.get("/:idHome", homeController.findHomeById);
homeRouter.get("/categories/:categoryId", homeController.findByCategoryId);
homeRouter.put(
    "/change-status/:idHome",
    adminAuth,
    homeController.changeHomeStatus
);
