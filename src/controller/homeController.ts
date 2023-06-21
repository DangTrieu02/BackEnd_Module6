import {Request, Response} from "express";
import homeService from "../services/homeService";
class homeController {
    private homeService;

    constructor() {
        this.homeService = homeService
    }



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


  async createHome(req: Request, res: Response) {
    try {
      const newHome = req.body;
      await homeService.createHome(newHome);
      res.status(200).json(newHome);
    } catch (err) {
      console.log(err, "at createHome controller");
    }
  }

  async getHomeByUserId(req: Request, res: Response) {
    try {
      const idUser = req.params.id;
      let homes = await homeService.getHomeByUserId(idUser);
      res.status(200).json(homes);
    } catch (err) {
      console.log(err, "at getAllHome controller");
    }
  }
    findByIdHome = async (req: Request, res: Response)=>{
        try {
            let idHome = req.params.idHome
            let homes = await this.homeService.findHomeById(idHome)
            return res.status(200).json(homes);
        }catch (err){
            res.status(500).json(err.message)
        }
    }


    async getAllHome(req: Request, res: Response) {
    try {
      const allHome = await homeService.getAllHome();
      res.status(201).json(allHome);
    } catch (err) {
      console.log(err, "at getAllHome controller");
    }
  }

  async updateHome(req: Request, res: Response) {
    try {
        const idHome = req.params.id;
        const newHome = req.body;
        console.log(newHome, "at update");

        const home = await homeService.updateHome(idHome,newHome);
        res.status(200).json(home);
    } catch (err) {
        console.log(err, "at updateHome controller");
    }
  }
    search = async (req: Request, res: Response)=>{
        try {
            let homes = await this.homeService.search(req,res)
            return res.status(200).json(homes);
        }catch (err){
            res.status(500).json(err.message)
        }
    }
}

export default new homeController();
