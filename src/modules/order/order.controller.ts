import { Request, Response } from "express";
import { OrderService } from "./order.service";
import sortingHelper from "../../helpers/sortingHelper";

const createOrder = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId; //Current User Id
  console.log("userId:- ", userId);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }
  try {
    const order = await OrderService.createOrder(userId, req.body);
    res.status(201).json({ success: true, data: order });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const { sortBy, sortOrder } = sortingHelper(req.query);

    const result = await OrderService.getMyOrders(userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      error: "Order found failed !",
      details: error,
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Order ID is required",
    });
  }

  const result = await OrderService.getOrderById(id, userId);

  res.status(200).json({
    success: true,
    data: result,
  });
};

const cancelOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const result = await OrderService.cancelOrder(id, userId);

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


export const OrderController = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
};
