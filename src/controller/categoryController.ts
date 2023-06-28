// category-controller.ts
import {Request, Response} from "express";
import categoryService from "../services/categoryService";

class CategoryController {
    getAllCategories = async (req: Request, res: Response) => {
        const categories = await categoryService.getAllCategory();
        res.json(categories);
    };

    getCategoryById = async (req: Request, res: Response) => {
        const id = req.params.idCategory;
        const category = await categoryService.getCategoryById(id);
        if (!category) {
            return res.status(404).json({message: "Category not found"});
        }
        res.json(category);
    };

    addCategory = async (req: Request, res: Response) => {
        const {nameCategory} = req.body;
        if (!nameCategory) {
            return res.status(400).json({message: "nameCategory is required"});
        }

        await categoryService.addCategory(nameCategory);
        res.status(201).json({message: "Category added successfully"});
    };
}

export default new CategoryController();