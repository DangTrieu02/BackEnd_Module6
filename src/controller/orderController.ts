import jwtDecode from "jwt-decode";
import orderService from "../services/orderService";
import { Request, Response } from "express";

export const getToken = async (req:Request, res:Response) =>{
    const decodedToken = await jwtDecode(req.headers.authorization);
    return decodedToken["idUser"]
}
class OrderController {
  private orderService;
  constructor() {
    this.orderService = orderService;
  }
  create = async (req:Request,res:Response) => {
    try{
        const newOrder = req.body;
        const userId = await getToken(req,res);
        const order = await orderService.create(userId)
         
        return order 
    }catch(err){
        console.log(err);
    }
  };
}

export default new OrderController();