import { Router } from "express";
import { userRouter } from "./userRouter";
import { homeRouter } from "./homeRouter";
export const router = Router();
router.use("/users", userRouter);
router.use("/homes", homeRouter);
