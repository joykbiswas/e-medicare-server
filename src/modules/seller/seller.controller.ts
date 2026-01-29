import { Request, Response } from "express";
import { SellerService } from "./seller.service";
import { OrderStatus } from "../../../generated/prisma/enums";

interface UpdateOrderStatusPayload {
  status: OrderStatus;
}
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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const orders = await SellerService.getSellerOrders(page, limit);

    res.status(200).json({
      success: true,
       ... orders,
    });
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
        message: "Invalid order id",
      });
    }

    const { status } = req.body as UpdateOrderStatusPayload;

    // ✅ Validate against Prisma enum values dynamically
    const validStatuses = Object.values(OrderStatus);
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status value. Allowed values: ${validStatuses.join(", ")}`,
      });
    }

    const updatedOrder = await SellerService.updateOrderStatus( id, { status });

    return res.status(200).json({ success: true, data: updatedOrder });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const SellerController = {
  updateMedicine,
  deleteMedicine,
  getOrders,
  updateOrderStatus,
};
