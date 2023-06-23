// homeRouter.ts
import {Router} from "express";
import {adminAuth} from "../middleware/adminAuth";
import {auth} from "../middleware/auth";
import homeController from "../controller/homeController";
import {ownerAuth} from "../middleware/owner";

export const homeRouter = Router();

homeRouter.get("/", homeController.findAll);
homeRouter.get("/find-by-address", homeController.findHomeByAddress);
homeRouter.get("/for-rent", homeController.findHomeForRent);
homeRouter.get("/rented", homeController.findHomeRented);
homeRouter.post("/", adminAuth, homeController.addHome);
homeRouter.delete("/:idHome", adminAuth, homeController.removeHome);
homeRouter.get("/filter", homeController.findByNameHome);
homeRouter.get("/price", homeController.findByPrice);
homeRouter.put("/:idHome", adminAuth, homeController.editHome);
homeRouter.get("/:idHome", homeController.findHomeById);
homeRouter.get("/categories/:categoryId", homeController.findByCategoryId);
homeRouter.post("/upload-image/:idHome", adminAuth, homeController.uploadImage);
homeRouter.put("/change-status/:idHome", adminAuth, homeController.changeHomeStatus);
homeRouter.get("/status", homeController.findByStatus);
