// user-router.ts
import {Router} from "express";
import userController from "../controller/userController";

export const userRouter = Router();
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/change-password', userController.changePassword);