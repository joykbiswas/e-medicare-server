import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

async function seedAdmin() {
  try {
    console.log("**** Admin Seeding Start ****");

    const adminData = {
      name: "Admin",
      email: "admin@test.com",
      password: "admin1234",
      role: "ADMIN",
      phone: "01740002281",
    };

    console.log("** Checking admin exists...");

    const existingUser = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (existingUser) {
      console.log("⚠️ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    await prisma.user.create({
      data: {
        name: adminData.name,
        email: adminData.email,
        password: hashedPassword,
        role: adminData.role,
        phone: adminData.phone,
        status: "ACTIVE",
        isBanned: false,
      },
    });

    console.log("✅ Admin created successfully");
  } catch (error) {
    console.error("❌ Admin seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
