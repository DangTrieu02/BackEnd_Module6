import { AppDataSource } from "../dataSource";
import { Category } from "../entity/category";

class CategoryService {
    private categoryRepository;
  
    constructor() {
      this.categoryRepository = AppDataSource.getRepository(Category);
    }
    async getAll () {
        return await this.categoryRepository.find()
    }

}

export default new CategoryService()