import { Request, Response } from "express";
import { AppDataSource } from "../dataSource";
import { Order } from "./../entity/order";
import { Between } from "typeorm";

class OrderService {
  private orderRepository;
  constructor() {
    this.orderRepository = AppDataSource.getRepository(Order);
  }
  create = async (order) => {
    try {
      let a = await this.isHomeAvailableByDate(
        order.home,
        order.checkIn,
        order.checkOut
      );
      if (a) {
        return this.orderRepository.save(order);
      } else {
        return 'đã có người đặt phòng vào khoảng thời gian này '
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  async isHomeAvailableByDate(idHome, checkIn, checkOut) {
    try{
        const checkHomeByDate1 = await this.orderRepository.query(`
        SELECT * FROM \`order\`
        JOIN home h ON h.idHome = ${idHome}
        WHERE \`order\`.status = 'renting'
        AND ('${checkIn}' BETWEEN \`order\`.checkIn AND \`order\`.checkOut
        OR '${checkOut}' BETWEEN \`order\`.checkIn AND \`order\`.checkOut)
      `);
  
      const checkHomeByDate2 = await this.orderRepository.query(`
        SELECT * FROM \`order\`
        JOIN home h ON h.idHome = ${idHome}
        WHERE \`order\`.status = 'renting'
        AND ('${checkIn}' <= \`order\`.checkIn AND '${checkOut}' >= \`order\`.checkOut)
      `);
  
      console.log(checkHomeByDate1, checkHomeByDate2);
      if (checkHomeByDate1.length + checkHomeByDate2.length > 0) {
        console.log("Đã có người đặt");
        return false;
      } else {
        console.log("OK");
        return true;
      }
    }catch(err){
        console.log(err);
    }
  }
}
export default new OrderService();
