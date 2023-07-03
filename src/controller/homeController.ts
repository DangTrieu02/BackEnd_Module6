// homeController.ts
import {Request, Response} from "express";
import homeService from "../services/homeService";
import {UploadedFile} from "express-fileupload";
import categoryService from "../services/categoryService";


class HomeController {
    constructor() {
    }

    createHome = async (req: Request, res: Response) => {
        try {
            console.log(req.body, 1111)
            let homes = await homeService.createHome(req.body);
            return res.status(200).json(homes);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    findCategory = async (req: Request, res: Response) => {
        try {
            let categories = await categoryService.getAllCategory();
            return res.status(200).json(categories);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };


    async getHomeByUserId(req: Request, res: Response) {
        try {
            const idUser = req.params.id;
            let homes = await homeService.getHomeByUserId(idUser);
            res.status(200).json(homes);
        } catch (err) {
            console.log(err, "at getAllHome controller");
        }
    }


    async getAllHome(req: Request, res: Response) {
        try {
            const allHome = await homeService.getAllHome();
            res.status(200).json(allHome);
        } catch (err) {
            console.log(err, "at getAllHome controller");
        }
    }


    async updateHome(req: Request, res: Response) {
        try {
            const idHome = req.params.id;
            const newHome = req.body;
            console.log(newHome, "at update");

            const home = await homeService.updateHome(idHome, newHome);
            res.status(200).json(home);
        } catch (err) {
            console.log(err, "at updateHome controller");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const listProduct = await homeService.getAllHome();
            res.status(200).json(listProduct);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };


    findHomeByAddress = async (req: Request, res: Response) => {
        try {
            const address = req.query.address;
            const homes = await homeService.findHomeByAddress(address);
            res.status(201).json({
                home: homes,
                address: address
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    };


    findHomeForRent = async (req: Request, res: Response) => {
        try {
            const homes = await homeService.findHomeForRent();
            res.status(201).json({
                homes: homes
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    };


    findHomeRented = async (req: Request, res: Response) => {
        try {
            const homes = await homeService.findHomeRented();
            res.status(201).json({
                homes: homes
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    };


    findHomeById = async (req: Request, res: Response) => {
        try {
            const id = req.params.idHome;
            const product = await homeService.findHomeById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };


    findByCategoryId = async (req: Request, res: Response) => {
        try {
            const categoryId = req.params.categoryId;
            const products = await homeService.findByCategoryId(categoryId);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };


    findByNameHome = async (req: Request, res: Response) => {
        try {
            const nameHome = req.query.nameHome;
            const response = await homeService.findByNameHome(nameHome);
            console.log(response)
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };


    findByPrice = async (req: Request, res: Response) => {
        try {
            const min = req.query.min;
            const max = req.query.max;
            const response = await homeService.findByPrice(min, max);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };


    changeHomeStatus = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.idHome);
            const newStatus = await homeService.changeHomeStatus(id);
            res.status(200).json({message: `Home status changed to ${newStatus}`});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };


    findByStatus = async (req: Request, res: Response) => {
        try {
            const status = req.query.status as string;


            if (!status) {
                return res.status(400).json({message: "Status missing"});
            }


            const homes = await homeService.findByStatus(status);
            res.status(200).json(homes);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };


    removeHome = async (req: Request, res: Response) => {
        try {
            const id = req.params.idHome;
            await homeService.removeHome(id);
            res.status(200).json({
                message: "Delete success",
            });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };
}


export default new HomeController();

