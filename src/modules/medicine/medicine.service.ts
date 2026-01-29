// import { prisma } from "../../prisma/prismaClient";

import { Medicine } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMedicine = async (
  data: Omit<Medicine, "id" | "createdAt" | "updatedAt">,
  userId: string
) => {
  const result = await prisma.medicine.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
  return result;
};

const getAllMedicines = async ({
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
  return prisma.medicine.findMany({ 
    include: {
      category: true,
      seller: {
        select: { id: true, name: true },
      },
    },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
};

const getMedicineById = async (id: string) => {
  return prisma.medicine.findUnique({
    where: { id },
    include: {
      category:{
        select:{
            id: true,
            name: true,
        }
      } ,
      seller: {
        select: {
          name: true,
          email: true,
        },
      },
      reviews: true,
    },
  });
};

export const MedicineService = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
};
