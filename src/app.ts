import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import { authRouter } from "./modules/auth/auth.routes";
const app: Application = express();

app.use(
  cors({
    origin: [process.env.APP_URL || "http://localhost:3000",
       ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

// app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("e-MediCare Shop running");
});
app.use(notFound)
app.use(errorHandler)

export default app;
