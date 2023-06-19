// homeService.ts
import {AppDataSource} from "../dataSource";
import {Home} from "../entity/home";
import {Like, In} from "typeorm";

class HomeService {
    private homeRepository;

    constructor() {
        this.homeRepository = AppDataSource.getRepository(Home);
    }

    getAllHome = async () => {
        return await this.homeRepository.find({
            relations: {
                category: true,
                image: true, // Include image relation
            },
        });
    }

    addHome = async (home) => {
        await this.homeRepository.save(home);
    }

    removeHome = async (id) => {
        return await this.homeRepository.delete(id);
    }

    findHomeById = async (id) => {
        return await this.homeRepository.findOne(id, {
            relations: {
                category: true,
                image: true, // Include image relation
            },
        });
    }

    findByCategoryId = async (categoryId) => {
        return await this.homeRepository.find({
            where: {
                category: {idCategory: categoryId},
            },
            relations: ["category", "image"], // Include category and image relations
        });
    };

    findByNameHome = async (name) => {
        const products = await this.homeRepository.find({
            where: {
                nameHome: Like(`%${name}%`),
            },
            relations: {
                category: true,
                image: true, // Include image relation
            },
        });

        if (products.length === 0) {
            return "Can not find by name";
        }

        return products;
    };

    findByPrice = async (min, max) => {
        let query = this.homeRepository.createQueryBuilder("home");

        if (min && max) {
            query = query.where("home.price >= :min AND home.price <= :max", {min, max});
        } else if (min) {
            query = query.where("home.price >= :min", {min});
        } else if (max) {
            query = query.where("home.price <= :max", {max});
        }

        query = query.leftJoinAndSelect("home.image", "image"); // Include image relation

        const homes = await query.getMany();

        if (homes.length === 0) {
            return "Can not find by price";
        }

        return homes;
    };

    editHome = async (id, product) => {
        return await this.homeRepository.update(id, product);
    };
}

export default new HomeService();
