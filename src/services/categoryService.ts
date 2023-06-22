// category-service.ts
import {AppDataSource} from "../dataSource";
import {Category} from "../entity/category";
import {Repository} from "typeorm";

class CategoryService {
    private categoryRepository: Repository<Category>;

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
    }

    getAllCategory = async () => {
        return await this.categoryRepository.find();
    };

    getCategoryById = async (id: string) => {
        return await this.categoryRepository.findOne({
            where: {idCategory: id},
        });
    };

    addCategory = async (nameCategory: string) => {
        const category = new Category();
        category.nameCategory = nameCategory;
        await this.categoryRepository.save(category);
    };
}

export default new CategoryService();