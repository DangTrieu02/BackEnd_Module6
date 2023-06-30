import {Router} from "express";
import {userRouter} from "./userRouter";
import {homeRouter} from "./homeRouter";
import {categoryRouter} from "./categoryRouter";

export const router = Router();
router.use("/users", userRouter);
router.use("/homes", homeRouter);
router.use('/categories', categoryRouter);

