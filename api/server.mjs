var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}
var config;
var init_class = __esm({
  "generated/prisma/internal/class.ts"() {
    "use strict";
    config = {
      "previewFeatures": [],
      "clientVersion": "7.3.0",
      "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
      "activeProvider": "postgresql",
      "inlineSchema": 'model User {\n  id       String  @id @default(uuid())\n  name     String\n  email    String  @unique\n  password String\n  role     String? @default("CUSTOMER")\n  phone    String?\n  status   String? @default("ACTIVE")\n  isBanned Boolean @default(false)\n\n  order    Order[]\n  medicine Medicine[]\n  reviews  Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("user")\n}\n\nmodel Category {\n  id        String     @id @default(uuid())\n  name      String     @unique\n  medicines Medicine[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("categories")\n}\n\nmodel Medicine {\n  id           String  @id @default(uuid())\n  name         String\n  description  String?\n  price        Int\n  stock        Int\n  manufacturer String?\n  imageUrl     String?\n\n  categoryId String\n  sellerId   String\n\n  category Category @relation(fields: [categoryId], references: [id])\n  seller   User     @relation(fields: [sellerId], references: [id])\n\n  orderItems OrderItem[]\n  reviews    Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("medicines")\n}\n\nmodel Order {\n  id              String      @id @default(uuid())\n  customerId      String\n  status          OrderStatus @default(PLACED)\n  shippingAddress String\n  totalAmount     Int\n  createdAt       DateTime    @default(now())\n  updatedAt       DateTime    @updatedAt\n\n  customer User        @relation(fields: [customerId], references: [id])\n  items    OrderItem[]\n\n  @@map("orders")\n}\n\nenum OrderStatus {\n  PLACED\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nmodel OrderItem {\n  id         String @id @default(uuid())\n  orderId    String\n  medicineId String\n  quantity   Int\n  price      Int\n\n  order    Order    @relation(fields: [orderId], references: [id])\n  medicine Medicine @relation(fields: [medicineId], references: [id])\n\n  @@map("order_items")\n}\n\nmodel Review {\n  id      String  @id @default(uuid())\n  rating  Int\n  comment String?\n\n  userId     String\n  medicineId String\n\n  user     User     @relation(fields: [userId], references: [id])\n  medicine Medicine @relation(fields: [medicineId], references: [id])\n\n  @@unique([userId, medicineId])\n  @@map("reviews")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
      "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
      }
    };
    config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"isBanned","kind":"scalar","type":"Boolean"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"user"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"categories"},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Int"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"seller","kind":"object","type":"User","relationName":"MedicineToUser"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"medicines"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Int"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"}],"dbName":"order_items"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"}],"dbName":"reviews"}},"enums":{},"types":{}}');
    config.compilerWasm = {
      getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
      getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
      },
      importName: "./query_compiler_fast_bg.js"
    };
  }
});

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MedicineScalarFieldEnum: () => MedicineScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2, PrismaClientUnknownRequestError2, PrismaClientRustPanicError2, PrismaClientInitializationError2, PrismaClientValidationError2, sql, empty2, join2, raw2, Sql2, Decimal2, getExtensionContext, prismaVersion, NullTypes2, DbNull2, JsonNull2, AnyNull2, ModelName, TransactionIsolationLevel, UserScalarFieldEnum, CategoryScalarFieldEnum, MedicineScalarFieldEnum, OrderScalarFieldEnum, OrderItemScalarFieldEnum, ReviewScalarFieldEnum, SortOrder, QueryMode, NullsOrder, defineExtension;
var init_prismaNamespace = __esm({
  "generated/prisma/internal/prismaNamespace.ts"() {
    "use strict";
    PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
    PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
    PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
    PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
    PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
    sql = runtime2.sqltag;
    empty2 = runtime2.empty;
    join2 = runtime2.join;
    raw2 = runtime2.raw;
    Sql2 = runtime2.Sql;
    Decimal2 = runtime2.Decimal;
    getExtensionContext = runtime2.Extensions.getExtensionContext;
    prismaVersion = {
      client: "7.3.0",
      engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
    };
    NullTypes2 = {
      DbNull: runtime2.NullTypes.DbNull,
      JsonNull: runtime2.NullTypes.JsonNull,
      AnyNull: runtime2.NullTypes.AnyNull
    };
    DbNull2 = runtime2.DbNull;
    JsonNull2 = runtime2.JsonNull;
    AnyNull2 = runtime2.AnyNull;
    ModelName = {
      User: "User",
      Category: "Category",
      Medicine: "Medicine",
      Order: "Order",
      OrderItem: "OrderItem",
      Review: "Review"
    };
    TransactionIsolationLevel = runtime2.makeStrictEnum({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    UserScalarFieldEnum = {
      id: "id",
      name: "name",
      email: "email",
      password: "password",
      role: "role",
      phone: "phone",
      status: "status",
      isBanned: "isBanned",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    CategoryScalarFieldEnum = {
      id: "id",
      name: "name",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    MedicineScalarFieldEnum = {
      id: "id",
      name: "name",
      description: "description",
      price: "price",
      stock: "stock",
      manufacturer: "manufacturer",
      imageUrl: "imageUrl",
      categoryId: "categoryId",
      sellerId: "sellerId",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    OrderScalarFieldEnum = {
      id: "id",
      customerId: "customerId",
      status: "status",
      shippingAddress: "shippingAddress",
      totalAmount: "totalAmount",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    OrderItemScalarFieldEnum = {
      id: "id",
      orderId: "orderId",
      medicineId: "medicineId",
      quantity: "quantity",
      price: "price"
    };
    ReviewScalarFieldEnum = {
      id: "id",
      rating: "rating",
      comment: "comment",
      userId: "userId",
      medicineId: "medicineId"
    };
    SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    QueryMode = {
      default: "default",
      insensitive: "insensitive"
    };
    NullsOrder = {
      first: "first",
      last: "last"
    };
    defineExtension = runtime2.Extensions.defineExtension;
  }
});

// generated/prisma/enums.ts
var OrderStatus;
var init_enums = __esm({
  "generated/prisma/enums.ts"() {
    "use strict";
    OrderStatus = {
      PLACED: "PLACED",
      PROCESSING: "PROCESSING",
      SHIPPED: "SHIPPED",
      DELIVERED: "DELIVERED",
      CANCELLED: "CANCELLED"
    };
  }
});

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";
var PrismaClient;
var init_client = __esm({
  "generated/prisma/client.ts"() {
    "use strict";
    init_class();
    init_prismaNamespace();
    init_enums();
    init_enums();
    globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
    PrismaClient = getPrismaClientClass();
  }
});

// src/middlewares/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provide incorrect field type or Missing fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage = "An operation failed because it depends on one or more records that were required but not found. {cause}";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Duplicate key error";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed on the field";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Error occurred during query execution ";
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    statusCode = 500;
    errorMessage = "internal error: entered unreachable code";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed. Please check creditials !";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can't reach database server!";
    }
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}
var globalErrorHandler_default;
var init_globalErrorHandler = __esm({
  "src/middlewares/globalErrorHandler.ts"() {
    "use strict";
    init_client();
    globalErrorHandler_default = errorHandler;
  }
});

// src/middlewares/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    date: Date()
  });
}
var init_notFound = __esm({
  "src/middlewares/notFound.ts"() {
    "use strict";
  }
});

// src/utils/jwt.ts
import jwt from "jsonwebtoken";
var JWT_SECRET, signToken;
var init_jwt = __esm({
  "src/utils/jwt.ts"() {
    "use strict";
    JWT_SECRET = process.env.JWT_SECRET;
    console.log("JWT_SECRET loaded:", JWT_SECRET ? "\u2713 Present" : "\u2717 Missing - This will cause errors!");
    signToken = (payload) => {
      console.log("Signing token with payload:", payload);
      console.log("JWT_SECRET:", JWT_SECRET ? "\u2713 Available" : "\u2717 Not available");
      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables!");
      }
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
      console.log("Token signed successfully");
      return token;
    };
  }
});

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString, adapter, prisma;
var init_prisma = __esm({
  "src/lib/prisma.ts"() {
    "use strict";
    init_client();
    connectionString = `${process.env.DATABASE_URL}`;
    adapter = new PrismaPg({ connectionString });
    prisma = new PrismaClient({ adapter });
  }
});

// src/modules/auth/auth.controller.ts
import bcrypt from "bcrypt";
import jwt2 from "jsonwebtoken";
var register, login, me, logout;
var init_auth_controller = __esm({
  "src/modules/auth/auth.controller.ts"() {
    "use strict";
    init_jwt();
    init_prisma();
    register = async (req, res, next) => {
      try {
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password) {
          return res.status(400).json({ success: false, message: "Name, email, and password are required" });
        }
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: { name, email, password: hashedPassword, phone }
        });
        const token = signToken({ userId: user.id, role: user.role });
        console.log("Token created:", token);
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1e3
          // 7 days
        });
        console.log("Registration successful for user:", user.email);
        res.status(201).json({
          success: true,
          message: "Registered",
          data: { id: user.id, name: user.name, email: user.email }
        });
      } catch (error) {
        console.error("Register error:", error);
        next(error);
      }
    };
    login = async (req, res, next) => {
      try {
        console.log("Login attempt with body:", req.body);
        const { email, password } = req.body;
        if (!email || !password) {
          console.log("Missing email or password");
          return res.status(400).json({ success: false, message: "Email and password are required" });
        }
        console.log("Finding user with email:", email);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          console.log("User not found with email:", email);
          return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        console.log("User found:", user.email);
        console.log("Comparing passwords...");
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          console.log("Password does not match for user:", email);
          return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        console.log("Password matched! Creating token...");
        const token = jwt2.sign({ userId: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, {
          expiresIn: "7d"
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1e3
        });
        console.log({ token });
        console.log("Login successful for user:", user.email);
        res.status(200).json({
          success: true,
          message: "Login successful",
          token,
          data: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
      } catch (error) {
        console.error("Login error:", error);
        next(error);
      }
    };
    me = async (req, res) => {
      res.status(200).json({ success: true, data: req.user });
    };
    logout = async (req, res, next) => {
      try {
        res.clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax"
          // Note: You can add path if you set it during creation
          // path: "/",
        });
        console.log("Logout successful");
        res.status(200).json({
          success: true,
          message: "Logged out successfully"
        });
      } catch (error) {
        console.error("Logout error:", error);
        next(error);
      }
    };
  }
});

// src/middlewares/auth.ts
import jwt3 from "jsonwebtoken";
var auth, auth_default, protect, fetchUserData;
var init_auth = __esm({
  "src/middlewares/auth.ts"() {
    "use strict";
    init_prisma();
    auth = (...roles) => {
      return async (req, res, next) => {
        try {
          let token = req.cookies?.token;
          if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
          }
          if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
          }
          const decoded = jwt3.verify(
            token,
            process.env.JWT_SECRET
          );
          req.user = {
            userId: decoded.userId,
            ...decoded.role && { role: decoded.role }
          };
          if (roles.length > 0 && !roles.includes(decoded.role)) {
            console.log("\u274C User role not authorized. Expected:", roles, "Got:", decoded.role);
            return res.status(403).json({
              message: "You are not authorized !"
            });
          }
          next();
        } catch (error) {
          console.error("\u274C Token verification failed:", error);
          return res.status(401).json({ message: "Invalid token" });
        }
      };
    };
    auth_default = auth;
    protect = (req, res, next) => {
      console.log("Protect middleware triggered");
      console.log("Request cookies:", req.cookies);
      console.log("Request headers:", req.headers);
      let token = req.cookies?.token;
      if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith("Bearer ")) {
          token = authHeader.slice(7);
        }
      }
      console.log("Token found:", token ? "\u2713 Yes" : "\u2717 No");
      if (!token) {
        console.log("No token provided - Unauthorized");
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      try {
        const decoded = jwt3.verify(
          token,
          process.env.JWT_SECRET
        );
        console.log("Token verified successfully:", decoded);
        req.user = {
          id: decoded.userId,
          userId: decoded.userId,
          role: decoded.role || "USER"
        };
        next();
      } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ success: false, message: "Invalid token" });
      }
    };
    fetchUserData = async (req, res, next) => {
      try {
        if (!req.user?.id) {
          return res.status(401).json({ success: false, message: "User not found in request" });
        }
        console.log("Fetching user data for userId:", req.user.id);
        const user = await prisma.user.findUnique({
          where: { id: req.user.id }
        });
        if (!user) {
          return res.status(401).json({ success: false, message: "User not found" });
        }
        const { password, ...safeUser } = user;
        req.user = {
          ...safeUser,
          role: safeUser.role || "CUSTOMER"
        };
        console.log("Full user data attached to req.user:", req.user);
        next();
      } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ success: false, message: "Error fetching user data" });
      }
    };
  }
});

// src/modules/auth/auth.routes.ts
import { Router } from "express";
var router, authRouter;
var init_auth_routes = __esm({
  "src/modules/auth/auth.routes.ts"() {
    "use strict";
    init_auth_controller();
    init_auth();
    router = Router();
    router.post("/register", register);
    router.post("/login", login);
    router.get("/me", protect, fetchUserData, me);
    router.post("/logout", logout);
    authRouter = router;
  }
});

// src/modules/medicine/medicine.service.ts
var createMedicine, getAllMedicines, getMedicineById, MedicineService;
var init_medicine_service = __esm({
  "src/modules/medicine/medicine.service.ts"() {
    "use strict";
    init_prisma();
    createMedicine = async (data, userId) => {
      const { sellerId, ...restData } = data;
      console.log("sellerId: ", sellerId);
      const result = await prisma.medicine.create({
        data: {
          ...data
          // authorId: userId,
        }
      });
      return result;
    };
    getAllMedicines = async ({
      search,
      categoryId,
      sellerId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder
    }) => {
      const andConditions = [];
      if (search) {
        andConditions.push({
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              description: {
                contains: search,
                mode: "insensitive"
              }
            }
          ]
        });
      }
      if (categoryId) {
        andConditions.push({
          categoryId
        });
      }
      if (sellerId) {
        andConditions.push({
          sellerId
        });
      }
      const medicines = await prisma.medicine.findMany({
        take: limit,
        skip,
        where: {
          AND: andConditions
        },
        orderBy: {
          [sortBy]: sortOrder
          // createdAt: desc (latest first)
        },
        include: {
          category: true,
          seller: {
            select: {
              id: true,
              name: true
            }
          },
          reviews: true
        }
      });
      const total = await prisma.medicine.count({
        where: {
          AND: andConditions
        }
      });
      return {
        data: medicines,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    };
    getMedicineById = async (id) => {
      return prisma.medicine.findUnique({
        where: { id },
        include: {
          category: {
            select: {
              id: true,
              name: true
            }
          },
          seller: {
            select: {
              name: true,
              email: true
            }
          },
          reviews: true
        }
      });
    };
    MedicineService = {
      createMedicine,
      getAllMedicines,
      getMedicineById
    };
  }
});

// src/helpers/sortingHelper.ts
var sortingHelper, sortingHelper_default;
var init_sortingHelper = __esm({
  "src/helpers/sortingHelper.ts"() {
    "use strict";
    sortingHelper = (options) => {
      const page = Number(options.page) || 1;
      const limit = Number(options.limit) || 10;
      const skip = (page - 1) * limit;
      const sortBy = typeof options.sortBy === "string" && ["createdAt", "totalAmount", "status"].includes(options.sortBy) ? options.sortBy : "createdAt";
      const sortOrder = options.sortOrder === "asc" || options.sortOrder === "desc" ? options.sortOrder : "desc";
      return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
      };
    };
    sortingHelper_default = sortingHelper;
  }
});

// src/modules/medicine/medicine.controller.ts
var createMedicine2, getAllMedicines2, getMedicineById2, MedicineController;
var init_medicine_controller = __esm({
  "src/modules/medicine/medicine.controller.ts"() {
    "use strict";
    init_medicine_service();
    init_sortingHelper();
    createMedicine2 = async (req, res, next) => {
      try {
        const user = req.user;
        if (!user) {
          return res.status(400).json({
            error: "Unauthorized"
          });
        }
        const result = await MedicineService.createMedicine(
          req.body,
          user.id
        );
        res.status(201).json({
          success: true,
          data: result
        });
      } catch (error) {
        next(error);
      }
    };
    getAllMedicines2 = async (req, res) => {
      try {
        const { page, limit, skip, sortBy, sortOrder } = sortingHelper_default(req.query);
        const result = await MedicineService.getAllMedicines({
          search: req.query.search,
          categoryId: req.query.categoryId,
          sellerId: req.query.sellerId,
          page,
          limit,
          skip,
          sortBy,
          sortOrder
        });
        res.status(200).json({
          success: true,
          ...result
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Failed to fetch medicines",
          error
        });
      }
    };
    getMedicineById2 = async (req, res) => {
      try {
        const { id } = req.params;
        if (!id || typeof id !== "string") {
          return res.status(400).json({
            success: false,
            message: "Invalid medicine id"
          });
        }
        const result = await MedicineService.getMedicineById(id);
        res.status(200).json({
          success: true,
          data: result
        });
      } catch (error) {
        res.status(400).json({
          error: "Medicine found failed",
          details: error
        });
      }
    };
    MedicineController = {
      createMedicine: createMedicine2,
      getAllMedicines: getAllMedicines2,
      getMedicineById: getMedicineById2
    };
  }
});

// src/modules/medicine/medicine.route.ts
import express from "express";
var router2, MedicineRoutes;
var init_medicine_route = __esm({
  "src/modules/medicine/medicine.route.ts"() {
    "use strict";
    init_medicine_controller();
    init_auth();
    router2 = express.Router();
    router2.post("/", auth_default("ADMIN" /* ADMIN */, "SELLER" /* SELLER */), MedicineController.createMedicine);
    router2.get("/", MedicineController.getAllMedicines);
    router2.get("/:id", MedicineController.getMedicineById);
    MedicineRoutes = router2;
  }
});

// src/modules/category/category.service.ts
var createCategory, getAllCategories, getCategoryById, deleteCategory, CategoryService;
var init_category_service = __esm({
  "src/modules/category/category.service.ts"() {
    "use strict";
    init_prisma();
    createCategory = async (name) => {
      return prisma.category.create({
        data: { name }
      });
    };
    getAllCategories = async ({ sortBy, sortOrder }) => {
      return prisma.category.findMany({
        orderBy: {
          [sortBy]: sortOrder
        }
      });
    };
    getCategoryById = async (id) => {
      return prisma.category.findUnique({
        where: { id },
        include: { medicines: true }
      });
    };
    deleteCategory = async (id) => {
      return prisma.category.delete({
        where: { id }
      });
    };
    CategoryService = {
      createCategory,
      getAllCategories,
      getCategoryById,
      deleteCategory
    };
  }
});

// src/modules/category/category.controller.ts
var createCategory2, getAllCategories2, getCategoryById2, deleteCategory2, CategoryController;
var init_category_controller = __esm({
  "src/modules/category/category.controller.ts"() {
    "use strict";
    init_category_service();
    init_sortingHelper();
    createCategory2 = async (req, res) => {
      try {
        const { name } = req.body;
        const result = await CategoryService.createCategory(name);
        res.status(201).json({
          success: true,
          data: result
        });
      } catch (error) {
        res.status(400).json({
          error: "Category create failed",
          details: error
        });
      }
    };
    getAllCategories2 = async (req, res) => {
      try {
        const { sortBy, sortOrder } = sortingHelper_default(req.query);
        const result = await CategoryService.getAllCategories({
          sortBy,
          sortOrder
        });
        res.status(200).json({
          success: true,
          data: result
        });
      } catch (error) {
        res.status(400).json({
          error: "Category found failed !",
          details: error
        });
      }
    };
    getCategoryById2 = async (req, res) => {
      try {
        const { id } = req.params;
        if (!id || typeof id !== "string") {
          return res.status(400).json({
            success: false,
            message: "Invalid medicine id"
          });
        }
        const result = await CategoryService.getCategoryById(id);
        res.status(200).json({
          success: true,
          data: result
        });
      } catch (error) {
        res.status(400).json({
          error: "Post found failed",
          details: error
        });
      }
    };
    deleteCategory2 = async (req, res) => {
      try {
        const { id } = req.params;
        if (!id || typeof id !== "string") {
          return res.status(400).json({
            success: false,
            message: "Invalid category id"
          });
        }
        const existingCategory = await CategoryService.getCategoryById(id);
        if (!existingCategory) {
          return res.status(404).json({
            success: false,
            message: "Category not found"
          });
        }
        if (existingCategory.medicines && existingCategory.medicines.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Cannot delete category with associated medicines. Remove or reassign medicines first."
          });
        }
        const result = await CategoryService.deleteCategory(id);
        res.status(200).json({
          success: true,
          message: "Category deleted successfully",
          data: result
        });
      } catch (error) {
        console.error("Delete category error:", error);
        res.status(500).json({
          success: false,
          error: "Failed to delete category",
          details: error instanceof Error ? error.message : "Unknown error"
        });
      }
    };
    CategoryController = {
      createCategory: createCategory2,
      getAllCategories: getAllCategories2,
      getCategoryById: getCategoryById2,
      deleteCategory: deleteCategory2
    };
  }
});

// src/modules/category/category.route.ts
import express2 from "express";
var router3, CategoryRoutes;
var init_category_route = __esm({
  "src/modules/category/category.route.ts"() {
    "use strict";
    init_category_controller();
    router3 = express2.Router();
    router3.post("/", CategoryController.createCategory);
    router3.get("/", CategoryController.getAllCategories);
    router3.get("/:id", CategoryController.getCategoryById);
    CategoryRoutes = router3;
  }
});

// src/modules/order/order.service.ts
var createOrder, getMyOrders, getOrderById, cancelOrder, OrderService;
var init_order_service = __esm({
  "src/modules/order/order.service.ts"() {
    "use strict";
    init_enums();
    init_prisma();
    createOrder = async (userId, payload) => {
      const { items, shippingAddress } = payload;
      if (!items || items.length === 0) {
        throw new Error("You must provide at least one item to create an order.");
      }
      let totalAmount = 0;
      const orderItemsData = await Promise.all(
        items.map(async (item) => {
          const medicine = await prisma.medicine.findUnique({
            where: { id: item.medicineId }
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
            price: Number(medicine.price)
          };
        })
      );
      return prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: {
            customerId: userId,
            shippingAddress,
            totalAmount,
            items: { create: orderItemsData }
          },
          include: { items: true }
        });
        for (const item of orderItemsData) {
          await tx.medicine.update({
            where: { id: item.medicineId },
            data: { stock: { decrement: item.quantity } }
          });
        }
        return order;
      });
    };
    getMyOrders = async ({
      userId,
      page,
      limit,
      skip
    }) => {
      const orders = await prisma.order.findMany({
        where: {
          customerId: userId
        },
        take: limit,
        skip,
        include: {
          items: {
            include: {
              medicine: true
            }
          }
        }
      });
      const total = await prisma.order.count({
        where: {
          customerId: userId
        }
      });
      return {
        data: orders,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    };
    getOrderById = async (orderId, userId) => {
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
    cancelOrder = async (orderId, userId) => {
      const order = await prisma.order.findFirst({
        where: { id: orderId, customerId: userId },
        include: { items: true }
      });
      if (!order) throw new Error("Order not found");
      if (order.status !== OrderStatus.PLACED) {
        throw new Error("Only orders with status PLACED can be cancelled");
      }
      return prisma.$transaction(async (tx) => {
        for (const item of order.items) {
          await tx.medicine.update({
            where: { id: item.medicineId },
            data: { stock: { increment: item.quantity } }
          });
        }
        return tx.order.update({
          where: { id: orderId },
          data: { status: OrderStatus.CANCELLED }
        });
      });
    };
    OrderService = {
      createOrder,
      getMyOrders,
      getOrderById,
      cancelOrder
    };
  }
});

// src/modules/order/order.controller.ts
var createOrder2, getMyOrders2, getOrderById2, cancelOrder2, OrderController;
var init_order_controller = __esm({
  "src/modules/order/order.controller.ts"() {
    "use strict";
    init_order_service();
    init_sortingHelper();
    createOrder2 = async (req, res) => {
      const userId = req.user?.userId;
      console.log("userId:- ", userId);
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "User not authenticated"
        });
      }
      try {
        const order = await OrderService.createOrder(userId, req.body);
        res.status(201).json({ success: true, data: order });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: err.message,
          error: err
        });
      }
    };
    getMyOrders2 = async (req, res) => {
      try {
        const userId = req.user?.userId;
        if (!userId) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized"
          });
        }
        const { page, limit, skip } = sortingHelper_default(req.query);
        const result = await OrderService.getMyOrders({
          userId,
          page,
          limit,
          skip
        });
        res.status(200).json({
          success: true,
          ...result
        });
      } catch (error) {
        console.error(error);
        res.status(400).json({
          success: false,
          message: "Order fetch failed!",
          error
        });
      }
    };
    getOrderById2 = async (req, res) => {
      const userId = req.user?.userId;
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Order ID is required"
        });
      }
      const result = await OrderService.getOrderById(id, userId);
      res.status(200).json({
        success: true,
        data: result
      });
    };
    cancelOrder2 = async (req, res) => {
      try {
        const userId = req.user.userId;
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!id) {
          return res.status(400).json({
            success: false,
            message: "Order ID is required"
          });
        }
        const result = await OrderService.cancelOrder(id, userId);
        res.status(200).json({
          success: true,
          message: "Order cancelled successfully",
          data: result
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: err.message
        });
      }
    };
    OrderController = {
      createOrder: createOrder2,
      getMyOrders: getMyOrders2,
      getOrderById: getOrderById2,
      cancelOrder: cancelOrder2
    };
  }
});

// src/modules/order/order.route.ts
import { Router as Router4 } from "express";
var router4, OrderRoutes;
var init_order_route = __esm({
  "src/modules/order/order.route.ts"() {
    "use strict";
    init_order_controller();
    init_auth();
    router4 = Router4();
    router4.get("/", auth_default("CUSTOMER" /* CUSTOMER */), OrderController.getMyOrders);
    router4.post("/", auth_default("CUSTOMER" /* CUSTOMER */), OrderController.createOrder);
    router4.get("/:id", OrderController.getOrderById);
    router4.patch("/:id/cancel", auth_default("CUSTOMER" /* CUSTOMER */), OrderController.cancelOrder);
    OrderRoutes = router4;
  }
});

// src/modules/review/review.service.ts
var createReview, ReviewService;
var init_review_service = __esm({
  "src/modules/review/review.service.ts"() {
    "use strict";
    init_prisma();
    createReview = async (userId, payload) => {
      const { rating, comment, medicineId } = payload;
      if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }
      return prisma.review.create({
        data: {
          userId,
          medicineId,
          rating,
          comment: comment || null
        }
      });
    };
    ReviewService = {
      createReview
    };
  }
});

// src/modules/review/review.controller.ts
var createReview2, ReviewController;
var init_review_controller = __esm({
  "src/modules/review/review.controller.ts"() {
    "use strict";
    init_review_service();
    createReview2 = async (req, res) => {
      const userId = req.user?.userId;
      try {
        const review = await ReviewService.createReview(userId, req.body);
        res.status(201).json({ success: true, data: review });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
    };
    ReviewController = {
      createReview: createReview2
    };
  }
});

// src/modules/review/review.router.ts
import { Router as Router5 } from "express";
var router5, ReviewRoutes;
var init_review_router = __esm({
  "src/modules/review/review.router.ts"() {
    "use strict";
    init_auth();
    init_review_controller();
    router5 = Router5();
    router5.post("/", auth_default("CUSTOMER" /* CUSTOMER */), ReviewController.createReview);
    ReviewRoutes = router5;
  }
});

// src/modules/seller/seller.service.ts
var updateMedicine, deleteMedicine, getSellerOrders, updateOrderStatus, SellerService;
var init_seller_service = __esm({
  "src/modules/seller/seller.service.ts"() {
    "use strict";
    init_enums();
    init_prisma();
    updateMedicine = async (sellerId, medicineId, payload) => {
      const medicine = await prisma.medicine.findUnique({ where: { id: medicineId } });
      if (!medicine) throw new Error("Medicine not found");
      return prisma.medicine.update({
        where: { id: medicineId },
        data: payload
      });
    };
    deleteMedicine = async (sellerId, medicineId) => {
      const medicine = await prisma.medicine.findUnique({ where: { id: medicineId } });
      if (!medicine) throw new Error("Medicine not found");
      return prisma.medicine.delete({ where: { id: medicineId } });
    };
    getSellerOrders = async (page, limit) => {
      const skip = (page - 1) * limit;
      const orders = await prisma.order.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        // latest orders first
        include: {
          items: { include: { medicine: true } },
          customer: { select: { id: true, name: true, email: true } }
        }
      });
      const total = await prisma.order.count();
      return {
        data: orders,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    };
    updateOrderStatus = async (orderId, payload) => {
      const { status } = payload;
      const validStatuses = Object.values(OrderStatus);
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status value. Allowed: ${validStatuses.join(", ")}`);
      }
      const order = await prisma.order.findUnique({
        where: { id: orderId }
      });
      if (!order) {
        throw new Error("Order not found");
      }
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status }
      });
      return updatedOrder;
    };
    SellerService = {
      updateMedicine,
      deleteMedicine,
      getSellerOrders,
      updateOrderStatus
    };
  }
});

// src/modules/seller/seller.controller.ts
var updateMedicine2, deleteMedicine2, getOrders, updateOrderStatus2, SellerController;
var init_seller_controller = __esm({
  "src/modules/seller/seller.controller.ts"() {
    "use strict";
    init_seller_service();
    init_enums();
    updateMedicine2 = async (req, res) => {
      try {
        const sellerId = req.user.userId;
        console.log("sellerId : ", sellerId);
        const { id } = req.params;
        console.log("Id : ", id);
        if (!id || typeof id !== "string") {
          return res.status(400).json({
            success: false,
            message: "Invalid medicine id"
          });
        }
        const medicine = await SellerService.updateMedicine(sellerId, id, req.body);
        res.status(200).json({ success: true, data: medicine });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
    };
    deleteMedicine2 = async (req, res) => {
      try {
        const sellerId = req.user.userId;
        const { id } = req.params;
        if (!id || typeof id !== "string") {
          return res.status(400).json({
            success: false,
            message: "Invalid medicine id"
          });
        }
        const medicine = await SellerService.deleteMedicine(sellerId, id);
        res.status(200).json({ success: true, data: medicine });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
    };
    getOrders = async (req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const orders = await SellerService.getSellerOrders(page, limit);
        res.status(200).json({
          success: true,
          ...orders
        });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      }
    };
    updateOrderStatus2 = async (req, res) => {
      try {
        const sellerId = req.user.userId;
        const { id } = req.params;
        if (!id || typeof id !== "string") {
          return res.status(400).json({
            success: false,
            message: "Invalid order id"
          });
        }
        const { status } = req.body;
        const validStatuses = Object.values(OrderStatus);
        if (!status || !validStatuses.includes(status)) {
          return res.status(400).json({
            success: false,
            message: `Invalid status value. Allowed values: ${validStatuses.join(", ")}`
          });
        }
        const updatedOrder = await SellerService.updateOrderStatus(id, { status });
        return res.status(200).json({ success: true, data: updatedOrder });
      } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
    };
    SellerController = {
      updateMedicine: updateMedicine2,
      deleteMedicine: deleteMedicine2,
      getOrders,
      updateOrderStatus: updateOrderStatus2
    };
  }
});

// src/modules/seller/seller.route.ts
import { Router as Router6 } from "express";
var router6, SellerRoutes;
var init_seller_route = __esm({
  "src/modules/seller/seller.route.ts"() {
    "use strict";
    init_auth();
    init_seller_controller();
    init_medicine_controller();
    router6 = Router6();
    router6.post("/medicines", auth_default("SELLER" /* SELLER */), MedicineController.createMedicine);
    router6.put("/medicines/:id", auth_default("SELLER" /* SELLER */), SellerController.updateMedicine);
    router6.delete("/medicines/:id", auth_default("SELLER" /* SELLER */), SellerController.deleteMedicine);
    router6.get("/medicines", auth_default("SELLER" /* SELLER */), MedicineController.getAllMedicines);
    router6.get("/orders", auth_default("SELLER" /* SELLER */), SellerController.getOrders);
    router6.patch("/orders/:id", auth_default("SELLER" /* SELLER */), SellerController.updateOrderStatus);
    SellerRoutes = router6;
  }
});

// src/modules/admin/admin.service.ts
var getAllUsers, updateUserStatus, getAllOrders, updateCategory, AdminService;
var init_admin_service = __esm({
  "src/modules/admin/admin.service.ts"() {
    "use strict";
    init_prisma();
    getAllUsers = async () => {
      return prisma.user.findMany({
        orderBy: {
          createdAt: "desc"
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          status: true,
          isBanned: true,
          createdAt: true
        }
      });
    };
    updateUserStatus = async (id, payload) => {
      const user = await prisma.user.findUnique({
        where: { id }
      });
      if (!user) {
        throw new Error("User not found");
      }
      return prisma.user.update({
        where: { id },
        data: {
          ...payload.status !== void 0 && { status: payload.status },
          ...payload.isBanned !== void 0 && { isBanned: payload.isBanned }
        }
      });
    };
    getAllOrders = async ({
      page,
      limit,
      skip
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
              phone: true
            }
          },
          items: {
            include: {
              medicine: true
            }
          }
        }
      });
      const total = await prisma.order.count();
      return {
        data: orders,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    };
    updateCategory = async (id, name) => {
      const category = await prisma.category.findUnique({
        where: { id }
      });
      if (!category) {
        throw new Error("Category not found");
      }
      return prisma.category.update({
        where: { id },
        data: { name }
      });
    };
    AdminService = {
      getAllUsers,
      updateUserStatus,
      getAllOrders,
      updateCategory
    };
  }
});

// src/modules/admin/admin.controller.ts
var getAllUsers2, updateUserStatus2, getAllOrders2, updateCategory2, AdminController;
var init_admin_controller = __esm({
  "src/modules/admin/admin.controller.ts"() {
    "use strict";
    init_sortingHelper();
    init_admin_service();
    getAllUsers2 = async (req, res) => {
      try {
        const users = await AdminService.getAllUsers();
        res.status(200).json({
          success: true,
          data: users
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to fetch users"
        });
      }
    };
    updateUserStatus2 = async (req, res) => {
      try {
        const { id } = req.params;
        const { status, isBanned } = req.body;
        if (!id || typeof id !== "string") {
          return res.status(400).json({
            success: false,
            message: "Invalid medicine id"
          });
        }
        const updatedUser = await AdminService.updateUserStatus(id, {
          status,
          isBanned
        });
        res.status(200).json({
          success: true,
          message: "User updated successfully",
          data: updatedUser
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message || "Failed to update user"
        });
      }
    };
    getAllOrders2 = async (req, res) => {
      try {
        const { page, limit, skip } = sortingHelper_default(req.query);
        const result = await AdminService.getAllOrders({
          page,
          limit,
          skip
        });
        res.status(200).json({
          success: true,
          ...result
        });
      } catch (error) {
        console.error(error);
        res.status(400).json({
          success: false,
          message: "Orders fetch failed!"
        });
      }
    };
    updateCategory2 = async (req, res) => {
      try {
        const { id } = req.params;
        const { name } = req.body;
        if (!id || typeof id !== "string") {
          return res.status(400).json({
            success: false,
            message: "Invalid category id"
          });
        }
        if (!name || typeof name !== "string") {
          return res.status(400).json({
            success: false,
            message: "Category name is required"
          });
        }
        const result = await AdminService.updateCategory(id, name);
        res.status(200).json({
          success: true,
          message: "Category updated successfully",
          data: result
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message || "Category update failed"
        });
      }
    };
    AdminController = {
      getAllUsers: getAllUsers2,
      updateUserStatus: updateUserStatus2,
      getAllOrders: getAllOrders2,
      updateCategory: updateCategory2
    };
  }
});

// src/modules/admin/admin.route.ts
import express3 from "express";
var router7, AdminRoutes;
var init_admin_route = __esm({
  "src/modules/admin/admin.route.ts"() {
    "use strict";
    init_auth();
    init_admin_controller();
    init_medicine_controller();
    init_category_controller();
    router7 = express3.Router();
    router7.get("/users", auth_default("ADMIN" /* ADMIN */), AdminController.getAllUsers);
    router7.get("/medicines", auth_default("ADMIN" /* ADMIN */), MedicineController.getAllMedicines);
    router7.get("/orders", auth_default("ADMIN" /* ADMIN */), AdminController.getAllOrders);
    router7.post("/categories", auth_default("ADMIN" /* ADMIN */), CategoryController.createCategory);
    router7.get("/categories", auth_default("ADMIN" /* ADMIN */), CategoryController.getAllCategories);
    router7.patch("/categories/:id", auth_default("ADMIN" /* ADMIN */), AdminController.updateCategory);
    router7.delete("/categories/:id", auth_default("ADMIN" /* ADMIN */), CategoryController.deleteCategory);
    router7.patch("/users/:id", AdminController.updateUserStatus);
    AdminRoutes = router7;
  }
});

// src/app.ts
import express4 from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
var app, app_default;
var init_app = __esm({
  "src/app.ts"() {
    "use strict";
    init_globalErrorHandler();
    init_notFound();
    init_auth_routes();
    init_medicine_route();
    init_category_route();
    init_order_route();
    init_review_router();
    init_seller_route();
    init_admin_route();
    app = express4();
    app.use(
      cors({
        origin: [
          process.env.APP_URL || "http://localhost:3000"
        ],
        credentials: true
      })
    );
    app.use(express4.json());
    app.use(cookieParser());
    app.use("/api/auth", authRouter);
    app.use("/api/categories", CategoryRoutes);
    app.use("/api/medicines", MedicineRoutes);
    app.use("/api/orders", OrderRoutes);
    app.use("/api/seller", SellerRoutes);
    app.use("/api/admin", AdminRoutes);
    app.use("/api/reviews", ReviewRoutes);
    app.get("/", (req, res) => {
      res.send("e-MediCare Shop running");
    });
    app.use(notFound);
    app.use(globalErrorHandler_default);
    app_default = app;
  }
});

// src/server.ts
import "dotenv/config";
var require_server = __commonJS({
  "src/server.ts"() {
    init_app();
    init_prisma();
    var PORT = process.env.PORT || 5e3;
    async function main() {
      try {
        await prisma.$connect();
        console.log("Connected to the database successfully");
        app_default.listen(PORT, () => {
          console.log(`Service is running on http://localhost:${PORT}`);
        });
      } catch (error) {
        console.error("An error occurred:", error);
        await prisma.$disconnect();
        process.exit(1);
      }
    }
    main();
  }
});
export default require_server();
