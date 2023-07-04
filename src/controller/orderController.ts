// orderController.ts
import jwtDecode from "jwt-decode";
import orderService from "../services/orderService";
import { Request, Response } from "express";

export const getToken = async (req: Request, res: Response) => {
  const decodedToken = await jwtDecode(req.headers.authorization);
  return decodedToken["idUser"];
};
class OrderController {
  private orderService;
  constructor() {
    this.orderService = orderService;
  }
  create = async (req: Request, res: Response) => {
    try {
      const homeId = req.params.id;
      const newOrder = req.body;
      const userId = await getToken(req, res);
      newOrder.user = userId;
      newOrder.home = homeId;
      const order = await orderService.create(newOrder);
      res.status(200).json(order);
      return order;
    } catch (err) {
      console.log(err);
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const userId = await getToken(req, res);
      let orders = await orderService.getForOwner(userId);
      res.status(200).json(orders);
    } catch (err) {
      console.log(err);
    }
  };

  access = async (req: Request, res: Response) => {
    try {
      const idOrder = req.params.id;
      await orderService.access(idOrder);
      res.status(200).json({ message: "access successful" });
    } catch (err) {
      console.log(err);
    }
  };

  refuse = async (req: Request, res: Response) => {
    try {
      const idOrder = req.params.id;
      await orderService.refuse(idOrder);
      res.status(200).json({ message: "refuse successful" });
    } catch (err) {
      console.log(err);
    }
  };
  checkOut = async (req: Request, res: Response) => {
    try {
      const idOrder = req.params.id;
      await orderService.checkOut(idOrder);
      res.status(200).json({ message: "checkOut nhà thành công" });
    } catch (err) {
      console.log(err);
    }
  };

  getHistory = async (req: Request, res: Response) => {
    try {
      const idUser = await getToken(req, res);
      const history = await orderService.getHistory(idUser);
      res.status(200).json(history);
    } catch (err) {
      console.log(err);
    }
  };
}
export default new OrderController();