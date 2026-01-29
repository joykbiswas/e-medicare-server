import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
// import { OrderStatus } from "@prisma/client";

interface MedicinePayload {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
}

interface UpdateOrderStatusPayload {
  status: OrderStatus;
}

const updateMedicine = async (sellerId: string, medicineId: string, payload: Partial<MedicinePayload>) => {
  const medicine = await prisma.medicine.findUnique({ where: { id: medicineId } });

  if (!medicine) throw new Error("Medicine not found");
  console.log("match: ",medicine );
  console.log("match2: ",medicine.sellerId );
//   if (medicine.sellerId !== sellerId) throw new Error("You cannot update this medicine");

  return prisma.medicine.update({
    where: { id: medicineId },
    data: payload,
  });
};

const deleteMedicine = async (sellerId: string, medicineId: string) => {
  const medicine = await prisma.medicine.findUnique({ where: { id: medicineId } });

  if (!medicine) throw new Error("Medicine not found");
//   if (medicine.sellerId !== sellerId) throw new Error("You cannot delete this medicine");

  return prisma.medicine.delete({ where: { id: medicineId } });
};

const getSellerOrders = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const orders = await prisma.order.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" }, // latest orders first
    include: {
      items: { include: { medicine: true } },
      customer: { select: { id: true, name: true, email: true } },
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



const updateOrderStatus = async (orderId: string, payload: UpdateOrderStatusPayload) => {
  const { status } = payload;

  console.log("Updating order:", orderId);
  console.log("New status:", status);

  // Validate status
  const validStatuses = Object.values(OrderStatus);
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status value. Allowed: ${validStatuses.join(", ")}`);
  }

  // Check if order exists
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // Update status only
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  console.log("Order updated successfully:", updatedOrder.id);
  return updatedOrder;
};

export const SellerService = {
  updateMedicine,
  deleteMedicine,
  getSellerOrders,
  updateOrderStatus,
};
