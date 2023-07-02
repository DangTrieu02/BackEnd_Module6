import {Router } from "express";
import OrderController from "../controller/orderController";

export const orderRouter = Router()
orderRouter.post('/:id', OrderController.create)
orderRouter.get('/', OrderController.getAll)
orderRouter.put('/:id', OrderController.access)
orderRouter.delete('/:id', OrderController.refuse)