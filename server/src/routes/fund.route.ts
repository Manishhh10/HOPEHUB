// server/routes/fund.route.ts
import { Router } from "express";
import multer from "multer";
import { createFund, getFunds } from "../controllers/fund.controller.js";
import { authenticate } from "../middlewares/index.js";

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/.uploads"); // Ensure this directory exists (or create it)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const fundRouter = Router();

// Use Multer middleware to handle a single file upload under the field name "image"
// fundRouter.post("/", authenticate, upload.single("image"), createFund);
fundRouter.get("/", getFunds);

export default fundRouter;
