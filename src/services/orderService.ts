import {AppDataSource} from "../dataSource";
import {Order} from "../entity/order";
import {Home} from "../entity/home";

class OrderService {
    private orderRepository;
    private homeRepository

    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order);
        this.homeRepository = AppDataSource.getRepository(Home);
    }

    async create(req, idUser, idHome) {
        try {
            const isHomeAvailable = await this.isHomeAvailableByDate(req.body.homIdHome, req.body.checkIn, req.body.checkOut);
            if (isHomeAvailable == true) {
                let booking = {
                    checkIn: req.body.checkIn,
                    checkOut: req.body.checkOut,
                    user: idUser,
                    home: idHome
                }
                await this.orderRepository.save(booking);
                return "Lưu đơn đặt phòng thành công.";
            } else {
                return "Phòng đã được thuê hoặc không khả dụng.";
            }
        } catch (error) {
            console.error("Lỗi khi lưu đơn đặt phòng:", error);
            return "Đã xảy ra lỗi khi lưu đơn đặt phòng.";
        }
    }

    async isHomeAvailableByDate(home: number, checkIn: Date, checkOut: Date) {
        const orders1 = await this.orderRepository
            .createQueryBuilder('orders')
            .where('orders.status = :status', {status: "waiting"})
            .andWhere('orders.checkIn >= CAST(:checkIn as date)', {checkIn})
            .andWhere('orders.checkIn <= CAST(:checkOut as date)', {checkOut})
            .getMany();
        const orders2 = await this.orderRepository
            .createQueryBuilder('orders')
            .where('orders.status = :status', {status: "waiting"})
            .andWhere('orders.checkOut >= CAST(:checkIn as date)', {checkIn})
            .andWhere('orders.checkOut <= CAST(:checkOut as date) ', {checkOut})
            .getMany();
        const orders3 = await this.orderRepository
            .createQueryBuilder('orders')
            .where('orders.status = :status', {status: "waiting"})
            .andWhere('orders.checkIn <= CAST(:checkIn as date)', {checkIn})
            .andWhere('orders.checkOut >= CAST(:checkOut as date) ', {checkOut})
            .getMany();
        if (orders1.length + orders2.length + orders3.length > 0) {
            return "da co phong dat thue"
        } else {
            return true
        }
    }
}

export default new OrderService();
