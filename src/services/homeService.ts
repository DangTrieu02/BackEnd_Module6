import { Home } from "../entity/home";
import { AppDataSource } from "../dataSource";
import imageService from "./imageService";
class HomeService {
  private homeRepository;

  constructor() {
    this.homeRepository = AppDataSource.getRepository(Home);
  }

  async createHome(newHome) {
    try {
      let home = await this.homeRepository.save(newHome);
      await imageService.createImage(home.idHome, newHome.Image);
      let homeRes = await this.homeRepository.findOne({
        where: { idHome: home.idHome },
        relations: {
          image: true,
        },
      });
      return homeRes;
    } catch (e) {
      console.log(e, "at createHome");
    }
  }

  async getAllHome() {
    try {
      return await this.homeRepository.find({
        relations: {
          image: true,
        },
      });
    } catch (e) {
      console.log(e, "at getAllHome");
    }
  }

  async getHomeByUserId(userId) {
    try {
      return await this.homeRepository.find({
        where: { user: { idUser: userId } },
        relations: {
          image: true,
        },
      });
    } catch (e) {
      console.log(e, "at getHomeByUser ");
    }
  }

  async getHome(userId) {
    try {
      return await this.homeRepository.find();
    } catch (e) {
      console.log(e, "at getHomeByUser ");
    }
  }

  async updateHome(id, newHome) {
    try {
      let home = await this.homeRepository.findOneBy({ idHome: id });
      home = { ...home, ...newHome };
      let resHome= await this.homeRepository.save(home);
      return  await this.homeRepository.find({
        where: { idHome: resHome.idHome},
        relations: {
          image: true,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new HomeService();
