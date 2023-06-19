import {Router} from "express";
import {adminAuth} from "../middleware/adminAuth";
import {auth} from "../middleware/auth";
import homeController from "../controller/homeController";

export const homeRouter = Router();
homeRouter.use(auth);
homeRouter.get("/", homeController.findAll);
homeRouter.post("/", homeController.addHome); // Admin authority
homeRouter.delete("/:id", homeController.removeHome);
homeRouter.get("/filter", homeController.findByNameHome);
homeRouter.get("/price", homeController.findByPrice);

homeRouter.put("/:id", homeController.editHome);
homeRouter.get("/:id", homeController.findHomeById);
homeRouter.get("/categories/:categoryId", homeController.findByCategoryId);
