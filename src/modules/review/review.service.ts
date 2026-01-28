import { prisma } from "../../lib/prisma";

interface ReviewPayload {
  rating: number;
  comment?: string;
  medicineId: string;
}

const createReview = async (userId: string, payload: ReviewPayload) => {
  const { rating, comment, medicineId } = payload;

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  return prisma.review.create({
    data: {
      userId,
      medicineId,
      rating,
      comment: comment || null,
    },
  });
};

export const ReviewService = {
  createReview,
};
