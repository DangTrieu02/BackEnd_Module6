import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import {Order} from "../entity/order";

class OrderService {
  private orderRepository;
  constructor() {
    this.orderRepository = AppDataSource.getRepository(Order);
  }
  // create = async (body) => {
  //   try {
  //     const isHomeAvailable = await this.isHomeAvailableByDate(body.status, body.checkIn, body.checkOut)
  //     if (isHomeAvailable) {
  //
  //       return this.orderRepository.save(body);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  // async isHomeAvailableByDate(status: string, checkIn: Date, checkOut: Date) {
  //   const method1 = await this.orderRepository
  //       .createQueryBuilder('orders')
  //       .where('orders.homeIdHome = :homeIdHome', { homeIdHome })
  //       .andWhere('orders.status = "done"')
  //       .andWhere('orders.checkIn <= CAST(:checkOut as date)', { checkOut })
  //       .andWhere('orders.checkIn >= CAST(:checkIn as date)', { checkIn })
  //       .getMany();
  //
  //   const method2 = await this.orderRepository
  //       .createQueryBuilder('orders')
  //       .where('orders.homeIdHome = :homeIdHome', { homeIdHome })
  //       .andWhere('orders.status = "done"')
  //       .andWhere('orders.checkOut >= CAST(:checkIn as date)', { checkIn })
  //       .andWhere('orders.checkOut <= CAST(:checkOut as date)', { checkOut })
  //       .getMany();
  //   console.log(method1)
  //   if ((method1.length + method2.length) > 0) {
  //     return ('err')
  //   }
  //   return true;
  // }
}
export default new OrderService();
