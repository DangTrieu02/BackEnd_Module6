// orderController.ts
import jwtDecode from "jwt-decode";
import { Request, Response } from "express";
import orderService from "../services/orderService";

export const getToken = async (req:Request, res:Response) =>{
    const decodedToken = await jwtDecode(req.headers.authorization);
    return decodedToken["idUser"]
}
class OrderController {
  constructor() {}
    create = async (req: Request, res: Response) => {
        try{
            let userID = await getToken(req, res)
            let homeID = req.params.idHome
            let order = await orderService.create(req, userID, homeID);
            return res.status(200).json(order)
        }catch (err){
            return err
        }
    }
}

export default new OrderController();