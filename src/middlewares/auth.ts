import { verifyToken } from "@utils/index";
import { ICurrentUser } from "@interfaces/types";
import { Response, NextFunction } from "express";

// =========== auth middleware ============
export const auth: any = (role: any = null) => async (req: ICurrentUser, res: Response, next: NextFunction) => {
  const bearer = req?.headers?.authorization;
  if (!bearer) {
    return res.status(401).json({ error: "unauthorized" });
  }
  const token = bearer.split(" ")[1];
  const payload = verifyToken(token, role);

  if (!payload) {
    return res.status(401).json({ error: "unauthenticated" });
  }
  // pass the current user data to the next middleware
  req.user = { ...payload };
  next();
};
