import jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../Models/user";

export interface RequestWithUser extends Request {
  user: any;
}

// ...

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET!
    ) as jsonwebtoken.JwtPayload;

    console.log("decoded: ", decoded);
    const user = await User.findById(decoded?._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const reqWithUser = req as RequestWithUser;
    reqWithUser.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
