import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  try {
    const review = await ReviewService.createReview(userId!, req.body);
    res.status(201).json({ success: true, data: review });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};



export const ReviewController = {
  createReview,
};
