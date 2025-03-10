// server/src/routes/fund.route.ts
import { Router } from "express";
import multer from "multer";
import { createFund, getFunds, deleteFund,updateFund,getFundById,donateToFund,adminUpdateFundStatus } from "../controllers/fund.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Ensure this directory exists in your project root
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const fundRouter = Router();

fundRouter.post("/", authenticate, upload.single("image"), createFund);
fundRouter.get("/", getFunds);
fundRouter.get("/:id", getFundById);
fundRouter.put("/:id", authenticate, upload.single("image"), updateFund);
fundRouter.delete("/:id", authenticate, deleteFund);
fundRouter.post("/:id/donate", donateToFund);
fundRouter.put("/:id/status", adminUpdateFundStatus);



export { fundRouter };