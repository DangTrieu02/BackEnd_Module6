import {Router} from 'express'
import userController from "../controller/userController";
import {checkRegister} from '../middleware/form';
import {auth} from "../middleware/auth";
import {userAuth} from "../middleware/user";
import {ownerAuth} from "../middleware/owner";

export const userRouter = Router();

userRouter.post("/login", userController.login)
userRouter.post("/login-google", userController.loginWithGG)
userRouter.post('/register', checkRegister, userController.register)
userRouter.put('/change-password/:idUser', userController.changePassword);
// userRouter.put("/edit-profile/:idUser", userController.updateProfile); // New route for editing profile
userRouter.use(auth)
userRouter.get('/my-profile/:idUser', auth, userController.showMyProfile);
userRouter.put("/edit-profile/:idUser", auth, userController.editProfile)