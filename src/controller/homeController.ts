// homeController.ts
import {Request, Response} from "express";
import homeService from "../services/homeService";

class HomeController {
    constructor() {
    }

    findAll = async (req: Request, res: Response) => {
        const listProduct = await homeService.getAllHome();
        res.status(200).json(listProduct);
    };

    addHome = async (req: Request, res: Response) => {
        await homeService.addHome(req.body);
        if (!req.body.nameHome) {
            return res.status(400).json({
                message: "nameHome missing",
            });
        }
        res.status(201).json({
            message: "OK",
        });
    };

    removeHome = async (req: Request, res: Response) => {
        const id = req.params.idHome;
        await homeService.removeHome(id);
        res.status(200).json({
            message: "Delete success",
        });
    };

    findHomeById = async (req: Request, res: Response) => {
        const id = req.params.idHome;
        const product = await homeService.findHomeById(id);
        res.status(200).json(product);
    };

    findByCategoryId = async (req: Request, res: Response) => {
        const categoryId = req.params.categoryId;
        const products = await homeService.findByCategoryId(categoryId);
        res.status(200).json(products);
    };

    editHome = async (req: Request, res: Response) => {
        const id = req.params.idHome;
        const product = req.body;
        await homeService.editHome(id, product);
        res.status(200).json({
            message: "Edit success",
        });
    };

    findByNameHome = async (req: Request, res: Response) => {
        const name = req.query.search;
        try {
            const response = await homeService.findByNameHome(name);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };

    findByPrice = async (req: Request, res: Response) => {
        try {
            const min = req.query.min;
            const max = req.query.max;
            const response = await homeService.findByPrice(min, max);
            res.status(200).json(response);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
}

export default new HomeController();
