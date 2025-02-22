// server/controllers/fund.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Fund } from "../models/fund.model.js";
import { SuccessResponse } from "../utils/SuccessResponse.js";
import { ErrorResponse } from "../utils/ErrorResponse.js";

export const createFund = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    category,
    reason,
    state,
    city,
    target_amount,
    start_date,
    end_date,
  } = req.body;

  if (!req.user?.id) {
    return res
      .status(401)
      .json(new ErrorResponse(401, "auth_error", false, "Not authenticated"));
  }

  // Check required fields (including file)
  const requiredFields = [
    "title",
    "category",
    "reason",
    "state",
    "city",
    "target_amount",
    "start_date",
    "end_date",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res
      .status(400)
      .json(
        new ErrorResponse(
          400,
          "invalid_payload",
          false,
          `Missing fields: ${missingFields.join(", ")}`
        )
      );
  }

  // Make sure a file was uploaded
  if (!req.file) {
    return res
      .status(400)
      .json(new ErrorResponse(400, "invalid_payload", false, "Image is required"));
  }

  // Use the file's filename as the image_url (you could also use req.file.path if needed)
  const image_url = req.file.filename;

  // Create the fund record
  const fund = await Fund.create({
    title,
    category,
    reason,
    state,
    city,
    target_amount,
    start_date,
    end_date,
    image_url,
    userId: req.user.id,
  });

  res.status(201).json(
    new SuccessResponse(201, true, "Fund created successfully", fund)
  );
});

export const getFunds = asyncHandler(async (req: Request, res: Response) => {
  const funds = await Fund.findAll();
  res.status(200).json(new SuccessResponse(200, true, "Funds retrieved", funds));
});
