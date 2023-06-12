import {Router} from 'express'
import userController from "../controller/userController";
import { checkRegister } from '../middleware/form';

export const userRouter = Router();

userRouter.post("/login",userController.login)
userRouter.post('/register', checkRegister, userController.register)
