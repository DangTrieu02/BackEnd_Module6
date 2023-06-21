import {Router } from "express";
import {auth} from "../middleware/auth";
import bookController from "../controller/bookController";


export const bookRouter = Router()
bookRouter.use(auth)
bookRouter.post('/isHome', bookController.createOder)