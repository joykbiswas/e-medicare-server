import { Request, Response } from "express";
import { SellerService } from "./seller.service";

const updateMedicine = async (req: Request, res: Response) => {
  try {
    const sellerId = (req as any).user.userId;
    console.log("sellerId : ", sellerId);
    const { id } = req.params;
    console.log("Id : ", id);
    
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid medicine id",
      });
    }

    const medicine = await SellerService.updateMedicine(sellerId, id, req.body);
    res.status(200).json({ success: true, data: medicine });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const sellerId = (req as any).user.userId;
    const { id } = req.params;
    
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid medicine id",
      });
    }
    const medicine = await SellerService.deleteMedicine(sellerId, id);
    res.status(200).json({ success: true, data: medicine });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const sellerId = (req as any).user.userId;
    const orders = await SellerService.getSellerOrders(sellerId);
    res.status(200).json({ success: true, data: orders });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const sellerId = (req as any).user.userId;
    const { id } = req.params;
    
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid medicine id",
      });
    }
    
    const order = await SellerService.updateOrderStatus(sellerId, id, req.body);
    res.status(200).json({ success: true, data: order });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const SellerController = {
  updateMedicine,
  deleteMedicine,
  getOrders,
  updateOrderStatus,
};
