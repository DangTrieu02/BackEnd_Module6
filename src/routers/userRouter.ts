// user-router.ts
import { Router } from "express";
import userController from "../controller/userController";

export const userRouter = Router();
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.put('/change-password/:idUser', userController.changePassword);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:idUser', userController.getUserById);
