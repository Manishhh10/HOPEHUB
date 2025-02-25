import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { SuccessResponse } from "../../utils/SuccessResponse.js";

export const verifyToken = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.user
      ? {
          id: req.user.id,
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          email: req.user.email,
        }
      : null;

    return res.status(200).json(
        new SuccessResponse(200, true, "token verified", userData)
    );
});

