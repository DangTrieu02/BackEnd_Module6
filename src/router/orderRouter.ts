import {Router } from "express";
import OrderController from "../controller/orderController";
import {auth} from "../middleware/auth";
import {userRouter} from "./userRouter";
userRouter.use(auth)

export const orderRouter = Router()
orderRouter.post('/*/:idHome',auth, OrderController.create)