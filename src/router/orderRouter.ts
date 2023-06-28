import {Router } from "express";
import OrderController from "../controller/orderController";

export const orderRouter = Router()
orderRouter.post('/', OrderController.create)