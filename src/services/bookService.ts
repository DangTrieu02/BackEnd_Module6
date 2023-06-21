import {AppDataSource} from "../dataSource";
import {OrderDetail} from "../entity/order-detail";
import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';


class BookService {
    private bookReposotory
    constructor() {
    this.bookReposotory = AppDataSource.getRepository(OrderDetail)
    }

    async create(order) {
            await this.isHomeAvailableByDate(order.idHome, order.checkIn, order.checkOut);
            return this.bookReposotory.save(order);
    }

    async isHomeAvailableByDate(idHome: number, checkIn: Date, checkOut: Date) {
        const checkHomeByDate1 = await this.bookReposotory
            .createQueryBuilder('orders')
            .where('orders.id = :idHome', {idHome})
            .andWhere('orders.statusOrder = "empty"')
            .andWhere('orders.checkIn <= CAST(:checkOut as date)', { checkOut })
            .andWhere('orders.checkIn >= CAST(:checkIn as date)', { checkIn })
            .getMany();
        const checkHomeByDate2 = await this.bookReposotory
            .createQueryBuilder('orders')
            .where('orders.id = :idHome', {idHome})
            .andWhere('orders.statusOrder = "empty"')
            .andWhere('orders.checkOut >= CAST(:checkIn as date)', { checkIn })
            .andWhere('orders.checkOut <= CAST(:checkOut as date)', { checkOut })
            .getMany();
        if ((checkHomeByDate1.length + checkHomeByDate2.length) > 0) {
            return new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        } else {
            console.log('ok')
            return true
        }
    }

}
export default new BookService()