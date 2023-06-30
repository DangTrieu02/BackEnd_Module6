import { Home } from "../entity/home";
import { AppDataSource } from "../dataSource";
import imageService from "./imageService";
import {Like} from "typeorm";
import {UploadedFile} from "express-fileupload";
class HomeService {
  private homeRepository;

  constructor() {
    this.homeRepository = AppDataSource.getRepository(Home);
  }

  async createHome(newHome) {
    try {
      let home = await this.homeRepository.save(newHome);
      for (let i = 0; i < newHome.image.length; i++) {
        await imageService.createImage(home.idHome, newHome.image[i]);
      }
      let homeRes = await this.homeRepository.findOne({
        where: { idHome: home.idHome },
        relations: {
          image: true,
        },
      });
      console.log("service", homeRes)
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
      return await this.homeRepository.save(home);
    } catch (e) {
      console.log(e);
    }
  }

  findHomeById = async (id) => {
    return await this.homeRepository.findOne(id, {
      relations: {
        category: true,
        image: true,
      },
    });
  };

  findByCategoryId = async (categoryId) => {
    return await this.homeRepository.find({
      where: {
        category: { idCategory: categoryId },
      },
      relations: {
        category: true,
        image: true,
      },
    });
  };

  findHomeByAddress = async (value) => {
    const homes = await this.homeRepository
        .createQueryBuilder("home")
        .innerJoin("home.category", "category")
        .where("home.address LIKE :value", { value: `%${value}%` })
        .getMany();

    return { homes };
  };

  findHomeForRent = async () => {
    const homes = await this.homeRepository
        .createQueryBuilder("home")
        .innerJoin("home.category", "category")
        .where("home.status = :status", { status: "For rent" })
        .getMany();

    return { homes };
  };

  findHomeRented = async () => {
    const homes = await this.homeRepository
        .createQueryBuilder("home")
        .innerJoin("home.category", "category")
        .where("home.status = :status", { status: "Rented" })
        .getMany();

    return { homes };
  };

  findByNameHome = async (nameHome) => {
    const homes = await this.homeRepository.find({
      where: {
        nameHome: Like(`%${nameHome}%`),
      },
      relations: ["category", "image"],
    });

    return homes;
  };

  findByPrice = async (min, max) => {
    const query = this.homeRepository
        .createQueryBuilder("home")
        .leftJoinAndSelect("home.image", "image")
        .where("home.price >= :min", { min })
        .andWhere("home.price <= :max", { max });

    const homes = await query.getMany();

    if (homes.length === 0) {
      throw new Error("Can not find by price");
    }

    return homes;
  };

  editHome = async (id, product) => {
    return await this.homeRepository.update(id, product);
  };


  changeHomeStatus = async (id: number) => {
    const home = await this.homeRepository.findOne(id);

    if (!home) {
      throw new Error("Home not found");
    }

    let newStatus: string;

    switch (home.status) {
      case "available":
        newStatus = "hiring";
        break;
      case "hiring":
        newStatus = "unavailable";
        break;
      case "unavailable":
        newStatus = "available";
        break;
      default:
        newStatus = "available";
        break;
    }

    home.status = newStatus;
    await this.homeRepository.save(home);

    return newStatus;
  };

  findByStatus = async (status: string) => {
    console.log(status);
    return await this.homeRepository.find({
      where: { status },
      relations: ["category", "image"],
    });
  };
  removeHome = async (id) => {
    return await this.homeRepository.delete({ idHome: id });
  };

}

export default new HomeService();
