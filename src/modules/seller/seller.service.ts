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

const getSellerOrders = async (sellerId: string) => {
  // get orders where at least one item belongs to this seller
  return prisma.order.findMany({
    where: {
      items: { some: { medicine: { sellerId } } },
    },
    include: {
      items: { include: { medicine: true } },
      customer: { select: { id: true, name: true, email: true } },
    },
   
  });
};

const updateOrderStatus = async (sellerId: string, orderId: string, payload: UpdateOrderStatusPayload) => {
  const { status } = payload;

  const order = await prisma.order.findFirst({
    where: { id: orderId, items: { some: { medicine: { sellerId } } } },
    include: { items: true },
  });

  if (!order) throw new Error("Order not found or does not belong to your medicines");

  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

export const SellerService = {
  updateMedicine,
  deleteMedicine,
  getSellerOrders,
  updateOrderStatus,
};
