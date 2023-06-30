import {Request, Response} from "express";
import {AppDataSource} from "../dataSource";
import {Order} from "./../entity/order";

class OrderService {
    private orderRepository;

    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order);
    }

    create = async (idUser) => {
        try {
            return this.orderRepository.save({user: idUser});
        } catch (err) {
            console.log(err.message);
        }
    };
}

export default new OrderService();
