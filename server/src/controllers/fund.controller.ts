// server/src/controllers/fund.controller.ts
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
    status,
    failure_reason,
  } = req.body;

  if (!req.user?.id) {
    return res.status(401).json(
      new ErrorResponse(401, "auth_error", false, "Not authenticated")
    );
  }

  // Check required fields
  const requiredFields = [
    "title",
    "category",
    "reason",
    "state",
    "city",
    "target_amount",
    "start_date",
    "end_date",
    "status",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json(
      new ErrorResponse(
        400,
        "invalid_payload",
        false,
        `Missing fields: ${missingFields.join(", ")}`
      )
    );
  }

  // Ensure a file was uploaded
  if (!req.file) {
    return res.status(400).json(
      new ErrorResponse(400, "invalid_payload", false, "Image is required")
    );
  }

  // Use the uploaded file's filename for the image_url
  const image_url = req.file.filename;

  // Create the fund record
  const fund = await Fund.create({
    title,
    category,
    reason,
    state,
    city,
    target_amount,
    amount_raised:0,
    donation_count:0,
    start_date,
    end_date,
    image_url,
    userId: req.user.id,
    status,
    failure_reason
  });

  res.status(201).json(
    new SuccessResponse(201, true, "Fund created successfully", fund)
  );
});

export const deleteFund = asyncHandler(async (req: Request, res: Response) => {
  const fundId = req.params.id;
  if (!req.user?.id) {
    return res.status(401).json(new ErrorResponse(401, "auth_error", false, "Not authenticated"));
  }
  const fund = await Fund.findByPk(fundId);
  if (!fund) {
    return res.status(404).json(new ErrorResponse(404, "not_found", false, "Fund not found"));
  }
  if (fund.userId !== req.user.id) {
    return res.status(403).json(new ErrorResponse(403, "not_allowed", false, "Not allowed to delete this fund"));
  }
  await fund.destroy();
  res.status(200).json(new SuccessResponse(200, true, "Fund deleted successfully", null));
});


export const getFunds = asyncHandler(async (req: Request, res: Response) => {
  const funds = await Fund.findAll();
  res.status(200).json(new SuccessResponse(200, true, "Funds retrieved", funds));
});

export const getFundById = asyncHandler(async (req: Request, res: Response) => {
  const fundId = req.params.id;
  const fund = await Fund.findByPk(fundId);
  
  if (!fund) {
    return res.status(404).json(new ErrorResponse(404, "not_found", false, "Fund not found"));
  }
  res.status(200).json(new SuccessResponse(200, true, "Fund retrieved", fund));
});

export const updateFund = asyncHandler(async (req: Request, res: Response) => {
  const fundId = req.params.id;
  const {
    title,
    category,
    reason,
    state,
    city,
    target_amount,
    start_date,
    end_date,
    status,
    failure_reason,
  } = req.body;

  if (!req.user?.id) {
    return res.status(401).json(
      new ErrorResponse(401, "auth_error", false, "Not authenticated")
    );
  }

  const fund = await Fund.findByPk(fundId);
  if (!fund) {
    return res.status(404).json(
      new ErrorResponse(404, "not_found", false, "Fund not found")
    );
  }

  // Check ownership (casting to Number to avoid type mismatches)
  if (Number(fund.userId) !== Number(req.user.id)) {
    return res.status(403).json(
      new ErrorResponse(403, "not_allowed", false, "Not allowed to update this fund")
    );
  }

  // Update the basic fund fields
  fund.title = title || fund.title;
  fund.category = category || fund.category;
  fund.reason = reason || fund.reason;
  fund.state = state || fund.state;
  fund.city = city || fund.city;
  fund.target_amount = target_amount || fund.target_amount;
  fund.start_date = start_date ? new Date(start_date) : fund.start_date;
  fund.end_date = end_date ? new Date(end_date) : fund.end_date;

  // If a new image is uploaded, update the image_url
  if (status) {
    fund.status = status;
    // If the status is "failed", update the failure_reason; otherwise, clear it.
    fund.failure_reason = status === "failed" ? failure_reason || "" : null;
  }

  await fund.save();

  res.status(200).json(
    new SuccessResponse(200, true, "Fund updated successfully", fund)
  );
});

export const donateToFund = asyncHandler(async (req: Request, res: Response) => {
  const fundId = req.params.id;
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json(new ErrorResponse(400, "invalid_payload", false, "Donation amount is required"));
  }
  const fund = await Fund.findByPk(fundId);
  if (!fund) {
    return res.status(404).json(new ErrorResponse(404, "not_found", false, "Fund not found"));
  }
  // Update donation progress
  fund.amount_raised = (fund.amount_raised || 0) + Number(amount);
  fund.donation_count = (fund.donation_count || 0) + 1;
  await fund.save();
  return res.status(200).json(new SuccessResponse(200, true, "Donation successful", fund));
});