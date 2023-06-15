// userRouter.ts
import {Router} from 'express'
import userController from "../controller/userController";
import { checkRegister } from '../middleware/form';
import {auth} from "../middleware/auth";
import {homeRouter} from "./homeRouter";
import {userAuth} from "../middleware/user";
import {ownerAuth} from "../middleware/owner";

export const userRouter = Router();

userRouter.post("/login",userController.login)
userRouter.post("/login-google",userController.loginWithGG)
userRouter.post('/register', checkRegister, userController.register)

userRouter.use(auth);
userRouter.put('/change-password/', userController.changePassword);
userRouter.get('/my-profile/:idUser',auth,userController.showMyProfile);
userRouter.put ("/edit-profile/:idUser",auth, userController.editProfile)
