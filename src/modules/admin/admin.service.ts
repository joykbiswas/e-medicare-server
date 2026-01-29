// import { PrismaClient } from "@prisma/client";

import { prisma } from "../../lib/prisma";

// const prisma = new PrismaClient();

const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      status: true,
      isBanned: true,
      createdAt: true,
    },
  });
};

interface UpdateUserPayload {
  status?: string;
  isBanned?: boolean;
}

const updateUserStatus = async (
  id: string,
  payload: UpdateUserPayload
) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.user.update({
    where: { id },
    data: {
      ...(payload.status !== undefined && { status: payload.status }),
      ...(payload.isBanned !== undefined && { isBanned: payload.isBanned }),
    },
  });
};


const getAllOrders = async ({
  page,
  limit,
  skip,
}: {
  page: number;
  limit: number;
  skip: number;
}) => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    skip,
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      items: {
        include: {
          medicine: true,
        },
      },
    },
  });

  const total = await prisma.order.count();

  return {
    data: orders,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};


const updateCategory = async (id: string, name: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return prisma.category.update({
    where: { id },
    data: { name },
  });
};

export const AdminService = {
  getAllUsers,
  updateUserStatus,
  getAllOrders,
  updateCategory
};
