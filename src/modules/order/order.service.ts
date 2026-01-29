// import { prisma } from "../../prisma/prismaClient";

import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const ORDER_SORT_FIELDS = {
  createdAt: true,
  totalAmount: true,
  status: true,
} as const;

type OrderSortField = keyof typeof ORDER_SORT_FIELDS;


const createOrder = async (userId: string, payload: any) => {
  const { items, shippingAddress } = payload;

  if (!items || items.length === 0) {
    throw new Error("You must provide at least one item to create an order.");
  }

  let totalAmount = 0;

  const orderItemsData = await Promise.all(
    items.map(async (item: any) => {
      const medicine = await prisma.medicine.findUnique({
        where: { id: item.medicineId },
      });

      if (!medicine) {
        throw new Error(`Medicine not found: ${item.medicineId}`);
      }

      if (medicine.stock < Number(item.quantity)) {
        throw new Error(`Insufficient stock for ${medicine.name}`);
      }

      totalAmount += medicine.price * Number(item.quantity);

      return {
        medicineId: medicine.id,
        quantity: Number(item.quantity),
        price: Number(medicine.price),
      };
    })
  );

  // Transaction: create order + reduce stock
  return prisma.$transaction(async (tx) => {
    // Create order with nested items
    const order = await tx.order.create({
      data: {
        customerId: userId,
        shippingAddress,
        totalAmount,
        items: { create: orderItemsData },
      },
      include: { items: true },
    });

    // Reduce stock
    for (const item of orderItemsData) {
      await tx.medicine.update({
        where: { id: item.medicineId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return order;
  });
};

const getMyOrders = async ({
  userId,
  page,
  limit,
  skip,
}: {
  userId: string;
  page: number;
  limit: number;
  skip: number;
}) => {
  const orders = await prisma.order.findMany({
    where: {
      customerId: userId,
    },
    take: limit,
    skip,
    include: {
      items: {
        include: {
          medicine: true,
        },
      },
    },
  });

  const total = await prisma.order.count({
    where: {
      customerId: userId,
    },
  });

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



const getOrderById = async (orderId: string, userId: string) => {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      customerId: userId
    },
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    }
  });
};

const cancelOrder = async (orderId: string, userId: string) => {
  // 1️⃣ Find the order
  const order = await prisma.order.findFirst({
    where: { id: orderId, customerId: userId },
    include: { items: true },
  });

  if (!order) throw new Error("Order not found");

  if (order.status !== OrderStatus.PLACED) {
    throw new Error("Only orders with status PLACED can be cancelled");
  }

  // 2️⃣ Transaction: restore stock + update order status
  return prisma.$transaction(async (tx) => {
    // restore stock
    for (const item of order.items) {
      await tx.medicine.update({
        where: { id: item.medicineId },
        data: { stock: { increment: item.quantity } },
      });
    }

    // update order status
    return tx.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.CANCELLED },
    });
  });
};

export const OrderService = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder
};
