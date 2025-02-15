// server/routes/fund.route.ts
import { Router } from "express";
import { createFund, getFunds } from "../controllers/fund.controller.js";
import { authenticate } from "../middlewares/index.js";

const fundRouter = Router();

fundRouter.post("/", authenticate, createFund);
fundRouter.get("/", getFunds);

export default fundRouter;
