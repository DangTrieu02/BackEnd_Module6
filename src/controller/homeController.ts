import { Request, Response } from "express";
import homeService from "../services/homeService";

class HomeController {
  constructor() {}
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
        
        const home = await homeService.updateHome(idHome,newHome);
        res.status(200).json(home);
    } catch (err) {
        console.log(err, "at updateHome controller");
    }
  }
}

export default new HomeController();
