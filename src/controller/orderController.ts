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
    create(body){
        return this.orderService.create(body);
    }
}

export default new OrderController();