import {Request, Response} from "express";
import homeService from "../services/homeService";
import categoryService from "../services/categoryService";
import {UploadedFile} from "express-fileupload";

class homeController {
    private homeService;

    constructor() {
        this.homeService = homeService
    }
    getAllHome = async (req: Request, res: Response) => {
        try {
            let orders;
            let data;
            let homes = await homeService.getAllHome();
            let categories = await categoryService.getAllCategory();
            if (req["decoded"]) {
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
            const homes = await this.homeService.findHomeForRent();
            res.status(201).json({
                homes: homes
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    };

    findHomeRented = async (req: Request, res: Response) => {
        try {
            const homes = await this.homeService.findHomeRented();
            res.status(201).json({
                homes: homes
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    };

    addHome = async (req: Request, res: Response) => {
        try {
            if (!req.body.nameHome) {
                return res.status(400).json({
                    message: "nameHome missing",
                });
            }

            await this.homeService.addHome(req.body);
            res.status(201).json({
                message: "OK",
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    removeHome = async (req: Request, res: Response) => {
        try {
            const id = req.params.idHome;
            await this.homeService.removeHome(id);
            res.status(200).json({
                message: "Delete success",
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    editHome = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.idHome);
            const product = req.body;
            await this.homeService.editHome(id, product);
            res.status(200).json({
                message: "Edit success",
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    findHomeById = async (req: Request, res: Response) => {
        try {
            const id = req.params.idHome;
            const product = await this.homeService.findHomeById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    findByCategoryId = async (req: Request, res: Response) => {
        try {
            const categoryId = req.params.categoryId;
            const products = await this.homeService.findByCategoryId(categoryId);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    findByNameHome = async (req: Request, res: Response) => {
        try {
            const nameHome = req.query.nameHome;
            const response = await this.homeService.findByNameHome(nameHome);
            console.log(response)
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    findByPrice = async (req: Request, res: Response) => {
        try {
            const min = req.query.min;
            const max = req.query.max;
            const response = await this.homeService.findByPrice(min, max);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    uploadImage = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.idHome);

            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid home ID" });
            }

            const file = req.files?.image as UploadedFile;

            if (!file) {
                return res.status(400).json({ message: "No image file provided" });
            }

            const imageUrl = await this.homeService.uploadImage(id, file);

            res.status(200).json({ imageUrl });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    changeHomeStatus = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.idHome);
            const newStatus = await this.homeService.changeHomeStatus(id);
            res.status(200).json({ message: `Home status changed to ${newStatus}` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    findByStatus = async (req: Request, res: Response) => {
        try {
            const status = req.query.status as string;

            if (!status) {
                return res.status(400).json({ message: "Status missing" });
            }

            const homes = await this.homeService.findByStatus(status);
            res.status(200).json(homes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export default new homeController();
