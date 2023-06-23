import {Router} from 'express';
import {userRouter} from "./userRouter";
import {homeRouter} from "./homeRouter";
import {bookRouter} from "./bookRouter";
export  const router = Router()
router.use('/users',userRouter);
router.use("/home",homeRouter)
router.use('/book', bookRouter)