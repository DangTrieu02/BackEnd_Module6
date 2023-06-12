import {Router} from 'express'
import userController from "../controller/userController";

export const userRouter = Router();

userRouter.post("/login",userController.login)
