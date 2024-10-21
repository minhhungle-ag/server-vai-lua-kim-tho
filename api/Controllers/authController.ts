import User from "../Models/user";
import { Request, Response } from "express";
import { compare, genSaltSync, hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkAuth, RequestWithUser } from "../Middlewares/checkAuth";

export const authController = {
  getProfile(req: Request, res: Response) {
    checkAuth(req, res, () => {
      const reqWithUser = req as RequestWithUser;

      res.status(200).json({
        success: true,
        data: reqWithUser.user,
      });
    });
  },

  login(req: Request, res: Response) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message,
            });
          }
          if (result) {
            return res.status(200).json({
              success: true,
              message: "User logged in successfully",
              data: {
                token: jwt.sign(
                  { _id: user._id },
                  process.env.JWT_SECRET as string,
                  { expiresIn: "1h" }
                ),
                _id: user._id,
                role: user.role,
              },
            });
          } else {
            return res.status(401).json({
              success: false,
              message: "Incorrect password",
            });
          }
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  },

  signUp(req: Request, res: Response) {
    const { body } = req;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    User.create(body)
      .then((data) => {
        res.status(200).json({
          success: true,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  },
};
