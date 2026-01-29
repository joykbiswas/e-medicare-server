import { Request, Response } from "express";
// import { AdminService } from "./admin.service";
import sortingHelper from "../../helpers/sortingHelper";
import { AdminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await AdminService.getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, isBanned } = req.body;

     
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid medicine id",
      });
    }
    const updatedUser = await AdminService.updateUserStatus(id, {
      status,
      isBanned,
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update user",
    });
  }
};


const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { page, limit, skip } = sortingHelper(req.query);

    const result = await AdminService.getAllOrders({
      page,
      limit,
      skip,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Orders fetch failed!",
    });
  }
};


const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid category id",
      });
    }

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const result = await AdminService.updateCategory(id, name);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Category update failed",
    });
  }
};


export const AdminController = {
  getAllUsers,
  updateUserStatus,
  getAllOrders,
  updateCategory
};
