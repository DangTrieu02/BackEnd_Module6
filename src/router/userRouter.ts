import {Router} from 'express'
import userController from "../controller/userController";
import { checkRegister } from '../middleware/form';

export const userRouter = Router();

userRouter.post("/login",userController.login)
userRouter.post('/register', checkRegister, userController.register)
userRouter.put('/change-password/:idUser', userController.changePassword);
userRouter.put("/edit-profile/:idUser", userController.updateProfile); // New route for editing profile
