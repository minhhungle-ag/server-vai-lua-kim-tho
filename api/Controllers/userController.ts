import User from "../Models/user";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const userController = {
  getAll(req: Request, res: Response) {
    const { page = 1, limit, search } = req.query;

    let query = {};
    if (search) {
      query = {
        $or: [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { fullName: { $regex: search, $options: "i" } },
        ],
      };
    }

    User.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select("-password") // Exclude the password field
      .then(async (data) => {
        const total = await User.countDocuments(query);
        const totalPage = Math.ceil(total / Number(limit));

        res.status(200).json({
          success: true,
          data: data,
          meta: {
            total,
            totalPages: totalPage,
            page: Number(page),
            limit: Number(limit),
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  },
  getById(req: Request, res: Response) {
    const { _id } = req.params;
    User.findById(_id)
      .select("-password") // Exclude the password field
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

  create(req: Request, res: Response) {
    const { body } = req;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
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

  update(req: Request, res: Response) {
    const { _id } = req.params;
    const { body } = req;
    User.findByIdAndUpdate(_id, body, { new: true })
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

  remove(req: Request, res: Response) {
    const { _id } = req.params;
    User.findByIdAndDelete(_id)
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
