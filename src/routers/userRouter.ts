import {Router} from 'express'
import userController from "../controllers/userController";
import { checkRegister } from '../middleware/form';

const userRouter = Router()

userRouter.post('/register', checkRegister, userController.register)
export default userRouter