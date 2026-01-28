// import { prisma } from "../../prisma/prismaClient";

import { prisma } from "../../lib/prisma";

const createCategory = async (name: string) => {
  return prisma.category.create({
    data: { name },
  });
};

const getAllCategories = async ({ sortBy, sortOrder }: {sortBy: string; sortOrder: string }) => {
  return prisma.category.findMany({
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
};

const getCategoryById = async (id: string) => {
  return prisma.category.findUnique({
    where: { id },
    include: { medicines: true },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
};
