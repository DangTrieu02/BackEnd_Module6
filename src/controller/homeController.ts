import {Request, Response} from "express";
import homeService from "../services/HomeService";
import HomeService from "../services/HomeService";
import categoryService from "../services/categoryService";

class homeController {
    private homeService;

    constructor() {
        this.homeService = HomeService
    }
    getAllHome = async (req: Request, res: Response) => {
        try {
            let orders;
            let data;
            let homes = await homeService.getAll();
            let categories = await categoryService.getAllCategory();
            if (req["decoded"]) {
                // orders = await orderService.getMyOrder(req["decoded"].idUser);
                data = [homes, categories, orders];
            } else {
                data = [homes, categories];
            }
            return res.status(200).json(homes);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };


    findHomeByAddress = async (req: Request, res: Response) => {
        try {
            const address = req.query.address;
            const homes = await this.homeService.findHomeByAddress(address);
            return res.status(201).json({
                homes: homes,
                address: address
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    findHomeForRent = async (req: Request, res: Response) => {
        try {
            const homes = await homeService.findHomeForRent();
            return res.status(201).json({
                homes: homes.homes
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    findHomeForRented = async (req: Request, res: Response) => {
        try {
            const homes = await homeService.findHomeRented();
            return res.status(201).json({
                homes: homes.homes
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

}
export default new homeController();