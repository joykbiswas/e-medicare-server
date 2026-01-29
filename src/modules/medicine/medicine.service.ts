// import { prisma } from "../../prisma/prismaClient";

import { Medicine } from "../../../generated/prisma/client";
import { MedicineWhereInput } from "../../../generated/prisma/models";
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

// const getAllMedicines = async ({
//   page,
//   limit,
//   skip,
//   sortBy,
//   sortOrder,
// }: {
//   page: number;
//   limit: number;
//   skip: number;
//   sortBy: string;
//   sortOrder: string;
// }) => {
//   return prisma.medicine.findMany({ 
//     include: {
//       category: true,
//       seller: {
//         select: { id: true, name: true },
//       },
//     },
//     take: limit,
//     skip,
//     orderBy: {
//       [sortBy]: sortOrder,
//     },
//   });
  
// };

const getAllMedicines = async ({
  search,
  categoryId,
  sellerId,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  search?: string;
  categoryId?: string;
  sellerId?: string;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}) => {
  const andConditions: MedicineWhereInput[] = [];

  // 🔍 Search by name or description
  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // 🧩 Filter by category
  if (categoryId) {
    andConditions.push({
      categoryId,
    });
  }

  // 👤 Filter by seller
  if (sellerId) {
    andConditions.push({
      sellerId: sellerId,
    });
  }

  const medicines = await prisma.medicine.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
    },
    orderBy: {
      [sortBy]: sortOrder, // createdAt: desc (latest first)
    },
    include: {
      category: true,
      seller: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const total = await prisma.medicine.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: medicines,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
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
