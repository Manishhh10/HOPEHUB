import { Request, Response } from "express";
import { asyncHandler, ErrorResponse, SuccessResponse } from "../utils/index.js";
import { Fund } from "../models/fund.model.js";

export const createFund = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    category,
    reason,
    state,
    city,
    donation_amount,
    donation_start_date,
    donation_end_date,
  } = req.body;
  const created_by = req.user?.id;
  
  if (!created_by) {
    throw new ErrorResponse(401, "auth_error", false, "User not authenticated");
  }

  // Ensure an image file is uploaded
  if (!req.file) {
    throw new ErrorResponse(400, "client_error", false, "Image file is required");
  }

  const image_url = req.file.path; // The path where Multer stored the file

  const fund = await Fund.create({
    title,
    category,
    reason,
    state,
    city,
    donation_amount,
    donation_start_date,
    donation_end_date,
    image_url,
    created_by,
  });

  res.status(201).json(new SuccessResponse(201, true, "Fund created", fund));
});

export const getFunds = asyncHandler(async (req: Request, res: Response) => {
  const funds = await Fund.findAll({
    order: [["created_at", "DESC"]],
  });
  res.status(200).json(new SuccessResponse(200, true, "Funds retrieved", funds));
});
