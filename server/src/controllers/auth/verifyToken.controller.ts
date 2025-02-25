// verifyToken.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { SuccessResponse } from "../../utils/SuccessResponse.js";

// verifyToken.controller.ts
export const verifyToken = asyncHandler(async (req: Request, res: Response) => {
    // Make sure req.user contains the full user data, including id
    return res.status(200).json(
        new SuccessResponse(200, true, "token verified", req.user)
    );
});


