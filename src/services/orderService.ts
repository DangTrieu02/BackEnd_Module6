// orderService.ts
import { AppDataSource } from "../dataSource";
import { Order } from "../entity/order";
import { Home } from "../entity/home";

class OrderService {
  private orderRepository;
  private homeRepository;

  constructor() {
    this.orderRepository = AppDataSource.getRepository(Order);
    this.homeRepository = AppDataSource.getRepository(Home);
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
        return "đã có người đặt phòng vào khoảng thời gian này ";
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  async isHomeAvailableByDate(idHome, checkIn, checkOut) {
    try {
      const checkHomeByDate1 = await this.orderRepository.query(`
                SELECT *
                FROM \`order\`
                         JOIN home h ON h.idHome = ${idHome}
                WHERE \`order\`.status = 'renting'
                  AND ('${checkIn}' BETWEEN \`order\`.checkIn AND \`order\`.checkOut
                    OR '${checkOut}' BETWEEN \`order\`.checkIn AND \`order\`.checkOut)
            `);

      const checkHomeByDate2 = await this.orderRepository.query(`
                SELECT *
                FROM \`order\`
                         JOIN home h ON h.idHome = ${idHome}
                WHERE \`order\`.status = 'renting'
                  AND ('${checkIn}' <= \`order\`.checkIn AND '${checkOut}' >= \`order\`.checkOut)
            `);
      if (checkHomeByDate1.length + checkHomeByDate2.length > 0) {
        console.log("Đã có người đặt");
        return false;
      } else {
        console.log("OK");
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async isUserBooking(idUser, idHome, checkIn, checkOut) {
    try {
      const checkUser1 = await this.orderRepository.query(`
                select *
                FROM \`order\` o
                         join home h on h.idHome = ${idHome}
                         join user on user.idUser = ${idUser}
                WHERE o.status = 'waiting'
                    AND ${checkIn} BETWEEN o.checkIn AND o.checkOut
                   OR ${checkOut} BETWEEN o.checkIn AND o.checkOut`);

      const checkUser2 = await this.orderRepository.query(`
                SELECT *
                FROM \`order\`
                         JOIN home h ON h.idHome = ${idHome}
                         join user on user.idUser = ${idUser}
                WHERE \`order\`.status = 'waiting'
                  AND ('${checkIn}' <= \`order\`.checkIn AND '${checkOut}' >= \`order\`.checkOut)`);

      if (checkUser1.length + checkUser2.length > 0) {
        console.log("bạn đã đặt này nhà vào khoảng thời gian này");
        return false;
      } else {
        console.log("OK");
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getForOwner(id) {
    try {
      return this.orderRepository
          .createQueryBuilder("order")
          .leftJoinAndSelect("order.user", "user")
          .leftJoinAndSelect("order.home", "home")
          .leftJoinAndSelect("home.image", "image")
          .where("user.idUser = :id", { id })
          .getMany();
    } catch (err) {
      console.log(err);
    }
  }

  async access(id) {
    try {
      await this.orderRepository.update({ id: id }, { status: "renting" });
    } catch (err) {
      console.log(err);
    }
  }

  async refuse(id) {
    try {
      await this.orderRepository.delete({ id: id });
    } catch (err) {
      console.log(err);
    }
  }
  async checkOut(id) {
    try {
      await this.orderRepository.update({ id: id }, { status: "done" });
    } catch (err) {
      console.log(err);
    }
  }


  async getHistory(idUser) {
    try {
      return this.orderRepository
          .createQueryBuilder("order")
          .leftJoinAndSelect("order.user", "user")
          .leftJoinAndSelect("order.home", "home")
          .leftJoinAndSelect("home.image", "image")
          .where("user.idUser = :idUser", { idUser })
          .andWhere("order.status = :status", { status: "done" })
          .getMany();
    } catch (err) {
      console.log(err.message);
    }
  }
}

export default new OrderService();
