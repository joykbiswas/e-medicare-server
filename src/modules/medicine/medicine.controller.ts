import { NextFunction, Request, Response } from "express";
import { MedicineService } from "./medicine.service";

const createMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    console.log("User:", user);
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized",
      });
    }
    const result = await MedicineService.createMedicine(req.body, user.id as string);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllMedicines = async (_req: Request, res: Response) => {
  try {
    const result = await MedicineService.getAllMedicines();

  res.status(200).json({
    success: true,
    data: result,
  });
  } catch (error) {
    res.status(400).json({
      error: "Medicine found failed!",
      details: error,
    });
  }
};

// TODo: search by name, category
const getMedicineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid medicine id",
      });
    }

    const result = await MedicineService.getMedicineById(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      error: "Medicine found failed",
      details: error
    });
  }
};

export const MedicineController = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
};
