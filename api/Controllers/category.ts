import { Request, Response } from "express";
import Category from "../Models/category";

export const categoryController = {
  getAll: async (req: Request, res: Response) => {
    const { page = 1, limit, search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [{ name: { $regex: search, $options: "i" } }],
      };
    }
    Category.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .exec()
      .then(async (data) => {
        const total = await Category.countDocuments(query);
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
  getById: async (req: Request, res: Response) => {
    const { _id } = req.params;
    Category.findById(_id)
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

  create: async (req: Request, res: Response) => {
    const { body } = req;
    Category.create(body)
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

  update: async (req: Request, res: Response) => {
    const { _id } = req.params;
    const { body } = req;
    Category.findByIdAndUpdate(_id, body)
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

  remove: async (req: Request, res: Response) => {
    const { _id } = req.params;
    Category.findByIdAndDelete(_id)
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
