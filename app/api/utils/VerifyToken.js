import { createError } from "./Error.js";

export const verifyToken = (req, res, next) => {
  let token;
  try {
    token = req.headers.cookie.split("=")[1];
    next();
  } catch (err) {
    return next(createError(401, "You are not authenticated."));
  }
};
