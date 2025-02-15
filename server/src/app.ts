import express, { Request, Response } from "express";
import { responseErrorHandler } from "./utils/ErrorResponse.js";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
export const app = express();

/*
 * Setups
 */
const corsOptions: CorsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

/*
 * Routes
 */
// Home Route
app.get("/", async (req: Request, res: Response) => {
  const requestData = {
    request_from: {
      ip: req.ip || "Unknown IP",
      user_agent: req.headers["user-agent"] || "Unknown User Agent",
      timestamp: new Date().toISOString(),
    },
  };
  res.status(200).json(requestData);
});

import { authRouter } from "./routes/auth.route.js";
app.use("/api/v1/auth", authRouter);

import fundRouter from "./routes/fund.route.js";
app.use("/api/v1/funds", fundRouter);

// Error response handler always at last after all routes
app.use(responseErrorHandler);
