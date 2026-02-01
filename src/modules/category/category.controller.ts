import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import sortingHelper from "../../helpers/sortingHelper";

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const result = await CategoryService.createCategory(name);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      error: "Category create failed",
      details: error,
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const { sortBy, sortOrder } = sortingHelper(req.query);

    const result = await CategoryService.getAllCategories({
      sortBy,
      sortOrder,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      error: "Category found failed !",
      details: error,
    });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid medicine id",
      });
    }
    
    const result = await CategoryService.getCategoryById(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      error: "Post found failed",
      details: error,
    });
  }
};
const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid category id",
      });
    }

    // Check if category exists
    const existingCategory = await CategoryService.getCategoryById(id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if category has medicines
    if (existingCategory.medicines && existingCategory.medicines.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category with associated medicines. Remove or reassign medicines first.",
      });
    }

    // Delete the category
    const result = await CategoryService.deleteCategory(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete category",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


export const CategoryController = {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
