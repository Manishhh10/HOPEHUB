// server/routes/fund.route.ts
import { Router } from "express";
import multer from "multer";
import { createFund, getFunds } from "../controllers/fund.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const fundRouter = Router();

// POST /api/v1/funds (with authentication and file upload)
fundRouter.post("/", authenticate, upload.single("image"), createFund);

// GET /api/v1/funds
fundRouter.get("/", getFunds);

export { fundRouter };
