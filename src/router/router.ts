import { Router } from "express";
import { userRouter } from "./userRouter";
import { homeRouter } from "./homeRouter";
import { orderRouter } from "./orderRouter";
export const router = Router();
router.use("/users", userRouter);
router.use("/homes", homeRouter);
router.use("/orders", orderRouter);
