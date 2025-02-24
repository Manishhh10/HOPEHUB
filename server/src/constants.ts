import { CookieOptions } from "express";

export const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // false for development
    sameSite: 'lax', // or 'strict' if you prefer
    path: '/',     // ensure the cookie is available for all routes
};
