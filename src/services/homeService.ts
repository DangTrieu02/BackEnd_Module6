import { AppDataSource } from "../dataSource";
import { Home } from "../entity/home";
import { Like } from "typeorm";
import { UploadedFile } from "express-fileupload";
import { Image } from "../entity/image";

class HomeService {
    private homeRepository;

    constructor() {
        this.homeRepository = AppDataSource.getRepository(Home);
    }

    getAllHome = async () => {
        return await this.homeRepository.find({
            relations: {
                category: true,
                image: true,
            },
        });
    };

    addHome = async (home) => {
        await this.homeRepository.save(home);
    };

    removeHome = async (id) => {
        return await this.homeRepository.delete({ idHome: id });
    };

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

    findByNameHome = async (name) => {
        const homes = await this.homeRepository.find({
            where: {
                nameHome: Like(`%${name}%`),
            },
            relations: ["category", "image"],
        });

        if (homes.length === 0) {
            throw new Error("Cannot find homes by name");
        }

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

    uploadImage = async (homeId: number, file: UploadedFile): Promise<string> => {
        const home = await this.homeRepository.findOne(homeId, {
            relations: ["image"],
        });

        if (!home) {
            throw new Error("Home not found");
        }

        const image = new Image();
        image.image = file.data.toString("base64");
        image.home = home;

        home.image = image;

        await this.homeRepository.save(home);

        return image.image;
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
        return await this.homeRepository.find({
            where: { status },
            relations: ["category", "image"],
        });
    };
}

export default new HomeService();
