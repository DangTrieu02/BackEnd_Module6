import { Router } from "express";
import categoryController from "../controller/categoryController";
import homeController from "../controller/homeController";

export const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:idCategory", categoryController.getCategoryById);
categoryRouter.post("/", categoryController.addCategory);
categoryRouter.get('/',homeController.findCategory);
